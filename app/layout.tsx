import type { Metadata } from "next";
import { DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
// import { esES } from "@clerk/localizations";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { AOSInit } from "@/components/aos";

export const metadata: Metadata = {
  icons: {
    icon: "/v_logo.png",
  },
  title: "SimpleLife Official",
  description: "Multifaceted Learning and Therapy AI platform",
};

const fontHeading = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={esES}
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "iconButton",
          termsPageUrl: "https://simplelifeofficial.com/faq",
          logoImageUrl: "/logo-1.png",
        },
      }}
    >
      <html lang="en" className="scrollbar-thin overflow-x-hidden">
        <AOSInit />
        <body
          className={cn("antialiased", fontHeading.variable, fontBody.variable)}
        >
          {" "}
          <main className="">{children} </main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
