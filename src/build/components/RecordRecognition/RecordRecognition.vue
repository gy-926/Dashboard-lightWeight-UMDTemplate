<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex flex-col">
    <!-- 顶部导航栏 -->
    <header class="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 transition-all duration-300">
      <div class="flex items-center justify-between px-6 h-16">
        <!-- Logo区域 -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
            <i class="fas fa-microscope text-white text-lg"></i>
          </div>
          <span class="font-bold text-lg tracking-wide text-slate-700">纸质原始记录智能识别</span>
        </div>

        <!-- 导航菜单 -->
        <nav class="flex items-center gap-1">
          <button
            v-for="item in navItems"
            :key="item.id"
            @click="activePage = item.id"
            class="nav-item"
            :class="{ active: activePage === item.id }"
          >
            <i :class="item.icon" class="text-sm"></i>
            <span>{{ item.label }}</span>
            <div class="nav-indicator" :class="{ active: activePage === item.id }"></div>
          </button>
        </nav>

        <!-- 用户信息 -->
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 hover:bg-slate-200/80 transition-colors">
            <div class="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs shadow">
              管
            </div>
            <span class="text-sm font-medium text-slate-600">管理员</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="flex-1 p-6">
      <!-- 页面标题 -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-700">{{ pageTitle }}</h1>
          <p class="text-sm text-slate-500 mt-1">{{ pageDescription }}</p>
        </div>
        <div class="flex items-center gap-2 text-sm text-slate-400">
          <i class="fas fa-home"></i>
          <span>/</span>
          <span class="text-slate-600">{{ pageTitle }}</span>
        </div>
      </div>

      <!-- 页面内容 -->
      <transition name="page" mode="out-in">
        <component :is="currentComponent" :key="activePage" />
      </transition>
    </main>

    <!-- 页脚 -->
    <!-- <footer class="py-4 border-t border-slate-200/50 bg-white/50 backdrop-blur-sm">
      <div class="flex items-center justify-between px-6 text-sm text-slate-500">
        <div class="flex items-center gap-2">
          <i class="fas fa-flask text-blue-500"></i>
          <span>纸质原始记录智能识别系统 v1.0.0</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="hover:text-blue-600 cursor-pointer transition-colors">使用帮助</span>
          <span class="hover:text-blue-600 cursor-pointer transition-colors">联系我们</span>
          <span>© 2024 慕塔科技</span>
        </div>
      </div>
    </footer> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Manifest } from '@/build/types'

// 导入子组件
import Dashboard from './Dashboard.vue'
import Upload from './Upload.vue'
import Analysis from './Analysis.vue'
import Records from './Records.vue'
import Settings from './Settings.vue'

const manifest: Manifest = {
  name: 'RecordRecognition',
  type: 'component',
  description: '纸质原始记录智能识别系统组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const activePage = ref('dashboard')

const navItems = [
  { id: 'dashboard', label: '系统概览', icon: 'fas fa-chart-line', description: '查看系统整体运行状态和数据统计' },
  { id: 'upload', label: '原始记录上传和智能识别', icon: 'fas fa-upload', description: '上传纸质原始记录并使用AI智能识别' },
  { id: 'analysis', label: '风险分析', icon: 'fas fa-exclamation-triangle', description: '基于IWRPN模型的风险评估与可视化分析' },
  { id: 'records', label: '记录管理', icon: 'fas fa-folder-open', description: '管理和查看所有原始记录及其识别结果' },
  { id: 'settings', label: '系统设置', icon: 'fas fa-cog', description: '配置AI识别参数和风险评估规则' }
]

const pageTitles: Record<string, string> = {
  'dashboard': '系统概览',
  'upload': '原始记录上传和智能识别',
  'analysis': '风险分析',
  'records': '记录管理',
  'settings': '系统设置'
}

const pageDescriptions: Record<string, string> = {
  'dashboard': '查看系统整体运行状态和数据统计',
  'upload': '上传纸质原始记录并使用AI智能识别',
  'analysis': '基于IWRPN模型的风险评估与可视化分析',
  'records': '管理和查看所有原始记录及其识别结果',
  'settings': '配置AI识别参数和风险评估规则'
}

const componentMap: Record<string, any> = {
  dashboard: Dashboard,
  upload: Upload,
  analysis: Analysis,
  records: Records,
  settings: Settings
}

const currentComponent = computed(() => componentMap[activePage.value] || Dashboard)
const pageTitle = computed(() => pageTitles[activePage.value] || '纸质原始记录智能识别系统')
const pageDescription = computed(() => pageDescriptions[activePage.value] || '')

defineExpose({ getManifest: () => manifest })
</script>

<style scoped>
/* 顶部导航样式 */
.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1));
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-item:hover {
  color: #334155;
  transform: translateY(-1px);
}

.nav-item:hover::before {
  opacity: 1;
}

.nav-item.active {
  color: #2563eb;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.15));
}

.nav-item i {
  position: relative;
  z-index: 1;
}

.nav-item span {
  position: relative;
  z-index: 1;
}

/* 导航指示器 */
.nav-indicator {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 20px;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #6366f1);
  border-radius: 2px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-indicator.active {
  transform: translateX(-50%) scaleX(1);
}

/* 页面过渡动画 */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(15px) scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .nav-item {
    padding: 8px 14px;
    font-size: 13px;
  }

  .nav-item span {
    display: none;
  }

  .nav-item {
    gap: 6px;
  }
}

@media (max-width: 768px) {
  header .flex {
    flex-wrap: wrap;
    height: auto;
    padding: 12px;
    gap: 12px;
  }

  nav {
    order: 3;
    width: 100%;
    overflow-x: auto;
    padding-bottom: 4px;
  }

  .nav-item {
    padding: 8px 12px;
    white-space: nowrap;
  }
}
</style>
