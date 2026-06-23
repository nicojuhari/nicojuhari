import type { Metadata } from "next";
import Hero from "./_components/hero";
import Services from "./_components/services";
import WebApps from "./_components/web-apps";
import ToolsPreview from "./_components/tools-preview";
import TechStack from "./_components/tech-stack";
import PlaygroundPreview from "./_components/playground-preview";
import { professionalServiceSchema, webSiteSchema } from "./_lib/schema";

export const metadata: Metadata = {
    alternates: { canonical: "https://nicojuhari.com" },
};

export default function Home() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema()) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }} />
            <Hero />
            <Services />
            <WebApps />
            <ToolsPreview />
            <PlaygroundPreview />
            <TechStack />
        </>
    );
}
