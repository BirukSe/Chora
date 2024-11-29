import User from "@/models/userModel";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { connectDB } from "@/lib/mongo";

export async function POST(req: Request) {
    await connectDB();
    const {username, password} = await req.json();
    if(!username || !password){
        return new Response("Please enter all fields", {status: 400})
    }
    try {
        const user = await User.findOne({username});
        if(!user){
            return new Response("User not found", {status: 404})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return new Response("Invalid password", {status: 400})
        }
        return new Response("Login successful", {status: 200})
    } catch (error: any) {
        return new Response(error.message, {status: 500})
    }
}