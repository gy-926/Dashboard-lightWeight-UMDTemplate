/**
 * 组件库导出模块（统一导出）
 */
import KvcCard from "./KvcCard.vue";
import KvcCardChild from "./KvcCardChild.vue";
import KvvOrder from "./KvvOrder.vue";
import KvcTable from "./KvcTable.vue";
import ThemeSwitchTest from "./ThemeSwitchTest.vue";

// 商品归类AI系统组件
export * from "./ProductClassification";
import { ProductClassification } from "./ProductClassification";

// 原始记录风险评价系统组件
export * from "./RiskEvaluation";
import { RiskEvaluation } from "./RiskEvaluation";

// 纸质原始记录智能识别系统组件
export * from "./RecordRecognition";
import { RecordRecognition } from "./RecordRecognition";

export { KvcCard, KvcCardChild, KvvOrder, KvcTable, ThemeSwitchTest, ProductClassification, RiskEvaluation, RecordRecognition };