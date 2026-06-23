import Hero from "./_components/hero";
import Services from "./_components/services";
import WebApps from "./_components/web-apps";
import ToolsPreview from "./_components/tools-preview";
import TechStack from "./_components/tech-stack";
import PlaygroundPreview from "./_components/playground-preview";

export default function Home() {
    return (
        <>
            <Hero />
            <Services />
            <WebApps />
            <ToolsPreview />
            <PlaygroundPreview />
            <TechStack />
        </>
    );
}
