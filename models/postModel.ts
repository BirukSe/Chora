import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the User model
            ref: "User",
            required: true,
        },
        // Additional fields can be added as needed, e.g., likes, comments, etc.
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId, // Reference to the User model
                ref: "User",
                default: [],
            },

        ],
      
        comments: [
            {
                text: String,
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
