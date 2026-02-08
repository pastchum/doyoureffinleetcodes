import { z } from 'zod';

// region Schema Definition

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3).max(30),
  email: z.string().email(),
  created_at: z.date(),
  updated_at: z.date(),
  last_leetcode_completed_at: z.date().optional(),
  current_streak: z.number().min(0),
  longest_streak: z.number().min(0),
  leetcode_username: z.string().optional(),
});

// region Request and Response Schemas

export const AddUserRequestSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  leetcode_username: z.string().optional(),
});

export type AddUserRequest = z.infer<typeof AddUserRequestSchema>;

export const GetUserByIdResponseSchema = UserSchema;

export type GetUserByIdResponse = z.infer<typeof GetUserByIdResponseSchema>;
