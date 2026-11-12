import { SOCIAL_LINKS } from "@/app/_lib/site";

/** CV content in English and German - edit here, /cv and /de/cv (and their print views) update together */

export type CvLang = "en" | "de";

type Job = {
    title: string;
    company: string;
    url?: string;
    dates: string;
    place?: string;
    bullets: string[];
    tech?: string;
};

type Cv = {
    title: string;
    headings: {
        profile: string;
        languages: string;
        skills: string;
        projects: string;
        education: string;
        interests: string;
        experience: string;
        certificates: string;
    };
    location: string;
    profile: string[];
    languages: { name: string; level: number; label: string }[];
    projects: { name: string; url?: string; text: string }[];
    education: { title: string; school: string; dates: string }[];
    interests: string[];
    jobs: Job[];
    certificates: string[];
    ui: { download: string; switchTo: string };
};

export const cvContact = {
    name: "Nicolae Cojuhari",
    email: "nicojuhari@gmail.com",
    phone: "+43 690 20108484",
    website: "nicojuhari.com",
    linkedin: SOCIAL_LINKS[0],
    github: SOCIAL_LINKS[1],
};

/** Same order in both languages */
export const cvSkills = [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "Stripe",
    "Tailwind CSS",
    "SCSS",
    "Angular",
    "Git",
    "Shopify",
    "n8n",
    "Claude Code",
    "Cursor",
];

const stack = {
    self: "TypeScript, React, Next.js, Node.js, PostgreSQL, Supabase, Stripe, Tailwind CSS",
    ideal: "TypeScript, React, Next.js, Node.js, SQL",
    bwin: "SCSS, JavaScript, TypeScript, Angular, HTML5",
    fluid: "Magento, JavaScript, PHP, WordPress, SCSS",
    monocore: "Magento, Shopify, PHP, JavaScript, MySQL",
    agencies: "JavaScript, PHP, WordPress, CSS",
};

