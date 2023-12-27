import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "tailwind-config/styles";
import AsideBar from "../../layouts/shared-aside-bar/aside-bar";
import BarMobile from "../../layouts/shared-bar-mobile/bar-mobile";
import Header from "../../layouts/shared-haeder/header";
import StoreProvider from "../../providers/store-provider";
import "../globals.css";
import ReactQueryProvider from "../../providers/react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ft_transgender",
  description: "Generated by khaliha ela molana team",
};

export default function MenuAsideroutersLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="h-screen w-full flex flex-col">
        <StoreProvider>
          <ReactQueryProvider>
            <Header />
            <BarMobile />
            <div className="  h-[90%] flex flex-row">
              <AsideBar />
              <main className="w-full">
                {children}
              </main>
            </div>
          </ReactQueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
