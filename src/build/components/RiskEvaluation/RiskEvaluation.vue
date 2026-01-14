<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20 flex flex-col">
    <!-- 顶部导航栏 -->
    <header class="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 transition-all duration-300">
      <div class="flex items-center justify-between px-6 h-16">
        <!-- Logo区域 -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
            <i class="fas fa-clipboard-check text-white text-lg"></i>
          </div>
          <span class="font-bold text-lg tracking-wide text-slate-700">原始记录风险评价系统</span>
        </div>

        <!-- 顶部导航菜单 -->
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
            <div class="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-semibold text-xs shadow">
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, shallowRef } from 'vue'
import { Manifest } from '@/build/types'
import Dashboard from './Dashboard.vue'
import RiskIdentification from './RiskIdentification.vue'
import RiskAnalysis from './RiskAnalysis.vue'
import RiskEval from './RiskEval.vue'
import History from './History.vue'
import UserManagement from './UserManagement.vue'
import RiskLibrary from './RiskLibrary.vue'
import ModelConfig from './ModelConfig.vue'
import TemplateManagement from './TemplateManagement.vue'

/**
 * 组件配置声明
 */
const manifest: Manifest = {
  name: 'RiskEvaluation',
  type: 'component',
  description: '原始记录风险评价系统 - 基于IWRPN模型的风险评估管理平台',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

export interface Props {
  userName?: string
  userRole?: string
  defaultPage?: string
}

const props = withDefaults(defineProps<Props>(), {
  userName: '管理员',
  userRole: '管理员',
  defaultPage: 'dashboard'
})

// 响应式状态
const activePage = ref(props.defaultPage)

// 导航配置
const navItems = [
  { id: 'dashboard', label: '系统概览', icon: 'fas fa-tachometer-alt', description: '查看系统整体运行状态和数据统计' },
  { id: 'risk-identification', label: '风险识别', icon: 'fas fa-search', description: '识别和选择原始记录风险要素' },
  { id: 'risk-analysis', label: '风险分析', icon: 'fas fa-chart-bar', description: '对识别的风险进行IWRPN评分分析' },
  { id: 'risk-evaluation', label: '风险评价', icon: 'fas fa-clipboard-check', description: '综合分析结果并给出风险评价' },
  { id: 'history', label: '历史记录', icon: 'fas fa-history', description: '查看和管理历史风险评价记录' },
  { id: 'user-management', label: '用户管理', icon: 'fas fa-users-cog', description: '管理系统用户和权限' },
  { id: 'risk-library', label: '风险要素库', icon: 'fas fa-database', description: '维护风险要素数据库' },
  { id: 'model-config', label: '量化模型配置', icon: 'fas fa-sliders-h', description: '配置IWRPN量化模型参数' },
  { id: 'template-management', label: '模板管理', icon: 'fas fa-file-alt', description: '管理原始记录模板' }
]

// 页面标题映射
const pageTitles: Record<string, string> = {
  'dashboard': '系统概览',
  'risk-identification': '原始记录风险识别',
  'risk-analysis': '风险分析',
  'risk-evaluation': '风险评价',
  'history': '历史记录',
  'user-management': '用户与权限管理',
  'risk-library': '风险要素库管理',
  'model-config': '量化模型配置',
  'template-management': '原始记录模板管理'
}

// 页面描述映射
const pageDescriptions: Record<string, string> = {
  'dashboard': '查看系统整体运行状态和数据统计',
  'risk-identification': '识别和选择原始记录风险要素，进行风险要素提取',
  'risk-analysis': '对识别的风险进行IWRPN评分分析',
  'risk-evaluation': '综合分析结果并给出风险评价',
  'history': '查看和管理历史风险评价记录',
  'user-management': '管理系统用户和权限',
  'risk-library': '维护风险要素数据库',
  'model-config': '配置IWRPN量化模型参数',
  'template-management': '管理原始记录模板'
}

// 组件映射
const componentMap: Record<string, any> = {
  'dashboard': Dashboard,
  'risk-identification': RiskIdentification,
  'risk-analysis': RiskAnalysis,
  'risk-evaluation': RiskEval,
  'history': History,
  'user-management': UserManagement,
  'risk-library': RiskLibrary,
  'model-config': ModelConfig,
  'template-management': TemplateManagement
}

const currentComponent = computed(() => componentMap[activePage.value] || Dashboard)
const pageTitle = computed(() => pageTitles[activePage.value] || '原始记录风险评价系统')
const pageDescription = computed(() => pageDescriptions[activePage.value] || '')

defineExpose({
  getManifest: () => manifest,
  setActivePage: (page: string) => { activePage.value = page },
  activePage
})
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
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(249, 115, 22, 0.1));
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
  color: #f59e0b;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(249, 115, 22, 0.15));
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
  background: linear-gradient(90deg, #f59e0b, #f97316);
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

  .page-description {
    display: none;
  }
}
</style>
