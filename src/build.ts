/**
 * 打包配置文件
 */
import type { App } from "vue";
import { KvcCard, KvcCardChild, KvvOrder, KvcTable, ProductClassification, RiskEvaluation, RecordRecognition } from "@/build/components";

// 组件类型定义（只有需要传递参数的组件才需要定义类型）
export type { Props as KvcCardProps } from "@/build/components/KvcCard.vue";
export type { Props as KvcCardChildProps } from "@/build/components/KvcCardChild.vue";
export type { Props as KvcTableProps } from "@/build/components/KvcTable.vue";
export type { Props as ProductClassificationProps } from "@/build/components/ProductClassification.vue";
export type { Props as RiskEvaluationProps } from "@/build/components/RiskEvaluation.vue";
export type { Props as RecordRecognitionProps } from "@/build/components/RecordRecognition.vue";



// 导出组件
export { KvcCard, KvcCardChild, KvvOrder, KvcTable, ProductClassification, RiskEvaluation, RecordRecognition, install };

// 组件列表
const components = {
  KvcCard,
  KvcCardChild,
  KvvOrder,
  KvcTable,
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

// 支持按需引入
export default {
  install,
  ...components,
};

// 支持全局引入
export const VueDemoComponent = {
  install,
  ...components,
};