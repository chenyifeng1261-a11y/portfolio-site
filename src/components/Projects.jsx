import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

// 精选项目：图片按 PDF 作品集原顺序（杏栖 6 组 / 明樾 6 组 / 竹霖 5 组）
const projects = [
  {
    id: '01',
    tag: '空间设计 · 商业空间',
    year: '2024-2026',
    title: '校企联合项目-金茂北外滩商业空间设计',
    subtitle: '活力引擎·多巴胺商业空间 · Vitality Engine · Dopamine Space',
    desc: '与校企联合完成的上海金茂北外滩商业空间设计，以「活力引擎」与多巴胺色彩构建年轻化商业场景，涵盖概念推演、方案图纸与效果图，共 14 页完整记录。',
    en: 'University-Enterprise Project — Jinmao North Bund commercial space design, a dopamine-inspired vitality hub, 14 pages.',
    cover: '/images/portfolio-overview-01.webp',
    images: [
      '/images/portfolio-overview-01.webp',
      '/images/portfolio-overview-02.webp',
      '/images/portfolio-overview-03.webp',
      '/images/portfolio-overview-04.webp',
      '/images/portfolio-overview-05.webp',
      '/images/portfolio-overview-06.webp',
      '/images/portfolio-overview-07.webp',
      '/images/portfolio-overview-08.webp',
      '/images/portfolio-overview-09.webp',
      '/images/portfolio-overview-10.webp',
      '/images/portfolio-overview-11.webp',
      '/images/portfolio-overview-12.webp',
      '/images/portfolio-overview-13.webp',
      '/images/portfolio-overview-14.webp',
    ],
    alt: '校企联合项目-金茂北外滩商业空间设计',
    points: ['校企联合', '多巴胺设计', '商业空间'],
  },
  {
    id: '02',
    tag: '空间设计 · 城市更新',
    year: '2025',
    title: '杏栖 Ginkgo Nest',
    subtitle: '社区居民中心 · Urban Renewal',
    desc: '上海市虹口区欧阳路城市更新中的社区居民中心。以银杏扇形曲线回应老龄化率达 48% 的社区需求，将银杏长寿平和的文化内涵融入适老化空间：银杏投影下的钢琴、日光走廊、光影庭院。',
    en: 'Ginkgo Nest — a senior-friendly community center shaped by ginkgo fan curves, light corridors and shadow courtyards.',
    cover: '/images/project-ginkgo-1.webp',
    video: '/videos/ginkgo.mp4',
    images: [
      '/images/project-ginkgo-1.webp',
      '/images/project-ginkgo-2.webp',
      '/images/project-ginkgo-3.webp',
      '/images/project-ginkgo-4.webp',
      '/images/project-ginkgo-5.webp',
      '/images/project-ginkgo-6.webp',
    ],
    alt: '杏栖社区居民中心设计',
    points: ['适老化设计', '在地研究', '光影叙事'],
  },
  {
    id: '03',
    tag: '产品设计 · AI 辅助',
    year: '2026',
    title: '明樾 Imaginista',
    subtitle: '明制家具的当代应答',
    desc: '以明式家具当代转译为核心的坐具设计。从约 5 版设计演变到「方圆相济」的悬浮式躺椅：铜色框架致敬明式铜饰、编织纹理呼应藤屉透气、圆盘底座承载「圆融承地方」的东方哲学。',
    en: 'Imaginista — a contemporary reinterpretation of Ming-style furniture, a floating lounge chair of square-circle balance.',
    cover: '/images/project-mingyue-1.webp',
    images: [
      '/images/project-mingyue-1.webp',
      '/images/project-mingyue-2.webp',
      '/images/project-mingyue-3.webp',
      '/images/project-mingyue-4.webp',
      '/images/project-mingyue-5.webp',
      '/images/project-mingyue-6.webp',
    ],
    alt: '明樾坐具设计',
    points: ['用户画像分析', '设计溯源', '材质实验'],
  },
  {
    id: '04',
    tag: '工业设计 · AI 赋能',
    year: '2025',
    title: '竹霖 Bamboo Mist',
    subtitle: '节气香光仪 · 谷雨',
    desc: '借竹节形态的可扭动主体融合香薰与灯光功能，构建「可触摸的竹林谧境」。每段竹节可自由转动以调整出雾方向与光影角度，半透明材质与暖黄灯光复刻谷雨时节「竹影伴柔光」的禅意。',
    en: 'Bamboo Mist — a bamboo-joint aroma & light device, a touchable misty bamboo grove for Guyu season.',
    cover: '/images/project-bamboo-1.webp',
    images: [
      '/images/project-bamboo-1.webp',
      '/images/project-bamboo-2.webp',
      '/images/project-bamboo-3.webp',
      '/images/project-bamboo-4.webp',
      '/images/project-bamboo-5.webp',
    ],
    alt: '竹霖香光仪设计',
    points: ['文化溯源', '结构爆炸', '禅意交互'],
  },
]

