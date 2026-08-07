# UI 与样式约束

本文件是新人和 AI 的强制视觉边界。目标不是让所有页面完全相同，而是限制随意配色、尺寸膨胀、复杂特效和宿主样式污染。

## 1. 基本原则

- 清晰优先：先保证信息层级、可读性和操作反馈，再考虑装饰；
- 克制一致：一个页面只使用一套间距、圆角、阴影和交互语言；
- 主题完整：所有可见区域必须同时支持亮色和暗色；
- 宿主友好：不写全局 Reset，不修改 `html`、`body` 或宿主已有 class；
- 状态完整：交互必须考虑 hover、focus-visible、disabled、loading、空数据和错误；
- 响应安全：窄屏、长文本和大数据量不能破坏布局。

## 2. 允许使用的设计范围

### 颜色

品牌色优先使用 CSS 变量：

```css
var(--color-primary)
var(--color-primary-hover)
var(--color-primary-light)
var(--color-primary-dark)
var(--color-primary-bg)
```

中性色统一使用 Tailwind `slate` 色阶：

| 用途 | 亮色 | 暗色 |
| --- | --- | --- |
| 页面/区域背景 | `bg-slate-50` | `dark:bg-slate-950` |
| 卡片背景 | `bg-white` | `dark:bg-slate-900` |
| 主文字 | `text-slate-900` | `dark:text-slate-100` |
| 次文字 | `text-slate-600` | `dark:text-slate-300` |
| 弱文字 | `text-slate-500` | `dark:text-slate-400` |
| 边框 | `border-slate-200` | `dark:border-slate-700` |

语义色只用于对应状态：成功 `emerald`、警告 `amber`、错误/危险 `red`、信息 `blue`。不要用语义色做大面积装饰。

禁止：

- 新增无业务含义的十六进制颜色或 RGB；
- 同一页面混用 `gray`、`zinc`、`neutral` 和 `slate`；
- 使用高饱和渐变作为普通卡片背景；
- 用颜色作为状态的唯一表达，状态还需文字或图标。

### 间距和尺寸

只使用 Tailwind 默认间距阶梯，优先：`1`、`2`、`3`、`4`、`6`、`8`。

- 紧凑元素间距：`gap-2`；
- 常规元素间距：`gap-3` 或 `gap-4`；
- 卡片内边距：`p-4`，复杂区域可用 `p-6`；
- 区块间距：`space-y-4` 或 `gap-6`；
- 常规控件高度：`h-9` 或 `h-10`；
- 图标尺寸：`h-4 w-4` 或 Font Awesome `text-sm`/`text-base`。

禁止使用 `p-[17px]`、`w-[413px]` 等任意值修补布局。确有业务固定尺寸时，应写注释说明原因。

### 字号、圆角和阴影

| 对象 | 约束 |
| --- | --- |
| 页面标题 | `text-xl font-semibold`，最多 `text-2xl` |
| 区块标题 | `text-base font-semibold` 或 `text-lg font-semibold` |
| 正文 | `text-sm`，长内容可用 `text-base` |
| 辅助文字 | `text-xs` 或 `text-sm` |
| 输入框、按钮 | `rounded-md` |
| 卡片、面板 | `rounded-lg` |
| 徽章 | `rounded-full` |
| 普通卡片 | 无阴影或 `shadow-sm` |
| 弹层 | `shadow-lg`，仅用于浮层 |

禁止超大标题、连续多层阴影、玻璃拟态、霓虹光效和与业务无关的 3D 动效。

## 3. 标准组件样式

### 卡片

```html
<section class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
  <!-- 内容 -->
</section>
```

卡片不应层层嵌套。需要分区时优先使用标题、间距或 `border-t`。

### 主按钮

```html
<button
  type="button"
  class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[var(--color-primary)] px-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
>
  保存
</button>
```

一个操作区通常只放一个主按钮。次要操作使用白色/暗色背景和边框，危险操作使用 `red`。

### 输入框

```html
<input
  class="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-bg)] disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:disabled:bg-slate-800"
/>
```

表单必须有可见 label。校验错误放在字段下方，使用短句说明修复方式。

### 表格和列表

- 表格外层使用 `overflow-x-auto`，不要压缩到无法阅读；
- 表头 `text-xs font-medium`，内容通常 `text-sm`；
- 行操作不超过 3 个，更多操作放菜单；
- 无数据时展示空状态，不保留空白表格；
- 列表项使用 `gap-3`、`py-3`，长文本使用 `min-w-0` 与 `truncate` 或换行策略。

### 弹层

- 必须有标题、关闭方式和明确操作区；
- 宽度使用响应式上限，例如 `w-full max-w-lg`；
- 不在业务 UMD 中直接控制 `body` 滚动或写全局遮罩样式；
- 需要宿主级 Teleport 时先确认主项目协议，不能自行假设挂载点。

## 4. 响应式与可访问性

- 默认先写窄屏布局，再用 `md:` 增强；
- Flex 子项含长文本时添加 `min-w-0`；
- 固定宽度必须同时提供 `max-w-full` 或窄屏替代；
- 点击区域至少接近 36×36 像素；
- 图标按钮必须有 `aria-label`；
- 表单输入必须关联 label；
- 不移除焦点样式，使用 `focus-visible`；
- 动效使用 `transition-colors` 或 `transition-opacity`，持续时间保持 150–300ms；
- 支持 `prefers-reduced-motion`，不要依赖动画传达结果。

## 5. 暗色模式

暗色适配不是简单把背景变黑。新增一个亮色 class 时，同时检查：

- 背景；
- 主文字和次文字；
- 边框与分隔线；
- hover、focus、disabled；
- 图表坐标轴、网格线、Tooltip；
- loading、空数据和错误状态。

组件可以根据 `theme` Prop 在根节点添加 `dark`，也可以继承宿主 `.dark`。不要直接修改 `document.documentElement`，主题控制权属于宿主。

## 6. 图表限制

- 统一使用 ECharts，不引入第二套图表库；
- 默认关闭无意义动画，大数据时使用抽样或分页；
- 颜色数量保持克制，主序列用品牌色，状态序列用语义色；
- Tooltip 内容必须格式化，轴标签不能重叠；
- 容器尺寸变化时调用 `resize()`，卸载时调用 `dispose()`；
- 暗色模式同步调整文字、轴线、分隔线和 Tooltip；
- loading、无数据、错误状态由 Vue 组件展示，不要只留空画布。

## 7. 样式隔离红线

- 禁止开启 Tailwind Preflight；
- 禁止在组件中使用非 scoped 的 `<style>`；
- 禁止选择 `html`、`body`、`#app` 或宿主 class；
- 禁止修改其他 UMD 的 `wrapperClass`；
- 禁止从正式入口导出未经 `withWrapper()` 包装的业务组件；
- 禁止用大量 `!important` 对抗宿主样式；
- 禁止依赖宿主未约定的字体、CSS Reset 或 UI 框架。

隔离原理和排障方法见 [Tailwind 隔离指南](./TAILWIND_ISOLATION_GUIDE.md)。

## 8. 提交前视觉检查

- [ ] 亮色和暗色均无低对比度内容；
- [ ] 360px 宽度下无意外横向滚动；
- [ ] 长标题、长数字和空值不会破坏布局；
- [ ] hover、focus-visible、disabled、loading 状态可辨识；
- [ ] 错误信息说明下一步，而非只显示“失败”；
- [ ] 配色、字号、圆角、阴影未超出本规范；
- [ ] 没有全局 CSS、任意值堆砌或无意义动效；
- [ ] 图标按钮有可访问名称。
