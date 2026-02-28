/**
 * 打包配置文件
 */
import "./style.css";
import type { App } from "vue";
import { KvcCard, KvcCardChild, KvvOrder, KvcTable, ThemeSwitchTest, ProductClassification, RiskEvaluation, RecordRecognition } from "@/build/components";

// 组件类型定义（只有需要传递参数的组件才需要定义类型）
export type { Props as KvcCardProps } from "@/build/components/KvcCard.vue";
export type { Props as KvcCardChildProps } from "@/build/components/KvcCardChild.vue";
export type { Props as KvcTableProps } from "@/build/components/KvcTable.vue";
export type { Props as ThemeSwitchTestProps } from "@/build/components/ThemeSwitchTest.vue";
export type { Props as ProductClassificationProps } from "@/build/components/ProductClassification.vue";
export type { Props as RiskEvaluationProps } from "@/build/components/RiskEvaluation.vue";
export type { Props as RecordRecognitionProps } from "@/build/components/RecordRecognition.vue";



// 导出组件
export { KvcCard, KvcCardChild, KvvOrder, KvcTable, ThemeSwitchTest, ProductClassification, RiskEvaluation, RecordRecognition, install };

// 组件列表
const components = {
  KvcCard,
  KvcCardChild,
  KvvOrder,
  KvcTable,
  ThemeSwitchTest,
  ProductClassification,
  RiskEvaluation,
  RecordRecognition,
};

// 定义安装函数
const install = (app: App) => {
  // 注册所有组件
  Object.keys(components).forEach((key) => {
    const component = components[key as keyof typeof components];
    app.component(key, component);
  });
};

export const manifest = {
  libName: "VueComponent",
  format: "umd",
  fileName: "kivii-component-demo-library.umd.js",
  zhName: "组件库 UMD 包",
  author: "Kivii & Wemt Team",
  version: "1.0.0",
  description: "Kivii Component 组件库 UMD 包，提供卡片、订单、商品归类、风险评价、原始记录识别等组件。",
  components: Object.keys(components),
  componentsMap: {
    KvcCard: "这是一个功能丰富的Vue卡片组件，包含评分、收藏、分享等交互功能。",
    KvcCardChild: "这是一个功能丰富的Vue卡片组件的子组件，包含评分、收藏、分享等交互功能。",
    KvvOrder: "这是一个功能丰富的Vue订单组件，包含订单管理、订单查询、订单导出等交互功能。",
    KvcTable: "订单列表表格组件，支持展示订单数据与翻页控制。",
    ThemeSwitchTest: "Test module for verifying theme switching capabilities with pure Tailwind CSS.",
    ProductClassification: "数据与LLM双驱商品归类系统 - 神经形态智能商品分类管理平台",
    RiskEvaluation: "原始记录风险评价系统 - 基于IWRPN模型的风险评估管理平台",
    RecordRecognition: "纸质原始记录智能识别系统组件",
  },
  componentsDetailed: [
    { name: "KvcCard", zhName: "演示卡片", icon: "fas fa-id-card", description: "这是一个功能丰富的Vue卡片组件，包含评分、收藏、分享等交互功能。" },
    { name: "KvcCardChild", zhName: "演示子卡片", icon: "fas fa-puzzle-piece", description: "这是一个功能丰富的Vue卡片组件的子组件，包含评分、收藏、分享等交互功能。" },
    { name: "KvvOrder", zhName: "订单管理", icon: "fas fa-shopping-cart", description: "这是一个功能丰富的Vue订单组件，包含订单管理、订单查询、订单导出等交互功能。" },
    { name: "KvcTable", zhName: "数据表格", icon: "fas fa-table", description: "订单列表表格组件，支持展示订单数据与翻页控制。" },
    { name: "ThemeSwitchTest", zhName: "主题测试", icon: "fas fa-palette", description: "Test module for verifying theme switching capabilities with pure Tailwind CSS." },
    { name: "ProductClassification", zhName: "商品归类AI", icon: "fas fa-brain", description: "数据与LLM双驱商品归类系统 - 神经形态智能商品分类管理平台" },
    { name: "RiskEvaluation", zhName: "风险评价系统", icon: "fas fa-shield-virus", description: "原始记录风险评价系统 - 基于IWRPN模型的风险评估管理平台" },
    { name: "RecordRecognition", zhName: "记录智能识别", icon: "fas fa-file-signature", description: "纸质原始记录智能识别系统组件" },
  ],
};

// 支持按需引入
export default {
  install,
  ...components,
  manifest,
};

// 支持全局引入
export const VueDemoComponent = {
  install,
  ...components,
  manifest,
};
