// Import necessary libraries
import express from 'express';
import cors from 'cors'; //前端后端通信，跨域请求用的
import dotenv from 'dotenv'; //加载环境变量用的
dotenv.config();

import OpenAIChatRoutes from './routes/OpenAIChatRoutes.js';
import GeminiChatRoutes from './routes/GeminiChatRoutes.js';

const app = express();// Initialize Express application

app.use(express.json());// 解析 JSON 格式的请求体
app.use(cors());//使用cors中间件来允许跨域请求


//app.use('/api/openai', OpenAIChatRoutes);
//app.use('/api/gemini', GeminiChatRoutes);


//测试，多轮对话用的代码块
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
app.post('/gemini',async(req,res)=>{
  console.log(req.body.history)
  console.log(req.body.message)
  const model = genAI.getGenerativeModel({model:"gemini-pro"})
  const chat = model.startChat({
    history:req.body.history
  })
  const msg = req.body.message

  const result = await chat.sendMessage(msg)
  const response = await result.response
  const text = response.text()
  res.send(text)
})
//测试完毕

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});//设置一个基本的Express服务器




/*集成OpenAI API*/
//const axios = require('axios');  //添加axios的引用


  