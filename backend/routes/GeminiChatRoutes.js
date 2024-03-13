import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import path from 'path'; // 引入path模块模块来构建指向.env文件的绝对路径
import { fileURLToPath } from 'url'; // 引入fileURLToPath

const __filename = fileURLToPath(import.meta.url);// 获取当前文件的绝对路径
const __dirname = path.dirname(__filename);// 获取当前文件所在目录的绝对路径
const envPath = path.resolve(__dirname, '../API_Key.env');// 构建.env文件的绝对路径，确保它能够在任何地方被正确加载
dotenv.config({ path: envPath }); //.env在父目录

const router = express.Router();

// 初始化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generationConfig = {temperature: 0.9, topP:1, topK: 1, maxOutputTokens: 4096 };
const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});

//console.log(process.env.GEMINI_API_KEY);//确保是否正确加载
//处理post请求的路由
router.post('/chat', async (req, res) => {
    const userMessage = req.body.message; // Assuming the prompt sent by the user is in the body under the key 'prompt'
    try {
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        res.json({ reply: response.text() }); // Send the AI response back to the client
    } catch (error) {
        console.error('Error generating content with Gemini:', error);
        res.status(500).send('Error processing your request with Gemini');
    }
});

export default router;