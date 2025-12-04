"use client"

import { Text } from "@/src/components/atom/text/Text";
import { Button } from "../components/atom/button/Button";
import { buttonSample } from "../utils/constant/data";
import { Form } from "../components/molecules/form/Form";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { buttonsVariants, selectedVariants, transition } from "../lib/motion/variants";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

export default function Home() {
  const [selectedLabel, setSelectedLabel] = useState<string>("");

  const { messages, status, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: 'https://flavio-test.flaviogiovannipatti.workers.dev/api/chat/message',
    }),
  });

  const handlePresetClick = async (label: string) => {
    setSelectedLabel(label);
    await sendMessage({ text: label });
  };

  return (
    <>
      <main className="flex min-h-[90vh] flex-col items-center justify-center p-4 md:p-24 pb-32">
        <AnimatePresence mode="wait">
          {!selectedLabel && messages.length === 0 ? (
            <motion.div
              key="buttons"
              variants={buttonsVariants}
              initial="initial"
              exit="exit"
              transition={transition}
              className="flex items-center flex-col w-full"
            >
              <div className="mb-5 text-center">
                <Text as={"label"} styledAs={"title"}>How Can I Help You Today?</Text>
              </div>
              <div className="w-full max-w-3xl text-gray-700 text-center px-2">
                <Text as={"p"} styledAs={"body"}>
                  Your AI weather assistant! Ask me about the current weather in real time.
                </Text>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 p-4 gap-4 w-full max-w-3xl">
                {buttonSample.map(({ label }) => (
                  <Button
                    label={label}
                    key={label}
                    isDisabled={status === 'streaming' || status === 'submitted'}
                    onClick={() => handlePresetClick(label)}
                    className="w-full border border-gray-300 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="selected"
              variants={selectedVariants}
              initial="initial"
              animate="animate"
              transition={transition}
              className="flex flex-col items-center justify-center p-2 md:p-8 w-full max-w-3xl"
            >
              <div className="flex flex-col w-full gap-4 mb-4">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-lg max-w-[90%] md:max-w-[80%] ${
                        m.role === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                        <Text as={"p"} styledAs={"body"} className="text-base md:text-lg">
                            {m.parts.map((part, i) => 
                              part.type === 'text' ? <span key={i}>{part.text}</span> : null
                            )}
                        </Text>
                    </div>
                  </div>
                ))}
                  {(status === "error") && (
                    <div className="flex justify-start bg-red-500/10 p-3 rounded-lg">
                        <Text as={"span"} styledAs={"label"} className="text-red-400 pl-2">
                            An error occurred. Please try again.
                        </Text>
                    </div>)}
                    
                  {(status === 'streaming' || status === 'submitted') && (
                    <div className="flex justify-start">
                        <Text as={"span"} styledAs={"label"} className="text-gray-400 pl-2">
                            Thinking...
                        </Text>
                    </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 pb-6 pt-4 px-4">
        <div className="w-full max-w-3xl mx-auto flex justify-center">
            <Form 
              onSubmit={async (value: string) => {
                 if (!selectedLabel) setSelectedLabel("custom");
                 await sendMessage({ text: value });
              }}
              isDisabled={status === 'streaming' || status === 'submitted'}
            />
        </div>
      </div>
    </>
  );
}
