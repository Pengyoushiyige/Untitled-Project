// frontend/src/App.vue

<template>
  <div class="app">
    <model-switcher @modelActivated="handleModelActivated"></model-switcher>
    <p>What do you want to know?
      <button @click="surprise" :disabled="chatHistory.length > 0">Surprise me</button>
    </p>
    <div class="input-container">
      <input v-model="value" placeholder="When is Christmas……?" @input="handleInput" />
      <button @click="getResponse">Ask me</button><!--发射一个自定义事件-->
      <button @click="clear">Clear</button>
    </div>
    <p v-if="error">{{ error }}</p><!-- 确保错误信息正确显示 -->
    <div class="search-result">
      <div v-for="(chatItem, index) in chatHistory" :key="index">
        <!-- 遍历chatHistory数组，chatItem代表当前遍历到的数组元素，index是当前元素的索引 -->
        <p class="answer">{{ chatItem.role }}: {{ chatItem.parts }}</p><!--展示每条聊天记录的角色和内容-->
      </div>
    </div>
    <!--接下来使用ref调用子组件-->
    <component ref="currentComp" :is="currentComponent" :current-model="currentModel" :chatHistory="chatHistory"
      :value="value" @update-chat-history="updateChatHistory" @update-value="updateValue">
    </component>
    <!-- 使用动态组件语法来根据当前选择的模型加载相应的响应处理组件 等号前面给子组件看，等号后面给父组件看 -->
  </div>
</template>


<script>
import ModelSwitcher from './components/ModelSwitcher.vue';
import OpenAIResponse from './components/OpenAIResponse.vue';
import GeminiResponse from './components/GeminiResponse.vue';
//import ClaudeResponse from './components/ClaudeResponse.vue';

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
      value: '', //存储用户的输入
      chatHistory: [],
      currentModel: 'openai', // 默认模型
    };
  },
  components: {
    ModelSwitcher,
    GeminiResponse,
    OpenAIResponse,
    //ClaudeResponse,
  },
  computed: { //使用计算属性currentComponent来确定应该渲染哪个组件
    currentComponent() {
      switch (this.currentModel) {
        case 'openai': return 'OpenAIResponse';
        case 'gemini': return 'GeminiResponse';
        //case 'claude': return 'ClaudeResponse';
        // 添加更多模型对应的分支...
        default: return null;
      }
    }
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
      alert('All clear!'); 
    },
    setError(errorMessage) {// 示例方法：模拟设置错误状态
      this.error = errorMessage;
    },
    surprise() {
      const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
      this.value = randomValue; // 更新value
    },
    updateChatHistory(newItems) {
      newItems.forEach(item => {
        this.chatHistory.push(item);
      });
    },
    updateValue(newValue) {
      this.value = newValue;
    },
    async getResponse() { //使用上面定义的ref引用来调用当前激活的子组件的getResponse方法
      if (this.$refs.currentComp && typeof this.$refs.currentComp.getResponse === 'function') { //如果存在对应子组件且存在类型是函数的geResponse方法
        // 调用子组件的getResponse方法
        this.$refs.currentComp.getResponse(); //执行对应组件里的getResponse方法
      } else {
        console.error("The current component does not have a getResponse method or is not yet loaded.");
      }      
    }
  },
}
</script>


<style>
@import './index.css';
</style>
