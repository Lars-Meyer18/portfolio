import { notFound } from 'next/navigation'
import { getContent, isLocale, resolveProjects, testimonialSource } from '@/content'
import { flags, LINKEDIN_URL, SITE_URL } from '@/content/flags'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Path from '@/components/Path'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Education from '@/components/Education'
import Skills from '@/components/Skills'
import Beyond from '@/components/Beyond'
import References from '@/components/References'
import Closing from '@/components/Closing'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const c = getContent(locale)

  const projects = { ...c.projects, items: resolveProjects(c.projects.items) }
  const sources = Object.fromEntries(c.references.items.map((t) => [t.id, testimonialSource(t)]))

  // Structured data for search engines. No address, phone or date of birth.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Lars Meyer',
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}/images/portrait-2026.jpg`,
    description: c.meta.description,
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'Fachhochschule Nordwestschweiz FHNW',
    },
    knowsLanguage: ['de', 'en', 'fr'],
    sameAs: [LINKEDIN_URL],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation locale={locale} nav={c.nav} ui={c.ui} />
      <main id="main">
        <Hero hero={c.hero} showStatus={flags.showStatus} />
        <Path about={c.about} />
        <Experience experience={c.experience} ui={c.ui} />
        <Projects projects={projects} ui={c.ui} />
        <Education education={c.education} />
        <Skills skills={c.skills} />
        <Beyond
          beyond={c.beyond}
          next={flags.showTestimonials ? { href: '#references', label: c.references.title } : undefined}
        />
        {flags.showTestimonials && <References references={c.references} sources={sources} locale={locale} />}
        <Closing closing={c.closing} />
      </main>
    </>
  )
}
