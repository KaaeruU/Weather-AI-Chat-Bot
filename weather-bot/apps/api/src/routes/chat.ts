import { Hono } from "hono";
import { stepCountIs, streamText, type CoreMessage } from "ai";
import type { Env } from "../types/types";
import { getModel, WEATHER_BOT_SYSTEM_PROMPT } from "../lib/ai-provider";
import { geocodeTool } from "../tools/geocode";
import { forecastTool } from "../tools/forecast";

const chat = new Hono<{ Bindings: Env }>();

chat.post("/message", async (c) => {
  //log id
  const requestId = crypto.randomUUID().slice(0, 8);

  let body;
  try {
    body = await c.req.json();
  } catch (e) {
    return c.json({ error: "Invalid JSON" }, 400);
  }

  const message = body.message || "";

  console.log(`\n🆔 [${requestId}] START: "${message}"`);

  const rawHistory = Array.isArray(body.history) ? body.history : [];

  const historyMessages: CoreMessage[] = rawHistory.map((msg: any) => {
    return {
      role: msg.role || "user",
      content: msg.content || "",
      ...(msg.tool_calls && { tool_calls: msg.tool_calls }),
      ...(msg.tool_call_id && { tool_call_id: msg.tool_call_id }),
      ...(msg.name && { name: msg.name }),
    } as CoreMessage;
  });

  // clean array
  const allMessages: CoreMessage[] = [
    ...historyMessages,
    { role: "user", content: message },
  ];

  const model = getModel(c.env.ai);
  const today = new Date().toLocaleDateString("it-IT", { weekday: "long" });
  const systemPrompt = `${WEATHER_BOT_SYSTEM_PROMPT}\n\nDATA DI OGGI: ${today}`;

  const result = streamText({
    model: model,
    system: systemPrompt,
    messages: allMessages,
    tools: {
      geocode: geocodeTool,
      forecast: forecastTool,
    },
    stopWhen: stepCountIs(10),
    temperature: 0.2,

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
      console.log(`"${text}`);
      console.log(`${"=".repeat(50)}\n`);
    },
  });

  return result.toTextStreamResponse();
});

export default chat;
