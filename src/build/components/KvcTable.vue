<template>
    <section class="rounded-2xl border border-slate-100 bg-white/95 p-6 shadow-sm">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p class="text-base font-semibold text-slate-900">订单列表</p>
                <p class="text-xs text-slate-500">
                    共 {{ filteredCount }} 笔订单，成交金额合计 ¥
                    {{ totalAmountDisplay.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
                </p>
            </div>
            <div class="text-xs text-slate-500">上次同步：{{ lastSynced }}</div>
        </div>

        <div class="mt-4 overflow-auto rounded-xl border border-slate-100">
            <table class="min-w-full text-left text-sm">
                <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                        <th class="px-4 py-3">下单时间</th>
                        <th class="px-4 py-3">订单号</th>
                        <th class="px-4 py-3">品类 / 规格</th>
                        <th class="px-4 py-3">渠道 / 场景</th>
                        <th class="px-4 py-3">收货人</th>
                        <th class="px-4 py-3">实付金额</th>
                        <th class="px-4 py-3 text-right">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order.id" class="border-b border-slate-50 text-slate-700">
                        <td class="px-4 py-3 text-sm text-slate-500">{{ order.date }}</td>
                        <td class="px-4 py-3 text-sm font-mono text-slate-600">
                            <span class="rounded bg-slate-50 px-2 py-0.5">#{{ order.orderId }}</span>
                        </td>
                        <td class="px-4 py-3 text-sm text-slate-700">
                            <div class="flex flex-col">
                                <span class="font-medium text-slate-900">{{ order.productName }}</span>
                                <span class="text-xs text-slate-400">规格：{{ order.skuName }}</span>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-sm">
                            <div class="flex flex-col">
                                <span class="text-slate-900">{{ order.anchor }}</span>
                                <span class="text-xs text-slate-400">{{ order.liveRoom }}</span>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-sm">
                            <div class="flex flex-col">
                                <span class="text-slate-900">{{ order.receiver }}</span>
                                <span class="text-xs text-slate-400">{{ order.phoneMasked }}</span>
                            </div>
                        </td>
                        <td class="px-4 py-3 font-semibold text-slate-900">
                            ¥ {{ order.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
                        </td>
                        <td class="px-4 py-3 text-right">
                            <button type="button" class="text-sm text-primary-dark transition hover:text-primary-700"
                                @click="$emit('view', order)">
                                查看
                            </button>
                        </td>
                    </tr>
                    <tr v-if="!orders.length">
                        <td colspan="7" class="px-4 py-10 text-center text-sm text-slate-400">
                            暂无符合条件的订单记录
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-4 flex flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>第 {{ pageRange.start }} - {{ pageRange.end }} 条 / 共 {{ filteredCount }} 条</p>
            <div class="flex items-center gap-2">
                <button type="button"
                    class="rounded-lg border border-slate-200 px-3 py-1 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:text-slate-300"
                    :disabled="currentPage === 1" @click="$emit('prev-page')">
                    上一页
                </button>
                <span class="text-slate-600"> {{ currentPage }} / {{ totalPages }} </span>
                <button type="button"
                    class="rounded-lg border border-slate-200 px-3 py-1 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:text-slate-300"
                    :disabled="currentPage === totalPages" @click="$emit('next-page')">
                    下一页
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Manifest } from '@/build/types'

/**
 * 组件配置声明（必要）
 */
const manifest: Manifest = {
    name: 'KvcTable',
    type: 'component',
    description: '订单列表表格组件，支持展示订单数据与翻页控制。',
    version: '1.0.0',
    author: 'info@mutaoinc.com',
}

// 表格行数据结构
export interface TableOrder {
    id: number;
    date: string;
    orderId: string;
    productName: string;
    skuName: string;
    amount: number;
    channel: string;
    anchor: string;
    liveRoom: string;
    receiver: string;
    phoneMasked: string;
}

export interface PageRange {
    start: number;
    end: number;
}

export interface Props {
    orders?: TableOrder[];
    filteredCount?: number;
    totalAmount?: number;
    lastSynced?: string;
    pageRange?: PageRange;
    currentPage?: number;
    totalPages?: number;
}

/**
 * 组件属性声明
 */
const props = withDefaults(defineProps<Props>(), {
    orders: () => [],
    filteredCount: 0,
    totalAmount: 0,
    lastSynced: '—',
    pageRange: () => ({ start: 0, end: 0 }),
    currentPage: 1,
    totalPages: 1,
})

const emit = defineEmits<{
    view: [order: TableOrder]
    'prev-page': []
    'next-page': []
}>()

// 保证金额展示为数字
const totalAmountDisplay = computed(() => Number(props.totalAmount || 0))

/**
 * 组件暴露给父组件的方法和数据声明（按需暴露）
 */
defineExpose({
    // 获取组件配置声明（必要）
    getManifest: () => manifest,
})
</script>
