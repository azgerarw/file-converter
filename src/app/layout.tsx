// app/layout.tsx
import type { Metadata } from "next";
import Footer from "@/components/footer";
import Header from "@/components/header";
import NextAuthProvider from "@/providers/sessionProvider";
import "./globals.css";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "fileConverter",
  description: "app to convert files",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="p-0 m-0 h-full">
      <body className="w-full min-h-full p-0 m-0 relative flex flex-col">
        
        <NextAuthProvider session={session}>
          <Header />
          <main className="w-[80%] m-auto flex-1 flex">{children}</main>
        </NextAuthProvider>
        <Footer />
      </body>
    </html>
  );
}
