// Import necessary libraries
import express from 'express';
import cors from 'cors';
import OpenAIChatRoutes from './routes/OpenAIChatRoutes.js';



const app = express();// Initialize Express application

app.use(express.json());// 解析 JSON 格式的请求体
app.use(cors());//使用cors中间件来允许跨域请求


app.use('/', OpenAIChatRoutes);
// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});//设置一个基本的Express服务器




/*集成OpenAI API*/
//const axios = require('axios');  //添加axios的引用


  