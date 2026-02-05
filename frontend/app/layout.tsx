import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Shopping List App",
  description: "Generated for Blicksolutions GmbH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className="font-sans">
            <Header />
            {children}
        </body>
    </html>
  );
}
