import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
//import 'dotenv/config';

dotenv.config({ path: './API_Key.env' });

// 初始化Google Cloud客户端
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generationConfig = {temperature: 0.9, topP:1, topK: 1, maxOutputTokens: 4096 };
const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});

//生成内容
async function generateContent(){
    try{
        const prompt = "Introduce yourself";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log(response.text());        
    } catch (error) {console.error('Error generating content:', error);
}
}

generateContent();
