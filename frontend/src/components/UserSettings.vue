// frontend/src/components/UserSettings.vue

<template>
  <!-- 如果 showSettings 为真，则显示设置模态框 -->
  <div v-if="showSettings" class="settings-modal">
    <h2>设置</h2>
    <!-- 表单提交时阻止默认事件，并调用 saveKeys 方法 -->
    <form @submit.prevent="saveKeys">
      <h3>OpenAI</h3>
      <label for="openAIKey">密钥:</label>
      <input id="openAIKey" v-model="openAIKey" placeholder="若空白则使用默认API Key">
      <label for="openAIEndpoint">端点:</label>
      <input id="openAIEndpoint" v-model="openAIEndpoint" placeholder="https://api.openai.com/v1">
      <h3>Gemini</h3>
      <label for="geminiKey">密钥:</label>
      <input id="geminiKey" v-model="geminiKey" placeholder="若空白则使用默认API Key">
      <h3>Claude</h3>
      <label for="claudeKey">密钥:</label>
      <input id="claudeKey" v-model="claudeKey" placeholder="若空白则使用默认API Key">
      <label for="claudeEndpoint">端点:</label>
      <input id="claudeEndpoint" v-model="claudeEndpoint" placeholder="请输入端点URL">
      <div class="form-buttons">
        <button type="submit">保存</button>
        <button @click="toggleSettings">关闭</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      // 用于控制设置模态框显示与隐藏的数据属性
      showSettings: false,
      // 绑定到输入框的数据属性，用于存储用户输入的 API 密钥
      openAIKey: '',
      openAIEndpoint: '',
      geminiKey: '',
      claudeKey: '',
      claudeEndpoint: ''
    };
  },
  methods: {
    async saveKeys() {
      try {
        const payload = {
          openAI: {
            apiKey: this.openAIKey,
            endpoint: this.openAIEndpoint
          },
          gemini: {
            apiKey: this.geminiKey
          },
          claude: {
            apiKey: this.claudeKey,
            endpoint: this.claudeEndpoint
          }
        };
        await axios.post('http://localhost:3000/settings', payload);
        alert('设置已保存!');
        this.toggleSettings();
      } catch (error) {
        console.error('保存设置时出现错误:', error);
        alert('保存失败，请检查控制台了解详细信息。');
      }
    },
    toggleSettings() {
      // 切换 showSettings 的布尔值，从而控制设置模态框的显示和隐藏
      this.showSettings = !this.showSettings;
    }
  }
};
</script>

<style scoped>
.settings-modal {
  /* 设置模态框的样式，使其位于页面中心 */
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  width: 40vw;
  /* Adjust the width of the modal */
  min-height: 60vh;
  /* Minimum height to accommodate form controls */
  border: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* This will help align the form and buttons */
  /* 确保模态框在其他内容之上 */
  z-index: 1000;
}

input[type="text"] {
  width: 100%;
  /* Full width to make inputs longer */
  padding: 8px;
  margin: 5px 0 15px;
  /* Space between form elements */
  box-sizing: border-box;
  /* Include padding in width calculation */
}

button {
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
}

.form-buttons {
  margin-top: auto;
  /* Pushes the button group to the bottom of the modal */
  display: flex;
  justify-content: flex-end;
  /* Aligns buttons to the right */
}
</style>