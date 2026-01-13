<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-md p-6 max-w-sm mx-auto transition-all duration-300 hover:shadow-md dark:hover:shadow-lg">
    <!-- 卡片头部 -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-bold text-gray-800 dark:text-white">{{ title }}</h3>
      <button @click="toggleFavorite" class="text-2xl transition-colors duration-200"
        :class="isFavorite ? 'text-red-500' : 'text-gray-400'">
        <i class="fas fa-heart"></i>
      </button>
    </div>

    <!-- 卡片内容 -->
    <div class="mb-4">
      <p class="text-gray-600 dark:text-gray-300 mb-3">{{ description }}</p>

      <!-- 标签 -->
      <div class="flex flex-wrap gap-2 mb-3">
        <span v-for="tag in tags" :key="tag"
          class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
          {{ tag }}
        </span>
      </div>

      <!-- 评分 -->
      <div class="flex items-center mb-3">
        <div class="flex text-yellow-400 mr-2">
          <i v-for="star in 5" :key="star" class="fas fa-star cursor-pointer transition-colors duration-200"
            :class="star <= rating ? 'text-yellow-400' : 'text-gray-300'" @click="setRating(star)"></i>
        </div>
        <span class="text-sm text-gray-600 dark:text-gray-400">{{ rating }}/5</span>
      </div>
    </div>

    <!-- 卡片底部 -->
    <div class="flex items-center justify-between">
      <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <i class="fas fa-user mr-1"></i>
        <span>{{ author }}</span>
      </div>
    </div>

    <!-- 点击计数器 -->
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 text-center">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <i class="fas fa-mouse-pointer mr-1"></i>
        点击次数: {{ clickCount }}
      </p>
    </div>

    <!-- 引入的Test组件 -->
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
      <KvcCardChild />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { KvcCardChild } from '@/build/components'
import { Manifest } from '@/build/types'

/**
 * 组件配置声明（必要）
 */
const manifest: Manifest = {
  name: 'KvcCard',
  type: 'component',
  description: '这是一个功能丰富的Vue卡片组件，包含评分、收藏、分享等交互功能。',
  version: '1.0.0',
  author: 'Vue开发者',
}

/**
 * 组件属性声明
 */
export interface Props {
  title?: string
  description?: string
  author?: string
  tags?: string[]
  initialRating?: number
}

/**
 * 组件默认属性值
 */
const props = withDefaults(defineProps<Props>(), {
  title: '演示卡片组件',
  description: '这是一个功能丰富的Vue卡片组件，包含评分、收藏、分享等交互功能。使用Tailwind CSS和FontAwesome图标。',
  author: 'info@mutaoinc.com',
  tags: () => ['Vue3', 'TypeScript', 'Tailwind'],
  initialRating: 4
})

/**
 * 组件事件声明
 */
const emit = defineEmits<{
  favorite: [isFavorite: boolean]
  share: [cardData: any]
  view: [cardData: any]
  ratingChange: [rating: number]
}>()

/**
 * 组件响应式数据声明
 */
const isFavorite = ref(false)
const rating = ref(props.initialRating)
const clickCount = ref(0)

// ================== 组件方法声明开始 ↓ =====================

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  clickCount.value++
  emit('favorite', isFavorite.value)
}

const setRating = (newRating: number) => {
  rating.value = newRating
  clickCount.value++
  emit('ratingChange', newRating)
}

// ================== 组件方法声明结束 ↑ =====================

/**
 * 组件暴露给父组件的方法和数据声明（按需暴露）
 */
defineExpose({
  toggleFavorite,
  setRating,
  callParentMethod: () => {
    clickCount.value++
    return {
      message: `子组件第${clickCount.value}次调用父组件方法`,
      timestamp: new Date().toLocaleTimeString()
    }
  },

  // 供父组件调用的方法
  childMethod: (message: string) => {
    const response = `子组件收到父组件消息: ${message}`
    console.log(response)
    return {
      response: response,
      timestamp: new Date().toLocaleTimeString()
    }
  },

  // 重置组件状态
  resetComponent: () => {
    isFavorite.value = false
    rating.value = props.initialRating
    clickCount.value = 0
    return {
      message: '组件状态已重置',
      timestamp: new Date().toLocaleTimeString()
    }
  },

  // 获取组件配置声明（必要）
  getManifest: () => manifest,

  // 直接暴露响应式数据，而不是计算属性
  rating,
  isFavorite,
  clickCount
})
</script>

<style scoped></style>