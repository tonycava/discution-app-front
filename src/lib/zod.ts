import z from 'zod';

export const authZodSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const messageZodSchema = z.string().min(1, { message: 'Message is required' });