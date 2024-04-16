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
    endpoint: process.env.OPENAI_API_URL,
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    maxTokens: 150,
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.9,
    maxTokens: 200,  
  },
  claude: {
    apiKey: process.env.CLAUDE_API_KEY  ,
    endpoint: process.env.CLAUDE_API_URL,
    model: "claude-3-haiku-20240307", 
    temperature: 0.7,
    maxTokens: 150,
  }
};

const router = express.Router();

// 更新设置的API
router.post('/settings', (req, res) => {
  // 提取请求体中的设置
  const { openAI, gemini, claude } = req.body;
  
  // 更新全局设置对象
  if (openAI) {
    global.settings.openAI.apiKey = openAI.apiKey || global.settings.openAI.apiKey;
    global.settings.openAI.endpoint = openAI.endpoint || global.settings.openAI.endpoint;
    global.settings.openAI.model = openAI.model || global.settings.openAI.model;
    global.settings.openAI.temperature = parseFloat(openAI.temperature) || global.settings.openAI.temperature;
    global.settings.openAI.maxTokens = parseInt(openAI.maxTokens, 10) || global.settings.openAI.maxTokens;
  }
  if (gemini) {
    global.settings.gemini.apiKey  = gemini.apiKey ;
    global.settings.gemini.temperature = parseFloat(gemini.temperature) || global.settings.gemini.temperature;
    global.settings.gemini.maxTokens = parseInt(gemini.maxTokens, 10) || global.settings.gemini.maxTokens;
  }  
  if (claude) {
    global.settings.claude.apiKey = claude.apiKey || global.settings.claude.apiKey;
    global.settings.claude.endpoint = claude.endpoint || global.settings.claude.endpoint;
    global.settings.claude.model = claude.model || global.settings.claude.model;
    global.settings.claude.temperature = parseFloat(claude.temperature) || global.settings.claude.temperature;
    global.settings.claude.maxTokens = parseInt(claude.maxTokens, 10) || global.settings.claude.maxTokens;
  }

  console.log('Updated global settings:', JSON.stringify(global.settings, null, 2));
  res.json({ message: 'Settings updated successfully', settings: global.settings });
});

export default router;
