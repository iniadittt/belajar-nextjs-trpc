"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { signInSchema } from "@/lib/schemas/user-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "../ui/separator";

export default function SignInForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        toast(res.error);
        setIsLoading(false);
        return;
      }

      toast("Logged in successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast("Something went wrong. Please try again later");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Exampe: budi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CardFooter className="flex flex-col gap-2 p-0">
          <Button
            type="submit"
            variant="default"
            className="w-full"
            isLoading={isLoading}
          >
            Sign in
          </Button>
          <div className="relative flex w-full items-center justify-center py-4">
            <Separator />
            <span className="absolute bg-accent px-2 text-sm">
              Don&apos;t have an account?
            </span>
          </div>
          <Link
            href="/sign-up"
            className={buttonVariants({
              className: "w-full",
            })}
          >
            Sign up
          </Link>
        </CardFooter>
      </form>
    </Form>
  );
}
