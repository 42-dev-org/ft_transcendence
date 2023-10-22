import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "tailwind-config/styles";
import StoreProvider from "../providers/store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ft_transgender",
  description: "Generated by khaliha ela molana team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
