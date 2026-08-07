# Kivii Single-Project UMD Template

Build one independent Vue business-component project into a single UMD file that a host application can load, register, and render at runtime.

This is not a general-purpose npm component library. Vue, ECharts, and Kivii Bridge are external dependencies supplied by the host application; the deliverable is one JavaScript file in `dist` with its CSS injected at runtime.

[中文说明](#中文说明) | [English](#english)

## English

### Quick start

```bash
pnpm install
pnpm dev
pnpm run type-check
pnpm build
```

`pnpm build` builds the UMD bundle, injects CSS, removes stale output, and validates the final artifact. Open `umd-test.html` for standalone browser integration testing.

### Required project configuration

Project identity is configured in [`project.config.js`](./project.config.js):

```js
export default {
  libraryName: 'vueComponent3',
  fileName: 'vue-component-test.umd.js',
  wrapperClass: 'vue-component-test-wrapper',
  displayName: 'Vue UMD Integration Test Component',
  description: 'A test bundle for host-side dynamic loading and registration.',
  author: 'Kivii UMD Team',
  version: '0.1.0',
}
```

- `libraryName` is the browser global, such as `window.vueComponent3`.
- `fileName` is the generated UMD filename.
- `wrapperClass` scopes Tailwind styles and must be unique across UMD projects.
- The remaining fields are included in the runtime `manifest`.

After changing `libraryName` or `fileName`, update the script path and global-variable reference in `umd-test.html` as well.

### Project structure

```text
src/build.ts                 UMD entry, registration, and manifest
src/build/components/        Public business components
src/build/types/             Public types
src/build/composables/       Shared composables
src/build/utils/             Shared utilities
src/dev/                     Local development preview
scripts/validate-umd.mjs     Final artifact validation
project.config.js            UMD project identity
vite.config.ts               UMD build configuration
tailwind.config.js           Tailwind and style isolation
umd-test.html                Standalone loading example
```

### Adding a component

1. Create the Vue component under `src/build/components`.
2. Export it from `src/build/components/index.ts`.
3. Wrap it with `withWrapper()` in `src/build.ts` and add it to `components`.
4. Add metadata to `manifest.componentsMap` and `componentsDetailed`.
5. Import the public component from `@/build` in `src/dev`; do not import its raw `.vue` file.
6. Extend `scripts/validate-umd.mjs` to cover its critical props and events.

Components must use Vue 3, TypeScript, and Tailwind, and support both light and dark themes.

### Host loading contract

Load the external dependencies before the UMD bundle:

```html
<script src="/vendor/vue.global.js"></script>
<script src="/vendor/echarts.min.js"></script>
<script src="/vendor/kivii.bridge.min.js"></script>
<script src="/components/vue-component-test.umd.js"></script>
```

Register the library:

```js
const library = window.vueComponent3

app.use(library)
console.log(library.manifest)
```

| External module | Host global |
| --- | --- |
| `vue` | `window.Vue` |
| `echarts` | `window.echarts` |
| `@kivii.com/bridge` | `window.kivii` |

All UMD projects should use compatible external dependency versions and must not bundle a second Vue runtime.

The bundle keeps `window[libraryName]` for backward compatibility and also registers itself in:

```js
window.__KIVII_UMD_REGISTRY__.byUrl[scriptUrl]
window.__KIVII_UMD_REGISTRY__.byFileName[fileName]
```

Host applications can resolve a library by URL or filename and no longer need to persist `GlobalName` in backend data.

### Wrapper API and style isolation

Public components receive a Tailwind isolation wrapper that forwards props, events, and slots. A component ref exposes:

```ts
componentRef.value.getManifest()
componentRef.value.getComponentInstance()
```

Tailwind Preflight is disabled, and selector strategy scopes utilities beneath the unique wrapper. This reduces host/UMD style leakage but is not Shadow DOM isolation: high-specificity host rules, `!important`, CSS variables, and externally loaded icon styles still follow normal browser cascading.

Start from the [documentation center](doc/README.md), then open the development, UI, AI prompt, UMD integration, or isolation topic as needed.

### License

[MIT](LICENSE) © 2024 高源

---

## 中文说明

本项目用于开发一个独立的 Vue 业务组件项目，并构建为单个 UMD 文件，由主项目在运行时加载、注册和渲染。

它不是面向 npm 的通用组件库。交付物是 `dist` 中的一个 UMD 文件，Vue、ECharts 和 Kivii Bridge 由主项目提供。

### 快速开始

```bash
pnpm install
pnpm dev
pnpm run type-check
pnpm build
```

`pnpm build` 会完成 UMD 构建、CSS 注入、旧产物清理和产物级验证。独立浏览器验证可打开 `umd-test.html`。

### 新项目必改配置

所有项目身份配置集中在 [`project.config.js`](./project.config.js)：

```js
export default {
  libraryName: 'vueComponent3',
  fileName: 'vue-component-test.umd.js',
  wrapperClass: 'vue-component-test-wrapper',
  displayName: 'Vue UMD 集成测试组件',
  description: '用于验证主项目动态加载、注册和调用 Vue UMD 组件的测试包。',
  author: 'Kivii UMD Team',
  version: '0.1.0',
}
```

- `libraryName`：浏览器全局变量，例如 `window.vueComponent3`。
- `fileName`：最终 UMD 文件名。
- `wrapperClass`：Tailwind 样式隔离作用域，多个 UMD 项目必须唯一。
- 其他字段会写入运行时 `manifest`。

修改 `libraryName` 或 `fileName` 后，也要同步调整静态测试页 `umd-test.html` 的脚本路径和全局变量引用。

### 目录职责

```text
src/build.ts                 UMD 正式入口、组件注册与 manifest
src/build/components/        对外交付的业务组件
src/build/types/             公共类型
src/build/composables/       公共组合式函数
src/build/utils/             公共工具函数
src/dev/                     本地开发预览
scripts/validate-umd.mjs     最终产物集成验证
project.config.js            单项目 UMD 身份配置
vite.config.ts               UMD 构建配置
tailwind.config.js           Tailwind 与样式隔离配置
umd-test.html                独立 HTML 加载示例
```

### 添加组件

1. 在 `src/build/components` 创建 Vue 组件。
2. 从 `src/build/components/index.ts` 导出。
3. 在 `src/build.ts` 中使用 `withWrapper()` 包装并加入 `components`。
4. 在库级 `manifest.componentsMap` 和 `componentsDetailed` 中补充元数据。
5. 在 `src/dev` 中引用 `@/build` 导出的正式组件，不要直接引用裸 `.vue` 文件。
6. 扩展 `scripts/validate-umd.mjs`，覆盖新组件最关键的 Props 和 Events。

组件必须使用 Vue 3、TypeScript 和 Tailwind，并同时适配亮色与暗色模式。

### 主项目加载契约

主项目必须先提供外部依赖，再加载 UMD：

```html
<script src="/vendor/vue.global.js"></script>
<script src="/vendor/echarts.min.js"></script>
<script src="/vendor/kivii.bridge.min.js"></script>
<script src="/components/vue-component-test.umd.js"></script>
```

注册组件：

```js
const library = window.vueComponent3

app.use(library)
console.log(library.manifest)
```

| 外部模块 | 主项目全局变量 |
| --- | --- |
| `vue` | `window.Vue` |
| `echarts` | `window.echarts` |
| `@kivii.com/bridge` | `window.kivii` |

主项目应保证所有 UMD 使用兼容的外部依赖版本，尤其不能让 UMD 再携带第二份 Vue。

新构建产物会在保留 `window[libraryName]` 的同时，自动注册到：

```js
window.__KIVII_UMD_REGISTRY__.byUrl[scriptUrl]
window.__KIVII_UMD_REGISTRY__.byFileName[fileName]
```

主项目可以优先通过 Registry 按 URL 或文件名解析，新项目不再要求后端保存 `GlobalName`；原全局变量继续保留，用于兼容旧加载方式。

### 包装器公开能力与样式隔离

正式导出的组件会自动增加 Tailwind 隔离 wrapper，并透传 Props、Events 和 Slots。通过组件 ref 可访问：

```ts
componentRef.value.getManifest()
componentRef.value.getComponentInstance()
```

项目关闭 Tailwind Preflight，并使用 selector strategy 把工具类限制在唯一 wrapper 下。这能显著降低 UMD 与主项目互相污染，但不是 Shadow DOM 级别的绝对隔离：主项目的高权重选择器、`!important`、CSS 变量和外部图标样式仍遵循浏览器级联规则。

新人请从 [`doc/README.md`](./doc/README.md) 开始，按需查阅开发、样式、AI 提示词和 UMD 接入专题。

### 许可证

[MIT](LICENSE) © 2024 高源
