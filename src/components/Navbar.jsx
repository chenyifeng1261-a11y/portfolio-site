import { useEffect, useState } from 'react'

const links = [
  { href: '#home', label: '首页', en: 'Home' },
  { href: '#about', label: '关于我', en: 'About' },
  { href: '#projects', label: '项目作品', en: 'Projects' },
  { href: '#skills', label: '个人优势', en: 'Skills' },
  { href: '#contact', label: '联系', en: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 菜单打开时锁定 body 滚动，Esc 关闭
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-inner container">
        <a className="nav-logo" href="#home" onClick={() => setMenuOpen(false)}>
          <span className="nav-logo-mark">CYF</span>
          <span className="nav-logo-name">陈一峰 <i>Chen Yifeng</i></span>
        </a>
        <button
          className={`nav-burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
        <nav className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              <b>{l.label}</b>
              <i>{l.en}</i>
            </a>
          ))}
        </nav>
        <a className="btn btn-primary nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
          <span>联系我 <i className="nav-cta-en">Contact</i></span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* 全屏菜单覆盖层（移动端汉堡菜单） */}
      {menuOpen && (
        <div className="nav-overlay" onClick={() => setMenuOpen(false)}>
          <div className="nav-overlay-inner" onClick={(e) => e.stopPropagation()}>
            <div className="nav-overlay-head">
              <span className="nav-overlay-logo">CYF</span>
              <button className="nav-overlay-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
            </div>
            <nav className="nav-overlay-links">
              {links.map((l, i) => (
                <a key={l.href} href={l.href} className="nav-overlay-link" onClick={() => setMenuOpen(false)}>
                  <span className="nol-index">0{i + 1}</span>
                  <b>{l.label}</b>
                  <i>{l.en}</i>
                </a>
              ))}
            </nav>
            <div className="nav-overlay-foot">
              <a className="btn btn-primary" href="#contact" onClick={() => setMenuOpen(false)}>联系我 Contact</a>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
          border-bottom: 1px solid transparent;
        }
        .nav-scrolled {
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          border-bottom-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 10px 40px rgba(255, 122, 0, 0.12), 0 2px 10px rgba(255,255,255,0.5) inset;
        }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; height: 84px; }
        .nav-logo { display: flex; align-items: center; gap: 12px; }
        .nav-logo-mark {
          font-family: var(--font-display); font-size: 26px; letter-spacing: 0.08em;
          background: var(--grad-main); -webkit-background-clip: text; background-clip: text;
          color: transparent; padding: 2px 8px; border: 1.5px solid var(--line-strong); border-radius: 10px;
        }
        .nav-logo-name { font-size: 15px; font-weight: 700; color: var(--ink); white-space: nowrap; }
        .nav-logo-name i { font-style: normal; font-family: var(--font-en); font-size: 12px; font-weight: 600; color: var(--ink-2); margin-left: 4px; }
        .nav-links { display: flex; gap: 6px; }
        .nav-link {
          display: flex; flex-direction: column; align-items: center; gap: 1px;
          padding: 7px 18px; border-radius: 16px;
          transition: background 0.3s;
        }
        .nav-link b { font-size: 14px; color: var(--ink); }
        .nav-link i { font-style: normal; font-family: var(--font-en); font-size: 10px; letter-spacing: 0.14em; color: var(--ink-3); text-transform: uppercase; }
        .nav-link:hover { background: rgba(255, 255, 255, 0.5); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
        .nav-cta { padding: 12px 24px; font-size: 14px; }
        .nav-cta-en { font-style: normal; font-family: var(--font-en); font-size: 11px; letter-spacing: 0.12em; opacity: 0.85; margin-left: 6px; }
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .nav-logo-name { display: none; }
        }

        /* 汉堡按钮：默认隐藏，≤760px 显示 */
        .nav-burger {
          display: none;
          flex-direction: column; justify-content: center; align-items: center; gap: 5px;
          width: 46px; height: 46px; padding: 0;
          border-radius: 14px;
          border: 1.5px solid var(--line-strong);
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          cursor: pointer;
        }
        .nav-burger span {
          display: block; width: 22px; height: 2.5px; border-radius: 2px;
          background: var(--ink);
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .nav-burger.open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
        .nav-burger.open span:nth-child(2) { opacity: 0; }
        .nav-burger.open span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

        /* 全屏菜单覆盖层 */
        .nav-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(255, 253, 249, 0.92);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          display: flex;
          animation: navOverlayFade 0.3s ease;
          overflow-y: auto;
        }
        @keyframes navOverlayFade { from { opacity: 0; } to { opacity: 1; } }
        .nav-overlay-inner {
          width: 100%; max-width: 420px; padding: 0 28px;
          display: flex; flex-direction: column; gap: 28px;
          /* flex 子项 margin:auto 实现居中，且内容超高时可从顶部完整滚动（修复矮屏裁切） */
          margin: auto;
        }
        .nav-overlay-head { display: flex; align-items: center; justify-content: space-between; }
        .nav-overlay-logo {
          font-family: var(--font-display); font-size: 30px; letter-spacing: 0.08em;
          background: var(--grad-main); -webkit-background-clip: text; background-clip: text;
          color: transparent;
          padding: 2px 8px; border: 1.5px solid var(--line-strong); border-radius: 10px;
        }
        .nav-overlay-close {
          width: 56px; height: 56px; border-radius: 50%;
          border: 1.5px solid var(--line-strong);
          background: rgba(255, 255, 255, 0.55);
          color: var(--ink); font-size: 22px; line-height: 1;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease;
        }
        .nav-overlay-close:hover { transform: rotate(90deg); background: var(--orange-red); color: #fff; }
        .nav-overlay-links { display: flex; flex-direction: column; gap: 6px; }
        .nav-overlay-link {
          display: flex; align-items: center; gap: 16px;
          padding: 22px 18px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .nav-overlay-link:hover { background: rgba(255, 255, 255, 0.7); transform: translateX(6px); }
        .nav-overlay-link .nol-index { font-family: var(--font-display); font-size: 22px; color: var(--orange-red); }
        .nav-overlay-link b { font-size: 20px; color: var(--ink); flex: 1; }
        .nav-overlay-link i {
          font-style: normal; font-family: var(--font-en); font-size: 11px;
          letter-spacing: 0.14em; color: var(--ink-2); text-transform: uppercase;
        }
        .nav-overlay-foot { display: flex; justify-content: center; }

        @media (max-width: 760px) {
          .nav-burger { display: flex; }
          .nav-cta { display: none; }
          .nav-overlay-inner { padding-top: 24px; padding-bottom: 40px; }
        }
      `}</style>
    </header>
  )
}
