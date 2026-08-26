"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { correctText, restructureText, improveStyleText } from "@/lib/actionsAI";
import { toast } from "react-toastify";
import { Sparkles, Check, Wand2, Loader2, Lock } from "lucide-react";
import Link from "next/link";

interface AiTextareaProps {
    defaultValue?: string;
    hasPremiumAccess: boolean;
}

export default function AiTextarea({ defaultValue = "", hasPremiumAccess }: AiTextareaProps) {
    const [text, setText] = useState(defaultValue);
    const [activeAction, setActiveAction] = useState<string | null>(null);

    const handleAIAction = async (actionName: string, actionFn: (text: string) => Promise<{error?: string, data?: string}>, successMessage: string) => {
        if (!text.trim()) {
            toast.error("Veuillez écrire du texte d'abord.");
            return;
        }

        setActiveAction(actionName);
        try {
            const result = await actionFn(text);
            if (result.error) {
                toast.error(result.error);
            } else if (result.data !== undefined) {
                setText(result.data);
                toast.success(successMessage);
            }
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
                    onClick={() => handleAIAction("correct", correctText, "Texte corrigé avec succès !")}
                    className="text-xs bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                >
                    {activeAction === "correct" ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Check className="w-3 h-3 mr-1" />}
                    Corriger
                </Button>

                {/* Boutons Premium */}
                {hasPremiumAccess ? (
                    <>
                        <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            disabled={activeAction !== null}
                            onClick={() => handleAIAction("restructure", restructureText, "Texte restructuré avec succès !")}
                            className="text-xs bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100"
                        >
                            {activeAction === "restructure" ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Wand2 className="w-3 h-3 mr-1" />}
                            Restructurer
                        </Button>
                        <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            disabled={activeAction !== null}
                            onClick={() => handleAIAction("style", improveStyleText, "Style amélioré avec succès !")}
                            className="text-xs bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100"
                        >
                            {activeAction === "style" ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
                            Améliorer le style
                        </Button>
                    </>
                ) : (
                    <>
                        <Button type="button" variant="outline" size="sm" asChild className="text-xs bg-gray-100 text-gray-500 cursor-not-allowed">
                            <Link href="/dashboard/payment">
                                <Lock className="w-3 h-3 mr-1" /> Restructurer (Premium)
                            </Link>
                        </Button>
                        <Button type="button" variant="outline" size="sm" asChild className="text-xs bg-gray-100 text-gray-500 cursor-not-allowed">
                            <Link href="/dashboard/payment">
                                <Lock className="w-3 h-3 mr-1" /> Améliorer le style (Premium)
                            </Link>
                        </Button>
                    </>
                )}
            </div>
            
            <Textarea 
                name="description" 
                id="description" 
                required 
                placeholder="Votre description"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[150px]"
            /> 
        </div>
    );
}

