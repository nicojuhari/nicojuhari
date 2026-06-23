"use client";

import ContactFormInner from "./contact-form-inner";
import WhatsAppButton from "./whatsapp-button";

export default function ContactForm() {
    return (
        <section className="section container-sm" id="contact">
            <h2 className="text-3xl font-bold text-center mb-4">Contact me</h2>
            <p className="text-center text-muted-foreground mb-8">Let&apos;s work together on your next project.</p>

            <div className="flex justify-center mb-8">
                <WhatsAppButton className="h-11 px-6 text-base" anchorText="💬 Message me on WhatsApp" />
            </div>

            <div className="border rounded-xl p-6 bg-white">
                <p className="text-sm text-muted-foreground text-center mb-6">Or send me a message:</p>
                <ContactFormInner />
            </div>
        </section>
    );
}
