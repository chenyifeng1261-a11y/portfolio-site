import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import PdfViewer from './PdfViewer'

const edu = [
  {
    school: '上海大学', tag: '211 · 双一流', note: '2026 QS Asia #87', en: 'Shanghai University',
    majors: [
      { major: '环境设计 · 全日制本科', time: '2024.09 — 2028.06', en: 'Environmental Design · Full-time Undergraduate', pdf: '/documents/shu-envdesign-plan.pdf', pdfTitle: '上海大学2024级环境设计教学计划', pdfEn: 'SHU Env. Design Program Plan' },
      { major: '互动娱乐设计 · 微专业', time: '2026.09 — 2028.06', en: 'Interactive Entertainment Design · Micro-Major', pdf: '/documents/shu-interactive-entertainment-plan.pdf', pdfTitle: '上海大学2026级互动娱乐设计微专业培养方案', pdfEn: 'SHU Interactive Entertainment Micro-Major Plan' },
    ],
  },
  {
    school: '华东师范大学', tag: '985 · 211 · 双一流', note: '2026 QS Asia #100', en: 'ECNU · Finance Minor',
    majors: [
      { major: '金融学 · 辅修', time: '2024.09 — 2028.06', en: 'Finance Minor', pdf: '/documents/ecnu-finance-minor-plan.pdf', pdfTitle: '华东师范大学辅修金融学教学计划', pdfEn: 'ECNU Finance Minor Program Plan' },
    ],
  },
]

const awards = [
  { zh: '2024-2025 学年 "优秀个人" 荣誉称号', en: '"Outstanding Individual" Honor · 2024-2025 Academic Year' },
  { zh: '"AI 赋能非遗传承传播" 市三等奖', en: 'Municipal Third Prize · AI Empowering Intangible Cultural Heritage' },
  { zh: '上海市团校 青马工程', en: 'Shanghai Qingma (Young Marxist) Training Program' },
  { zh: '自强杯 / 国创赛 · 省级重点立项', en: 'Ziqiang Cup / National Innovation Contest · Provincial Key Project' },
]

// 三个社会经历（来自简历 PDF）
const experiences = [
  {
    org: '国金证券 · 上海财富总部',
    role: '网络金融部 · 媒体品宣',
    time: '2026.06 — 2026.09',
    tag: '金融新媒体',
    en: 'Sinolink Securities Co., Ltd. · Media & Branding Intern',
    duties: [
      { zh: '负责证券投资理财类短视频策划、拍摄、剪辑与全平台发布（抖音 / B站 / 小红书 / 视频号）', en: 'Planned, shot and edited short videos on securities and investment topics, publishing across Douyin / Bilibili / Xiaohongshu / Channels.' },
      { zh: '参与矩阵账号 IP 孵化与运营，制作直播背景、活动海报、演示 PPT 与数据可视化，助力获客转化', en: 'Co-ran matrix account IP incubation, produced live-stream backdrops, posters, pitch decks and data visuals to drive customer acquisition.' },
    ],
  },
  {
    org: '上海上大建筑设计院',
    role: '公共空间设计 · 设计实习生',
    time: '2025.12 — 2026.04',
    tag: '空间设计',
    en: 'SHANGHAI SHANGDA ARCHITECTURAL DESIGNING INSTITUTE CO., LTD. · Design Intern',
    duties: [
      { zh: '参与上海地铁 21 号线张衡路站、龙东大道站站厅室内装修与站名墙设计', en: 'Worked on interior fit-out and station-name wall design for Zhangheng Rd and Longdong Ave stations on Shanghai Metro Line 21.' },
      { zh: '以 AutoCAD / 3ds Max (V-Ray) 独立完成调研、设计、建模、渲染与施工图纸，并应用 AI 工具提效', en: 'Independently delivered research, design, modeling, rendering and construction drawings with AutoCAD / 3ds Max (V-Ray), boosting efficiency with AI tools.' },
    ],
  },
  {
    org: '上海境物设计咨询',
    role: '地产家装设计 · 新媒体运营&设计实习',
    time: '2025.06 — 2025.09',
    tag: '家装设计',
    en: 'KingWoo Strategy & Design (KWSD) · Interior & Social Media Intern',
    duties: [
      { zh: '参与室内方案创意构思与执行，使用 CAD 绘制图纸、SketchUp (Enscape) 制作效果图、输出 PPT 方案', en: 'Contributed to interior concept development, drafting with CAD, rendering with SketchUp (Enscape) and delivering PPT proposals.' },
      { zh: '运营小红书 / 微博账号：剪映剪辑视频、封面设计、脚本策划，有效提升品牌线上曝光', en: 'Managed Xiaohongshu / Weibo accounts — video editing with CapCut, cover design and scripting that raised brand visibility online.' },
    ],
  },
]

