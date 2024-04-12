// backend/routes/settings.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path'; // 引入path模块模块来构建指向.env文件的绝对路径
import { fileURLToPath } from 'url'; // 引入fileURLToPath
const __filename = fileURLToPath(import.meta.url);// 获取当前文件的绝对路径
const __dirname = path.dirname(__filename);// 获取当前文件所在目录的绝对路径
const envPath = path.resolve(__dirname, '../API_Key.env');// 构建.env文件的绝对路径，确保它能够在任何地方被正确加载
dotenv.config({ path: envPath }); //.env在父目录

// 初始化全局设置对象，优先使用环境变量中的值
global.settings = {
  openAI: {
    apiKey: process.env.OPENAI_API_KEY  ,
    endpoint: process.env.OPENAI_API_URL  
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY  
  },
  claude: {
    apiKey: process.env.CLAUDE_API_KEY  ,
    endpoint: process.env.CLAUDE_API_URL  
  }
};

const router = express.Router();

// 更新设置的API
router.post('/settings', (req, res) => {
  // 提取请求体中的设置
  const { openAI, gemini, claude } = req.body;
  
  // 更新全局设置对象
  if (openAI && openAI.apiKey ) global.settings.openAI.apiKey  = openAI.apiKey ;
  if (openAI && openAI.endpoint) global.settings.openAI.endpoint = openAI.endpoint;
  if (gemini && gemini.apiKey ) global.settings.gemini.apiKey  = gemini.apiKey ;
  if (claude && claude.apiKey ) global.settings.claude.apiKey  = claude.apiKey ;
  if (claude && claude.endpoint) global.settings.claude.endpoint = claude.endpoint;

  console.log('Updated global settings:', JSON.stringify(global.settings, null, 2));
  res.json({ message: 'Settings updated successfully', settings: global.settings });
});

export default router;
