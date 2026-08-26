"use server"

import { getUser } from "./actionsUser"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import {redirect} from "next/navigation"

import { isPremiumOrAdmin } from "@/lib/permissions"

export const getAllNotes = async function (userId: string) {
    const data = await prisma.note.findMany({
        where:{
            userId: userId
        },
        orderBy:{
            createAt: "desc"
        }
    })
    return data;
}

export const createNote = async function (formData: FormData){
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const user = await getUser()
    const userId = user?.id as string

    // Phase 3 : Vérification de la limite
    const hasPremiumAccess = await isPremiumOrAdmin(userId);
    if (!hasPremiumAccess) {
        const notesCount = await prisma.note.count({ where: { userId } });
        if (notesCount >= 5) {
            throw new Error("Limite de notes atteinte pour le plan gratuit.");
        }
    }

    await prisma.note.create({
        data:{
            userId: userId,
            title: title,
            description: description,
        }
    })
    redirect("/dashboard/notes")
}

export const deleteNote = async function(formData:FormData){
    const id = formData.get("id") as string
    const user = await getUser()
    const userId = user?.id as string

    await prisma.note.delete({
        where: {
            id: id,
            userId: userId // Sécurité : vérifie le propriétaire
        }
    })
    revalidatePath('/')
}

export const getNote = async function (id: string){
    const user = await getUser()
    const userId = user?.id as string

    const note = await prisma.note.findUnique({
        where: {
            id: id,
            userId: userId // Sécurité : vérifie le propriétaire
        }
    })
    return note
}

export const updateNote = async function(formData: FormData){
    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const user = await getUser()
    const userId = user?.id as string

    if(title!== null && description!== null)
    await prisma.note.update({
        where: {
            id: id,
            userId: userId // Sécurité : vérifie le propriétaire
        },
        data:{
            title: title,
            description: description,
        }
    })
    })
    redirect("/dashboard/notes")
}

export const togglePin = async (id: string) => {
    const user = await getUser();
    if (!user) {
        throw new Error("Vous n'êtes pas autorisé à épingler une note");
    }

    const note = await prisma.note.findUnique({
        where: { id: id, userId: user.id }
    });

    if (!note) {
        throw new Error("Note introuvable");
    }

    await prisma.note.update({
        where: { id: id, userId: user.id },
        data: {
            pinned: !note.pinned
        }
    });

    revalidatePath('/dashboard/notes');
}