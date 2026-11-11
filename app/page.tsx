import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText, Mail } from "lucide-react";
import { LinkedInIcon, ProjectMark } from "./_components/icons";
import { cv, cvContact, cvSkills } from "./_data/cv";
import { projects } from "./_data/projects";
import { caseStudies } from "./_data/case-studies";
import { services } from "./_data/services";
import { homeSchema } from "./_lib/schema";
import { pageMetadata } from "./_lib/metadata";
import { SITE_DESCRIPTION, SITE_TITLE } from "./_lib/site";
import { formatDate, notes } from "./notes/_content";

export const metadata: Metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
});

/** Hero card: the career path in four steps; the last one is highlighted */
const path = [
  {
    year: "2009",
    title: "Credit economist",
    text: "Victoriabank - loans, risk and reports",
  },
  {
    year: "2014",
    title: "First code, for a real business",
    text: "Ideal Credit’s loan system, still running daily",
  },
  {
    year: "2020",
    title: "Senior engineer at bwin",
    text: "Shared UI system for all the brands, Vienna",
  },
  {
    year: "Now",
    title: "Building EPUfix",
    text: "Own SaaS · Next.js, Supabase, Stripe",
  },
];

const [lead, ...others] = [
  "epufix",
  "ideal-credit-system",
  "handwerker-netz",
].map((slug) => projects.find((p) => p.slug === slug)!);

const jobs = cv.en.jobs.slice(0, 3);

/** One line per job that says something the work cards above don't */
const jobNotes: Record<string, string> = {
    "Self-Employed": "My own products and a few client projects.",
    "Ideal Credit LTD": "The company where I started in credit. I moved from the loan desk to building its software.",
    "Bwin.party Services GmbH": "My team owned the shared UI system for all the company’s brands - dozens of websites. Started as a front end developer, promoted to senior in 2022.",
};

