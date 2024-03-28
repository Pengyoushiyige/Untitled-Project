// frontend/src/components/OpenAIResponse.vue
<template>
  <div>
    <p v-if="error">{{ error }}</p> <!-- 条件渲染错误信息 -->
  </div>
</template>

<script>
export default {
  props: ['currentModel', 'chatHistory', 'value'], // 接收来自父组件的props
  data() {
    return {
      error: '' // 初始化错误信息
    };
  },
  methods: {
    async getResponse() {
      if (!this.value) {
        this.error = "Please ask a question!";
        return;
      }
      try {
        const url = `http://localhost:3000/chat/${this.currentModel}`; // 使用props中的currentModel确定URL
        const options = {
          method: 'POST',
          body: JSON.stringify({
            history: this.chatHistory,
            message:  { role: "user", content: this.value } //和gemini不同之处
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }; //gemini那边没有分号 谁是对的
        const response = await fetch(url, options);
        const data = await response.json(); // 假设后端返回JSON格式的数据 这里和Gemini不同
        console.log(data);
        // 处理返回的数据，例如更新聊天历史
        this.$emit('update-chat-history', [{ role: "user", parts: this.value }, { role: "system", parts: data.reply }]); //只用给历史记录中增加本轮的用户和AI的对话即可
        this.$emit('update-value', ''); // 清空当前输入
      } catch (error) {
        console.error("Fetch error:", error);
        this.error = "Something went wrong. Please try again later.";
      }
    }
  },
  mounted() {
    // 如果需要在组件加载时就调用API
    this.getResponse();
  }
}
</script>
