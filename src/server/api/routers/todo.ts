import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  addTodoSchema,
  updateTodoSchema,
  deleteTodoSchema,
} from "@/lib/schemas/todo-schema";

export const RouterTodo = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const todo = await ctx.db.todo.findMany({
        where: { userId: input.userId },
      });
      return todo.map((t) => ({
        id: t.id,
        title: t.title,
        description: t.description,
      }));
    }),

  add: publicProcedure.input(addTodoSchema).mutation(async ({ input, ctx }) => {
    return ctx.db.todo.create({
      data: {
        title: input.title,
        description: input.description,
        userId: ctx.session!.user.id,
      },
    });
  }),

  update: publicProcedure
    .input(updateTodoSchema)
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.db.todo.findUnique({
        where: { id: input.id },
      });
      if (!todo) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Todo is not exist",
        });
      }
      const updatedTodo = await ctx.db.todo.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
        },
      });
      return updatedTodo;
    }),

  delete: publicProcedure
    .input(deleteTodoSchema)
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.db.todo.findUnique({
        where: { id: input.id },
      });
      if (!todo) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Todo is not exist",
        });
      }
      const deleteTodo = await ctx.db.todo.delete({ where: { id: input.id } });
      return deleteTodo;
    }),
});
