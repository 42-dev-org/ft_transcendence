"use client";
import React from "react";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
