import { z } from "zod";

// Strict Bangladeshi phone number pattern: 11 digits, starts with 01 and 3–9
const bdPhoneRegex = /^01[3-9]\d{8}$/;

export const loginValidationSchema = z.object({
  identifier: z
    .string()
    .refine(
      (value) =>
        z.string().email().safeParse(value).success || bdPhoneRegex.test(value),
      {
        message: "Identifier must be a valid email or phone number (e.g. 017xxxxxxxx)",
      }
    ),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});