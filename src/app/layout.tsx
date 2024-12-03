import "@/styles/globals.css";

import { type Metadata } from "next";

import { HydrateClient } from "@/trpc/server";
import { TRPCReactProvider } from "@/trpc/react";
import { AlertCircleIcon, CheckCircleIcon } from "lucide-react";
import { Archivo } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/provider/theme-provider";
import SessionProvider from "@/components/provider/session-provider";

export const metadata: Metadata = {
  title: {
    template: "%s - Nextjs TRPC Todolist | Aditya Bayu",
    default: "Nextjs TRPC Todolist | Aditya Bayu",
  },
  description: "Nextjs TRPC Todolist | Aditya Bayu",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.className}`} suppressHydrationWarning>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <HydrateClient>
              <SessionProvider>{children}</SessionProvider>
            </HydrateClient>
          </ThemeProvider>
        </TRPCReactProvider>
        <Toaster
          position="bottom-right"
          icons={{
            success: <CheckCircleIcon className="size-6" />,
            error: <AlertCircleIcon className="size-6" />,
          }}
          toastOptions={{
            unstyled: false,
            classNames: {
              title: "font-semibold",
              success:
                "bg-success text-text border-base text-lg border-2 border-border gap-4 shadow-dark",
              error:
                "bg-destructive text-text border-base text-lg border-2 border-border gap-4 shadow-dark",
            },
          }}
        />
      </body>
    </html>
  );
}
