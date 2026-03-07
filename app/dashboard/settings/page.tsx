import{Card,CardHeader,CardTitle,CardContent,CardFooter, CardDescription} from "@/components/ui/card";
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import { getUser, updateUser } from "@/lib/actionsUser";
import Image from "next/image";
import { toast } from "react-toastify";

export default async function PageSettings(){

    const user = await getUser();
    const handleSubmit = ()=>{
        toast.success("Compte modifié ave succès")
    }

    return(
        <section className="border border-gray-200 rounded-md p-3">
            <h2 className="text-3xl uppercase font-black">Settings</h2>
            <p className="text-lg text-muted-foreground"> Vos Paramètres de profil</p>
            <div className="w-12 h-[1px] bg-white my-2 mx-1"></div>

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
            <form action="">
                <Input type="hidden" name="id" value=""/>
                <Button className="bg-red-500 mx-1 my-2 hover:bg-red-600 text-white">Supprimer votre compte</Button>
            </form>
        </section>
    );
}