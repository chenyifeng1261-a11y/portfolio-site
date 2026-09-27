const roles = [
  { cn: '环境设计师', en: 'Environmental' },
  { cn: '空间设计师', en: 'Spatial' },
  { cn: 'AI 设计师', en: 'AI Designer' },
  { cn: '品牌设计师', en: 'Brand' },
  { cn: '新媒体运营', en: 'Content Ops' },
  { cn: '产品经理', en: 'Product' },
]

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <div className="hero-sun" />
        <div className="hero-blob blob-1" />
        <div className="hero-blob blob-2" />
        <div className="hero-blob blob-3" />
        <div className="hero-grid" />
        <div className="hero-scan" />
        <div className="hero-wave" />
      </div>

      <div className="hero-curtain hero-curtain-l" aria-hidden="true" />
      <div className="hero-curtain hero-curtain-r" aria-hidden="true" />

      <div className="hero-inner container">
        <div className="hero-topline reveal">
          <span className="hero-pulse" />
          PORTFOLIO · 2024 — 2026 · SHANGHAI
        </div>
        <h1 className="hero-title">
          <span className="hero-line hero-cn reveal">陈一峰</span>
          <span className="hero-line hero-en reveal">CHEN YIFENG</span>
        </h1>
        <div className="hero-roles reveal">
          {roles.map((r, i) => (
            <span key={r.cn} className="hero-role">
              {r.cn}
              <em>{r.en}</em>
              {i < roles.length - 1 && <i className="hero-dot">✦</i>}
            </span>
          ))}
        </div>
        <p className="hero-desc reveal">
          设计与金融融合背景的跨学科创造者 —— 从空间设计、AI 赋能产品到新媒体内容增长的全链路实践者。
          <span className="en">Design × Finance × New Media — full-stack creator from space to screen.</span>
        </p>
        <div className="hero-actions reveal">
          <a className="btn btn-primary" href="#projects">
            <span>查看作品 <i className="btn-en">View Works</i></span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a className="btn btn-ghost" href="#contact">联系我 <span className="btn-en">Contact</span></a>
        </div>
      </div>

      <div className="hero-meta">
        <span>SCROLL TO EXPLORE</span>
        <div className="hero-mouse"><div /></div>
      </div>

      <style>{`
        /* opening curtain（GSAP 驱动，动画结束后从 DOM 移除） */
        .hero-curtain { position: absolute; top: 0; height: 100%; z-index: 6; pointer-events: none; }
        .hero-curtain-l { left: 0; width: 52%; background: linear-gradient(115deg, #ffa62b 0%, #ffc85c 100%); }
        .hero-curtain-r { right: 0; width: 52%; background: linear-gradient(-115deg, #ffa62b 0%, #ffc85c 100%); }

        .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; overflow: hidden; background: linear-gradient(160deg, rgba(255,106,0,0.82) 0%, rgba(255,154,0,0.72) 42%, rgba(255,196,0,0.62) 100%); }
        .hero-sun {
          position: absolute; right: -180px; top: -180px; width: 620px; height: 620px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0) 68%);
        }
        .hero-blob { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.5; }
        .blob-1 { width: 520px; height: 520px; left: -140px; bottom: -180px; background: radial-gradient(circle, rgba(255, 61, 0, 0.55), transparent 65%); animation: drift1 16s ease-in-out infinite alternate; }
        .blob-2 { width: 460px; height: 460px; right: 12%; top: 16%; background: radial-gradient(circle, rgba(255, 255, 255, 0.42), transparent 65%); animation: drift2 20s ease-in-out infinite alternate; }
        .blob-3 { width: 400px; height: 400px; left: 30%; top: -140px; background: radial-gradient(circle, rgba(255, 61, 0, 0.4), transparent 65%); animation: drift1 24s ease-in-out infinite alternate-reverse; }
        @keyframes drift1 { from { transform: translate(0, 0) scale(1); } to { transform: translate(90px, 60px) scale(1.12); } }
        @keyframes drift2 { from { transform: translate(0, 0) scale(1.05); } to { transform: translate(-100px, -50px) scale(0.95); } }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.16) 1px, transparent 1px);
          background-size: 84px 84px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 45%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 45%, black 30%, transparent 80%);
        }
        .hero-scan {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(transparent 0%, rgba(255, 255, 255, 0.12) 50%, transparent 100%);
          background-size: 100% 220%; animation: scan 9s linear infinite;
        }
        @keyframes scan { from { background-position: 0 -120%; } to { background-position: 0 220%; } }
        .hero-wave {
          position: absolute; bottom: -2px; left: 0; right: 0; height: 120px;
          background: var(--cream);
          border-radius: 50% 50% 0 0 / 26px 26px 0 0;
        }

        .hero-inner { position: relative; padding-top: 130px; padding-bottom: 130px; }
        .hero-topline {
          display: inline-flex; align-items: center; gap: 12px;
          font-family: var(--font-en); font-size: 13px; font-weight: 700;
          letter-spacing: 0.32em; color: #5b2400; margin-bottom: 22px;
          background: rgba(255, 255, 255, 0.32); padding: 10px 20px; border-radius: 999px;
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.5);
        }
        .hero-pulse { width: 9px; height: 9px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 0 rgba(255,255,255,0.6); animation: pulse 2s infinite; }
        @keyframes pulse { 70% { box-shadow: 0 0 0 12px rgba(255,255,255,0); } 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); } }

        .hero-title { margin-bottom: 30px; }
        .hero-line { display: block; }
        .hero-cn {
          font-family: var(--font-display);
          font-size: clamp(120px, 17vw, 300px);
          line-height: 0.88; letter-spacing: 0.02em;
          color: #fff;
          text-shadow: 0 14px 70px rgba(180, 40, 0, 0.35);
        }
        .hero-en {
          font-family: var(--font-display);
          font-size: clamp(44px, 5.6vw, 96px);
          line-height: 1; letter-spacing: 0.12em;
          color: #5b2400;
          margin-top: 4px;
        }

        .hero-roles { display: flex; flex-wrap: wrap; gap: 10px 0; margin-bottom: 28px; }
        .hero-role {
          display: inline-flex; align-items: baseline; gap: 10px;
          font-size: 16px; font-weight: 700; color: #5b2400;
          padding: 10px 20px; border-radius: 999px;
          background: rgba(255, 255, 255, 0.34); border: 1px solid rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
        }
        .hero-role em { font-style: normal; font-family: var(--font-en); font-size: 11px; font-weight: 600; letter-spacing: 0.12em; color: #7c4a1c; text-transform: uppercase; }
        .hero-dot { font-style: normal; margin-left: 6px; color: #fff; font-size: 11px; }

        .hero-desc { max-width: 680px; font-size: 17px; line-height: 1.9; color: #5b2400; font-weight: 500; margin-bottom: 42px; }
        .hero-desc .en { color: #6d3a12; font-size: 12.5px; }
        .hero-actions { display: flex; gap: 18px; align-items: center; }
        .btn-en { font-size: 11px; opacity: 0.8; }

        .hero-meta {
          position: absolute; left: 50%; bottom: 40px; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          font-family: var(--font-en); font-size: 11px; letter-spacing: 0.3em; color: #5b2400; z-index: 2;
        }
        .hero-mouse { width: 22px; height: 36px; border: 2px solid #5b2400; border-radius: 12px; display: flex; justify-content: center; padding-top: 6px; }
        .hero-mouse div { width: 3px; height: 7px; border-radius: 3px; background: #5b2400; animation: wheel 1.8s infinite; }
        @keyframes wheel { 0% { transform: translateY(0); opacity: 1; } 70% { transform: translateY(12px); opacity: 0; } 100% { transform: translateY(0); opacity: 0; } }

        @media (prefers-reduced-motion: reduce) {
          .hero-blob, .hero-scan { animation: none; }
          .hero-pulse, .hero-mouse div { animation: none; }
        }
      `}</style>
    </section>
  )
}
