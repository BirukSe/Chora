import Post from "@/models/postModel";
import { connectDB } from "@/lib/mongo";

export async function GET(req: Request) {
    connectDB();
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}