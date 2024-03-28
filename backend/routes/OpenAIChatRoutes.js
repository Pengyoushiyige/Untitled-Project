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
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_API_URL,
});

//验证环境变量是否被正确加载
console.log(`已加载OPENAI_API_KEY: ${process.env.OPENAI_API_KEY}`);
console.log(`已加载OPENAI_API_URL: ${process.env.OPENAI_API_URL}`);

// 处理聊天请求的端点
router.post('/chat/openai', async (req, res) => {
    try {
        const history = Array.isArray(req.body.history) ? req.body.history : []; // 确保 history 是一个数组
        if (history.length === 0) {
            history.push({ role: "system", content: "You are a helpful assistant." }); //初始系统消息
        }
        const messages = [...history, req.body.message]; 
        console.log(messages);
        // 使用 OpenAI API 获取回复
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // 使用您选择的模型
            //messages的期望形式[{"role": "system", "content": "You are a helpful assistant."},req.body.history,req.body.message],
            messages: messages, // 将历史对话和当前消息一起作为参数传递
            max_tokens: 150 // 根据需要调整
        });
  
        // 将回复发送回前端
        res.status(200).json({ reply: completion.choices[0].message.content }); //choices数组每一个元素代表一种可能的回答
        console.log(completion.choices[0]);
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).send('Error processing your request with OpenAI');
    }
  });
  

export default router;