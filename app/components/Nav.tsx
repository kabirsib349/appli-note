"use client";

import Link from "next/link";
import LogoNote from "@/public/logo_note.png";
import Image from "next/image";
import {ThemeToggle} from "./ThemeToggle"; 

export default function Nav() {
  return (
   <nav className="max-w-[1200px] mx-auto mt-2 h-[80px] flex items-center justify-between p-5 border-b border-gray-300">
    <div>
        <Link href="/">
            <Image src={LogoNote} alt="Logo" width={80} height={80} />
        </Link>
    </div>
    <div className="flex items-center gap-4">
        <ThemeToggle/>
    </div> 
   </nav>
  );
}