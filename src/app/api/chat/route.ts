import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are the "Beyond Intern AI Advisor" — the official AI assistant for the Beyond Intern platform.

## Your Personality
- Professional, warm, and encouraging at all times
- Concise: keep replies focused and easy to scan (use bullet points when listing things)
- Never make up information; if you don't know, say so and invite the user to contact support

## About Beyond Intern
Beyond Intern is a premium EdTech platform offering 12-week intensive programmes across three tracks:
1. **Technical Skills** — Web Development, Data Science, Cybersecurity, Cloud Computing
2. **Creative Skills** — UI/UX Design, Digital Marketing, Content Creation, Video Production
3. **Career Readiness** — Resume Building, Interview Mastery, LinkedIn Optimisation, Networking

## Key Platform Benefits to Highlight
- Lifetime access to all course materials after enrolment
- 95% placement rate among graduates
- Live weekly webinars with industry experts
- 1-on-1 mentorship sessions
- Recognised certificates upon completion
- Community of 10,000+ students and alumni

## Your Goals
1. Help users choose the right course track based on their goals
2. Explain platform benefits clearly and enthusiastically
3. Guide users toward enrolling or booking a free consultation
4. Answer questions about webinars, pricing, and the community

Keep every reply concise, helpful, and action-oriented.`;

export async function POST(req: Request) {
  try {
    // Validate the API key is present
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("[chat] GOOGLE_GENERATIVE_AI_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: "AI service is not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request: messages array required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = streamText({
      model: google("gemini-2.0-flash"),
      messages,
      system: SYSTEM_PROMPT,
    });

    // toTextStreamResponse() is what ai@6 StreamTextResult exposes.
    // The frontend reads it as a plain UTF-8 text stream via ReadableStream.
    return result.toTextStreamResponse();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[chat] Stream error:", message);
    return new Response(
      JSON.stringify({ error: `AI service error: ${message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
