import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import Badge from "@/public/logo_premium.png"
import { CheckCircle } from "lucide-react";

export default function PagePayment(){

    const itemsPremium = [
        {name: "Hébergement web fiable et sécurisé"},
        {name: "Conception responsive et conviviale"},
        {name: "Ajout de fonctionnalités sur demande"},
        {name: "Mises à jour et support technique"},
    ]

    return(
        <div className="mt-3 max-w-lg mx-auto space-y-4">
            <Card className="flex flex-col">
                <CardContent className="py-8">
                    <h3 className="inline rounded-md text-md text-orange-500 bg-orange-900/20 p-3 font-black uppercase">
                        Pass Premium
                    </h3>
                    <div className="mt-4 text-6xl font-black">
                        <span>0,00$</span><span className="text-sm text-muted-foreground">/par mois</span>
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
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}