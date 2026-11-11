import { CvPage, cvMetadata } from "./_components/cv-page";

export const metadata = cvMetadata("en");

export default function Page() {
    return <CvPage lang="en" />;
}
