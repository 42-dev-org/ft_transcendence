"use client";
import { useAppSelector } from "@/store/store";
import React, { ReactNode } from "react";

export default function Wrapper() {
  const relection = useAppSelector((s) => s.reflection.LoadingPage);
  return (
    <div>
      {relection.isLoading ? (
        <div className="absolute inset-0 w-screen h-screen bg-black flex justify-center items-center text-2xl text-white z-50">
          Loading...
        </div>
      ) : null}
    </div>
  );
}
