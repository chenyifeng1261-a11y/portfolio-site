export default function Disclaimer() {
  return (
    <section id="disclaimer" className="disclaimer">
      <div className="grid-bg" />
      <div className="container">
        <div className="sec-tag reveal">Notice · Disclaimer</div>
        <h2 className="sec-title reveal">
          免责声明
          <span className="grad"> Disclaimer</span>
        </h2>

        <div className="dis-card reveal">
          <div className="dis-block">
            <p className="dis-zh">
              © 2026 陈一峰 版权所有
              <br />
              本作品集所有课程作业、原创设计、新媒体运营成果及实习相关内容均为本人独立创作与真实经历。
              <br />
              仅限求职展示使用，严禁任何个人或机构盗用、冒用、转载、商用，违者将依法追究责任。
            </p>
            <p className="dis-en">
              © 2026 Chen Yifeng All Rights Reserved.
              <br />
              All course assignments, original designs, new media operation achievements, and internship-related contents presented in this portfolio are my independent creations and genuine experiences.
              <br />
              This portfolio is for job application only. Unauthorized use, copying, misappropriation, reproduction, or commercial use by any individual or organization is strictly prohibited. Violators will be held legally responsible.
            </p>
          </div>

          <div className="dis-block">
            <p className="dis-zh">
              作品集内涉及前公司项目、运营账号等相关内容，已获得授权披露，仅供个人能力证明使用，不代表任何官方立场。
            </p>
            <p className="dis-en">
              Contents related to previous company projects and social media accounts are disclosed with official authorization. They are only for proving personal ability and do not represent any official stance.
            </p>
          </div>

          <div className="dis-block">
            <p className="dis-zh">
              极少部分内容为团队合作制作，本人仅展示由本人独立完成与负责的部分。
            </p>
            <p className="dis-en">
              Some works are group projects, and I only present the parts independently completed and responsible by myself.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .disclaimer { position: relative; padding: 110px 0 140px; overflow: hidden; }
        .disclaimer .container { position: relative; z-index: 1; }
        .dis-card {
          margin-top: 56px;
          border-radius: var(--radius, 26px);
          border: 1px solid var(--line, rgba(255, 122, 0, 0.24));
          background: linear-gradient(165deg, rgba(255, 255, 255, 0.6), rgba(255, 196, 0, 0.10));
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          box-shadow: var(--shadow-glow, 0 20px 60px rgba(255, 107, 44, 0.12));
          padding: 44px 48px;
          display: flex;
          flex-direction: column;
          gap: 34px;
        }
        .dis-block { display: flex; flex-direction: column; gap: 10px; }
        .dis-block + .dis-block {
          padding-top: 30px;
          border-top: 1px dashed var(--line, rgba(255, 122, 0, 0.20));
        }
        .dis-zh {
          font-size: 14.5px; line-height: 1.95; color: var(--ink, #381c06);
          margin: 0;
        }
        .dis-zh strong { color: var(--orange-red, #ff3d00); font-weight: 600; }
        .dis-en {
          font-family: var(--font-en, 'Inter, sans-serif');
          font-size: 12px; line-height: 1.9; color: var(--ink-2, #7a5636);
          letter-spacing: 0.02em; margin: 0;
        }
        @media (max-width: 760px) {
          .disclaimer { padding: 80px 0 100px; }
          .dis-card { padding: 30px 24px; gap: 26px; }
          .dis-zh { font-size: 13.5px; }
        }
      `}</style>
    </section>
  )
}
