import Post from '@/models/postModel';
import { connectDB } from '@/lib/mongo';
import User from '@/models/userModel';
export const GET = async (req: Request) => {
    await connectDB();

    try {
       
        const posts = await Post.find().populate("author").populate({
            path: "comments.user",  
            select: "username email name"  
        });;
        

        if (!posts || posts.length === 0) {
            return new Response(JSON.stringify({ error: 'No posts found' }), { status: 404 });
        }

        
        return new Response(JSON.stringify({
            posts: posts.map(post => ({
                id: post._id,
                title: post.title,
                content: post.content,
                author: post.author ? {
                    username: post.author.username,
                    email: post.author.email,
                    name: post.author.name,
                } : null,
                likes: post.likes,
                comments: post.comments,
               
            }))
        }), { status: 200 });
    } catch (error) {
        console.error('Error fetching posts with author:', error);

        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};
export const DELETE=async (req: Request)=>{
    await connectDB();
    const {id}=await req.json();
    try{
        
        const response=await User.findByIdAndDelete(id);
        return new Response(JSON.stringify({
           response
        }), { status: 200 });
       

    }catch(error){
        console.log(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
export const POST=async(req: Request)=>{
    await connectDB();
    const {username}=await req.json();
    try{
        const response=await User.findOne({username});
        if(!response){
            return new Response(JSON.stringify({error: "User does not exist"}), {status: 400});

        }
        return new Response(JSON.stringify({
            id: response._id
         }), { status: 200 });


    }catch(error){
        console.log(error);
        return new Response(JSON.stringify({error: "Internal Server Error"}), {status: 500});

    }
}
