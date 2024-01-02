<template>
  <div id="app">
    <div id="chat-window">
      <!-- 聊天内容显示区 -->
      <div v-for="message in messages" :key="message.id">
        {{ message.text }}
      </div>
    </div>
    <input v-model="newMessage" type="text" placeholder="输入信息...">
    <button @click="sendMessage">发送</button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      newMessage: '',   // 用户输入的新消息
      messages: [],     // 存储所有消息的数组
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({ text: this.newMessage });
        this.newMessage = ''; // 清空输入框
      }
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

</style>
