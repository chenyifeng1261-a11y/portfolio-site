export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-bg">
        <div className="contact-blob c-blob-1" />
        <div className="contact-blob c-blob-2" />
        <div className="contact-grid" />
        <div className="contact-sun" />
      </div>

      <div className="contact-inner container">
        <div className="sec-tag reveal">04 · Get In Touch</div>
        <h2 className="contact-title reveal">
          Let&apos;s Create
          <br />
          <span className="grad">Something Great</span>
        </h2>
        <p className="contact-desc reveal">
          期待在更广阔的平台持续成长 —— 无论是空间项目、AI 设计探索，还是内容与增长合作，欢迎随时联系我。
          <span className="en">Open for spatial projects, AI design explorations and content growth collaborations.</span>
        </p>

        <div className="contact-actions reveal">
          <a className="contact-big" href="tel:+8613636422927">
            <span className="cb-icon">☏</span>
            <span className="cb-label">电话 · PHONE</span>
            <b>+86 136-3642-2927</b>
          </a>
          <a className="contact-big" href="mailto:chenyifeng1261@gmail.com">
            <span className="cb-icon">✉</span>
            <span className="cb-label">邮箱 · EMAIL</span>
            <b>chenyifeng1261@gmail.com</b>
          </a>
        </div>

        <div className="contact-tags reveal">
          <span>环境设计</span><i>·</i>
          <span>空间设计</span><i>·</i>
          <span>AI 设计</span><i>·</i>
          <span>品牌设计</span><i>·</i>
          <span>新媒体运营</span><i>·</i>
          <span>产品经理</span>
        </div>

        <div className="contact-foot reveal">
          <span>© 2026 陈一峰 Chen Yifeng · All Rights Reserved</span>
          <a className="back-top" href="#home">Back to Top ↑</a>
        </div>
      </div>

      <style>{`
        .contact {
          min-height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
          overflow: hidden;
          border-top: 1px solid var(--line);
        }
        .contact-bg {
          position: absolute; inset: 0; overflow: hidden;
          background: linear-gradient(165deg, rgba(255,138,0,0.8) 0%, rgba(255,179,0,0.68) 55%, rgba(255,196,0,0.58) 100%);
        }
        .contact-sun {
          position: absolute; right: -160px; top: -160px; width: 560px; height: 560px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0) 66%);
        }
        .contact-blob { position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0.42; }
        .c-blob-1 { width: 680px; height: 680px; left: -180px; top: 10%; background: radial-gradient(circle, rgba(255,61,0,0.5), transparent 65%); animation: drift1 18s ease-in-out infinite alternate; }
        .c-blob-2 { width: 640px; height: 640px; right: -160px; bottom: -120px; background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 65%); animation: drift2 22s ease-in-out infinite alternate; }
        @keyframes drift1 { from { transform: translate(0, 0) scale(1); } to { transform: translate(80px, 60px) scale(1.1); } }
        @keyframes drift2 { from { transform: translate(0, 0) scale(1.05); } to { transform: translate(-90px, -40px) scale(0.95); } }
        .contact-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 25%, transparent 78%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 25%, transparent 78%);
        }

        .contact-inner {
          position: relative;
          padding-top: 150px; padding-bottom: 40px;
          text-align: center;
          display: flex; flex-direction: column; align-items: center;
        }
        .contact-title {
          font-family: var(--font-display);
          font-size: clamp(76px, 10.5vw, 190px);
          line-height: 0.92; font-weight: 400;
          letter-spacing: 0.02em;
          color: #fff;
          text-shadow: 0 16px 70px rgba(180, 40, 0, 0.30);
        }
        .contact-title .grad {
          background: linear-gradient(100deg, #fff 0%, #ffe08a 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .contact-desc { max-width: 640px; margin-top: 26px; color: #5b2400; font-size: 16.5px; line-height: 1.9; font-weight: 500; }
        .contact-desc .en { color: #6d3a12; font-size: 12.5px; }

        .contact-actions {
          display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;
          margin-top: 56px;
        }
        .contact-big {
          display: flex; flex-direction: column; align-items: flex-start; gap: 6px;
          min-width: 320px; padding: 30px 34px;
          border-radius: var(--radius);
          border: 1px solid rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          transition: transform 0.4s, border-color 0.4s, box-shadow 0.4s;
          text-align: left;
        }
        .contact-big:hover {
          transform: translateY(-6px);
          border-color: #fff;
          box-shadow: 0 22px 70px rgba(180, 40, 0, 0.28);
        }
        .cb-icon {
          width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
          font-size: 18px; border-radius: 12px;
          background: var(--grad-main); color: #fff;
        }
        .cb-label { font-family: var(--font-en); font-size: 12px; letter-spacing: 0.2em; color: var(--ink-2); }
        .contact-big b { font-size: 20px; letter-spacing: 0.02em; color: var(--ink); }

        .contact-tags {
          display: flex; flex-wrap: wrap; gap: 14px; align-items: center; justify-content: center;
          margin-top: 44px; font-size: 14px; color: #5b2400;
        }
        .contact-tags span {
          background: rgba(255, 255, 255, 0.36); border: 1px solid rgba(255,255,255,0.6);
          padding: 9px 18px; border-radius: 999px; font-weight: 600;
          backdrop-filter: blur(12px) saturate(160%);
          -webkit-backdrop-filter: blur(12px) saturate(160%);
        }
        .contact-tags i { font-style: normal; color: #fff; }
        .contact-tags em { display: block; font-style: normal; font-family: var(--font-en); font-size: 10px; letter-spacing: 0.14em; color: #5b2400; opacity: 0.72; margin-top: 2px; }

        .contact-foot {
          margin-top: 90px; width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          border-top: 1px solid rgba(91, 36, 0, 0.25);
          padding-top: 26px;
          font-size: 13px; color: #5b2400;
          font-family: var(--font-en);
        }
        .back-top { color: #5b2400; font-weight: 700; letter-spacing: 0.08em; }
        .back-top:hover { color: #fff; }

        @media (max-width: 760px) {
          .contact-actions { flex-direction: column; align-items: center; }
          .contact-big { min-width: 0; width: 88%; max-width: 420px; }
          .contact-foot { flex-direction: column; gap: 14px; text-align: center; }
        }
      `}</style>
    </section>
  )
}
