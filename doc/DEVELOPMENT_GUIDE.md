# 新人开发指南

本指南只保留完成一次标准开发所需的内容。开始前先阅读 [UI 与样式约束](./ui-design-spec.md)。

## 1. 认识交付物

本项目不是 npm 通用组件库。一个仓库对应一个业务 UMD，最终只交付：

```text
dist/<project.config.js 中的 fileName>
```

Vue、ECharts 和 Kivii Bridge 由主项目提供，不打进 UMD。CSS 会注入同一个 UMD 文件，不单独交付样式文件。

主要目录：

```text
project.config.js            项目名称、产物名、全局变量和样式隔离名
src/build.ts                 UMD 入口、组件注册和 manifest
src/build/components/        对外交付的组件
src/build/composables/       可复用业务逻辑
src/build/types/             公共类型
src/build/utils/             无状态工具函数
src/dev/                     本地预览，不进入 UMD
scripts/validate-umd.mjs     构建产物自动验证
umd-test.html                独立加载测试页
```

## 2. 首次运行

统一使用 pnpm，不要混用 npm 或 yarn。

```bash
pnpm install
pnpm dev
```

开始开发前修改 `project.config.js`：

```js
export default {
  libraryName: 'orderReview',
  fileName: 'order-review.umd.js',
  wrapperClass: 'order-review-wrapper',
  displayName: '订单审核',
  description: '订单审核业务组件',
  author: '团队名称',
  version: '0.1.0',
}
```

三个标识必须唯一且语义一致：

- `libraryName`：合法 JavaScript 标识符，供旧加载方式读取 `window[libraryName]`；
- `fileName`：小写 kebab-case，并以 `.umd.js` 结尾；
- `wrapperClass`：小写 kebab-case，并以 `-wrapper` 结尾。

修改 `fileName` 后同步修改 `umd-test.html` 的脚本路径。若测试页故意使用错误的全局变量进行负向测试，必须保留说明注释。

## 3. 新增组件

### 3.1 创建文件

文件名和组件名使用 PascalCase，且至少两个单词，例如 `OrderReview.vue`。Props 使用 camelCase，模板事件使用 kebab-case。

```vue
<template>
  <section
    class="rounded-lg border border-slate-200 bg-white p-4 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
  >
    <header class="mb-4 flex items-center justify-between gap-3">
      <h2 class="text-base font-semibold">{{ title }}</h2>
      <button
        type="button"
        class="rounded-md bg-[var(--color-primary)] px-3 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="loading"
        @click="emit('confirm')"
      >
        确认
      </button>
    </header>
    <slot />
  </section>
</template>

<script setup lang="ts">
import type { Manifest } from '@/build/types'

export interface Props {
  title?: string
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '默认标题',
  loading: false,
})

const emit = defineEmits<{
  confirm: []
}>()

const manifest: Manifest = {
  name: 'OrderReview',
  type: 'component',
  description: '订单审核组件',
  version: '0.1.0',
  author: '团队名称',
}

defineExpose({ manifest })
</script>
```

组件要求：

- 使用 Vue 3、TypeScript 和 `<script setup>`；
- Props、Emits 和公开方法必须有类型；
- 必须同时提供亮色和 `dark:` 样式；
- 交互元素必须有 hover、focus-visible 和 disabled 状态；
- 业务组件必须暴露 `manifest`；
- 默认不写 `<style>`，确有 Tailwind 无法表达的需求时才使用 scoped 样式。

### 3.2 导出和注册

完成组件后同时修改两处：

1. 从 `src/build/components/index.ts` 导出原始组件；
2. 在 `src/build.ts` 中通过 `withWrapper()` 包装、加入 `components`，并更新 `componentsMap`、`componentsDetailed`。

不要从 `src/build.ts` 直接导出未包装的业务组件，否则 Tailwind 隔离选择器不会生效。

### 3.3 开发预览

`src/dev` 必须引用 `@/build` 的正式导出：

```ts
import { OrderReview } from '@/build'
```

禁止在预览页直接引用 `@/build/components/OrderReview.vue`。只有使用正式导出，才能测试真实 wrapper、Props、Events、Slots 和 Ref 行为。

## 4. 数据、图表和图标

数据请求统一通过 Bridge：

```ts
import { kivii } from '@kivii.com/bridge'

const response = await kivii.request.send({
  url: '/api/orders',
  method: 'GET',
})
```

- 禁止直接使用 `fetch`、`axios` 或写死服务地址；
- 必须呈现 loading、空数据和错误状态；
- 请求参数和业务数据必须定义类型，并在边界处校验响应结构；错误信息应面向用户；
- 图表统一使用 `import * as echarts from 'echarts'`，组件卸载时执行 `dispose()`；
- 图标使用 Font Awesome class，不能把整套图标库打进 UMD。

## 5. 对外接口规则

- Props：给出合理默认值，不修改传入对象；
- Events：只传必要数据，事件名表达结果，如 `confirm`、`update:modelValue`；
- Slots：稳定区域优先使用具名 slot；
- Ref：宿主拿到的是 wrapper 接口，可调用 `getManifest()` 和 `getComponentInstance()`，不要假设它就是内部实例；
- Manifest：组件清单、名称和描述必须与实际导出一致。

## 6. 发布前检查

```bash
pnpm run type-check
pnpm build
```

人工检查：

- 亮色、暗色、窄屏和长文本没有布局破坏；
- loading、空数据、错误、disabled 状态可见；
- 所有按钮都声明 `type="button"`，图标按钮有 `aria-label`；
- 主项目全局样式不会明显覆盖组件，组件样式也不污染主项目；
- `manifest`、`project.config.js`、`umd-test.html` 和文档没有过期名称；
- 构建输出包含 `✓ UMD validated`。

## 7. 不要做的事

- 不要修改 `vite.config.ts`、Tailwind 隔离机制或 Registry 协议来满足单个业务需求；
- 不要复制 Vue、ECharts 或 Bridge 到源码中；
- 不要添加第二套 UI 框架或 CSS Reset；
- 不要使用大段任意值和行内样式绕过 UI 规范；
- 不要为了“以后可能用到”提前设计复杂抽象；
- 不要新增与现有文档职责重复的 Markdown 文件。

主项目加载细节见 [UMD 加载指南](./UMD读取指南.md)，样式原理见 [Tailwind 隔离指南](./TAILWIND_ISOLATION_GUIDE.md)。
