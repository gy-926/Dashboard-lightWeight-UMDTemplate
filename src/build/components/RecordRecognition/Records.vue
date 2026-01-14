<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between">
      <!-- <div>
        <h2 class="text-2xl font-bold text-slate-800">记录管理</h2>
        <p class="text-slate-500 mt-1">管理和查看所有原始记录及其识别结果</p>
      </div> -->
      <div class="flex items-center gap-3">
        <button class="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2">
          <i class="fas fa-file-export"></i>
          导出
        </button>
        <button class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2">
          <i class="fas fa-trash-alt"></i>
          批量删除
        </button>
      </div>
    </div>

    <!-- 搜索和筛选 -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-600 mb-2">记录编号</label>
          <input
            type="text"
            v-model="filters.recordNo"
            placeholder="输入记录编号"
            class="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 mb-2">检测项目</label>
          <select v-model="filters.project" class="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            <option value="">全部项目</option>
            <option value="含量测定">含量测定</option>
            <option value="溶出度">溶出度</option>
            <option value="水分测定">水分测定</option>
            <option value="崩解时限">崩解时限</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 mb-2">风险等级</label>
          <select v-model="filters.riskLevel" class="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            <option value="">全部等级</option>
            <option value="high">高风险</option>
            <option value="medium">中风险</option>
            <option value="low">低风险</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 mb-2">日期范围</label>
          <input
            type="date"
            v-model="filters.date"
            class="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
        </div>
      </div>
      <div class="flex items-center justify-end gap-3 mt-4">
        <button @click="resetFilters" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors">
          <i class="fas fa-redo-alt mr-1"></i>重置
        </button>
        <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
          <i class="fas fa-search mr-1"></i>搜索
        </button>
      </div>
    </div>

    <!-- 记录表格 -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50">
              <th class="text-left py-4 px-6 font-semibold text-slate-600">
                <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500">
              </th>
              <th class="text-left py-4 px-6 font-semibold text-slate-600">记录编号</th>
              <th class="text-left py-4 px-6 font-semibold text-slate-600">样品名称</th>
              <th class="text-left py-4 px-6 font-semibold text-slate-600">检测项目</th>
              <th class="text-left py-4 px-6 font-semibold text-slate-600">检测日期</th>
              <th class="text-left py-4 px-6 font-semibold text-slate-600">检测人员</th>
              <th class="text-left py-4 px-6 font-semibold text-slate-600">风险等级</th>
              <th class="text-left py-4 px-6 font-semibold text-slate-600">识别状态</th>
              <th class="text-left py-4 px-6 font-semibold text-slate-600 rounded-tr-lg">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in paginatedRecords" :key="record.id" class="border-b border-slate-100 hover:bg-blue-50/50 transition-colors">
              <td class="py-4 px-6">
                <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500">
              </td>
              <td class="py-4 px-6 font-medium text-blue-600">{{ record.recordNo }}</td>
              <td class="py-4 px-6 text-slate-700">{{ record.sampleName }}</td>
              <td class="py-4 px-6 text-slate-600">{{ record.project }}</td>
              <td class="py-4 px-6 text-slate-500">{{ record.detectionDate }}</td>
              <td class="py-4 px-6 text-slate-600">{{ record.detector }}</td>
              <td class="py-4 px-6">
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-red-100 text-red-700': record.riskLevel === '高风险',
                    'bg-amber-100 text-amber-700': record.riskLevel === '中风险',
                    'bg-emerald-100 text-emerald-700': record.riskLevel === '低风险'
                  }"
                >
                  {{ record.riskLevel }}
                </span>
              </td>
              <td class="py-4 px-6">
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit"
                  :class="{
                    'bg-emerald-100 text-emerald-700': record.status === '已完成',
                    'bg-blue-100 text-blue-700': record.status === '识别中',
                    'bg-slate-100 text-slate-600': record.status === '待识别'
                  }"
                >
                  <i v-if="record.status === '已完成'" class="fas fa-check-circle"></i>
                  <i v-else-if="record.status === '识别中'" class="fas fa-spinner fa-spin"></i>
                  <i v-else class="fas fa-clock"></i>
                  {{ record.status }}
                </span>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <button class="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="查看详情">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="编辑">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors" title="重新识别">
                    <i class="fas fa-redo"></i>
                  </button>
                  <button class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="删除">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
        <div class="text-sm text-slate-500">
          共 {{ records.length }} 条记录，每页
          <select v-model="pageSize" class="px-2 py-1 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
          条
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="currentPage = 1"
            :disabled="currentPage === 1"
            class="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-angle-double-left"></i>
          </button>
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-angle-left"></i>
          </button>
          <span class="px-4 py-1.5 text-sm text-slate-600">
            {{ currentPage }} / {{ totalPages }}
          </span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-angle-right"></i>
          </button>
          <button
            @click="currentPage = totalPages"
            :disabled="currentPage === totalPages"
            class="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-angle-double-right"></i>
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
  name: 'RecordRecognitionRecords',
  type: 'component',
  description: '记录管理组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const currentPage = ref(1)