export const cv: Record<CvLang, Cv> = {
    en: {
        title: "Senior Full-Stack Engineer",
        headings: {
            profile: "Profile",
            languages: "Languages",
            skills: "Skills",
            projects: "Selected projects",
            education: "Education",
            interests: "Interests",
            experience: "Professional experience",
            certificates: "Certificates",
        },
        location: "Vienna, Austria",
        profile: [
            "Full-stack engineer with 10+ years of building web applications, and a background in banking and credit.",
            "I build with TypeScript, React, Next.js, Node.js and PostgreSQL - from loan management software and business dashboards to consumer platforms used by millions.",
            "AI coding tools are part of my daily work: cleaner code, faster delivery and less repetitive work.",
            "I don’t just write code: I find out what a task is for and build the solution. I can work on my own from a few details, or follow exact specs - and I say when something can be done better.",
        ],
        languages: [
            { name: "English", level: 4, label: "Professional" },
            { name: "Romanian", level: 5, label: "Native" },
            { name: "Russian", level: 5, label: "Native" },
            { name: "German", level: 2, label: "A2" },
        ],
        projects: [
            { name: "EPUfix", url: "https://epufix.at", text: "Invoicing and bookkeeping app for self-employed people in Austria." },
            { name: "Ideal Credit Management", text: "Loan management system a credit company runs on every day." },
            { name: "Handwerker Netz", url: "https://handwerker-netz.at", text: "Bilingual business website - 95%+ of clients come from it and Google Maps." },
        ],
        education: [
            { title: "Bachelor's Degree in Finance & Banking", school: "State Agrarian University of Moldova", dates: "2004 – 2008 | Moldova" },
            { title: "Front End Developer Nanodegree", school: "Udacity", dates: "2019 | USA" },
        ],
        interests: ["Basketball", "Skiing", "Boxing", "Formula 1"],
        jobs: [
            {
                title: "Full-Stack Developer",
                company: "Self-Employed",
                url: "https://nicojuhari.com",
                dates: "08/2024 – present",
                place: "Vienna",
                bullets: [
                    "Built EPUfix, an invoicing and bookkeeping app for self-employed people in Austria: offers, invoices, income, expenses and an export for the tax advisor.",
                    "Built complete web applications for clients, from business dashboards to financial calculators.",
                    "Set up secure logins, database design and payments with Stripe.",
                    "Use AI tools daily to scaffold code, debug faster and automate testing.",
                ],
                tech: stack.self,
            },
            {
                title: "Full-Stack Developer (Financial Systems)",
                company: "Ideal Credit LTD",
                url: "https://idealcredit.md",
                dates: "11/2014 – present",
                place: "Moldova (Remote)",
                bullets: [
                    "Built and maintain the internal management software the company runs on every day: loan applications, customer accounts, payments and financial calculations.",
                    "Built real-time reports so management can track the loan portfolio and meet legal requirements.",
                    "Designed and built the company website with loan calculators - fast, secure and easy to use for new clients.",
                ],
                tech: stack.ideal,
            },
            {
                title: "Senior Software Engineer",
                company: "Bwin.party Services GmbH",
                dates: "03/2020 – 07/2024",
                place: "Vienna, Austria",
                bullets: [
                    "Part of the team that owned the shared frontend UI system for all the company's brands - used across dozens of websites.",
                    "Built and improved frontend features and layouts for large sports betting platforms used by millions of customers.",
                    "Refactored legacy code so pages load faster and new features are easier to build.",
                    "Promoted from Front End Developer to Senior Software Engineer in October 2022.",
                ],
                tech: stack.bwin,
            },
            {
                title: "Front End Magento Developer",
                company: "Fluid Digital LTD",
                dates: "12/2018 – 12/2019",
                place: "Manchester, United Kingdom",
                bullets: [
                    "Built custom online stores and themes for retail clients, on mobile and desktop.",
                    "Fixed frontend issues, cleaned up code and improved page speed across client websites.",
                ],
                tech: stack.fluid,
            },
            {
                title: "Web Developer & IT Support",
                company: "Monocore LTD",
                dates: "05/2018 – 11/2018",
                place: "Manchester, United Kingdom",
                bullets: [
                    "Maintained two e-commerce websites: updates, bug fixes and general IT tasks.",
                    "Built a custom tool that sends online orders straight to the warehouse software, saving the team manual work.",
                ],
                tech: stack.monocore,
            },
            {
                title: "Web Developer Roles",
                company: "Web4Biz, Ranking Solutions, Avantis",
                dates: "07/2016 – 05/2018",
                place: "Manchester & Lancashire, UK",
                bullets: ["Built and updated websites for small businesses across several web agencies."],
                tech: stack.agencies,
            },
            {
                title: "Operations & Credit Officer",
                company: "Ideal Credit LTD",
                dates: "04/2010 – 10/2014",
                place: "Moldova",
                bullets: [
                    "Evaluated loan applications, reviewed financial documents and analyzed credit risk.",
                    "Managed the client loan portfolio and prepared financial reports for management.",
                ],
            },
            {
                title: "Economist – Credit Department",
                company: "BC Victoriabank SA",
                dates: "02/2009 – 03/2010",
                place: "Moldova",
                bullets: [
                    "Assessed creditworthiness for personal and business loan requests.",
                    "Tracked loan status and prepared regular risk reports for the bank.",
                ],
            },
        ],
        certificates: ["Magento 2 Professional Front End Developer", "Advanced JavaScript Concepts – 2019", "Google AdWords Search Certification"],
        ui: { download: "Download PDF", switchTo: "Deutsch" },
    },
    de: {
        title: "Senior Full-Stack Engineer",
        headings: {
            profile: "Profil",
            languages: "Sprachen",
            skills: "Kenntnisse",
            projects: "Ausgewählte Projekte",
            education: "Ausbildung",
            interests: "Interessen",
            experience: "Berufserfahrung",
            certificates: "Zertifikate",
        },
        location: "Wien, Österreich",
        profile: [
            "Full-Stack Engineer mit über 10 Jahren Erfahrung in der Entwicklung von Webanwendungen und einem Hintergrund in Bank- und Kreditwesen.",
            "Ich arbeite mit TypeScript, React, Next.js, Node.js und PostgreSQL - von Kreditverwaltungssoftware und Business-Dashboards bis zu Plattformen mit Millionen von Nutzern.",
            "KI-Tools gehören zu meinem Arbeitsalltag: saubererer Code, schnellere Lieferung, weniger Routinearbeit.",
            "Ich schreibe nicht nur Code: Ich frage, wofür eine Aufgabe da ist, und baue die Lösung. Ich arbeite selbstständig mit wenigen Vorgaben oder nach genauen Specs - und sage es, wenn etwas besser geht.",
        ],
        languages: [
            { name: "Englisch", level: 4, label: "Verhandlungssicher" },
            { name: "Rumänisch", level: 5, label: "Muttersprache" },
            { name: "Russisch", level: 5, label: "Muttersprache" },
            { name: "Deutsch", level: 2, label: "A2" },
        ],
        projects: [
            { name: "EPUfix", url: "https://epufix.at", text: "Rechnungs- und Buchhaltungs-App für Selbstständige in Österreich." },
            { name: "Ideal Credit Management", text: "Kreditverwaltungssystem, mit dem ein Kreditunternehmen täglich arbeitet." },
            { name: "Handwerker Netz", url: "https://handwerker-netz.at", text: "Zweisprachige Firmenwebsite - über 95 % der Kunden kommen über die Website und Google Maps." },
        ],
        education: [
            { title: "Bachelor in Finanz- und Bankwesen", school: "Staatliche Agraruniversität Moldau", dates: "2004 – 2008 | Moldau" },
            { title: "Front End Developer Nanodegree", school: "Udacity", dates: "2019 | USA" },
        ],
        interests: ["Basketball", "Skifahren", "Boxen", "Formel 1"],
        jobs: [
            {
                title: "Full-Stack Developer",
                company: "Selbstständig",
                url: "https://nicojuhari.com",
                dates: "08/2024 – heute",
                place: "Wien",
                bullets: [
                    "Entwicklung von EPUfix, einer Rechnungs- und Buchhaltungs-App für Selbstständige in Österreich: Angebote, Rechnungen, Einnahmen, Ausgaben und Export für die Steuerberatung.",
                    "Komplette Webanwendungen für Kunden, von Business-Dashboards bis zu Finanzrechnern.",
                    "Sichere Logins, Datenbankdesign und Zahlungen mit Stripe.",
                    "Täglicher Einsatz von KI-Tools für Code-Gerüste, schnelleres Debugging und automatisierte Tests.",
                ],
                tech: stack.self,
            },
            {
                title: "Full-Stack Developer (Finanzsysteme)",
                company: "Ideal Credit LTD",
                url: "https://idealcredit.md",
                dates: "11/2014 – heute",
                place: "Moldau (Remote)",
                bullets: [
                    "Entwicklung und Betreuung der internen Verwaltungssoftware, mit der das Unternehmen täglich arbeitet: Kreditanträge, Kundenkonten, Zahlungen und Finanzberechnungen.",
                    "Echtzeit-Berichte, mit denen die Geschäftsführung das Kreditportfolio verfolgt und gesetzliche Vorgaben erfüllt.",
                    "Design und Entwicklung der Firmenwebsite mit Kreditrechnern - schnell, sicher und einfach für Neukunden.",
                ],
                tech: stack.ideal,
            },
            {
                title: "Senior Software Engineer",
                company: "Bwin.party Services GmbH",
                dates: "03/2020 – 07/2024",
                place: "Wien, Österreich",
                bullets: [
                    "Teil des Teams, das das gemeinsame Frontend-UI-System für alle Marken des Unternehmens verantwortete - im Einsatz auf Dutzenden Websites.",
                    "Entwicklung und Verbesserung von Frontend-Features und Layouts für große Sportwetten-Plattformen mit Millionen von Kunden.",
                    "Refactoring von Legacy-Code für schnellere Ladezeiten und einfachere Weiterentwicklung.",
                    "Beförderung vom Front End Developer zum Senior Software Engineer im Oktober 2022.",
                ],
                tech: stack.bwin,
            },
            {
                title: "Front End Magento Developer",
                company: "Fluid Digital LTD",
                dates: "12/2018 – 12/2019",
                place: "Manchester, Großbritannien",
                bullets: [
                    "Individuelle Online-Shops und Themes für Handelskunden, für Mobil und Desktop.",
                    "Frontend-Fehler behoben, Code bereinigt und Ladezeiten der Kundenwebsites verbessert.",
                ],
                tech: stack.fluid,
            },
            {
                title: "Web Developer & IT Support",
                company: "Monocore LTD",
                dates: "05/2018 – 11/2018",
                place: "Manchester, Großbritannien",
                bullets: [
                    "Betreuung von zwei E-Commerce-Websites: Updates, Fehlerbehebung und allgemeine IT-Aufgaben.",
                    "Eigenes Tool, das Online-Bestellungen direkt an die Lagersoftware sendet und dem Team manuelle Arbeit spart.",
                ],
                tech: stack.monocore,
            },
            {
                title: "Web Developer",
                company: "Web4Biz, Ranking Solutions, Avantis",
                dates: "07/2016 – 05/2018",
                place: "Manchester & Lancashire, GB",
                bullets: ["Websites für kleine Unternehmen bei mehreren Webagenturen erstellt und betreut."],
                tech: stack.agencies,
            },
            {
                title: "Operations & Credit Officer",
                company: "Ideal Credit LTD",
                dates: "04/2010 – 10/2014",
                place: "Moldau",
                bullets: [
                    "Prüfung von Kreditanträgen und Finanzunterlagen, Analyse des Kreditrisikos.",
                    "Verwaltung des Kreditportfolios und Finanzberichte für die Geschäftsführung.",
                ],
            },
            {
                title: "Ökonom – Kreditabteilung",
                company: "BC Victoriabank SA",
                dates: "02/2009 – 03/2010",
                place: "Moldau",
                bullets: [
                    "Bonitätsprüfung für Privat- und Firmenkredite.",
                    "Überwachung von Krediten und regelmäßige Risikoberichte für die Bank.",
                ],
            },
        ],
        certificates: ["Magento 2 Professional Front End Developer", "Advanced JavaScript Concepts – 2019", "Google AdWords Search Certification"],
        ui: { download: "PDF herunterladen", switchTo: "English" },
    },
};
