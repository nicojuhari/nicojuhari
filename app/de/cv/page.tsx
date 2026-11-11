import { CvPage, cvMetadata } from "@/app/cv/_components/cv-page";

export const metadata = cvMetadata("de");

export default function Page() {
    return <CvPage lang="de" />;
}
