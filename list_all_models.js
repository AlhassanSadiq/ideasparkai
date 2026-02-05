const https = require('https');

const apiKey = "AIzaSyCsDzw6CSQJb414lrSiHqr1H8_g2ariGs8";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log("AVAILABLE MODELS:");
                json.models.forEach(m => console.log(`- ${m.name.replace('models/', '')}`));
            } else {
                console.log("No models found or error:", json);
            }
        } catch (e) {
            console.error("Error parsing response:", e);
            console.log("Raw response:", data);
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
