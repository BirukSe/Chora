
"use client";
import { useEffect, useState } from "react";
import React from "react";

import { UserButton } from "@clerk/nextjs";
import Navbar from "../_components/Navbar";
import { useRouter } from "next/navigation";
import Loader from "../_components/loader";
import d from '../../public/icons/like.png'
import { useAuthContext } from "../_components/AuthContext";
import { set } from "mongoose";
interface Post {

  _id: string;
  title: string;
  desc?: string;
  content?: string;
  author?: {
    username: string;
  };
}

const Feed = () => {
  const { currentUserName } = useAuthContext();
 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [array, setArray] = useState<Post[]>([]);
  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [liked, isLikered]=useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const rr=await fetch('/api/info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: currentUserName }),
        });
        const data=await rr.json();
        setUserId(data.id);
        const resp = await fetch('/api/info');

        if (resp.ok) {
          const data = await resp.json();
          setArray(data.posts); // Correct state update here
          console.log(data.posts); // Check the structure
        } else {
          console.log("Error fetching posts");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleLike=async(postId)=>{
    try{
      console.log(userId);
      const response=await fetch('/api/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, postId }),
      })
      if(response.ok){
        isLikered(true);
      }

      if(response.ok){
        console.log("Liked");
      }


    }
    catch(error){
      console.log(error);
    }
  }
  const handleComment=async()=>{
    console.log("Comment button");
  }

  

  return (
    <>
      {isLoading && <Loader />}
      <div className="bg-gray-900 text-white min-h-screen">
        <h1>Hello {currentUserName}</h1>
        <div className="flex justify-between items-center p-4 shadow-xl">
          <div className="flex items-center">
            <img src="/icons/B.png" alt="Logo" className="w-16 h-16" />
          </div>
          <h1 className="flex items-center text-2xl font-bold text-center mx-auto space-x-2">
            <span>Home</span>
          </h1>
          <div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div className="mt-16">
            <Navbar />
          </div>
          <div className="mr-[450px]">
            <div className="flex text-center">
              <h1 className="text-2xl font-bold text-center mx-auto space-x-2 flex text-center">
                <span className="flex s">
                 
                </span>
              </h1>
            </div>
            <div className="">
              {/* <h1 className="text-2xl font-bold text-center mx-auto space-x-2">
                Posts
              </h1> */}
              {array.map((post) => (
                <div key={post._id} className="box ">
                  <div className="flex flex-col shadow-xl  ml-[200px] w-96 bg-orange-900">
                  <div className="flex">
                  <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center text-white bg-slate-600">
                      {post.author?.name[0].toUpperCase()}
                   </div>
                   <div className="font-extrabold flex items-center text-2xl">
                    {post.author?.name.charAt(0).toUpperCase() + post.author?.name.slice(1).toLowerCase()}
                   </div>
                   <div className="flex items-center text-xl">
                    ({post.author?.username})
                    </div>


                  </div>
                  <div className="flex justify-center">
                    <p>{post.author?.email}</p>
                    </div>
                    <div>
                      <h1 className="font-extrabold flex justify-center text-2xl">{post.title}</h1>

                    </div>
                    <div className="h-96">
                      <p className="flex justify-center">{post.content}</p>
                      </div>
                      <div className="flex justify-around">
                      <div onClick={()=>handleLike(post.id)} className="cursor-pointer flex">
                      {liked ? <img src="/icons/liked.png" className="w-10 h-10" /> : <img src="/icons/like.png" className="w-10 h-10" />}
                        <p className="font-extrabold items-center">{post.number}</p>
                      </div>
                      <div onClick={handleComment} className="cursor-pointer">
                      <img src="/icons/comment.png" className="w-10 h-10" />
                      </div>
                      


                      </div>
                     

                  </div>
            


                  


                  
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
