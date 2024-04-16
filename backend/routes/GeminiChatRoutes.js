// backend/routes/GeminiChatRoutes.js
import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

//多轮对话用的代码块
const genAI = new GoogleGenerativeAI(global.settings.gemini.apiKey);
console.log(`已加载GEMINI_API_KEY: ${global.settings.gemini.apiKey}`);
router.post('/chat/gemini',async(req,res)=>{   //Express路由处理器，响应发送到/gemini的post请求
  //异步函数async (req,res)的意义在于，当前端向/route发送post请求的时候，运行这个函数
  console.log(req.body.history)  
  console.log(req.body.message)
  const generationConfig = {
    maxOutputTokens: global.settings.gemini.maxTokens,
    temperature: global.settings.gemini.temperature,
  };  
  const model = genAI.getGenerativeModel({model:"gemini-pro", generationConfig }) //写在异步函数里面:每个请求都会有自己的model实例，互不干扰
  const chat = model.startChat({
    history:req.body.history
  })
  const msg = req.body.message

  const result = await chat.sendMessage(msg)
  const response = await result.response
  const text = response.text()
  res.send(text)
})

export default router;