// 更多作品区：自媒体矩阵（3 图灯箱）+ PDF other works 两组照片（各 1 图灯箱）
const moreWorks = [
  {
    id: 'media',
    name: '自媒体运营矩阵',
    tag: 'Social Media Matrix',
    desc: '小红书 / B站 / X 多平台实战：小红书累计 1.1w 获赞收藏、合计阅读 53w+，单篇笔记最高 52w 浏览；B站单视频最高 2.2w 播放；X 平台单视频最高 1.8w 播放。深度参与设计机构账号 IP 孵化与内容策划。',
    en: 'From zero to 530K+ reads, 52K-view single post across Xiaohongshu / Bilibili / X — full-stack content operations.',
    cover: '/images/project-media-1.webp',
    images: [
      '/images/project-media-1.webp',
      '/images/project-media-2.webp',
      '/images/project-media-3.webp',
    ],
    alt: '自媒体账号运营数据',
    wide: true,
  },
  {
    id: 'other-1',
    label: 'More Works 1',
    cover: '/images/project-other-1.webp',
    images: ['/images/project-other-1.webp'],
    alt: '手绘插画滑雪贺图',
  },
  {
    id: 'other-2',
    label: 'More Works 2',
    cover: '/images/project-other-2.webp',
    images: ['/images/project-other-2.webp'],
    alt: '家具设计系列作品',
  },
]

// 社交媒体账号二维码（横向一行等高）
const socialQr = [
  { name: '抖音', src: '/images/qr-douyin.png' },
  { name: '小红书', src: '/images/qr-xiaohongshu.png' },
  { name: 'B 站', src: '/images/qr-bilibili.png' },
  { name: '视频号', src: '/images/qr-shipinhao.png' },
]

