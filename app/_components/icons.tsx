import {
    Bookmark,
    ChartLine,
    CreditCard,
    Crop,
    Cpu,
    Download,
    FileText,
    FolderUp,
    Globe,
    LayoutGrid,
    List,
    ListChecks,
    QrCode,
    Receipt,
    Scissors,
    ShoppingBag,
    Smartphone,
    Space,
    Truck,
    Type,
    WalletCards,
    type LucideIcon,
} from "lucide-react";
import type { FeatureIcon, Project, ProjectIcon } from "@/app/_data/projects";
import type { ServiceSlug } from "@/app/_data/services";
import { cn } from "@/lib/utils";

export const toolIcons: Record<string, LucideIcon> = {
    "qr-code-generator": QrCode,
    "square-image-cropper": Crop,
    "word-counter": Type,
    "whitespace-remover": Space,
    "online-checklist-maker": ListChecks,
    "product-grid-generator": LayoutGrid,
    "bill-split-calculator": Receipt,
};

export const serviceIcons: Record<ServiceSlug, LucideIcon> = {
    "business-websites": Globe,
    "shopify-stores": ShoppingBag,
    "custom-web-apps": Cpu,
};

export const featureIcons: Record<FeatureIcon, LucideIcon> = {
    list: List,
    file: FileText,
    chart: ChartLine,
    download: Download,
    phone: Smartphone,
    qr: QrCode,
    truck: Truck,
    card: CreditCard,
};

const projectIcons: Record<ProjectIcon, LucideIcon> = {
    bookmark: Bookmark,
    wallet: WalletCards,
    "folder-up": FolderUp,
    scissors: Scissors,
};

/** Coloured tile with the project's initials or icon - no logos or screenshots */
export function ProjectMark({ project, className }: { project: Project; className?: string }) {
    const Icon = project.icon ? projectIcons[project.icon] : null;

    return (
        <span
            className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-xl text-[15px] font-bold text-white",
                className
            )}
            style={{ backgroundColor: project.color }}
            aria-hidden
        >
            {Icon ? <Icon className="size-5" strokeWidth={1.8} /> : project.mark}
        </span>
    );
}

export function LinkedInIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
        </svg>
    );
}

export function GitHubIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 19c-4 1.5-4-2-6-2.5" />
            <path d="M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
        </svg>
    );
}

export function XIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 4l11.7 16H20L8.3 4zM20 4l-6.6 7.3M4 20l6.6-7.3" />
        </svg>
    );
}

export const socialLinks = [
    { href: "https://www.linkedin.com/in/nicojuhari/", label: "LinkedIn", Icon: LinkedInIcon },
    { href: "https://github.com/nicojuhari", label: "GitHub", Icon: GitHubIcon },
    { href: "https://twitter.com/nicojuhari", label: "X", Icon: XIcon },
];
