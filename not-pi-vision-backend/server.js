import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check/test route
app.get('/api/test', (req, res) => {
    res.json({ message: '✅ Server is working fine!' });
});

// Gemini API Integration
const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.post('/api/generate', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        console.log('Prompt received:', prompt);

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = await response.text();

        console.log('Generated response:', text);

        res.json({ content: text });
    } catch (error) {
        console.error("❌ Error generating content:", error);
        console.error("Error Stack:", error.stack); // Log the stack trace
        res.status(500).json({
            error: "Failed to generate content",
            details: error.message,
            stack: error.stack // Include the stack in the response (for debugging)
        });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});

export default app;
