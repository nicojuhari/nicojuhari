import { CvPrintPage, printMetadata } from "@/app/cv/_components/cv-page";

export const metadata = printMetadata;

export default function Page() {
    return <CvPrintPage lang="de" />;
}
