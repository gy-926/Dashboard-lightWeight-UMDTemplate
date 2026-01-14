<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between">
      <!-- <div>
        <h2 class="text-2xl font-bold text-slate-800">系统设置</h2>
        <p class="text-slate-500 mt-1">配置AI识别参数、风险评估规则和系统信息</p>
      </div> -->
      <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2">
        <i class="fas fa-save"></i>
        保存设置
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- AI识别参数配置 -->
      <div class="lg:col-span-2 space-y-6">
        <!-- AI识别参数 -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-md">
              <i class="fas fa-brain text-white"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-700">AI识别参数配置</h3>
              <p class="text-sm text-slate-500">调整AI模型识别灵敏度和处理策略</p>
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="text-sm font-medium text-slate-600">识别置信度阈值</label>
                <span class="text-sm font-medium text-blue-600">{{ aiConfig.confidenceThreshold }}%</span>
              </div>
              <input
                type="range"
                v-model="aiConfig.confidenceThreshold"
                min="50"
                max="100"
                class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              >
              <p class="text-xs text-slate-500 mt-1">低于此置信度的识别结果将被标记为需要人工审核</p>
            </div>

            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="text-sm font-medium text-slate-600">自动纠错强度</label>
                <span class="text-sm font-medium text-blue-600">{{ aiConfig.autoCorrectStrength }}%</span>
              </div>
              <input
                type="range"
                v-model="aiConfig.autoCorrectStrength"
                min="0"
                max="100"
                class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              >
              <p class="text-xs text-slate-500 mt-1">AI自动纠正识别错误的程度，0表示不自动纠正</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-600 mb-2">最大并行处理数</label>
                <input
                  type="number"
                  v-model="aiConfig.maxParallelProcessing"
                  min="1"
                  max="10"
                  class="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-600 mb-2">图像预处理增强</label>
                <select v-model="aiConfig.imageEnhancement" class="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="none">无</option>
                  <option value="basic">基础增强</option>
                  <option value="advanced">高级增强</option>
                </select>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <i class="fas fa-language text-blue-600"></i>
                </div>
                <div>
                  <div class="font-medium text-slate-700">多语言识别支持</div>
                  <div class="text-xs text-slate-500">识别中英文混合的原始记录</div>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="aiConfig.multiLanguageSupport" class="sr-only peer">
                <div class="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- 风险阈值设置 -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
              <i class="fas fa-exclamation-triangle text-white"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-700">风险阈值设置</h3>
              <p class="text-sm text-slate-500">配置IWRPN风险等级判定阈值</p>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-24 text-sm font-medium text-slate-600">高风险</div>
              <div class="flex-1 flex items-center gap-2">
                <input
                  type="number"
                  v-model="riskThresholds.high"
                  class="w-20 px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-center"
                >
                <span class="text-slate-500">以上</span>
              </div>
              <div class="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <i class="fas fa-exclamation-circle text-red-600"></i>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-24 text-sm font-medium text-slate-600">中风险</div>
              <div class="flex-1 flex items-center gap-2">
                <input
                  type="number"
                  v-model="riskThresholds.medium"
                  class="w-20 px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-center"
                >
                <span class="text-slate-500">-</span>
                <input
                  type="number"
                  v-model="riskThresholds.high"
                  class="w-20 px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-center"
                >
              </div>
              <div class="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <i class="fas fa-exclamation-triangle text-amber-600"></i>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-24 text-sm font-medium text-slate-600">低风险</div>
              <div class="flex-1 flex items-center gap-2">
                <input
                  type="number"
                  v-model="riskThresholds.low"
                  class="w-20 px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-center"
                >
                <span class="text-slate-500">-</span>
                <input
                  type="number"
                  v-model="riskThresholds.medium"
                  class="w-20 px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-center"
                >
              </div>
              <div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <i class="fas fa-check-circle text-emerald-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 系统信息 -->
      <div class="space-y-6">
        <!-- 系统信息卡片 -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md">
              <i class="fas fa-info-circle text-white"></i>
            </div>
            <h3 class="text-lg font-bold text-slate-700">系统信息</h3>
          </div>

          <div class="space-y-4">
            <div class="flex items-center justify-between py-2 border-b border-slate-100">
              <span class="text-sm text-slate-500">系统版本</span>
              <span class="text-sm font-medium text-slate-700">v1.0.0</span>
            </div>
            <div class="flex items-center justify-between py-2 border-b border-slate-100">
              <span class="text-sm text-slate-500">AI模型版本</span>
              <span class="text-sm font-medium text-slate-700">v2.3.1</span>
            </div>
            <div class="flex items-center justify-between py-2 border-b border-slate-100">
              <span class="text-sm text-slate-500">数据库版本</span>
              <span class="text-sm font-medium text-slate-700">PostgreSQL 15.2</span>
            </div>
            <div class="flex items-center justify-between py-2 border-b border-slate-100">
              <span class="text-sm text-slate-500">识别引擎</span>
              <span class="text-sm font-medium text-slate-700">DeepOCR v1.2</span>
            </div>
            <div class="flex items-center justify-between py-2">
              <span class="text-sm text-slate-500">系统状态</span>
              <span class="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">正常运行</span>
            </div>
          </div>
        </div>

        <!-- 数据统计 -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
              <i class="fas fa-chart-bar text-white"></i>
            </div>
            <h3 class="text-lg font-bold text-slate-700">数据统计</h3>
          </div>

          <div class="space-y-4">
            <div class="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
              <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <i class="fas fa-file-alt text-blue-600"></i>
              </div>
              <div>
                <div class="text-lg font-bold text-slate-800">1,234</div>
                <div class="text-xs text-slate-500">总记录数</div>
              </div>
            </div>
            <div class="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
              <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <i class="fas fa-brain text-purple-600"></i>
              </div>
              <div>
                <div class="text-lg font-bold text-slate-800">5,678</div>
                <div class="text-xs text-slate-500">识别次数</div>
              </div>
            </div>
            <div class="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
              <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <i class="fas fa-hdd text-emerald-600"></i>
              </div>
              <div>
                <div class="text-lg font-bold text-slate-800">2.5 GB</div>
                <div class="text-xs text-slate-500">存储使用</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 快捷操作 -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-md">
              <i class="fas fa-bolt text-white"></i>
            </div>
            <h3 class="text-lg font-bold text-slate-700">快捷操作</h3>
          </div>

          <div class="space-y-3">
            <button class="w-full px-4 py-3 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-left transition-all duration-300 flex items-center gap-3">
              <i class="fas fa-sync-alt text-slate-400 group-hover:text-blue-500"></i>
              <span class="text-sm font-medium text-slate-700">清除缓存</span>
            </button>
            <button class="w-full px-4 py-3 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-left transition-all duration-300 flex items-center gap-3">
              <i class="fas fa-download text-slate-400"></i>
              <span class="text-sm font-medium text-slate-700">备份数据</span>
            </button>
            <button class="w-full px-4 py-3 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-left transition-all duration-300 flex items-center gap-3">
              <i class="fas fa-history text-slate-400"></i>
              <span class="text-sm font-medium text-slate-700">查看日志</span>
            </button>
            <button class="w-full px-4 py-3 bg-slate-100 hover:bg-red-50 hover:text-red-600 rounded-xl text-left transition-all duration-300 flex items-center gap-3">
              <i class="fas fa-trash-alt text-slate-400 group-hover:text-red-500"></i>
              <span class="text-sm font-medium text-slate-700">清除历史数据</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Manifest } from '@/build/types'

const manifest: Manifest = {
  name: 'RecordRecognitionSettings',
  type: 'component',
  description: '系统设置组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const aiConfig = reactive({
  confidenceThreshold: 85,
  autoCorrectStrength: 50,
  maxParallelProcessing: 5,
  imageEnhancement: 'advanced',
  multiLanguageSupport: true
})

const riskThresholds = reactive({
  high: 200,
  medium: 100,
  low: 50
})

defineExpose({ getManifest: () => manifest })
</script>
