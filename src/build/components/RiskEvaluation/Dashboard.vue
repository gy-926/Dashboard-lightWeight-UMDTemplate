<template>
  <div class="space-y-6">
    <!-- 风险统计卡片 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
          <i class="fas fa-chart-pie text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">风险统计概览</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-5 gap-5 mb-6">
        <!-- 灾难性风险 -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-700 p-5 text-white shadow-lg">
          <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <h3 class="text-sm font-medium opacity-90 mb-2">灾难性风险</h3>
          <div class="text-4xl font-extrabold mb-2">{{ stats.disaster }}</div>
          <div class="flex items-center gap-1 text-xs opacity-80">
            <i class="fas fa-skull-crossbones"></i>
            <span>I级风险</span>
          </div>
        </div>

        <!-- 重大风险 -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 p-5 text-white shadow-lg">
          <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <h3 class="text-sm font-medium opacity-90 mb-2">重大风险</h3>
          <div class="text-4xl font-extrabold mb-2">{{ stats.major }}</div>
          <div class="flex items-center gap-1 text-xs opacity-80">
            <i class="fas fa-exclamation-triangle"></i>
            <span>II级风险</span>
          </div>
        </div>

        <!-- 高风险 -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 p-5 text-white shadow-lg">
          <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <h3 class="text-sm font-medium opacity-90 mb-2">高风险</h3>
          <div class="text-4xl font-extrabold mb-2">{{ stats.high }}</div>
          <div class="flex items-center gap-1 text-xs opacity-80">
            <i class="fas fa-exclamation-circle"></i>
            <span>III级风险</span>
          </div>
        </div>

        <!-- 中等风险 -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 p-5 text-white shadow-lg">
          <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <h3 class="text-sm font-medium opacity-90 mb-2">中等风险</h3>
          <div class="text-4xl font-extrabold mb-2">{{ stats.medium }}</div>
          <div class="flex items-center gap-1 text-xs opacity-80">
            <i class="fas fa-info-circle"></i>
            <span>IV级风险</span>
          </div>
        </div>

        <!-- 低风险 -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 p-5 text-white shadow-lg">
          <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <h3 class="text-sm font-medium opacity-90 mb-2">低风险</h3>
          <div class="text-4xl font-extrabold mb-2">{{ stats.low }}</div>
          <div class="flex items-center gap-1 text-xs opacity-80">
            <i class="fas fa-check-circle"></i>
            <span>V级风险</span>
          </div>
        </div>
      </div>

      <!-- 平均IWRPN -->
      <div class="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-5 text-white">
        <div class="flex items-center justify-center gap-4">
          <div class="text-3xl font-extrabold">{{ avgIwrpn }}</div>
          <div class="text-lg font-medium">平均IWRPN</div>
          <div class="px-3 py-1 bg-white/20 rounded-full text-sm">基于IWRPN模型</div>
        </div>
      </div>
    </section>

    <!-- 待办任务 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md">
          <i class="fas fa-tasks text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">待办任务</h2>
      </div>

      <div class="space-y-4">
        <div v-for="(task, index) in todoItems" :key="index" class="flex items-center gap-4 p-4 bg-slate-50/80 rounded-xl border border-slate-100 hover:bg-slate-100/80 transition-colors">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="task.iconBgClass">
            <i :class="task.icon" class="text-white text-lg"></i>
          </div>
          <div class="flex-1">
            <div class="font-semibold text-slate-700 mb-1">{{ task.title }}</div>
            <div class="text-sm text-slate-500">{{ task.description }}</div>
          </div>
          <button :class="task.btnClass" class="px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center gap-2">
            <i :class="task.btnIcon"></i>
            {{ task.btnText }}
          </button>
        </div>
      </div>
    </section>

    <!-- 风险趋势 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-md">
          <i class="fas fa-chart-line text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">风险趋势（最近7天）</h2>
      </div>

      <div class="bg-slate-50/80 rounded-2xl border border-slate-100 p-8 h-64 flex items-center justify-center">
        <div class="text-center">
          <i class="fas fa-chart-area text-5xl text-slate-300 mb-4"></i>
          <p class="text-slate-500 font-medium">风险趋势图表将在此显示</p>
          <p class="text-sm text-slate-400 mt-2">
            灾难性风险: 下降12% | 重大风险: 上升5% | 高风险: 基本持平
          </p>
        </div>
      </div>
    </section>

    <!-- 高风险要素TOP5 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center shadow-md">
          <i class="fas fa-list-ol text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">高风险要素TOP5（基于IWRPN）</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">风险要素</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">所属阶段</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">平均IWRPN</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">出现次数</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">风险等级</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in topRisks" :key="index" class="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
              <td class="py-3 px-4 font-medium text-slate-700">{{ item.name }}</td>
              <td class="py-3 px-4 text-slate-600">{{ item.phase }}</td>
              <td class="py-3 px-4 font-semibold text-slate-700">{{ item.iwrpn }}</td>
              <td class="py-3 px-4 text-slate-600">{{ item.count }}次</td>
              <td class="py-3 px-4">
                <span :class="item.riskTagClass">{{ item.riskLevel }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 快速操作 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-md">
          <i class="fas fa-bolt text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">快速操作</h2>
      </div>

      <div class="flex flex-wrap gap-4">
        <button class="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
          <i class="fas fa-plus-circle"></i>
          新建风险评估
        </button>
        <button class="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
          <i class="fas fa-file-import"></i>
          批量导入记录
        </button>
        <button class="px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
          <i class="fas fa-bell"></i>
          风险预警设置
        </button>
        <button class="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
          <i class="fas fa-chart-pie"></i>
          风险统计分析
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Manifest } from '@/build/types'

