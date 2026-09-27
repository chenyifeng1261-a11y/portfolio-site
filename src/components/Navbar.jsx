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

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-inner container">
        <a className="nav-logo" href="#home">
          <span className="nav-logo-mark">CYF</span>
          <span className="nav-logo-name">陈一峰 <i>Chen Yifeng</i></span>
        </a>
        <nav className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              <b>{l.label}</b>
              <i>{l.en}</i>
            </a>
          ))}
        </nav>
        <a className="btn btn-primary nav-cta" href="#contact">
          <span>联系我 <i className="nav-cta-en">Contact</i></span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
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
      `}</style>
    </header>
  )
}
