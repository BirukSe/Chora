import Post from "@/models/postModel";
import { connectDB } from "@/lib/mongo";
import mongoose from "mongoose";

export const POST = async (req: Request) => {
  const jsonData = await req.json();
  const { userId, postId } = jsonData;

  await connectDB();
  console.log("User ID:", userId, "Post ID:", postId);

  try {
    if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid IDs");
      return new Response(JSON.stringify({ error: "Invalid IDs" }), { status: 400 });
    }

    const existingPost = await Post.findById(postId);

    if (!existingPost) {
      console.log("Post not found");
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    if (existingPost.likes.includes(userId)) {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: new mongoose.Types.ObjectId(userId) },
        },
        { new: true }
      );

      if (!post) {
        console.log("Post not found");
        return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
      }

      console.log("Post updated successfully:", post);
      return new Response(JSON.stringify({ msg: "dislike" }), { status: 200 });
    }

    // If the user hasn't liked the post yet
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: new mongoose.Types.ObjectId(userId) } },
      { new: true }
    );

    if (!post) {
      console.log("Post not found");
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    console.log("Post updated successfully:", post);
    return new Response(JSON.stringify({ msg: "like"}), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
