const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const GEMINI_BASE_URL = process.env.GEMINI_PROXY_URL || "https://generativelanguage.googleapis.com";

export async function callAI(systemPrompt: string, userText: string) {
    if (!GEMINI_API_KEY) {
        throw new Error("Clé API Gemini manquante dans le fichier .env (GEMINI_API_KEY)");
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
        const url = `${GEMINI_BASE_URL}/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                systemInstruction: {
                    parts: [{ text: systemPrompt }]
                },
                contents: [
                    { role: "user", parts: [{ text: userText }] }
                ],
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 2048,
                }
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error("Limite de requêtes Gemini atteinte. Réessayez dans quelques secondes.");
            }
            const errorText = await response.text();
            console.error("Erreur Gemini :", errorText);
            throw new Error(`Erreur de connexion à l'IA (${response.status})`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text as string;

    } catch (error: any) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error("L'IA met trop de temps à répondre. Veuillez réessayer.");
        }
        throw error;
    }
}

