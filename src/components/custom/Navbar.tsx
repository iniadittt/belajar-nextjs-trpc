"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar({ loginAs }: { loginAs: string }) {
  const handlerLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    await signOut();
  };

  return (
    <div className="w-full bg-gray-600 py-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="my-auto text-xl font-semibold uppercase text-white">
          Belajar Nextjs TRPC
        </h1>
        <div className="flex gap-4">
          <p className="my-auto text-sm font-medium text-white">
            Login sebagai: <span className="capitalize">{loginAs}</span>
          </p>
          <Button onClick={(event) => handlerLogout(event)}>Logout</Button>
        </div>
      </div>
    </div>
  );
}
