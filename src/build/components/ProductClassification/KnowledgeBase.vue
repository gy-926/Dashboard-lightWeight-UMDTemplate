<template>
  <div class="space-y-6">
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-md">
          <i class="fas fa-book text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">归类规则与知识库管理</h2>
      </div>

      <!-- 操作栏 -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex gap-3">
          <button class="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
            <i class="fas fa-plus"></i>添加新规则
          </button>
          <button class="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
            <i class="fas fa-sync"></i>从文件导入规则
          </button>
        </div>
        <div class="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
          <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span class="text-sm text-emerald-700 font-medium">规则引擎: 运行中</span>
        </div>
      </div>

      <!-- 知识库列表 -->
      <div class="space-y-3">
        <div
          v-for="kb in knowledgeBases"
          :key="kb.name"
          class="flex items-center justify-between p-4 bg-slate-50/80 rounded-xl border-l-4 border-teal-400 hover:bg-slate-100/80 hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          <div class="flex-1">
            <div class="font-bold text-slate-700 mb-1">{{ kb.name }}</div>
            <div class="text-sm text-slate-500">{{ kb.desc }}</div>
          </div>
          <span v-if="kb.chapter" class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
            {{ kb.chapter }}
          </span>
        </div>
      </div>

      <!-- 知识库统计 -->
      <div class="mt-8">
        <h3 class="text-base font-bold text-slate-700 mb-4">知识库统计</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="stat in stats" :key="stat.label" class="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 text-center border border-slate-100">
            <div class="text-2xl font-bold text-slate-700">{{ stat.value }}</div>
            <div class="text-sm text-slate-500">{{ stat.label }}</div>
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
  name: 'KnowledgeBase',
  type: 'component',
  description: '归类规则与知识库管理组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const knowledgeBases = ref([
  { name: '归类总规则', desc: '商品归类的基本原则和方法论，包含六项总规则', chapter: '' },
  { name: '中华人民共和国进出口税则（2025）', desc: '最新版中国进出口税则，包含所有税目和税率信息', chapter: '' },
  { name: '进出口税则商品及品目注释', desc: 'WCO协调制度注释的中文翻译版，详细解释各品目范围', chapter: '' },
  { name: 'HS编码规则融合知识库', desc: '整合各类HS编码规则和判例，支持智能匹配和推理', chapter: '' },
  { name: '热带木知识库', desc: '热带木材种类、特征及归类规则数据库', chapter: '适用章节：第44章' },
  { name: '濒危植物知识库', desc: 'CITES公约濒危植物物种及监管要求数据库', chapter: '适用章节：第44章' },
  { name: '红木知识库', desc: '红木种类、鉴别特征及归类规则数据库', chapter: '适用章节：第44章' },
  { name: '自定义归类属性知识库', desc: '用户自定义的商品属性和归类规则数据库', chapter: '' },
])

const stats = ref([
  { value: '8', label: '知识库总数' },
  { value: '12,458', label: '规则条目数' },
  { value: '2025-01', label: '最新版本' },
  { value: '97.3%', label: '规则覆盖率' },
])

defineExpose({ getManifest: () => manifest })
</script>
