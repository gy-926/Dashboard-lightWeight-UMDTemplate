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

    <!-- 风险要素标签页 -->
    <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
          <i class="fas fa-chart-bar text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">风险分析</h2>
      </div>

      <!-- 标签页导航 -->
      <div class="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-6">
        <button
          v-for="(risk, index) in riskItems"
          :key="risk.id"
          @click="activeTab = index"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
          :class="activeTab === index
            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
        >
          {{ risk.name }}
        </button>
      </div>

      <!-- 当前风险要素评估 -->
      <div v-for="(risk, index) in riskItems" :key="risk.id">
        <div v-show="activeTab === index" class="space-y-6">
          <div class="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center text-white">
                <i class="fas fa-exclamation-triangle"></i>
              </div>
              <div>
                <h3 class="font-bold text-slate-700">风险要素评估：{{ risk.name }}</h3>
                <p class="text-sm text-slate-500">{{ risk.description }}</p>
              </div>
            </div>
          </div>

          <!-- IWRPN评分区域 -->
          <div class="bg-slate-50/80 rounded-xl p-6 border border-slate-200 space-y-6">
            <!-- 严重度 -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <label class="font-semibold text-slate-700 flex items-center gap-2">
                  <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                  严重度 (Severity)
                </label>
                <span class="text-xl font-bold text-red-500">{{ risk.scores.severity }}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                v-model.number="risk.scores.severity"
                @input="calculateIWRPN(risk)"
                class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
              >
              <div class="flex justify-between text-xs text-slate-500">
                <span>1 (微小)</span>
                <span>2 (轻度)</span>
                <span>3 (中度)</span>
                <span>4 (严重)</span>
                <span>5 (灾难)</span>
              </div>
              <p class="text-xs text-slate-500 bg-white/50 p-2 rounded-lg">{{ risk.severityDesc }}</p>
            </div>

            <!-- 发生度 -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <label class="font-semibold text-slate-700 flex items-center gap-2">
                  <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
                  发生度 (Occurrence)
                </label>
                <span class="text-xl font-bold text-orange-500">{{ risk.scores.occurrence }}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                v-model.number="risk.scores.occurrence"
                @input="calculateIWRPN(risk)"
                class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              >
              <div class="flex justify-between text-xs text-slate-500">
                <span>1 (极少)</span>
                <span>2 (很少)</span>
                <span>3 (偶尔)</span>
                <span>4 (经常)</span>
                <span>5 (几乎每次)</span>
              </div>
              <p class="text-xs text-slate-500 bg-white/50 p-2 rounded-lg">{{ risk.occurrenceDesc }}</p>
            </div>

            <!-- 检出度 -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <label class="font-semibold text-slate-700 flex items-center gap-2">
                  <span class="w-2 h-2 bg-amber-500 rounded-full"></span>
                  检出度 (Detection)
                </label>
                <span class="text-xl font-bold text-amber-500">{{ risk.scores.detection }}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                v-model.number="risk.scores.detection"
                @input="calculateIWRPN(risk)"
                class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              >
              <div class="flex justify-between text-xs text-slate-500">
                <span>1 (极易)</span>
                <span>2 (较易)</span>
                <span>3 (较难)</span>
                <span>4 (很难)</span>
                <span>5 (极难)</span>
              </div>
              <p class="text-xs text-slate-500 bg-white/50 p-2 rounded-lg">{{ risk.detectionDesc }}</p>
            </div>

            <!-- 固有重要性权重 -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <label class="font-semibold text-slate-700 flex items-center gap-2">
                  <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
                  固有重要性权重 (Inherent Weight)
                </label>
                <span class="text-xl font-bold text-purple-500">{{ risk.scores.inherentWeight }}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                v-model.number="risk.scores.inherentWeight"
                @input="calculateIWRPN(risk)"
                class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
              >
              <div class="flex justify-between text-xs text-slate-500">
                <span>1 (极低)</span>
                <span>2 (低)</span>
                <span>3 (中等)</span>
                <span>4 (高)</span>
                <span>5 (极高)</span>
              </div>
              <p class="text-xs text-slate-500 bg-white/50 p-2 rounded-lg">{{ risk.inherentWeightDesc }}</p>
            </div>
          </div>

          <!-- IWRPN显示 -->
          <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
            <div class="text-center mb-4">
              <div class="text-sm opacity-80 mb-1">加权风险优先数 (IWRPN)</div>
              <div class="text-5xl font-extrabold">{{ risk.iwrpn }}</div>
            </div>

            <div class="flex justify-center gap-8 mb-4">
              <div class="text-center">
                <div class="text-xs opacity-70 mb-1">RPN</div>
                <div class="text-2xl font-bold">{{ risk.rpn }}</div>
              </div>
              <div class="text-center">
                <div class="text-xs opacity-70 mb-1">IW</div>
                <div class="text-2xl font-bold">{{ risk.scores.inherentWeight }}</div>
              </div>
              <div class="text-center">
                <div class="text-xs opacity-70 mb-1">IWRPN</div>
                <div class="text-2xl font-bold">{{ risk.iwrpn }}</div>
              </div>
            </div>

            <div class="text-center">
              <span :class="risk.riskTagClass" class="inline-block px-6 py-2 rounded-full text-sm font-bold">
                {{ risk.riskLevel }}
              </span>
            </div>
          </div>

          <!-- 评估说明 -->
          <div>
            <label class="block text-sm font-semibold text-slate-600 mb-2">评估说明</label>
            <textarea
              v-model="risk.evaluationNote"
              rows="4"
              class="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all resize-none"
              placeholder="请在此输入对该风险要素的详细评估说明..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- 风险矩阵图 -->
    <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-md">
          <i class="fas fa-th text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">风险矩阵图</h2>
      </div>

      <div class="relative bg-slate-50 rounded-xl p-8 border border-slate-200" style="height: 320px;">
        <!-- Y轴标签 -->
        <div class="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-semibold text-slate-600">严重度</div>

        <!-- 矩阵网格 -->
        <div class="flex h-full ml-6">
          <div class="grid grid-cols-5 gap-1 flex-1">
            <div v-for="(row, y) in riskMatrix" :key="'row-' + y" class="flex flex-col gap-1">
              <div
                v-for="(cell, x) in row"
                :key="'cell-' + x + '-' + y"
                class="flex-1 rounded-lg border border-white/50"
                :class="cell.class"
              ></div>
            </div>
          </div>
        </div>

        <!-- X轴标签 -->
        <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-slate-600">发生度</div>

        <!-- 风险点 -->
        <div
          v-for="(risk, index) in riskItems"
          :key="'point-' + index"
          class="absolute w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all cursor-pointer hover:scale-125"
          :style="getRiskPointStyle(risk)"
          :title="risk.name + ': ' + risk.iwrpn"
        >
          {{ index + 1 }}
        </div>
      </div>

      <!-- 图例 -->
      <div class="flex flex-wrap gap-4 mt-4 justify-center">
        <div class="flex items-center gap-2">
          <span class="w-4 h-4 rounded bg-red-500"></span>
          <span class="text-xs text-slate-600">I级灾难性 (&gt;200)</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-4 h-4 rounded bg-rose-500"></span>
          <span class="text-xs text-slate-600">II级重大 (150-200)</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-4 h-4 rounded bg-orange-500"></span>
          <span class="text-xs text-slate-600">III级高风险 (100-150)</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-4 h-4 rounded bg-amber-500"></span>
          <span class="text-xs text-slate-600">IV级中等 (50-100)</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-4 h-4 rounded bg-emerald-500"></span>
          <span class="text-xs text-slate-600">V级低风险 (&lt;50)</span>
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
        class="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
      >
        下一步：风险评价
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Manifest } from '@/build/types'

