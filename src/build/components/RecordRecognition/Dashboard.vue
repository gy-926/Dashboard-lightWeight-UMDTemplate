<template>
  <div class="space-y-6">
    <!-- 欢迎区域 -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/30">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold mb-2">欢迎使用纸质原始记录智能识别系统</h2>
          <p class="text-blue-100">基于AI技术的原始记录自动识别与风险评估平台</p>
        </div>
        <div class="hidden lg:block">
          <div class="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <i class="fas fa-microscope text-4xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- 总记录数 -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
            <i class="fas fa-file-alt text-white text-xl"></i>
          </div>
          <span class="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+12.5%</span>
        </div>
        <div class="text-3xl font-bold text-slate-800 mb-1">{{ stats.totalRecords }}</div>
        <div class="text-sm text-slate-500">总记录数</div>
      </div>

      <!-- 高风险 -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform duration-300">
            <i class="fas fa-exclamation-circle text-white text-xl"></i>
          </div>
          <span class="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded-lg">+3</span>
        </div>
        <div class="text-3xl font-bold text-red-600 mb-1">{{ stats.highRisk }}</div>
        <div class="text-sm text-slate-500">高风险记录</div>
      </div>

      <!-- 中风险 -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
            <i class="fas fa-exclamation-triangle text-white text-xl"></i>
          </div>
          <span class="text-sm font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">+5</span>
        </div>
        <div class="text-3xl font-bold text-amber-600 mb-1">{{ stats.mediumRisk }}</div>
        <div class="text-sm text-slate-500">中风险记录</div>
      </div>

      <!-- 低风险 -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
            <i class="fas fa-check-circle text-white text-xl"></i>
          </div>
          <span class="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+15</span>
        </div>
        <div class="text-3xl font-bold text-emerald-600 mb-1">{{ stats.lowRisk }}</div>
        <div class="text-sm text-slate-500">低风险记录</div>
      </div>
    </div>

    <!-- 快捷操作和系统状态 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 快捷操作 -->
      <div class="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md">
            <i class="fas fa-bolt text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-700">快捷操作</h3>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button class="p-4 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-200 hover:border-blue-200 transition-all duration-300 group text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
              <i class="fas fa-upload text-white text-xl"></i>
            </div>
            <div class="font-medium text-slate-700">上传记录</div>
            <div class="text-xs text-slate-500 mt-1">批量上传文件</div>
          </button>
          <button class="p-4 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 hover:border-emerald-200 transition-all duration-300 group text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
              <i class="fas fa-search text-white text-xl"></i>
            </div>
            <div class="font-medium text-slate-700">智能识别</div>
            <div class="text-xs text-slate-500 mt-1">AI自动提取</div>
          </button>
          <button class="p-4 bg-slate-50 hover:bg-purple-50 rounded-xl border border-slate-200 hover:border-purple-200 transition-all duration-300 group text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
              <i class="fas fa-chart-pie text-white text-xl"></i>
            </div>
            <div class="font-medium text-slate-700">风险分析</div>
            <div class="text-xs text-slate-500 mt-1">全面风险评估</div>
          </button>
          <button class="p-4 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 hover:border-amber-200 transition-all duration-300 group text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
              <i class="fas fa-download text-white text-xl"></i>
            </div>
            <div class="font-medium text-slate-700">导出报告</div>
            <div class="text-xs text-slate-500 mt-1">生成分析报告</div>
          </button>
        </div>
      </div>

      <!-- 系统状态 -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
            <i class="fas fa-heartbeat text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-700">系统状态</h3>
        </div>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <i class="fas fa-server text-blue-600 text-sm"></i>
              </div>
              <span class="text-sm text-slate-600">服务器状态</span>
            </div>
            <span class="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">正常运行</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <i class="fas fa-brain text-purple-600 text-sm"></i>
              </div>
              <span class="text-sm text-slate-600">AI识别引擎</span>
            </div>
            <span class="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">就绪</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <i class="fas fa-database text-amber-600 text-sm"></i>
              </div>
              <span class="text-sm text-slate-600">数据库连接</span>
            </div>
            <span class="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">已连接</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                <i class="fas fa-shield-alt text-rose-600 text-sm"></i>
              </div>
              <span class="text-sm text-slate-600">安全防护</span>
            </div>
            <span class="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">已启用</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近活动 -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-md">
            <i class="fas fa-history text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-700">最近活动</h3>
        </div>
        <button class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">查看全部</button>
      </div>
      <div class="space-y-3">
        <div v-for="(activity, index) in recentActivities" :key="index" class="flex items-center gap-4 p-3 bg-slate-50 hover:bg-blue-50 rounded-xl transition-all duration-300 cursor-pointer">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="activity.iconBgClass">
            <i :class="[activity.icon, 'text-white text-sm']"></i>
          </div>
          <div class="flex-1">
            <div class="font-medium text-slate-700">{{ activity.title }}</div>
            <div class="text-xs text-slate-500">{{ activity.description }}</div>
          </div>
          <div class="text-xs text-slate-400">{{ activity.time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Manifest } from '@/build/types'

const manifest: Manifest = {
  name: 'RecordRecognitionDashboard',
  type: 'component',
  description: '系统概览仪表盘组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const stats = ref({
  totalRecords: 192,
  highRisk: 12,
  mediumRisk: 24,
  lowRisk: 156
})

const recentActivities = ref([
  {
    title: '新记录识别完成',
    description: '检测记录_20240320.pdf 已完成智能识别',
    icon: 'fas fa-file-alt',
    iconBgClass: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    time: '10分钟前'
  },
  {
    title: '风险评估更新',
    description: '批量更新了 15 条记录的风险等级',
    icon: 'fas fa-exclamation-triangle',
    iconBgClass: 'bg-gradient-to-br from-amber-500 to-orange-600',
    time: '30分钟前'
  },
  {
    title: '模板导出成功',
    description: '导出 2024年3月风险评估报告',
    icon: 'fas fa-download',
    iconBgClass: 'bg-gradient-to-br from-emerald-500 to-green-600',
    time: '1小时前'
  },
  {
    title: '新用户注册',
    description: '实验室管理员 张三 已注册系统',
    icon: 'fas fa-user-plus',
    iconBgClass: 'bg-gradient-to-br from-purple-500 to-pink-600',
    time: '2小时前'
  }
])

defineExpose({ getManifest: () => manifest })
</script>