const manifest: Manifest = {
  name: 'RiskEvaluationDashboard',
  type: 'component',
  description: '风险评价系统概览仪表盘',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

// 统计数据
const stats = ref({
  disaster: 4,
  major: 9,
  high: 18,
  medium: 27,
  low: 52
})

const avgIwrpn = ref('156.8')

// 待办任务
const todoItems = ref([
  {
    title: '原始记录编号: LAB-2024-0089',
    description: '风险评估待完成，IWRPN计算阶段，截止时间：2024-04-10',
    icon: 'fas fa-file-signature',
    iconBgClass: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    btnClass: 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white',
    btnText: '继续评估',
    btnIcon: 'fas fa-arrow-right'
  },
  {
    title: '高风险项目审核',
    description: '7个高风险原始记录需要管理员审核确认',
    icon: 'fas fa-exclamation-triangle',
    iconBgClass: 'bg-gradient-to-br from-amber-400 to-orange-500',
    btnClass: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white',
    btnText: '去审核',
    btnIcon: 'fas fa-arrow-right'
  },
  {
    title: '季度风险趋势分析',
    description: '需要生成Q1季度原始记录风险趋势分析报告',
    icon: 'fas fa-chart-line',
    iconBgClass: 'bg-gradient-to-br from-purple-400 to-pink-500',
    btnClass: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white',
    btnText: '生成报告',
    btnIcon: 'fas fa-arrow-right'
  }
])

// TOP5高风险要素
const topRisks = ref([
  {
    name: '数据记录不完整',
    phase: '记录生成阶段',
    iwrpn: 245,
    count: 32,
    riskLevel: 'I级灾难性',
    riskTagClass: 'px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200'
  },
  {
    name: '关键信息缺失',
    phase: '记录生成阶段',
    iwrpn: 198,
    count: 28,
    riskLevel: 'II级重大',
    riskTagClass: 'px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200'
  },
  {
    name: '操作人员培训不足',
    phase: '记录生成阶段',
    iwrpn: 185,
    count: 24,
    riskLevel: 'II级重大',
    riskTagClass: 'px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200'
  },
  {
    name: '审核不及时',
    phase: '记录审核阶段',
    iwrpn: 156,
    count: 22,
    riskLevel: 'II级重大',
    riskTagClass: 'px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200'
  },
  {
    name: '设备校准超期',
    phase: '记录生成阶段',
    iwrpn: 142,
    count: 20,
    riskLevel: 'III级高风险',
    riskTagClass: 'px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200'
  }
])

defineExpose({ getManifest: () => manifest })
</script>
