# AI 开发规范与提示词

AI 生成的代码与人工代码使用同一套验收标准。AI 可以加速实现，但不能替代对现有代码、类型检查和构建结果的核对。

## 使用方法

1. 先让 AI 阅读本文件、[开发指南](./DEVELOPMENT_GUIDE.md)和[UI 与样式约束](./ui-design-spec.md)。
2. 明确业务目标、输入输出和禁止修改的范围。
3. 要求 AI 先检查现有组件和配置，再直接修改代码。
4. 要求 AI 运行 `pnpm run type-check` 和 `pnpm build`。
5. 人工检查业务正确性、视觉效果和敏感信息。

不要只发送“帮我做一个页面”。缺少边界的提示词容易产生重复组件、随意配色、错误依赖和不可维护的样式。

## 通用开发提示词

复制后替换方括号内容：

```text
请在当前项目中实现【业务目标】。

开始前完整阅读：
- doc/README.md
- doc/DEVELOPMENT_GUIDE.md
- doc/ui-design-spec.md
- 与需求直接相关的现有源码

约束：
1. 使用 Vue 3、TypeScript、<script setup> 和 Tailwind CSS。
2. 复用现有组件、类型和工具，不引入新的 UI 框架。
3. 同时支持亮色、暗色、窄屏和长文本。
4. 颜色优先使用项目 CSS 变量和规范内的 slate/语义色，不自创设计体系。
5. 数据请求只能通过 @kivii.com/bridge，禁止 fetch/axios。
6. Props、Emits、公开方法和请求响应必须有类型。
7. 不修改 UMD 加载协议、Vite/Tailwind 隔离配置或无关文件。
8. 如新增对外组件，完成 index.ts 导出、withWrapper 注册、manifest 和开发预览。
9. 修改对外接口、配置或流程时同步更新已有文档，不新增重复文档。

完成后运行 pnpm run type-check 和 pnpm build，并说明：
- 修改了哪些文件；
- 关键设计选择；
- 验证结果；
- 仍需人工检查的内容。
```

## 新增组件提示词

```text
请新增组件【ComponentName】，用于【业务场景】。

输入：
- Props：【列出字段、类型、默认值】
- Slots：【列出插槽】
- Events：【列出事件和参数】
- 数据来源：【Bridge 接口或无请求】

必须：
- 文件名和组件名使用 PascalCase 且至少两个单词；
- 组件内部定义并 expose manifest；
- 使用 Tailwind，包含亮/暗主题和完整交互状态；
- 处理 loading、空数据、错误和长文本；
- 从 components/index.ts 导出；
- 在 src/build.ts 中通过 withWrapper 注册并更新 manifest；
- 在 src/dev 中通过 @/build 正式导出创建最小预览；
- 扩展 scripts/validate-umd.mjs 的关键契约验证。

不要修改 project.config.js，除非组件代表一个全新的 UMD 项目。
```

## 修复问题提示词

```text
请诊断并修复【现象】。

复现条件：【操作步骤】
期望结果：【正确行为】
实际结果：【错误行为】
范围限制：【允许修改的目录或文件】

先定位根因并检查是否影响 Props、Events、Slots、Ref、样式隔离或 UMD Registry；
再做最小范围修复。不要顺手重构无关代码。
修复后运行类型检查和构建，并说明根因、修复点和回归风险。
```

## UI 评审提示词

```text
请依据 doc/ui-design-spec.md 审查【文件或组件】，直接修复明确违规项。

重点检查：
- 是否擅自使用颜色、字号、圆角、阴影和任意值；
- 亮色/暗色是否成对；
- hover、focus-visible、disabled、loading、空数据和错误状态是否完整；
- 窄屏、长文本、表格溢出是否安全；
- 图标按钮是否有 aria-label；
- 是否存在影响宿主的全局 CSS 或绕过 wrapper 的导出。

保持业务逻辑和对外 API 不变。完成后列出已修复项和需人工确认项。
```

## 文档整理提示词

```text
请更新与本次改动直接相关的现有文档。

规则：
- 以实际代码和 project.config.js 为准；
- 修改现有专题，不创建内容相近的新文件；
- 删除过期命令、旧名称、重复示例和实现细节堆砌；
- 面向新人写清“做什么、不能做什么、如何验证”；
- 检查 doc/README.md 与根 README 的链接；
- 最后报告文档行数变化和被合并/删除的重复内容。
```

## AI 输出验收清单

- 没有虚构文件、API、依赖或构建结果；
- 没有把 Vue、ECharts、Bridge 打进 UMD；
- 没有直接请求后端或硬编码密钥、Token、域名；
- 没有绕过 `project.config.js` 和 `withWrapper()`；
- 没有使用不在 UI 规范中的随意颜色和夸张动效；
- 没有留下未使用代码、调试日志或冲突标记；
- 类型检查和构建真实执行且通过。
