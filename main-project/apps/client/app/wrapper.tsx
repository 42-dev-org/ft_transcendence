"use client";
import { api } from "@/api";
import { useAppSelector } from "@/store/store";
import React, { ReactNode, useEffect } from "react";
import { toast } from "react-toastify";

export default function Wrapper() {
  const relection = useAppSelector((s) => s.reflection.LoadingPage);
  useEffect(() => {
    api.io().on("error", (msg: string) => {
      toast.error(msg);
    });
    return () => {
      api.io().off("error");
    };
  }, []);
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
