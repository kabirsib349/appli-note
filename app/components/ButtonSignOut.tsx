"use client";
import { LogOut } from "lucide-react";
import {useRouter} from "next/navigation";
import {signOut} from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function ButtonSignOut(){
    const router = useRouter();
    const handleSingOut = async () => {
        await signOut({redirect: false});
        router.push('/');
    }
    return(
        <div className="mt-2 mb-2 lg:mt-0 flex items-center justify-end p-3">
            <Button onClick={handleSingOut} className="bg-orange-500 hover:bg-orange-600 text-white"><LogOut/></Button>
        </div>
    )
}