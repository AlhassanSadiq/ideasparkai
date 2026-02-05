const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyCsDzw6CSQJb414lrSiHqr1H8_g2ariGs8";
const genAI = new GoogleGenerativeAI(apiKey);

async function checkModels() {
    console.log("Checking exhaustive list of models...");

    const models = [
        "gemini-1.5-flash-001",
        "gemini-1.5-flash-002",
        "gemini-1.5-flash-8b",
        "gemini-1.5-pro-001",
        "gemini-1.5-pro-002",
        "gemini-1.0-pro-001",
        "gemini-pro-vision",
        "gemini-2.0-flash-exp",
        "gemini-2.0-pro-exp-02-05", // hypothetical
        "lear-lm-1.5-pro" // unlikely
    ];

    for (const modelName of models) {
        try {
            process.stdout.write(`Testing ${modelName} ... `);
            const m = genAI.getGenerativeModel({ model: modelName });
            // Generate 1 token to keep it cheap/fast
            const result = await m.generateContent("Hi");
            console.log(`✅ SUCCESS!`);
            return;
        } catch (e) {
            const msg = e.message.split('\n')[0];
            if (msg.includes("429")) {
                console.log(`❌ 429 (Quota Limit): ${msg}`);
            } else if (msg.includes("404")) {
                console.log(`❌ 404 (Not Found)`);
            } else {
                console.log(`❌ ERROR: ${msg}`);
            }
        }
    }
}

checkModels();
