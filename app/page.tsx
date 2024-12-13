"use client"

import { Bot, Send, User2, } from "lucide-react";
import { useChat } from "ai/react";
import Markdown from "@/components/markdown";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
  useChat({
    api: "api/genai",
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {renderForm()}
      {renderMessages()}
    </main>
  );

  function renderForm() {
    return(
     <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(event, {
          data: {
            prompt: input
          }
        })
      }}
        className="w-full flex flex-row gap-2 items-center h-full"
      >

      <button 
        type="submit"
        className="rounded-full shadow-md border flex flex-row">
          <Send className="p-3 h-10 w-10 stroke-blue-500 "/>
      </button>

      <input
        type="text"
        placeholder="beskriv produktet her"
        value={input}
        onChange={handleInputChange}
        className="border-b border-dashed outline-none w-full px-4 py-2 text-[#0842A0ff] text-left focus:placeholder-transparent"
        />


    </form>
    )
  }

  function renderMessages() {
    return (
      <div id="chatbox" className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap">
      {messages.map((m, index) => {
        return (
          <div
            key={index}
            className={`p-4 shadow-md rounded-md ml-10 relative ${
              m.role === "user" ? "bg-stone-300" : ""
            }`}
          >
            <Markdown text={m.content} />
            {m.role === "user" ? (
              <User2 className="absolute top-2 -left-10 border rounded-full p-1 shadow-lg" />
            ) : (
              <Bot
                className={`absolute top-2 -left-10 border rounded-full p-1 shadow-lg stroke-[#0842A0] ${
                  isLoading && index === messages.length - 1
                    ? "animate-bounce"
                    : ""
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
    )
  }
}
