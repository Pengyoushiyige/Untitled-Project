import express from 'express';
import OpenAI from 'openai';

const router = express.Router();
// Initialize OpenAI API configuration
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'] 
});

// 处理聊天请求的端点
router.post('/chat', async (req, res) => {
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