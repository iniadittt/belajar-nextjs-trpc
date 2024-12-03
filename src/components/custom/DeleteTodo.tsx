"use client";

import * as React from "react";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteTodoSchema } from "@/lib/schemas/todo-schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Todo {
  id: number;
  title: string;
  description: string;
}

export default function DeleteTodo({ data }: { data: Todo }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof deleteTodoSchema>>({
    resolver: zodResolver(deleteTodoSchema),
    defaultValues: {
      id: data.id,
    },
  });

  const deleteTodoMutation = api.todo.delete.useMutation({
    onSuccess: () => {
      toast.success("Todo delete successfully");
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

  async function onSubmit(values: z.infer<typeof deleteTodoSchema>) {
    setIsLoading(true);
    await deleteTodoMutation.mutateAsync(values);
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Edit Todo</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription asChild>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm">
                Anda yakin ingin menghapus data todo dengan data sebagai
                berikut:
              </p>
              <p>
                <span className="font-medium">ID:</span> {data.id}
              </p>
              <p>
                <span className="font-medium">Title:</span> {data.title}
              </p>
              <p className="text-sm text-red-600">
                Data yang sudah dihapus tidak dapat dikembalikan seperti
                sebelumnya, mohon dengan bijak untuk mengahapus data!
              </p>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  type="submit"
                  variant="destructive"
                  isLoading={isLoading}
                  className="bg-red-600 duration-200 hover:bg-red-700 hover:duration-200"
                >
                  Delete
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogDescription>
    </AlertDialogContent>
  );
}
