"use client";

import { Button } from "@/components/ui/button";
import { deleteUser } from "@/lib/actionsUser";
import { signOut } from "next-auth/react";

export default function DeleteAccountButton() {
    const handleDelete = async () => {
        await deleteUser();
        await signOut({ callbackUrl: "/" });
    };

    return (
        <Button 
            onClick={handleDelete} 
            className="bg-red-500 mx-1 my-2 hover:bg-red-600 text-white"
        >
            Supprimer votre compte
        </Button>
    );
}

