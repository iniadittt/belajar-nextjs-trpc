import { z } from "zod";

export const addTodoSchema = z.object({
  title: z.string().min(6).max(200),
  description: z.string().min(6).max(2000),
});

export const updateTodoSchema = z.object({
  id: z.number(),
  title: z.string().min(6).max(200),
  description: z.string().min(6).max(2000),
});

export const deleteTodoSchema = z.object({
  id: z.number(),
});

export const deleteManyTodoSchema = z.object({
  id: z.array(z.number()),
});
