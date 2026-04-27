"use client";
import { Typewriter, Cursor } from "react-simple-typewriter";
import LogoNote from "@/public/logo_note.png";
import Image from "next/image";
import ButtonsProvider from "./components/ButtonsProvider";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home(){
  const {data:session} = useSession();
 if(session){
  return redirect("/dashboard/notes");
 }
  return(
    <section className="w-full h-screen flex items-center justify-center flex-col gap-2">
       <Image src={LogoNote} alt="Logo" width={100} height={100} className="mb-4 object-contain"/>
       <h1 className="flex items-center mb-2 uppercase font-black text-4xl md:text-6xl text-center">
        <Typewriter typeSpeed={50} words={["Bienvenue","Welcome","Willkommen","Vienvenido","Benvenuto"]} loop={0}/>
        <span><Cursor/></span>
       </h1>
       <p className="my-2 text-center">Laisser votre cerveau accoucher ses idées</p>
       <ButtonsProvider/>
    </section>
  );
}