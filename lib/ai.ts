// API Ollama locale — compatible OpenAI, aucune clé requise
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "qwen2.5:0.5b";

export async function callAI(systemPrompt: string, userText: string) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 secondes max (modèle local)

    try {
        const response = await fetch(`${OLLAMA_BASE_URL}/v1/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userText }
                ],
                temperature: 0.3,
                stream: false,
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Détail de l'erreur Ollama :", errorText);
            throw new Error(`Erreur de connexion à l'IA locale (${response.status}). Vérifiez qu'Ollama est bien démarré sur le serveur.`);
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
