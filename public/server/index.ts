import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleAIGenerate, handleResumeGenerate, handleCoverLetterGenerate } from "./routes/ai-generate";
import { handlePDFGenerate } from "./routes/pdf-generate";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // AI Generation routes
  app.post("/api/generate", handleAIGenerate);
  app.post("/api/generate/resume", handleResumeGenerate);
  app.post("/api/generate/cover-letter", handleCoverLetterGenerate);

  // PDF Generation routes
  app.post("/api/download/pdf", handlePDFGenerate);

  return app;
}
