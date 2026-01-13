<template>
  <div class="space-y-6">
    <!-- 批量导入卡片 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-md">
          <i class="fas fa-file-import text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">批量商品导入</h2>
      </div>

      <!-- 文件上传区域 -->
      <div
        @click="triggerFileUpload"
        @dragover.prevent="isDragover = true"
        @dragleave="isDragover = false"
        @drop.prevent="handleFileDrop"
        class="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300"
        :class="isDragover ? 'border-teal-400 bg-teal-50/50' : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50/50'"
      >
        <i class="fas fa-cloud-upload-alt text-5xl text-teal-400 mb-4"></i>
        <h3 class="text-lg font-semibold text-slate-700 mb-2">
          {{ uploadedFile ? `已选择: ${uploadedFile.name}` : '拖拽文件到这里或点击上传' }}
        </h3>
        <p class="text-sm text-slate-500">支持 CSV、Excel、TXT 格式，每次最多处理1000条商品信息</p>
        <input type="file" ref="fileInput" @change="handleFileSelect" accept=".csv,.xlsx,.xls,.txt" class="hidden" />
        <button class="mt-4 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
          <i class="fas fa-folder-open mr-2"></i>选择文件
        </button>
      </div>

      <!-- 数据表格 -->
      <div class="mt-6 overflow-auto rounded-xl border border-slate-100">
        <table class="min-w-full text-left text-sm">
          <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th class="px-4 py-3 whitespace-nowrap">序号</th>
              <th class="px-4 py-3 whitespace-nowrap">商品名称</th>
              <th class="px-4 py-3 whitespace-nowrap">商品描述</th>
              <th class="px-4 py-3 whitespace-nowrap">10位HS编码(参考)</th>
              <th class="px-4 py-3 whitespace-nowrap">2位</th>
              <th class="px-4 py-3 whitespace-nowrap">4位</th>
              <th class="px-4 py-3 whitespace-nowrap">6位</th>
              <th class="px-4 py-3 whitespace-nowrap">8位</th>
              <th class="px-4 py-3 whitespace-nowrap">10位HS编码</th>
              <th class="px-4 py-3 whitespace-nowrap text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in batchProducts" :key="product.id" class="border-b border-slate-50 text-slate-700 hover:bg-slate-50/50">
              <td class="px-4 py-3 text-slate-500">{{ product.id }}</td>
              <td class="px-4 py-3 font-medium text-slate-800">{{ product.name }}</td>
              <td class="px-4 py-3 text-slate-600 max-w-xs truncate">{{ product.desc }}</td>
              <td class="px-4 py-3 font-mono text-teal-700 font-semibold">{{ product.refCode }}</td>
              <td class="px-4 py-3 font-mono text-slate-600">{{ product.hs2 }}</td>
              <td class="px-4 py-3 font-mono text-slate-600">{{ product.hs4 }}</td>
              <td class="px-4 py-3 font-mono text-slate-600">{{ product.hs6 }}</td>
              <td class="px-4 py-3 font-mono text-slate-600">{{ product.hs8 }}</td>
              <td class="px-4 py-3 font-mono text-teal-700 font-semibold">{{ product.hs10 }}</td>
              <td class="px-4 py-3 text-right">
                <div class="flex justify-end gap-2">
                  <button class="w-8 h-8 rounded-full bg-slate-100 hover:bg-teal-500 hover:text-white text-slate-600 transition-all flex items-center justify-center" title="单独归类">
                    <i class="fas fa-tag text-xs"></i>
                  </button>
                  <button class="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-500 hover:text-white text-slate-600 transition-all flex items-center justify-center" title="查看详情">
                    <i class="fas fa-eye text-xs"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!batchProducts.length">
              <td colspan="10" class="px-4 py-10 text-center text-slate-400">暂无数据，请上传文件</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-between mt-6">
        <button
          @click="startBatchClassify"
          :disabled="isBatchProcessing || !batchProducts.length"
          class="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <i :class="isBatchProcessing ? 'fas fa-spinner fa-spin' : 'fas fa-play-circle'"></i>
          {{ isBatchProcessing ? '批量归类中...' : '开始批量归类' }}
        </button>
        <button
          @click="exportAllResults"
          class="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <i class="fas fa-file-export"></i>
          导出全部结果
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Manifest } from '@/build/types'

const manifest: Manifest = {
  name: 'BatchClassify',
  type: 'component',
  description: '批量商品信息智能归类组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

interface BatchProduct {
  id: number
  name: string
  desc: string
  refCode: string
  hs2: string
  hs4: string
  hs6: string
  hs8: string
  hs10: string
}

const fileInput = ref<HTMLInputElement>()
const uploadedFile = ref<File | null>(null)
const isDragover = ref(false)
const isBatchProcessing = ref(false)

const batchProducts = ref<BatchProduct[]>([
  { id: 1, name: '木制工艺品（旧）', desc: '木制，柚木制,榉木，装饰用', refCode: '4420199090', hs2: '44', hs4: '4420', hs6: '442011', hs8: '', hs10: '4420199090' },
  { id: 2, name: '木炭', desc: '硬杂木制，未活化，木炭85%', refCode: '4402900010', hs2: '44', hs4: '4402', hs6: '440290', hs8: '44029000', hs10: '4402900010' },
  { id: 3, name: '椴木单板', desc: '饰面用，辽椴 Tilia mandshurica', refCode: '4408901290', hs2: '44', hs4: '4408', hs6: '440890', hs8: '44089012', hs10: '4408901290' },
  { id: 4, name: '针叶木木片', desc: '云杉PICEA，制浆用', refCode: '4401210090', hs2: '44', hs4: '4401', hs6: '440121', hs8: '44012100', hs10: '4401210090' },
  { id: 5, name: '柚木地板', desc: '已装拼，柚木Tectona grandis', refCode: '4418750090', hs2: '44', hs4: '4418', hs6: '441875', hs8: '44187500', hs10: '4418750090' },
])

const triggerFileUpload = () => fileInput.value?.click()

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.[0]) uploadedFile.value = target.files[0]
}

const handleFileDrop = (e: DragEvent) => {
  isDragover.value = false
  if (e.dataTransfer?.files?.[0]) uploadedFile.value = e.dataTransfer.files[0]
}

const startBatchClassify = async () => {
  isBatchProcessing.value = true
  await new Promise(r => setTimeout(r, 2000))
  isBatchProcessing.value = false
  alert(`批量归类完成！已处理 ${batchProducts.value.length} 条商品信息。`)
}

const exportAllResults = () => alert('导出全部结果...')

defineExpose({ getManifest: () => manifest })
</script>
