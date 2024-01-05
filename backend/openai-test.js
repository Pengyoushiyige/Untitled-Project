import OpenAI from "openai";

// 异步函数，用于执行 API 调用
async function runOpenAI() {
  const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    try {
        const response = await openai.completions.create({
            model: 'text-davinci-003',
            prompt: 'Say this is a test',
            temperature: 0,
            max_tokens: 7
        });
        console.log(response.choices[0].text);
    } catch (error) {
        console.error(error);
    }
}

// 调用异步函数
runOpenAI();
