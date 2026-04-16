import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getNote, updateNote } from "@/lib/actionsNotes"

interface Params{
    id: string,
    title: string,
    description: string,
    completed: boolean
}

interface UpdateParamProps{
    params: Params
}

export default async function PageNote({params}: UpdateParamProps){

    const parametres = await params
    const note = await getNote(parametres.id)
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
                        <Input defaultValue={note?.title as string} type="text" name="title" id="title" required placeholder="Votre titre"/> 
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea defaultValue={note?.description as string} name="description" id="description" required placeholder="Votre description"/> 
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="completed">En attente | Complet</Label>
                        <Input defaultChecked={note?.completed as boolean} type="checkbox" name="completed" id="completed" className="w-6 cursor-pointer"/> 
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button type="button" className="bg-red-500 hover:bg-red-600 text-white">
                        <Link href="/dashboard/notes">Annuler</Link>
                    </Button>
                     <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                        Modifier note
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}