import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.warn("Missing OPENAI_API_KEY environment variable");
}

const openai = new OpenAI({
    apiKey: apiKey || "",
});

export const generateIdeas = async (topic: string, mode: string = 'Startup', language: string = 'English') => {
    if (!apiKey) {
        throw new Error("API key is missing in environment variables");
    }

    const languageInstruction = language !== 'English'
        ? `IMPORTANT: Generate the content entirely in ${language} language.`
        : '';

    const prompt = `Generate 5 creative, practical, and innovative ${mode.toLowerCase()} ideas about: ${topic}.
  ${languageInstruction}
   Return the result strictly in JSON format:
   [
     {
       "title": "Idea Title",
       "description": "Short explanation",
       "tags": ["tag1", "tag2"]
     }
   ]`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful creative assistant that outputs strictly in JSON." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
        });

        const text = completion.choices[0]?.message?.content || "[]";
        // console.log("OpenAI Raw Response:", text); // disabled for production clean logs

        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleanedText);
    } catch (error: any) {
        console.error("OpenAI API Error Detail:", error);
        throw new Error(error.message || "Failed to generate ideas from OpenAI");
    }
};
