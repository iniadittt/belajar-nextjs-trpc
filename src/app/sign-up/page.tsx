import React from "react";
import { type Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "@/components/authentication/sign-up";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up on T3 App",
};

export default function SignUpPage() {
  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center gap-4 p-4">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
      <Link
        href="/"
        className={buttonVariants({
          variant: "default",
        })}
      >
        Return to home
      </Link>
    </main>
  );
}
