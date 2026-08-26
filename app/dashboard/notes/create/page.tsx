import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { createNote } from "@/lib/actionsNotes"
import AiTextarea from "@/app/components/AiTextarea"
import AiInput from "@/app/components/AiInput"
import { getUser } from "@/lib/actionsUser"
import { isPremiumOrAdmin } from "@/lib/permissions"

export default async function CreatePage(){
    const user = await getUser();
    const hasPremiumAccess = await isPremiumOrAdmin(user?.id as string);

    return(
        <Card>
            <form action={createNote}>
                <CardHeader>
                    <CardTitle>Nouvelle note</CardTitle>
                    <CardDescription>Quelques mots pour ne pas oublier</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-5 my-5">
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="title">Titre</Label>
                        <AiInput hasPremiumAccess={hasPremiumAccess} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="description">Description</Label>
                        <AiTextarea hasPremiumAccess={hasPremiumAccess} />
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button type="button" className="bg-red-500 hover:bg-red-600 text-white">
                        <Link href="/dashboard/notes">Annuler</Link>
                    </Button>
                     <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                        Créer une note
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
} 