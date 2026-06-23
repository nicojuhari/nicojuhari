import Image from "next/image";
import CtaSection from "./cta-section";

export default function Hero() {
    return (
        <section className="section container-sm text-center">
            <div className="flex justify-center mb-6">
                <Image
                    src="/nick-profile-photo.webp"
                    alt="Nick profile photo"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-cover border-4 border-white shadow-md"
                />
            </div>
            <p className="text-brand-dusty mb-6 max-md:text-sm">Nick · Software Engineer</p>
            <h1 className="text-[54px] leading-14 sm:text-6xl font-bold mb-8">
                Websites and Web Apps{" "}
                <span className="block text-[45%] sm:text-[55%] font-medium text-muted-foreground">built to grow your business.</span>
            </h1>
            <CtaSection className="py-0! mb-14!" />
        </section>
    );
}
