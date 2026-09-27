/**
 * useSectionMotions
 * 方案A：GSAP + ScrollTrigger 全面接管 —— 统一动效模块
 *
 * 挂在 App 的 <main> ref 上，用 gsap.context 注册 / ctx.revert() 清理。
 * 覆盖：
 *   - Hero 首屏 Opening（curtain 遮罩揭开 + 标题位移/压缩归位 + 其余元素错峰）
 *   - 各 section 英文大标题大幅进场（.sec-tag / .sec-title / .contact-title + .en）
 *   - 卡片 stagger（.about-grid / .project-list / .more-grid / .skills-grid /
 *     .qr-list / .xhs-links / .contact-actions / .contact-tags）
 *   - 图片 clip-path reveal + 轻微 parallax（scrub）
 *   - prefers-reduced-motion / 窄屏(<768px) 直接显示终态，不注册动画
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isNarrow = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(max-width: 767px)').matches

// 卡片 stagger 容器
const STAGGER_SELECTORS = [
  '.about-grid',
  '.project-list',
  '.more-grid',
  '.skills-grid',
  '.qr-list',
  '.xhs-links',
  '.contact-actions',
  '.contact-tags',
]

const q = (scope, sel) => Array.from(scope.querySelectorAll(sel))

/** 取容器的 stagger 目标子项（.contact-tags 里跳过 · 分隔符） */
function pickKids(container) {
  const kids = Array.from(container.children)
  if (container.classList.contains('contact-tags')) {
    return kids.filter((el) => el.tagName === 'SPAN')
  }
  return kids
}

/** Hero 首屏 Opening */
function heroIntro(scope) {
  const hero = scope.querySelector('#home')
  if (!hero) return

  const curtainL = hero.querySelector('.hero-curtain-l')
  const curtainR = hero.querySelector('.hero-curtain-r')

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // 1) 遮罩揭开（左右两片滑开）
  if (curtainL && curtainR) {
    tl.to(curtainL, { xPercent: -102, duration: 0.5, ease: 'power4.inOut' }, 0)
      .to(curtainR, { xPercent: 102, duration: 0.5, ease: 'power4.inOut' }, 0.05)
      .add(() => {
        curtainL.remove()
        curtainR.remove()
      }, 0.58)
  }

  // 2) 标题：中文名 位移+压缩归位；英文名 错峰进场
  tl.fromTo(
    hero.querySelector('.hero-cn'),
    { y: 80, scaleY: 0.85, autoAlpha: 0 },
    { y: 0, scaleY: 1, autoAlpha: 1, duration: 0.6, ease: 'power4.out' },
    0.2
  ).fromTo(
    hero.querySelector('.hero-en'),
    { y: 60, x: -40, autoAlpha: 0 },
    { y: 0, x: 0, autoAlpha: 1, duration: 0.6 },
    0.3
  )

  // 3) 其余元素错峰接入
  const items = [
    ['.hero-topline', 0.35],
    ['.hero-roles', 0.5],
    ['.hero-desc', 0.65],
    ['.hero-actions', 0.8],
    ['.hero-meta', 0.95],
  ]
  items.forEach(([sel, at]) => {
    const el = hero.querySelector(sel)
    if (el) tl.fromTo(el, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45 }, at)
  })

  return tl
}

