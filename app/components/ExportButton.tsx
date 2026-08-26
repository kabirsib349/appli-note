"use client";

import { Button } from "@/components/ui/button";
import { Download, Lock } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";

interface ExportButtonProps {
    title: string | null;
    description: string | null;
    createAt: Date;
    hasPremiumAccess: boolean;
}

export default function ExportButton({ title, description, createAt, hasPremiumAccess }: ExportButtonProps) {
    const handleExport = () => {
        if (!hasPremiumAccess) {
            toast.error("L'export Markdown est réservé aux membres Premium.");
            return;
        }

        const safeTitle = title || "Note sans titre";
        const content = `# ${safeTitle}\n\n*Date: ${new Date(createAt).toLocaleDateString("fr-FR")}*\n\n${description || ""}`;
        
        const blob = new Blob([content], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${safeTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!hasPremiumAccess) {
        return (
            <Button type="button" variant="outline" className="bg-gray-100 text-gray-500" asChild>
                <Link href="/dashboard/payment">
                    <Lock className="w-4 h-4 mr-2" />
                    Exporter (Premium)
                </Link>
            </Button>
        );
    }

    return (
        <Button type="button" variant="outline" onClick={handleExport} className="bg-white hover:bg-gray-100 text-gray-800">
            <Download className="w-4 h-4 mr-2" />
            Exporter en .md
        </Button>
    );
}

