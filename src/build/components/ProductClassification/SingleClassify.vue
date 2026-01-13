<template>
  <div class="space-y-6">
    <!-- 商品信息输入卡片 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md">
          <i class="fas fa-edit text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">商品信息输入</h2>
      </div>

      <!-- 商品名称 -->
      <div class="mb-5">
        <label class="block text-sm font-semibold text-slate-600 mb-2">商品名称</label>
        <textarea
          v-model="productName"
          class="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400 transition-all resize-none"
          rows="2"
          placeholder="请输入商品名称，如：'木制工艺品（旧）'"
        ></textarea>
      </div>

      <!-- 商品描述 -->
      <div class="mb-5">
        <label class="block text-sm font-semibold text-slate-600 mb-2">商品描述</label>
        <textarea
          v-model="productDescription"
          class="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400 transition-all resize-none"
          rows="2"
          placeholder="请输入商品详细描述，例如：木制，柚木，榉木制等，拉丁文 tectona grangis，装饰用"
        ></textarea>
      </div>

      <!-- 详细规格参数 -->
      <div class="mb-5">
        <label class="block text-sm font-semibold text-slate-600 mb-2">详细规格参数</label>
        <textarea
          v-model="productSpecs"
          class="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400 transition-all resize-none"
          rows="6"
          placeholder="例如：
1:品牌类型；2:出口享惠情况；3:用途（饰面用等）；
4:种类（中文、拉丁文属名、拉丁文种名）；
5:规格（长度x宽度）；6:厚度（毫米）；
7:加工方法（纵锯、刨切、旋切等）；..."
        ></textarea>
      </div>

      <!-- 结构化提取按钮 -->
      <div class="flex gap-3 mb-5">
        <button
          @click="extractStructuredInfo"
          :disabled="isExtracting"
          class="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <i :class="isExtracting ? 'fas fa-spinner fa-spin' : 'fas fa-stream'"></i>
          {{ isExtracting ? '提取中...' : '结构化信息提取' }}
        </button>
      </div>

      <!-- 结构化信息输出 -->
      <div class="mb-5">
        <label class="block text-sm font-semibold text-slate-600 mb-2">结构化信息输出</label>
        <div class="bg-slate-50/80 rounded-xl p-4 font-mono text-sm text-slate-700 max-h-64 overflow-y-auto border border-slate-200">
          <pre v-html="structuredOutput"></pre>
        </div>
      </div>

      <!-- AI归类按钮 -->
      <div class="flex justify-center">
        <button
          @click="classifyProduct"
          :disabled="isClassifying"
          class="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 text-base"
        >
          <i :class="isClassifying ? 'fas fa-spinner fa-spin' : 'fas fa-brain'"></i>
          {{ isClassifying ? 'AI分析中...' : 'AI智能归类' }}
        </button>
      </div>
    </section>

    <!-- 归类结果卡片 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-md">
          <i class="fas fa-poll text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">归类结果</h2>
      </div>

      <!-- 主结果展示 -->
      <div class="text-center py-6 border-b border-slate-100 mb-6">
        <div class="text-4xl font-extrabold text-slate-800 tracking-wider mb-2">{{ classificationResult.hsCode }}</div>
        <div class="text-lg font-semibold text-teal-600 mb-3">{{ classificationResult.standardName }}</div>
        <span class="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
          AI分析置信度: {{ (classificationResult.confidence * 100).toFixed(1) }}%
        </span>
      </div>

      <!-- 分级归类详情 -->
      <div class="space-y-4">
        <div
          v-for="level in classificationResult.levels"
          :key="level.code"
          class="flex gap-4 pb-4 border-b border-dashed border-slate-100 last:border-b-0"
        >
          <div class="w-32 shrink-0 font-semibold text-slate-600 text-sm">{{ level.level }}：</div>
          <div class="flex-1">
            <div class="mb-1">
              <span class="inline-block px-2.5 py-1 bg-teal-50 text-teal-700 rounded-lg font-bold text-sm mr-2">
                {{ level.code }}
              </span>
              <span class="text-slate-600 text-sm">{{ level.description }}</span>
            </div>
            <div class="bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-500 leading-relaxed">
              {{ level.basis }}
            </div>
          </div>
        </div>
      </div>

      <!-- 人工修正 -->
      <div class="mt-6">
        <label class="block text-sm font-semibold text-slate-600 mb-2">人工修正/备注</label>
        <textarea
          v-model="manualCorrection"
          class="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400 transition-all resize-none"
          rows="2"
          placeholder="如果AI归类结果不准确，可在此处进行人工修正并添加备注..."
        ></textarea>
      </div>

      <!-- 操作按钮 -->
      <div class="flex gap-4 mt-5">
        <button
          @click="saveToKnowledge"
          class="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <i class="fas fa-save"></i>
          保存到知识库
        </button>
        <button
          @click="exportReport"
          class="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <i class="fas fa-download"></i>
          导出归类报告
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Manifest } from '@/build/types'

