// backend/routes/OpenAIChatRoutes.js
import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path'; // 引入path模块模块来构建指向.env文件的绝对路径
import { fileURLToPath } from 'url'; // 引入fileURLToPath
const __filename = fileURLToPath(import.meta.url);// 获取当前文件的绝对路径
const __dirname = path.dirname(__filename);// 获取当前文件所在目录的绝对路径
const envPath = path.resolve(__dirname, '../API_Key.env');// 构建.env文件的绝对路径，确保它能够在任何地方被正确加载
dotenv.config({ path: envPath }); //.env在父目录

const router = express.Router();
// Initialize OpenAI API configuration
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'] 
});

// 处理聊天请求的端点
router.post('/chat/openai', async (req, res) => {
    try {
        const userMessage = req.body.message;
  
        // 使用 OpenAI API 获取回复
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-1106", // 使用您选择的模型
            prompt: userMessage,
            max_tokens: 150 // 根据需要调整
        });
  
        // 将回复发送回前端
        res.status(200).json({ reply: response.choices[0].text }); //response.data.choices ？
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).send('Error processing your request with OpenAI');
    }
  });
  

export default router;