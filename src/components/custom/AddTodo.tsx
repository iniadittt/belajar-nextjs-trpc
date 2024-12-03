"use client";

import * as React from "react";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addTodoSchema } from "@/lib/schemas/todo-schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

export default function AddTodo() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof addTodoSchema>>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const addTodoMutation = api.todo.add.useMutation({
    onSuccess: () => {
      toast.success("Todo created successfully");
      router.push("/dashboard");
      form.reset();
      setIsLoading(false);
    },
    onError: (error) => {
      toast.error(
        error.message || "Something went wrong. Please try again later",
      );
      setIsLoading(false);
    },
  });

  async function onSubmit(values: z.infer<typeof addTodoSchema>) {
    setIsLoading(true);
    await addTodoMutation.mutateAsync(values);
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Add Todo</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription asChild>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="h-36 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit" variant="default" isLoading={isLoading}>
                  Save
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogDescription>
    </AlertDialogContent>
  );
}
