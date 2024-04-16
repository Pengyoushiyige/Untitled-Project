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
      <h4>模型选项</h4>
      <label for="openAIModel">选择模型:</label>
      <select id="openAIModel" v-model="openAIModel">
        <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
        <option value="gpt-4">gpt-4</option>
        <option value="gpt-4-turbo">gpt-4-turbo</option>
        <option value="gpt-4-mobile">gpt-4-mobile</option>
        <option value="custom">自定义</option>
      </select>
      <input v-if="openAIModel === 'custom'" v-model="customOpenAIModel" placeholder="输入自定义模型名称">
      <label for="temperature">模型温度 Temperature:</label>
      <input type="range" id="temperature" v-model="openAITemperature" min="0" max="1" step="0.01">
      <span>{{ parseFloat(openAITemperature).toFixed(2) }}</span>
      <label for="maxTokens">最大上下文 Max Tokens:</label>
      <input type="number" id="maxTokens" v-model="openAIMaxTokens" min="1" max="2000">

      <h3>Gemini</h3>
      <label for="geminiKey">密钥:</label>
      <input id="geminiKey" v-model="geminiKey" placeholder="若空白则使用默认API Key">
      <h4>模型选项</h4>
      <label for="geminiTemperature">模型温度 Temperature:</label>
      <input type="range" id="geminiTemperature" v-model.number="geminiTemperature" min="0" max="1" step="0.01">
      <span>{{ parseFloat(geminiTemperature).toFixed(2) }}</span>
      <label for="geminiMaxTokens">最大令牌 Max Tokens:</label>
      <input type="number" id="geminiMaxTokens" v-model.number="geminiMaxTokens" min="1" max="2000">
      <h3>Claude</h3>
      <label for="claudeKey">密钥:</label>
      <input id="claudeKey" v-model="claudeKey" placeholder="若空白则使用默认API Key">
      <label for="claudeEndpoint">端点:</label>
      <input id="claudeEndpoint" v-model="claudeEndpoint" placeholder="请输入端点URL">
      <h4>模型选项</h4>
      <label for="claudeModel">选择模型:</label>
      <select id="claudeModel" v-model="claudeModel">
        <option value="claude-3-opus">claude-3-opus</option>
        <option value="claude-3-sonnet">claude-3-sonnet</option>
        <option value="claude-3-haiku">claude-3-haiku</option>
        <option value="claude-3-haiku-20240307">claude-3-haiku-20240307</option>
        <option value="custom">自定义</option>
      </select>
      <input v-if="claudeModel === 'custom'" v-model="customClaudeModel" placeholder="输入自定义模型名称">
      <label for="temperature">模型温度 Temperature:</label>
      <input type="range" id="temperature" v-model.number="claudeTemperature" min="0" max="1" step="0.01">
      <span>{{ parseFloat(claudeTemperature).toFixed(2) }}</span>
      <label for="maxTokens">最大上下文 Max Tokens:</label>
      <input type="number" id="maxTokens" v-model.number="claudeMaxTokens" min="1" max="2000">

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
      openAIModel: 'gpt-3.5-turbo',
      customOpenAIModel: '',
      openAITemperature: 0.7,
      openAIMaxTokens: 150, 
      geminiKey: '',
      geminiTemperature: 0.9, 
      geminiMaxTokens: 200,
      claudeKey: '',
      claudeEndpoint: '',
      claudeModel: 'claude-3-haiku-20240307',
      customClaudeModel: '',
      claudeTemperature: 0.7,
      claudeMaxTokens: 150,
    };
  },
  methods: {
    async saveKeys() {
      try {
        const payload = {
          openAI: {
            apiKey: this.openAIKey,
            endpoint: this.openAIEndpoint,
            model: this.openAIModel === 'custom' ? this.customOpenAIModel : this.openAIModel,
            temperature: parseFloat(this.openAITemperature),
            maxTokens: parseInt(this.openAIMaxTokens, 10),
          },
          gemini: {
            apiKey: this.geminiKey,
            temperature: parseFloat(this.geminiTemperature),
            maxTokens: parseInt(this.geminiMaxTokens, 10),
          },
          claude: {
            apiKey: this.claudeKey,
            endpoint: this.claudeEndpoint,
            model: this.claudeModel === 'custom' ? this.customClaudeModel : this.claudeModel,
            temperature: parseFloat(this.claudeTemperature),
            maxTokens: parseInt(this.claudeMaxTokens, 10),
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
  max-height: 80vh; /* 最大高度，超出则显示滚动条 */
  border: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* 添加滚动条 */
  /* 确保模态框在其他内容之上 */
  z-index: 1000;
}

label, input, select {
  display: block; /* 使每个元素单独占据一行 */
  width: 100%; /* 充满容器宽度 */
  margin-top: 10px; /* 顶部间距 */
}

input[type="text"] {
  width: 100%;
  /* Full width to make inputs longer */
  padding: 8px;
  /*margin: 5px 0 15px; Space between form elements */
  margin-bottom: 15px; /* 增加输入框下方的间距 */
  box-sizing: border-box;
  /* Include padding in width calculation */
}

button {
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  width: auto; /* 按钮宽度自动调整，不填满整行 */
  margin-top: 20px; /* 按钮顶部间距 */
}

.form-buttons {
  margin-top: auto;
  /* Pushes the button group to the bottom of the modal */
  display: flex;
  justify-content: flex-end;
  /* Aligns buttons to the right */
}
</style>