import { Button } from "@/components/ui/button"
import { getAllNotes } from "@/lib/actionsNotes";
import { getUser } from "@/lib/actionsUser";
import { isPremiumOrAdmin } from "@/lib/permissions";
import Link from "next/link";
import NoteListClient from "@/app/components/NoteListClient";

export default async function PageNotes(){
    const user = await getUser();  
    const data = await getAllNotes(user?.id as string)

    // Phase 3 : Vérification limite UI
    const hasPremiumAccess = await isPremiumOrAdmin(user?.id as string);
    const isOverLimit = data.length >= 5 && !hasPremiumAccess;

    return(
        <section className="grid items-start gap-y-8">
            <div className="flex md:items-center md:justify-between flex-col md:flex-row px-2">
                <div className=" grid gap-1">
                    <h2 className="font-black text-3xl uppercase">Notes</h2>
                    <p className="text-lg text-muted-foreground">
                        Ne perdez pas vos idées, prenez des notes
                    </p>
                    <div className="w-12 h-[1px] bg-white mx-1 my-2"></div>
                </div>
                {isOverLimit ? (
                    <Button disabled className="bg-gray-500 hover:bg-gray-500 text-white cursor-not-allowed">
                        <Link href="/dashboard/payment">Limite atteinte - Passez Premium</Link>
                    </Button>
                ) : (
                    <Button asChild>
                        <Link href="/dashboard/notes/create">
                            Créer une note
                        </Link>
                    </Button>
                )}
            </div>
            
            <NoteListClient initialNotes={data} hasPremiumAccess={hasPremiumAccess} />
        </section>
    );
}