import type { SiteContent } from './schema'

export const en = {
  meta: {
    title: 'Lars Meyer · Engineering and Management, FHNW',
    description:
      'Engineering and Management student at FHNW, specialising in Digital Engineering, with over three years of experience in accounting and real estate.',
    ogLocale: 'en_GB',
    ogAlt: 'Lars Meyer. I trained to build with timber. Today I build processes.',
  },

  ui: {
    mainNav: 'Main navigation',
    skipToContent: 'Skip to content',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    languageLabel: 'Language',
    switchToLanguage: 'Switch to the German version',
    details: 'Details',
    hideDetails: 'Show less',
    close: 'Close',
  },

  nav: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    education: 'Education',
    skills: 'Skills',
  },

  hero: {
    eyebrow: 'BSc Engineering and Management · FHNW',
    hook: 'I trained to build with timber. Today I build processes.',
    subtitle:
      'I study Engineering and Management with a specialisation in Digital Engineering at FHNW and bring over three years of hands-on experience in accounting and property management. My focus is process digitalisation and controlling.',
    status: 'In my fifth semester at FHNW',
    scroll: 'Scroll',
    portraitAlt: 'Portrait of Lars Meyer in a suit',
  },

  about: {
    eyebrow: 'About me',
    title: 'An unconventional path. By choice.',
    lead: 'I did not go straight to university. That is exactly what shapes the way I work today.',
    chapters: [
      {
        id: 'ch-craft',
        year: '2017',
        period: '2017 – 2022',
        title: 'The craft',
        text: 'A four-year carpentry apprenticeship (Federal VET Diploma, EFZ), followed by running my own construction sites with teams of two to four. That is where I learned to plan carefully, take responsibility and deliver results you can touch.',
        image: 'craft',
        imageAlt: 'Lars Meyer on the roof structure of a new build, clipped to a safety line',
      },
      {
        id: 'ch-switch',
        year: '2022',
        period: '2022 – 2023',
        title: 'The switch',
        text: 'I completed the Federal Vocational Baccalaureate in Business part-time within one year. At the same time I moved into property management, because the business side gripped me as much as the craft.',
        image: 'switch',
        imageAlt: 'Two high-rise towers with golden façades against a blue sky',
      },
      {
        id: 'ch-numbers',
        year: '2023',
        period: '2023 – 2026',
        title: 'Numbers and responsibility',
        text: 'In property management and later in real estate accounting I looked after portfolios, ran payment cycles and digitalised workflows. From 2024 I did this alongside full-time studies.',
        image: 'portrait',
        imageAlt: 'Portrait of Lars Meyer in a suit',
      },
      {
        id: 'ch-studies',
        year: '2024',
        period: '2024 – 2027',
        title: 'Engineering and Management',
        text: 'At FHNW I study Engineering and Management with a specialisation in Digital Engineering. In projects with companies I work on strategy, processes and controlling, most recently as Scrum Master for an international industrial company.',
        image: 'studies',
        imageAlt: 'View down into an atrium with staircases and bridges',
      },
    ],
    closing:
      'The common thread has stayed the same. I want to understand how something works, and then make it better.',
    next: 'On to my experience',
  },

  experience: {
    eyebrow: 'Work experience',
    title: 'Experience',
    lead: 'Over three years in accounting and real estate, preceded by five years in a trade with early responsibility.',
    groups: [
      {
        id: 'group-finance',
        title: 'Finance and real estate · 2023 – 2026',
        entries: [
          {
            id: 'exp-immo123',
            title: 'Real Estate Accountant',
            company: 'Heimatt Gruppe · Immo123 AG',
            location: 'Lucerne',
            period: '11.2025 – 07.2026',
            summary: 'Accounts payable for a large property portfolio, from account coding to payment run.',
            details: [
              'Coded, entered and paid supplier invoices in Abacus with a monthly volume in the seven-figure range, including bank reconciliation and payment runs via DTA/EBICS',
              'Contributed to annual financial statements, heating and service charge statements and dunning for rental, co-ownership and condominium properties',
              'Point of contact for owners, tenants and authorities, and helped train a new colleague',
            ],
          },
          {
            id: 'exp-millennium-pm',
            title: 'Property Manager',
            company: 'Millennium Immobilien & Consulting GmbH',
            location: 'Möriken-Wildegg',
            period: '07.2024 – 07.2025',
            summary: 'Independent management of a portfolio of apartment buildings alongside my studies.',
            details: [
              'Property accounting, rent calculations and complex rent adjustments',
              'Collections and arbitration cases, main point of contact for owners',
              'Digitalised tenant files and handover reports, introduced standardised accounting checklists',
            ],
          },
          {
            id: 'exp-freelance',
            title: 'Property Manager (Freelance)',
            company: 'Self-employed',
            location: 'remotely from San Diego, USA',
            period: '04.2024 – 06.2024',
            summary: 'Rent reviews and rent increases for private owners in the Lenzburg region.',
            details: [
              'Analysed existing rents and assessed the scope for adjustments',
              'Implemented the increases and secured sustainable additional income for the owners',
            ],
          },
          {
            id: 'exp-millennium-intern',
            title: 'Property Management Intern',
            company: 'Millennium Immobilien & Consulting GmbH',
            location: 'Möriken-Wildegg',
            period: '01.2023 – 03.2024',
            summary:
              'A hands-on start across the full property management cycle, from notice of termination to re-letting.',
            details: [
              'Ran the monthly payment runs for the property portfolio including bookkeeping, prepared heating and service charge statements',
              'Main point of contact for tenants, handled move-in and move-out inspections, coordinated service providers and approved their invoices after review',
              'Built solid knowledge of Swiss tenancy law',
            ],
          },
        ],
      },
      {
        id: 'group-craft',
        title: 'Craft and leadership · 2017 – 2022',
        entries: [
          {
            id: 'exp-carpenter',
            title: 'Carpenter (EFZ)',
            company: 'Stadelmann Stutz AG',
            location: 'Fahrwangen',
            period: '11.2021 – 12.2022',
            summary: 'Led construction sites independently with teams of two to four.',
            details: [
              'Task allocation and quality control on site',
              'Material use and direct client contact on time-and-material jobs',
            ],
          },
          {
            id: 'exp-army',
            title: 'Soldier',
            company: 'Swiss Armed Forces',
            location: 'Thun',
            period: '07.2021 – 11.2021',
            summary: 'Basic training, leading a group of seven soldiers in exercises.',
            details: [],
          },
          {
            id: 'exp-apprentice',
            title: 'Carpenter Apprentice',
            company: 'Stadelmann Stutz AG',
            location: 'Fahrwangen',
            period: '08.2017 – 06.2021',
            summary:
              'From workshop drawings to finished timber structures in interior, exterior and modular construction.',
            details: [],
          },
        ],
      },
    ],
    next: 'On to the projects',
  },

  projects: {
    eyebrow: 'Projects',
    title: 'Selected projects',
    lead: 'Every semester I work with companies on real questions. Here is what I contributed and what came out of it.',
    labels: {
      client: 'Client',
      role: 'Role',
      situation: 'Starting point',
      contribution: 'My contribution',
      approach: 'Approach',
      result: 'Result',
      more: 'Learn more',
    },
    items: [
      {
        id: 'proj-p4',
        status: 'live',
        featured: true,
        eyebrow: 'Project 4 · Spring semester 2026',
        title: 'Project cost controlling for an industrial company',
        client: {
          named: 'Willy A. Bachofen AG (WAB-Group), Muttenz',
          anonymized: 'International mixing and milling technology company',
        },
        role: 'Scrum Master in a three-person student team',
        summary:
          'A controlling concept with a dashboard for continuous target-versus-actual comparison, completed with a CEO reference.',
        situation:
          'The company wanted a company-wide concept for project cost controlling, from preliminary to final costing.',
        contribution:
          'As Scrum Master I planned, steered and coordinated the project and was the client’s central contact throughout. It was the company’s first collaboration run with Scrum, and together with the team I introduced the method to them.',
        approach:
          'More than 20 interviews with internal stakeholders, an analysis of existing processes and systems, and regular sprint reviews and retrospectives with the client.',
        result:
          'A practical concept with a software-based solution that brings all relevant project costs together and shows a continuous target-versus-actual comparison in a dashboard. Completed to the client’s full satisfaction, with a reference letter from the CEO.',
        tags: ['Scrum', 'Stakeholder interviews', 'Process analysis', 'Controlling', 'Dashboard'],
      },
      {
        id: 'proj-p2',
        status: 'live',
        eyebrow: 'Project 2 · Spring semester 2025',
        title: 'New business fields in the energy transition',
        client: {
          named: 'Helltec Engineering AG',
          anonymized: 'Swiss engineering company',
        },
        role: 'In a team of three',
        summary: 'A decision basis for new business fields around smart grids and the energy transition.',
        situation:
          'The company needed a basis for deciding on new business fields around smart grids and the energy transition.',
        approach:
          'Analysis of the regulatory framework, technical challenges and key market players, supported by interviews with three Swiss energy suppliers, SWOT analyses and a review of legislative developments in electricity supply.',
        result: 'A solid basis for choosing new business fields.',
        tags: ['Energy industry', 'Strategic analysis', 'Smart grid', 'Regulation'],
      },
      {
        id: 'proj-p1',
        status: 'live',
        eyebrow: 'Project 1 · Autumn semester 2024/25',
        title: 'Swiss watches go young',
        role: 'Deputy project lead in a team of seven',
        summary: 'Hybrid watches have the greatest potential among people under 30.',
        situation: 'Are smartwatches pushing the Swiss watch industry aside among people under 30?',
        approach:
          'A survey of more than 300 respondents under 30, expert interviews and a weighted scoring analysis.',
        result:
          'Hybrid watches, which combine classic design with smart features, have the greatest potential with younger audiences. From this we derived strategic recommendations for the industry.',
        tags: ['Market analysis', 'Consumer goods', 'Strategy', 'Scoring analysis'],
      },
      {
        id: 'proj-velorapide',
        status: 'live',
        eyebrow: 'Project week · 2025',
        title: 'VeloRapide, agile shop development with Scrum',
        summary: 'A working online shop in three days and five sprints.',
        text: 'During a three-day project week, our team of six used Scrum to build a working online shop for a fictional bike shop. Based on stakeholder analyses, prioritised backlogs and five consecutive sprints, we implemented requirements step by step and presented a working result after each sprint. The focus was not only on the end product but on the entire agile process, including sprint reviews and retrospectives.',
        tags: ['Scrum', 'Agile', 'E-commerce'],
      },
    ],
    outlook:
      'In the autumn semester 2026/27 I am working on Project 5 in the Digital Engineering specialisation. My bachelor’s thesis follows in 2027.',
    next: 'On to my education',
  },

  education: {
    eyebrow: 'Education',
    title: 'Education',
    lead: 'From apprenticeship to vocational baccalaureate to university, with top marks for both final papers.',
    highlights: [
      { id: 'hl-gpa', value: 5, decimals: 1, suffix: ' / 6', label: 'BSc GPA after four semesters' },
      { id: 'hl-matura', value: 6, decimals: 1, suffix: '', label: 'Baccalaureate thesis “Electromobility”' },
      { id: 'hl-vertiefung', value: 6, decimals: 1, suffix: '', label: 'Apprenticeship paper “The Power of the Sea”' },
    ],
    entries: [
      {
        id: 'edu-bsc',
        title: 'BSc in Engineering and Management, specialisation in Digital Engineering',
        institution:
          'University of Applied Sciences and Arts Northwestern Switzerland (FHNW), Brugg-Windisch',
        period: '09.2024 – 08.2027 (expected)',
        text: 'A degree at the intersection of engineering and business. Every semester, companies bring real questions into project work, from market analyses to process optimisation.',
        modulesLabel: 'Digital Engineering specialisation',
        modules: [
          'Digital Business Processes',
          'Digitalisation Projects and Transformation',
          'Mastering Data & Applied Neural Networks',
          'Digital Technologies & Software Applications',
        ],
        focusLabel: 'Focus areas so far',
        focus: [
          'Cost accounting',
          'Controlling',
          'Investment appraisal',
          'Process design',
          'Logistics',
          'Service engineering',
          'AI & machine learning',
          'Statistics and data analysis',
        ],
      },
      {
        id: 'edu-topsim',
        title: 'Business simulation TOPSIM Mastering General Management',
        institution: 'FHNW, block seminar with certificate',
        period: '09.2026',
        text: 'Running a company strategically and operationally as a team, with budgeting, multi-year planning, cost management, analysis of annual accounts and reporting in Excel.',
      },
      {
        id: 'edu-english',
        title: 'Cambridge Exam Course (C1)',
        institution: 'EC English Language Centres, San Diego, USA',
        period: '04.2024 – 06.2024',
        text: 'Ten-week intensive English course at C1 level with a specialisation in Business English, completed with 95% attendance.',
      },
      {
        id: 'edu-bm',
        title: 'Federal Vocational Baccalaureate, Business',
        institution: 'Minerva Aarau',
        period: '08.2022 – 07.2023',
        text: 'Completed part-time within one year, as the bridge from the trade to university.',
      },
      {
        id: 'edu-apprenticeship',
        title: 'Carpentry apprenticeship (Federal VET Diploma, EFZ)',
        institution: 'Lenzburg Vocational School (BSL)',
        period: '08.2017 – 07.2021',
        text: 'Four years of training in timber construction, precision work and working independently.',
      },
    ],
    next: 'On to my skills',
  },

  skills: {
    eyebrow: 'What I bring',
    title: 'Skills',
    lead: 'Methods from my studies, tools from practice.',
    levelScale: 'of 4',
    groups: [
      {
        id: 'skills-methods',
        title: 'Methods',
        items: [
          { label: 'Scrum' },
          { label: 'Agile project management' },
          { label: 'Process analysis and design' },
          { label: 'Change management' },
          { label: 'Stakeholder interviews' },
        ],
      },
      {
        id: 'skills-expertise',
        title: 'Expertise',
        items: [
          { label: 'Controlling and cost accounting' },
          { label: 'Investment appraisal' },
          { label: 'Property accounting' },
          { label: 'Property management and tenancy law' },
          { label: 'Process digitalisation' },
          { label: 'Data analysis' },
        ],
      },
      {
        id: 'skills-it',
        title: 'IT',
        items: [
          { label: 'Excel', level: 3, levelText: 'advanced' },
          { label: 'MS Office', level: 3, levelText: 'advanced' },
          { label: 'Python and Jupyter', level: 2, levelText: 'basic' },
          { label: 'AI-assisted development' },
        ],
      },
      {
        id: 'skills-software',
        title: 'Industry software',
        items: [
          { label: 'Abacus', level: 3, levelText: 'proficient' },
          { label: 'Bexio', level: 3, levelText: 'proficient' },
          { label: 'PROBbase', level: 3, levelText: 'proficient' },
          { label: 'RimoR5', level: 3, levelText: 'proficient' },
        ],
      },
      {
        id: 'skills-languages',
        title: 'Languages',
        items: [
          { label: 'German', level: 4, levelText: 'native' },
          { label: 'English', level: 3, levelText: 'C1' },
          { label: 'French', level: 1, levelText: 'A2' },
        ],
      },
      {
        id: 'skills-personal',
        title: 'Personal',
        items: [
          { label: 'Structured approach' },
          { label: 'Analytical thinking' },
          { label: 'Ownership' },
          { label: 'Quick learner' },
          { label: 'Initiative' },
          { label: 'Clear communication' },
        ],
      },
    ],
    next: 'More about me beyond work and studies',
  },

  beyond: {
    eyebrow: 'Engagement',
    title: 'Beyond work and studies',
    lead: 'In my volunteer work, too, I look after the numbers.',
    role: 'Board Member, Finance and Regional Representation',
    organisation:
      'Chlauschlöpfer club Seengen, a traditional Swiss whip-cracking association (voluntary)',
    period: 'since 11.2021',
    text: 'I manage the club’s finances, from budget and annual accounts to payments. As the sole delegate I represent Seengen on the regional board and help organise the annual events.',
    interestsLabel: 'Interests',
    interests:
      'Sport, mainly fitness and swimming. I am also interested in history, politics and other cultures.',
  },

  references: {
    eyebrow: 'References',
    title: 'What others say',
    lead: 'Three voices from projects and day-to-day work, translated from the German originals.',
    items: [
      {
        id: 'ref-wab',
        projectId: 'proj-p4',
        quote:
          'He led the team with confidence, kept track of all work packages at all times and made sure agreed goals and deadlines were reliably met.',
        source: 'CEO, international industrial company',
        sourceNamed: 'CEO, Willy A. Bachofen AG',
      },
      {
        id: 'ref-millennium',
        quote: 'We would have been very glad to keep Mr Lars Meyer on in a full-time role.',
        source: 'Owner, property management company',
      },
      {
        id: 'ref-immo123',
        quote:
          'With his balanced, helpful and collegial manner, Lars Meyer was valued by everyone he worked with.',
        source: 'Management and HR, real estate company',
      },
    ],
  },

  closing: {
    sentence: 'Happy to tell you more. The quickest way to reach me is on LinkedIn.',
    button: 'LinkedIn',
    footer: '© {year} Lars Meyer',
  },
} satisfies SiteContent
