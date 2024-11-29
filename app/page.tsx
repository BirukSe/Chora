"use client"
import Image from "next/image";
import Login from "./_components/Login";
import Signup from "./_components/Signuper";
import { set } from "zod";
import {useState} from 'react'

export default function Home() {
  const [isSignup, setIsSignup] = useState(true);
  return (
    <section className="flex flex-1 justify-center items-center flex-row py-10 bg-black text-white min-h-screen">
    <div className="flex-1 flex justify-center items-center px-4 md:px-10">
      <div className="max-w-lg w-full">
        {isSignup ? (
          <Signup onToggle={()=>setIsSignup(false) } />
        ) : (
          <Login onToggle={()=>setIsSignup(true) }/>
        )}
        
      </div>
    </div>
  
   
    <img
      src='/pro.jpg'
      alt="/icons/B.png"
      className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
    />
  </section>
  
  
  );
}
