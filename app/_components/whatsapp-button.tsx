import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL } from "@/app/_data/services";

export default function WhatsAppButton({ className, anchorText }: { className?: string; anchorText?: string }) {
    return (
        <Button
            className={cn("bg-teal hover:bg-teal/90", className)}
            nativeButton={false}
            render={<a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" />}
        >
            {anchorText || "WhatsApp"}
        </Button>
    );
}
