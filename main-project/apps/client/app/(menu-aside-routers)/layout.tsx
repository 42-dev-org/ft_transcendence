import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "tailwind-config/styles";
import AsideBar from "../../layouts/shared-aside-bar/aside-bar";
import BarMobile from "../../layouts/shared-bar-mobile/bar-mobile";
import Header from "../../layouts/shared-haeder/header";
import StoreProvider from "../../providers/store-provider";
import "../globals.css";
import ReactQueryProvider from "../../providers/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <ToastContainer />
            <Header />
            <BarMobile />
            <div className="  h-full flex flex-row overflow-hidden">
              <AsideBar />
              <main className="grow flex flex-1 ml-2 items-start">
                {children}
              </main>
            </div>
          </ReactQueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
