import Post from '@/models/postModel';
import { connectDB} from '@/lib/mongo';
import mongoose from 'mongoose';
export const POST=async (req: Request)=>{
    const {userId, postId}=req.json();
    await connectDB();
    try{
        const post=await Post.findByIdAndUpdate(postId, {
            $push: {likes: {userId: new mongoose.Types.ObjectId(userId)}},
        },{new: true});
        if(!post){
            console.log("Post not found");
        }
        return new Response(JSON.stringify({
            post
         }), { status: 200 });


        


    }catch(error){
        console.log("Something went wrong");
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });

    }
}