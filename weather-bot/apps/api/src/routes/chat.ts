import { Hono } from "hono";
import {
  stepCountIs,
  streamText,
  convertToCoreMessages,
  convertToModelMessages,
} from "ai";
import type { Env } from "../types/types";
import { getModel, WEATHER_BOT_SYSTEM_PROMPT } from "../lib/ai-provider";
import { geocodeTool } from "../tools/geocode";
import { forecastTool } from "../tools/forecast";

const chat = new Hono<{ Bindings: Env }>();

chat.post("/message", async (c) => {
  const requestId = crypto.randomUUID().slice(0, 8);

  let body;
  try {
    body = await c.req.json();
  } catch (e) {
    return c.json({ error: "Invalid JSON" }, 400);
  }

  const uiMessages = body.messages || [];

  if (!Array.isArray(uiMessages) || uiMessages.length === 0) {
    return c.json({ error: "No messages provided" }, 400);
  }

  const messages = convertToModelMessages(uiMessages);

  const lastMessage = uiMessages[uiMessages.length - 1];
  console.log(
    `\n🆔 [${requestId}] START: "${
      lastMessage.content || lastMessage.parts?.[0]?.text || ""
    }"`
  );

  const model = getModel(c.env.ai);
  const today = new Date().toLocaleDateString("it-IT", { weekday: "long" });
  const systemPrompt = `${WEATHER_BOT_SYSTEM_PROMPT}\n\nDATA DI OGGI: ${today}`;

  const result = streamText({
    model: model,
    system: systemPrompt,
    messages: messages,
    tools: {
      geocode: geocodeTool,
      forecast: forecastTool,
    },
    stopWhen: stepCountIs(30),
    temperature: 0.3,
    toolChoice: "auto",

    onStepFinish({ toolCalls, toolResults, finishReason }) {
      if (toolCalls && toolCalls.length > 0) {
        toolCalls.forEach((t) => {
          console.log(`🛠️ [${requestId}] AI CALL TOOL: ${t.toolName}`);
        });
      }

      if (toolResults && toolResults.length > 0) {
        toolResults.forEach((r) => {
          console.log(`✅ [${requestId}] TOOL SUCCESS (${r.toolName})`);
        });
      }
    },

    onFinish({ text }) {
      console.log(`🏁 [${requestId}] FINAL RESPONSE:`);
      console.log(`"${text}"`);
      console.log(`${"=".repeat(50)}\n`);
    },
  });

  return result.toUIMessageStreamResponse();
});

export default chat;
