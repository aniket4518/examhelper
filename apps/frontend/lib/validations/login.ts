import { z } from "zod";
import { signInSchema, createUserSchema } from "@repo/zod/zod";

// Re-export the shared schema for use in frontend
export const loginSchema = signInSchema;
export const signupSchema = createUserSchema;

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;

// Helper function to get field-specific error messages for UI display
export const getFieldRequirements = (field: "email" | "password" | "name") => {
  const requirements = {
    email: [
      "Must be a valid email format",
      "Must include @ symbol",
      "Must include a domain (e.g., .com, .org)",
      "Maximum 254 characters",
    ],
    password: ["Minimum 6 characters", "Maximum 50 characters"],
    name: ["Minimum 3 characters", "Maximum 100 characters"],
  };
  return requirements[field];
};
