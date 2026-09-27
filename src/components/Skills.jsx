import { useState } from 'react'

const skills = [
  {
    icon: '◐',
    title: '设计与审美',
    en: 'Design & Aesthetics',
    desc: '良好的审美与独立设计思考能力，擅长细节把控，持续学习海内外优秀设计案例，保持前沿审美感知。',
    en_desc: 'Strong aesthetics and independent design thinking, keen on detail, continuously learning from leading global design cases.',
    tags: ['Photoshop', 'Illustrator', 'InDesign', 'Figma', 'Canva'],
  },
  {
    icon: '▣',
    title: '空间与建模',
    en: 'Spatial Design',
    desc: '完整掌握从概念到落地的空间设计链路，独立完成调研、建模、渲染与图纸产出，实践经验覆盖公共空间与地产家装。',
    en_desc: 'Full spatial design pipeline from concept to delivery — research, modeling, rendering and drawings for public spaces and residential projects.',
    tags: ['SketchUp', 'Enscape', 'D5', 'AutoCAD', 'Rhino', 'Grasshopper', '3ds Max', 'V-Ray', 'Blender'],
  },
  {
    icon: '✦',
    title: 'AI 赋能设计',
    en: 'AI-Driven Creation',
    desc: '积极探索 AI 工具辅助设计全流程，用 Midjourney、Stable Diffusion 等产出高质量图片与创意方案，获 AI 应用赛事市级奖项。',
    en_desc: 'Exploring AI-assisted workflows end to end, producing high-quality visuals and concepts with Midjourney and Stable Diffusion; municipal award in an AI application contest.',
    tags: ['Midjourney', 'Stable Diffusion', 'Neo Banana', 'Vizcom AI'],
  },
  {
    icon: '◎',
    title: '新媒体运营',
    en: 'Content & Growth',
    desc: '小红书、B站、抖音、公众号等多平台实战经验，单篇笔记 52w+ 浏览。擅长短视频剪辑、封面设计、脚本策划与 IP 孵化。',
    en_desc: 'Multi-platform growth on Xiaohongshu, Bilibili, Douyin and WeChat — 520K+ views on a single post; short-video editing, cover design, scripting and IP incubation.',
    tags: ['小红书 RED', 'B站 Bilibili', '抖音 Douyin', '微信公众号 WeChat', '视频号 Channels', 'X', 'Instagram', '剪映 CapCut', 'Premiere Pro'],
  },
  {
    icon: '≡',
    title: '金融与数据逻辑',
    en: 'Finance & Logic',
    desc: '金融学辅修背景，会计、宏微观经济学、货币银行学、国际金融等知识储备，数据导向的思维方式贯穿设计调研与内容决策。',
    en_desc: 'Finance minor — accounting, macro/microeconomics, money and banking, international finance; data-driven thinking across design research and content decisions.',
    tags: ['会计 Accounting', '宏微观经济学 Macro/Micro', '货币银行学 Money & Banking', '国际金融 Intl Finance', '初级会计资格 Junior Cert.', '证券从业资格 Securities'],
  },
  {
    icon: '✚',
    title: '组织与统筹',
    en: 'Leadership & Ops',
    desc: '学生会部长 + 11 人创业团队负责人，统筹跨职能协作、路演落地与商务对接，中英文沟通良好，具备多项目并行管理能力。',
    en_desc: 'Student union head plus 11-person startup team lead — cross-functional coordination, pitch delivery and business liaison; bilingual, adept at managing parallel projects.',
    tags: ['跨团队管理 Cross-team', '项目统筹 Coordination', '商务对接 BD', '路演策划 Pitching', '中英双语 Bilingual'],
  },
]

export default function Skills() {
  const [started, setStarted] = useState(false)

  return (
    <section id="skills" className="skills">
      <div className="grid-bg" />
      <div className="container">
        <div className="sec-tag reveal">03 · Capabilities</div>
        <h2 className="sec-title reveal">
          个人优势
          <span className="grad"> Advantage</span>
          <span className="en">Six-dimension capability matrix — design · tech · content · finance · leadership</span>
        </h2>
        <p className="sec-sub reveal">
          六维能力矩阵 —— 设计、技术、内容、金融、管理跨界融合，形成从创意到落地的完整闭环。
          <span className="en">Six interwoven dimensions — from creativity to delivery.</span>
        </p>

        <div className="skills-grid">
          {skills.map((s, i) => (
            <div key={s.title} className={`skill-card reveal ${i === 0 || i === 3 ? 'skill-feature' : ''}`}>
              <div className="skill-top">
                <span className="skill-icon">{s.icon}</span>
                <span className="skill-index">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3>{s.title}</h3>
              <div className="skill-en">{s.en}</div>
              <p>{s.desc}</p>
              <p className="skill-desc-en">{s.en_desc}</p>
              <div className="skill-tags">
                {s.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills { padding: 150px 0; overflow: hidden; }
        .skills-grid {
          margin-top: 64px;
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        .skill-card {
          padding: 34px 30px 30px;
          border-radius: var(--radius);
          border: 1px solid var(--line);
          background: linear-gradient(165deg, rgba(255,255,255,0.55), rgba(255,196,0,0.10));
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s, box-shadow 0.3s;
          position: relative; overflow: hidden;
        }
        .skill-card::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(220px 140px at 80% -10%, rgba(255,194,75,0.28), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .skill-card:hover {
          transform: translateY(-8px);
          border-color: var(--line-strong);
          box-shadow: var(--shadow-glow);
        }
        .skill-card:hover::before { opacity: 1; }
        .skill-feature {
          border-color: var(--line-strong);
          background: linear-gradient(165deg, rgba(255,255,255,0.6), rgba(255,107,44,0.14));
        }
        .skill-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
        .skill-icon {
          width: 54px; height: 54px; display: flex; align-items: center; justify-content: center;
          font-size: 26px; border-radius: 16px;
          background: var(--grad-main); color: #fff;
          box-shadow: 0 10px 30px rgba(255, 107, 44, 0.35);
        }
        .skill-index { font-family: var(--font-display); font-size: 30px; color: rgba(255, 148, 74, 0.5); }
        .skill-card h3 { font-size: 22px; margin-bottom: 4px; }
        .skill-en { font-family: var(--font-en); font-size: 12.5px; color: var(--orange-red); letter-spacing: 0.1em; margin-bottom: 14px; }
        .skill-card p { font-size: 14.5px; line-height: 1.85; color: var(--ink-2); margin-bottom: 10px; }
        .skill-desc-en {
          font-family: var(--font-en); font-size: 12px; line-height: 1.75; color: var(--ink-3);
          margin-bottom: 20px;
        }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-tags span {
          font-family: var(--font-en); font-size: 11px;
          padding: 6px 12px; border-radius: 999px;
          border: 1px solid var(--line); color: var(--ink);
          background: rgba(255, 255, 255, 0.46);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        @media (max-width: 1200px) { .skills-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 760px) { .skills-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
