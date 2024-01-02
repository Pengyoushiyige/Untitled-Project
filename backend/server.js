const express = require('express');
const app = express();

app.use(express.json());

/*app.get('/', (req, res) => {
    res.send('Hello World!');
  });
*/
  
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});//设置一个基本的Express服务器


/*添加一个新的路由来处理来自前端的聊天消息*/
app.post('/chat', async (req, res) => { 
    const userMessage = req.body.message;
    // 在这里，我们将需要将用户消息发送到AI服务
    // 现在，只是简单地将收到的消息打印出来
    const aiReply = await getAIResponse(userMessage);
    // 响应
    res.json({ reply: aiReply });
  });  


/*集成OpenAI API*/
const axios = require('axios');  //添加axios的引用

async function getAIResponse(message) { //创建一个函数来调用OpenAI API
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: message,
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `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` // 替换为你的API密钥  (后期应该避免暴露在代码中)
      }
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return "抱歉，无法获取AI回复。";
  }
}
  