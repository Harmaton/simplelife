import type { Metadata } from "next";
import { DM_Sans, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
// import { esES } from "@clerk/localizations";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from '@clerk/localizations'

export const metadata: Metadata = {
  icons: {
    icon: "/newlogo.png",
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
        socialButtonsPlacement: 'bottom',
        socialButtonsVariant: 'iconButton',
        termsPageUrl: 'https://simplelifeofficial.com/faq',
        logoImageUrl: '/logo-1.png'
      }
    }}
     >
      <html
        lang="en"
        className="scrollbar-thumb-sky-700 scrollbar-track-sky-200 scrollbar-thin overflow-y-scroll"
      >
        <body
          className={cn("antialiased", fontHeading.variable, fontBody.variable)}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
