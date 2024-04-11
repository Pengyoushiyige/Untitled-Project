// backend/server.js
import express from 'express';
import cors from 'cors'; //前端后端通信，跨域请求用的
import dotenv from 'dotenv'; //加载环境变量用的
dotenv.config({ path: './API_Key.env' });

import OpenAIChatRoutes from './routes/OpenAIChatRoutes.js';
import GeminiChatRoutes from './routes/GeminiChatRoutes.js';
import ClaudeChatRoutes from './routes/ClaudeChatRoutes.js';

const app = express();// Initialize Express application
app.use(express.json());// 解析 JSON 格式的请求体
app.use(cors());//使用cors中间件来允许跨域请求

app.use(OpenAIChatRoutes);
app.use(GeminiChatRoutes);
app.use(ClaudeChatRoutes);

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});//设置一个基本的Express服务器


  