const manifest: Manifest = {
  name: 'SingleClassify',
  type: 'component',
  description: '单条商品信息智能归类组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

// 表单数据
const productName = ref('椴木单板')
const productDescription = ref('木制，椴木制，拉丁文 Tilia mandshurica，饰面用')
const productSpecs = ref(`1:品牌类型：无品牌；
2:出口享惠情况：出口享惠；
3:用途：饰面用；
4:种类：中文名称：辽椴，拉丁文属名：Tilia，拉丁文种名：mandshurica；
5:规格：1220mm x 2440mm；
6:厚度：2.5mm；
7:加工方法：旋切；
8:请注明立方米数或平方米数：0.5立方米；
9:等级：A级；
10:GTIN：1234567890123；
11:CAS：9000-00-0；
12:其他：表面光滑，无节疤`)
const manualCorrection = ref('')

// 状态
const isExtracting = ref(false)
const isClassifying = ref(false)
const structuredOutput = ref('<span class="text-slate-400">等待提取结构化信息...</span>')

// 归类结果
const classificationResult = reactive({
  hsCode: '4408901999',
  standardName: '饰面用单板（厚度≤6mm），经旋切，椴木制',
  confidence: 0.925,
  levels: [
    { level: '章（2位）', code: '44', description: '第44章 木及木制品；木炭', basis: '依据：商品为木制品，符合第44章范围。第44章包括木及木制品；木炭。' },
    { level: '品目（4位）', code: '4408', description: '饰面用单板等', basis: '依据：商品为经旋切的饰面用单板，厚度≤6mm，符合品目4408的描述。' },
    { level: '子目（5位）', code: '44089', description: '其他', basis: '依据：非针叶木，非热带木，归类于"其他"。' },
    { level: '子目（6位）', code: '440890', description: '其他', basis: '依据：非竹制，归类于"其他"。' },
    { level: '子目（7位）', code: '4408901', description: '厚度≤6mm', basis: '依据：商品厚度为2.5mm，符合厚度≤6mm的条件。' },
    { level: '子目（8位）', code: '44089012', description: '经旋切', basis: '依据：商品加工方法为旋切，符合"经旋切"的描述。' },
    { level: '子目（10位）', code: '4408901999', description: '其他', basis: '依据：非热带木，非特定树种，归类于"其他"。' }
  ]
})

// 格式化输出结构化信息
const formatStructuredInfo = (info: Record<string, any>): string => {
  let output = ''
  for (const [key, val] of Object.entries(info)) {
    if (typeof val === 'object' && val !== null) {
      output += `<span class="text-blue-600">${key}</span>: {\n`
      for (const [k, v] of Object.entries(val)) {
        output += `  <span class="text-blue-600">${k}</span>: <span class="text-emerald-600">"${v}"</span>,\n`
      }
      output += '},\n'
    } else {
      output += `<span class="text-blue-600">${key}</span>: <span class="text-emerald-600">"${val}"</span>,\n`
    }
  }
  return output
}

// 方法
const extractStructuredInfo = async () => {
  if (!productName.value.trim() && !productDescription.value.trim() && !productSpecs.value.trim()) {
    alert('请至少输入一项商品信息')
    return
  }
  isExtracting.value = true
  await new Promise(r => setTimeout(r, 1200))

  // 完整的结构化信息提取（与原HTML保持一致）
  const structuredInfo: Record<string, any> = {
    product_name: productName.value.trim() || '椴木单板',
    wood_species: {
      chinese_name: '辽椴',
      latin_name: 'Tilia mandshurica'
    },
    genus_name: 'Tilia',
    specific_epithet_name: 'mandshurica',
    process: '旋切',
    purpose: '饰面用',
    size: '1220mm x 2440mm',
    thickness: '2.5mm',
    volume: '0.5立方米',
    grade: 'A级',
    brand_type: '无品牌',
    export_preference: '出口享惠',
    processing_method: '旋切',
    gtin: '1234567890123',
    cas: '9000-00-0',
    additional_info: '表面光滑，无节疤'
  }

  structuredOutput.value = formatStructuredInfo(structuredInfo)
  isExtracting.value = false
}

const classifyProduct = async () => {
  if (!productName.value.trim() && !productDescription.value.trim()) {
    alert('请输入商品名称或描述')
    return
  }
  isClassifying.value = true
  await new Promise(r => setTimeout(r, 1500))
  isClassifying.value = false
}

const saveToKnowledge = () => alert('已保存到知识库！')
const exportReport = () => alert('归类报告导出中...')

defineExpose({
  getManifest: () => manifest,
  extractStructuredInfo,
  classifyProduct
})
</script>
