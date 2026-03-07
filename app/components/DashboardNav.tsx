"use client";

import { Notebook,Settings,CreditCard } from "lucide-react"
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardNav(){

    const pathname=usePathname();
    const menuDashboard = [
        {name: "Notes", icon: Notebook, path: "/dashboard/notes"},
        {name: "Paramètres", icon: Settings, path: "/dashboard/settings"},
        {name: "Paiement", icon: CreditCard, path: "/dashboard/payment"},
    ];

    return(
        <nav className="flex md:flex-col md:h-full md:w-16 w-full lg:w-40 gap-2">
            {menuDashboard.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                    <Link key={index} href={item.path}>
                        <div className={`flex items-center justify-center lg:justify-start gap-2 cursor-pointer lg:p-3 p-2 hover:bg-orange-500 
                        hover:bg-opacity-50 hover:text-white text-sm font-bold rounded-md ${isActive && "bg-orange-500 text-white"}`}>
                            <item.icon className="w-4"/>
                            <span className="hidden lg:block">{item.name}</span>
                        </div>
                    </Link>
                )   
            })}
        </nav>
    );
}