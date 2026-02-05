import { z } from "zod";
import { signInSchema } from "@repo/zod/zod";

// Re-export the shared schema for use in frontend
export const loginSchema = signInSchema;

export type LoginFormData = z.infer<typeof loginSchema>;

// Helper function to get field-specific error messages for UI display
export const getFieldRequirements = (field: "email" | "password") => {
  const requirements = {
    email: [
      "Must be a valid email format",
      "Must include @ symbol",
      "Must include a domain (e.g., .com, .org)",
      "Maximum 254 characters",
    ],
    password: ["Minimum 6 characters", "Maximum 50 characters"],
  };
  return requirements[field];
};
