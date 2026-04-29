import { Separator } from "@/components/ui/separator"
import Hero from "./_components/hero"
import WebApps from "./_components/web-apps"
import ToolsPreview from "./_components/tools-preview"
import TechStack from "./_components/tech-stack"
import PlaygroundPreview from "./_components/playground-preview"
import ContactForm from "./_components/contact-form"

export default function Home() {
  return (
    <>
      <Hero />
      <Separator />
      <WebApps />
      <Separator />
      <ToolsPreview />
      <Separator />
      <TechStack />
      <Separator />
      <PlaygroundPreview />
      <Separator />
      <ContactForm />
    </>
  )
}
