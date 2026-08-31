"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FilePenLine, Pin, Download, Search, File } from "lucide-react";
import DeleteButton from "@/app/components/DeleteButton";
import ShareButtons from "@/app/components/ShareButtons";
import { togglePin } from "@/lib/actionsNotes";
import { toast } from "react-toastify";

interface Note {
    id: string;
    title: string | null;
    description: string | null;
    createAt: Date;
    pinned?: boolean;
}

interface NoteListClientProps {
    initialNotes: Note[];
    hasPremiumAccess: boolean;
}

export default function NoteListClient({ initialNotes, hasPremiumAccess }: NoteListClientProps) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filtrage côté client
    const filteredNotes = initialNotes.filter(note => {
        const query = searchQuery.toLowerCase();
        const titleMatch = note.title?.toLowerCase().includes(query);
        const descMatch = note.description?.toLowerCase().includes(query);
        return titleMatch || descMatch;
    });

    // Tri : Épinglées d'abord
    const sortedNotes = [...filteredNotes].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
    });

    const handleTogglePin = async (id: string) => {
        try {
            await togglePin(id);
            // La page va être revalidée automatiquement par le serveur
        } catch (error) {
            toast.error("Erreur lors de l'épinglage");
        }
    };

    const handleExport = (note: Note) => {
        if (!hasPremiumAccess) {
            toast.error("Cette fonctionnalité est réservée aux utilisateurs Premium.");
            return;
        }

        const title = note.title || "Note sans titre";
        const dateStr = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(new Date(note.createAt));
        
        const printWindow = window.open('', '', 'width=800,height=900');
        if (!printWindow) {
            toast.error("Veuillez autoriser les fenêtres contextuelles (pop-ups) pour exporter.");
            return;
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>${title}</title>
                    <style>
                        body { 
                            font-family: system-ui, -apple-system, sans-serif; 
                            padding: 40px; 
                            color: #111827;
                            max-width: 800px;
                            margin: 0 auto;
                        }
                        h1 { 
                            color: #ea580c; 
                            border-bottom: 2px solid #ea580c; 
                            padding-bottom: 10px; 
                            margin-top: 0;
                        }
                        .date { 
                            color: #6b7280; 
                            font-size: 14px; 
                            margin-bottom: 30px; 
                        }
                        .content { 
                            line-height: 1.6; 
                        }
                        /* Cache les éléments inutiles à l'impression */
                        @media print {
                            @page { margin: 2cm; }
                        }
                    </style>
                </head>
                <body>
                    <h1>${title}</h1>
                    <div class="date">Écrit le ${dateStr}</div>
                    <div class="content">${note.description || "<em>Aucun contenu</em>"}</div>
                    
                    <script>
                        // Déclenche l'impression dès que la page est chargée
                        window.onload = () => {
                            window.print();
                            // Ferme la fenêtre après l'impression (certains navigateurs bloquent, d'autres non)
                            setTimeout(() => window.close(), 500);
                        };
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    return (
        <div className="flex flex-col space-y-4 w-full">
            {/* Barre de recherche (5.2) */}
            {initialNotes.length > 0 && (
                <div className="relative w-full md:w-1/2 mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                        type="text" 
                        placeholder="Rechercher dans vos notes..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            )}

            {sortedNotes.length < 1 ? (
                <div className="flex flex-col items-center justify-center h-min-[400px] rounded-md border border-dashed p-3 mt-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-orange-500/20 mb-4">
                        <File className="text-orange-900"/>
                    </div>
                    <p className="text-white text-lg">Aucune note trouvée</p>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white mt-6" asChild>
                        <Link href="/dashboard/notes/create">Créer une nouvelle note</Link>
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col space-y-4">
                    {sortedNotes.map((item, index) => (
                        <Card key={index} className={`flex items-center justify-between p-4 ${item.pinned ? 'border-orange-500 bg-orange-500/5' : ''}`}>
                            <div>
                                <h2 className="text-orange-500 font-bold text-xl flex items-center gap-2">
                                    {item.pinned && <Pin className="w-4 h-4 text-orange-500 fill-orange-500" />}
                                    {item.title}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    écrit le {new Intl.DateTimeFormat('fr-FR', { dateStyle: "full" }).format(new Date(item.createAt))}
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                {/* Bouton Exporter */}
                                {hasPremiumAccess && (
                                    <Button type="button" variant="outline" size="icon" onClick={() => handleExport(item)} title="Exporter en PDF">
                                        <Download className="w-4 h-4 text-gray-500" />
                                    </Button>
                                )}

                                {/* Bouton Épingler */}
                                <Button 
                                    type="button" 
                                    variant={item.pinned ? "default" : "outline"}
                                    size="icon" 
                                    onClick={() => handleTogglePin(item.id)}
                                    title={item.pinned ? "Désépingler" : "Épingler"}
                                >
                                    <Pin className="w-4 h-4" />
                                </Button>

                                {/* Boutons de partage */}
                                <ShareButtons title={item.title} description={item.description} />

                                <Button type="button" className="bg-yellow-500 hover:bg-yellow-600 text-white" size="icon" asChild>
                                    <Link href={`notes/note/${item.id}`}>
                                        <FilePenLine className="w-4 h-4"/>
                                    </Link>
                                </Button>
                                <DeleteButton id={item.id}/>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

