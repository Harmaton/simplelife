import type { Metadata } from "next";
import { DM_Sans, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";
import { Toaster } from '@/components/ui/sonner'

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
      <html lang="en" className="scrollbar-thumb-sky-700 scrollbar-track-sky-200 scrollbar-thin overflow-y-scroll">
        <body 
          className={cn(
            'antialiased',
            fontHeading.variable,
            fontBody.variable
          )}
        >
          {children}
          <Toaster />
          <script type="text/javascript">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "o15wughjhe");
            `}
          </script>
        </body>
      </html>
    </AuthProvider>
  );
}
