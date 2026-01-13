<template>
  <div>
    <h2 class="text-lg font-bold text-md text-gray-600 dark:text-white">这里是Card的子组件</h2>
  </div>
</template>

<script setup lang="ts">
import { Manifest } from '@/build/types'

/**
 * 组件属性声明
 */
export interface Props {
  // 目前没有属性，但保留接口以备将来扩展
}

/**
 * 组件配置声明
 */
const manifest: Manifest = {
  name: 'KvcCardChild',
  type: 'component',
  description: '这是一个功能丰富的Vue卡片组件的子组件，包含评分、收藏、分享等交互功能。',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

/**
 * 组件暴露给父组件的方法和数据声明（按需暴露）
 */
defineExpose({
  // 获取组件配置声明（必要）
  getManifest: () => manifest
})
</script>