/** 单个 section：标题大幅进场 → 副文案 → 卡片 stagger → 图片 reveal */
function setupSection(sec) {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
  let t = 0

  // 各 section 的英文大标题/标签：随滚动大幅进场
  const secTag = sec.querySelector('.sec-tag')
  if (secTag) {
    tl.fromTo(
      secTag,
      { x: -60, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.45 },
      t
    )
    t += 0.05
  }
  const secTitle = sec.querySelector('.sec-title, .contact-title')
  if (secTitle) {
    tl.fromTo(
      secTitle,
      { y: 140, scale: 1.06, autoAlpha: 0 },
      { y: 0, scale: 1, autoAlpha: 1, duration: 0.6 },
      t + 0.03
    )
    const en = secTitle.querySelector('.en')
    if (en) {
      tl.fromTo(en, { x: -36, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5 }, t + 0.18)
    }
    t += 0.75
  }

  // 容器的 stagger 目标（排除本 section 的 hero）
  const containers = []
  STAGGER_SELECTORS.forEach((sel) => {
    sec.querySelectorAll(sel).forEach((c) => containers.push(c))
  })
  const containerTargets = new Set()
  containers.forEach((c) => pickKids(c).forEach((k) => containerTargets.add(k)))

  // 通用 .reveal 文案块（副标题/说明/简介等）错峰出场
  // 标题元素（.sec-tag/.sec-title/.contact-title）已由上方专属动画接管，
  // 必须排除，避免同一元素被两套 tween 二次接管 → “淡入→骤降淡出→二次淡入”闪烁/悬空
  const TITLE_SELECTOR = '.sec-tag, .sec-title, .contact-title'
  const generics = q(sec, '.reveal').filter(
    (el) => !containerTargets.has(el) && !el.matches(TITLE_SELECTOR)
  )
  generics.forEach((el, i) => {
    tl.fromTo(el, { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, t + i * 0.04)
  })
  t += generics.length * 0.04 + 0.05

  // 卡片 stagger（容器自身若为 reveal 需立即显示终态，仅子项错峰）
  containers.forEach((container) => {
    if (container.classList.contains('reveal')) {
      gsap.set(container, { autoAlpha: 1 })
    }
    const kids = pickKids(container)
    if (kids.length) {
      tl.fromTo(
        kids,
        { y: 60, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.05 },
        t
      )
      t += 0.2 + kids.length * 0.02
    }
  })

  // 图片 clip-path reveal（随滚动 once，非 scrub）
  sec.querySelectorAll('.project-img-wrap, .more-img').forEach((wrap) => {
    const imgs = wrap.querySelectorAll('img, video')
    imgs.forEach((im) => {
      tl.fromTo(
        im,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power4.inOut' },
        t + 0.08
      )
      t += 0.08
    })
  })

  ScrollTrigger.create({
    trigger: sec,
    start: 'top 62%',
    once: true,
    onEnter: () => tl.play(),
  })
}

/** 图片轻微 parallax（scrub） */
function buildParallax(scope) {
  scope.querySelectorAll('.project-img-wrap, .more-img').forEach((wrap) => {
    const im = wrap.querySelector('img, video')
    if (!im) return
    gsap.fromTo(
      im,
      { yPercent: -6, scale: 1.14 },
      {
        yPercent: 6,
        scale: 1.14,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
          // 仅在进入滚动区间时临时提升合成层，离开即清理，避免多图常驻 GPU 合成层
          onToggle: (self) => {
            if (self.isActive) im.style.willChange = 'transform'
            else im.style.willChange = ''
          },
        },
      }
    )
  })
}

/** 无动画分支：直接显示终态 */
function forceFinal(scope) {
  q(scope, '.reveal').forEach((el) => gsap.set(el, { autoAlpha: 1, x: 0, y: 0, scale: 1 }))
  q(scope, '.hero-curtain').forEach((el) => gsap.set(el, { display: 'none' }))
  q(scope, '.project-img-wrap img, .project-img-wrap video, .more-img img').forEach((im) =>
    gsap.set(im, { clipPath: 'none', yPercent: 0, scale: 1 })
  )
}

export default function useSectionMotions(scopeRef) {
  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return

    if (reduceMotion() || isNarrow()) {
      forceFinal(scope)
      ScrollTrigger.refresh()
      return
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.config({ ignoreMobileResize: true })
      heroIntro(scope)
      scope.querySelectorAll('section').forEach((sec) => {
        if (sec.id !== 'home') setupSection(sec)
      })
      buildParallax(scope)
      // 图片/字体加载后重算触发位置
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh())
      }
      ScrollTrigger.refresh()
    }, scope)

    return () => ctx.revert()
  }, [scopeRef])
}
