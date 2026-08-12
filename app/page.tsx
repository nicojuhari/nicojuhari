import type { Metadata } from "next";
import ProfilePanel from "./_components/profile-panel";
import WorkBoard from "./_components/work-board";
import TechStack from "./_components/tech-stack";
import { professionalServiceSchema, webSiteSchema } from "./_lib/schema";

export const metadata: Metadata = {
    title: "Nicolae Cojuhari - Software Engineer · Finance · AI",
    description:
        "Software engineer with a finance background. I use AI to build financial and productivity apps for web and mobile - tools that replace spreadsheets and manual workflows.",
    alternates: { canonical: "https://nicojuhari.com" },
    openGraph: {
        title: "Nicolae Cojuhari - Software Engineer · Finance · AI",
        description:
            "Software engineer with a finance background. I use AI to build financial and productivity apps for web and mobile.",
    },
};

export default function Home() {
    return (
        <>
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
                    </div>
                </div>
            </div>
        </>
    );
}
