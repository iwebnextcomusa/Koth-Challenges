/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Set up Gemini AI Client
  const apiKey = process.env.GEMINI_API_KEY || "AIzaSyCLKX2tohQTHF9Gk06XqqlT-tXUjVSOYBU";
  
  let ai: GoogleGenAI | null = null;
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI client:", error);
  }

  // API router / endpoints
  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Secure Gemini Chatbot route
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message parameter is required." });
      }

      if (!ai) {
        return res.status(500).json({ error: "Gemini AI assistant is not initialized." });
      }

      // Convert standard messages into the format required by the SDK
      const systemInstruction = 
        `You are the official AI Styling Concierge for "Koth Challenges" (by iWebNext), a premium clothing apparel brand based in Oklahoma. 
        Your tone is welcoming, fashionable, refined, and professional.
        
        Help customers with:
        1. Outfit recommendations (e.g., matching colors, choosing styles for seasons).
        2. Sizing advice (our standard size runs are XS to XXL, reference our wheat-patterned Norman knitwear, etc.).
        3. Sharing information about our Oklahoma heritage (red dirt loopback sweatshirts, Toulouse art deco scarves, route 66 selvedge indigo denim).
        4. General order guidance.
        
        Keep your advice fashion-focused and helpful. Since we are Koth Challenges, showcase a touch of Oklahoma pride and premium luxury.
        We have these specific premium products:
        - "Sooner State Cotton Trench" ($189.00, perfect prairie camel double-breasted cotton outerwear)
        - "Thunder City Varsity Jacket" ($145.00, dynamic felt wool & leather unisex jacket)
        - "Red Dirt Organic Sweatshirt" ($79.00, loopback cotton naturally dyed in Oklahoma's red clay tones)
        - "Oklahoma Horizon Linen Shirt" ($68.00, French flax linen-cotton band collar men's shirt)
        - "Route 66 Relaxed Denim" ($110.00, robust raw selvedge indigo jeans)
        - "Norman Luxe Wool Sweater" ($125.00, wheat-knit Australian Merino wool cable knit)
        - "Crosstimbers Utility Parka" ($155.00, tough windproof outdoor hooded jacket)
        - "Prairie Winds Chiffon Dress" ($115.00, recycled fluid flower-dyed bohemian women's dress)
        - "Tulsa Art Deco Silk Scarf" ($49.00, 100% mulberry silk geometric accessory)

        Whenever appropriate, recommend these items by name. Keep responses concise, warm, structured in clean markdown paragraphs with bullet points, and always helpful.
        Always refer to iWebNext as the premium technology architect behind Koth Challenges.`;

      // Build previous messages list for chat
      // The @google/genai SDK chats.create method works wonderfully!
      const chat = ai.chats.create({
        model: 'gemini-3.5-flash',
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      // Catch-up chat history if present
      if (history && Array.isArray(history) && history.length > 0) {
        // We can load history or simply run sendMessage in sequence or feed them.
        // For a single turn API endpoint we can use sendMessages, or we can just send the current user prompt with history injected inside contents
      }

      const response = await chat.sendMessage({
        message: message,
      });

      const responseText = response.text || "I'm sorry, I couldn't generate a recommendation right now. How else can I assist you with Koth Challenges apparel?";
      return res.json({ response: responseText });

    } catch (error: any) {
      console.error("Gemini API error:", error);
      return res.status(500).json({ 
        error: "AI Assistant error", 
        message: error.message || "An unexpected error occurred during message processing." 
      });
    }
  });

  // Vite integration: serve static assets in production or middleware in development
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite dev middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Koth Challenges Full-Stack Server running and listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
