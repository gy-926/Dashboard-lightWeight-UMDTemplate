<template>
  <div class="space-y-6">
    <!-- 用户统计 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
          <div class="text-3xl font-bold">{{ userStats.total }}</div>
          <div class="text-sm opacity-80 mt-1">用户总数</div>
        </div>
        <div class="text-center p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl text-white">
          <div class="text-3xl font-bold">{{ userStats.active }}</div>
          <div class="text-sm opacity-80 mt-1">活跃用户</div>
        </div>
        <div class="text-center p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl text-white">
          <div class="text-3xl font-bold">{{ userStats.admins }}</div>
          <div class="text-sm opacity-80 mt-1">管理员</div>
        </div>
        <div class="text-center p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
          <div class="text-3xl font-bold">{{ userStats.thisMonth }}</div>
          <div class="text-sm opacity-80 mt-1">本月新增</div>
        </div>
      </div>
    </section>

    <!-- 用户管理表格 -->
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md">
            <i class="fas fa-users-cog text-white"></i>
          </div>
          <h2 class="text-lg font-bold text-slate-700">用户管理</h2>
        </div>
        <button class="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2">
          <i class="fas fa-plus"></i>
          添加用户
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">用户ID</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">用户名</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">姓名</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">角色</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">所属部门</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">状态</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">最后登录</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="border-b border-slate-100 hover:bg-slate-50/50">
              <td class="py-3 px-4 text-sm font-mono text-slate-600">{{ user.id }}</td>
              <td class="py-3 px-4 text-sm font-medium text-slate-700">{{ user.username }}</td>
              <td class="py-3 px-4 text-sm text-slate-600">{{ user.name }}</td>
              <td class="py-3 px-4">
                <span :class="user.roleClass">{{ user.role }}</span>
              </td>
              <td class="py-3 px-4 text-sm text-slate-600">{{ user.department }}</td>
              <td class="py-3 px-4">
                <span :class="user.statusClass">{{ user.status }}</span>
              </td>
              <td class="py-3 px-4 text-sm text-slate-500">{{ user.lastLogin }}</td>
              <td class="py-3 px-4">
                <div class="flex items-center gap-1">
                  <button class="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="编辑">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="重置密码">
                    <i class="fas fa-key"></i>
                  </button>
                  <button class="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="权限设置">
                    <i class="fas fa-shield-alt"></i>
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
  name: 'RiskEvaluationUserManagement',
  type: 'component',
  description: '风险评价系统用户管理组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const userStats = ref({
  total: 28,
  active: 25,
  admins: 5,
  thisMonth: 2
})

const users = ref([
  {
    id: 'U001',
    username: 'admin',
    name: '系统管理员',
    role: '超级管理员',
    roleClass: 'px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200',
    department: '质量管理部',
    status: '活跃',
    statusClass: 'px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200',
    lastLogin: '2024-03-25 09:15'
  },
  {
    id: 'U002',
    username: 'zhangsan',
    name: '张三',
    role: '风险评估员',
    roleClass: 'px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200',
    department: '检测中心',
    status: '活跃',
    statusClass: 'px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200',
    lastLogin: '2024-03-25 14:30'
  },
  {
    id: 'U003',
    username: 'lisi',
    name: '李四',
    role: '审核员',
    roleClass: 'px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200',
    department: '质量管理部',
    status: '活跃',
    statusClass: 'px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200',
    lastLogin: '2024-03-24 16:45'
  },
  {
    id: 'U004',
    username: 'wangwu',
    name: '王五',
    role: '风险评估员',
    roleClass: 'px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200',
    department: '检测中心',
    status: '离线',
    statusClass: 'px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200',
    lastLogin: '2024-03-20 11:20'
  }
])

defineExpose({ getManifest: () => manifest })
</script>
