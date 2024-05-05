  module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: [
      'js',
      'json',
      'vue'
    ],// 处理的文件类型
    transform: {
      '.*\\.(vue)$': '@vue/vue3-jest',// 使用 vue3-jest 处理 .vue 文件
      '^.+\\.js$': 'babel-jest' // 使用 babel-jest 处理 .js 文件
    },
    moduleNameMapper: {  // 配置文件仿真
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(css|jpg|png)$': 'jest-transform-stub'// 将样式和图片等资源文件转化为一个空模块
    },
    testMatch: [ // 支持源代码中相同的 `import` 别名
      '**/src/tests/**/*.spec.js'
    ],
    testPathIgnorePatterns: ['/node_modules/'],
  };
  
  