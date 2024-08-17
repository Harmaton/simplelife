import type { Metadata } from "next";
import { DM_Sans, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/newlogo.png",
  },
  title: "SimpleLife Official",
  description: "Multifaceted Learning and Therapy AI platform",
};

const fontHeading = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Space_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: '400'
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="en">
    <body 
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >{children}
      <Toaster />
      </body>
    </html>
    </AuthProvider>
  );
}
