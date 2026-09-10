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

const homeFeatured = {
  src: "/demos/video10.html",
  title: "A Morning That Runs Itself",
  description:
    "Not every automation is about calls. Some of it runs on a schedule, the rest waits for one tap on the way through the kitchen.",
};

const homeSecondary = [
  {
    src: "/demos/video8.html",
    title: "Set For The Night",
    description:
      "A tag by the bed. Tap it on the way in and the downstairs lights, the locks, the thermostat and the phone all settle for the night.",
  },
  {
    src: "/demos/video9.html",
    title: "Locks Up Behind You",
    description:
      "The phone crosses the driveway. Lights off, heat to eco, garage checked, doors locked. No checklist, no going back to look.",
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
            <Reveal key={v.src} delay={i * 100} className="h-full">
              {/* flex-1 on the copy keeps the videos on one line when the
                  descriptions run to different numbers of lines */}
              <div className="flex h-full flex-col">
                <div className="mb-4 flex-1">
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

      <JobSheetSection
        code="DM-04"
        label="Now the home side"
        title={homeFeatured.title}
        description={homeFeatured.description}
        tone="ink"
      >
        <Reveal>
          <div className={`${jobsheet.ticket} !border-white/15 overflow-hidden p-0`}>
            <HomeDemoVideo src={homeFeatured.src} title={homeFeatured.title} />
          </div>
        </Reveal>
      </JobSheetSection>

      <JobSheetSection
        code="DM-05"
        label="Two more from the house"
        title="The ends of the day, handled."
        description="One tap on the way to bed, and nothing left running when you pull out of the driveway."
        tone="ink"
      >
        <div className="grid gap-8 sm:grid-cols-2">
          {homeSecondary.map((v, i) => (
            <Reveal key={v.src} delay={i * 100} className="h-full">
              {/* flex-1 on the copy keeps the videos on one line when the
                  descriptions run to different numbers of lines */}
              <div className="flex h-full flex-col">
                <div className="mb-4 flex-1">
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
