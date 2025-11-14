import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(express.static("public"));

// Health check endpoint for Vercel
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Gemini API endpoint with improved error handling
app.post("/api/generate", async (req, res) => {
  const { prompt, useFlash = false } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt required" });
  }

  try {
    const model = useFlash ? "gemini-2.0-flash" : "gemini-2.0-live";
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0]) {
      const content = data.candidates[0].content.parts[0].text;
      res.json({ success: true, content });
    } else {
      res.status(500).json({ error: "No response from Gemini" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Load external templates from GitHub safely with caching
app.get("/api/template/:type", async (req, res) => {
  const { type } = req.params;
  const templateUrls = {
    description: "https://raw.githubusercontent.com/Sabir-Ali-Mondal/Not-Pi-Vision/main/NPVision-3.1/Templates-div/description.html",
    notepad: "https://raw.githubusercontent.com/Sabir-Ali-Mondal/Not-Pi-Vision/main/NPVision-3.1/Templates-div/notepad.html"
  };

  if (!templateUrls[type]) {
    return res.status(400).json({ error: "Invalid template type" });
  }

  try {
    const response = await fetch(templateUrls[type], {
      timeout: 10000 // 10 second timeout for Vercel
    });
    
    if (!response.ok) {
      throw new Error(`GitHub template loading failed: ${response.status}`);
    }

    const html = await response.text();
    res.set("Content-Type", "text/html; charset=utf-8");
    res.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    res.send(html);
  } catch (error) {
    console.error("Template loading error:", error);
    res.status(500).json({ error: "Failed to load template" });
  }
});

// Serve config to frontend (safe variables only)
app.get("/api/config", (req, res) => {
  res.json({
    apiKey: process.env.GEMINI_API_KEY ? "configured" : "missing",
    environment: process.env.NODE_ENV || "development"
  });
});

// Fallback for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 NPVision 3.1 running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Gemini API: ${process.env.GEMINI_API_KEY ? "✓ Configured" : "✗ Missing"}`);
});
