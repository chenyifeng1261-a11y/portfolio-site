import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

// worker 以静态文件形式放在 public/ 下（Vite 直接复制，避免 ?url 导入在 pdfjs-dist 5.x 下不产 chunk 的问题）
pdfjsLib.GlobalWorkerOptions.workerSrc = `${import.meta.env.BASE_URL}pdf.worker.min.mjs`

// 基于 PDF.js 的 PDF 预览渲染器：解决 Chrome 内置 PDF viewer(PDFium)
// 对部分 PDF（字体/结构特性不兼容）白屏的问题。
// 支持：按容器宽度自适应、页码翻页、缩放、错误兜底提示。
// 加载动效：首次加载显示磨砂玻璃进度动效；翻页采用离屏渲染 + 淡入，全程无文字遮罩、无闪烁。
export default function PdfViewer({ src, title = '', onPageChange }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const renderTaskRef = useRef(null)
  const [doc, setDoc] = useState(null)
  const [numPages, setNumPages] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [status, setStatus] = useState('loading') // loading | rendering | ready | error
  const [containerW, setContainerW] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [fadeIn, setFadeIn] = useState(false)

  // 加载 PDF 文档
  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setDoc(null)
    setNumPages(0)
    setPageNum(1)
    setZoom(1)
    pdfjsLib
      .getDocument({ url: src, isEvalSupported: false })
      .promise.then((d) => {
        if (cancelled) {
          d.destroy()
          return
        }
        setDoc(d)
        setNumPages(d.numPages)
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
      setDoc((d) => {
        if (d) d.destroy()
        return null
      })
    }
  }, [src])

  // 容器宽度测量（含 resize）。wrap 始终挂载（loading 时放状态提示），
  // mount 即可测得宽度，避免 ready 后才挂载导致的测量时序问题。
  useEffect(() => {
    const measure = () => {
      if (wrapRef.current) setContainerW(wrapRef.current.clientWidth)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (wrapRef.current) ro.observe(wrapRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  // 页码变化时通知外部（章节进度条高亮用）
  useEffect(() => {
    if (onPageChange) onPageChange(pageNum)
  }, [pageNum, onPageChange])

  // 渲染当前页：离屏 canvas 渲染完成后一次性替换，避免翻页闪烁与白屏；
  // 翻页期间保留上一页画面，渲染完成淡入新页。
  useEffect(() => {
    const canvas = canvasRef.current
    if (!doc || !canvas || !containerW) return
    let cancelled = false
    const run = async () => {
      try {
        const page = await doc.getPage(pageNum)
        if (cancelled) return
        const base = page.getViewport({ scale: 1 })
        const avail = Math.max(containerW - 16, 240)
        const fit = avail / base.width
        const scale = zoom * fit
        const vp = page.getViewport({ scale })

        const off = document.createElement('canvas')
        off.width = Math.min(Math.round(vp.width), 4096)
        off.height = Math.min(Math.round(vp.height), 4096)
        const offCtx = off.getContext('2d')
        offCtx.fillStyle = '#fff'
        offCtx.fillRect(0, 0, off.width, off.height)
        if (renderTaskRef.current) renderTaskRef.current.cancel()
        const task = page.render({ canvasContext: offCtx, viewport: vp })
        renderTaskRef.current = task
        await task.promise
        if (cancelled) return

        const ctx = canvas.getContext('2d')
        canvas.width = off.width
        canvas.height = off.height
        ctx.drawImage(off, 0, 0)
        canvas.style.visibility = 'visible'
        setFadeIn(false)
        requestAnimationFrame(() => setFadeIn(true))
        setStatus('ready')
      } catch (e) {
        if (!cancelled && e?.name !== 'RenderingCancelledException') setStatus('error')
      }
    }
    if (status !== 'loading') setStatus('rendering')
    run()
    return () => {
      cancelled = true
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel()
        } catch {
          /* ignore */
        }
      }
    }
  }, [doc, pageNum, containerW, zoom])

  const prev = () => setPageNum((n) => Math.max(1, n - 1))
  const next = () => setPageNum((n) => Math.min(numPages, n + 1))

  return (
    <div className="pv-root">
      <div className="pv-canvas-wrap" ref={wrapRef}>
        {status === 'rendering' && <span className="pv-pulse" />}
        <canvas ref={canvasRef} className={fadeIn ? 'pv-canvas-show' : ''} />
        {status === 'loading' && (
          <div className="pv-splash">
            <span className="pv-splash-ring" />
            <span className="pv-splash-bar">
              <i />
            </span>
          </div>
        )}
        {status === 'error' && (
          <div className="pv-error">
            <b>PDF 渲染失败</b>
            <span>请点击右上角「新标签 New Tab」打开查看</span>
          </div>
        )}
      </div>
      {status === 'ready' && (
        <div className="pv-toolbar">
          <button className="pv-btn" onClick={prev} disabled={pageNum <= 1} title="上一页">
            ‹ 上一页
          </button>
          <span className="pv-page">
            {pageNum} / {numPages}
          </span>
          <button className="pv-btn" onClick={next} disabled={pageNum >= numPages} title="下一页">
            下一页 ›
          </button>
          <span className="pv-sep" />
          <button className="pv-btn" onClick={() => setZoom((z) => Math.max(0.6, +(z * 0.85).toFixed(2)))} title="缩小">
            −
          </button>
          <span className="pv-page">{Math.round(zoom * 100)}%</span>
          <button className="pv-btn" onClick={() => setZoom((z) => Math.min(3, +(z * 1.18).toFixed(2)))} title="放大">
            ＋
          </button>
          <button className="pv-btn pv-btn-fit" onClick={() => setZoom(1)} title="适应宽度">
            适应宽度
          </button>
        </div>
      )}
      <style>{`
        .pv-root { width: 100%; height: 100%; display: flex; flex-direction: column; background: #ececec; }
        .pv-canvas-wrap {
          position: relative;
          flex: 1; min-height: 0; overflow: auto;
          display: flex; align-items: flex-start; justify-content: center;
          background: #e6e6e6;
          padding: 14px;
        }
        .pv-canvas-wrap canvas {
          display: block;
          background: #fff;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.22);
          max-width: none;
          visibility: hidden;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .pv-canvas-wrap canvas.pv-canvas-show {
          opacity: 1;
        }
        /* 首次加载：磨砂玻璃进度动效（无文字） */
        .pv-splash {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px;
          background:
            radial-gradient(120% 120% at 50% 0%, rgba(255, 196, 0, 0.16), transparent 55%),
            linear-gradient(160deg, rgba(255, 255, 255, 0.62), rgba(255, 224, 178, 0.42));
          backdrop-filter: blur(16px) saturate(150%);
          -webkit-backdrop-filter: blur(16px) saturate(150%);
        }
        .pv-splash-ring {
          width: 54px; height: 54px; border-radius: 50%;
          border: 3px solid rgba(255, 122, 0, 0.18);
          border-top-color: var(--orange-red);
          border-right-color: var(--gold);
          animation: pvSpin 1s linear infinite;
          box-shadow: 0 0 24px rgba(255, 122, 0, 0.30);
        }
        .pv-splash-bar {
          width: 180px; height: 4px; border-radius: 999px;
          background: rgba(255, 122, 0, 0.16);
          overflow: hidden;
          position: relative;
        }
        .pv-splash-bar i {
          position: absolute; inset: 0;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--orange-red), var(--gold), var(--orange-red));
          background-size: 200% 100%;
          animation: pvBar 1.4s linear infinite;
        }
        @keyframes pvBar { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes pvSpin { to { transform: rotate(360deg); } }
        /* 翻页轻量脉冲指示（不遮罩页面） */
        .pv-pulse {
          position: absolute; top: 12px; right: 12px;
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--orange-red);
          box-shadow: 0 0 0 rgba(255, 122, 0, 0.5);
          animation: pvPulse 1.1s ease-out infinite;
          pointer-events: none;
        }
        @keyframes pvPulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 122, 0, 0.55); }
          100% { box-shadow: 0 0 0 12px rgba(255, 122, 0, 0); }
        }
        /* 错误兜底 */
        .pv-error {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;
          background: rgba(250, 246, 240, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .pv-error b { font-size: 16px; color: var(--orange-red); }
        .pv-error span { font-family: var(--font-en); font-size: 12px; color: var(--ink-3); }
        .pv-toolbar {
          flex: none;
          display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 8px;
          padding: 9px 12px;
          background: rgba(255, 243, 222, 0.95);
          border-top: 1px solid var(--line);
        }
        .pv-btn {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 0; padding: 7px 14px; border-radius: 999px;
          border: 1px solid var(--line-strong);
          background: #fff; color: var(--ink);
          font-family: var(--font-en); font-size: 12.5px; font-weight: 600;
          cursor: pointer; transition: background 0.25s, color 0.25s, border-color 0.25s;
        }
        .pv-btn:hover:not(:disabled) { background: var(--grad-main); color: #fff; border-color: transparent; }
        .pv-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .pv-btn-fit { color: var(--orange-red); }
        .pv-sep { width: 1px; height: 20px; background: var(--line-strong); margin: 0 4px; }
        .pv-page { font-family: var(--font-en); font-size: 13px; font-weight: 700; color: var(--ink-2); letter-spacing: 0.04em; }
        @media (max-width: 760px) {
          .pv-canvas-wrap { padding: 8px; }
          .pv-toolbar { gap: 6px; padding: 8px 6px; }
          .pv-btn { padding: 6px 11px; font-size: 11.5px; }
          .pv-btn-fit { display: none; }
          .pv-splash-ring { width: 44px; height: 44px; }
          .pv-splash-bar { width: 140px; }
        }
      `}</style>
    </div>
  )
}
