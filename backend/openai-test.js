import OpenAI from "openai";
import dotenv from 'dotenv';
import path from 'path'; // 引入path模块模块来构建指向.env文件的绝对路径
import { fileURLToPath } from 'url'; // Import fileURLToPath for ES modules

const __filename = fileURLToPath(import.meta.url);//import.meta.url获取当前模块的 URL然后使用 fileURLToPath 将这个 URL 转换成文件路径
const __dirname = path.dirname(__filename);//获取当前文件的目录路径
const envPath = path.resolve(__dirname, './API_Key.env'); // 根据当前目录路径（__dirname）和 .env 文件相对于当前文件的相对路径来解析 .env 文件的绝对路径

// Configure dotenv with the specific path to your .env file
dotenv.config({ path: envPath });

// 从环境变量中读取API密钥和基础URL
const apiKey = process.env.OPENAI_API_KEY;
const baseURL = process.env.OPENAI_API_URL;

const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: baseURL,
    //apiKey: 'sk-8ViPsloGbCB7maj57a330f1696E0452bAcFaF051D402735b',
    //baseURL: "https://api.g4f.icu/v1",
});

console.log(`API Key from Env: '${process.env.OPENAI_API_KEY}'`);
console.log(`Base URL from Env: '${process.env.OPENAI_API_URL}'`);

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();
