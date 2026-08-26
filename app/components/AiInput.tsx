"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { correctText, improveStyleText } from "@/lib/actionsAI";
import { toast } from "react-toastify";
import { Sparkles, Check, Loader2, Lock } from "lucide-react";
import Link from "next/link";

interface AiInputProps {
    defaultValue?: string;
    hasPremiumAccess: boolean;
}

export default function AiInput({ defaultValue = "", hasPremiumAccess }: AiInputProps) {
    const [text, setText] = useState(defaultValue);
    const [activeAction, setActiveAction] = useState<string | null>(null);

    const handleAIAction = async (actionName: string, actionFn: (text: string) => Promise<string>, successMessage: string) => {
        if (!text.trim()) {
            toast.error("Veuillez écrire un titre d'abord.");
            return;
        }

        setActiveAction(actionName);
        try {
            const result = await actionFn(text);
            // On enlève les retours à la ligne potentiels car c'est un input text court
            setText(result.replace(/\n/g, " ").trim());
            toast.success(successMessage);
        } catch (error: any) {
            toast.error(error.message || "Une erreur est survenue avec l'IA.");
        } finally {
            setActiveAction(null);
        }
    };

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex flex-wrap items-center gap-2 mb-1">
                {/* Bouton Gratuit */}
                <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    disabled={activeAction !== null}
                    onClick={() => handleAIAction("correct", correctText, "Titre corrigé avec succès !")}
                    className="text-xs bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                >
                    {activeAction === "correct" ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Check className="w-3 h-3 mr-1" />}
                    Corriger
                </Button>

                {/* Bouton Premium */}
                {hasPremiumAccess ? (
                    <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        disabled={activeAction !== null}
                        onClick={() => handleAIAction("style", improveStyleText, "Titre amélioré avec succès !")}
                        className="text-xs bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100"
                    >
                        {activeAction === "style" ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
                        Améliorer
                    </Button>
                ) : (
                    <Button type="button" variant="outline" size="sm" asChild className="text-xs bg-gray-100 text-gray-500 cursor-not-allowed">
                        <Link href="/dashboard/payment">
                            <Lock className="w-3 h-3 mr-1" /> Améliorer (Premium)
                        </Link>
                    </Button>
                )}
            </div>
            
            <Input 
                type="text"
                name="title" 
                id="title" 
                required 
                placeholder="Votre titre"
                value={text}
                onChange={(e) => setText(e.target.value)}
            /> 
        </div>
    );
}

