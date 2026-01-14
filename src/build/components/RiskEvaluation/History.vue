<template>
  <div class="space-y-6">
    <!-- 搜索和筛选 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex flex-wrap gap-4 items-end">
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-semibold text-slate-600 mb-2">搜索关键词</label>
          <div class="relative">
            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              v-model="searchKeyword"
              placeholder="搜索原始记录编号或名称..."
              class="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all"
            >
          </div>
        </div>
        <div class="w-40">
          <label class="block text-sm font-semibold text-slate-600 mb-2">风险等级</label>
          <select v-model="filterRiskLevel" class="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40">
            <option value="">全部等级</option>
            <option value="disaster">灾难性</option>
            <option value="major">重大</option>
            <option value="high">高风险</option>
            <option value="medium">中等</option>
            <option value="low">低风险</option>
          </select>
        </div>
        <div class="w-40">
          <label class="block text-sm font-semibold text-slate-600 mb-2">时间范围</label>
          <select v-model="filterTimeRange" class="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40">
            <option value="">全部时间</option>
            <option value="today">今天</option>
            <option value="week">本周</option>
            <option value="month">本月</option>
            <option value="quarter">本季度</option>
          </select>
        </div>
        <button class="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2">
          <i class="fas fa-search"></i>
          搜索
        </button>
      </div>
    </section>

    <!-- 历史记录表格 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-md">
            <i class="fas fa-history text-white"></i>
          </div>
          <h2 class="text-lg font-bold text-slate-700">历史评价记录</h2>
        </div>
        <div class="flex items-center gap-2 text-sm text-slate-500">
          <span>共 {{ filteredRecords.length }} 条记录</span>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">原始记录编号</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">原始记录名称</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">评估时间</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">评估人</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">风险要素数</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">平均IWRPN</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">综合风险等级</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">状态</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in filteredRecords" :key="record.id" class="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
              <td class="py-3 px-4 text-sm font-medium text-slate-700">{{ record.code }}</td>
              <td class="py-3 px-4 text-sm text-slate-600">{{ record.name }}</td>
              <td class="py-3 px-4 text-sm text-slate-600">{{ record.evalTime }}</td>
              <td class="py-3 px-4 text-sm text-slate-600">{{ record.evaluator }}</td>
              <td class="py-3 px-4 text-sm text-slate-600">{{ record.riskCount }}</td>
              <td class="py-3 px-4 text-sm font-semibold text-slate-700">{{ record.avgIwrpn }}</td>
              <td class="py-3 px-4">
                <span :class="record.riskTagClass">{{ record.riskLevel }}</span>
              </td>
              <td class="py-3 px-4">
                <span :class="record.statusClass">{{ record.status }}</span>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center gap-1">
                  <button class="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="查看详情">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="导出报告">
                    <i class="fas fa-download"></i>
                  </button>
                  <button class="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="复制评估">
                    <i class="fas fa-copy"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div class="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
        <div class="text-sm text-slate-500">
          显示 {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, totalRecords) }} 条，共 {{ totalRecords }} 条
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <button
            v-for="page in displayedPages"
            :key="page"
            @click="currentPage = page"
            class="px-3 py-1.5 rounded-lg transition-colors"
            :class="currentPage === page
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
              : 'border border-slate-200 text-slate-600 hover:bg-slate-50'"
          >
            {{ page }}
          </button>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Manifest } from '@/build/types'

const manifest: Manifest = {
  name: 'RiskEvaluationHistory',
  type: 'component',
  description: '风险评价历史记录组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const searchKeyword = ref('')
const filterRiskLevel = ref('')
const filterTimeRange = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const records = ref([
  {
    id: 1,
    code: 'LAB-2024-0089',
    name: '实验室检测原始记录',
    evalTime: '2024-03-25 14:30',
    evaluator: '张三',
    riskCount: 5,
    avgIwrpn: 172.8,
    riskLevel: 'II级重大',
    riskTagClass: 'px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200',
    status: '已完成',
    statusClass: 'px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200'
  },
  {
    id: 2,
    code: 'LAB-2024-0088',
    name: '水质检测原始记录',
    evalTime: '2024-03-24 10:15',
    evaluator: '李四',
    riskCount: 3,
    avgIwrpn: 98.5,
    riskLevel: 'III级高风险',
    riskTagClass: 'px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200',
    status: '已完成',
    statusClass: 'px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200'
  },
  {
    id: 3,
    code: 'LAB-2024-0087',
    name: '土壤检测原始记录',
    evalTime: '2024-03-23 16:45',
    evaluator: '王五',
    riskCount: 4,
    avgIwrpn: 245.2,
    riskLevel: 'I级灾难性',
    riskTagClass: 'px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200',
    status: '待审核',
    statusClass: 'px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200'
  },
  {
    id: 4,
    code: 'LAB-2024-0086',
    name: '仪器校准记录',
    evalTime: '2024-03-22 09:00',
    evaluator: '张三',
    riskCount: 2,
    avgIwrpn: 65.3,
    riskLevel: 'IV级中等',
    riskTagClass: 'px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200',
    status: '已完成',
    statusClass: 'px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200'
  },
  {
    id: 5,
    code: 'LAB-2024-0085',
    name: '样品接收记录',
    evalTime: '2024-03-21 11:30',
    evaluator: '李四',
    riskCount: 6,
    avgIwrpn: 156.8,
    riskLevel: 'II级重大',
    riskTagClass: 'px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200',
    status: '已完成',
    statusClass: 'px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200'
  }
])

const filteredRecords = computed(() => {
  return records.value.filter(record => {
    const matchKeyword = !searchKeyword.value ||
      record.code.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      record.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
    const matchLevel = !filterRiskLevel.value ||
      record.riskLevel.toLowerCase().includes(filterRiskLevel.value.toLowerCase())
    return matchKeyword && matchLevel
  })
})

const totalRecords = computed(() => filteredRecords.value.length)
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value))

const displayedPages = computed(() => {
  const pages = []
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i)
  }
  return pages
})

defineExpose({ getManifest: () => manifest })
</script>
