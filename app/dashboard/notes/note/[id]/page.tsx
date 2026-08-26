import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { getNote, updateNote } from "@/lib/actionsNotes"
import AiTextarea from "@/app/components/AiTextarea"
import AiInput from "@/app/components/AiInput"
import ExportButton from "@/app/components/ExportButton"
import { getUser } from "@/lib/actionsUser"
import { isPremiumOrAdmin } from "@/lib/permissions"

interface Params{
    id: string,
    title: string,
    description: string
}

interface UpdateParamProps{
    params: Params
}

export default async function PageNote({params}: UpdateParamProps){

    const parametres = await params
    const note = await getNote(parametres.id)
    const user = await getUser();
    const hasPremiumAccess = await isPremiumOrAdmin(user?.id as string);

    return(
         <Card>
            <form action={updateNote}>
                <Input type="hidden" name="id" value={note?.id}/>
                <CardHeader>
                    <CardTitle>Nouvelle note</CardTitle>
                    <CardDescription>Quelques mots pour ne pas oublier</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-5 my-5">
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="title">Titre</Label>
                        <AiInput defaultValue={note?.title || ""} hasPremiumAccess={hasPremiumAccess} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="description">Description</Label>
                        <AiTextarea defaultValue={note?.description || ""} hasPremiumAccess={hasPremiumAccess} />
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button type="button" variant="destructive" asChild>
                        <Link href="/dashboard/notes">Annuler</Link>
                    </Button>
                    <div className="flex items-center gap-2">
                        {note && (
                            <ExportButton 
                                title={note.title} 
                                description={note.description} 
                                createAt={note.createAt} 
                                hasPremiumAccess={hasPremiumAccess} 
                            />
                        )}
                        <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">Sauvegarder</Button>
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}