<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between">
      <!-- <div>
        <h2 class="text-2xl font-bold text-slate-800">风险分析</h2>
        <p class="text-slate-500 mt-1">基于IWRPN量化模型的风险评估与可视化分析</p>
      </div> -->
      <div class="flex items-center gap-3">
        <select v-model="timeRange" class="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
          <option value="week">最近一周</option>
          <option value="month">最近一月</option>
          <option value="quarter">最近三月</option>
          <option value="year">最近一年</option>
        </select>
        <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2">
          <i class="fas fa-download"></i>
          导出报告
        </button>
      </div>
    </div>

    <!-- 风险统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/30">
            <i class="fas fa-exclamation-circle text-white text-2xl"></i>
          </div>
          <div>
            <div class="text-3xl font-bold text-slate-800">{{ riskStats.highRisk }}</div>
            <div class="text-sm text-slate-500">高风险记录</div>
            <div class="text-xs text-red-600 mt-1">需立即处理</div>
          </div>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <i class="fas fa-exclamation-triangle text-white text-2xl"></i>
          </div>
          <div>
            <div class="text-3xl font-bold text-slate-800">{{ riskStats.mediumRisk }}</div>
            <div class="text-sm text-slate-500">中风险记录</div>
            <div class="text-xs text-amber-600 mt-1">需重点关注</div>
          </div>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <i class="fas fa-check-circle text-white text-2xl"></i>
          </div>
          <div>
            <div class="text-3xl font-bold text-slate-800">{{ riskStats.lowRisk }}</div>
            <div class="text-sm text-slate-500">低风险记录</div>
            <div class="text-xs text-emerald-600 mt-1">状态正常</div>
          </div>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <i class="fas fa-chart-line text-white text-2xl"></i>
          </div>
          <div>
            <div class="text-3xl font-bold text-slate-800">{{ riskStats.avgScore }}</div>
            <div class="text-sm text-slate-500">平均风险分</div>
            <div class="text-xs text-blue-600 mt-1">IWRPN评分</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 风险等级分布饼图 -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-md">
            <i class="fas fa-chart-pie text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-700">风险等级分布</h3>
        </div>
        <div class="h-72 flex items-center justify-center bg-slate-50 rounded-xl">
          <div class="text-center text-slate-500">
            <i class="fas fa-chart-pie text-6xl mb-4 text-slate-300"></i>
            <p class="text-sm">风险等级分布图表</p>
            <p class="text-xs text-slate-400 mt-1">Chart.js 饼图渲染区域</p>
          </div>
        </div>
        <div class="flex items-center justify-center gap-6 mt-4">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <span class="text-sm text-slate-600">高风险 {{ riskStats.highRisk }}条</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-amber-500"></div>
            <span class="text-sm text-slate-600">中风险 {{ riskStats.mediumRisk }}条</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span class="text-sm text-slate-600">低风险 {{ riskStats.lowRisk }}条</span>
          </div>
        </div>
      </div>

      <!-- 风险趋势折线图 -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md">
            <i class="fas fa-chart-line text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-700">风险趋势</h3>
        </div>
        <div class="h-72 flex items-center justify-center bg-slate-50 rounded-xl">
          <div class="text-center text-slate-500">
            <i class="fas fa-wave-square text-6xl mb-4 text-slate-300"></i>
            <p class="text-sm">风险趋势变化图表</p>
            <p class="text-xs text-slate-400 mt-1">Chart.js 折线图渲染区域</p>
          </div>
        </div>
        <div class="flex items-center justify-center gap-6 mt-4">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <span class="text-sm text-slate-600">高风险</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-amber-500"></div>
            <span class="text-sm text-slate-600">中风险</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 风险详情表格 -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
            <i class="fas fa-list-alt text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-700">风险详情</h3>
        </div>
        <div class="flex items-center gap-3">
          <select v-model="riskFilter" class="px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
            <option value="all">全部风险</option>
            <option value="high">高风险</option>
            <option value="medium">中风险</option>
            <option value="low">低风险</option>
          </select>
          <input
            type="text"
            placeholder="搜索记录..."
            class="px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-64"
          >
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="text-left py-3 px-4 font-semibold text-slate-600 bg-slate-50 rounded-tl-lg">记录编号</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 bg-slate-50">记录名称</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 bg-slate-50">风险等级</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 bg-slate-50">RPN评分</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 bg-slate-50">IW权重</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 bg-slate-50">IWRPN总分</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 bg-slate-50">主要风险项</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 bg-slate-50 rounded-tr-lg">检测日期</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredRiskList" :key="item.id" class="border-b border-slate-100 hover:bg-blue-50/50 transition-colors">
              <td class="py-3 px-4 font-medium text-blue-600">{{ item.recordNo }}</td>
              <td class="py-3 px-4 text-slate-700">{{ item.recordName }}</td>
              <td class="py-3 px-4">
                <span
                  class="px-3 py-1 rounded-full text-sm font-medium"
                  :class="{
                    'bg-red-100 text-red-700': item.riskLevel === '高风险',
                    'bg-amber-100 text-amber-700': item.riskLevel === '中风险',
                    'bg-emerald-100 text-emerald-700': item.riskLevel === '低风险'
                  }"
                >
                  {{ item.riskLevel }}
                </span>
              </td>
              <td class="py-3 px-4 text-slate-700">{{ item.rpnScore }}</td>
              <td class="py-3 px-4 text-slate-700">{{ item.iwWeight }}</td>
              <td class="py-3 px-4 font-bold" :class="{
                'text-red-600': item.iwrpnScore >= 200,
                'text-amber-600': item.iwrpnScore >= 100 && item.iwrpnScore < 200,
                'text-emerald-600': item.iwrpnScore < 100
              }">{{ item.iwrpnScore }}</td>
              <td class="py-3 px-4 text-slate-600">{{ item.mainRisk }}</td>
              <td class="py-3 px-4 text-slate-500">{{ item.detectionDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div class="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
        <div class="text-sm text-slate-500">共 {{ riskList.length }} 条记录</div>
        <div class="flex items-center gap-2">
          <button class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors">
            <i class="fas fa-angle-left"></i>
          </button>
          <button class="px-3 py-1.5 bg-blue-500 text-white rounded-lg">1</button>
          <button class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors">2</button>
          <button class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors">3</button>
          <button class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors">
            <i class="fas fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Manifest } from '@/build/types'

const manifest: Manifest = {
  name: 'RecordRecognitionAnalysis',
  type: 'component',
  description: '风险分析组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const timeRange = ref('month')
const riskFilter = ref('all')

const riskStats = ref({
  highRisk: 12,
  mediumRisk: 24,
  lowRisk: 156,
  avgScore: 85
})

interface RiskItem {
  id: number
  recordNo: string
  recordName: string
  riskLevel: string
  rpnScore: number
  iwWeight: number
  iwrpnScore: number
  mainRisk: string
  detectionDate: string
}

const riskList = ref<RiskItem[]>([
  { id: 1, recordNo: 'JL-2024-0320-001', recordName: '阿司匹林含量测定记录', riskLevel: '高风险', rpnScore: 64, iwWeight: 4, iwrpnScore: 256, mainRisk: '含量超出限度', detectionDate: '2024-03-20' },
  { id: 2, recordNo: 'JL-2024-0320-002', recordName: '维生素C含量测定记录', riskLevel: '高风险', rpnScore: 48, iwWeight: 4, iwrpnScore: 192, mainRisk: 'RSD超限', detectionDate: '2024-03-20' },
  { id: 3, recordNo: 'JL-2024-0319-001', recordName: '对乙酰氨基酚含量测定记录', riskLevel: '中风险', rpnScore: 36, iwWeight: 3, iwrpnScore: 108, mainRisk: '分离度不足', detectionDate: '2024-03-19' },
  { id: 4, recordNo: 'JL-2024-0319-002', recordName: '布洛芬含量测定记录', riskLevel: '中风险', rpnScore: 32, iwWeight: 3, iwrpnScore: 96, mainRisk: '对照品稳定性', detectionDate: '2024-03-19' },
  { id: 5, recordNo: 'JL-2024-0318-001', recordName: '阿莫西林含量测定记录', riskLevel: '中风险', rpnScore: 28, iwWeight: 3, iwrpnScore: 84, mainRisk: '供试品溶液', detectionDate: '2024-03-18' },
  { id: 6, recordNo: 'JL-2024-0318-002', recordName: '头孢克肟含量测定记录', riskLevel: '低风险', rpnScore: 16, iwWeight: 2, iwrpnScore: 32, mainRisk: '微量偏差', detectionDate: '2024-03-18' },
  { id: 7, recordNo: 'JL-2024-0317-001', recordName: '克拉霉素含量测定记录', riskLevel: '低风险', rpnScore: 12, iwWeight: 2, iwrpnScore: 24, mainRisk: '记录完整性', detectionDate: '2024-03-17' },
  { id: 8, recordNo: 'JL-2024-0317-002', recordName: '罗红霉素含量测定记录', riskLevel: '低风险', rpnScore: 10, iwWeight: 2, iwrpnScore: 20, mainRisk: '格式规范性', detectionDate: '2024-03-17' }
])

const filteredRiskList = computed(() => {
  if (riskFilter.value === 'all') return riskList.value
  const levelMap: Record<string, string> = {
    high: '高风险',
    medium: '中风险',
    low: '低风险'
  }
  return riskList.value.filter(item => item.riskLevel === levelMap[riskFilter.value])
})

defineExpose({ getManifest: () => manifest })
</script>
