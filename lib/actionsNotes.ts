"use server"

import { getUser } from "./actionsUser"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import {redirect} from "next/navigation"

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
    redirect("/dashboard/notes")
}