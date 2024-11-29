import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        name: String,
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // Array of Post IDs
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
