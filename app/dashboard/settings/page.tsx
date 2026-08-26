import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input";
import { getUser } from "@/lib/actionsUser";
import { isPremiumOrAdmin } from "@/lib/permissions";
import FormSettings from "@/app/components/FormSettings";
import DeleteAccountButton from "@/app/components/DeleteAccountButton";
import Image from "next/image";
import Badge from "@/public/logo_premium.png";

export default async function PageSettings(){
    const user = await getUser();
    // On teste la fonction qu'on vient de créer !
    const hasPremiumAccess = await isPremiumOrAdmin(user?.id as string);

    return(
        <section className="border border-gray-200 rounded-md p-3">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl uppercase font-black">Settings</h2>
                    <p className="text-lg text-muted-foreground"> Vos Paramètres de profil</p>
                </div>
                {hasPremiumAccess && (
                    <Image 
                        src={Badge} 
                        width={150} 
                        height={150} 
                        alt="badge premium" 
                        className="object-contain"
                    />
                )}
            </div>
            <div className="w-12 h-[1px] bg-white my-2 mx-1"></div>
            <FormSettings user={user}/>

            <DeleteAccountButton />
        </section>
    );
}