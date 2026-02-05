const { GoogleGenerativeAI } = require("@google/generative-ai");

// Manually passing key to avoid dotenv issues in this quick script
const apiKey = process.env.GEMINI_API_KEY || "AIzaSyCsDzw6CSQJb414lrSiHqr1H8_g2ariGs8";

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // We can't list models directly with the localized helper sometimes, 
        // but the generic client might have listModels. 
        // Actually, in the Node SDK, it's a bit different.
        // Let's try to just hit a model that should work or correct the syntax.
        // There isn't a direct "listModels" on the instance in some versions, 
        // but typically it's specific to the API. 
        // Let's rely on the user's error message which told us to "Call ListModels".

        // Attempting to use the model manager if exposed, otherwise just trying 1.5-flash-8b
        console.log("Checking commonly available models...");

        const modelsToTry = [
            "gemini-1.5-flash",
            "gemini-1.5-flash-latest",
            "gemini-1.5-pro",
            "gemini-1.0-pro",
            "gemini-pro"
        ];

        for (const modelName of modelsToTry) {
            console.log(`Testing ${modelName}...`);
            try {
                const m = genAI.getGenerativeModel({ model: modelName });
                const result = await m.generateContent("Hello");
                console.log(`SUCCESS: ${modelName} works!`);
                return; // Found one
            } catch (e) {
                console.log(`FAILED ${modelName}: ${e.message.split('\n')[0]}`);
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
