import { z } from "zod";

export const validateSignUpSchema = z.object({
  fullname: z.string().min(3, {
    message: "Full name must be at least 3 characters long.",
  }),
  email: z.email({ message: "Email is required" }),
  password: z
    .string()
    .min(8, {
      message: "password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[!@#%^&*()+(.,)<>|{}]/, {
      message: "Password must contain at least one special character",
    }),
  // role: z.enum(["admin", "staff", "doctor", "nurse", "patient"]).optional(),
});

export const validateSignInSchema = z.object({
  email: z.email({ message: "Email is required" }),
  password: z
    .string()
    .min(8, {
      message: "password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[!@#%^&*()+(.,)<>|{}]/, {
      message: "Password must contain at least one special character",
    }),
});
export const validateForgetPasswordSchema = z.object({
  email: z.email(),
});


export const validatePatientSchema = z.object({
  fullname: z.string().min(3, {
    message: "Full name must be at least 3 characters long",
  }),
  email: z.email(),
  phone: z.string().min(11, {
    message: "Phone number is incomplete",
  }),
  dateOfBirth: z.string().date(),
  address: z.string().min(3, {
    message: "Please include an address, must be at least 3 charcters long",
  }),
  gender: z.enum(["male", "female", "other"]).refine((value) => value !== "", {
    message: "Gender is required",
  }),
  bloodGroup: z
    .enum([
      "A-positive",
      "A-negative",
      "B-positive",
      "B-negative",
      "AB-positive",
      "AB-negative",
      "O-positive",
      "O-negative",
    ])
    .refine((value) => value !== "", {
      message: "Blood group is required",
    }),
  emergencyContact: z.string().min(3, {
    message: "Emergency contact must be at least 3 characters long",
  }),
  emergencyContactPhone: z.string().min(11, {
    message: "Emergency contact phone must be at least 11 characters long",
  }),
  emergencyContactRelationship: z.string().min(3, {
    message: "Emergency contact must be at least 3 characters long",
  }),
});

export const validateAccountSchema = z.object({
  verificationToken: z
    .string()
    .min(6, {
      message: "Token must be 6digits",
    })
    .max(6, {
      message: "Token must not exceed 6 digits",
    }),
});

export const forgotPasswordSchema = z.object({
  email: z.email({
    message: "Email is required",
  }),
});

export const validateResetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
  confirmPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});

export const validateUserSchema = z.object({
  fullname: z.string().min(3, {
    message: "Full name must be at least 3 characters long",
  }),
  email: z.string().email(),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters long",
  }),
  dateOfBirth: z.string().date(),
});

export const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
  newPassword: z
    .string()
    .min(8, {
      message: "New Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "New Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "New Password must contain at least one lowercase letter",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "New Password must contain at least one special character",
    }),
  confirmPassword: z
    .string()
    .min(8, {
      message: "Confirm Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Confirm Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Confirm Password must contain at least one lowercase letter",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Confirm Password must contain at least one special character",
    }),
});