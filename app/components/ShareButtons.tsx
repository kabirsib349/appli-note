"use client";

import { Button } from "@/components/ui/button";
import { Twitter } from "lucide-react";

interface ShareButtonsProps {
    title: string | null;
    description: string | null;
}

const GmailIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 8.404l8.073-4.911c1.618-1.214 3.927-.059 3.927 1.964Z" fill="#EA4335"/>
        <path d="M18.545 11.727v9.273h3.819a1.636 1.636 0 0 0 1.636-1.636V5.455c0-.49-.408-.945-.981-1.09l-4.474 2.726v4.636Z" fill="#C5221F"/>
        <path d="M0 5.455v13.909c0 .904.732 1.636 1.636 1.636h3.819v-9.273l-4.474-4.636C.408 4.51 0 4.964 0 5.455Z" fill="#FABB05"/>
    </svg>
);

const OutlookIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.825 4.398c0-1.123-.974-2.03-2.176-2.03H3.35c-1.2 0-2.175.907-2.175 2.03v15.204c0 1.122.975 2.03 2.175 2.03h17.3c1.202 0 2.176-.908 2.176-2.03V4.398Z" fill="#0072C6"/>
        <path d="M1.2 7.042 12 13.953l10.8-6.91v12.56a1.956 1.956 0 0 1-1.975 1.95H3.175A1.956 1.956 0 0 1 1.2 19.602V7.042Z" fill="#28A8EA"/>
        <path d="M12 13.953 1.2 7.042A1.955 1.955 0 0 1 3.175 5.09h17.65c.983 0 1.8.704 1.975 1.632L12 13.953Z" fill="#0072C6"/>
    </svg>
);

export default function ShareButtons({ title, description }: ShareButtonsProps) {
    const safeTitle = title || "Nouvelle note";
    const rawDescription = description || "";
    const safeDescription = rawDescription.replace(/<[^>]*>?/gm, ''); // Retire les balises HTML
    
    const twitterText = encodeURIComponent(`${safeTitle}\n\n${safeDescription}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}`;

    const mailSubject = encodeURIComponent(safeTitle);
    const mailBody = encodeURIComponent(safeDescription);

    const mailtoUrl = `mailto:?subject=${mailSubject}&body=${mailBody}`;

    // Forcer le choix du compte Google (Account Chooser) avant d'ouvrir Gmail
    const gmailBaseUrl = `https://mail.google.com/mail/?view=cm&su=${mailSubject}&body=${mailBody}`;
    const gmailUrl = `https://accounts.google.com/AccountChooser?continue=${encodeURIComponent(gmailBaseUrl)}`;

    return (
        <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="icon" className="bg-[#1DA1F2]/10 border-[#1DA1F2]/20 hover:bg-[#1DA1F2]/20" asChild title="Partager sur X (Twitter)">
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                </a>
            </Button>

            <Button type="button" variant="outline" size="icon" className="bg-red-500/10 border-red-500/20 hover:bg-red-500/20" asChild title="Envoyer via Gmail">
                <a href={gmailUrl} target="_blank" rel="noopener noreferrer">
                    <GmailIcon />
                </a>
            </Button>

            <Button type="button" variant="outline" size="icon" className="bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20" asChild title="Envoyer via Outlook / Email natif">
                <a href={mailtoUrl} target="_blank" rel="noopener noreferrer">
                    <OutlookIcon />
                </a>
            </Button>
        </div>
    );
}

