import "./globals.css";
import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import ModalProvider from "@/providers/modal-provider";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Refashioned Admin",
    default: "Refashioned - The best way to shop for second-hand clothes",
  },
  description:
    "Refashioned admin panel for managing products, orders, and more",
  category: "E-commerce",
  creator: "Refashioned Ltd",
  publisher: "Refashioned Ltd",
  keywords: ["Refashioned", "second-hand", "clothes", "fashion", "ecommerce"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${mulish.className} `}>
          <ModalProvider />
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
