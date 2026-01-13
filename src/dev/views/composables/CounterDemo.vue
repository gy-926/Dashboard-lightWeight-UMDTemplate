<template>
  <div class="mx-auto">
    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">
      <i class="fas fa-calculator mr-2 text-blue-500"></i>
      计数器示例
    </h3>

    <div class="space-y-4 mb-6">
      <div class="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
        <span class="text-gray-700 font-medium">当前计数:</span>
        <span class="text-2xl font-bold text-blue-600">{{ count }}</span>
      </div>

      <div class="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
        <span class="text-gray-700 font-medium">双倍计数:</span>
        <span class="text-xl font-bold text-green-600">{{ doubleCount }}</span>
      </div>

      <div class="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
        <span class="text-gray-700 font-medium">是否为偶数:</span>
        <span class="text-lg font-bold" :class="isEven ? 'text-purple-600' : 'text-orange-600'">
          <i :class="isEven ? 'fas fa-check-circle' : 'fas fa-times-circle'" class="mr-1"></i>
          {{ isEven ? '是' : '否' }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3 mb-6">
      <button @click="increment"
        class="flex items-center justify-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
        <i class="fas fa-plus mr-2"></i>
        +1
      </button>

      <button @click="decrement"
        class="flex items-center justify-center px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
        <i class="fas fa-minus mr-2"></i>
        -1
      </button>

      <button @click="reset"
        class="flex items-center justify-center px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
        <i class="fas fa-undo mr-2"></i>
        重置
      </button>

      <button @click="setCount(10)"
        class="flex items-center justify-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
        <i class="fas fa-arrow-right mr-2"></i>
        设为10
      </button>
    </div>

    <div class="space-y-3">
      <label class="block text-sm font-medium text-gray-700">自定义数值:</label>
      <div class="flex gap-2">
        <input type="number" v-model.number="inputValue" placeholder="输入数字"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
        <button @click="setCount(inputValue)"
          class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
          <i class="fas fa-check mr-1"></i>
          设置
        </button>
      </div>
    </div>

    <div class="mt-6 p-3 bg-gray-50 rounded-lg">
      <p class="text-xs text-gray-500 text-center">
        <i class="fas fa-info-circle mr-1"></i>
        这是一个使用 Vue 3 组合式函数的计数器示例
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCounter } from '@/dev/composables/useCounter'

// 使用计数器组合式函数，初始值为 0
const {
  count,
  doubleCount,
  isEven,
  increment,
  decrement,
  reset,
  setCount
} = useCounter(0)

// 输入框的值
const inputValue = ref(0)
</script>