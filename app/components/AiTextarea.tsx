"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { correctText, restructureText, improveStyleText } from "@/lib/actionsAI";
import { toast } from "react-toastify";
import { Sparkles, Check, Wand2, Loader2, Bold, Italic, Heading1, Heading2, List, ListOrdered, Quote, Undo, Redo, Strikethrough } from "lucide-react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

interface AiTextareaProps {
    defaultValue?: string;
    hasPremiumAccess: boolean;
}

export default function AiTextarea({ defaultValue = "", hasPremiumAccess }: AiTextareaProps) {
    const [activeAction, setActiveAction] = useState<string | null>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Votre description...',
            }),
        ],
        content: defaultValue,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base dark:prose-invert focus:outline-none max-w-none p-4 border border-t-0 rounded-b-md border-input bg-transparent shadow-sm min-h-[250px]',
            },
        },
    });

    const handleAIAction = async (actionName: string, actionFn: (text: string) => Promise<{error?: string, data?: string}>, successMessage: string) => {
        if (!editor || editor.isEmpty) {
            toast.error("Veuillez écrire du texte d'abord.");
            return;
        }

        const currentHtml = editor.getHTML();

        setActiveAction(actionName);
        try {
            const result = await actionFn(currentHtml);
            if (result.error) {
                toast.error(result.error);
            } else if (result.data !== undefined) {
                editor.commands.setContent(result.data);
                toast.success(successMessage);
            }
        } catch (error: any) {
            toast.error(error.message || "Une erreur est survenue avec l'IA.");
        } finally {
            setActiveAction(null);
        }
    };

    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-col gap-y-2">
            {/* Toolbar IA */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
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
            </div>
            
            {/* Éditeur Rich Text */}
            <div className="flex flex-col mt-2">
                {/* Toolbar Tiptap */}
                <div className="flex flex-wrap items-center gap-1 p-2 border rounded-t-md bg-muted/30">
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleBold().run()} data-active={editor.isActive('bold') ? '' : undefined}>
                        <Bold className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleItalic().run()} data-active={editor.isActive('italic') ? '' : undefined}>
                        <Italic className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleStrike().run()} data-active={editor.isActive('strike') ? '' : undefined}>
                        <Strikethrough className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-4 bg-border mx-1" />
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} data-active={editor.isActive('heading', { level: 1 }) ? '' : undefined}>
                        <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} data-active={editor.isActive('heading', { level: 2 }) ? '' : undefined}>
                        <Heading2 className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-4 bg-border mx-1" />
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleBulletList().run()} data-active={editor.isActive('bulletList') ? '' : undefined}>
                        <List className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleOrderedList().run()} data-active={editor.isActive('orderedList') ? '' : undefined}>
                        <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleBlockquote().run()} data-active={editor.isActive('blockquote') ? '' : undefined}>
                        <Quote className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-4 bg-border mx-1" />
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                        <Undo className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
                        <Redo className="h-4 w-4" />
                    </Button>
                </div>
                
                {/* Zone d'édition */}
                <div className="relative">
                    <EditorContent editor={editor} />
                    <style jsx global>{`
                        .ProseMirror p.is-editor-empty:first-child::before {
                            color: #adb5bd;
                            content: attr(data-placeholder);
                            float: left;
                            height: 0;
                            pointer-events: none;
                        }
                        button[data-active] {
                            background-color: var(--accent);
                            color: var(--accent-foreground);
                        }
                    `}</style>
                </div>
            </div>

            {/* Input caché pour l'envoi du formulaire natif */}
            <input type="hidden" name="description" id="description" value={editor.getHTML()} />
        </div>
    );
}

