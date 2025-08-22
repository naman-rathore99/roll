import type { Metadata } from "next";
import "./globals.css";
import Menu from "@/app/components/Menubar/Menu";
import PageTransition from "@/app/components/PageTransition";
export const metadata: Metadata = {
  title: "ANY Core",
  description: "We create apps that works for future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <PageTransition>
          <Menu />
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
