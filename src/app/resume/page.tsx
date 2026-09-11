import { ResumeViewer } from "@/components/ResumeViewer";

export default function ResumeEnPage() {
  return (
    <ResumeViewer
      title="Resume"
      backLabel="← Back"
      pages={[
        {
          src: "/images/resume/en-1.png",
          width: 1489,
          height: 2105,
          alt: "Xiang Chen resume",
        },
      ]}
    />
  );
}
