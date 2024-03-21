// src/components/ModelSwitcher.vue

<template>
  <div>
    <select v-model="selectedModel" @change="changeModel">
      <option value="openai">OpenAI</option>
      <option value="gemini">Gemini</option>
      <option value="claude">Claude</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedModel: 'gemini', // 默认选中的模型
    };
  },
  methods: {
    changeModel() {
      // 在这里直接发送请求到后端，根据selectedModel的值动态更改请求的URL
      const url = `http://localhost:3000/chat/${this.selectedModel}`;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // 根据后端需要的信息构造请求体
          history: [], // 假设切换模型时清空历史
          message: '', // 切换模型时可能不需要发送具体消息
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(`${this.selectedModel} model activated successfully`, data);
        // 可以在这里通过事件通知 App.vue，例如更新聊天历史等
        this.$emit('modelActivated', this.selectedModel);
      })
      .catch(error => {
        console.error(`Error activating ${this.selectedModel} model:`, error);
      });
    },
  },
};
</script>
