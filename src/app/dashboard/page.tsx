import React from "react";
import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

import { redirect, RedirectType } from "next/navigation";
import Navbar from "@/components/custom/Navbar";
import Datatable from "@/components/custom/Datatable";

interface Todo {
  id: number;
  title: string;
  description: string;
}

export default async function DashboardPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/sign-in", RedirectType.push);
  }

  const loginAs: string = session.user.firstName + " " + session.user.lastName;
  const todo: Todo[] = await api.todo.get({ userId: session.user.id });

  return (
    <HydrateClient>
      <Navbar loginAs={loginAs} />
      <div className="container mx-auto mt-8 px-4">
        <Datatable data={todo} />
      </div>
    </HydrateClient>
  );
}
