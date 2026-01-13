<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
    <div class="container mx-auto">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          <i class="fas fa-puzzle-piece mr-3 text-indigo-500"></i>
          Vue 3 组合式函数展示
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        </p>
      </div>

      <!-- 组件网格布局 -->
      <div :class="layoutClasses" class="gap-8">
        <!-- 计数器组件 -->
        <div class="bg-white rounded-md p-6 border border-gray-200 transition-shadow duration-300">
          <CounterDemo />
        </div>

        <!-- 窗口尺寸监听组件 -->
        <div class="bg-white rounded-md p-6 border border-gray-200 transition-shadow duration-300">
          <WindowSizeDemo />
        </div>

        <!-- 组合使用示例 -->
        <div class="bg-white rounded-md p-6 border border-gray-200 transition-shadow duration-300">
          <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">
            <i class="fas fa-layer-group mr-2 text-emerald-500"></i>
            组合使用示例
          </h3>

          <div class="space-y-4">
            <!-- 响应式计数器 -->
            <div class="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
              <h4 class="font-semibold text-gray-700 mb-2">
                <i class="fas fa-sync-alt mr-1 text-emerald-500"></i>
                响应式计数器
              </h4>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">
                  计数: {{ combinedCount }} ({{ screenSize }} 屏幕)
                </span>
                <div class="flex gap-2">
                  <button @click="combinedIncrement"
                    class="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded transition-colors">
                    <i class="fas fa-plus"></i>
                  </button>
                  <button @click="combinedReset"
                    class="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded transition-colors">
                    <i class="fas fa-undo"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- 屏幕适配信息 -->
            <div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h4 class="font-semibold text-gray-700 mb-2">
                <i class="fas fa-mobile-alt mr-1 text-blue-500"></i>
                屏幕适配信息
              </h4>
              <div class="text-sm text-gray-600 space-y-1">
                <p>当前尺寸: {{ width }} × {{ height }}</p>
                <p>设备类型: {{ deviceType }}</p>
                <p>布局模式: {{ isLargeScreen ? '桌面布局' : '移动布局' }}</p>
              </div>
            </div>

            <!-- 实时状态 -->
            <div class="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <h4 class="font-semibold text-gray-700 mb-2">
                <i class="fas fa-chart-line mr-1 text-purple-500"></i>
                实时状态
              </h4>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="text-gray-600">
                  <span class="font-medium">计数状态:</span>
                  <span :class="isEven ? 'text-green-600' : 'text-orange-600'" class="ml-1">
                    {{ isEven ? '偶数' : '奇数' }}
                  </span>
                </div>
                <div class="text-gray-600">
                  <span class="font-medium">屏幕状态:</span>
                  <span :class="isLargeScreen ? 'text-blue-600' : 'text-yellow-600'" class="ml-1">
                    {{ isLargeScreen ? '大屏' : '小屏' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 功能特性说明 -->
      <div class="mt-12 bg-white rounded-md p-8 border border-gray-200">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
          <i class="fas fa-star mr-2 text-yellow-500"></i>
          组合式函数特性
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg">
            <i class="fas fa-recycle text-3xl text-blue-500 mb-3"></i>
            <h3 class="font-semibold text-gray-800 mb-2">可复用性</h3>
            <p class="text-sm text-gray-600">逻辑封装，多组件共享</p>
          </div>

          <div class="text-center p-4 bg-gradient-to-b from-green-50 to-green-100 rounded-lg">
            <i class="fas fa-bolt text-3xl text-green-500 mb-3"></i>
            <h3 class="font-semibold text-gray-800 mb-2">响应式</h3>
            <p class="text-sm text-gray-600">自动追踪依赖变化</p>
          </div>

          <div class="text-center p-4 bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg">
            <i class="fas fa-code text-3xl text-purple-500 mb-3"></i>
            <h3 class="font-semibold text-gray-800 mb-2">类型安全</h3>
            <p class="text-sm text-gray-600">完整的 TypeScript 支持</p>
          </div>

          <div class="text-center p-4 bg-gradient-to-b from-orange-50 to-orange-100 rounded-lg">
            <i class="fas fa-puzzle-piece text-3xl text-orange-500 mb-3"></i>
            <h3 class="font-semibold text-gray-800 mb-2">组合性</h3>
            <p class="text-sm text-gray-600">灵活组合多个功能</p>
          </div>
        </div>
      </div>

      <!-- 页脚信息 -->
      <div class="mt-8 text-center text-gray-500 text-sm">
        <p>
          <i class="fas fa-info-circle mr-1"></i>
          这些示例展示了 Vue 3 Composition API 的强大功能和灵活性
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCounter, useWindowSize } from '@/dev/composables'
import CounterDemo from './CounterDemo.vue'
import WindowSizeDemo from './WindowSizeDemo.vue'

// 使用计数器组合式函数
const {
  count: combinedCount,
  isEven,
  increment: combinedIncrement,
  reset: combinedReset
} = useCounter(0)

// 使用窗口尺寸组合式函数
const { width, height } = useWindowSize()

// 计算屏幕尺寸类型
const screenSize = computed(() => {
  if (width.value >= 1280) return 'XL'
  if (width.value >= 1024) return 'LG'
  if (width.value >= 768) return 'MD'
  if (width.value >= 640) return 'SM'
  return 'XS'
})

// 判断是否为大屏幕
const isLargeScreen = computed(() => width.value >= 1024)

// 设备类型
const deviceType = computed(() => {
  if (width.value >= 1280) return '桌面显示器'
  if (width.value >= 1024) return '笔记本电脑'
  if (width.value >= 768) return '平板设备'
  return '手机设备'
})

// 动态布局类名
const layoutClasses = computed(() => {
  if (width.value >= 1280) return 'grid grid-cols-3'
  if (width.value >= 1024) return 'grid grid-cols-2'
  return 'grid grid-cols-1'
})
</script>