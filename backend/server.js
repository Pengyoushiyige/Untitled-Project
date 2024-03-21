// Import necessary libraries
import express from 'express';
import cors from 'cors'; //前端后端通信，跨域请求用的
import dotenv from 'dotenv'; //加载环境变量用的
dotenv.config({ path: './API_Key.env' });

const app = express();// Initialize Express application

app.use(express.json());// 解析 JSON 格式的请求体
app.use(cors());//使用cors中间件来允许跨域请求

//多轮对话用的代码块
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
app.post('/chat/gemini',async(req,res)=>{   //Express路由处理器，响应发送到/gemini的post请求
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

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});//设置一个基本的Express服务器


  