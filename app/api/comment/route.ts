import Post from '@/models/postModel';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongo';

export const POST = async (req: Request) => {
  const { postId, userId, message } = await req.json();
  await connectDB();
  
  try {
  
    const response = await Post.findById(postId);
    if (!response) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }


    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            user: new mongoose.Types.ObjectId(userId),
            text: message, 
            createdAt: new Date() 
          }
        }
      },
      { new: true } 
    );

    if (!post) {
      return new Response(JSON.stringify({ error: "Failed to add comment" }), { status: 400 });
    }

  
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

