import * as z from "zod";
export const SignupValidation=z.object({
   name: z.string().min(2, {message: "Too short"}),
   username: z.string().min(2, "Username must be at least 2 characters").max(50, "Username cannot exceed 50 characters"),
   email: z.string().email(),
   password: z.string().min(8, {message: "Too short password"}),
})