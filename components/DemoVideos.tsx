import Reveal from "@/components/Reveal";
import HomeDemoVideo from "@/components/HomeDemoVideo";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";

const featured = {
  src: "/demos/video1.html",
  title: "The Full Overview",
  description:
    "A missed call becomes a booked job in under 60 seconds. Watch the complete speed-to-lead sequence.",
};

const secondary = [
  {
    src: "/demos/video2.html",
    title: "Capture Everywhere",
    description:
      "Four lead channels, one system: missed calls, web forms, Google Business, and inbound AI calls all handled automatically.",
  },
  {
    src: "/demos/video3.html",
    title: "Keep The Deal Alive",
    description:
      "Quoted jobs that go quiet get automatically followed up until they book or opt out.",
  },
];

export default function DemoVideos() {
  return (
    <>
      <JobSheetSection
        code="DM-02"
        label="Watch first"
        title={featured.title}
        description={featured.description}
        tone="ink"
      >
        <Reveal>
          <div className={`${jobsheet.ticket} !border-white/15 overflow-hidden p-0`}>
            <HomeDemoVideo src={featured.src} title={featured.title} />
          </div>
        </Reveal>
      </JobSheetSection>

      <JobSheetSection
        code="DM-03"
        label="Two more, two minutes"
        title="See it handle the rest of the funnel."
        description="Every channel a lead can arrive through, and what keeps a quiet quote from dying."
        tone="ink"
      >
        <div className="grid gap-8 sm:grid-cols-2">
          {secondary.map((v, i) => (
            <Reveal key={v.src} delay={i * 100}>
              <div className="flex flex-col">
                <div className="mb-4">
                  <h3 className={`${jobsheet.display} mb-1.5 text-xl text-[#f3ede1] sm:text-2xl`}>
                    {v.title}
                  </h3>
                  <p className="text-sm leading-7 text-[rgba(243,237,225,0.62)]">{v.description}</p>
                </div>
                <div className={`${jobsheet.ticket} !border-white/15 overflow-hidden p-0`}>
                  <HomeDemoVideo src={v.src} title={v.title} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </JobSheetSection>
    </>
  );
}
