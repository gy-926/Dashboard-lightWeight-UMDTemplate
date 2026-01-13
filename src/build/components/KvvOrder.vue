<template>
    <div class="space-y-6 p-6">
        <!-- 头部 & 快捷操作 -->
        <section class="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-sm">
            <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <p class="text-xs uppercase tracking-wide text-slate-400">ORDER CENTER</p>
                    <h1 class="text-2xl font-semibold text-slate-900">订单管理 · 业务订单</h1>
                    <p class="text-sm text-slate-500">
                        统一管理各渠道产生的业务订单，支持按订单号、渠道、收货人及状态检索，并导出结算对账凭证。
                    </p>
                </div>
                <div class="flex flex-wrap gap-3 text-sm">
                    <button type="button"
                        class="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                        @click="handleRefresh">
                        <i class="fa-solid fa-rotate-right"></i>
                        刷新数据
                    </button>
                    <button type="button"
                        class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-semibold text-white transition hover:bg-primary-dark"
                        @click="handleExport">
                        <i class="fa-solid fa-file-export"></i>
                        导出订单
                    </button>
                </div>
            </div>

            <!-- 顶部统计 -->
            <div class="grid gap-4 md:grid-cols-3">
                <article v-for="stat in orderStats" :key="stat.label"
                    class="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                    <p class="text-sm text-slate-500">{{ stat.label }}</p>
                    <p class="mt-2 text-2xl font-semibold text-slate-900">{{ stat.value }}</p>
                    <p class="text-xs" :class="stat.trend.includes('-') ? 'text-rose-500' : 'text-primary-dark'">
                        {{ stat.trend }}
                    </p>
                </article>
            </div>
        </section>

        <!-- 筛选区域 -->
        <section class="rounded-2xl border border-slate-100 bg-white/95 p-6 shadow-sm">
            <div class="flex flex-wrap items-center gap-3">
                <p class="text-sm font-medium text-slate-900">快捷筛选</p>
                <button v-for="range in quickRanges" :key="range.key" type="button"
                    class="rounded-full border px-4 py-1.5 text-xs transition" :class="filters.range === range.key
                        ? 'border-primary bg-primary-50 text-primary-dark'
                        : 'border-slate-200 text-slate-500 hover:border-primary-200 hover:text-primary-dark'
                        " @click="setQuickRange(range.key)">
                    {{ range.label }}
                </button>
            </div>

            <div class="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <label class="text-sm text-slate-600">
                    起始日期
                    <input v-model="filters.startDate" type="date"
                        class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none" />
                </label>
                <label class="text-sm text-slate-600">
                    结束日期
                    <input v-model="filters.endDate" type="date"
                        class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none" />
                </label>
                <label class="text-sm text-slate-600">
                    渠道 / 场景
                    <select v-model="filters.channel"
                        class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none">
                        <option v-for="channel in channelOptions" :key="channel.value" :value="channel.value">
                            {{ channel.label }}
                        </option>
                    </select>
                </label>
            </div>

            <div class="mt-4 grid gap-4 md:grid-cols-3">
                <label class="text-sm text-slate-600">
                    关键词（订单号 / 收货人 / 手机号）
                    <input v-model="filters.keyword" type="text"
                        class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none"
                        placeholder="例如：DY202501230058 / 张三 / 138****0000" />
                </label>
                <label class="text-sm text-slate-600">
                    渠道 / 场次
                    <input v-model="filters.anchor" type="text"
                        class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none"
                        placeholder="例如：旗舰店专场" />
                </label>
                <div class="flex items-end justify-end gap-3">
                    <button type="button"
                        class="h-10 rounded-xl border border-slate-200 px-4 text-sm text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                        @click="resetFilters">
                        重置筛选
                    </button>
                    <button type="button" class="h-10 rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white"
                        @click="handleQuery">
                        应用筛选
                    </button>
                </div>
            </div>
        </section>

        <!-- 订单表格 -->
        <KvcTable :orders="paginatedOrders" :filtered-count="filteredOrders.length" :total-amount="totalAmount"
            :last-synced="lastSynced" :page-range="pageRange" :current-page="currentPage" :total-pages="totalPages"
            @view="viewOrder" @prev-page="goPrevPage" @next-page="goNextPage" />
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { Manifest } from '@/build/types'
import { KvcTable } from '@/build/components'

/**
 * 组件配置声明（必要）
 */
const manifest: Manifest = {
    name: 'KvvOrder',
    type: 'view',
    description: '这是一个功能丰富的Vue订单组件，包含订单管理、订单查询、订单导出等交互功能。',
    version: '1.0.0',
    author: 'info@mutaoinc.com',
}

// ================== 组件内部业务开始 ↓ =====================

const orderStats = [
    { label: '今日成交订单数', value: '128 单', trend: '成交金额 ¥ 32,580.40' },
    { label: '近 7 日成交金额', value: '¥ 186,420.80', trend: '覆盖 3,210 单订单' },
    { label: '待发货订单', value: '42 单', trend: '建议 24 小时内完成发货' },
];

const quickRanges = [
    { key: 'today', label: '今日', start: '2025-01-23', end: '2025-01-23' },
    { key: '7d', label: '近 7 日', start: '2025-01-17', end: '2025-01-23' },
    { key: '30d', label: '近 30 日', start: '2024-12-25', end: '2025-01-23' },
    { key: 'month', label: '本月', start: '2025-01-01', end: '2025-01-31' },
];

