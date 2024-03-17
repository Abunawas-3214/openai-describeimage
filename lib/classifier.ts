import { OpenAI } from 'openai';
import { OpenAIStream } from 'ai';
import { buffer } from 'stream/consumers';

// create a new OpenAI cient using key from .env
const openAi = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

export const classifyImage = async (file: File) => {
    // encode our file as base64 string so it can e sent in an HTTP request
    const encoded = await file
        .arrayBuffer()
        .then((buffer) => Buffer.from(buffer).toString('base64'));

    // create an OpenAI reques with a prompt
    const completion = await openAi.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: "Describe this image as if you were David Attenborough. Provide as much detail as possible."
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:image/jpeg;base64,${encoded}`
                        }
                    }
                ]
            }
        ],
        stream: true,
        max_tokens: 1000
    })

    // stream response
    return OpenAIStream(completion);
}