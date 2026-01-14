<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <!-- <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">原始记录上传和智能识别</h2>
        <p class="text-slate-500 mt-1">上传纸质原始记录文件，AI自动识别并提取关键信息</p>
      </div>
    </div> -->

    <!-- 上传区域 -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-slate-100">
      <div
        class="border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer"
        :class="[
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
        ]"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        @click="triggerFileInput"
      >
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          @change="handleFileSelect"
        >
        <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <i class="fas fa-cloud-upload-alt text-3xl text-white"></i>
        </div>
        <h3 class="text-lg font-semibold text-slate-700 mb-2">拖拽文件到此处，或点击选择文件</h3>
        <p class="text-sm text-slate-500">支持 PDF、JPG、PNG 格式，单个文件最大 50MB</p>
      </div>

      <!-- 已上传文件列表 -->
      <div v-if="uploadedFiles.length > 0" class="mt-6 space-y-3">
        <div v-for="(file, index) in uploadedFiles" :key="index" class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
            <i class="fas fa-file-pdf text-white text-xl"></i>
          </div>
          <div class="flex-1">
            <div class="font-medium text-slate-700">{{ file.name }}</div>
            <div class="text-xs text-slate-500">{{ file.size }}</div>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="file.status === 'pending'" class="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-lg">待识别</span>
            <span v-else-if="file.status === 'processing'" class="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg flex items-center gap-2">
              <i class="fas fa-spinner fa-spin text-xs"></i>
              识别中...
            </span>
            <span v-else class="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-lg">已完成</span>
            <button @click="removeFile(index)" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- AI智能识别区域 -->
    <div v-if="uploadedFiles.length > 0" class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-md">
          <i class="fas fa-robot text-white"></i>
        </div>
        <div>
          <h3 class="text-lg font-bold text-slate-700">AI智能识别</h3>
          <p class="text-sm text-slate-500">基于深度学习的原始记录信息提取技术</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 原始图像 -->
        <div class="bg-slate-50 rounded-xl p-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-semibold text-slate-700">原始图像</h4>
            <span class="text-xs text-slate-500">PDF 第 1/1 页</span>
          </div>
          <div class="aspect-[3/4] bg-slate-200 rounded-lg flex items-center justify-center">
            <div class="text-center text-slate-500">
              <i class="fas fa-file-image text-4xl mb-2"></i>
              <p class="text-sm">原始记录预览</p>
            </div>
          </div>
        </div>

        <!-- 识别结果 -->
        <div class="bg-slate-50 rounded-xl p-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-semibold text-slate-700">AI识别结果</h4>
            <div class="flex gap-2">
              <button class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors">
                <i class="fas fa-magic mr-1"></i>重新识别
              </button>
              <button class="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-lg transition-colors">
                <i class="fas fa-check mr-1"></i>确认保存
              </button>
            </div>
          </div>
          <div class="aspect-[3/4] bg-white rounded-lg p-4 overflow-auto">
            <p class="text-sm text-slate-600">识别结果将显示在这里...</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 字段提取表格 -->
    <div v-if="showExtractionTable" class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
            <i class="fas fa-list-alt text-white"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-slate-700">字段提取结果</h3>
            <p class="text-sm text-slate-500">共提取 {{ extractedFields.length }} 个字段</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button class="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2">
            <i class="fas fa-download"></i>
            导出Excel
          </button>
          <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2">
            <i class="fas fa-save"></i>
            保存记录
          </button>
        </div>
      </div>

      <!-- 表格 -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="text-left py-3 px-4 font-semibold text-slate-600 bg-slate-50 rounded-tl-lg">序号</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 bg-slate-50">字段名称</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 bg-slate-50">字段值</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 bg-slate-50">置信度</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 bg-slate-50 rounded-tr-lg">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="field in paginatedFields" :key="field.id" class="border-b border-slate-100 hover:bg-blue-50/50 transition-colors">
              <td class="py-3 px-4 text-slate-600">{{ field.id }}</td>
              <td class="py-3 px-4 font-medium text-slate-700">{{ field.name }}</td>
              <td class="py-3 px-4">
                <input
                  type="text"
                  v-model="field.value"
                  class="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all duration-500"
                      :class="{
                        'bg-emerald-500': field.confidence >= 90,
                        'bg-blue-500': field.confidence >= 70 && field.confidence < 90,
                        'bg-amber-500': field.confidence >= 50 && field.confidence < 70,
                        'bg-red-500': field.confidence < 50
                      }"
                      :style="{ width: field.confidence + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm font-medium" :class="{
                    'text-emerald-600': field.confidence >= 90,
                    'text-blue-600': field.confidence >= 70 && field.confidence < 90,
                    'text-amber-600': field.confidence >= 50 && field.confidence < 70,
                    'text-red-600': field.confidence < 50
                  }">{{ field.confidence }}%</span>
                </div>
              </td>
              <td class="py-3 px-4">
                <button class="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="编辑">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="确认">
                  <i class="fas fa-check"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div class="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
        <div class="text-sm text-slate-500">
          显示 {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, extractedFields.length) }} 条，共 {{ extractedFields.length }} 条
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="currentPage = 1"
            :disabled="currentPage === 1"
            class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-angle-double-left"></i>
          </button>
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-angle-left"></i>
          </button>
          <span class="px-3 py-1.5 text-sm text-slate-600">
            {{ currentPage }} / {{ totalPages }}
          </span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-angle-right"></i>
          </button>
          <button
            @click="currentPage = totalPages"
            :disabled="currentPage === totalPages"
            class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
  name: 'RecordRecognitionUpload',
  type: 'component',
  description: '原始记录上传和智能识别组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const showExtractionTable = ref(true)
