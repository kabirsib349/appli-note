"use client";

import{Card,CardHeader,CardTitle,CardContent,CardFooter, CardDescription} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {updateUser} from "@/lib/actionsUser";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import { toast } from "react-toastify";
import {Button} from "@/components/ui/button"

export default function FormSettings({user}: {user:any}){
    const handleSubmit = ()=>{
        toast.success("Compte modifié ave succès")
    }
    return(
           <form action={updateUser} onSubmit={handleSubmit}>
                <Input type="hidden" name="id" value={user?.id || ""}/>
                <Card>
                    <CardHeader>
                        <CardTitle>Paramètres globals</CardTitle>
                        <CardDescription>Modifier et sauvegarder vos paramètres</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user?.image && (
                            <Image width={100} height={100} alt="photo de profil" src={user?.image}
                            className="w-16 h-16 rounded-full mb-4 object-contain"/>
                        )}
                        <div className="space-y-1 mb-2">
                            <Label htmlFor="idUser">ID</Label>
                            <Input type="text" name="idUser" id="idUser" disabled defaultValue={user?.id || ""}/>
                        </div>
                        <div className="space-y-1 mb-2">
                            <Label htmlFor="name">Nom</Label>
                            <Input type="text" name="name" id="name" defaultValue={user?.name || ""}/>
                        </div>
                        <div className="space-y-1 mb-2">
                            <Label htmlFor="email">email</Label>
                            <Input type="text" name="email" id="email" disabled defaultValue={user?.email || ""}/>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Modifier</Button>
                    </CardFooter>
                </Card> 
            </form>
    )

}