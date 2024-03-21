// src/components/ModelSwitcher.vue

<template>
  <div>
    <select v-model="selectedModel" @change="onModelChange">
      <option value="openAI">OpenAI</option>
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
    onModelChange() {
      // 通知父组件选中的模型发生变化
      this.$emit('modelChanged', this.selectedModel);
    },
  },
};
</script>
