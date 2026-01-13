<template>
  <div class="space-y-6">
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-md">
          <i class="fas fa-tachometer-alt text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">系统概览</h2>
      </div>

      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-lg">
          <div class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <h3 class="text-sm font-medium opacity-90 mb-2">今日归类数量</h3>
          <div class="text-4xl font-extrabold mb-2">{{ todayCount.toLocaleString() }}</div>
          <div class="flex items-center gap-1 text-sm">
            <i class="fas fa-arrow-up text-emerald-300"></i>
            <span>较昨日 +12%</span>
          </div>
        </div>

        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 p-6 text-white shadow-lg">
          <div class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <h3 class="text-sm font-medium opacity-90 mb-2">归类准确率</h3>
          <div class="text-4xl font-extrabold mb-2">{{ accuracy }}%</div>
          <div class="flex items-center gap-1 text-sm">
            <i class="fas fa-arrow-up text-amber-300"></i>
            <span>较上月 +2.3%</span>
          </div>
        </div>

        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 p-6 text-white shadow-lg">
          <div class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <h3 class="text-sm font-medium opacity-90 mb-2">知识库规模</h3>
          <div class="text-4xl font-extrabold mb-2">{{ knowledgeCount.toLocaleString() }}</div>
          <div class="flex items-center gap-1 text-sm">
            <i class="fas fa-database"></i>
            <span>条归类案例</span>
          </div>
        </div>
      </div>

      <!-- 图表区域 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <h3 class="text-base font-bold text-slate-700 mb-4">归类趋势（最近7天）</h3>
          <div class="bg-slate-50/80 rounded-2xl border border-slate-100 p-6 h-72 flex items-center justify-center">
            <div class="text-center text-slate-400">
              <i class="fas fa-chart-line text-5xl mb-4"></i>
              <p>归类趋势图表区域</p>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-base font-bold text-slate-700 mb-4">热门归类类别</h3>
          <div class="bg-slate-50/80 rounded-2xl border border-slate-100 p-5 space-y-4">
            <div v-for="category in topCategories" :key="category.name" class="flex items-center justify-between">
              <span class="text-sm text-slate-600">{{ category.name }}</span>
              <div class="flex items-center gap-2">
                <div class="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full" :style="{ width: category.percent + '%' }"></div>
                </div>
                <span class="text-sm font-bold text-slate-700 w-10 text-right">{{ category.percent }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 系统状态 -->
      <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="status in systemStatus" :key="status.label" class="flex items-center gap-3 bg-slate-50/80 rounded-xl p-4 border border-slate-100">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="status.bgClass">
            <i :class="status.icon" class="text-white"></i>
          </div>
          <div>
            <div class="text-xs text-slate-500">{{ status.label }}</div>
            <div class="font-bold text-slate-700">{{ status.value }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Manifest } from '@/build/types'

const manifest: Manifest = {
  name: 'Dashboard',
  type: 'component',
  description: '系统概览仪表盘组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const todayCount = ref(1247)
const accuracy = ref(94.2)
const knowledgeCount = ref(12458)

const topCategories = ref([
  { name: '第44章 - 木及木制品；木炭', percent: 45 },
  { name: '第85章 - 电机、电气设备', percent: 32 },
  { name: '第84章 - 机器设备', percent: 15 },
  { name: '其他类别', percent: 8 },
])

const systemStatus = ref([
  { label: 'API响应时间', value: '123ms', icon: 'fas fa-bolt', bgClass: 'bg-gradient-to-br from-amber-400 to-orange-500' },
  { label: '模型状态', value: '正常运行', icon: 'fas fa-brain', bgClass: 'bg-gradient-to-br from-emerald-400 to-green-500' },
  { label: '知识库同步', value: '已同步', icon: 'fas fa-sync', bgClass: 'bg-gradient-to-br from-blue-400 to-indigo-500' },
  { label: '系统负载', value: '28%', icon: 'fas fa-server', bgClass: 'bg-gradient-to-br from-teal-400 to-cyan-500' },
])

defineExpose({ getManifest: () => manifest })
</script>
