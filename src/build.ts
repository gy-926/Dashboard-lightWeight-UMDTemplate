/**
 * 打包配置文件
 */
import "./style.css";
import type { App } from "vue";
import { ThemeSwitchTest } from "@/build/components";

// 组件类型定义（只有需要传递参数的组件才需要定义类型）
export type { Props as ThemeSwitchTestProps } from "@/build/components/ThemeSwitchTest.vue";

// 导出组件
export { ThemeSwitchTest, install };

// 组件列表
const components = {
  ThemeSwitchTest,
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
  description: "Kivii Component 组件库 UMD 包，提供基础演示组件。",
  components: Object.keys(components),
  componentsMap: {
    ThemeSwitchTest: "Test module for verifying theme switching capabilities with pure Tailwind CSS.",
  },
  componentsDetailed: [
    { name: "ThemeSwitchTest", zhName: "主题测试", icon: "fas fa-palette", description: "Test module for verifying theme switching capabilities with pure Tailwind CSS." },
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
