import { useEffect, useRef, useState } from 'react'

// 自媒体数据矩阵（由 Skills 拆出为独立区块：四矩阵 + Counter 数字动画）
const stats = [
  { value: 53, suffix: 'w+', label: '自媒体内容阅读总量', note: '小红书合计阅读', en: 'Total Reads' },
  { value: 1.1, suffix: 'w', label: '获赞收藏', note: '小红书账号累计', en: 'Likes & Saves' },
  { value: 52, suffix: 'w', label: '单篇笔记最高浏览', note: '小红书爆款内容', en: 'Best Single Post' },
  { value: 11, suffix: '人', label: '跨职能团队管理', note: '创新创业项目负责人', en: 'Team Managed' },
]

export default function PersonalStats() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (el) obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const Counter = ({ to, suffix }) => {
    const [n, setN] = useState(0)
    useEffect(() => {
      if (!started) return
      const duration = 1500
      const t0 = performance.now()
      let raf
      const tick = (t) => {
        const p = Math.min((t - t0) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setN(Number((to * eased).toFixed(1)))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
    }, [started, to])
    return (
      <span className="stat-num">
        {n}
        <em>{suffix}</em>
      </span>
    )
  }

  return (
    <section id="stats" className="stats-section">
      <div className="grid-bg" />
      <div className="container">
        <div className="sec-tag reveal">04 · Impact</div>
        <h2 className="sec-title reveal">
          数据矩阵
          <span className="grad"> Impact</span>
          <span className="en">Self-media operation outcomes — reach · engagement · leadership</span>
        </h2>
        <p className="sec-sub reveal">
          自媒体运营成果与团队管理数据。
          <span className="en">Measurable results across content and leadership.</span>
        </p>

        {/* 数据矩阵：自媒体运营成果（四矩阵，Counter 动画） */}
        <div className="stats reveal" ref={ref}>
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <Counter to={s.value} suffix={s.suffix} />
              <b>{s.label}</b>
              <span>{s.note} · {s.en}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-section { padding: 150px 0; overflow: hidden; }

        /* 数据矩阵（四矩阵 + Counter 数字动画，样式与 Skills 内嵌时保持一致） */
        .stats {
          margin-top: 96px;
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          align-items: stretch;
        }
        .stat-item {
          padding: 42px 44px 38px; border-radius: var(--radius);
          border: 1px solid var(--line);
          background: linear-gradient(160deg, rgba(255,196,0,0.26), rgba(255,107,44,0.14));
          backdrop-filter: blur(22px) saturate(180%);
          -webkit-backdrop-filter: blur(22px) saturate(180%);
          position: relative; overflow: hidden;
          display: flex; flex-direction: column; justify-content: center;
        }
        .stat-item::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.22), transparent 45%);
          pointer-events: none;
        }
        .stat-item .stat-num {
          display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 14px;
          font-family: var(--font-display);
          font-size: clamp(130px, 10vw, 200px);
          line-height: 0.9; color: var(--ink);
          margin-bottom: 20px;
          white-space: normal; word-break: break-all;
          letter-spacing: 0.01em;
          width: 100%;
          position: relative; z-index: 1;
        }
        .stat-item .stat-num em {
          font-style: normal; font-size: 0.1667em; line-height: 1;
          color: var(--orange-red); font-family: var(--font-en);
          font-weight: 700; letter-spacing: 0.04em;
        }
        .stat-item b { display: block; font-size: 16px; margin-bottom: 8px; position: relative; z-index: 1; }
        .stat-item span { font-size: 13px; color: var(--ink-3); position: relative; z-index: 1; }

        @media (max-width: 1100px) { .stats { grid-template-columns: repeat(2, 1fr); } }

        @media (max-width: 760px) {
          .stats-section { padding: 96px 0; }
          .stats { grid-template-columns: 1fr; gap: 16px; margin-top: 52px; }
          .stat-item { padding: 30px 26px 26px; }
          .stat-item .stat-num { font-size: clamp(72px, 18vw, 120px); margin-bottom: 16px; }
          .stat-item b { font-size: 15px; }
          .stat-item span { font-size: 12.5px; }
        }
      `}</style>
    </section>
  )
}
