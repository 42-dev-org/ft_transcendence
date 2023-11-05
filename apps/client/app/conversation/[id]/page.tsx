"use client";
import { useParams } from "next/navigation";
import React from "react";
import SingleConversationContainer from "../../../containers/single-conversation/single-conversation-container";

export default function SingleConversationPage(): JSX.Element {
    const id = useParams().id as string;
  return <SingleConversationContainer id={id}/>
}