const pageSize = ref(10)

const filters = ref({
  recordNo: '',
  project: '',
  riskLevel: '',
  date: ''
})

interface Record {
  id: number
  recordNo: string
  sampleName: string
  project: string
  detectionDate: string
  detector: string
  riskLevel: string
  status: string
}

const records = ref<Record[]>([
  { id: 1, recordNo: 'JL-2024-0320-001', sampleName: '阿司匹林肠溶片', project: '含量测定', detectionDate: '2024-03-20', detector: '张三', riskLevel: '高风险', status: '已完成' },
  { id: 2, recordNo: 'JL-2024-0320-002', sampleName: '维生素C咀嚼片', project: '含量测定', detectionDate: '2024-03-20', detector: '张三', riskLevel: '高风险', status: '已完成' },
  { id: 3, recordNo: 'JL-2024-0319-001', sampleName: '对乙酰氨基酚片', project: '溶出度', detectionDate: '2024-03-19', detector: '李四', riskLevel: '中风险', status: '已完成' },
  { id: 4, recordNo: 'JL-2024-0319-002', sampleName: '布洛芬缓释胶囊', project: '含量测定', detectionDate: '2024-03-19', detector: '李四', riskLevel: '中风险', status: '识别中' },
  { id: 5, recordNo: 'JL-2024-0318-001', sampleName: '阿莫西林胶囊', project: '水分测定', detectionDate: '2024-03-18', detector: '王五', riskLevel: '中风险', status: '已完成' },
  { id: 6, recordNo: 'JL-2024-0318-002', sampleName: '头孢克肟颗粒', project: '崩解时限', detectionDate: '2024-03-18', detector: '王五', riskLevel: '低风险', status: '已完成' },
  { id: 7, recordNo: 'JL-2024-0317-001', sampleName: '克拉霉素片', project: '含量测定', detectionDate: '2024-03-17', detector: '张三', riskLevel: '低风险', status: '待识别' },
  { id: 8, recordNo: 'JL-2024-0317-002', sampleName: '罗红霉素胶囊', project: '溶出度', detectionDate: '2024-03-17', detector: '张三', riskLevel: '低风险', status: '已完成' },
  { id: 9, recordNo: 'JL-2024-0316-001', sampleName: '左氧氟沙星片', project: '含量测定', detectionDate: '2024-03-16', detector: '李四', riskLevel: '低风险', status: '已完成' },
  { id: 10, recordNo: 'JL-2024-0316-002', sampleName: '诺氟沙星胶囊', project: '水分测定', detectionDate: '2024-03-16', detector: '李四', riskLevel: '低风险', status: '已完成' }
])

const totalPages = computed(() => Math.ceil(records.value.length / pageSize.value))

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return records.value.slice(start, end)
})

const resetFilters = () => {
  filters.value = {
    recordNo: '',
    project: '',
    riskLevel: '',
    date: ''
  }
}

defineExpose({ getManifest: () => manifest })
</script>
