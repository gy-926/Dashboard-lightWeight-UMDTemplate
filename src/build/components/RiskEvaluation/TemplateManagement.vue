<template>
  <div class="space-y-6">
    <!-- 模板统计 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
          <div class="text-2xl font-bold">{{ templateStats.total }}</div>
          <div class="text-sm opacity-80 mt-1">模板总数</div>
        </div>
        <div class="text-center p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl text-white">
          <div class="text-2xl font-bold">{{ templateStats.active }}</div>
          <div class="text-sm opacity-80 mt-1">启用模板</div>
        </div>
        <div class="text-center p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl text-white">
          <div class="text-2xl font-bold">{{ templateStats.draft }}</div>
          <div class="text-sm opacity-80 mt-1">草稿模板</div>
        </div>
        <div class="text-center p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
          <div class="text-2xl font-bold">{{ templateStats.used }}</div>
          <div class="text-sm opacity-80 mt-1">本月使用</div>
        </div>
      </div>
    </section>

    <!-- 模板列表 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-md">
            <i class="fas fa-file-alt text-white"></i>
          </div>
          <h2 class="text-lg font-bold text-slate-700">原始记录模板管理</h2>
        </div>
        <button class="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2">
          <i class="fas fa-plus"></i>
          新建模板
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="template in templates" :key="template.id" class="bg-slate-50/80 rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="template.iconBgClass">
              <i :class="template.icon" class="text-white"></i>
            </div>
            <span :class="template.statusClass">{{ template.status }}</span>
          </div>
          <h3 class="font-semibold text-slate-700 mb-1">{{ template.name }}</h3>
          <p class="text-sm text-slate-500 mb-3">{{ template.description }}</p>
          <div class="flex items-center justify-between text-xs text-slate-400">
            <span><i class="fas fa-calendar mr-1"></i>{{ template.updated }}</span>
            <span><i class="fas fa-chart-bar mr-1"></i>使用{{ template.usageCount }}次</span>
          </div>
          <div class="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200">
            <button class="flex-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors">
              <i class="fas fa-edit mr-1"></i>编辑
            </button>
            <button class="flex-1 px-3 py-1.5 bg-slate-500 hover:bg-slate-600 text-white text-xs font-medium rounded-lg transition-colors">
              <i class="fas fa-copy mr-1"></i>复制
            </button>
            <button class="px-3 py-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <i class="fas fa-trash"></i>
            </button>
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
  name: 'RiskEvaluationTemplateManagement',
  type: 'component',
  description: '原始记录模板管理组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const templateStats = ref({
  total: 15,
  active: 12,
  draft: 2,
  used: 45
})

const templates = ref([
  {
    id: 1,
    name: '实验室检测原始记录模板',
    description: '适用于实验室常规检测记录的标准化模板',
    updated: '2024-03-20',
    usageCount: 89,
    status: '已启用',
    statusClass: 'px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200',
    icon: 'fas fa-flask',
    iconBgClass: 'bg-gradient-to-br from-blue-400 to-indigo-500'
  },
  {
    id: 2,
    name: '仪器校准记录模板',
    description: '用于检测设备校准记录的标准化模板',
    updated: '2024-03-18',
    usageCount: 45,
    status: '已启用',
    statusClass: 'px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200',
    icon: 'fas fa-tools',
    iconBgClass: 'bg-gradient-to-br from-purple-400 to-pink-500'
  },
  {
    id: 3,
    name: '样品接收记录模板',
    description: '用于样品接收和登记的标准化模板',
    updated: '2024-03-15',
    usageCount: 67,
    status: '已启用',
    statusClass: 'px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200',
    icon: 'fas fa-vial',
    iconBgClass: 'bg-gradient-to-br from-amber-400 to-orange-500'
  },
  {
    id: 4,
    name: '环境监测记录模板',
    description: '用于实验室环境条件监控的记录模板',
    updated: '2024-03-10',
    usageCount: 34,
    status: '草稿',
    statusClass: 'px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200',
    icon: 'fas fa-temperature-high',
    iconBgClass: 'bg-gradient-to-br from-teal-400 to-cyan-500'
  },
  {
    id: 5,
    name: '质量控制记录模板',
    description: '用于质量控制活动的记录模板',
    updated: '2024-03-05',
    usageCount: 23,
    status: '已启用',
    statusClass: 'px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200',
    icon: 'fas fa-check-circle',
    iconBgClass: 'bg-gradient-to-br from-emerald-400 to-teal-500'
  },
  {
    id: 6,
    name: '偏差处理记录模板',
    description: '用于记录和跟踪偏差处理的标准化模板',
    updated: '2024-03-01',
    usageCount: 18,
    status: '已停用',
    statusClass: 'px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200',
    icon: 'fas fa-exclamation-triangle',
    iconBgClass: 'bg-gradient-to-br from-red-400 to-orange-500'
  }
])

defineExpose({ getManifest: () => manifest })
</script>
