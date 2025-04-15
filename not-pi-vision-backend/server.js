import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API endpoints
app.post('/api/generate', async (req, res) => {
    try {
        console.log('Received generate request:', req.body);

        if (!process.env.GOOGLE_API_KEY) {
            console.error('Missing API key');
            return res.status(500).json({ error: 'API key not configured' });
        }

        if (!req.body.prompt) {
            console.error('Missing prompt');
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        console.log('Sending prompt to Gemini...');
        const result = await model.generateContent(req.body.prompt);
        
        if (!result || !result.response) {
            console.error('Empty response from Gemini');
            return res.status(500).json({ error: 'Empty response from AI' });
        }

        const text = result.response.text();
        if (!text) {
            console.error('Empty text in response');
            return res.status(500).json({ error: 'Empty text in response' });
        }

        console.log('Successfully generated content');
        return res.json({ content: text });

    } catch (error) {
        console.error('Generation error:', error);
        return res.status(500).json({ 
            error: 'Generation failed',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Serve static files and handle client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Export app for Vercel
export default app;
