import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import PersonalStats from './components/PersonalStats.jsx'
import Contact from './components/Contact.jsx'
import Disclaimer from './components/Disclaimer.jsx'
import PdfEntry from './components/PdfEntry.jsx'
import { useRef } from 'react'
import useSectionMotions from './hooks/useSectionMotions.js'

function App() {
  const mainRef = useRef(null)
  useSectionMotions(mainRef)

  return (
    <>
      <div className="spiral-decor" aria-hidden="true">
        <span className="spiral s1" />
        <span className="spiral s2" />
        <span className="spiral s3" />
      </div>
      <Navbar />
      <main ref={mainRef}>
        <Hero />
        <About />
        <Projects />
        <PdfEntry
          title="作品集 PDF"
          en="Portfolio PDF"
          desc="完整项目作品集 —— 包含杏栖 6 组 / 明樾 6 组 / 竹霖 5 组等全部作品图集，点击在线预览，可新标签打开查看。"
          src="/documents/portfolio.pdf"
          icon="◈"
        />
        <Skills />
        <PersonalStats />
        <PdfEntry
          title="个人简历 PDF"
          en="Resume PDF"
          desc="One-page resume — education, internships, skills and project highlights, synced with this site. 一页式求职简历，与页面信息同步。"
          src="/documents/resume.pdf"
          icon="✧"
        />
        <Disclaimer />
        <Contact />
      </main>
    </>
  )
}

export default App
