import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { Bcrypt } from "oslo/password";
import { signUpSchema } from "@/lib/schemas/user-schema";

export const RouterUser = createTRPCRouter({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const hashedPassword = await new Bcrypt().hash(input.password);
      const isUsernameExist = await ctx.db.user.findUnique({
        where: {
          username: input.username,
        },
      });
      if (isUsernameExist) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already taken",
        });
      }
      return ctx.db.user.create({
        data: {
          username: input.username,
          password: hashedPassword,
          firstName: input.firstName,
          lastName: input.lastName,
        },
      });
    }),

  getUser: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        username: input,
      },
    });
  }),
});
