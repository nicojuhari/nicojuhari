import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const WHATSAPP_URL = "https://wa.me/+4369010196811";

export default function WhatsAppButton({ className, anchorText }: { className?: string; anchorText?: string }) {
    return (
        <Button
            className={cn("bg-brand-green hover:bg-brand-green/80", className)}
            nativeButton={false}
            render={<a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" />}
        >
            {anchorText || "WhatsApp"}
        </Button>
    );
}