export default function Projects() {
  const [lightbox, setLightbox] = useState(null)

  const openLightbox = (images, index, title) => setLightbox({ images, index: index || 0, title })
  const closeLightbox = () => setLightbox(null)

  // 性能：项目视频仅进入可视区域时播放，离开立即暂停，避免长滚动下常驻硬解占用
  useEffect(() => {
    const vids = Array.from(document.querySelectorAll('video.project-video'))
    if (!vids.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target
          if (entry.isIntersecting) v.play().catch(() => {})
          else v.pause()
        })
      },
      { threshold: 0.25 }
    )
    vids.forEach((v) => io.observe(v))
    return () => io.disconnect()
  }, [])
  const prevImage = () =>
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length } : null
    )
  const nextImage = () =>
    setLightbox((lb) => (lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : null))

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <section id="projects" className="projects">
      <div className="grid-bg" />
      <div className="container">
        <div className="sec-tag reveal">02 · Selected Works</div>
        <h2 className="sec-title reveal">
          精选项目
          <span className="grad"> Works</span>
          <span className="en">Selected Projects · click a card to open full case gallery</span>
        </h2>
        <p className="sec-sub reveal">
          从空间到产品，从线下到线上 —— 四组代表作品，展示我在空间设计、AI 赋能产品中的完整实践链路。
          <b className="sec-hint">点击卡片查看全部大图</b>
        </p>

        <div className="project-list">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className={`project-card reveal ${i % 2 === 1 ? 'project-reverse' : ''}`}
              onClick={() => openLightbox(p.images, 0, p.title)}
            >
              <div className="project-media">
                <div className="project-img-wrap">
                  {p.video ? (
                    <video
                      className="project-video"
                      src={p.video}
                      poster={p.cover}
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                      tabIndex="-1"
                    />
                  ) : (
                    <img src={p.cover} alt={p.alt} loading="lazy" />
                  )}
                  <div className="project-video-grad" />
                  <div className="project-img-grad" />
                  <div className="project-zoom">
                    <span>⌕</span>
                    点击查看 {p.images.length} 张大图
                  </div>
                </div>
                <span className="project-num">{p.id}</span>
                <span className="project-year">{p.year}</span>
              </div>

              <div className="project-info">
                <div className="project-tag">{p.tag}</div>
                <h3 className="project-title">{p.title}</h3>
                <div className="project-sub">{p.subtitle}</div>
                <p className="project-desc">{p.desc}</p>
                <span className="en project-en">{p.en}</span>
                <div className="project-points">
                  {p.points.map((pt) => (
                    <span key={pt}>{pt}</span>
                  ))}
                </div>
                <div className="project-cta">
                  <span className="project-arrow">→</span>
                  <span>View Case</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 更多作品 */}
        <div className="more-works">
          <h3 className="more-title reveal">
            更多作品 <span>More Works · 点击查看大图</span>
          </h3>
          <div className="more-grid">
            {moreWorks.map((w) => (
              <div
                key={w.id}
                className={`more-card reveal ${w.wide ? 'more-wide' : ''}`}
                onClick={() => openLightbox(w.images, 0, w.label || w.name)}
              >
                <div className="more-img">
                  <img src={w.cover} alt={w.alt} loading="lazy" />
                  <div className="more-zoom">⌕</div>
                  <div className="more-count">
                    {w.images.length > 1 ? `${w.images.length} 张大图` : '查看大图'}
                  </div>
                </div>
                {w.label ? (
                  <div className="more-cap more-cap-label">
                    <b>{w.label}</b>
                  </div>
                ) : (
                  <div className="more-cap">
                    <b>{w.name}</b>
                    <span>{w.tag}</span>
                    <p>{w.desc}</p>
                    <i>{w.en}</i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 社交媒体账号二维码 + 小红书视频链接（灯箱与作品集 PDF 之间） */}
        <div className="social-qr">
          <h3 className="more-title reveal">
            社交媒体账号 <span>Social Media Accounts · 扫码关注</span>
          </h3>
          <div className="qr-list reveal">
            {socialQr.map((q) => (
              <figure className="qr-item" key={q.name}>
                <img src={q.src} alt={q.name} loading="lazy" />
                <figcaption>{q.name}</figcaption>
              </figure>
            ))}
          </div>
          <div className="xhs-links reveal">
            <h4 className="xhs-work">代表作</h4>
            <p className="xhs-heading">我曾负责运营的自媒体账号及其执行的视频剪辑</p>
            <ul>
              <li>
                <a
                  href="https://xhslink.cn/o/6tHKwfvmc2x"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  真正的富家千金，从来都不是傻白甜 顶级富豪如何培养...
                </a>
              </li>
              <li>
                <a
                  href="https://xhslink.cn/o/5CyVs5zfR4l"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  揭秘高技派 诺曼福斯特 的设计工作流 KWSD生活主义客...
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 灯箱 Lightbox（Portal 到 body，脱离 main 层叠上下文） */}
      {createPortal(
        lightbox && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lb-close" onClick={closeLightbox} aria-label="关闭">
            ✕
          </div>
          <div className="lb-panel" onClick={(e) => e.stopPropagation()}>
            <div className="lb-stage">
              <img
                key={lightbox.index}
                className="lb-img"
                src={lightbox.images[lightbox.index]}
                alt={lightbox.title}
              />
              {lightbox.images.length > 1 && (
                <>
                  <button className="lb-nav lb-prev" onClick={prevImage} aria-label="上一张">
                    ‹
                  </button>
                  <button className="lb-nav lb-next" onClick={nextImage} aria-label="下一张">
                    ›
                  </button>
                  <div className="lb-count">
                    {lightbox.index + 1} / {lightbox.images.length}
                  </div>
                </>
              )}
            </div>
            <div className="lb-title">
              <b>{lightbox.title}</b>
              <span>ESC 关闭 · ← → 切换</span>
            </div>
          </div>
        </div>
        ),
        document.body
      )}

      <style>{`
        .projects { padding: 150px 0; overflow: hidden; }
        .sec-hint {
          display: inline-block; margin-left: 14px;
          font-size: 13px; font-weight: 600; color: var(--orange-red);
          border: 1px solid var(--line-strong); border-radius: 999px;
          padding: 6px 16px; vertical-align: middle;
        }
        .project-list { margin-top: 72px; display: flex; flex-direction: column; gap: 110px; }

        .project-card {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 56px;
          align-items: center;
          cursor: pointer;
        }
        .project-reverse { grid-template-columns: 1fr 1.15fr; }
        .project-reverse .project-media { order: 2; }
        .project-reverse .project-info { order: 1; }

        .project-media { position: relative; }
        .project-img-wrap {
          border-radius: var(--radius);
          overflow: hidden;
          border: 1px solid var(--line);
          background: var(--card);
          position: relative;
          aspect-ratio: 16 / 11;
          box-shadow: var(--shadow-glow);
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .project-card:hover .project-img-wrap {
          border-color: var(--line-strong);
          box-shadow: 0 34px 110px rgba(255, 107, 44, 0.30);
        }
        .project-img-wrap img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 1.1s cubic-bezier(0.2, 0.8, 0.2, 1), scale 1.1s cubic-bezier(0.2, 0.8, 0.2, 1), filter 1.1s;
        }
        .project-card:hover .project-img-wrap img { scale: 1.06; }
        .project-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          pointer-events: none;
          transition: transform 1.1s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .project-card:hover .project-video { transform: scale(1.06); }
        .project-video-grad {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(120deg, rgba(255, 93, 31, 0.26) 0%, rgba(255, 179, 0, 0.08) 48%, rgba(58, 20, 0, 0.38) 100%);
          pointer-events: none;
        }
        .project-img-grad {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 58%, rgba(120, 46, 0, 0.30));
          pointer-events: none;
        }
        .project-zoom {
          position: absolute; left: 50%; bottom: 20px; transform: translateX(-50%) translateY(10px);
          display: flex; align-items: center; gap: 10px;
          padding: 12px 22px; border-radius: 999px;
          background: rgba(255, 255, 255, 0.55); backdrop-filter: blur(18px) saturate(160%); -webkit-backdrop-filter: blur(18px) saturate(160%);
          border: 1px solid var(--line-strong);
          font-size: 13px; font-weight: 600; color: var(--ink);
          opacity: 0; transition: opacity 0.4s, transform 0.4s;
          white-space: nowrap;
        }
        .project-zoom span {
          font-size: 18px; color: var(--orange-red);
        }
        .project-card:hover .project-zoom { opacity: 1; transform: translateX(-50%) translateY(0); }

        .project-num {
          position: absolute; top: -26px; left: 18px;
          font-family: var(--font-display); font-size: 110px; line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 148, 74, 0.65);
          pointer-events: none;
        }
        .project-year {
          position: absolute; right: 22px; top: 20px;
          font-family: var(--font-en); font-weight: 700; letter-spacing: 0.1em;
          color: #fff; background: var(--grad-main);
          padding: 7px 16px; border-radius: 999px; font-size: 13px;
        }

        .project-info { padding: 8px 0; }
        .project-tag {
          display: inline-block;
          font-family: var(--font-en); font-size: 12px; font-weight: 700;
          letter-spacing: 0.18em; color: var(--orange-red);
          margin-bottom: 14px;
        }
        .project-title {
          font-family: var(--font-display);
          font-size: clamp(44px, 4.6vw, 76px);
          font-weight: 400; line-height: 1;
          margin-bottom: 8px;
        }
        .project-sub { font-family: var(--font-en); font-size: 15px; color: var(--orange-soft); letter-spacing: 0.06em; margin-bottom: 20px; }
        .project-desc { font-size: 15.5px; line-height: 1.95; color: var(--ink-2); max-width: 560px; }
        .project-en { color: var(--ink-3); font-size: 12px; max-width: 560px; margin-top: 8px; }
        .project-points { display: flex; flex-wrap: wrap; gap: 10px; margin: 22px 0 26px; }
        .project-points span {
          font-size: 12.5px; padding: 8px 16px; border-radius: 999px;
          border: 1px solid var(--line-strong); color: var(--ink);
        }
        .project-cta {
          display: inline-flex; align-items: center; gap: 14px;
          font-family: var(--font-en); font-weight: 700; letter-spacing: 0.1em;
          color: var(--orange-red); cursor: pointer;
          border-bottom: 1.5px solid var(--line-strong); padding-bottom: 8px;
          transition: gap 0.3s, color 0.3s;
        }
        .project-cta:hover { gap: 22px; color: var(--orange-red); }
        .project-arrow { font-size: 20px; }

        .more-works { margin-top: 130px; }
        .more-title { font-size: 26px; margin-bottom: 34px; }
        .more-title span { font-family: var(--font-en); font-size: 15px; color: var(--orange-red); font-weight: 600; margin-left: 12px; letter-spacing: 0.06em; }
        .more-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; }
        .more-wide { grid-column: 1 / -1; }
        .more-wide .more-img { aspect-ratio: 21 / 8; }
        .more-card {
          border-radius: var(--radius-sm); overflow: hidden;
          border: 1px solid var(--line); background: rgba(255, 255, 255, 0.46);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          cursor: pointer;
          transition: border-color 0.35s, transform 0.35s, box-shadow 0.35s;
        }
        .more-card:hover {
          border-color: var(--line-strong);
          transform: translateY(-6px);
          box-shadow: 0 22px 60px rgba(255, 107, 44, 0.22);
        }
        .more-img { aspect-ratio: 4 / 3; overflow: hidden; position: relative; }
        .more-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.9s, scale 0.9s; }
        .more-card:hover .more-img img { scale: 1.08; }
        .more-zoom {
          position: absolute; right: 14px; top: 14px;
          width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
          border-radius: 50%; background: rgba(255, 255, 255, 0.88); backdrop-filter: blur(6px);
          border: 1px solid var(--line-strong);
          color: var(--orange-red); font-size: 18px;
          opacity: 0; transition: opacity 0.35s, transform 0.35s;
        }
        .more-card:hover .more-zoom { opacity: 1; transform: scale(1.05); }
        .more-count {
          position: absolute; left: 14px; bottom: 14px;
          padding: 7px 14px; border-radius: 999px;
          background: rgba(255, 255, 255, 0.88); backdrop-filter: blur(6px);
          border: 1px solid var(--line-strong);
          font-size: 12px; font-weight: 600; color: var(--ink);
        }
        .more-cap { padding: 16px 18px; }
        .more-cap b { display: block; font-size: 16px; margin-bottom: 4px; }
        .more-cap span { font-family: var(--font-en); font-size: 12px; color: var(--orange-red); letter-spacing: 0.06em; }
        .more-cap p { margin-top: 8px; font-size: 13px; line-height: 1.8; color: var(--ink-2); }
        .more-cap i { display: block; font-style: normal; font-family: var(--font-en); font-size: 11px; color: var(--ink-3); margin-top: 6px; }

        /* ---------- 灯箱 Lightbox ---------- */
        .lightbox {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: rgba(58, 29, 6, 0.94);
          backdrop-filter: blur(14px);
          animation: lbFade 0.3s ease;
          padding: 40px;
        }
        @keyframes lbFade { from { opacity: 0; } to { opacity: 1; } }
        .lb-close {
          position: absolute; top: 28px; right: 34px; z-index: 10000;
          width: 52px; height: 52px; display: flex; align-items: center; justify-content: center;
          border-radius: 50%; cursor: pointer;
          border: 1px solid var(--line-strong);
          background: rgba(255, 122, 51, 0.18);
          color: #fff; font-size: 18px;
          transition: background 0.3s, transform 0.3s;
        }
        .lb-close:hover { background: var(--grad-main); color: #fff; transform: rotate(90deg); }
        .lb-panel { max-width: 100%; max-height: 100%; display: flex; flex-direction: column; align-items: center; gap: 18px; }
        .lb-stage { position: relative; max-width: 94vw; max-height: 82vh; }
        .lb-img {
          max-width: 94vw; max-height: 82vh; object-fit: contain;
          border-radius: var(--radius);
          border: 1px solid var(--line-strong);
          box-shadow: 0 30px 120px rgba(0, 0, 0, 0.5), 0 0 80px rgba(255, 107, 44, 0.20);
          animation: lbImg 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
          background: #fff;
        }
        @keyframes lbImg { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        .lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 56px; height: 56px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--line-strong);
          background: rgba(255, 255, 255, 0.14); backdrop-filter: blur(8px);
          color: #fff; font-size: 30px; cursor: pointer;
          transition: background 0.3s, color 0.3s, transform 0.3s;
        }
        .lb-nav:hover { background: var(--grad-main); color: #fff; transform: translateY(-50%) scale(1.08); }
        .lb-prev { left: -78px; }
        .lb-next { right: -78px; }
        .lb-count {
          position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%);
          padding: 8px 18px; border-radius: 999px;
          background: rgba(255, 255, 255, 0.16); backdrop-filter: blur(8px);
          border: 1px solid var(--line);
          font-family: var(--font-en); font-weight: 700; font-size: 14px;
          letter-spacing: 0.08em; color: var(--gold);
        }
        .lb-title {
          display: flex; align-items: center; gap: 20px;
          font-size: 15px; color: #fff;
        }
        .lb-title b { font-family: var(--font-en); font-size: 17px; letter-spacing: 0.05em; }
        .lb-title span { font-size: 12px; color: rgba(255,255,255,0.7); font-family: var(--font-en); letter-spacing: 0.08em; }

        .more-cap-label { text-align: center; padding: 20px; }
        .more-cap-label b { font-family: var(--font-display); font-size: 26px; letter-spacing: 0.02em; color: var(--orange-red); }

        /* ---- 社交媒体二维码区 ---- */
        .social-qr { margin-top: 110px; }
        .social-qr .more-title { text-align: center; }
        .qr-list { display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; align-items: flex-start; gap: 30px; margin-top: 46px; }
        .qr-item { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .qr-item img {
          height: 260px; width: auto; max-width: 100%; object-fit: contain;
          border-radius: 18px;
          border: 1px solid var(--line-strong);
          box-shadow: 0 18px 46px rgba(255, 107, 44, 0.18);
        }
        .qr-item figcaption { font-size: 14px; font-weight: 700; color: var(--ink); letter-spacing: 0.1em; }
        .xhs-links { margin: 64px auto 0; max-width: 720px; }
        .xhs-work {
          text-align: center; font-family: var(--font-display); line-height: 1.15;
          font-size: 42px; font-weight: 700; letter-spacing: 0.12em;
          color: var(--orange-red); margin-bottom: 10px;
        }
        .xhs-heading { text-align: center; font-size: 16.5px; font-weight: 600; color: var(--ink); margin-bottom: 26px; }
        .xhs-links ul { list-style: none; display: flex; flex-direction: column; gap: 14px; }
        .xhs-links li { margin: 0; }
        .xhs-links a {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 22px; border-radius: var(--radius-sm);
          border: 1px solid var(--line); background: rgba(255, 255, 255, 0.52);
          color: var(--ink-2); font-size: 14.5px; line-height: 1.6;
          text-decoration: none;
          transition: border-color 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .xhs-links a:hover { color: var(--orange-red); border-color: var(--line-strong); transform: translateY(-2px); box-shadow: 0 14px 40px rgba(255, 107, 44, 0.16); }
        .xhs-links a::before { content: '▶'; font-size: 12px; color: var(--orange-red); flex: none; }

        @media (max-width: 1100px) {
          .project-card, .project-reverse { grid-template-columns: 1fr; }
          .project-reverse .project-media { order: 1; }
          .project-reverse .project-info { order: 2; }
          .more-grid { grid-template-columns: 1fr; }
          .more-wide .more-img { aspect-ratio: 16 / 10; }
          .lb-prev { left: 8px; }
          .lb-next { right: 8px; }
        }
      `}</style>
    </section>
  )
}
