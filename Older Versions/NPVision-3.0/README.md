# Not π Vision 3.0 - From Syllabus to Simulation

![Not Pi Vision Banner](https://res.cloudinary.com/dmttn34te/image/upload/v1744580322/NOT_Pi_Vision_Brand_logo_qrakmx.gif)

**Not π Vision** is an innovative, open-source web application designed to transform educational content from static syllabi into dynamic, interactive, and visually engaging learning materials. Powered by Generative AI, it empowers educators and students to create beautiful, simulation-based presentations effortlessly.

**Our Moto:** *“Breaking the circle of boring learning. We're breaking it — Visually.”*

---

## ✨ Features

-   **AI-Powered Syllabus Deconstruction**: Paste a course syllabus or a broad topic, and our AI will automatically structure it into a logical hierarchy of units, chapters, and topics.
-   **Dynamic Visualization Generation**: For any topic, generate a complete learning module with a single click. This includes:
    -   A detailed, scientific **description**.
    -   A dynamic, interactive **HTML5/p5.js simulation**.
    -   Well-structured **presentation slides** with text and tables.
-   **Customizable AI Models**:
    -   **Gemini Integration**: Seamlessly connect to a Gemini backend for automated, high-quality content generation.
    -   **ChatGPT Workflow**: Generate a tailored prompt to use with ChatGPT and easily paste the results back into the application.
-   **Workspace Management**:
    -   Organize your subjects and syllabi into persistent **Workspaces**.
    -   Track your progress with a visual completion tracker.
    -   Add, rename, and organize topics, chapters, and units with an intuitive UI.
-   **Interactive Viewer**:
    -   A dual-panel interface to view the generated simulation and slides side-by-side.
    -   Fullscreen mode for immersive visualization.
    -   A preview modal to review generated content before saving.
-   **Text-to-Speech Reader**: An integrated screen reader that reads descriptions and slide content aloud, highlighting text as it goes for an accessible learning experience.
-   **Data Persistence**: All workspaces and generated modules are saved locally in your browser's IndexedDB, ensuring your data is private and always available.
-   **Modern & Responsive UI**: Built with Bootstrap 5 and Lucide Icons for a clean, intuitive, and mobile-friendly experience.

---

## 🚀 Getting Started

This is a frontend-only application that communicates with a separate backend for AI generation.

### Prerequisites

-   A modern web browser (Chrome, Firefox, Edge).
-   A backend server that exposes a `/api/generate` endpoint for the Gemini AI model.
-   Node.js and npm (if you plan to run the provided sample server).

### Frontend Setup (This Repository)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/not-pi-vision.git
    cd not-pi-vision
    ```
2.  **Open the HTML file:**
    Simply open the `index.html` file in your web browser. No build step is required!

### Backend Setup (Sample Gemini Server)

A sample Express.js server is provided to connect to the Google Generative AI (Gemini) API.

1.  **Navigate to the server directory (or create one):**
    If a `server` folder is included, `cd server`. Otherwise, create a new project:
    ```bash
    mkdir server
    cd server
    npm init -y
    npm install express cors dotenv @google/generative-ai
    ```

2.  **Create the server file:**
    Create a file named `index.js` (or `api/index.js` for Vercel) and add the following code:
    ```javascript
    import { GoogleGenerativeAI } from "@google/generative-ai";
    import express from 'express';
    import cors from 'cors';
    import dotenv from 'dotenv';

    dotenv.config();

    const app = express();
    app.use(cors());
    app.use(express.json());

    // Ensure API key is loaded
    if (!process.env.GENERATIVE_API_KEY) {
        throw new Error("GENERATIVE_API_KEY is not set in the environment variables.");
    }
    
    const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Or your preferred model

    app.post('/api/generate', async (req, res) => {
        try {
            const prompt = req.body.prompt;
            if (!prompt) {
                return res.status(400).json({ error: "Prompt is required." });
            }
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            res.json({ content: text });
        } catch (error) {
            console.error("Error generating content:", error);
            res.status(500).json({ error: "Failed to generate content from AI model." });
        }
    });

    // For local development
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    // For Vercel deployment, export the app
    export default app;
    ```

3.  **Create a `.env` file:**
    In the same directory, create a `.env` file and add your Google AI Studio API key:
    ```
    GENERATIVE_API_KEY=your_google_api_key_here
    ```

4.  **Run the server:**
    ```bash
    node index.js
    ```
    The server will be running at `http://localhost:3001`. The frontend application is configured to send requests to this endpoint by default (you may need to adjust the `fetch` URL in the HTML if your server is on a different port/address).

---

## 🛠️ How It Works

1.  **Create a Workspace**: A user provides a title and syllabus text. The frontend constructs a detailed prompt using this information.
2.  **AI Request**: The prompt is sent to the Gemini backend.
3.  **Structure Generation**: The AI returns a structured JSON object representing the syllabus, which is then saved as a new workspace.
4.  **Generate a Module**: The user selects a topic and clicks "Generate".
5.  **Visualization Prompt**: A highly specific, multi-part prompt is created, asking the AI for a description, HTML/p5.js code, and slide data.
6.  **AI Response**: The AI generates the complete module content.
7.  **Render**: The frontend parses this response and renders the description, simulation, and slides in the interactive viewer.
