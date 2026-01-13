<template>
  <div class="space-y-6">
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
          <i class="fas fa-database text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">历史归类案例库</h2>
      </div>

      <!-- 搜索栏 -->
      <div class="flex gap-3 mb-5">
        <input
          v-model="searchQuery"
          type="text"
          class="flex-1 px-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400 transition-all"
          placeholder="搜索商品名称、HS编码或关键词..."
        />
        <button class="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
          <i class="fas fa-search"></i>搜索
        </button>
      </div>

      <!-- 筛选按钮 -->
      <div class="flex flex-wrap gap-2 mb-5">
        <button
          v-for="filter in filters"
          :key="filter"
          @click="activeFilter = filter"
          class="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
          :class="activeFilter === filter ? 'bg-teal-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
        >
          {{ filter }}
        </button>
      </div>

      <!-- 数据表格 -->
      <div class="overflow-auto rounded-xl border border-slate-100">
        <table class="min-w-full text-left text-sm">
          <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th class="px-4 py-3">序号</th>
              <th class="px-4 py-3">商品名称</th>
              <th class="px-4 py-3">商品描述</th>
              <th class="px-4 py-3">HS编码（10位）</th>
              <th class="px-4 py-3">归类依据</th>
              <th class="px-4 py-3">创建时间</th>
              <th class="px-4 py-3">状态</th>
              <th class="px-4 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in historyCases" :key="item.id" class="border-b border-slate-50 text-slate-700 hover:bg-slate-50/50">
              <td class="px-4 py-3 text-slate-500">{{ item.id }}</td>
              <td class="px-4 py-3 font-medium text-slate-800">{{ item.name }}</td>
              <td class="px-4 py-3 text-slate-600 max-w-xs truncate">{{ item.description }}</td>
              <td class="px-4 py-3 font-mono text-teal-700 font-bold">{{ item.code }}</td>
              <td class="px-4 py-3 text-slate-600">{{ item.basis }}</td>
              <td class="px-4 py-3 text-slate-500">{{ item.date }}</td>
              <td class="px-4 py-3">
                <span
                  class="px-2.5 py-1 rounded-full text-xs font-semibold"
                  :class="item.status === '已验证' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-right">
                <div class="flex justify-end gap-2">
                  <button class="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-500 hover:text-white text-slate-600 transition-all flex items-center justify-center">
                    <i class="fas fa-eye text-xs"></i>
                  </button>
                  <button class="w-8 h-8 rounded-full bg-slate-100 hover:bg-teal-500 hover:text-white text-slate-600 transition-all flex items-center justify-center">
                    <i class="fas fa-edit text-xs"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 加载更多 -->
      <div class="flex justify-center mt-6">
        <button class="px-6 py-2.5 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 font-semibold rounded-xl transition-all flex items-center gap-2">
          <i class="fas fa-redo"></i>加载更多
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Manifest } from '@/build/types'

const manifest: Manifest = {
  name: 'HistoryCases',
  type: 'component',
  description: '历史归类案例管理组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const searchQuery = ref('')
const activeFilter = ref('全部')
const filters = ['全部', '今日新增', '高置信度', '已验证', '待审核']

const historyCases = ref([
  { id: 1, name: '红橄榄原木(CN)', description: '红橄榄 Canarium velutinum，直径41/45CM', code: '4403499090', basis: '热带木原木，非针叶木', date: '2024-01-16', status: '已验证' },
  { id: 2, name: '纳托山榄原木(PQ)', description: '纳托山榄 Palaquium Warburgianum，直径75CM', code: '4403499090', basis: '热带木原木，非针叶木', date: '2024-01-16', status: '已验证' },
  { id: 3, name: '番龙眼木原木(PM)', description: '番龙眼 Pometia Pinnata，直径60-114CM', code: '4403499090', basis: '热带木原木，非针叶木', date: '2024-01-16', status: '已验证' },
  { id: 4, name: '南洋合欢原木(ALB)', description: '南洋合欢 ALBIZIA FALCATARIA，直径111CM', code: '4403499090', basis: '热带木原木，非针叶木', date: '2024-01-16', status: '待审核' },
  { id: 5, name: '海棠木原木(CL)', description: '海棠木 CALOPHYLLUM INOPHYLLUM，直径44-47CM', code: '4403499090', basis: '热带木原木，非针叶木', date: '2024-01-16', status: '已验证' },
])

defineExpose({ getManifest: () => manifest })
</script>
