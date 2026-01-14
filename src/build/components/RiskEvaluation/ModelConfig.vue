<template>
  <div class="space-y-6">
    <!-- 模型配置说明 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-md">
          <i class="fas fa-info-circle text-white"></i>
        </div>
        <div>
          <h2 class="text-lg font-bold text-slate-700">IWRPN量化模型说明</h2>
          <p class="text-sm text-slate-500">IWRPN (Inherent Risk Weighted Priority Number) = RPN × IW</p>
        </div>
      </div>
      <div class="bg-slate-50/80 rounded-xl p-4 text-sm text-slate-600">
        <p class="mb-2"><strong>RPN</strong> = 严重度(S) × 发生度(O) × 检出度(D)</p>
        <p class="mb-2"><strong>IW</strong> = 固有重要性权重（1-5分）</p>
        <p><strong>IWRPN</strong> = 加权风险优先数，综合反映风险的固有重要性和当前控制措施的有效性</p>
      </div>
    </section>

    <!-- 评分标准配置 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
          <i class="fas fa-sliders-h text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">评分标准配置</h2>
      </div>

      <!-- 严重度评分标准 -->
      <div class="mb-6">
        <h3 class="font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <span class="w-2 h-2 bg-red-500 rounded-full"></span>
          严重度 (Severity) 评分标准
        </h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-200">
                <th class="text-left py-2 px-3 font-semibold text-slate-600">分值</th>
                <th class="text-left py-2 px-3 font-semibold text-slate-600">等级</th>
                <th class="text-left py-2 px-3 font-semibold text-slate-600">描述</th>
                <th class="text-left py-2 px-3 font-semibold text-slate-600">示例</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="std in severityStandards" :key="std.score" class="border-b border-slate-100">
                <td class="py-2 px-3 font-bold text-red-600">{{ std.score }}</td>
                <td class="py-2 px-3 text-slate-700">{{ std.level }}</td>
                <td class="py-2 px-3 text-slate-600">{{ std.description }}</td>
                <td class="py-2 px-3 text-slate-500">{{ std.example }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 发生度评分标准 -->
      <div class="mb-6">
        <h3 class="font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
          发生度 (Occurrence) 评分标准
        </h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-200">
                <th class="text-left py-2 px-3 font-semibold text-slate-600">分值</th>
                <th class="text-left py-2 px-3 font-semibold text-slate-600">等级</th>
                <th class="text-left py-2 px-3 font-semibold text-slate-600">发生率</th>
                <th class="text-left py-2 px-3 font-semibold text-slate-600">描述</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="std in occurrenceStandards" :key="std.score" class="border-b border-slate-100">
                <td class="py-2 px-3 font-bold text-orange-600">{{ std.score }}</td>
                <td class="py-2 px-3 text-slate-700">{{ std.level }}</td>
                <td class="py-2 px-3 text-slate-600">{{ std.rate }}</td>
                <td class="py-2 px-3 text-slate-500">{{ std.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 风险等级阈值配置 -->
      <div>
        <h3 class="font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
          风险等级阈值配置
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-red-50 rounded-xl border border-red-100">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold text-red-700">I级灾难性风险</span>
              <span class="text-red-600 font-bold">&gt; 200</span>
            </div>
            <input type="number" v-model="riskThresholds.disaster" class="w-full px-3 py-2 border border-red-200 rounded-lg text-sm">
          </div>
          <div class="p-4 bg-rose-50 rounded-xl border border-rose-100">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold text-rose-700">II级重大风险</span>
              <span class="text-rose-600 font-bold">150 - 200</span>
            </div>
            <div class="flex gap-2">
              <input type="number" v-model="riskThresholds.majorLow" class="w-1/2 px-3 py-2 border border-rose-200 rounded-lg text-sm">
              <input type="number" v-model="riskThresholds.majorHigh" class="w-1/2 px-3 py-2 border border-rose-200 rounded-lg text-sm">
            </div>
          </div>
          <div class="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold text-orange-700">III级高风险</span>
              <span class="text-orange-600 font-bold">100 - 150</span>
            </div>
            <div class="flex gap-2">
              <input type="number" v-model="riskThresholds.highLow" class="w-1/2 px-3 py-2 border border-orange-200 rounded-lg text-sm">
              <input type="number" v-model="riskThresholds.highHigh" class="w-1/2 px-3 py-2 border border-orange-200 rounded-lg text-sm">
            </div>
          </div>
          <div class="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold text-amber-700">IV级中等风险</span>
              <span class="text-amber-600 font-bold">50 - 100</span>
            </div>
            <div class="flex gap-2">
              <input type="number" v-model="riskThresholds.mediumLow" class="w-1/2 px-3 py-2 border border-amber-200 rounded-lg text-sm">
              <input type="number" v-model="riskThresholds.mediumHigh" class="w-1/2 px-3 py-2 border border-amber-200 rounded-lg text-sm">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 保存按钮 -->
    <div class="flex justify-end">
      <button class="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-md transition-all flex items-center gap-2">
        <i class="fas fa-save"></i>
        保存配置
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Manifest } from '@/build/types'

const manifest: Manifest = {
  name: 'RiskEvaluationModelConfig',
  type: 'component',
  description: '量化模型配置组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const riskThresholds = ref({
  disaster: 200,
  majorLow: 150,
  majorHigh: 200,
  highLow: 100,
  highHigh: 150,
  mediumLow: 50,
  mediumHigh: 100
})

const severityStandards = ref([
  { score: 5, level: '灾难', description: '导致数据完全不可信，可能引起产品召回、法规处罚', example: '数据完全缺失' },
  { score: 4, level: '严重', description: '影响数据溯源和结果验证，可能导致错误结论', example: '关键信息缺失' },
  { score: 3, level: '中度', description: '影响工作效率，需要额外验证', example: '记录不完整' },
  { score: 2, level: '轻度', description: '轻微影响，易于纠正', example: '格式不规范' },
  { score: 1, level: '微小', description: '几乎无影响', example: '笔误' }
])

const occurrenceStandards = ref([
  { score: 5, level: '几乎每次', description: '发生率50%-80%', rate: '50%-80%' },
  { score: 4, level: '经常', description: '发生率30%-50%', rate: '30%-50%' },
  { score: 3, level: '偶尔', description: '发生率10%-30%', rate: '10%-30%' },
  { score: 2, level: '很少', description: '发生率5%-10%', rate: '5%-10%' },
  { score: 1, level: '极少', description: '发生率<5%', rate: '<5%' }
])

defineExpose({ getManifest: () => manifest })
</script>
