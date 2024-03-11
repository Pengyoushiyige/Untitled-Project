<template>
  <div id="app">
    <div id="chat-window">
      <!-- 聊天内容显示区 -->
      <div v-for="message in messages" :key="message.id">
        {{ message.text }}
      </div>
    </div>
    <div id="model-selector">
      <!-- 聊天窗口和其他元素 -->
      <label for="model-select">选择模型:</label>
      <select id="model-select" v-model="selectedModel">
        <option value="gpt">GPT</option>
        <option value="gemini">Gemini</option>
        <option value="claude">Claude</option>
      </select>
    </div>    
    <input v-model="newMessage" type="text" placeholder="输入信息...">
    <button @click="sendMessage">发送</button>
  </div>
</template>


<script>
import axios from 'axios';

export default {  
  data() {
    return {
      newMessage: '',   // 用户输入的新消息
      messages: [],     // 存储所有消息的数组
      selectedModel: 'gpt', // 默认选中的模型
    };
  },
  methods: {
    sendMessage() {     //用户点击“发送”按钮时调用的方法
      if (this.newMessage.trim() !== '') { //如果用户输入的消息不为空（去除首尾空格后）
        axios.post('http://localhost:3000/chat', { message: this.newMessage }) //发起一个 POST 请求到后端/chat 携带用户输入的消息(请求体)
        .then(response => { //收到后端的响应时，执行.then的代码块
          this.messages.push({ text: this.newMessage, sender: 'user' }); //将用户输入的消息添加到 messages 数组中，以在界面上显示
          this.messages.push({ text: response.data.reply, sender: 'gpt' }); //将从后端获取的回应添加到 messages 数组中
        })
        .catch(error => {  //如果请求失败 
            console.error('Error sending message:', error);  // 17
        });
        this.newMessage = ''; // 清空输入框
      }
      /*
      const payload = {
      message: this.newMessage,
      model: this.selectedModel, // 现在包括选中的模型
      };
    // ... 发送payload到后端 ...
    */
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#chat-window {
  height: 300px;
  border: 1px solid #ddd;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 10px;
}
input[type="text"] {
  width: 70%;
  padding: 5px;
}
button {
  width: 20%;
  padding: 5px;
}
#model-selector {
  margin-bottom: 1rem;
}
#model-select {
  padding: .5rem;
  font-size: 1rem;
}

</style>
