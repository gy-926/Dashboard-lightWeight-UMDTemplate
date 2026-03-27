import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import cssInjectedByJs from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cssInjectedByJs()],
  build: {
    // 输出目录
    outDir: resolve(__dirname, "./dist"),
    // 不清空输出目录
    emptyOutDir: false,
    lib: {
      // 入口文件
      entry: resolve(__dirname, "src/build.ts"),
      name: "VueComponent",
      // 文件名
      fileName: () => `kivii-component-demo-library.umd.js`,
      // 输出格式
      formats: ["umd"],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "echarts", "@kivii.com/bridge"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          echarts: "echarts",
          "@kivii.com/bridge": "kivii",
        },
      },
    },
    // 生成源码映射
    sourcemap: false,
    // 最小化输出
    minify: "terser",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
