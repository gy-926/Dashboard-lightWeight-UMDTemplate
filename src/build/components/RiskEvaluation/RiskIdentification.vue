<template>
  <div class="space-y-6">
    <!-- 步骤指示器 -->
    <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div class="flex items-center justify-between relative">
        <div class="absolute top-5 left-0 right-0 h-1 bg-slate-200 -z-10"></div>
        <div class="absolute top-5 left-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 -z-10 transition-all" :style="{ width: stepProgress }"></div>

        <div v-for="(step, index) in steps" :key="step.id" class="flex flex-col items-center">
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
            :class="getStepClass(index)"
          >
            <i v-if="index < currentStep - 1" class="fas fa-check"></i>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <span class="text-xs mt-2 font-medium" :class="index <= currentStep - 1 ? 'text-slate-700' : 'text-slate-400'">{{ step.label }}</span>
        </div>
      </div>
    </div>

    <!-- 步骤1: 原始记录导入 -->
    <div v-show="currentStep === 1" class="space-y-6">
      <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md">
            <i class="fas fa-file-upload text-white"></i>
          </div>
          <h2 class="text-lg font-bold text-slate-700">原始记录导入</h2>
        </div>

        <div class="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
          <i class="fas fa-cloud-upload-alt text-4xl text-slate-400 mb-4"></i>
          <h3 class="text-lg font-semibold text-slate-700 mb-2">拖放文件或点击上传</h3>
          <p class="text-sm text-slate-500 mb-4">支持PDF, DOC, DOCX, XLS, XLSX格式，最大50MB</p>
          <button class="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 mx-auto">
            <i class="fas fa-folder-open"></i>
            选择文件
          </button>
        </div>

        <div class="mt-4 space-y-3">
          <div class="flex items-center justify-between p-4 bg-slate-50/80 rounded-xl border border-slate-100">
            <div>
              <div class="font-semibold text-slate-700">LAB-2024-0089.pdf</div>
              <div class="text-sm text-slate-500">上传时间: 2024-03-25 14:30</div>
            </div>
            <span class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">已上传</span>
          </div>
        </div>
      </section>

      <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-md">
            <i class="fas fa-cogs text-white"></i>
          </div>
          <h2 class="text-lg font-bold text-slate-700">风险要素提取</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-semibold text-slate-600 mb-2">原始记录名称</label>
            <input type="text" class="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40" value="实验室检测原始记录 - LAB-2024-0089">
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-600 mb-2">原始记录编号</label>
            <input type="text" class="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40" value="LAB-2024-0089">
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-slate-200">
                <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">要素类型</th>
                <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">提取内容</th>
                <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm w-28">确认</th>
                <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm w-28">重新提取</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in extractedItems" :key="item.type" class="border-b border-slate-100 hover:bg-slate-50/50">
                <td class="py-3 px-4 text-sm font-medium text-slate-700">{{ item.type }}</td>
                <td class="py-3 px-4 text-sm text-slate-600">{{ item.content }}</td>
                <td class="py-3 px-4">
                  <button class="w-full px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-xs font-semibold rounded-lg transition-all">
                    <i class="fas fa-check mr-1"></i> 确认
                  </button>
                </td>
                <td class="py-3 px-4">
                  <button class="w-full px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-500 text-white text-xs font-semibold rounded-lg transition-all">
                    <i class="fas fa-redo mr-1"></i> 重新
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <!-- 步骤2: 风险识别 -->
    <div v-show="currentStep === 2" class="space-y-6">
      <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
            <i class="fas fa-sitemap text-white"></i>
          </div>
          <h2 class="text-lg font-bold text-slate-700">风险要素选择（4阶段15大类58项要素）</h2>
        </div>

        <div class="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          <!-- 阶段1: 设计阶段 -->
          <div v-for="phase in riskPhases" :key="phase.id" class="rounded-xl border border-slate-200 overflow-hidden">
            <div class="bg-gradient-to-r from-slate-100 to-slate-50 px-4 py-3 flex items-center gap-3">
              <i :class="phase.icon" class="text-amber-500"></i>
              <span class="font-bold text-slate-700">{{ phase.name }}（{{ phase.count }}项）</span>
              <button @click="phase.expanded = !phase.expanded" class="ml-auto text-slate-400 hover:text-slate-600 transition-colors">
                <i :class="phase.expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
              </button>
            </div>

            <div v-if="phase.expanded" class="p-4 bg-white/50 space-y-4">
              <div v-for="category in phase.categories" :key="category.id" class="ml-4 border-l-2 border-amber-300 pl-4">
                <div class="flex items-center gap-2 mb-3">
                  <i :class="category.icon" class="text-slate-400 text-sm"></i>
                  <span class="font-semibold text-slate-700 text-sm">{{ category.name }}（{{ category.items.length }}项）</span>
                </div>
                <div class="space-y-2">
                  <div v-for="item in category.items" :key="item.id" class="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      :id="item.id"
                      v-model="item.selected"
                      class="mt-1 w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400"
                    >
                    <div class="flex-1">
                      <label :for="item.id" class="font-medium text-slate-700 text-sm cursor-pointer">{{ item.label }}</label>
                      <p class="text-xs text-slate-500 mt-0.5">{{ item.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-3 mt-6">
          <button class="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2">
            <i class="fas fa-shopping-basket"></i>
            加入风险要素篮
          </button>
          <button class="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2">
            <i class="fas fa-check-double"></i>
            全选当前阶段
          </button>
          <button class="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-500 text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2">
            <i class="fas fa-times-circle"></i>
            清空选择
          </button>
        </div>
      </section>

      <!-- 已选风险要素篮 -->
      <section class="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-md">
            <i class="fas fa-shopping-basket text-white"></i>
          </div>
          <h2 class="text-lg font-bold text-slate-700">已选风险要素篮</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-slate-200">
                <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">原始记录风险要素名称</th>
                <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm">匹配的风险要素名称</th>
                <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm w-24">确认</th>
                <th class="text-left py-3 px-4 font-semibold text-slate-600 text-sm w-24">重新选择</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in selectedRisks" :key="item.id" class="border-b border-slate-100 hover:bg-slate-50/50">
                <td class="py-3 px-4 text-sm font-medium text-slate-700">{{ item.original }}</td>
                <td class="py-3 px-4 text-sm text-slate-600">{{ item.matched }}</td>
                <td class="py-3 px-4">
                  <button class="w-full px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-semibold rounded-lg">
                    <i class="fas fa-check mr-1"></i> 确认
                  </button>
                </td>
                <td class="py-3 px-4">
                  <button class="w-full px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-lg">
                    <i class="fas fa-redo mr-1"></i> 重选
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center py-3 text-sm text-slate-500">
          已选择{{ selectedRisks.length }}个风险要素，可在风险要素树中添加更多要素
        </div>
      </section>
    </div>

    <!-- 导航按钮 -->
    <div class="flex justify-between">
      <button
        v-if="currentStep > 1"
        @click="currentStep--"
        class="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all flex items-center gap-2"
      >
        <i class="fas fa-arrow-left"></i>
        上一步
      </button>
      <div v-else></div>

      <button
        v-if="currentStep < 5"
        @click="currentStep++"
        class="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
      >
        {{ currentStep === 4 ? '完成评价' : '下一步：' + steps[currentStep].nextLabel }}
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Manifest } from '@/build/types'

const manifest: Manifest = {
  name: 'RiskIdentification',
  type: 'component',
  description: '原始记录风险识别组件',
  version: '1.0.0',
  author: 'info@mutaoinc.com',
}

const currentStep = ref(2)

const steps = [
  { id: 1, label: '原始记录导入' },
  { id: 2, label: '风险识别' },
  { id: 3, label: '风险分析' },
  { id: 4, label: '风险评价' },
  { id: 5, label: '完成评价' }
]

const stepProgress = computed(() => {
  return ((currentStep.value - 1) / (steps.length - 1)) * 100 + '%'
})

const getStepClass = (index: number) => {
  if (index < currentStep.value - 1) {
    return 'bg-gradient-to-br from-emerald-400 to-green-500 text-white'
  } else if (index === currentStep.value - 1) {
    return 'bg-gradient-to-br from-amber-400 to-orange-500 text-white scale-110'
  }
  return 'bg-slate-200 text-slate-400'
}

const extractedItems = ref([
  { type: '原始记录名称', content: '实验室检测原始记录 - LAB-2024-0089' },
  { type: '原始记录编号', content: 'LAB-2024-0089' },
  { type: '原始记录日期', content: '2024-03-25' },
  { type: '检测项目', content: '水质检测（pH值、COD、BOD）' },
  { type: '检测人员', content: '张三、李四' },
  { type: '审核人员', content: '王五' },
  { type: '检测设备', content: 'pH计、COD测定仪' }
])

const riskPhases = ref([
  {
    id: 'phase1',
    name: '阶段1：设计阶段',
    icon: 'fas fa-drafting-compass',
    count: 4,
    expanded: true,
    categories: [
      {
        id: 'cat1',
        name: '1. 格式设计缺陷（4项）',
        icon: 'fas fa-file-alt',
        items: [
          { id: 'risk1', label: '1.1 信息结构缺失', description: '原始记录表格缺乏必要的结构设计，导致信息组织混乱', selected: false },
          { id: 'risk2', label: '1.2 逻辑布局混乱', description: '记录内容的逻辑顺序不合理，影响使用效率', selected: false },
          { id: 'risk3', label: '1.3 填写空间不足', description: '记录表格中预留的填写空间不足，导致信息记录不全', selected: false },
          { id: 'risk4', label: '1.4 无修订历史栏', description: '记录表格未设计修订历史记录栏，无法追溯修改过程', selected: false }
        ]
      }
    ]
  },
  {
    id: 'phase2',
    name: '阶段2：填写/产生阶段',
    icon: 'fas fa-pen-alt',
    count: 38,
    expanded: true,
    categories: [
      {
        id: 'cat2',
        name: '2. 实时性风险（2项）',
        icon: 'fas fa-clock',
        items: [
          { id: 'risk5', label: '2.1 事后补记', description: '未在操作过程中实时记录，而是事后凭记忆补记', selected: false },
          { id: 'risk6', label: '2.2 记录延迟', description: '记录时间与实际操作时间存在不合理延迟', selected: false }
        ]
      },
      {
        id: 'cat3',
        name: '3. 规范性风险（5项）',
        icon: 'fas fa-ruler-combined',
        items: [
          { id: 'risk7', label: '3.1 笔误与抄写错误', description: '书写或转录过程中出现错误', selected: false },
          { id: 'risk8', label: '3.2 非正式载体使用', description: '使用便签、草稿纸等非正式载体记录', selected: false },
          { id: 'risk9', label: '3.3 记录格式不规范', description: '未按标准格式填写，存在涂改、刮擦等问题', selected: false },
          { id: 'risk10', label: '3.4 易褪色笔使用', description: '使用易褪色笔书写，导致记录信息难以长期保存', selected: false },
          { id: 'risk11', label: '3.5 空白栏未处理', description: '空白栏未按规定方式处理（如划斜线或填写"N/A"）', selected: false }
        ]
      },
      {
        id: 'cat4',
        name: '4. 完整性风险（5项）',
        icon: 'fas fa-check-circle',
        items: [
          { id: 'risk12', label: '4.1 数据记录不完整', description: '原始记录中存在遗漏、缺失或未填写必填项的情况', selected: true },
          { id: 'risk13', label: '4.2 关键信息缺失', description: '缺少样品信息、检测条件、仪器参数等关键数据', selected: true },
          { id: 'risk14', label: '4.3 溯源信息不全', description: '无法追溯到原始数据或样品来源', selected: false },
          { id: 'risk15', label: '4.4 原始数据未附', description: '未将原始数据附在记录中', selected: false },
          { id: 'risk16', label: '4.5 异常情况未记', description: '检测过程中的异常情况未记录', selected: false }
        ]
      },
      {
        id: 'cat5',
        name: '5. 真实准确性风险（5项）',
        icon: 'fas fa-search',
        items: [
          { id: 'risk17', label: '5.1 数据造假/篡改', description: '人为伪造或篡改数据', selected: false },
          { id: 'risk18', label: '5.2 "预填"数据', description: '在实际操作前预先填写数据', selected: false },
          { id: 'risk19', label: '5.3 记录不准确', description: '记录数据与实际操作不符，存在笔误或转录错误', selected: false },
          { id: 'risk20', label: '5.4 数据计算错误', description: '数据计算过程存在错误', selected: false },
          { id: 'risk21', label: '5.5 数据修约不规范', description: '数据修约未按规定规则进行', selected: false }
        ]
      },
      {
        id: 'cat6',
        name: '6. 人员相关风险（6项）',
        icon: 'fas fa-user-check',
        items: [
          { id: 'risk22', label: '6.1 操作人员资质不符', description: '操作人员未取得相应资质或证书过期', selected: false },
          { id: 'risk23', label: '6.2 人员培训不足', description: '操作人员未接受充分培训或培训记录不完整', selected: true },
          { id: 'risk24', label: '6.3 代签名', description: '他人代为签名', selected: false },
          { id: 'risk25', label: '6.4 字迹无法辨认', description: '书写字迹潦草，无法辨认', selected: false },
          { id: 'risk26', label: '6.5 人员能力未评估', description: '未定期对操作人员进行能力评估和考核', selected: false },
          { id: 'risk27', label: '6.6 培训效果未验证', description: '培训后未验证操作人员的实际掌握程度', selected: false }
        ]
      },
      {
        id: 'cat7',
        name: '7. 设备与设施风险（2项）',
        icon: 'fas fa-tools',
        items: [
          { id: 'risk28', label: '7.1 设备校准超期', description: '检测设备未按时校准或校准证书过期', selected: true },
          { id: 'risk29', label: '7.2 设备故障处理不当', description: '设备故障未及时报告和处理，影响检测结果', selected: false }
        ]
      },
      {
        id: 'cat8',
        name: '8. 样品与材料风险（6项）',
        icon: 'fas fa-vial',
        items: [
          { id: 'risk30', label: '8.1 样品接收记录不全', description: '样品接收信息记录不全，缺少关键信息', selected: false },
          { id: 'risk31', label: '8.2 样品标识不规范', description: '样品标识信息不全、不清晰或容易混淆', selected: false },
          { id: 'risk32', label: '8.3 样品存储条件不符', description: '样品存储温度、湿度等条件不符合规定要求', selected: false },
          { id: 'risk33', label: '8.4 试剂过期使用', description: '使用过期的试剂或标准物质进行检测', selected: false },
          { id: 'risk34', label: '8.5 试剂存储条件不当', description: '试剂存储温度、光照等条件不符合要求', selected: false },
          { id: 'risk35', label: '8.6 标准物质管理不规范', description: '标准物质未按规定管理，影响溯源', selected: false }
        ]
      },
      {
        id: 'cat9',
        name: '9. 方法相关风险（4项）',
        icon: 'fas fa-clipboard-list',
        items: [
          { id: 'risk36', label: '9.1 检测方法未经确认', description: '使用的检测方法未经验证或确认', selected: false },
          { id: 'risk37', label: '9.2 方法偏离未批准', description: '检测方法偏离未经过正式批准程序', selected: false },
          { id: 'risk38', label: '9.3 方法变更未评估', description: '方法变更时未评估对结果的影响', selected: false },
          { id: 'risk39', label: '9.4 方法参数错误', description: '检测方法参数设置与实际要求不符', selected: false }
        ]
      },
      {
        id: 'cat10',
        name: '10. 环境条件控制（3项）',
        icon: 'fas fa-temperature-high',
        items: [
          { id: 'risk40', label: '10.1 环境条件控制不当', description: '温湿度、洁净度等环境条件不符合要求', selected: false },
          { id: 'risk41', label: '10.2 环境监控记录不全', description: '环境监控数据记录不完整或缺失', selected: false },
          { id: 'risk42', label: '10.3 环境异常未处理', description: '环境条件异常时未及时采取纠正措施', selected: false }
        ]
      }
    ]
  },
  {
    id: 'phase3',
    name: '阶段3：审核与管理阶段',
    icon: 'fas fa-eye',
    count: 7,
    expanded: false,
    categories: [
      {
        id: 'cat11',
        name: '11. 审核机制风险（6项）',
        icon: 'fas fa-clipboard-check',
        items: [
          { id: 'risk43', label: '11.1 审核不及时', description: '原始记录未在规定时间内完成审核', selected: true },
          { id: 'risk44', label: '11.2 审核深度不足', description: '审核只关注表面形式，未深入检查数据合理性', selected: false },
          { id: 'risk45', label: '11.3 审核标准缺失', description: '缺乏明确的审核标准和流程', selected: false },
          { id: 'risk46', label: '11.4 审核流程失效', description: '审核流程形同虚设，未起到实际作用', selected: false },
          { id: 'risk47', label: '11.5 审核不严格', description: '审核人员未发现记录中的明显错误', selected: false },
          { id: 'risk48', label: '11.6 审核无闭环', description: '审核发现的问题未跟踪整改到位', selected: false }
        ]
      },
      {
        id: 'cat12',
        name: '12. 批准权限风险（1项）',
        icon: 'fas fa-user-shield',
        items: [
          { id: 'risk49', label: '12.1 批准权限不当', description: '批准人员无相应授权或权限不当', selected: false }
        ]
      }
    ]
  },
  {
    id: 'phase4',
    name: '阶段4：归档与处置阶段',
    icon: 'fas fa-archive',
    count: 9,
    expanded: false,
    categories: [
      {
        id: 'cat13',
        name: '13. 存储归档风险（5项）',
        icon: 'fas fa-boxes',
        items: [
          { id: 'risk50', label: '13.1 归档不及时', description: '原始记录未在规定时间内归档', selected: false },
          { id: 'risk51', label: '13.2 存储条件不符合', description: '记录存储条件不符合档案管理要求', selected: false },
          { id: 'risk52', label: '13.3 存储环境不当', description: '存储环境存在安全隐患', selected: false },
          { id: 'risk53', label: '13.4 记录丢失', description: '记录在归档或存储过程中丢失', selected: false },
          { id: 'risk54', label: '13.5 电子记录风险', description: '电子记录存在丢失、损坏或无法读取的风险', selected: false }
        ]
      },
      {
        id: 'cat14',
        name: '14. 检索与存取风险（2项）',
        icon: 'fas fa-search',
        items: [
          { id: 'risk55', label: '14.1 检索困难', description: '归档记录未建立有效索引，检索困难', selected: false },
          { id: 'risk56', label: '14.2 保密性失控', description: '记录保密性管理不当，存在泄露风险', selected: false }
        ]
      },
      {
        id: 'cat15',
        name: '15. 保存期限风险（1项）',
        icon: 'fas fa-calendar-alt',
        items: [
          { id: 'risk57', label: '15.1 保存期限不足', description: '记录保存期限不符合法规要求', selected: false }
        ]
      }
    ]
  }
])

const selectedRisks = ref([
  { id: 1, original: '数据记录不完整', matched: '4.1 数据记录不完整' },
  { id: 2, original: '关键信息缺失', matched: '4.2 关键信息缺失' },
  { id: 3, original: '操作人员培训不足', matched: '6.2 人员培训不足' },
  { id: 4, original: '设备校准超期', matched: '7.1 设备校准超期' },
  { id: 5, original: '审核不及时', matched: '11.1 审核不及时' }
])

defineExpose({ getManifest: () => manifest })
</script>
