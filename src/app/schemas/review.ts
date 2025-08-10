import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z.string(),
  content: z.string().max(300, { message: "content can be max 300 characters long" }),
  user_id: z.string(),
});