import User from "@/models/userModel";
import bcrypt from 'bcrypt';
import { connectDB } from "@/lib/mongo";
export async function POST(request: Request) {
    connectDB();
    const {name, email, username, password} = await request.json();
    try{
        const user=await User.findOne({email});

        if(user){
            return new Response(JSON.stringify({error: "User already exists"}), {status: 400});
        }
        else{
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password, salt);
            const newUser=new User({
                name,
                email,
                username,
                password:hashedPassword
            })
            const savedUser=await newUser.save();
            return new Response(JSON.stringify(savedUser), {status: 200});
        }

    }
    catch(error){
        console.log(error);
    }


}