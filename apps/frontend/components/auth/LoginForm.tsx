"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "@/hooks/useForm";
import { useAuthStore } from "@/hooks/zustand/authStore";
import { loginSchema, getFieldRequirements, type LoginFormData } from "@/lib/validations/login";

// Icons
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

interface LoginFormProps {
  className?: string;
  onSuccess?: () => void;
}

export function LoginForm({ className, onSuccess }: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showRequirements, setShowRequirements] = useState<"email" | "password" | null>(null);
  
  const { login, setLoading, setError } = useAuthStore();

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important: allows cookies to be set
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Invalid email or password. Please try again.");
      }

      const responseData = await response.json();
      
      // Store user info in zustand (token is in HttpOnly cookie from server)
      login({
        id: responseData.user.id,
        email: responseData.user.email,
        name: responseData.user.name,
      });

      onSuccess?.();
      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    submitError,
    handleSubmit,
    getFieldProps,
  } = useForm({
    schema: loginSchema,
    onSubmit: handleLogin,
  });

  // Email validation checks for requirements display
  const emailChecks = {
    hasValue: (values.email?.length || 0) > 0,
    hasAt: values.email?.includes("@") || false,
    hasDomain: /\.[a-zA-Z]{2,}$/.test(values.email || ""),
    isValidFormat: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email || ""),
  };

  // Password validation checks
  const passwordChecks = {
    hasMinLength: (values.password?.length || 0) >= 6,
    hasMaxLength: (values.password?.length || 0) <= 50,
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6">
              {/* Submit Error Alert */}
              {submitError && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
                  <AlertIcon />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Email Field */}
              <div className="grid gap-2">
                <Label htmlFor="email" error={touched.email && !!errors.email}>
                  Email <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    autoComplete="email"
                    {...getFieldProps("email")}
                    onFocus={() => setShowRequirements("email")}
                    aria-describedby="email-error email-requirements"
                    aria-invalid={touched.email && !!errors.email}
                  />
                </div>
                
                {/* Email Error */}
                {touched.email && errors.email && (
                  <p id="email-error" className="text-sm text-red-500 flex items-center gap-1">
                    <AlertIcon />
                    {errors.email}
                  </p>
                )}

                {/* Email Requirements Tooltip */}
                {showRequirements === "email" && (
                  <div
                    id="email-requirements"
                    className="rounded-lg border border-neutral-700 bg-neutral-800 p-3 text-xs"
                  >
                    <p className="mb-2 font-medium text-neutral-300">Email requirements:</p>
                    <ul className="space-y-1">
                      <li className={cn("flex items-center gap-2", emailChecks.hasValue ? "text-green-400" : "text-neutral-400")}>
                        {emailChecks.hasValue ? <CheckIcon /> : <XIcon />}
                        Must not be empty
                      </li>
                      <li className={cn("flex items-center gap-2", emailChecks.hasAt ? "text-green-400" : "text-neutral-400")}>
                        {emailChecks.hasAt ? <CheckIcon /> : <XIcon />}
                        Must include @ symbol
                      </li>
                      <li className={cn("flex items-center gap-2", emailChecks.hasDomain ? "text-green-400" : "text-neutral-400")}>
                        {emailChecks.hasDomain ? <CheckIcon /> : <XIcon />}
                        Must include a domain (e.g., .com, .org)
                      </li>
                      <li className={cn("flex items-center gap-2", emailChecks.isValidFormat ? "text-green-400" : "text-neutral-400")}>
                        {emailChecks.isValidFormat ? <CheckIcon /> : <XIcon />}
                        Must be a valid email format
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" error={touched.password && !!errors.password}>
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-500 underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...getFieldProps("password")}
                    onFocus={() => setShowRequirements("password")}
                    className="pr-10"
                    aria-describedby="password-error password-requirements"
                    aria-invalid={touched.password && !!errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>

                {/* Password Error */}
                {touched.password && errors.password && (
                  <p id="password-error" className="text-sm text-red-500 flex items-center gap-1">
                    <AlertIcon />
                    {errors.password}
                  </p>
                )}

                {/* Password Requirements Tooltip */}
                {showRequirements === "password" && (
                  <div
                    id="password-requirements"
                    className="rounded-lg border border-neutral-700 bg-neutral-800 p-3 text-xs"
                  >
                    <p className="mb-2 font-medium text-neutral-300">Password requirements:</p>
                    <ul className="space-y-1">
                      <li className={cn("flex items-center gap-2", passwordChecks.hasMinLength ? "text-green-400" : "text-neutral-400")}>
                        {passwordChecks.hasMinLength ? <CheckIcon /> : <XIcon />}
                        Minimum 6 characters
                      </li>
                      <li className={cn("flex items-center gap-2", passwordChecks.hasMaxLength ? "text-green-400" : "text-neutral-400")}>
                        {passwordChecks.hasMaxLength ? <CheckIcon /> : <XIcon />}
                        Maximum 50 characters
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" isLoading={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>

              {/* Divider */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-neutral-700">
                <span className="relative z-10 bg-neutral-900 px-2 text-neutral-400">
                  Or continue with
                </span>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    // Handle Google login
                    console.log("Google login");
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    // Handle GitHub login
                    console.log("GitHub login");
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </Button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-sm text-neutral-400">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-500 underline-offset-4 hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Terms */}
      <p className="text-center text-xs text-neutral-500">
        By clicking continue, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-4 hover:text-neutral-300">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-neutral-300">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