const channelOptions = [
    { label: '全部渠道', value: 'all' },
    { label: '线上渠道', value: '线上渠道' },
    { label: '线上商城', value: '线上商城' },
    { label: '线下门店', value: '线下门店' },
];

interface OrderRecord {
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

const orders: OrderRecord[] = [
    {
        id: 1,
        date: '2025-01-23 18:32',
        orderId: 'DY202501230058',
        productName: 'SSR 传奇卡牌大师套组',
        skuName: '1 箱 10 包 · 专属款',
        amount: 328.8,
        channel: '线上渠道',
        anchor: '渠道 小伍',
        liveRoom: '卡牌冲刺场',
        receiver: '张三',
        phoneMasked: '138****0023',
    },
    {
        id: 2,
        date: '2025-01-23 17:10',
        orderId: 'DY202501230052',
        productName: '限量闪卡收藏包',
        skuName: '单盒 · 含 3 张随机闪卡',
        amount: 68.0,
        channel: '线上渠道',
        anchor: '渠道 小伍',
        liveRoom: '卡牌冲刺场',
        receiver: '李四',
        phoneMasked: '139****8899',
    },
    {
        id: 3,
        date: '2025-01-23 15:02',
        orderId: 'DY202501230041',
        productName: '入门体验卡包',
        skuName: '新客福利 · 包邮',
        amount: 29.9,
        channel: '线上商城',
        anchor: '旗舰店',
        liveRoom: '官方旗舰店',
        receiver: '王五',
        phoneMasked: '137****1212',
    },
    {
        id: 4,
        date: '2025-01-22 21:13',
        orderId: 'DY202501220077',
        productName: '线下卡展联名卡包',
        skuName: '门店自提款',
        amount: 128.0,
        channel: '线下门店',
        anchor: '潮玩旗舰店',
        liveRoom: '线下卡展 · A 馆',
        receiver: '赵六',
        phoneMasked: '150****7788',
    },
    {
        id: 5,
        date: '2025-01-22 19:45',
        orderId: 'DY202501220064',
        productName: '夜场限量潮玩盲盒套票',
        skuName: '双人票 · 含 4 份卡包',
        amount: 258.0,
        channel: '线上渠道',
        anchor: '渠道 阿莱',
        liveRoom: '晚八福利场',
        receiver: '（待确认）',
        phoneMasked: '—',
    },
];

const filters = reactive({
    range: quickRanges[1].key,
    startDate: quickRanges[1].start,
    endDate: quickRanges[1].end,
    channel: 'all',
    keyword: '',
    anchor: '',
});

const lastSynced = '今天 09:45';
const pageSize = 8;
const currentPage = ref(1);

const filteredOrders = computed(() => {
    const keyword = filters.keyword.trim();
    const anchorKeyword = filters.anchor.trim();

    return orders.filter(order => {
        const matchChannel = filters.channel === 'all' || order.channel === filters.channel;

        const matchKeyword =
            !keyword ||
            order.orderId.includes(keyword) ||
            order.receiver.includes(keyword) ||
            order.phoneMasked.includes(keyword);

        const matchAnchor =
            !anchorKeyword ||
            order.anchor.includes(anchorKeyword) ||
            order.liveRoom.includes(anchorKeyword);

        const orderDate = order.date.slice(0, 10);
        const matchDate =
            (!filters.startDate || orderDate >= filters.startDate) &&
            (!filters.endDate || orderDate <= filters.endDate);

        return matchChannel && matchKeyword && matchAnchor && matchDate;
    });
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredOrders.value.length / pageSize)));

const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredOrders.value.slice(start, start + pageSize);
});

const pageRange = computed(() => {
    if (!filteredOrders.value.length) {
        return { start: 0, end: 0 };
    }
    const start = (currentPage.value - 1) * pageSize + 1;
    const end = Math.min(filteredOrders.value.length, currentPage.value * pageSize);
    return { start, end };
});

const totalAmount = computed(() =>
    filteredOrders.value.reduce((sum, order) => sum + order.amount, 0)
);

watch(
    () => [filters.channel, filters.keyword, filters.anchor, filters.startDate, filters.endDate],
    () => {
        currentPage.value = 1;
    }
);

const setQuickRange = (key: string) => {
    const target = quickRanges.find(range => range.key === key);
    if (!target) return;
    filters.range = key;
    filters.startDate = target.start;
    filters.endDate = target.end;
};

const resetFilters = () => {
    setQuickRange('7d');
    filters.channel = 'all';
    filters.keyword = '';
    filters.anchor = '';
};

const handleQuery = () => {
    console.log('Apply order filters', { ...filters });
};

const handleRefresh = () => {
    console.log('Refresh order data');
};

const handleExport = () => {
    alert('已生成最新订单导出任务，请在消息中心查看。');
};

const viewOrder = (order: OrderRecord) => {
    console.log('View order detail', order);
};

// 翻页事件处理
const goPrevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const goNextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

// ================== 组件内部业务结束 ↑ =====================

/**
 * 组件暴露给父组件的方法和数据声明（按需暴露）
 */
defineExpose({
    // 获取组件配置声明（必要）
    getManifest: () => manifest,
})
</script>