const currentPage = ref(1)
const pageSize = 10

interface UploadedFile {
  name: string
  size: string
  status: 'pending' | 'processing' | 'completed'
}

const uploadedFiles = ref<UploadedFile[]>([
  { name: '检测记录_20240320.pdf', size: '2.5 MB', status: 'completed' }
])

interface ExtractedField {
  id: number
  name: string
  value: string
  confidence: number
}

const extractedFields = ref<ExtractedField[]>([
  { id: 1, name: '记录编号', value: 'JL-2024-0320-001', confidence: 98 },
  { id: 2, name: '检测项目', value: '高效液相色谱法含量测定', confidence: 95 },
  { id: 3, name: '样品名称', value: '阿司匹林肠溶片', confidence: 97 },
  { id: 4, name: '样品批号', value: '20240315', confidence: 99 },
  { id: 5, name: '检测日期', value: '2024-03-20', confidence: 98 },
  { id: 6, name: '检测人员', value: '张三', confidence: 96 },
  { id: 7, name: '审核人员', value: '李四', confidence: 94 },
  { id: 8, name: '检测依据', value: '《中国药典》2020年版四部', confidence: 92 },
  { id: 9, name: '色谱柱', value: 'C18, 4.6mm×250mm, 5μm', confidence: 91 },
  { id: 10, name: '流动相', value: '甲醇-0.1%磷酸溶液(30:70)', confidence: 88 },
  { id: 11, name: '检测波长', value: '254 nm', confidence: 97 },
  { id: 12, name: '柱温', value: '30℃', confidence: 96 },
  { id: 13, name: '流速', value: '1.0 mL/min', confidence: 95 },
  { id: 14, name: '进样量', value: '20 μL', confidence: 98 },
  { id: 15, name: '对照品批号', value: '20240228', confidence: 93 },
  { id: 16, name: '对照品来源', value: '中国药品生物制品检定所', confidence: 90 },
  { id: 17, name: '对照品含量', value: '99.8%', confidence: 94 },
  { id: 18, name: '样品处理方法', value: '取本品20片，精密称定，研细', confidence: 89 },
  { id: 19, name: '称样量', value: '0.5023 g', confidence: 96 },
  { id: 20, name: '溶解定容', value: '置50mL量瓶中，甲醇溶解并稀释至刻度', confidence: 87 },
  { id: 21, name: '稀释倍数', value: '10倍', confidence: 85 },
  { id: 22, name: '对照品溶液浓度', value: '0.1024 mg/mL', confidence: 92 },
  { id: 23, name: '样品溶液浓度', value: '0.0987 mg/mL', confidence: 91 },
  { id: 24, name: '峰面积对照品', value: '2546789', confidence: 98 },
  { id: 25, name: '峰面积样品', value: '2456789', confidence: 97 },
  { id: 26, name: '含量测定结果1', value: '98.5%', confidence: 96 },
  { id: 27, name: '含量测定结果2', value: '99.2%', confidence: 95 },
  { id: 28, name: '含量测定结果3', value: '98.8%', confidence: 94 },
  { id: 29, name: '平均含量', value: '98.8%', confidence: 97 },
  { id: 30, name: 'RSD', value: '0.36%', confidence: 93 },
  { id: 31, name: '规定限度', value: '95.0%-105.0%', confidence: 91 },
  { id: 32, name: '结论', value: '符合规定', confidence: 99 },
  { id: 33, name: '仪器名称', value: '高效液相色谱仪', confidence: 96 },
  { id: 34, name: '仪器型号', value: 'Agilent 1260', confidence: 95 },
  { id: 35, name: '仪器编号', value: 'YQ-2019-003', confidence: 92 },
  { id: 36, name: '实验室温度', value: '25℃', confidence: 94 },
  { id: 37, name: '实验室湿度', value: '55%', confidence: 90 },
  { id: 38, name: '标准物质名称', value: '阿司匹林对照品', confidence: 93 },
  { id: 39, name: '标准物质批号', value: '20240228', confidence: 91 },
  { id: 40, name: '标准物质有效期', value: '2026-02-27', confidence: 88 },
  { id: 41, name: '试剂名称', value: '甲醇', confidence: 97 },
  { id: 42, name: '试剂批号', value: '20240301', confidence: 94 },
  { id: 43, name: '试剂厂商', value: '德国Merck公司', confidence: 92 },
  { id: 44, name: '试剂纯度', value: '色谱纯', confidence: 96 },
  { id: 45, name: '磷酸来源', value: '国药集团化学试剂有限公司', confidence: 89 },
  { id: 46, name: '磷酸批号', value: '20240215', confidence: 87 },
  { id: 47, name: '超纯水设备', value: 'Milli-Q Academic', confidence: 91 },
  { id: 48, name: '超纯水日期', value: '2024-03-20', confidence: 90 },
  { id: 49, name: '滤膜规格', value: '0.45μm', confidence: 95 },
  { id: 50, name: '滤膜材质', value: '尼龙', confidence: 93 },
  { id: 51, name: '离心机转速', value: '10000 rpm', confidence: 92 },
  { id: 52, name: '离心时间', value: '10 min', confidence: 94 },
  { id: 53, name: '超声时间', value: '15 min', confidence: 91 },
  { id: 54, name: '超声功率', value: '250 W', confidence: 88 },
  { id: 55, name: '水浴温度', value: '25℃', confidence: 86 },
  { id: 56, name: '水浴时间', value: '30 min', confidence: 85 },
  { id: 57, name: '室温平衡时间', value: '60 min', confidence: 84 },
  { id: 58, name: '进样顺序', value: '对照品-样品-对照品-样品', confidence: 90 },
  { id: 59, name: '对照品进样次数', value: '2', confidence: 97 },
  { id: 60, name: '样品进样次数', value: '2', confidence: 96 },
  { id: 61, name: '系统适用性试验', value: '符合要求', confidence: 95 },
  { id: 62, name: '理论板数', value: '12568', confidence: 94 },
  { id: 63, name: '分离度', value: '2.5', confidence: 93 },
  { id: 64, name: '拖尾因子', value: '1.02', confidence: 92 },
  { id: 65, name: '重复性RSD', value: '0.28%', confidence: 91 },
  { id: 66, name: '线性范围', value: '0.05-0.15 mg/mL', confidence: 89 },
  { id: 67, name: '相关系数', value: '0.9999', confidence: 96 },
  { id: 68, name: '回收率', value: '99.5%', confidence: 90 }
])

const totalPages = computed(() => Math.ceil(extractedFields.value.length / pageSize))

const paginatedFields = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return extractedFields.value.slice(start, end)
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    uploadedFiles.value.push({
      name: file.name,
      size: formatFileSize(file.size),
      status: 'pending'
    })
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    const file = files[0]
    uploadedFiles.value.push({
      name: file.name,
      size: formatFileSize(file.size),
      status: 'pending'
    })
  }
}

const removeFile = (index: number) => {
  uploadedFiles.value.splice(index, 1)
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

defineExpose({ getManifest: () => manifest })
</script>
