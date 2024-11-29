import { connectDB } from "@/lib/mongo";
import Post from "@/models/postModel";
import User from "@/models/userModel";

export async function POST(req: Request) {
    await connectDB(); // Await the database connection

    try {
        const { id, title, content } = await req.json();

        
        if (!id || !title || !content) {
            return new Response(JSON.stringify({ error: "Missing fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Find user by ID
        const user = await User.findById(id);
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Create and save the new post
        const newPost = new Post({ title, content, author: id }); // Assume `author` links to the user
        await newPost.save();

        // Update user's posts and save
        user.posts.push(newPost._id);
        await user.save();

        // Return success response
        return new Response(JSON.stringify({ message: "Post created", post: newPost }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating post:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
