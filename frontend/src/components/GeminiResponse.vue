// frontend/src/components/GeminiResponse.vue
<template>
  <div>
    <!--<div class="input-container">
      <button @click="getResponse">Ask me</button>
    </div>-->
    <p v-if="error">{{ error }}</p> <!-- 条件渲染错误信息 -->
  </div>
</template>

<script>
export default {
  props: ['currentModel','chatHistory', 'value'], //从父组件接收的数据的声明
  data() {
    return {
      error: '' // 初始化error为空字符串
    };
  },
  methods: {
    async getResponse() {
      if (!this.value) {
        this.error = "Error! Plz as a question!";
        return;
      }
      try {
        const url = `http://localhost:3000/chat/${this.currentModel}`; // 假设您在data中定义了currentModel来存储当前选中的模型
        const options = {
          method: 'POST',
          body: JSON.stringify({
            history: this.chatHistory,
            message: this.value
          }),
          headers: {
            'Content-Type': 'application/json'//提醒服务器以JSON方式解析数据
          }
        }
        const response = await fetch(url, options); //使用fetch API提供要发送的数据设置请求头
        const data = await response.text();  //后端返回的是纯文本可以这么写，如果后端实际返回的是JSON格式，用await response.json()
        console.log(data);
        // 更新聊天历史并清空当前输入
        const newChatHistory=[
          { role: "user", parts: this.value },// 用户消息
          { role: "model", parts: data }// 模型响应
        ];
        // 使用 $emit 向父组件发送更新
        this.$emit('update-chat-history', newChatHistory);
        this.$emit('update-value', ''); // 告诉父组件清空输入
        // 这里可能还需要更新组件状态，比如显示回复等
      } catch (error) {
        console.error(error);
        this.error = "Sth went wrong! Plz try again later.";
      }
    }
  },
  mounted() {
    this.getResponse();
  }
}
</script>

<!-- <style>
@import './index.css';
</style> -->