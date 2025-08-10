
import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(3, { message: "username must be at least 3 caracters long" }),
  name: z.string().min(2, { message: "firstname is required" }),
  lastname: z.string().min(2, { message:"lastname is required" }),
  email: z.email({ message: "invalid email" }),
  birthdate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "date format must be YYYY-MM-DD" }),
  phone: z.string().optional(),
  country: z.string().optional(),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).min(6, { message: "password must be 6 caracters long and contain at least 1 letter and 1 number" }),
  policy: z.enum(['on', 'off'], { message: "to create an account you have to accept t&c" })
});

