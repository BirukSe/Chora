import * as z from "zod";
export const LoginValidation=z.object({
   
   username: z.string().min(2, "Username must be at least 2 characters").max(50, "Username cannot exceed 50 characters"),
   
   password: z.string().min(8, {message: "Too short password"}),
})