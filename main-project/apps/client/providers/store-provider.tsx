'use client';
import React from "react";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function StoreProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}
