<template>
  <div class="space-y-6">
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-md">
          <i class="fas fa-sliders-h text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">AI模型配置</h2>
      </div>

      <!-- 模型选择 -->
      <div class="mb-8">
        <h3 class="text-base font-bold text-slate-700 mb-4">模型选择</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <span class="font-semibold text-slate-600">当前主模型</span>
            <div class="flex items-center gap-3">
              <select v-model="primaryModel" class="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/40">
                <option>GPT-4 Turbo</option>
                <option>Claude 3 Opus</option>
                <option>ERNIE 4.0</option>
                <option>Qwen-Max</option>
              </select>
              <div class="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span class="text-sm text-emerald-700 font-medium">服务正常</span>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <span class="font-semibold text-slate-600">备用模型</span>
            <select v-model="backupModel" class="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/40">
              <option>GPT-3.5 Turbo</option>
              <option>Claude 3 Sonnet</option>
              <option>ERNIE 3.5</option>
              <option>Qwen-Plus</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 模型参数 -->
      <div class="mb-8">
        <h3 class="text-base font-bold text-slate-700 mb-4">模型参数</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <span class="font-semibold text-slate-600">温度参数 (Temperature)</span>
            <div class="flex items-center gap-3">
              <input type="range" v-model="temperature" min="0" max="1" step="0.1" class="w-48 accent-teal-500" />
              <span class="text-sm text-slate-500 w-24">{{ temperature }} ({{ temperatureDesc }})</span>
            </div>
          </div>
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <span class="font-semibold text-slate-600">最大输出长度</span>
            <div class="flex items-center gap-2">
              <input type="number" v-model="maxTokens" class="w-24 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/40" />
              <span class="text-sm text-slate-500">tokens</span>
            </div>
          </div>
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <span class="font-semibold text-slate-600">启用实时归类</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="realtimeClassify" class="sr-only peer" />
              <div class="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-teal-500"></div>
            </label>
          </div>
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <span class="font-semibold text-slate-600">启用多模型验证</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="multiModelValidation" class="sr-only peer" />
              <div class="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-teal-500"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex gap-3">
        <button @click="saveConfig" class="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
          <i class="fas fa-check"></i>保存配置
        </button>
        <button @click="testConnection" class="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
          <i class="fas fa-bolt"></i>测试模型连接
        </button>
        <button @click="resetConfig" class="px-5 py-2.5 bg-gradient-to-r from-slate-400 to-slate-500 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
          <i class="fas fa-history"></i>重置为默认
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Manifest } from '@/build/types'

const manifest: Manifest = {
  name: 'ModelConfig',
  type: 'component',
  description: 'AI模型配置组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const primaryModel = ref('GPT-4 Turbo')
const backupModel = ref('GPT-3.5 Turbo')
const temperature = ref(0.2)
const maxTokens = ref(1000)
const realtimeClassify = ref(true)
const multiModelValidation = ref(false)

const temperatureDesc = computed(() => {
  if (temperature.value <= 0.3) return '高一致性'
  if (temperature.value <= 0.6) return '平衡'
  return '高创造性'
})

const saveConfig = () => alert('配置已保存！')
const testConnection = () => alert('模型连接测试成功！')
const resetConfig = () => {
  primaryModel.value = 'GPT-4 Turbo'
  backupModel.value = 'GPT-3.5 Turbo'
  temperature.value = 0.2
  maxTokens.value = 1000
  realtimeClassify.value = true
  multiModelValidation.value = false
  alert('已重置为默认配置')
}

defineExpose({ getManifest: () => manifest })
</script>
