import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

// worker 以静态文件形式放在 public/ 下（Vite 直接复制，避免 ?url 导入在 pdfjs-dist 5.x 下不产 chunk 的问题）
pdfjsLib.GlobalWorkerOptions.workerSrc = `${import.meta.env.BASE_URL}pdf.worker.min.mjs`

// 基于 PDF.js 的 PDF 预览渲染器：解决 Chrome 内置 PDF viewer(PDFium)
// 对部分 PDF（字体/结构特性不兼容）白屏的问题。
// 支持：按容器宽度自适应、页码翻页、缩放、错误兜底提示。
export default function PdfViewer({ src, title = '' }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const renderTaskRef = useRef(null)
  const [doc, setDoc] = useState(null)
  const [numPages, setNumPages] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [status, setStatus] = useState('loading')
  const [containerW, setContainerW] = useState(0)
  const [zoom, setZoom] = useState(1)

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
        setStatus('ready')
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

  // 渲染当前页
  useEffect(() => {
    const canvas = canvasRef.current
    if (!doc || !canvas || !containerW) return
    let cancelled = false
    const el = canvasRef.current
    if (!el) return
    const run = async () => {
      try {
        const page = await doc.getPage(pageNum)
        if (cancelled) return
        const base = page.getViewport({ scale: 1 })
        const avail = Math.max(containerW - 16, 240)
        const fit = avail / base.width
        const scale = zoom * fit
        const vp = page.getViewport({ scale })
        el.width = Math.min(Math.round(vp.width), 4096)
        el.height = Math.min(Math.round(vp.height), 4096)
        el.style.visibility = 'visible'
        const ctx = el.getContext('2d')
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, el.width, el.height)
        if (renderTaskRef.current) renderTaskRef.current.cancel()
        const task = page.render({ canvasContext: ctx, viewport: vp })
        renderTaskRef.current = task
        await task.promise
        if (!cancelled) setStatus('ready')
      } catch (e) {
        if (!cancelled && e?.name !== 'RenderingCancelledException') setStatus('error')
      }
    }
    setStatus('rendering')
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
        <canvas ref={canvasRef} />
        {status !== 'ready' && (
          <div className={`pv-status${status === 'error' ? ' pv-status-error' : ''}`}>
            {status === 'error' ? (
              <>
                <b>PDF 渲染失败</b>
                <span>请点击右上角「新标签 New Tab」打开查看</span>
              </>
            ) : (
              <>
                <span className="pv-spinner" />
                {status === 'loading' ? '正在加载 PDF…' : `正在渲染第 ${pageNum} 页…`}
              </>
            )}
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
        .pv-status {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;
          color: var(--ink-2); font-size: 14px;
          background: rgba(230, 230, 230, 0.9);
        }
        .pv-status b { font-size: 16px; color: var(--orange-red); }
        .pv-status span { font-family: var(--font-en); font-size: 12px; color: var(--ink-3); }
        .pv-spinner {
          width: 34px; height: 34px; border-radius: 50%;
          border: 3px solid rgba(255, 122, 0, 0.25); border-top-color: var(--orange-red);
          animation: pvSpin 0.9s linear infinite;
        }
        @keyframes pvSpin { to { transform: rotate(360deg); } }
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
        }
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
        }
      `}</style>
    </div>
  )
}
