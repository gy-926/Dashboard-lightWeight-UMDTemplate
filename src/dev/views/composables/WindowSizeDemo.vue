<template>
  <div class="mx-auto">
    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">
      <i class="fas fa-desktop mr-2 text-indigo-500"></i>
      窗口尺寸监听示例
    </h3>
    
    <div class="space-y-4 mb-6">
      <div class="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
        <div class="flex items-center">
          <i class="fas fa-arrows-alt-h text-blue-500 mr-2"></i>
          <span class="text-gray-700 font-medium">窗口宽度:</span>
        </div>
        <span class="text-xl font-bold text-blue-600">{{ width }}px</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
        <div class="flex items-center">
          <i class="fas fa-arrows-alt-v text-green-500 mr-2"></i>
          <span class="text-gray-700 font-medium">窗口高度:</span>
        </div>
        <span class="text-xl font-bold text-green-600">{{ height }}px</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
        <div class="flex items-center">
          <i class="fas fa-mobile-alt text-purple-500 mr-2"></i>
          <span class="text-gray-700 font-medium">屏幕类型:</span>
        </div>
        <span class="text-lg font-bold text-purple-600 flex items-center">
          <i :class="screenIcon" class="mr-1"></i>
          {{ screenType }}
        </span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
        <div class="flex items-center">
          <i class="fas fa-expand-arrows-alt text-orange-500 mr-2"></i>
          <span class="text-gray-700 font-medium">屏幕比例:</span>
        </div>
        <span class="text-lg font-bold text-orange-600">{{ aspectRatio }}</span>
      </div>
    </div>
    
    <!-- 响应式断点指示器 -->
    <div class="mb-6">
      <h4 class="text-sm font-medium text-gray-700 mb-3">响应式断点:</h4>
      <div class="grid grid-cols-5 gap-1">
        <div 
          v-for="breakpoint in breakpoints" 
          :key="breakpoint.name"
          :class="[
            'text-center py-2 px-1 rounded text-xs font-medium transition-all duration-200',
            breakpoint.active 
              ? 'bg-indigo-500 text-white shadow-md' 
              : 'bg-gray-100 text-gray-500'
          ]"
        >
          {{ breakpoint.name }}
        </div>
      </div>
    </div>
    
    <!-- 实时信息显示 -->
    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-gray-600">
          <i class="fas fa-info-circle mr-1"></i>
          实时信息
        </span>
        <span :class="[
          'px-2 py-1 rounded-full text-xs font-medium',
          isLargeScreen ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        ]">
          {{ isLargeScreen ? '大屏幕模式' : '小屏幕模式' }}
        </span>
      </div>
      
      <div class="text-sm text-gray-600 space-y-1">
        <p>💡 调整浏览器窗口大小来查看实时变化</p>
        <p>📱 当前适合: {{ deviceType }}</p>
        <p>🎯 像素密度: {{ pixelDensity }}</p>
      </div>
    </div>
    
    <!-- 动态网格演示 -->
    <div class="mt-6">
      <h4 class="text-sm font-medium text-gray-700 mb-3">动态网格演示:</h4>
      <div :class="gridClasses">
        <div 
          v-for="i in 6" 
          :key="i" 
          class="bg-gradient-to-br from-indigo-100 to-purple-100 p-3 rounded-lg text-center border border-indigo-200"
        >
          <div class="text-lg font-bold text-indigo-600">{{ i }}</div>
          <div class="text-xs text-gray-600">{{ screenSize }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWindowSize } from '@/dev/composables/useWindowSize'

// 使用窗口尺寸组合式函数
const { width, height } = useWindowSize()

// 计算屏幕类型
const screenType = computed(() => {
  if (width.value >= 1280) return 'XL (≥1280px)'
  if (width.value >= 1024) return 'LG (≥1024px)'
  if (width.value >= 768) return 'MD (≥768px)'
  if (width.value >= 640) return 'SM (≥640px)'
  return 'XS (<640px)'
})

// 屏幕尺寸简称
const screenSize = computed(() => {
  if (width.value >= 1280) return 'XL'
  if (width.value >= 1024) return 'LG'
  if (width.value >= 768) return 'MD'
  if (width.value >= 640) return 'SM'
  return 'XS'
})

// 屏幕图标
const screenIcon = computed(() => {
  if (width.value >= 1280) return 'fas fa-tv'
  if (width.value >= 1024) return 'fas fa-laptop'
  if (width.value >= 768) return 'fas fa-tablet-alt'
  return 'fas fa-mobile-alt'
})

// 判断是否为大屏幕
const isLargeScreen = computed(() => width.value >= 1024)

// 屏幕比例
const aspectRatio = computed(() => {
  const ratio = (width.value / height.value).toFixed(2)
  return `${ratio}:1`
})

// 设备类型
const deviceType = computed(() => {
  if (width.value >= 1280) return '桌面显示器'
  if (width.value >= 1024) return '笔记本电脑'
  if (width.value >= 768) return '平板设备'
  return '手机设备'
})

// 像素密度描述
const pixelDensity = computed(() => {
  const totalPixels = width.value * height.value
  if (totalPixels >= 2073600) return '高清 (≥2M像素)'
  if (totalPixels >= 921600) return '标清 (≥0.9M像素)'
  return '低清 (<0.9M像素)'
})

// 响应式断点
const breakpoints = computed(() => [
  { name: 'XS', active: width.value < 640 },
  { name: 'SM', active: width.value >= 640 && width.value < 768 },
  { name: 'MD', active: width.value >= 768 && width.value < 1024 },
  { name: 'LG', active: width.value >= 1024 && width.value < 1280 },
  { name: 'XL', active: width.value >= 1280 }
])

// 动态网格类名
const gridClasses = computed(() => {
  const base = 'grid gap-2'
  if (width.value >= 1280) return `${base} grid-cols-6`
  if (width.value >= 1024) return `${base} grid-cols-4`
  if (width.value >= 768) return `${base} grid-cols-3`
  if (width.value >= 640) return `${base} grid-cols-2`
  return `${base} grid-cols-1`
})
</script>