# Tailwind 样式隔离指南

本文只解释隔离机制和排障方法。日常开发的样式规则以 [UI 与样式约束](./ui-design-spec.md) 为准。

## 隔离机制

`project.config.js` 是隔离名称的唯一配置源：

```js
export default {
  wrapperClass: 'vue-component-test-wrapper',
}
```

`tailwind.config.js` 将所有 Tailwind 工具类限制在该选择器下，并关闭全局 Reset：

```js
import projectConfig from './project.config.js'

export default {
  important: `.${projectConfig.wrapperClass}`,
  corePlugins: { preflight: false },
  darkMode: 'class',
}
```

`src/build.ts` 的 `withWrapper()` 自动为正式导出的组件增加对应 class。开发预览必须从 `@/build` 引用组件，才能覆盖真实隔离行为。

## 包装器契约

包装器不重复声明内部组件的 Props 和 Events，而是透传 attrs、事件监听器和 slots。重复声明 Emits 但不重新触发，会导致宿主监听器被包装器截获。

宿主通过组件 ref 可访问：

```ts
componentRef.value.getManifest()
componentRef.value.getComponentInstance()
```

不要把 wrapper ref 当成内部组件实例。

## 修改隔离名称

只修改 `project.config.js` 的 `wrapperClass`，不要手工修改 Tailwind 配置或 `src/build.ts`。新名称必须：

- 在所有 UMD 项目中唯一；
- 使用小写 kebab-case；
- 以 `-wrapper` 结尾；
- 不使用宿主已有的通用名称，如 `app`、`content`、`container`。

修改后运行：

```bash
pnpm run type-check
pnpm build
```

产物验证会确认运行时 wrapper 与 manifest 一致。

## 隔离边界

该方案不是 Shadow DOM：

- 宿主高权重选择器和 `!important` 仍可能覆盖组件；
- 字体、继承属性和 CSS 变量仍遵循浏览器级联；
- Font Awesome 等全局资源仍由宿主提供；
- 弹层 Teleport 到 wrapper 外部后，Tailwind 选择器可能失效；
- 重复加载 UMD 可能重复注入 style。

不要使用更多 `!important` 掩盖问题。先检查组件是否经过 wrapper、Teleport 目标、选择器权重和宿主样式来源；确需 Shadow DOM 时应单独设计主题、弹层和第三方库的兼容方案。

## 排障顺序

1. 检查元素祖先是否包含 `project.config.js` 中的 `wrapperClass`；
2. 检查组件是否从 `@/build` 的正式入口导出；
3. 检查生成 CSS 是否包含 `.wrapperClass .目标工具类`；
4. 在浏览器 Computed 面板定位覆盖规则；
5. 检查是否 Teleport 到 wrapper 外；
6. 修复根因后重新执行构建验证。
