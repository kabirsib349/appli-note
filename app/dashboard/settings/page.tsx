import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input";
import { getUser } from "@/lib/actionsUser";
import FormSettings from "@/app/components/FormSettings";
import DeleteAccountButton from "@/app/components/DeleteAccountButton";

export default async function PageSettings(){
    const user = await getUser();
    return(
        <section className="border border-gray-200 rounded-md p-3">
            <h2 className="text-3xl uppercase font-black">Settings</h2>
            <p className="text-lg text-muted-foreground"> Vos Paramètres de profil</p>
            <div className="w-12 h-[1px] bg-white my-2 mx-1"></div>
            <FormSettings user={user}/>

            <DeleteAccountButton />
        </section>
    );
}