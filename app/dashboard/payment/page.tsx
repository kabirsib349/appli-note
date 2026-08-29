import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import Badge from "@/public/logo_premium.png"
import { CheckCircle } from "lucide-react";
import { createSubscription,getDataStripeUser,createCustomerPortal } from "@/lib/actionsStripe";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/actionsUser";
import { isPremiumOrAdmin } from "@/lib/permissions";

export default async function PagePayment(){

    const itemsPremium = [
        {name: "Hébergement web fiable et sécurisé"},
        {name: "Conception responsive et conviviale"},
        {name: "Ajout de fonctionnalités sur demande"},
        {name: "Mises à jour et support technique"},
    ]
    const user = await getUser();
    const dataStripeUser = await getDataStripeUser(user?.id as string);
    const hasPremiumAccess = await isPremiumOrAdmin(user?.id as string);

    if (hasPremiumAccess && dataStripeUser?.status !== "active") {
        return (
            <div className="max-w-lg mx-auto space-y-4 my-3">
                <Card className="flex flex-col">
                    <CardContent className="py-8">
                        <div>
                            <h3 className="text-md font-black uppercase bg-primary/20 text-primary p-3 rounded-md inline">
                                Pass Premium
                            </h3>
                            <p className="mt-4 text-sm text-muted-foreground">
                                Accès Administrateur
                            </p>
                            <Image 
                                src={Badge} 
                                width={200} 
                                height={200} 
                                alt="badge" 
                                className="block my-4" 
                            />
                            <p className="mt-4 text-sm text-muted-foreground">
                                Vous disposez de tous les avantages Premium grâce à vos droits d'administrateur.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (dataStripeUser?.status === "active") {
        return (
            <div className="max-w-lg mx-auto space-y-4 my-3">
                <Card className="flex flex-col">
                    <CardContent className="py-8">
                        <div>
                            <h3 className="text-md font-black uppercase bg-primary/20 text-primary p-3 rounded-md inline">
                                Pass Premium
                            </h3>
                            <p className="mt-4 text-sm text-muted-foreground">
                                Gérer votre abonnement premium, modifier votre carte ou vos factures.
                            </p>
                            <Image 
                                src={Badge} 
                                width={200} 
                                height={200} 
                                alt="badge" 
                                className="block my-4" 
                            />
                            <form className="w-full mt-4" action={createCustomerPortal}>
                                <Button type="submit" className="w-full">
                                    Gérer mon abonnement
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return(
        <div className="mt-3 max-w-lg mx-auto space-y-4">
            <Card className="flex flex-col">
                <CardContent className="py-8">
                    <h3 className="inline rounded-md text-md text-primary bg-primary/20 p-3 font-black uppercase">
                        Pass Premium
                    </h3>
                    <div className="mt-4 text-6xl font-black">
                        <span>0,99€</span><span className="text-sm text-muted-foreground">/par mois</span>
                    </div>
                    <p className="mt-4 text-muted-foreground">Avec notre Pass Premium, vous allez découvrir les plaisirs exclusifs du développement web et profiter d'une expérience unique !</p>
                    <div className="flex-1 flex flex-col p-3 mt-4 justify-between rounded-lg bg-secondary space-y-6">
                        <ul className="space-y-3">
                            {itemsPremium.map((item,index)=>(
                                <li key={index} className="flex items-center text-muted-foreground gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500"/>
                                    <span>{item.name}</span>              
                                </li>
                            ))}
                        </ul>
                        <form action={createSubscription}>
                            <Button type="submit" className="w-full">
                                Devenir membre premium
                            </Button>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}