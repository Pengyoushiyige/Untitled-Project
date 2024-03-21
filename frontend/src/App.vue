<template>
  <div class="app">
    <model-switcher @modelActivated="handleModelActivated"></model-switcher>
    <p>What do you want to know?
      <button @click="surprise" :disabled="chatHistory.length > 0">Surprise me</button>
    </p>
    <div class="input-container">
      <input v-model="value" placeholder="When is Christmas……?" @input="handleInput" />
      <button @click="getResponse">Ask me</button>
      <button @click="clear">Clear</button>
    </div>
    <p v-if="error">{{error}}</p><!-- 确保错误信息正确显示 -->
    <div class="search-result">
      <div v-for="(chatItem, index) in chatHistory" :key="index">
        <!-- 遍历chatHistory数组，chatItem代表当前遍历到的数组元素，index是当前元素的索引 -->
        <p class="answer">{{ chatItem.role }}: {{ chatItem.parts }}</p><!--展示每条聊天记录的角色和内容-->
      </div>
    </div>
  </div>
</template>


<script>
import ModelSwitcher from './components/ModelSwitcher.vue';

const surpriseOptions = [
  'Who won the latest Nobel Peace Prize?',
  'Where does pizza come from?',
  'How do you make a BLT sandwich?'
];

export default { //导出了一个对象,这个对象定义了Vue组件的选项，使得其他文件可以通过import引入并使用这个组件
  data() {
    return {
      error: '', // 假设有一个用于追踪错误的属性
      results: [], // 存放搜索结果的数组
      value: '',
      chatHistory: [],
      currentModel: 'gemini', // 默认模型
    };
  },
  components: {
    ModelSwitcher,
  },
  methods: {
    handleModelActivated(selectedModel) {
      console.log("Model activated:", selectedModel);
      // 根据新激活的模型执行必要的更新，例如清空聊天历史等
      this.chatHistory = [];
      // 如果有必要，可以在这里更新 currentModel 状态，但要确保这个状态的定义和更新逻辑
      this.currentModel = selectedModel;
    },
    clear() {
      // 清空问题输入框
      this.value = '';
      this.error = "";
      this.chatHistory = [];
    },
    setError(errorMessage) {// 示例方法：模拟设置错误状态
      this.error = errorMessage;
    },
    surprise() {
      const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
      this.value = randomValue; // 更新value
    },
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
        this.chatHistory.push(
          { role: "user", parts: this.value },
          { role: "model", parts: data }
        );
        this.value = ""; // 清空输入
        // 这里可能还需要更新组件状态，比如显示回复等
      } catch (error) {
        console.error(error);
        this.error = "Sth went wrong! Plz try again later.";
      }
    }
  }
}
</script>


<style>
@import './index.css';
</style>
