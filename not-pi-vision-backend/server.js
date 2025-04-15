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
        console.log('Request received at /api/generate');
        console.log('Request body:', req.body);

        if (!process.env.GOOGLE_API_KEY) {
            console.error('Missing GOOGLE_API_KEY');
            return res.status(500).json({ error: 'API key not configured' });
        }

        const prompt = req.body.prompt;
        if (!prompt) {
            console.error('Missing prompt in request');
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        console.log('Sending prompt to Google Generative AI...');
        const result = await model.generateContent(prompt);

        if (!result || !result.response) {
            console.error('Empty response from Google Generative AI');
            return res.status(500).json({ error: 'Empty response from AI' });
        }

        const text = result.response.text();
        if (!text) {
            console.error('No text in AI response');
            return res.status(500).json({ error: 'No content received from AI' });
        }

        console.log('Successfully generated content:', text);
        res.json({ content: text });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    console.log('Serving index.html for route:', req.url);
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

export default app;
