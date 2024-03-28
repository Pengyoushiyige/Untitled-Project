// backend/routes/GeminiChatRoutes.js
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

//多轮对话用的代码块
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log(`已加载GEMINI_API_KEY: ${process.env.GEMINI_API_KEY}`);
router.post('/chat/gemini',async(req,res)=>{   //Express路由处理器，响应发送到/gemini的post请求
  //异步函数async (req,res)的意义在于，当前端向/route发送post请求的时候，运行这个函数
  console.log(req.body.history)  
  console.log(req.body.message)
  const model = genAI.getGenerativeModel({model:"gemini-pro"}) //写在异步函数里面:每个请求都会有自己的model实例，互不干扰
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