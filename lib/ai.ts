const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const MISTRAL_MODEL = process.env.MISTRAL_MODEL || "mistral-small-latest";
const MISTRAL_BASE_URL = "https://api.mistral.ai/v1";

export async function callAI(systemPrompt: string, userText: string) {
    if (!MISTRAL_API_KEY) {
        throw new Error("Clé API Mistral manquante dans le fichier .env (MISTRAL_API_KEY)");
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
        const url = `${MISTRAL_BASE_URL}/chat/completions`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
                model: MISTRAL_MODEL,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userText }
                ],
                temperature: 0.3,
                max_tokens: 2048
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error("Limite de requêtes Mistral atteinte. Réessayez dans quelques secondes.");
            }
            const errorText = await response.text();
            console.error("Erreur Mistral :", errorText);
            throw new Error(`Erreur de connexion à l'IA (${response.status})`);
        }

        const data = await response.json();
        return data.choices[0].message.content as string;

    } catch (error: any) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error("L'IA met trop de temps à répondre. Veuillez réessayer.");
        }
        throw error;
    }
}

