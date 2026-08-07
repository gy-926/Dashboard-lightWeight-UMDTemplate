# UMD 加载与运行时契约

本项目构建一个单业务 UMD，由主项目通过 `<script>` 加载。库的身份、文件名和样式隔离类来自根目录 `project.config.js`。

## 构建

```bash
pnpm build
```

构建会清空 `dist`，生成一个 UMD 文件，并自动运行 `scripts/validate-umd.mjs`。验证失败时构建命令会以非零状态退出，不应部署该产物。

## 浏览器加载顺序

```html
<script src="/vendor/vue.global.js"></script>
<script src="/vendor/echarts.min.js"></script>
<script>
  window.kivii = {
    request(options) {
      // Bridge 实现
    },
  }
</script>
<script src="/components/vue-component-test.umd.js"></script>
```

依赖与全局变量的映射在 `vite.config.ts` 中定义：

| 外部模块 | 浏览器全局变量 |
| --- | --- |
| `vue` | `Vue` |
| `echarts` | `echarts` |
| `@kivii.com/bridge` | `kivii` |

没有被组件实际引用的外部依赖不会出现在最终 Rollup 依赖参数中，但主项目应按照所加载组件的真实需求提供依赖。

## 注册和识别

```js
const library = window.vueComponent3

if (!library) {
  throw new Error('UMD 加载失败')
}

app.use(library)
console.log(library.manifest)
```

典型 manifest：

```js
{
  libName: 'vueComponent3',
  format: 'umd',
  fileName: 'vue-component-test.umd.js',
  wrapperClass: 'vue-component-test-wrapper',
  version: '0.1.0',
  components: ['UmdIntegrationTest']
}
```

## Props、Events、Slots 和 Ref

对外组件经过 `src/build.ts` 的 `withWrapper()` 增加样式作用域。包装器不声明内部组件的 Props 和 Events，而是把 attributes、事件监听器和 slots 原样交给内部组件。

```vue
<UmdIntegrationTest
  ref="themeComponent"
  :theme="theme"
  @toggle-theme="toggleTheme"
/>
```

组件 ref 指向包装器公开接口：

```js
themeComponent.value.getManifest()
themeComponent.value.getComponentInstance()
```

不要假设 ref 会直接等于内部 Vue 组件实例。

## 多个 UMD 共存

每个 UMD 必须拥有唯一的 `libraryName`、`fileName` 和 `wrapperClass`。主项目还需要管理加载顺序、版本兼容和卸载策略。

重复加载同一个 UMD 会重新执行 CSS 注入，因此主项目应对 URL 做去重。

新模板还会自动注册：

```js
window.__KIVII_UMD_REGISTRY__.byUrl[document.currentScript.src]
window.__KIVII_UMD_REGISTRY__.byFileName[manifest.fileName]
```

主项目应优先读取 Registry，同时保留显式 `GlobalName` 和 `window.VueComponent` 回退，以兼容已经交付的旧 UMD。

## 发布前检查

```bash
pnpm run type-check
pnpm build
```

构建成功输出应包含：

```text
✓ UMD validated: ... → window....
```

此外建议在主项目的测试环境加载真实产物，验证路由切换、主题、Bridge 请求和多个 UMD 同时存在的情况。
