"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/AuthOptions"
import {prisma} from "@/lib/db"
import {redirect} from "next/navigation"
import { revalidatePath } from "next/cache"

export const getUser = async ()=>{
    const session = await getServerSession(authOptions);
    if(!session || !session.user || !session.user.id){
        redirect("../")
    }
    const id = session.user.id as string;
    const user = await prisma.user.findUnique({
        where:{id: id}
    })
    return user;
}

export const updateUser = async (formData: FormData)=>{
    try{
        const user = await getUser();
        if (!user) return;
        
        const userName = formData.get("name") as string;
        // Utiliser l'id de la SESSION, pas du formulaire HTML
        if(userName && userName.trim() !== ""){
            await prisma.user.update({
                where: {id: user.id},
                data: {name: userName.trim()}
            })
        }
    }catch(error){
        console.error("Erreur lors de la modification",error)
    }finally{
        revalidatePath("/")
    }
}

export const deleteUser = async()=>{
    const session = await getServerSession(authOptions);
    const userId = session?.user.id as string;

    if(!session || !session.user || !session.user.id){
        redirect("../");
    }
     await prisma.subscription.deleteMany({
        where: {userId: userId}
    })
    await prisma.session.deleteMany({
        where: {userId: userId}
    })
    await prisma.account.deleteMany({
        where: {userId: userId}
    })
    await prisma.note.deleteMany({
        where: {userId: userId}
    })
    await prisma.user.deleteMany({
        where: {id: userId}
    })
}
    
