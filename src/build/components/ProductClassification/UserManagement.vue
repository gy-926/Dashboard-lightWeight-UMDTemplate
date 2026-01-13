<template>
  <div class="space-y-6">
    <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-md">
          <i class="fas fa-user-shield text-white"></i>
        </div>
        <h2 class="text-lg font-bold text-slate-700">用户与权限管理</h2>
      </div>

      <!-- 操作栏 -->
      <div class="flex justify-between items-center mb-6">
        <button class="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
          <i class="fas fa-user-plus"></i>添加新用户
        </button>
        <div class="flex gap-3">
          <div class="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
            <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span class="text-sm text-emerald-700 font-medium">在线用户: {{ onlineUsers }}</span>
          </div>
          <div class="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
            <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span class="text-sm text-blue-700 font-medium">活跃会话: {{ activeSessions }}</span>
          </div>
        </div>
      </div>

      <!-- 用户表格 -->
      <div class="overflow-auto rounded-xl border border-slate-100">
        <table class="min-w-full text-left text-sm">
          <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th class="px-4 py-3">用户名</th>
              <th class="px-4 py-3">角色</th>
              <th class="px-4 py-3">部门</th>
              <th class="px-4 py-3">最后登录</th>
              <th class="px-4 py-3">状态</th>
              <th class="px-4 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.name" class="border-b border-slate-50 text-slate-700 hover:bg-slate-50/50">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                    {{ user.name.charAt(0) }}
                  </div>
                  <span class="font-medium text-slate-800">{{ user.name }}</span>
                </div>
              </td>
              <td class="px-4 py-3">
                <span class="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold">{{ user.role }}</span>
              </td>
              <td class="px-4 py-3 text-slate-600">{{ user.department }}</td>
              <td class="px-4 py-3 text-slate-500">{{ user.lastLogin }}</td>
              <td class="px-4 py-3">
                <span class="flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full" :class="user.status === '在线' ? 'bg-emerald-500' : 'bg-slate-300'"></span>
                  <span :class="user.status === '在线' ? 'text-emerald-700' : 'text-slate-500'" class="text-sm font-medium">{{ user.status }}</span>
                </span>
              </td>
              <td class="px-4 py-3 text-right">
                <div class="flex justify-end gap-2">
                  <button class="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-500 hover:text-white text-slate-600 transition-all flex items-center justify-center" title="编辑用户">
                    <i class="fas fa-user-edit text-xs"></i>
                  </button>
                  <button class="w-8 h-8 rounded-full bg-slate-100 hover:bg-amber-500 hover:text-white text-slate-600 transition-all flex items-center justify-center" title="重置密码">
                    <i class="fas fa-key text-xs"></i>
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
  name: 'UserManagement',
  type: 'component',
  description: '用户与权限管理组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const onlineUsers = ref(2)
const activeSessions = ref(2)

const users = ref([
  { name: '吴璟', role: '系统管理员', department: '技术部', lastLogin: '2025-01-13 14:30', status: '在线' },
  { name: '章回', role: '系统管理员', department: '技术部', lastLogin: '2025-01-13 11:20', status: '在线' },
  { name: '李明', role: '归类专员', department: '报关部', lastLogin: '2025-01-12 16:45', status: '离线' },
])

defineExpose({ getManifest: () => manifest })
</script>
