import type { SiteContent } from './schema'

export const de = {
  meta: {
    title: 'Lars Meyer · Wirtschaftsingenieurwesen FHNW',
    description:
      'Student Wirtschaftsingenieurwesen mit Vertiefung Digital Engineering an der FHNW, mit über drei Jahren Praxis in Rechnungswesen und Immobilien.',
    ogLocale: 'de_CH',
    ogAlt: 'Lars Meyer. Gelernt habe ich, mit Holz zu bauen. Heute baue ich Prozesse.',
  },

  ui: {
    mainNav: 'Hauptnavigation',
    skipToContent: 'Zum Inhalt springen',
    menuOpen: 'Menü öffnen',
    menuClose: 'Menü schliessen',
    languageLabel: 'Sprache',
    switchToLanguage: 'Zur englischen Version wechseln',
    details: 'Details',
    hideDetails: 'Weniger anzeigen',
    close: 'Schliessen',
  },

  nav: {
    about: 'Über mich',
    experience: 'Erfahrung',
    projects: 'Projekte',
    education: 'Ausbildung',
    skills: 'Skills',
  },

  hero: {
    eyebrow: 'BSc Wirtschaftsingenieurwesen · FHNW',
    hook: 'Gelernt habe ich, mit Holz zu bauen. Heute baue ich Prozesse.',
    subtitle:
      'Ich studiere Wirtschaftsingenieurwesen mit Vertiefung Digital Engineering an der FHNW und bringe über drei Jahre Praxis in Rechnungswesen und Immobilienbewirtschaftung mit. Mein Fokus liegt auf Prozessdigitalisierung und Controlling.',
    status: 'Im 5. Semester an der FHNW',
    scroll: 'Scrollen',
    portraitAlt: 'Porträt von Lars Meyer im Anzug',
  },

  about: {
    eyebrow: 'Über mich',
    title: 'Ein ungewöhnlicher Weg. Bewusst gewählt.',
    lead: 'Ich bin nicht direkt an die Hochschule gekommen. Genau das prägt heute meine Arbeitsweise.',
    chapters: [
      {
        id: 'ch-craft',
        year: '2017',
        period: '2017 – 2022',
        title: 'Handwerk',
        text: 'Vier Jahre Lehre als Zimmermann EFZ, danach eigene Baustellen mit Teams von zwei bis vier Personen. Dort habe ich gelernt, sauber zu planen, Verantwortung zu übernehmen und Ergebnisse abzuliefern, die man anfassen kann.',
        image: 'craft',
        imageAlt: 'Lars Meyer auf dem Dachstuhl eines Neubaus, gesichert an einem Sicherungsseil',
      },
      {
        id: 'ch-switch',
        year: '2022',
        period: '2022 – 2023',
        title: 'Der Wechsel',
        text: 'Die Wirtschaftliche Berufsmatura habe ich berufsbegleitend in einem Jahr abgeschlossen. Parallel bin ich in die Immobilienbewirtschaftung eingestiegen, weil mich die wirtschaftliche Seite genauso gepackt hat wie das Handwerk.',
        image: 'switch',
        imageAlt: 'Zwei Hochhäuser mit goldener Fassade vor blauem Himmel',
      },
      {
        id: 'ch-numbers',
        year: '2023',
        period: '2023 – 2026',
        title: 'Zahlen und Verantwortung',
        text: 'In der Immobilienbewirtschaftung und später in der Immobilienbuchhaltung habe ich Portfolios betreut, Zahlungsläufe abgewickelt und Abläufe digitalisiert. Ab 2024 lief das parallel zum Vollzeitstudium.',
        image: 'portrait',
        imageAlt: 'Porträt von Lars Meyer im Anzug',
      },
      {
        id: 'ch-studies',
        year: '2024',
        period: '2024 – 2027',
        title: 'Wirtschaftsingenieurwesen',
        text: 'An der FHNW studiere ich Wirtschaftsingenieurwesen mit Vertiefung Digital Engineering. In Projekten mit Unternehmen arbeite ich an Strategie, Prozessen und Controlling, zuletzt als Scrum Master für ein international tätiges Industrieunternehmen.',
        image: 'studies',
        imageAlt: 'Blick von oben in ein Atrium mit Treppen und Brücken',
      },
    ],
    closing:
      'Der rote Faden ist derselbe geblieben. Ich will verstehen, wie etwas funktioniert, und es dann besser machen.',
    next: 'Weiter zur Erfahrung',
  },

  experience: {
    eyebrow: 'Berufserfahrung',
    title: 'Erfahrung',
    lead: 'Über drei Jahre Praxis in Rechnungswesen und Immobilien, davor fünf Jahre Handwerk mit früher Verantwortung.',
    groups: [
      {
        id: 'group-finance',
        title: 'Finanzen und Immobilien · 2023 – 2026',
        entries: [
          {
            id: 'exp-immo123',
            title: 'Immobilienbuchhalter',
            company: 'Heimatt Gruppe · Immo123 AG',
            location: 'Luzern',
            period: '11.2025 – 07.2026',
            summary:
              'Kreditorenbuchhaltung für ein grosses Liegenschaftsportfolio, von der Kontierung bis zum Zahlungslauf.',
            details: [
              'Kontierung, Erfassung und Zahlung der Kreditoren in Abacus mit einem monatlichen Volumen im siebenstelligen Bereich, inklusive Bankabgleich und Zahlungsläufen via DTA/EBICS',
              'Mitarbeit bei Jahresabschlüssen, Heiz- und Nebenkostenabrechnungen für Miet-, MEG- und STWEG-Liegenschaften sowie im Mahnwesen',
              'Ansprechpartner für Eigentümer, Mieter und Behörden, Unterstützung bei der Einarbeitung eines neuen Mitarbeiters',
            ],
          },
          {
            id: 'exp-millennium-pm',
            title: 'Immobilienbewirtschafter',
            company: 'Millennium Immobilien & Consulting GmbH',
            location: 'Möriken-Wildegg',
            period: '07.2024 – 07.2025',
            summary:
              'Eigenverantwortliche Bewirtschaftung eines Portfolios von Mehrfamilienhäusern, parallel zum Studium.',
            details: [
              'Liegenschaftsbuchhaltung, Mietzinsberechnungen und die Abwicklung komplexer Mietanpassungen',
              'Inkasso- und Schlichtungsfälle, Hauptansprechpartner für die Eigentümer',
              'Mieterdossiers und Übergabeprotokolle digitalisiert, standardisierte Checklisten für die Buchhaltung eingeführt',
            ],
          },
          {
            id: 'exp-freelance',
            title: 'Immobilienbewirtschafter (Freelance)',
            company: 'Selbständig',
            location: 'remote aus San Diego, USA',
            period: '04.2024 – 06.2024',
            summary:
              'Mietzinsanalysen und Mietzinserhöhungen für private Eigentümer in der Region Lenzburg.',
            details: [
              'Bestehende Mietzinse analysiert und den Spielraum für Anpassungen geprüft',
              'Erhöhungen umgesetzt und den Eigentümern nachhaltige Mehrerträge gesichert',
            ],
          },
          {
            id: 'exp-millennium-intern',
            title: 'Praktikant Immobilienbewirtschafter',
            company: 'Millennium Immobilien & Consulting GmbH',
            location: 'Möriken-Wildegg',
            period: '01.2023 – 03.2024',
            summary:
              'Einstieg in den gesamten Bewirtschaftungsprozess, von der Kündigung bis zur Wiedervermietung.',
            details: [
              'Monatliche Zahlungsläufe des Liegenschaftsportfolios inklusive Verbuchung, Heiz- und Nebenkostenabrechnungen',
              'Hauptansprechpartner für Mieter, Wohnungsabnahmen und Übergaben, Koordination von Dienstleistern und Freigabe ihrer Rechnungen nach Prüfung',
              'Fundierte Kenntnisse im Schweizer Mietrecht aufgebaut',
            ],
          },
        ],
      },
      {
        id: 'group-craft',
        title: 'Handwerk und Führung · 2017 – 2022',
        entries: [
          {
            id: 'exp-carpenter',
            title: 'Zimmermann EFZ',
            company: 'Stadelmann Stutz AG',
            location: 'Fahrwangen',
            period: '11.2021 – 12.2022',
            summary: 'Eigenverantwortliche Leitung von Baustellen mit Teams von zwei bis vier Personen.',
            details: [
              'Aufgabenverteilung und Qualitätskontrolle auf der Baustelle',
              'Materialeinsatz und direkter Kundenkontakt bei Regiearbeiten',
            ],
          },
          {
            id: 'exp-army',
            title: 'Soldat',
            company: 'Schweizer Armee',
            location: 'Thun',
            period: '07.2021 – 11.2021',
            summary: 'Grundausbildung, in Übungen Führung einer Gruppe von sieben Soldaten.',
            details: [],
          },
          {
            id: 'exp-apprentice',
            title: 'Lehrling als Zimmermann EFZ',
            company: 'Stadelmann Stutz AG',
            location: 'Fahrwangen',
            period: '08.2017 – 06.2021',
            summary:
              'Vom Werkplan bis zur fertigen Holzkonstruktion im Innen-, Aussen- und Modulbau.',
            details: [],
          },
        ],
      },
    ],
    next: 'Weiter zu den Projekten',
  },

  projects: {
    eyebrow: 'Projekte',
    title: 'Ausgewählte Projekte',
    lead: 'In jedem Semester arbeite ich mit Unternehmen an echten Fragestellungen. Hier zeige ich, was ich beigetragen habe und was dabei herauskam.',
    labels: {
      client: 'Auftraggeber',
      role: 'Rolle',
      situation: 'Ausgangslage',
      contribution: 'Mein Beitrag',
      approach: 'Vorgehen',
      result: 'Ergebnis',
      more: 'Mehr erfahren',
    },
    items: [
      {
        id: 'proj-p4',
        status: 'live',
        featured: true,
        eyebrow: 'Projekt 4 · Frühlingssemester 2026',
        title: 'Projektkosten-Controlling für ein Industrieunternehmen',
        client: {
          named: 'Willy A. Bachofen AG (WAB-Group), Muttenz',
          anonymized: 'International tätiges Industrieunternehmen der Misch- und Mahltechnik',
        },
        role: 'Scrum Master im dreiköpfigen Studierendenteam',
        summary:
          'Ein Controlling-Konzept mit Dashboard für den laufenden Soll-Ist-Vergleich, abgeschlossen mit Referenz des CEO.',
        situation:
          'Das Unternehmen wollte ein unternehmensweites Konzept für das Projektkosten-Controlling, von der Vorkalkulation bis zur Nachkalkulation.',
        contribution:
          'Als Scrum Master habe ich das Projekt geplant, gesteuert und koordiniert und war über die gesamte Laufzeit der zentrale Ansprechpartner des Auftraggebers. Für das Unternehmen war es die erste Zusammenarbeit nach Scrum, und gemeinsam mit dem Team habe ich ihm die Methode nähergebracht.',
        approach:
          'Über 20 Interviews mit internen Stakeholdern, eine Analyse der bestehenden Prozesse und Systemlandschaft sowie regelmässige Sprint Reviews und Retrospektiven mit dem Auftraggeber.',
        result:
          'Ein praxisnahes Konzept mit einer softwarebasierten Lösung, die alle relevanten Projektkosten zusammenführt und in einem Dashboard einen laufenden Soll-Ist-Vergleich zeigt. Abgeschlossen zur vollen Zufriedenheit des Auftraggebers, mit Referenzschreiben des CEO.',
        tags: ['Scrum', 'Stakeholder-Interviews', 'Prozessanalyse', 'Controlling', 'Dashboard'],
      },
      {
        id: 'proj-p2',
        status: 'live',
        eyebrow: 'Projekt 2 · Frühlingssemester 2025',
        title: 'Neue Geschäftsfelder in der Energiewende',
        client: {
          named: 'Helltec Engineering AG',
          anonymized: 'Schweizer Engineering-Unternehmen',
        },
        role: 'Im Dreierteam',
        summary:
          'Entscheidungsgrundlagen für neue Geschäftsfelder rund um Smart Grid und Energiewende.',
        situation:
          'Das Unternehmen suchte Entscheidungsgrundlagen für neue Geschäftsfelder rund um Smart Grid und Energiewende.',
        approach:
          'Analyse der regulatorischen Rahmenbedingungen, technischen Herausforderungen und relevanten Marktteilnehmer, gestützt auf Interviews mit drei Schweizer Energieversorgern, SWOT-Analysen und die Auswertung gesetzlicher Entwicklungen in der Stromversorgung.',
        result: 'Fundierte Entscheidungsgrundlagen für die Wahl neuer Geschäftsfelder.',
        tags: ['Energiewirtschaft', 'Strategische Analyse', 'Smart Grid', 'Regulierung'],
      },
      {
        id: 'proj-p1',
        status: 'live',
        eyebrow: 'Projekt 1 · Herbstsemester 2024/25',
        title: 'Uhrenindustrie goes young',
        role: 'Stellvertretender Projektleiter in einem siebenköpfigen Team',
        summary: 'Hybriduhren haben bei Menschen unter 30 das grösste Potenzial.',
        situation:
          'Verdrängen Smartwatches die Schweizer Uhrenindustrie bei Menschen unter 30?',
        approach:
          'Umfrage mit über 300 Teilnehmenden unter 30 Jahren, Experteninterviews und eine Nutzwertanalyse.',
        result:
          'Hybriduhren, die klassisches Design mit smarten Funktionen verbinden, haben bei jüngeren Zielgruppen das grösste Potenzial. Daraus haben wir strategische Empfehlungen für die Branche abgeleitet.',
        tags: ['Marktanalyse', 'Konsumgüter', 'Strategie', 'Nutzwertanalyse'],
      },
      {
        id: 'proj-velorapide',
        status: 'live',
        eyebrow: 'Projektwoche · 2025',
        title: 'VeloRapide, agile Shopentwicklung mit Scrum',
        summary: 'Ein funktionsfähiger Onlineshop in drei Tagen und fünf Sprints.',
        text: 'Im Rahmen einer dreitägigen Projektwoche haben wir nach der Scrum-Methode in einem sechsköpfigen Team einen funktionsfähigen Onlineshop für einen fiktiven Fahrradladen aufgebaut. Auf Basis von Stakeholder-Analysen, priorisierten Backlogs und fünf aufeinanderfolgenden Sprints haben wir iterativ Anforderungen umgesetzt und nach jedem Sprint lauffähige Ergebnisse präsentiert. Der Fokus lag nicht nur auf dem Endprodukt, sondern auf dem gesamten agilen Prozess inklusive Sprint-Reviews und Retrospektiven.',
        tags: ['Scrum', 'Agile', 'E-Commerce'],
      },
    ],
    outlook:
      'Im Herbstsemester 2026/27 arbeite ich an Projekt 5 in der Vertiefung Digital Engineering. Die Bachelorthesis folgt 2027.',
    next: 'Weiter zur Ausbildung',
  },

  education: {
    eyebrow: 'Ausbildung',
    title: 'Bildungsweg',
    lead: 'Von der Lehre über die Berufsmatura an die Fachhochschule, mit Bestnoten in beiden Abschlussarbeiten.',
    highlights: [
      { id: 'hl-gpa', value: 5, decimals: 1, suffix: ' / 6', label: 'Notenschnitt BSc nach vier Semestern' },
      { id: 'hl-matura', value: 6, decimals: 1, suffix: '', label: 'Maturaarbeit «Elektromobilität»' },
      { id: 'hl-vertiefung', value: 6, decimals: 1, suffix: '', label: 'Vertiefungsarbeit «Die Kraft des Meeres»' },
    ],
    entries: [
      {
        id: 'edu-bsc',
        title: 'BSc Wirtschaftsingenieurwesen, Vertiefung Digital Engineering',
        institution: 'Fachhochschule Nordwestschweiz FHNW, Brugg-Windisch',
        period: '09.2024 – 08.2027 (voraussichtlich)',
        text: 'Studium an der Schnittstelle von Technik und Betriebswirtschaft. In Projekten bringen Unternehmen jedes Semester echte Fragestellungen ein, von Marktanalysen bis zur Prozessoptimierung.',
        modulesLabel: 'Vertiefung Digital Engineering',
        modules: [
          'Digital Business Processes',
          'Digitalisierungsprojekte und Transformation',
          'Mastering Data & Applied Neural Networks',
          'Digitale Technologien & Software Applications',
        ],
        focusLabel: 'Schwerpunkte bisher',
        focus: [
          'Kostenrechnung',
          'Controlling',
          'Investitionsrechnung',
          'Process Design',
          'Logistik',
          'Service Engineering',
          'AI & Machine Learning',
          'Statistik und Datenanalyse',
        ],
      },
      {
        id: 'edu-topsim',
        title: 'Unternehmensplanspiel TOPSIM Mastering General Management',
        institution: 'FHNW, Blockseminar mit Zertifikat',
        period: '09.2026',
        text: 'Im Team ein Unternehmen strategisch und operativ führen, mit Budgetierung, Mehrjahresplanung, Kostenmanagement, Analyse von Jahresabschlüssen und Reporting in Excel.',
      },
      {
        id: 'edu-english',
        title: 'Cambridge Exam Course (C1)',
        institution: 'EC English Language Centres, San Diego, USA',
        period: '04.2024 – 06.2024',
        text: 'Zehnwöchiger Intensivkurs Englisch auf Niveau C1 mit Spezialisierung auf Business English, abgeschlossen mit 95% Anwesenheit.',
      },
      {
        id: 'edu-bm',
        title: 'Wirtschaftliche Berufsmatura',
        institution: 'Minerva Aarau',
        period: '08.2022 – 07.2023',
        text: 'Berufsbegleitend in einem Jahr abgeschlossen, als Brücke vom Handwerk ins Studium.',
      },
      {
        id: 'edu-apprenticeship',
        title: 'Berufslehre Zimmermann EFZ',
        institution: 'Berufsschule Lenzburg (BSL)',
        period: '08.2017 – 07.2021',
        text: 'Vier Jahre Ausbildung in Holzkonstruktion, Präzisionsarbeit und eigenverantwortlichem Arbeiten.',
      },
    ],
    next: 'Weiter zu den Kompetenzen',
  },

  skills: {
    eyebrow: 'Was ich mitbringe',
    title: 'Kompetenzen',
    lead: 'Methoden aus dem Studium, Werkzeuge aus der Praxis.',
    levelScale: 'von 4',
    groups: [
      {
        id: 'skills-methods',
        title: 'Methoden',
        items: [
          { label: 'Scrum' },
          { label: 'Agiles Projektmanagement' },
          { label: 'Prozessanalyse und -design' },
          { label: 'Change-Management' },
          { label: 'Stakeholder-Interviews' },
        ],
      },
      {
        id: 'skills-expertise',
        title: 'Fachlich',
        items: [
          { label: 'Controlling und Kostenrechnung' },
          { label: 'Investitionsrechnung' },
          { label: 'Liegenschaftsbuchhaltung' },
          { label: 'Immobilienbewirtschaftung und Mietrecht' },
          { label: 'Prozessdigitalisierung' },
          { label: 'Datenanalyse' },
        ],
      },
      {
        id: 'skills-it',
        title: 'IT',
        items: [
          { label: 'Excel', level: 3, levelText: 'fortgeschritten' },
          { label: 'MS Office', level: 3, levelText: 'fortgeschritten' },
          { label: 'Python und Jupyter', level: 2, levelText: 'Grundkenntnisse' },
          { label: 'KI-gestützte Entwicklung' },
        ],
      },
      {
        id: 'skills-software',
        title: 'Branchensoftware',
        items: [
          { label: 'Abacus', level: 3, levelText: 'geübt' },
          { label: 'Bexio', level: 3, levelText: 'geübt' },
          { label: 'PROBbase', level: 3, levelText: 'geübt' },
          { label: 'RimoR5', level: 3, levelText: 'geübt' },
        ],
      },
      {
        id: 'skills-languages',
        title: 'Sprachen',
        items: [
          { label: 'Deutsch', level: 4, levelText: 'Muttersprache' },
          { label: 'Englisch', level: 3, levelText: 'C1' },
          { label: 'Französisch', level: 1, levelText: 'A2' },
        ],
      },
      {
        id: 'skills-personal',
        title: 'Persönlich',
        items: [
          { label: 'Strukturiertes Arbeiten' },
          { label: 'Analytisches Denken' },
          { label: 'Eigenverantwortung' },
          { label: 'Schnelle Auffassungsgabe' },
          { label: 'Eigeninitiative' },
          { label: 'Klare Kommunikation' },
        ],
      },
    ],
    next: 'Mehr über mich ausserhalb von Studium und Beruf',
  },

  beyond: {
    eyebrow: 'Engagement',
    title: 'Ausserhalb von Studium und Beruf',
    lead: 'Auch im Ehrenamt kümmere ich mich um die Zahlen.',
    role: 'Vorstandsmitglied, Finanzen und regionale Vertretung',
    organisation: 'Chlauschlöpfer-Verein Seengen (ehrenamtlich)',
    period: 'seit 11.2021',
    text: 'Ich führe die Vereinsfinanzen, von Budget und Jahresrechnung bis zum Zahlungsverkehr. Als einziger Delegierter vertrete ich Seengen im regionalen Vorstand und organisiere die jährlichen Anlässe mit.',
    interestsLabel: 'Interessen',
    interests:
      'Sport, vor allem Fitness und Schwimmen. Ausserdem interessieren mich Geschichte, Politik und andere Kulturen.',
  },

  references: {
    eyebrow: 'Referenzen',
    title: 'Was andere sagen',
    lead: 'Drei Stimmen aus Projekten und Berufsalltag, wörtlich aus den Originalschreiben.',
    items: [
      {
        id: 'ref-wab',
        projectId: 'proj-p4',
        quote:
          'Er führte das Team souverän, behielt jederzeit den Überblick über die verschiedenen Arbeitspakete und stellte sicher, dass die vereinbarten Ziele und Termine zuverlässig eingehalten wurden.',
        source: 'CEO, international tätiges Industrieunternehmen',
        sourceNamed: 'CEO, Willy A. Bachofen AG',
      },
      {
        id: 'ref-millennium',
        quote: 'Wir hätten Herrn Lars Meyer sehr gerne in einem Vollzeitpensum übernommen.',
        source: 'Inhaberin, Immobilienverwaltung',
      },
      {
        id: 'ref-immo123',
        quote:
          'Mit seiner ausgeglichenen, hilfsbereiten und kollegialen Art wurde Lars Meyer von allen Gesprächspartner:innen geschätzt.',
        source: 'Leitung und HR, Immobilienunternehmen',
      },
    ],
  },

  closing: {
    sentence: 'Gerne erzähle ich mehr. Am schnellsten erreichen Sie mich über LinkedIn.',
    button: 'LinkedIn',
    footer: '© {year} Lars Meyer',
  },
} satisfies SiteContent