// 校园经历（补充）
const campus = [
  { role: '学生会 · 部长', note: '组织统筹与跨部门协作，多次主导校园大型活动执行', noteEn: 'Cross-department coordination; led multiple campus events', en: 'Student Union · Department Head' },
  { role: '自强杯 / 国创赛 · 项目负责人', note: '带领 11 人跨职能团队完成项目孵化与路演落地', noteEn: 'Led an 11-person cross-functional team from incubation to pitch', en: 'Innovation Project Leader' },
]

export default function About() {
  const [viewer, setViewer] = useState(null)
  const [viewerFull, setViewerFull] = useState(false)
  const viewerStageRef = useRef(null)

  const openViewer = (src, title, en) => setViewer({ src, title, en })

  const closeViewer = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    setViewerFull(false)
    setViewer(null)
  }

  const toggleViewerFull = async () => {
    const el = viewerStageRef.current
    if (!el) return
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen?.()
        setViewerFull(true)
      } else {
        await document.exitFullscreen()
        setViewerFull(false)
      }
    } catch {
      setViewerFull((f) => !f)
    }
  }

  useEffect(() => {
    if (!viewer) return
    const onKey = (e) => { if (e.key === 'Escape') closeViewer() }
    const onFsChange = () => { if (!document.fullscreenElement) setViewerFull(false) }
    window.addEventListener('keydown', onKey)
    document.addEventListener('fullscreenchange', onFsChange)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('fullscreenchange', onFsChange)
      document.body.style.overflow = ''
    }
  }, [viewer])

  return (
    <>
    <section id="about" className="about">
      <div className="grid-bg" />
      <div className="container">
        <div className="sec-tag reveal">01 · About Me</div>
        <h2 className="sec-title reveal">
          设计 × 金融
          <br />
          <span className="grad">跨学科创造者</span>
          <span className="en">Design × Finance — an interdisciplinary creator</span>
        </h2>

        <div className="about-grid">
          {/* 左：头像 + 联系方式 */}
          <div className="about-left reveal">
            <div className="about-card">
              <div className="avatar-wrap">
                <svg className="avatar-ring" viewBox="0 0 200 200" fill="none">
                  <defs>
                    <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ff6b2c" />
                      <stop offset="100%" stopColor="#ffc24b" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="92" stroke="url(#ringGrad)" strokeWidth="3" strokeDasharray="10 8" />
                </svg>
                <div className="avatar">
                  <img src="/images/avatar.jpg" alt="陈一峰证件照" loading="lazy" />
                </div>
                <span className="avatar-badge">OPEN TO WORK</span>
              </div>

              <div className="about-id">
                <h3>陈一峰 <span>Chen Yifeng</span></h3>
                <p>环境设计 · 金融学辅修 · 2005.09 · 男 · 上海</p>
                <span className="en">Environmental Design · Finance Minor · Shanghai</span>
              </div>

              <div className="contact-list">
                <a className="contact-item" href="tel:+8613636422927">
                  <span className="ci-icon">☏</span>
                  <span><em>电话 / Phone</em>+86 136-3642-2927</span>
                </a>
                <a className="contact-item" href="mailto:chenyifeng1261@gmail.com">
                  <span className="ci-icon">✉</span>
                  <span><em>邮箱 / Email</em>chenyifeng1261@gmail.com</span>
                </a>
                <div className="contact-item">
                  <span className="ci-icon">◉</span>
                  <span><em>常驻 / Base</em>上海市 · 接受全国差旅 · Shanghai · Nationwide OK</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右：介绍 + 教育 + 经历 + 奖项 */}
          <div className="about-right">
            <div className="about-bio reveal">
              <p>
                设计与金融融合背景，具备组织统筹及全链路执行经验，多次主导跨职能团队完成项目孵化与路演落地。
                熟悉<b>空间设计</b>、<b>新媒体运营</b>与<b>内容策略</b>，可独立完成从方案策划到传播复盘的闭环管理；
                擅长商务对接与跨部门协同，中英文沟通良好。
              </p>
              <span className="en">A designer with a finance background — leading cross-functional teams through incubation and delivery, fluent in Chinese and English.</span>
              <p>
                从地铁站厅的空间设计，到 AI 赋能的原创产品，再到单篇 52 万浏览的新媒体内容——
                我相信设计是解决问题的方式，也是连接人与生活的语言。
              </p>
              <span className="en">From metro station design to AI products and 520K-view content — design is how I solve problems and connect with life.</span>
            </div>

            {/* 社会经历（新增） */}
            <div className="about-exp reveal">
              <h4>社会经历 Experience</h4>
              <div className="exp-list">
                {experiences.map((e) => (
                  <div key={e.org + e.role} className="exp-item">
                    <div className="exp-head">
                      <b>{e.org}</b>
                      <span className="exp-tag">{e.tag}</span>
                      {e.org.includes('国金证券') && (
                        <button type="button" className="exp-rec" onClick={() => openViewer('/documents/recommendation-letter.pdf', '雇主推荐信', 'Employer Reference Letter')}>持有雇主推荐信 · Employer Reference Available</button>
                      )}
                      <span className="exp-time">{e.time}</span>
                    </div>
                    <div className="exp-role">
                      {e.role}
                      <i>{e.en}</i>
                    </div>
                    <ul className="exp-duties">
                      {e.duties.map((d) => (
                        <li key={d.zh}>
                          <span className="duty-zh">{d.zh}</span>
                          <span className="duty-en">{d.en}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 校园经历（补充） */}
            <div className="about-campus reveal">
              <h4>校园经历 Campus</h4>
              <div className="campus-list">
                {campus.map((c) => (
                  <div key={c.role} className="campus-item">
                    <b>{c.role}</b>
                    <span>{c.note}<em>{c.noteEn}</em></span>
                    <i>{c.en}</i>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-edu reveal">
              <h4>教育经历 Education</h4>
              <div className="edu-list">
                {edu.map((e) => (
                  <div key={e.school} className="edu-item">
                    <div className="edu-head">
                      <b>{e.school}</b>
                      <span className="edu-tag">{e.tag}</span>
                      <span className="edu-note">{e.note}</span>
                      <span className="edu-en">{e.en}</span>
                    </div>
                    {e.majors.map((m) => (
                      <div key={m.major} className="edu-major-row">
                        <div className="edu-major">
                          {m.major}
                          <i>{m.en}</i>
                          <span className="edu-time">{m.time}</span>
                        </div>
                        <button type="button" className="edu-plan-btn" onClick={() => openViewer(m.pdf, m.pdfTitle, m.pdfEn)}>
                          专业介绍 · Program Info
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="about-awards reveal">
              <h4>荣誉奖项 Awards</h4>
              <div className="award-list">
                {awards.map((a) => (
                  <span key={a.zh} className="award-chip">✦ {a.zh}<em>{a.en}</em></span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .about { padding: 160px 0 120px; overflow: hidden; }
        .about-grid {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 56px;
          margin-top: 64px;
        }
        .about-card {
          background: var(--glass);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 40px 34px;
          position: sticky;
          top: 110px;
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          box-shadow: var(--shadow-glow);
        }
        .avatar-wrap { position: relative; width: 220px; height: 220px; margin: 0 auto 26px; }
        .avatar-ring { position: absolute; inset: 0; width: 100%; height: 100%; animation: spin 26s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .avatar { position: absolute; inset: 14px; border-radius: 50%; overflow: hidden; box-shadow: var(--shadow-glow); }
        .avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .avatar-badge {
          position: absolute; right: -6px; bottom: 22px;
          background: var(--grad-main); color: #fff;
          font-family: var(--font-en); font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          padding: 7px 14px; border-radius: 999px;
        }
        .about-id { text-align: center; margin-bottom: 26px; }
        .about-id h3 { font-size: 28px; letter-spacing: 0.04em; }
        .about-id h3 span { font-family: var(--font-en); font-size: 17px; color: var(--orange-red); font-weight: 600; }
        .about-id p { margin-top: 8px; color: var(--ink-2); font-size: 13px; letter-spacing: 0.04em; }
        .about-id .en { color: var(--ink-3); font-size: 11px; margin-top: 4px; }
        .contact-list { display: flex; flex-direction: column; gap: 12px; }
        .contact-item {
          display: flex; align-items: center; gap: 14px;
          padding: 13px 16px; border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.46);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--line);
          transition: border-color 0.3s, transform 0.3s;
          font-size: 14px; color: var(--ink);
        }
        a.contact-item:hover { border-color: var(--line-strong); transform: translateX(4px); }
        .ci-icon {
          width: 36px; height: 36px; flex: none;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px; background: var(--grad-main); color: #fff;
          font-size: 15px;
        }
        .contact-item em { display: block; font-style: normal; font-size: 11px; color: var(--ink-2); letter-spacing: 0.08em; }

        .about-right { display: flex; flex-direction: column; gap: 34px; }
        .about-bio {
          background: linear-gradient(150deg, rgba(255,255,255,0.55), rgba(255,196,0,0.12));
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 40px 42px;
          font-size: 17px; line-height: 2;
          color: var(--ink);
        }
        .about-bio p + p { margin-top: 16px; color: var(--ink-2); }
        .about-bio .en { color: var(--ink-3); font-size: 12px; margin-top: 14px; }
        .about-bio b { color: var(--orange-red); font-weight: 700; }

        .about-exp h4, .about-campus h4, .about-edu h4, .about-awards h4 {
          font-family: var(--font-en); font-size: 13px; font-weight: 700;
          letter-spacing: 0.24em; color: var(--orange-red); margin-bottom: 18px;
        }
        .exp-list { display: flex; flex-direction: column; gap: 14px; }
        .exp-item {
          padding: 22px 26px; border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.46);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid var(--line);
        }
        .exp-head { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .exp-head b { font-size: 18px; }
        .exp-tag {
          font-size: 11px; font-weight: 700;
          color: var(--orange-red);
          background: rgba(255, 122, 51, 0.10);
          border: 1px solid var(--line-strong);
          padding: 3px 10px; border-radius: 999px;
        }
        .exp-rec {
          font-size: 11px; font-weight: 700;
          color: #fff; background: var(--grad-main);
          border: 1px solid var(--line-strong);
          padding: 6px 12px; border-radius: 999px;
          box-shadow: 0 6px 18px rgba(255, 90, 31, 0.30);
          cursor: pointer;
          font-family: inherit;
          line-height: 1.5;
          transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
        }
        .exp-rec:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(255, 90, 31, 0.42);
          filter: brightness(1.06);
        }
        .exp-rec:active { transform: translateY(0); }
        .exp-rec:focus-visible { outline: 2px solid var(--orange-red); outline-offset: 2px; }
        .exp-time { margin-left: auto; font-family: var(--font-en); font-size: 13px; color: var(--ink-2); }
        .exp-role { margin-top: 6px; font-size: 14.5px; color: var(--ink); font-weight: 600; }
        .exp-role i { font-style: normal; margin-left: 12px; font-family: var(--font-en); font-size: 11.5px; font-weight: 600; color: var(--ink-3); letter-spacing: 0.04em; }
        .exp-duties { margin-top: 10px; display: flex; flex-direction: column; gap: 6px; }
        .exp-duties li {
          position: relative; padding-left: 16px;
          font-size: 13.5px; line-height: 1.8; color: var(--ink-2);
        }
        .exp-duties li::before {
          content: ''; position: absolute; left: 0; top: 10px;
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--grad-main);
        }
        .duty-zh { display: block; }
        .duty-en {
          display: block;
          font-family: var(--font-en); font-size: 11px; line-height: 1.7;
          color: var(--ink-3); margin-top: 2px; letter-spacing: 0.01em;
        }

        .campus-list { display: flex; flex-direction: column; gap: 10px; }
        .campus-item {
          padding: 16px 22px; border-radius: var(--radius-sm);
          border: 1px dashed var(--line-strong);
          background: rgba(255, 255, 255, 0.46);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .campus-item b { font-size: 15px; margin-right: 14px; }
        .campus-item span { font-size: 13.5px; color: var(--ink-2); }
        .campus-item i { display: block; font-style: normal; font-family: var(--font-en); font-size: 11px; color: var(--ink-3); margin-top: 4px; }
        .campus-item span em { display: block; font-style: normal; font-family: var(--font-en); font-size: 11px; color: var(--ink-3); margin-top: 2px; }

        .edu-list { display: flex; flex-direction: column; gap: 14px; }
        .edu-item {
          padding: 20px 24px; border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.46);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid var(--line);
        }
        .edu-head { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .edu-head b { font-size: 18px; }
        .edu-tag {
          font-size: 11px; font-weight: 700;
          color: var(--orange-red);
          background: rgba(255, 122, 51, 0.10);
          border: 1px solid var(--line-strong);
          padding: 3px 10px; border-radius: 999px;
        }
        .edu-note { font-family: var(--font-en); font-size: 11.5px; color: var(--ink-3); }
        .edu-en { font-family: var(--font-en); font-size: 11.5px; color: var(--ink-3); }
        .edu-major-row {
          margin-top: 10px;
          display: flex; align-items: center; justify-content: space-between; gap: 14px;
          flex-wrap: wrap;
        }
        .edu-major-row:first-child { margin-top: 14px; }
        .edu-major {
          font-size: 19px; font-weight: 700; color: var(--ink);
          letter-spacing: 0.02em; line-height: 1.35;
        }
        .edu-major i { font-style: normal; margin-left: 12px; font-family: var(--font-en); font-size: 13px; font-weight: 600; color: var(--orange-red); letter-spacing: 0.04em; }
        .edu-time { font-family: var(--font-en); font-size: 13px; color: var(--ink-2); }
        .edu-plan-btn {
          font-size: 11px; font-weight: 700;
          color: #fff; background: var(--grad-main);
          border: 1px solid var(--line-strong);
          padding: 6px 12px; border-radius: 999px;
          box-shadow: 0 6px 18px rgba(255, 90, 31, 0.30);
          cursor: pointer; font-family: inherit; line-height: 1.5;
          transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
        }
        .edu-plan-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(255, 90, 31, 0.42);
          filter: brightness(1.06);
        }
        .edu-plan-btn:active { transform: translateY(0); }
        .edu-plan-btn:focus-visible { outline: 2px solid var(--orange-red); outline-offset: 2px; }
        .award-list { display: flex; flex-wrap: wrap; gap: 10px; }
        .award-chip {
          padding: 10px 18px; border-radius: 999px;
          border: 1px solid var(--line); color: var(--ink);
          font-size: 13px; background: rgba(255, 255, 255, 0.46);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .award-chip em {
          display: block; font-style: normal;
          font-family: var(--font-en); font-size: 10.5px;
          color: var(--ink-2); margin-top: 3px; letter-spacing: 0.02em;
        }

        @media (max-width: 1100px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-card { position: static; }
        }

        @media (prefers-reduced-motion: reduce) {
          .avatar-ring { animation: none; }
        }
      `}</style>
    </section>

    {createPortal(
      viewer && (
        <div className="pdf-modal" onClick={closeViewer}>
          <div className={`pdf-stage${viewerFull ? ' pdf-stage-full' : ''}`} ref={viewerStageRef} onClick={(e) => e.stopPropagation()}>
            <div className="pdf-toolbar">
              <div className="pdf-toolbar-title">
                <span className="pt-icon">▤</span>
                <b>{viewer.title}</b>
                <i>{viewer.en}</i>
              </div>
              <div className="pdf-toolbar-actions">
                <a className="pt-btn" href={viewer.src} target="_blank" rel="noreferrer" title="Open in new tab">
                  <span>New Tab</span>
                </a>
                <button type="button" className="pt-btn" onClick={toggleViewerFull} title="Toggle fullscreen">
                  <span>{viewerFull ? 'Exit Fullscreen' : 'Fullscreen'}</span>
                </button>
                <button type="button" className="pt-btn pt-close" onClick={closeViewer} title="Close">
                  <span>✕ Close</span>
                </button>
              </div>
            </div>
            <div className="pdf-frame">
              <PdfViewer key={viewer.src} src={viewer.src} title={viewer.title} />
            </div>
            <div className="pdf-hint">
              <span>ESC to close · Fullscreen / New Tab · Inline preview</span>
            </div>
          </div>
        </div>
      ),
      document.body
    )}
    </>
  )
}
