---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: 685853406929cb83a26c5823b590fa1e_61777350a22711f193c6525400f8a581
    ReservedCode1: eDOUwrkdCAuqVrFUosM1SKYREUYAJUqFPF6IOnv3W5I+KgFTrKly+j28OFPp42f5l0klBPtiQdBtyOd/JJltLsiLU8vcxbHNmNANtVbjxWGF5iHJHvXabGqeN/36KSF24S9cIbYIe/XaJVpfFyg03jknAKMgEUX/jJFcAemUroQbvlHQfz+PF5DiKzE=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: 685853406929cb83a26c5823b590fa1e_61777350a22711f193c6525400f8a581
    ReservedCode2: eDOUwrkdCAuqVrFUosM1SKYREUYAJUqFPF6IOnv3W5I+KgFTrKly+j28OFPp42f5l0klBPtiQdBtyOd/JJltLsiLU8vcxbHNmNANtVbjxWGF5iHJHvXabGqeN/36KSF24S9cIbYIe/XaJVpfFyg03jknAKMgEUX/jJFcAemUroQbvlHQfz+PF5DiKzE=
---

# 动效升级设计规格 · Motion Upgrade Design

- 日期：2026-08-27
- 项目：`output/portfolio-site`（React 18 + Vite 5，陈一峰个人作品集网站）
- 方案：A — GSAP + ScrollTrigger 全面接管
- 备份：`output/portfolio-site-backup-motion-20260827-222415`（完整含 node_modules，0.82GB）

## 1. 目标

把现有"IntersectionObserver 给 `.reveal` 加 `.in` 的普通淡入"替换为高端设计师作品集 / 创意机构官网级动效：

1. 首屏完整 Opening Animation：遮罩揭开 + 标题位移/压缩后归位
2. 每个模块英文大标题随滚动大幅进场
3. 卡片依次 stagger 出现
4. 图片 reveal + 轻微 parallax
5. 整体夸张但高级，节奏慢、缓动丝滑（不用廉价弹跳），不影响性能

## 2. 依赖与架构

- 安装 `gsap`（`npm i gsap`）
- 删除 `App.jsx` 中 IO 逻辑与 `index.css` 中 `.reveal/.reveal.in` CSS 过渡（transform/opacity 交给 GSAP）
- 新增统一动效模块 `src/hooks/useSectionMotions.js`（或 `src/utils/motions.js`），用 `gsap.context` 在组件内注册/清理，实现：
  - `fadeUp(el, y, delay, dur, ease)`：基础入场
  - `staggerChildren(container, selector, opts)`：卡片错峰
  - `titleReveal(scope)`：英文大标题大幅进场
  - `imageReveal(imgWrap, scrub)`：图片遮罩式 reveal + parallax
  - `heroIntro()`：首屏 opening
- `prefers-reduced-motion`（matchMedia）时跳过所有动画直接显示终态
- 滚动动效统一挂 ScrollTrigger；非滚动入场挂页面级 `gsap.timeline`

## 3. 首屏 Opening Animation（Hero）

时序（从 create 触发，总长 ~1.8s，`power4.out`/`power3.out`，节奏慢）：

1. **遮罩揭开**：Hero 上方覆盖两块暖橙/奶油色 curtain 面板（左右各一或上下两片，初始 opacity 1），动画开始后优雅滑开（x/scaleX），露出下方标题；面板揭开后从 DOM 移除（onComplete）
2. **标题进场（位移+压缩归位）**：中文大标题「陈一峰」从 `y:80 / scaleY:0.85 / opacity:0` 起始，以 `power4.out` 归位到 `scaleY:1 / y:0 / opacity:1`（压缩后归位的强视觉进场）；英文名 `CHEN YIFENG` 错峰 0.25s 后从 `y:60 / x:-40` 进场
3. **其余元素渐次接入**：`.hero-topline` → `.hero-roles` → `.hero-desc` → `.hero-actions` → `.hero-meta`，相隔 0.12–0.18s emit stagger
4. 背景元素（sun/blob/grid/scan/wave）保持现有 CSS 动画不叠加

## 4. 模块标题进场（各 section）

- 目标：`.sec-tag`、`.sec-title`（含 `.en` 英文行）
- 滚动至 section 进入视口约 85% 时触发：
  - `.sec-tag` 先入：`x:-60 / opacity:0` → 归位
  - `.sec-title` 大幅进场：`y:140 / scale:1.06 / opacity:0`，归位过程 `power3.out`，时长 1.1s，不做弹性
  - 其中中文主行与英文 `.en` 行 staggered（0.12s）
- 标题进场期间该 section 内卡片保持 hidden，标题完成后再触发卡片

## 5. 卡片 stagger

- 容器：`.about-grid`、`.project-list > 项目卡片`、`.more-grid`、`.skills-grid`、`.qr-list`、`.xhs-links`、`.contact-actions`、`.contact-tags` 等
- 容器滚入视口后，子项按 `y:60 / opacity:0` → `stagger 0.1s` 依次归位（`power3.out`，0.9s）
- 对 PDF/免责声明等整块卡片（`.dis-card`、`.pdf-card`）按单块 stagger 处理

## 6. 图片 reveal + parallax

- 目标：`.project-media .project-img-wrap img`、`.more-img img` 等
- **reveal**：图片外层 `clip-path: inset(0 0 100% 0)` → `inset(0 0 0% 0)`（或 scaleY 由 0 到 1）随滚动 reveal，1.1s `power4.inOut`
- **parallax**：`.project-img-wrap`/`.more-img` 容器内图片 `yPercent: -6 → +6`，用 ScrollTrigger `scrub: 1` 轻度绑定滚动缓动；容器 `overflow: hidden`，`will-change: transform`

## 7. 性能与兼容

- 所有 GSAP 实例经 `gsap.context(() => {...}, ref)` 注册，组件卸载 `ctx.revert()` 清理，ScrollTrigger 同步 kill
- 只对动效中的元素加 `will-change`（动效结束移除或依赖 gsap clearProps）
- 动画元素默认起始 visible=false 由 CSS 兜底防闪；JS 加载后由 GSAP `from()` 接管起始态
- `prefers-reduced-motion` / 移动端宽度 < 768px：直接显示终态，不注册动画
- 大图（PDF 预览控件、灯箱）不挂 ScrollTrigger，避免性能损耗

## 8. 验收清单

- [ ] `npm run build` 无报错
- [ ] 首屏 opening 遮罩揭开 + 标题压缩归位流畅
- [ ] 各 section 标题大幅进场、卡片 stagger、图片 reveal/parallax 生效
- [ ] 无廉价弹跳、无普通淡入残留
- [ ] 滚动流畅（parallax 轻微）、首屏不被阻塞
- [ ] 关闭 pref-reduced-motion / 窄屏直接显示内容
- [ ] dev server 可访问，无控制台报错
*（内容由AI生成，仅供参考）*
