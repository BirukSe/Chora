import User from "@/models/userModel";
import { connectDB } from "@/lib/mongo";

export async function POST(req: Request) {
    connectDB();
    const { username } = await req.json();
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return new Response("User not found", { status: 404 });
        }
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}