const outlineBtn =
  "inline-flex h-13 items-center justify-center gap-2 rounded-full border border-ink/15 px-6 text-base font-semibold text-ink transition-colors hover:bg-ink/5 sm:h-14 sm:text-[17px]";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema()) }}
      />

      {/* Hero */}
      <section className="container mt-8 grid items-center gap-10 sm:mt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-6 sm:gap-7">
          <div className="flex flex-wrap items-center gap-3">
            <Image
              src="/nick-profile-photo.webp"
              alt="Nicolae Cojuhari"
              width={96}
              height={96}
              priority
              className="size-11 rounded-full object-cover ring-3 ring-white"
            />
            <p className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink-muted sm:text-sm">
              <span className="relative size-2" aria-hidden>
                <span className="absolute inset-0 rounded-full bg-teal motion-safe:animate-[ping-soft_2.4s_ease-in-out_infinite]" />
                <span className="absolute inset-0 rounded-full bg-teal" />
              </span>
              Open to full-time roles · Vienna &amp; remote
            </p>
          </div>
          <h1 className="text-[44px] leading-[1.02] font-semibold tracking-[-0.04em] text-balance text-ink motion-safe:animate-[hero-rise_0.7s_cubic-bezier(0.16,1,0.3,1)_both] sm:text-[60px] xl:text-[72px]">
            Full-Stack Engineer in Vienna.
          </h1>
          <p className="max-w-[560px] text-lg leading-normal text-[#4a4f57] sm:text-xl">
            I’m Nick. 10+ years of building web applications - from a senior
            role at bwin to the loan system a credit company runs on every day.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#work"
              className="btn-pill-primary h-13 px-6.5 text-base sm:h-14 sm:text-[17px]"
            >
              See my work
              <ArrowRight className="size-[18px]" aria-hidden />
            </a>
            <Link href="/cv" className={outlineBtn}>
              <FileText className="size-[18px]" aria-hidden />
              View CV
            </Link>
          </div>
          <p className="text-sm text-[#4a4f57] sm:text-[15px]">
            Need a website or app for your business?{" "}
            <Link
              href="/services"
              className="font-semibold text-brand underline decoration-teal/40 underline-offset-4 hover:text-teal"
            >
              See freelance services
            </Link>
          </p>
        </div>

        <div className="relative flex flex-col gap-6 overflow-hidden rounded-[24px] bg-brand p-5.5 text-white shadow-[0_24px_60px_-24px_rgba(22,40,77,0.55)] sm:rounded-[28px] sm:p-10">
          <span
            className="absolute -top-20 -right-20 size-64 rounded-full bg-[#1d3463]"
            aria-hidden
          />
          <p className="relative text-[15px] font-semibold text-[#c3cbe0]">
            From credit desk to code
          </p>
          <div className="relative">
            <span
              className="absolute top-7 bottom-7 left-[30px] w-0.5 bg-[#2c4377] sm:left-[34px]"
              aria-hidden
            >
              <span className="absolute -left-1 -mt-[5px] size-2.5 rounded-full bg-brand-rose motion-safe:animate-[flow_4.8s_cubic-bezier(.45,0,.55,1)_infinite]" />
            </span>
            <ol className="relative flex flex-col gap-2.5 sm:gap-3">
              {path.map((step, i) => {
                const last = i === path.length - 1;
                return (
                  <li
                    key={step.year}
                    className={`relative flex items-center gap-4 rounded-[16px] py-3 pr-4 pl-2.5 sm:rounded-[18px] sm:py-3.5 sm:pl-3 ${last ? "bg-white text-ink" : "bg-[#203868]"}`}
                  >
                    <span
                      className={`flex h-8 w-10 shrink-0 items-center justify-center rounded-[10px] text-[13px] font-bold tabular-nums sm:w-11 ${last ? "bg-brand-rose text-white" : "bg-white text-brand"}`}
                    >
                      {step.year}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-base font-semibold sm:text-[17px]">
                        {step.title}
                      </span>
                      <span
                        className={`text-[13px] sm:text-sm ${last ? "text-ink-muted" : "text-[#c3cbe0]"}`}
                      >
                        {step.text}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section
        id="work"
        className="container mt-20 flex scroll-mt-28 flex-col gap-8 sm:mt-28 sm:gap-10"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="section-title max-w-[640px] text-balance">
            Software that’s in use every day.
          </h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 self-start py-2 text-[15px] font-semibold text-teal hover:underline sm:self-auto"
          >
            All projects <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr] lg:gap-4">
          <article className="flex flex-col gap-6 rounded-[24px] border border-rule bg-white p-6 sm:rounded-[28px] sm:p-10">
            <div className="flex items-center gap-3.5">
              <ProjectMark project={lead} className="size-12" />
              <span className="flex flex-col">
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-[28px]">
                  {lead.title}
                </h3>
                <span className="text-sm text-ink-muted">
                  My own product · {lead.year}
                </span>
              </span>
            </div>
            <p className="max-w-[60ch] text-[17px] leading-relaxed text-ink-soft sm:text-lg">
              {lead.overview}
            </p>
            {lead.features && (
              <ul className="grid gap-x-8 gap-y-4 border-t border-rule pt-6 sm:grid-cols-2">
                {lead.features.map((f) => (
                  <li key={f.title} className="flex flex-col gap-1">
                    <span className="font-semibold text-ink">{f.title}</span>
                    <span className="text-[15px] leading-snug text-ink-soft">
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
              <StackList stack={lead.stack} />
              <span className="flex items-center gap-5">
                <CaseStudyLink slug={lead.slug} />
                {lead.url && <SiteLink url={lead.url} />}
              </span>
            </div>
          </article>
          <div className="grid gap-3 lg:gap-4">
            {others.map((p) => (
              <article
                key={p.slug}
                className="flex flex-col gap-4 rounded-[24px] border border-rule bg-white p-6 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <ProjectMark project={p} />
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">
                    {p.title}
                  </h3>
                </div>
                <p className="text-[15px] leading-relaxed text-ink-soft">
                  {p.description}
                </p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <StackList stack={p.stack.slice(0, 3)} />
                  <span className="flex items-center gap-4">
                    <CaseStudyLink slug={p.slug} />
                    {p.url ? (
                      <SiteLink url={p.url} />
                    ) : (
                      <span className="text-sm font-medium text-ink-muted">
                        Private
                      </span>
                    )}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experience + stack */}
      <section
        id="experience"
        className="mt-20 scroll-mt-28 bg-brand text-white sm:mt-28"
      >
        <div className="container grid gap-10 py-14 sm:py-24 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <h2 className="section-title text-white">Where I’ve worked.</h2>
            <ol className="flex flex-col border-t border-white/15">
              {jobs.map((j) => (
                <li
                  key={j.company}
                  className="grid gap-1.5 border-b border-white/15 py-6 sm:grid-cols-[150px_1fr] sm:gap-8"
                >
                  <span className="pt-1 text-sm text-[#c3cbe0] tabular-nums">
                    {j.dates}
                  </span>
                  <span className="flex flex-col gap-1.5">
                    <h3 className="text-[19px] font-semibold tracking-[-0.02em] sm:text-[21px]">
                      {j.title}
                    </h3>
                    <span className="text-[15px] text-[#f2a9c9]">
                      {j.company}
                    </span>
                    {jobNotes[j.company] && <p className="mt-1 max-w-[62ch] text-[15px] leading-relaxed text-[#dfe4f0] sm:text-base">{jobNotes[j.company]}</p>}
                  </span>
                </li>
              ))}
            </ol>
            <p className="text-[15px] text-[#c3cbe0]">
              Before that: web agencies in the UK (2016 – 2019) and 5 years in
              banking and credit.{" "}
              <Link
                href="/about"
                className="font-semibold text-white underline decoration-[#f2a9c9]/60 underline-offset-4"
              >
                My story
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-6 lg:pt-[88px]">
            <h2 className="text-[26px] leading-tight font-semibold tracking-[-0.03em] sm:text-[32px]">
              What I work with.
            </h2>
            <ul className="flex flex-wrap gap-2">
              {cvSkills.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="text-[15px] leading-relaxed text-[#c3cbe0]">
              English, Romanian and Russian. German at A2 and improving.
            </p>
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 self-start py-2 text-[15px] font-semibold text-white hover:underline"
            >
              Full CV <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Notes */}
      {notes.length > 0 && (
        <section className="container mt-20 flex flex-col gap-6 sm:mt-28 sm:gap-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="section-title">Notes from my work.</h2>
            <Link
              href="/notes"
              className="inline-flex items-center gap-2 self-start py-2 text-[15px] font-semibold text-teal hover:underline sm:self-auto"
            >
              All notes <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="flex flex-col border-t border-rule">
            {notes.slice(0, 3).map((n) => (
              <li key={n.slug} className="border-b border-rule">
                <Link
                  href={`/notes/${n.slug}`}
                  className="group grid gap-1.5 py-6 sm:grid-cols-[150px_1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <time
                    dateTime={n.date}
                    className="text-sm text-ink-muted tabular-nums"
                  >
                    {formatDate(n.date)}
                  </time>
                  <span className="flex flex-col gap-1.5">
                    <span className="text-lg font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-teal sm:text-xl">
                      {n.title}
                    </span>
                    <span className="max-w-[68ch] text-[15px] leading-relaxed text-ink-soft">
                      {n.description}
                    </span>
                  </span>
                  <ArrowRight
                    className="hidden size-5 text-ink-faint transition-transform group-hover:translate-x-1 group-hover:text-teal sm:block"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Freelance */}
      <section className="container mt-20 sm:mt-28">
        <div className="grid gap-6 rounded-[24px] bg-[#f3e7ec] p-6 sm:rounded-[28px] sm:p-10 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[26px] leading-tight font-semibold tracking-[-0.03em] text-ink sm:text-[32px]">
              Freelance, on the side.
            </h2>
            <p className="text-base leading-relaxed text-[#2c2a30] sm:text-lg">
              I build websites and custom apps for a few small businesses.
              Tested in my own businesses first.
            </p>
          </div>
          <ul className="flex flex-col gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={s.href}
                  className="flex items-center justify-between gap-3 rounded-[16px] bg-white px-5 py-4 font-semibold text-ink transition-colors hover:bg-white/70"
                >
                  {s.title}
                  <ArrowRight
                    className="size-4 shrink-0 text-[#8c3a63]"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container mt-4 scroll-mt-28 sm:mt-5">
        <div className="flex flex-col items-start gap-6 rounded-[24px] bg-brand p-7 text-white sm:rounded-[28px] sm:p-14">
          <h2 className="section-title text-white">
            Hiring a full-stack engineer?
          </h2>
          <p className="max-w-[560px] text-lg leading-normal text-[#c3cbe0]">
            Send me an email or a message on LinkedIn. I reply the same day.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={`mailto:${cvContact.email}`}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-semibold text-brand transition-opacity hover:opacity-90"
            >
              <Mail className="size-[18px]" aria-hidden />
              {cvContact.email}
            </a>
            <a
              href={cvContact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/35 px-6 text-base font-semibold transition-colors hover:border-white/70"
            >
              <LinkedInIcon className="size-[18px]" />
              LinkedIn
            </a>
            <Link
              href="/cv"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/35 px-6 text-base font-semibold transition-colors hover:border-white/70"
            >
              <FileText className="size-[18px]" aria-hidden />
              CV
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function StackList({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
      {stack.map((s) => (
        <li
          key={s}
          className="rounded-full bg-bg-soft px-2.5 py-1 text-xs font-medium text-ink"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

function SiteLink({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 py-1 text-sm font-semibold text-teal hover:underline"
    >
      {new URL(url).hostname.replace(/^www\./, "")}{" "}
      <ArrowUpRight className="size-3.5" aria-hidden />
    </a>
  );
}

function CaseStudyLink({ slug }: { slug: string }) {
  if (!caseStudies.some((c) => c.slug === slug)) return null;
  return (
    <Link
      href={`/projects/${slug}`}
      className="inline-flex items-center gap-1.5 py-1 text-sm font-semibold text-brand hover:underline"
    >
      Case study <ArrowRight className="size-3.5" aria-hidden />
    </Link>
  );
}
