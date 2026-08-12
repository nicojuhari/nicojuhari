import type { Metadata } from "next";
import ProfilePanel from "./_components/profile-panel";
import WorkBoard from "./_components/work-board";
import TechStack from "./_components/tech-stack";
import AboutSection from "./_components/about-section";
import { personSchema, professionalServiceSchema, webSiteSchema } from "./_lib/schema";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./_lib/site";

export const metadata: Metadata = {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    alternates: { canonical: SITE_URL },
    openGraph: {
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
    },
};

export default function Home() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema()) }}
            />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }} />

            <div className="container py-6 sm:py-10">
                <div className="grid gap-6 lg:grid-cols-[minmax(280px,340px)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[360px_minmax(0,1fr)]">
                    <ProfilePanel />
                    <div className="min-w-0">
                        <WorkBoard />
                        <TechStack />
                        <AboutSection />
                    </div>
                </div>
            </div>
        </>
    );
}
