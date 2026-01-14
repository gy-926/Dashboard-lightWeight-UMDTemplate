<template>
  <div class="space-y-6">
    <!-- 步骤指示器 -->
    <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center justify-between relative">
        <div class="absolute top-5 left-0 right-0 h-1 bg-slate-200 -z-10"></div>
        <div class="absolute top-5 left-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 -z-10 transition-all" :style="{ width: stepProgress }"></div>

        <div v-for="(step, index) in steps" :key="step.id" class="flex flex-col items-center">
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
            :class="getStepClass(index)"
          >
            <i v-if="index < currentStep - 1" class="fas fa-check"></i>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <span class="text-xs mt-2 font-medium" :class="index <= currentStep - 1 ? 'text-slate-700' : 'text-slate-400'">{{ step.label }}</span>
        </div>
      </div>
    </div>

    <!-- 风险评价结果汇总 -->
    <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
          <i class="fas fa-clipboard-check text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">风险评价结果汇总</h2>
      </div>

      <!-- 统计概览 -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div class="text-center p-4 bg-red-50 rounded-xl border border-red-100">
          <div class="text-2xl font-bold text-red-600">{{ riskSummary.disaster }}</div>
          <div class="text-xs text-red-500 mt-1">灾难性风险</div>
        </div>
        <div class="text-center p-4 bg-rose-50 rounded-xl border border-rose-100">
          <div class="text-2xl font-bold text-rose-600">{{ riskSummary.major }}</div>
          <div class="text-xs text-rose-500 mt-1">重大风险</div>
        </div>
        <div class="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
          <div class="text-2xl font-bold text-orange-600">{{ riskSummary.high }}</div>
          <div class="text-xs text-orange-500 mt-1">高风险</div>
        </div>
        <div class="text-center p-4 bg-amber-50 rounded-xl border border-amber-100">
          <div class="text-2xl font-bold text-amber-600">{{ riskSummary.medium }}</div>
          <div class="text-xs text-amber-500 mt-1">中等风险</div>
        </div>
        <div class="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <div class="text-2xl font-bold text-emerald-600">{{ riskSummary.low }}</div>
          <div class="text-xs text-emerald-500 mt-1">低风险</div>
        </div>
      </div>

      <!-- 综合评价 -->
      <div class="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white mb-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm opacity-80 mb-1">综合风险等级</div>
            <div class="text-2xl font-bold">{{ overallRiskLevel }}</div>
          </div>
          <div class="text-right">
            <div class="text-sm opacity-80 mb-1">平均IWRPN</div>
            <div class="text-2xl font-bold">{{ avgIwrpn }}</div>
          </div>
          <div class="text-right">
            <div class="text-sm opacity-80 mb-1">最高IWRPN</div>
            <div class="text-2xl font-bold text-red-400">{{ maxIwrpn }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 风险等级分布饼图 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-md">
            <i class="fas fa-chart-pie text-white"></i>
          </div>
          <h2 class="text-lg font-bold text-slate-700">风险等级分布</h2>
        </div>
        <div class="h-64 flex items-center justify-center">
          <div class="relative w-48 h-48">
            <svg viewBox="0 0 100 100" class="transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" stroke-width="12" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#dc2626" stroke-width="12"
                :stroke-dasharray="getStrokeDash(1)" stroke-dashoffset="0" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e11d48" stroke-width="12"
                :stroke-dasharray="getStrokeDash(2)" :stroke-dashoffset="getOffset(1)" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" stroke-width="12"
                :stroke-dasharray="getStrokeDash(3)" :stroke-dashoffset="getOffset(2)" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" stroke-width="12"
                :stroke-dasharray="getStrokeDash(4)" :stroke-dashoffset="getOffset(3)" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" stroke-width="12"
                :stroke-dasharray="getStrokeDash(5)" :stroke-dashoffset="getOffset(4)" />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <div class="text-2xl font-bold text-slate-700">{{ totalRisks }}</div>
                <div class="text-xs text-slate-500">总计</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap justify-center gap-4 mt-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-red-500"></span>
            <span class="text-xs text-slate-600">灾难性 {{ riskSummary.disaster }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-rose-500"></span>
            <span class="text-xs text-slate-600">重大 {{ riskSummary.major }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-orange-500"></span>
            <span class="text-xs text-slate-600">高风险 {{ riskSummary.high }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-500"></span>
            <span class="text-xs text-slate-600">中等 {{ riskSummary.medium }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span class="text-xs text-slate-600">低风险 {{ riskSummary.low }}</span>
          </div>
        </div>
      </div>

      <!-- 风险阶段分布 -->
      <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-md">
            <i class="fas fa-sitemap text-white"></i>
          </div>
          <h2 class="text-lg font-bold text-slate-700">各阶段风险分布</h2>
        </div>
        <div class="space-y-4">
          <div v-for="phase in phaseDistribution" :key="phase.name">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-slate-700">{{ phase.name }}</span>
              <span class="text-sm text-slate-500">{{ phase.count }}项 ({{ phase.percent }}%)</span>
            </div>
            <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all" :style="{ width: phase.percent + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 风险详情表格 -->
    <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md">
          <i class="fas fa-list text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">风险详细清单</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">序号</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">风险要素</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">所属阶段</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">IWRPN</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">风险等级</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">控制建议</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(risk, index) in riskDetails" :key="risk.id" class="border-b border-slate-100 hover:bg-slate-50/50">
              <td class="py-3 px-4 text-sm font-medium text-slate-500">{{ index + 1 }}</td>
              <td class="py-3 px-4 text-sm font-medium text-slate-700">{{ risk.name }}</td>
              <td class="py-3 px-4 text-sm text-slate-600">{{ risk.phase }}</td>
              <td class="py-3 px-4 text-sm font-bold text-slate-700">{{ risk.iwrpn }}</td>
              <td class="py-3 px-4">
                <span :class="risk.tagClass">{{ risk.level }}</span>
              </td>
              <td class="py-3 px-4 text-sm text-slate-600">{{ risk.suggestion }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 控制措施建议 -->
    <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
          <i class="fas fa-lightbulb text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">风险控制建议</h2>
      </div>

      <div class="space-y-4">
        <div v-for="(suggestion, index) in controlSuggestions" :key="index" class="p-4 bg-slate-50/80 rounded-xl border border-slate-100">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" :class="suggestion.priorityClass">
              {{ index + 1 }}
            </div>
            <div class="flex-1">
              <div class="font-semibold text-slate-700 mb-1">{{ suggestion.title }}</div>
              <div class="text-sm text-slate-600">{{ suggestion.content }}</div>
              <div class="mt-2 flex items-center gap-4 text-xs text-slate-500">
                <span><i class="fas fa-layer-group mr-1"></i>优先级: {{ suggestion.priority }}</span>
                <span><i class="fas fa-clock mr-1"></i>预计周期: {{ suggestion.timeline }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 导航按钮 -->
    <div class="flex justify-between">
      <button
        @click="currentStep--"
        class="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all flex items-center gap-2"
      >
        <i class="fas fa-arrow-left"></i>
        上一步
      </button>

      <button
        @click="currentStep++"
        class="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
      >
        <i class="fas fa-check"></i>
        完成评价
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Manifest } from '@/build/types'

const manifest: Manifest = {
  name: 'RiskEval',
  type: 'component',
  description: '风险评价汇总组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const currentStep = ref(4)

const steps = [
  { id: 1, label: '原始记录导入' },
  { id: 2, label: '风险识别' },
  { id: 3, label: '风险分析' },
  { id: 4, label: '风险评价' },
  { id: 5, label: '完成评价' }
]

const stepProgress = computed(() => {
  return ((currentStep.value - 1) / (steps.length - 1)) * 100 + '%'
})

const getStepClass = (index: number) => {
  if (index < currentStep.value - 1) {
    return 'bg-gradient-to-br from-emerald-400 to-green-500 text-white'
  } else if (index === currentStep.value - 1) {
    return 'bg-gradient-to-br from-amber-400 to-orange-500 text-white scale-110'
  }
  return 'bg-slate-200 text-slate-400'
}

const riskSummary = ref({
  disaster: 1,
  major: 2,
  high: 1,
  medium: 1,
  low: 0
})

const totalRisks = computed(() => {
  return riskSummary.value.disaster + riskSummary.value.major +
         riskSummary.value.high + riskSummary.value.medium + riskSummary.value.low
})

const avgIwrpn = ref('172.8')
const maxIwrpn = ref('300')

const overallRiskLevel = computed(() => {
  if (riskSummary.value.disaster > 0) return 'II级：重大风险'
  if (riskSummary.value.major > 0) return 'II级：重大风险'
  if (riskSummary.value.high > 0) return 'III级：高风险'
  if (riskSummary.value.medium > 0) return 'IV级：中等风险'
  return 'V级：低风险'
})

const getStrokeDash = (index: number) => {
  const total = totalRisks.value
  if (total === 0) return '0 251'
  const percentages = [
    riskSummary.value.disaster / total,
    riskSummary.value.major / total,
    riskSummary.value.high / total,
    riskSummary.value.medium / total,
    riskSummary.value.low / total
  ]
  const circumference = 251.2
  return `${percentages[index - 1] * circumference} ${circumference}`
}

const getOffset = (index: number) => {
  const total = totalRisks.value
  if (total === 0) return 0
  const percentages = [
    riskSummary.value.disaster / total,
    riskSummary.value.major / total,
    riskSummary.value.high / total,
    riskSummary.value.medium / total
  ]
  const circumference = 251.2
  const offset = percentages.slice(0, index).reduce((a, b) => a + b, 0) * circumference
  return -offset
}

const phaseDistribution = ref([
  { name: '阶段1：设计阶段', count: 0, percent: 0 },
  { name: '阶段2：填写/产生阶段', count: 4, percent: 80 },
  { name: '阶段3：审核与管理阶段', count: 1, percent: 20 },
  { name: '阶段4：归档与处置阶段', count: 0, percent: 0 }
])

const riskDetails = ref([
  {
    id: 1,
    name: '数据记录不完整',
    phase: '记录生成阶段',
    iwrpn: 300,
    level: 'I级灾难性',
    tagClass: 'px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200',
    suggestion: '建立数据完整性检查清单，实施实时监控'
  },
  {
    id: 2,
    name: '关键信息缺失',
    phase: '记录生成阶段',
    iwrpn: 192,
    level: 'II级重大',
    tagClass: 'px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200',
    suggestion: '优化记录模板，增加必填项校验'
  },
  {
    id: 3,
    name: '操作人员培训不足',
    phase: '记录生成阶段',
    iwrpn: 72,
    level: 'IV级中等',
    tagClass: 'px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200',
    suggestion: '制定系统培训计划，建立考核机制'
  },
  {
    id: 4,
    name: '设备校准超期',
    phase: '记录生成阶段',
    iwrpn: 64,
    level: 'IV级中等',
    tagClass: 'px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200',
    suggestion: '建立校准提醒系统，提前预警'
  },
  {
    id: 5,
    name: '审核不及时',
    phase: '记录审核阶段',
    iwrpn: 36,
    level: 'V级低风险',
    tagClass: 'px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200',
    suggestion: '优化审核流程，合理分配资源'
  }
])

const controlSuggestions = ref([
  {
    title: '立即整改数据记录不完整问题',
    content: '该问题为最高优先级风险，建议立即组织专项整改，建立数据完整性检查机制，实施实时监控和定期审计。',
    priority: '紧急',
    priorityClass: 'bg-red-100 text-red-700',
    timeline: '1-2周'
  },
  {
    title: '优化原始记录模板设计',
    content: '针对关键信息缺失问题，重新设计记录模板，增加必填项标识和自动校验功能，确保信息采集完整。',
    priority: '高',
    priorityClass: 'bg-orange-100 text-orange-700',
    timeline: '2-4周'
  },
  {
    title: '完善人员培训管理体系',
    content: '建立分层培训体系，制定年度培训计划，实施培训效果评估，确保操作人员能力持续满足要求。',
    priority: '中',
    priorityClass: 'bg-amber-100 text-amber-700',
    timeline: '1-2月'
  },
  {
    title: '建立设备校准预警机制',
    content: '部署设备管理系统，实现校准周期自动提醒，建立设备校准台账，确保设备始终处于有效校准状态。',
    priority: '中',
    priorityClass: 'bg-amber-100 text-amber-700',
    timeline: '1-2月'
  }
])

defineExpose({ getManifest: () => manifest })
</script>
