"use client";

import { useState, useCallback, useTransition } from "react";
import { z } from "zod";

interface UseFormOptions<T extends z.ZodObject<z.ZodRawShape>> {
  schema: T;
  onSubmit: (data: z.infer<T>) => Promise<void>;
}

interface FormState<T> {
  data: Partial<T>;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
}

export function useForm<T extends z.ZodObject<z.ZodRawShape>>({
  schema,
  onSubmit,
}: UseFormOptions<T>) {
  type FormData = z.infer<T>;

  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<FormState<FormData>>({
    data: {},
    errors: {},
    touched: {},
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = useCallback(
    (name: keyof FormData, value: unknown) => {
      try {
        // Create a partial schema for single field validation
        const fieldSchema = z.object({
          [name as string]: schema.shape[name as string],
        });
        fieldSchema.parse({ [name]: value });
        return null;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const issues = error.issues || [];
          return issues[0]?.message || "Invalid value";
        }
        return "Validation error";
      }
    },
    [schema],
  );

  const handleChange = useCallback(
    (name: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setFormState((prev) => {
        const newErrors = { ...prev.errors };

        // Only validate if field has been touched
        if (prev.touched[name]) {
          const error = validateField(name, value);
          if (error) {
            newErrors[name] = error;
          } else {
            delete newErrors[name];
          }
        }

        return {
          ...prev,
          data: { ...prev.data, [name]: value },
          errors: newErrors,
        };
      });

      // Clear submit error when user starts typing
      setSubmitError(null);
      setIsSuccess(false);
    },
    [validateField],
  );

  const handleBlur = useCallback(
    (name: keyof FormData) => () => {
      setFormState((prev) => {
        const error = validateField(name, prev.data[name]);
        return {
          ...prev,
          touched: { ...prev.touched, [name]: true },
          errors: error
            ? { ...prev.errors, [name]: error }
            : (() => {
                const newErrors = { ...prev.errors };
                delete newErrors[name];
                return newErrors;
              })(),
        };
      });
    },
    [validateField],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitError(null);
      setIsSuccess(false);

      // Mark all fields as touched
      const allTouched = Object.keys(schema.shape).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Record<keyof FormData, boolean>,
      );

      // Validate all fields
      const result = schema.safeParse(formState.data);

      if (!result.success) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        const issues = result.error.issues || [];
        issues.forEach((issue: z.ZodIssue) => {
          const path = issue.path[0] as keyof FormData;
          if (!newErrors[path]) {
            newErrors[path] = issue.message;
          }
        });

        setFormState((prev) => ({
          ...prev,
          touched: allTouched,
          errors: newErrors,
        }));
        return;
      }

      startTransition(async () => {
        try {
          await onSubmit(result.data);
          setIsSuccess(true);
          // Optionally reset form on success
          // setFormState({ data: {}, errors: {}, touched: {} });
        } catch (error) {
          if (error instanceof Error) {
            setSubmitError(error.message);
          } else {
            setSubmitError("An unexpected error occurred. Please try again.");
          }
        }
      });
    },
    [schema, formState.data, onSubmit],
  );

  const resetForm = useCallback(() => {
    setFormState({ data: {}, errors: {}, touched: {} });
    setSubmitError(null);
    setIsSuccess(false);
  }, []);

  const setFieldValue = useCallback((name: keyof FormData, value: unknown) => {
    setFormState((prev) => ({
      ...prev,
      data: { ...prev.data, [name]: value },
    }));
  }, []);

  return {
    values: formState.data,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: isPending,
    submitError,
    isSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    getFieldProps: (name: keyof FormData) => ({
      name: name as string,
      value: (formState.data[name] as string) || "",
      onChange: handleChange(name),
      onBlur: handleBlur(name),
      error: formState.touched[name] && formState.errors[name] ? true : false,
    }),
  };
}
