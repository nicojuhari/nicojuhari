import Image from "next/image";
import Link from "next/link";
import ContactButton from "./contact-button";

const socials = [
    {
        href: "https://www.linkedin.com/in/nicojuhari/",
        label: "LinkedIn",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="size-7" viewBox="0 0 256 256" aria-hidden>
                <path
                    fill="currentColor"
                    d="M212 28H44a16 16 0 0 0-16 16v168a16 16 0 0 0 16 16h168a16 16 0 0 0 16-16V44a16 16 0 0 0-16-16ZM96 176a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm-8-84a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm96 84a8 8 0 0 1-16 0v-36a20 20 0 0 0-40 0v36a8 8 0 0 1-16 0v-64a8 8 0 0 1 15.8-1.8A36 36 0 0 1 184 140Z"
                />
            </svg>
        ),
    },
    {
        href: "https://github.com/nicojuhari",
        label: "GitHub",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="size-7" viewBox="0 0 24 24" aria-hidden>
                <path
                    fill="currentColor"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                />
            </svg>
        ),
    },
    {
        href: "https://twitter.com/nicojuhari",
        label: "X",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="size-7" viewBox="0 0 48 48" aria-hidden>
                <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.604 25.622L7.693 41.498M37.924 6.502L25.554 21.07M6.61 6.5l27.44 35h7.56l-27.439-35z"
                />
            </svg>
        ),
    },
];

export default function ProfilePanel() {
    return (
        <aside className="lg:sticky lg:top-24">
            <div className="surface-card p-5 sm:p-8">
                <div className="flex flex-col items-center">
                    <Image
                        src="/nick-profile-photo.webp"
                        alt="Nicolae Cojuhari"
                        title="Nicolae Cojuhari"
                        width={128}
                        height={128}
                        priority
                        className="size-20 rounded-full object-cover ring-1 ring-rule sm:size-28"
                    />

                    <h1 className="mt-4 text-center sm:mt-5">
                        <span className="block text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-[2rem]">
                            Nicolae Cojuhari
                        </span>
                        <span className="mt-2 block text-[14px] font-medium leading-snug text-ink-soft sm:text-[15px]">
                            Software Engineer <span className="text-brand-green">·</span> Finance{" "}
                            <span className="text-brand-green">·</span> AI
                        </span>
                    </h1>

                    <p className="mt-4 text-[14px] leading-relaxed text-ink-muted sm:mt-5 sm:text-[15px]">
                        Software engineer with a finance background. I use AI to build{" "}
                        <span className="font-medium text-ink">financial</span> and{" "}
                        <span className="font-medium text-ink">productivity</span> apps, that replace spreadsheets and
                        manual workflows.
                    </p>

                    <div className="mt-6 flex w-full flex-col gap-2.5 sm:mt-7">
                        <ContactButton className="btn-pill-primary w-full">Get in touch</ContactButton>
                        <Link href="/projects" className="btn-pill-secondary w-full">
                            See my projects
                        </Link>
                    </div>

                    <ul className="mt-6 flex w-full items-center justify-center gap-6 sm:mt-8">
                        {socials.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={item.label}
                                    className="inline-flex text-ink-muted transition-colors hover:text-ink"
                                >
                                    {item.icon}
                                    <span className="sr-only">{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
}
