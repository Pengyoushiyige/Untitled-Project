// Import necessary libraries
import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';

// Initialize OpenAI API configuration
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'] 
});

const app = express();// Initialize Express application

app.use(express.json());// 解析 JSON 格式的请求体
app.use(cors());//使用cors中间件来允许跨域请求

// 处理聊天请求的端点
app.post('/chat', async (req, res) => {
  try {
      const userMessage = req.body.message;

      // 使用 OpenAI API 获取回复
      const response = await openai.completions.create({
          model: "text-davinci-003", // 使用您选择的模型
          prompt: userMessage,
          max_tokens: 150 // 根据需要调整
      });

      // 将回复发送回前端
      res.status(200).json({ reply: response.choices[0].text }); //response.data.choices ？
  } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      res.status(500).send('Error processing your request');
  }
});


// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});//设置一个基本的Express服务器




/*集成OpenAI API*/
//const axios = require('axios');  //添加axios的引用


  