import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function PdfEntry({ title, en, desc, src, icon = '▤', external = false }) {
  const [open, setOpen] = useState(false)
  const [isFull, setIsFull] = useState(false)
  const stageRef = useRef(null)

  const close = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    setIsFull(false)
    setOpen(false)
  }

  const toggleFull = async () => {
    const el = stageRef.current
    if (!el) return
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen?.()
        setIsFull(true)
      } else {
        await document.exitFullscreen()
        setIsFull(false)
      }
    } catch {
      setIsFull((f) => !f)
    }
  }

  // Esc 关闭 + 监听全屏退出状态
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    const onFsChange = () => { if (!document.fullscreenElement) setIsFull(false) }
    window.addEventListener('keydown', onKey)
    document.addEventListener('fullscreenchange', onFsChange)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('fullscreenchange', onFsChange)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <section className="pdf-entry">
      <div className="container">
        <article className="pdf-card reveal" onClick={() => (external ? window.open(src, '_blank', 'noopener') : setOpen(true))}>
          <div className="pdf-card-glow" />
          <div className="pdf-card-icon">
            <span>{icon}</span>
            <i>PDF</i>
          </div>
          <div className="pdf-card-info">
            <h3>{title}</h3>
            <div className="pdf-card-en">{en}</div>
            <p>{desc}</p>
          </div>
          <div className="pdf-card-btn">
            <span className="pcb-main">{external ? '下载 PDF' : '嵌入预览'}</span>
            <span className="pcb-sub">{external ? 'Download · 新标签打开' : 'Open Viewer · 点击打开'}</span>
          </div>
          <span className="pdf-card-arrow">→</span>
        </article>
      </div>

      {/* 嵌入查看器（Portal 到 body，脱离 main 层叠上下文） */}
      {createPortal(
        open && (
        <div className="pdf-modal" onClick={close}>
          <div
            className={`pdf-stage ${isFull ? 'pdf-stage-full' : ''}`}
            ref={stageRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pdf-toolbar">
              <div className="pdf-toolbar-title">
                <span className="pt-icon">▤</span>
                <b>{title}</b>
                <i>{en}</i>
              </div>
              <div className="pdf-toolbar-actions">
                <a className="pt-btn" href={src} target="_blank" rel="noreferrer" title="在新标签打开">
                  <span>新标签</span>
                </a>
                <button className="pt-btn" onClick={toggleFull} title="全屏切换">
                  <span>{isFull ? '退出全屏' : '全屏'}</span>
                </button>
                <button className="pt-btn pt-close" onClick={close} title="关闭">
                  <span>✕ 关闭</span>
                </button>
              </div>
            </div>
            <div className="pdf-frame">
              <iframe
                key={src}
                src={src}
                title={title}
                frameBorder="0"
              />
            </div>
            <div className="pdf-hint">
              <span>ESC 关闭 · 支持全屏 / 新标签打开 · 页面内直接预览</span>
            </div>
          </div>
        </div>
        ),
        document.body
      )}

      <style>{`
        .pdf-entry { padding: 40px 0; }
        .pdf-card {
          position: relative;
          display: flex; align-items: center; gap: 30px;
          padding: 38px 46px;
          border-radius: var(--radius);
          border: 1px solid var(--line-strong);
          background: linear-gradient(120deg, rgba(255, 255, 255, 0.55), rgba(255, 196, 0, 0.10));
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.45s, border-color 0.45s;
          box-shadow: 0 18px 60px rgba(255, 122, 0, 0.14);
        }
        .pdf-card:hover {
          transform: translateY(-6px);
          border-color: var(--orange-red);
          box-shadow: var(--shadow-glow);
        }
        .pdf-card-glow {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(360px 180px at 88% 50%, rgba(255, 196, 0, 0.30), transparent 70%);
          opacity: 0; transition: opacity 0.45s;
        }
        .pdf-card:hover .pdf-card-glow { opacity: 1; }
        .pdf-card-icon {
          flex: none;
          width: 78px; height: 78px;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
          border-radius: 20px;
          background: var(--grad-main);
          color: #fff;
          box-shadow: 0 12px 34px rgba(255, 90, 31, 0.36);
        }
        .pdf-card-icon span { font-size: 26px; line-height: 1; }
        .pdf-card-icon i { font-style: normal; font-family: var(--font-en); font-size: 11px; font-weight: 700; letter-spacing: 0.2em; }
        .pdf-card-info { flex: 1; min-width: 0; }
        .pdf-card-info h3 { font-size: 26px; margin-bottom: 4px; }
        .pdf-card-en { font-family: var(--font-en); font-size: 12.5px; letter-spacing: 0.12em; color: var(--orange-red); margin-bottom: 8px; text-transform: uppercase; }
        .pdf-card-info p { font-size: 14px; line-height: 1.75; color: var(--ink-2); }
        .pdf-card-btn { flex: none; text-align: right; }
        .pcb-main {
          display: block; font-size: 15px; font-weight: 700; color: #fff;
          background: var(--grad-main); padding: 13px 26px; border-radius: 999px;
          box-shadow: 0 10px 30px rgba(255, 90, 31, 0.30);
        }
        .pcb-sub { display: block; margin-top: 8px; font-family: var(--font-en); font-size: 11px; letter-spacing: 0.1em; color: var(--ink-2); }
        .pdf-card-arrow {
          flex: none; font-size: 30px; color: var(--orange-red);
          transition: transform 0.4s;
        }
        .pdf-card:hover .pdf-card-arrow { transform: translateX(10px); }

        /* 模态 */
        .pdf-modal {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: rgba(38, 18, 4, 0.92);
          backdrop-filter: blur(14px);
          animation: lbFade 0.3s ease;
          padding: 30px;
        }
        @keyframes lbFade { from { opacity: 0; } to { opacity: 1; } }
        .pdf-stage {
          width: min(1500px, 96vw);
          height: min(88vh, 900px);
          display: flex; flex-direction: column;
          background: #fff;
          border-radius: var(--radius);
          border: 1px solid var(--line-strong);
          overflow: hidden;
          box-shadow: 0 40px 140px rgba(0, 0, 0, 0.5), 0 0 90px rgba(255, 122, 0, 0.18);
          animation: lbImg 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes lbImg { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        .pdf-stage-full {
          width: 100vw; height: 100vh; max-width: none; max-height: none;
          border-radius: 0; border: none;
        }
        .pdf-toolbar {
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 14px 22px;
          background: var(--grad-main);
          color: #fff;
          flex: none;
        }
        .pdf-toolbar-title { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .pt-icon { font-size: 16px; }
        .pdf-toolbar-title b { font-size: 16px; white-space: nowrap; }
        .pdf-toolbar-title i { font-style: normal; font-family: var(--font-en); font-size: 11.5px; letter-spacing: 0.1em; opacity: 0.9; white-space: nowrap; }
        .pdf-toolbar-actions { display: flex; gap: 8px; flex: none; }
        .pt-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 16px; border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.55);
          background: rgba(255, 255, 255, 0.16);
          color: #fff; font-family: var(--font-en); font-size: 12.5px; font-weight: 600;
          cursor: pointer; transition: background 0.3s, transform 0.3s;
          text-decoration: none;
        }
        .pt-btn:hover { background: rgba(255, 255, 255, 0.32); transform: translateY(-1px); }
        .pt-close { background: rgba(0, 0, 0, 0.22); }
        .pt-close:hover { background: var(--orange-red); }
        .pdf-frame { flex: 1; min-height: 0; background: #ececec; }
        .pdf-frame iframe { width: 100%; height: 100%; border: 0; display: block; }
        .pdf-hint {
          flex: none;
          padding: 10px 22px;
          text-align: center;
          font-family: var(--font-en); font-size: 11.5px; letter-spacing: 0.12em;
          color: var(--ink-2);
          background: rgba(255, 243, 222, 0.9);
          border-top: 1px solid var(--line);
        }

        @media (max-width: 900px) {
          .pdf-card { flex-direction: column; align-items: flex-start; padding: 30px; }
          .pdf-card-btn { text-align: left; }
          .pdf-card-arrow { display: none; }
          .pdf-toolbar-title i { display: none; }
        }
      `}</style>
    </section>
  )
}
