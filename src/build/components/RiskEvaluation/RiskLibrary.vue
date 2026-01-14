<template>
  <div class="space-y-6">
    <!-- 风险要素库统计 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="text-center p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl">
          <div class="text-2xl font-bold text-slate-700">4</div>
          <div class="text-xs text-slate-500 mt-1">阶段数</div>
        </div>
        <div class="text-center p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl">
          <div class="text-2xl font-bold text-slate-700">15</div>
          <div class="text-xs text-slate-500 mt-1">大类数</div>
        </div>
        <div class="text-center p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl">
          <div class="text-2xl font-bold text-slate-700">58</div>
          <div class="text-xs text-slate-500 mt-1">风险要素</div>
        </div>
        <div class="text-center p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl">
          <div class="text-2xl font-bold text-slate-700">12</div>
          <div class="text-xs text-slate-500 mt-1">已使用要素</div>
        </div>
        <div class="text-center p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl">
          <div class="text-2xl font-bold text-slate-700">3</div>
          <div class="text-xs text-slate-500 mt-1">待审要素</div>
        </div>
      </div>
    </section>

    <!-- 搜索和筛选 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex flex-wrap gap-4 items-end">
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-semibold text-slate-600 mb-2">搜索风险要素</label>
          <input
            type="text"
            placeholder="输入风险要素名称或编号..."
            class="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40"
          >
        </div>
        <div class="w-40">
          <label class="block text-sm font-semibold text-slate-600 mb-2">所属阶段</label>
          <select class="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40">
            <option value="">全部阶段</option>
            <option value="1">阶段1：设计阶段</option>
            <option value="2">阶段2：填写/产生阶段</option>
            <option value="3">阶段3：审核与管理阶段</option>
            <option value="4">阶段4：归档与处置阶段</option>
          </select>
        </div>
        <button class="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-xl shadow-md transition-all">
          <i class="fas fa-search mr-2"></i>搜索
        </button>
        <button class="px-5 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-semibold rounded-xl shadow-md transition-all">
          <i class="fas fa-plus mr-2"></i>新增要素
        </button>
      </div>
    </section>

    <!-- 风险要素列表 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">编号</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">风险要素名称</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">所属阶段</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">所属类别</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">平均IWRPN</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">出现次数</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">状态</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in riskElements" :key="item.id" class="border-b border-slate-100 hover:bg-slate-50/50">
              <td class="py-3 px-4 text-sm font-mono text-slate-600">{{ item.code }}</td>
              <td class="py-3 px-4 text-sm font-medium text-slate-700">{{ item.name }}</td>
              <td class="py-3 px-4 text-sm text-slate-600">{{ item.phase }}</td>
              <td class="py-3 px-4 text-sm text-slate-600">{{ item.category }}</td>
              <td class="py-3 px-4 text-sm font-semibold text-slate-700">{{ item.avgIwrpn }}</td>
              <td class="py-3 px-4 text-sm text-slate-600">{{ item.count }}次</td>
              <td class="py-3 px-4">
                <span :class="item.statusClass">{{ item.status }}</span>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center gap-1">
                  <button class="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                    <i class="fas fa-history"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Manifest } from '@/build/types'

const manifest: Manifest = {
  name: 'RiskEvaluationRiskLibrary',
  type: 'component',
  description: '风险要素库管理组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const riskElements = ref([
  {
    id: 1,
    code: '4.1',
    name: '数据记录不完整',
    phase: '阶段2：填写/产生阶段',
    category: '完整性风险',
    avgIwrpn: 245,
    count: 32,
    status: '已启用',
    statusClass: 'px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200'
  },
  {
    id: 2,
    code: '4.2',
    name: '关键信息缺失',
    phase: '阶段2：填写/产生阶段',
    category: '完整性风险',
    avgIwrpn: 198,
    count: 28,
    status: '已启用',
    statusClass: 'px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200'
  },
  {
    id: 3,
    code: '6.2',
    name: '人员培训不足',
    phase: '阶段2：填写/产生阶段',
    category: '人员相关风险',
    avgIwrpn: 185,
    count: 24,
    status: '已启用',
    statusClass: 'px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200'
  },
  {
    id: 4,
    code: '11.1',
    name: '审核不及时',
    phase: '阶段3：审核与管理阶段',
    category: '审核机制风险',
    avgIwrpn: 156,
    count: 22,
    status: '已启用',
    statusClass: 'px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200'
  },
  {
    id: 5,
    code: '7.1',
    name: '设备校准超期',
    phase: '阶段2：填写/产生阶段',
    category: '设备与设施风险',
    avgIwrpn: 142,
    count: 20,
    status: '已启用',
    statusClass: 'px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200'
  }
])

defineExpose({ getManifest: () => manifest })
</script>
