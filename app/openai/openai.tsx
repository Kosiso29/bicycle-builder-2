import OpenAI from "openai";

const openAIClient = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
    dangerouslyAllowBrowser: true
})

export async function getChatCompletion(base64Image: string) {
    const chatCompletion = await openAIClient.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                "role": "user",
                "content": [
                {"type": "text", "text": "Frame, Groupset, Wheels, Stem, Handlebar, Saddle, Tyre. Separate Brand and Model. No header/footer."},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": base64Image,
                    },
                },
                ],
            }
        ]
    });

    return chatCompletion;
}