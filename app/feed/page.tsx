"use client";
import { useEffect, useState } from "react";
import React from "react";

import { UserButton } from "@clerk/nextjs";
import Navbar from "../_components/Navbar";
import { useRouter } from "next/navigation";
import Loader from "../_components/loader";
import { useAuthContext } from "../_components/AuthContext";
import e from "express";
import { comment } from "postcss";



interface Post {
  _id: string;
  title: string;
  desc?: string;
  content?: string;
  author?: {
    username: string;
    name: string;
    email?: string;
  };
}


const Feed = () => {
  const { currentUserName } = useAuthContext();
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [array, setArray] = useState<Post[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [liked, isLikered] = useState<boolean>(false);
  const [visibleComments, setVisibleComments] = useState<{ [key: string]: boolean }>({});
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const rr = await fetch("/api/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: currentUserName }),
        });
        const data = await rr.json();
        setUserId(data.id);
        console.log(data);

        const resp = await fetch("/api/info");
        if (resp.ok) {
          const postData = await resp.json();
          setArray(postData.posts);
       
          console.log(postData.posts);
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
  }, [userId, currentUserName, liked]);

  const handleLike = async (postId:string) => {
    console.log("PostId", postId);
    try {
      console.log(userId);
      const response = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, postId }),
      });
      if (response.ok) {
        const data = await response.json();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = (postId: string) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };
  const triggerSend=async (postId:string)=>{
    try{
      const response=await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, postId, message }),
      })
      if(response.ok){
        const data=await response.json();
        window.location.reload();
      }

    }catch(error){
      console.log(error);
    }

  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="bg-gray-900 text-white h-screen overflow-y-auto">
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

        <div className="flex">
          <div className="mt-16">
            <Navbar />
          </div>
          <div className="flex-grow mx-auto max-w-3xl p-4">
            <h1 className="text-2xl font-bold text-center">Hello {currentUserName}</h1>
            {array.map((post) => (
              <div key={post._id} className="flex flex-col shadow-xl border-l-gray-600 overflow-hidden max-w-lg mx-auto mb-8 ml-[200px] h-auto">
                <div className="flex p-4">
                  <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center text-white bg-slate-600">
                    {post.author?.name[0].toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <div className="font-extrabold text-2xl">
                      {post.author?.name.charAt(0).toUpperCase() + post.author?.name.slice(1).toLowerCase()}
                    </div>
                    <div className="text-xl">({post.author?.username})</div>
                  </div>
                </div>
                <div className="px-4">
                  <h1 className="font-extrabold text-2xl">{post.title}</h1>
                  <p className="mt-2">{post.content}</p>
                </div>
                <div className="flex justify-around p-4">
                  <div onClick={() => handleLike(post.id)} className="cursor-pointer flex items-center">
                    {post.likes.includes(userId) ? (
                      <img src="/icons/liked.png" className="w-10 h-10" />
                    ) : (
                      <img src="/icons/like.png" className="w-10 h-10" />
                    )}
                    <p className="font-extrabold ml-2">{post.likes.length}</p>
                  </div>
                  <div onClick={() => handleComment(post.id)} className="cursor-pointer">
                    <img src="/icons/comment.png" className="w-10 h-10" />
                  </div>
                </div>
                {visibleComments[post.id] && (
                  <>
                  <div className="bg-gray-800 text-white p-4 mt-4 overflow-auto h-80">
                    <h2 className="font-bold text-lg">Comments</h2>
                    {post.comments.map((comment) => (
                      <>
                      <div key={comment.id} className="mt-2">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center text-white bg-slate-600">
                            {comment.user?.name[0].toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="font-extrabold text-2xl">
                              {comment.user?.name.charAt(0).toUpperCase() + comment.user?.name.slice(1).toLowerCase()}
                            </div>
                            <div className="text-xl">({comment.user?.username})</div>
                          </div>
                        </div>
                        <div className="ml-16 mt-2">{comment.text}</div>
                      </div>
                       <div className="mt-24">
                      
                     
                       </div>
                       </>
                    ))}
                  </div>
                  <div className="flex bg-gray-800">
                       
                       <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center text-white bg-slate-600">
                              {post.author?.name[0].toUpperCase()}
                            </div>
                           
  
                      <textarea placeholder="Enter your comment" className="bg-white ml-4 w-80 text-black" onChange={(e)=>setMessage(e.target.value)} value={message}>
  
                      </textarea>
                   
                      <div onClick={()=>triggerSend(post.id)} className="cursor-pointer">
                       <img src="/icons/send.png" className="w-10 h-10 ml-16"/>
                      </div>
  
                      </div>
                 
                
                    </>

                )}
               
              </div>
              

            ))}
            
          
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
