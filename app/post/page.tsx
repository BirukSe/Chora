// "use client"
// import React, {useState, useEffect} from 'react'
// import { useRouter } from 'next/navigation';
// import Loader from '../_components/loader';
// import { useAuthContext } from '../_components/AuthContext';

// const page = () => {
//     const { currentUserName } = useAuthContext();
//     const router=useRouter();
//     const [title, setTitle]= useState('');
//     const [content, setContent]= useState('');
//     const [isLoading, setIsLoading]=useState<boolean>(false);
//     const [id, setId]= useState('');
//     useEffect(()=>{
//         console.log(title, content);
//         const postContent=async ()=>{
//             try{
//                 setIsLoading(true);
//                 const resp=await fetch('/api/getuser', {
//                     method: 'POST',
//                     headers: {
//                       'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ username: currentUserName }),
                    
//                 })
//                 if(resp.ok){
//                     const data=await resp.json();
//                     setId(data._id);
//                 }
               

//             }
//             catch(error){
//                 console.log(error);
//             }
//             finally{
//                 setIsLoading(false);

//             }
//         }
        
//         postContent();

//     }, [])
//     const createPost=async ()=>{
//         try{
//             setIsLoading(true);
//             const resp=await fetch(`/api/post/${id}`, {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ title, content}),
                
//             })
//             if(resp.ok){
//                 router.push('/feed');
//             }
//             else{
//                 console.log('error');
//             }
//         }        
//         catch(error){
//             console.log(error);
//         }
//         finally{
//             setIsLoading(false);
//     }

//   return (
//     <>
//     {isLoading && <Loader/>}
//     <div>
//         <h1 className="flex justify-center font-extrabold text-5xl font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">New Post</h1>
//         <div className="shadow-md bg-white p-4 rounded-lg">
//     <h1 className="font-extrabold text-3xl">What do you have on your mind?</h1>
//   </div>
//   <div className="pt-7">
//     <h1 className="font-extrabold text-4xl">Title</h1>
//     <input type="text" className="shadow-md bg-white p-4 rounded-lg" onChange={(e)=>setTitle(e.target.value)} value={title} placeholder="Enter title of your post"/>
//     <h1 className="font-extrabold text-4xl">Content</h1>
//     <textarea className="shadow-md bg-white p-4 rounded-lg" rows={4} cols={50} onChange={(e)=>setContent(e.target.value)} value={content} placeholder="Enter your post"/><br></br>
//    <button className="shadow-md bg-red-500 p-4 rounded-lg" onClick={createPost}>Post</button>
//   </div>

 
      
      
//     </div>
//     </>
//   )
// }
// }
// export default page;
"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "../_components/loader";
import { useAuthContext } from "../_components/AuthContext";

const Page = () => {
  const { currentUserName } = useAuthContext();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [id, setId] = useState("");

  useEffect(() => {
    console.log(title, content);
    const postContent = async () => {
      try {
        setIsLoading(true);
        const resp = await fetch("/api/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: currentUserName }),
        });
        if (resp.ok) {
          const data = await resp.json();
          setId(data._id);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    postContent();
  }, [currentUserName]);

  const createPost = async () => {
    try {
      setIsLoading(true);
      const resp = await fetch('/api/post' ,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title, content }), 
      });
  
      if (resp.ok) {
        router.push("/feed");
      } else {
        console.log("Error creating post");
      }
    } catch (error) {
      console.log(error);
    } finally {// Check for required fields
      setIsLoading(false);
    }
  };
  

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <h1 className="flex justify-center font-extrabold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          New Post
        </h1>
        <div className="shadow-md bg-white p-4 rounded-lg">
          <h1 className="font-extrabold text-3xl">What do you have on your mind?</h1>
        </div>
        <div className="pt-7">
          <h1 className="font-extrabold text-4xl">Title</h1>
          <input
            type="text"
            className="shadow-md bg-white p-4 rounded-lg"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Enter title of your post"
          />
          <h1 className="font-extrabold text-4xl">Content</h1>
          <textarea
            className="shadow-md bg-white p-4 rounded-lg"
            rows={4}
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Enter your post"
          />
          <br />
          <button
            className="shadow-md bg-red-500 p-4 rounded-lg"
            onClick={createPost}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
