# Tailwind CSS 样式隔离指南

本模板使用 Tailwind selector strategy 与 Vue 包装组件，降低 UMD 样式和主项目样式互相污染的风险。

## 工作方式

`project.config.js` 定义唯一的 `wrapperClass`：

```js
export default {
  wrapperClass: 'vue-component-test-wrapper',
}
```

`tailwind.config.js` 把它配置为 selector：

```js
import projectConfig from './project.config.js'

export default {
  important: `.${projectConfig.wrapperClass}`,
  corePlugins: {
    preflight: false,
  },
}
```

生成的工具类会被限制在对应 wrapper 下，例如：

```css
.vue-component-test-wrapper .flex {
  display: flex;
}
```

`src/build.ts` 的 `withWrapper()` 会在正式导出的组件外自动增加该 class。开发预览也必须引用 `@/build` 的正式导出，以覆盖包装后的真实行为。

## 透传规则

包装器自身不重复声明内部组件的 Props 和 Events，而是把 `attrs` 和 `slots` 原样传给内部组件。这一点很重要：如果包装器声明了同名 `emits` 却没有重新触发，Vue 会消费事件监听器，导致主项目收不到事件。

包装器另外公开：

```ts
componentRef.value.getManifest()
componentRef.value.getComponentInstance()
```

## 隔离边界

该方案提供的是作用域限制和更高的选择器特异性，不是 Shadow DOM，也不会自动为全部规则增加 `!important`。

- 主项目的高权重样式或 `!important` 仍可能覆盖组件。
- CSS 变量、字体和继承属性仍可能从主项目进入组件。
- Font Awesome 等全局资源仍由主项目提供。
- 多个 UMD 必须使用不同的 `wrapperClass`。
- 不应重新开启 Tailwind Preflight，否则基础重置可能污染主项目。

如果业务要求完全封闭的样式边界，需要单独评估 Shadow DOM；它同时会改变弹层、主题变量和第三方组件的使用方式。

## 修改项目隔离标识

只修改 `project.config.js`：

```js
export default {
  wrapperClass: 'kivii-order-review-wrapper',
}
```

Tailwind 配置、运行时 wrapper 和 manifest 会共同读取该值，无需多处同步。
