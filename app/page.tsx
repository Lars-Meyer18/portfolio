import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Education from '@/components/Education'
import Skills from '@/components/Skills'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Skills />
      </main>
      <Footer />
    </>
  )
}
