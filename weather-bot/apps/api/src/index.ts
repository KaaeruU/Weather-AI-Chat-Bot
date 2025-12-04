import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import type { Env } from "./types/types";
import chat from "./routes/chat";
import { corsMiddleware } from "./middleware/cors";

const START_TIME = Date.now();

const app = new Hono<{ Bindings: Env }>();

app.use("*", logger());

//MIDDLEWARE

app.use("/*", corsMiddleware);

// ROUTES

app.get("/", (c) => {
  return c.json({
    name: "Weather Bot API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      chat: "/api/chat/message",
    },
  });
});

app.get("/health", (c) => {
  // Worker calc uptime
  const uptimeSeconds = (Date.now() - START_TIME) / 1000;

  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: `${uptimeSeconds.toFixed(0)}s`,
    environment: c.env.ENVIRONMENT || "development",
    region: c.req.header("cf-ipcountry") || "unknown",
  });
});

app.route("/api/chat", chat);

// ERROR HANDLERS

app.notFound((c) => {
  return c.json(
    {
      error: "Not Found",
      message: `Endpoint ${c.req.method} ${c.req.path} non trovato`,
    },
    404
  );
});

app.onError((err, c) => {
  console.error("❌ Errore non gestito:", err);

  const isDev = c.env.ENVIRONMENT === "development";

  return c.json(
    {
      error: "Internal Server Error",
      message: isDev ? err.message : "Si è verificato un errore interno",
      ...(isDev && { stack: err.stack }),
    },
    500
  );
});

export default app;
