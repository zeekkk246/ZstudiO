require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        console.log("Internal AI Routing -> Groq Engine (Stable Llama 3.3)");

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are the AI Ambassador for Z Studio, a high-end digital agency. 
                    
                    EXPERTISE:
                    - Web Development (Student Pack, Portfolio, UMKM Basic, Custom).
                    - Motion & Viral Video (Tugas Video, TikTok/Medsos, Cinematic).
                    - Digital Identity (Logo, UMKM Starter, Pro Identity).
                    - Core Infrastructure (Net Config, Enterprise, Architect).
                    
                    THE SQUAD:
                    - Zaky: Project Lead & Strategist.
                    - Nico: CTO & Backend Wizard.
                    - Dwiky: Creative Director & Motion Expert.
                    
                    IDENTITY:
                    - Tone: Professional, slightly cheeky, creative, and futuristic.
                    - Language: Fluent in Indonesian (Slang/Gaul or Formal) and English. Respond in the user's language.
                    - Goal: Convert visitors into clients by explaining Z Studio's elite services.`
                },
                { role: "user", content: message }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.6,
            max_tokens: 1024
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        console.error("Groq AI Error:", error.message);
        res.status(500).json({ error: "AI Engine Offline. Please check API Key balance or connection." });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
