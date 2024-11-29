"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
const Navbar = () => {
  const router=useRouter();
  return (
    <div className=" text-white min-h-screen">
      <div className="fixed bottom-0 left-0 w-full sm:w-auto sm:left-auto sm:bottom-auto sm:flex-col sm:gap-4 bg-gray-800 p-4 shadow-md">
        <div className="flex justify-between sm:flex-col sm:items-center gap-11">
          <div className="text-2xl font-extrabold flex gap-2 hover:text-[#2fbbb3] cursor-pointer" onClick={()=>{router.push('/feed')}}>
          <img src="/icons/home.png" alt="Home Icon" className="w-6 h-6 bg-white" />
          <h1>Home</h1>
            </div>
          <div className="text-2xl font-extrabold flex gap-2 ml-2 hover:text-[#2fbbb3] cursor-pointer" onClick={()=>{router.push('/friends')}}>
            <img src="/icons/world.png" alt="Home Icon" className="w-6 h-6 bg-white" />
            Friends</div>
          <div className="text-2xl font-extrabold flex gap-2 ml-4 hover:text-[#2fbbb3] cursor-pointer" onClick={()=>{router.push('/post')}}>
            <img src="/icons/write.png" alt="Home Icon" className="w-6 h-6 bg-white" />
            New Post</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
