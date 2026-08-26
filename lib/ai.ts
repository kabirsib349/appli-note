export async function callAI(systemPrompt: string, userText: string) {
    if (!process.env.GROQ_API_KEY) {
        throw new Error("Clé API Groq manquante dans le fichier .env");
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "groq/compound-mini", // Nouveau modèle officiel ultra-rapide
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userText }
            ],
            temperature: 0.5,
        })
    });

    if (!response.ok) {
        if (response.status === 429) {
            throw new Error("La limite gratuite de l'IA a été atteinte. Veuillez patienter quelques secondes avant de réessayer.");
        }
        const errorText = await response.text();
        console.error("Détail de l'erreur Groq :", errorText);
        throw new Error(`Erreur de connexion à l'IA (${response.status})`);
    }

    const data = await response.json();
    return data.choices[0].message.content as string;
}
