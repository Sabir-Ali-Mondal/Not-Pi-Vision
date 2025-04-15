import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint
app.post('/api/generate', async (req, res) => {
    try {
        if (!process.env.GOOGLE_API_KEY) {
            return res.status(500).json({ error: 'API key not configured' });
        }

        const prompt = req.body.prompt;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);

        if (!result || !result.response) {
            return res.status(500).json({ error: 'Empty response from AI' });
        }

        const text = result.response.text();
        res.json({ content: text });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: error.message });
    }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default app;
