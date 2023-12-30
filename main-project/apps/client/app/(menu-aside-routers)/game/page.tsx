"use client";
import React from "react";
import HomeGameMain from "../../../layouts/game-home-main/game-home-main";
import withAuth from "../../../hoc/auth";

function Page(): JSX.Element {
  return (
    <div className="w-full h-full bg-black flex justify-center items-center">
      <HomeGameMain />
    </div>
  );
}


export default withAuth(Page)
