import { ResumeViewer } from "@/components/ResumeViewer";

export default function ResumeCnPage() {
  return (
    <ResumeViewer
      title="简历"
      backLabel="← 返回"
      pages={[
        {
          src: "/images/resume/cn-1.png",
          width: 1530,
          height: 1980,
          alt: "陈想简历 第 1 页",
        },
        {
          src: "/images/resume/cn-2.png",
          width: 1530,
          height: 1980,
          alt: "陈想简历 第 2 页",
        },
      ]}
    />
  );
}