const manifest: Manifest = {
  name: 'RiskAnalysis',
  type: 'component',
  description: '风险分析IWRPN评分组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const currentStep = ref(3)
const activeTab = ref(0)

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

interface RiskItem {
  id: number
  name: string
  description: string
  severityDesc: string
  occurrenceDesc: string
  detectionDesc: string
  inherentWeightDesc: string
  scores: {
    severity: number
    occurrence: number
    detection: number
    inherentWeight: number
  }
  rpn: number
  iwrpn: number
  riskLevel: string
  riskTagClass: string
  evaluationNote: string
}

const riskItems = ref<RiskItem[]>([
  {
    id: 1,
    name: '数据记录不完整',
    description: '原始记录中存在遗漏、缺失或未填写必填项的情况',
    severityDesc: '导致数据完全不可信，可能引起产品召回、法规处罚',
    occurrenceDesc: '经常发生（发生率50%-80%）',
    detectionDesc: '较难发现，常规审核可能遗漏',
    inherentWeightDesc: '极高重要性，对数据可靠性影响极大',
    scores: { severity: 5, occurrence: 4, detection: 3, inherentWeight: 5 },
    rpn: 60,
    iwrpn: 300,
    riskLevel: 'I级：灾难性风险',
    riskTagClass: 'bg-red-100 text-red-700 border border-red-200 px-4 py-2 rounded-full font-bold',
    evaluationNote: '数据记录不完整是本实验室原始记录管理中最突出的问题，经常导致数据追溯困难，需要重新实验确认，严重影响工作效率和数据可信度。'
  },
  {
    id: 2,
    name: '关键信息缺失',
    description: '缺少样品信息、检测条件、仪器参数等关键数据',
    severityDesc: '影响数据溯源和结果验证，可能导致错误结论',
    occurrenceDesc: '较常发生（发生率30%-50%）',
    detectionDesc: '较难发现，需要详细核查',
    inherentWeightDesc: '高重要性，影响数据完整性',
    scores: { severity: 4, occurrence: 4, detection: 3, inherentWeight: 4 },
    rpn: 48,
    iwrpn: 192,
    riskLevel: 'II级：重大风险',
    riskTagClass: 'bg-rose-100 text-rose-700 border border-rose-200 px-4 py-2 rounded-full font-bold',
    evaluationNote: '关键信息缺失问题主要集中在样品标识和仪器参数记录方面，需要加强培训。'
  },
  {
    id: 3,
    name: '操作人员培训不足',
    description: '操作人员未接受充分培训或培训记录不完整',
    severityDesc: '可能导致操作错误，影响数据质量',
    occurrenceDesc: '偶尔发生（发生率10%-30%）',
    detectionDesc: '较易发现，通过能力评估可发现',
    inherentWeightDesc: '中高重要性，是质量管理体系的核心要素',
    scores: { severity: 3, occurrence: 3, detection: 2, inherentWeight: 4 },
    rpn: 18,
    iwrpn: 72,
    riskLevel: 'IV级：中等风险',
    riskTagClass: 'bg-amber-100 text-amber-700 border border-amber-200 px-4 py-2 rounded-full font-bold',
    evaluationNote: '培训不足问题需要通过系统的培训计划和考核机制来解决。'
  },
  {
    id: 4,
    name: '设备校准超期',
    description: '检测设备未按时校准或校准证书过期',
    severityDesc: '影响检测结果准确性和溯源性',
    occurrenceDesc: '很少发生（发生率5%-10%）',
    detectionDesc: '较易发现，通过设备管理台账可核查',
    inherentWeightDesc: '高重要性，直接影响检测结果可靠性',
    scores: { severity: 4, occurrence: 2, detection: 2, inherentWeight: 4 },
    rpn: 16,
    iwrpn: 64,
    riskLevel: 'IV级：中等风险',
    riskTagClass: 'bg-amber-100 text-amber-700 border border-amber-200 px-4 py-2 rounded-full font-bold',
    evaluationNote: '设备校准管理需要建立更完善的提醒机制。'
  },
  {
    id: 5,
    name: '审核不及时',
    description: '原始记录未在规定时间内完成审核',
    severityDesc: '可能导致问题发现延迟，影响整改时效',
    occurrenceDesc: '经常发生（发生率40%-60%）',
    detectionDesc: '易于发现，通过审核记录可核查',
    inherentWeightDesc: '中等重要性，影响质量控制效率',
    scores: { severity: 3, occurrence: 4, detection: 1, inherentWeight: 3 },
    rpn: 12,
    iwrpn: 36,
    riskLevel: 'V级：低风险',
    riskTagClass: 'bg-emerald-100 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-full font-bold',
    evaluationNote: '审核时效性问题需要通过流程优化和资源调配来解决。'
  }
])

const calculateIWRPN = (risk: RiskItem) => {
  risk.rpn = risk.scores.severity * risk.scores.occurrence * risk.scores.detection
  risk.iwrpn = risk.rpn * risk.scores.inherentWeight

  if (risk.iwrpn > 200) {
    risk.riskLevel = 'I级：灾难性风险'
    risk.riskTagClass = 'bg-red-100 text-red-700 border border-red-200 px-4 py-2 rounded-full font-bold'
  } else if (risk.iwrpn >= 150) {
    risk.riskLevel = 'II级：重大风险'
    risk.riskTagClass = 'bg-rose-100 text-rose-700 border border-rose-200 px-4 py-2 rounded-full font-bold'
  } else if (risk.iwrpn >= 100) {
    risk.riskLevel = 'III级：高风险'
    risk.riskTagClass = 'bg-orange-100 text-orange-700 border border-orange-200 px-4 py-2 rounded-full font-bold'
  } else if (risk.iwrpn >= 50) {
    risk.riskLevel = 'IV级：中等风险'
    risk.riskTagClass = 'bg-amber-100 text-amber-700 border border-amber-200 px-4 py-2 rounded-full font-bold'
  } else {
    risk.riskLevel = 'V级：低风险'
    risk.riskTagClass = 'bg-emerald-100 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-full font-bold'
  }
}

const getRiskPointStyle = (risk: RiskItem) => {
  const x = ((risk.scores.occurrence - 1) / 4) * 80 + 15
  const y = ((5 - risk.scores.severity) / 4) * 70 + 20
  let color = '#10b981'
  if (risk.iwrpn > 200) color = '#dc2626'
  else if (risk.iwrpn >= 150) color = '#e11d48'
  else if (risk.iwrpn >= 100) color = '#f97316'
  else if (risk.iwrpn >= 50) color = '#f59e0b'
  return { left: x + '%', top: y + '%', backgroundColor: color }
}

const riskMatrix = [
  [{ class: 'bg-red-200' }, { class: 'bg-red-300' }, { class: 'bg-red-400' }, { class: 'bg-red-500' }, { class: 'bg-red-600' }],
  [{ class: 'bg-orange-200' }, { class: 'bg-orange-300' }, { class: 'bg-orange-400' }, { class: 'bg-red-400' }, { class: 'bg-red-500' }],
  [{ class: 'bg-amber-200' }, { class: 'bg-amber-300' }, { class: 'bg-orange-400' }, { class: 'bg-orange-500' }, { class: 'bg-red-400' }],
  [{ class: 'bg-emerald-200' }, { class: 'bg-amber-300' }, { class: 'bg-amber-400' }, { class: 'bg-orange-400' }, { class: 'bg-orange-500' }],
  [{ class: 'bg-emerald-100' }, { class: 'bg-emerald-200' }, { class: 'bg-emerald-300' }, { class: 'bg-amber-400' }, { class: 'bg-amber-500' }]
]

defineExpose({ getManifest: () => manifest })
</script>
