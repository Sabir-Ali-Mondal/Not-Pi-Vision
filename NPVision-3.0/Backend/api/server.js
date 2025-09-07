import { GoogleGenerativeAI } from "@google/generative-ai";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.post('/api/generate', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ content: text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Failed to generate content" });
    }
});

// Vercel expects the handler to be exported as default
export default app;



