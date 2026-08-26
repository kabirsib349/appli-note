"use client";

import { Button } from "@/components/ui/button";
import { Twitter, Mail } from "lucide-react";

interface ShareButtonsProps {
    title: string | null;
    description: string | null;
}

export default function ShareButtons({ title, description }: ShareButtonsProps) {
    const safeTitle = title || "Nouvelle note";
    const safeDescription = description || "";
    
    // Formatage pour Twitter
    const twitterText = encodeURIComponent(`${safeTitle}\n\n${safeDescription}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}`;

    // Formatage générique
    const mailSubject = encodeURIComponent(safeTitle);
    const mailBody = encodeURIComponent(safeDescription);

    // Liens
    const mailtoUrl = `mailto:?subject=${mailSubject}&body=${mailBody}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${mailSubject}&body=${mailBody}`;

    return (
        <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="icon" className="bg-[#1DA1F2]/10 border-[#1DA1F2]/20 hover:bg-[#1DA1F2]/20" asChild title="Partager sur X (Twitter)">
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                </a>
            </Button>

            <Button type="button" variant="outline" size="icon" className="bg-red-500/10 border-red-500/20 hover:bg-red-500/20" asChild title="Envoyer via Gmail">
                <a href={gmailUrl} target="_blank" rel="noopener noreferrer">
                    <Mail className="w-4 h-4 text-red-500" />
                </a>
            </Button>

            <Button type="button" variant="outline" size="icon" className="bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20" asChild title="Envoyer via Outlook / Email natif">
                <a href={mailtoUrl} target="_blank" rel="noopener noreferrer">
                    <Mail className="w-4 h-4 text-blue-500" />
                </a>
            </Button>
        </div>
    );
}

