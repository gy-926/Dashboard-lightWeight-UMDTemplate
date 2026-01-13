<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div class="container mx-auto px-4">

            <!-- 主题切换按钮 -->
            <div class="text-center mb-8">
                <button @click="toggleDarkMode"
                    class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
                    <i class="fas fa-moon mr-2"></i>
                    切换深色模式
                </button>
            </div>

            <!-- 组件展示区域 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- KvcCard 组件示例 -->
                <div class="space-y-4">
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-white text-center">
                        <i class="fas fa-id-card mr-2"></i>
                        KvcCard 组件
                    </h2>
                    <KvcCard :title="cardData.title" :description="cardData.description" :author="cardData.author"
                        :tags="cardData.tags" :rating="cardData.rating" :is-favorite="cardData.isFavorite" />
                </div>

                <!-- 第二个卡片示例 -->
                <div class="space-y-4">
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-white text-center">
                        <i class="fas fa-star mr-2"></i>
                        高评分示例
                    </h2>
                    <KvcCard title="优秀组件" description="这是一个高评分的组件示例，展示了组件在不同数据下的表现。" author="开发者"
                        :tags="['优秀', '推荐', '高质量']" :rating="5" :is-favorite="true" />
                </div>

                <!-- 第三个卡片示例 -->
                <div class="space-y-4">
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-white text-center">
                        <i class="fas fa-code mr-2"></i>
                        技术栈示例
                    </h2>
                    <KvcCard title="技术栈展示" description="展示现代前端技术栈的组件示例，包含多种技术标签。" author="前端团队"
                        :tags="['React', 'Vue', 'Angular', 'TypeScript', 'Vite']" :rating="4" :is-favorite="false" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { KvcCard } from '@/build/components'

// 示例数据
const cardData = reactive({
    title: 'Vue 组件示例',
    description: '这是一个演示用的 Vue 组件，展示了卡片的基本功能和样式。支持深色模式、评分、标签等功能。',
    author: 'Kivii Team',
    tags: ['Vue', 'Component', 'Demo', 'TypeScript'],
    rating: 4,
    isFavorite: false
})

// 切换深色模式
const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
}
</script>

<style scoped>
/* 组件特定样式可以在这里添加 */
</style>