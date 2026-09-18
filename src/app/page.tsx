import Image from "next/image";
import Link from "next/link";
import { hero, nav, about, projects, education, experience, caseStudies } from "@/content/site";

export default function Home() {
  return (
    <>
      <header className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 px-6 py-2.5 max-w-[1376px] mx-auto">
        <div className="flex items-center gap-2.5">
          {/* Wax seal logo — original source file (not PDF-extracted) */}
          <div className="relative shrink-0 size-16 sm:size-[100px]">
            <Image
              src="/images/logo.png"
              alt="Sebastian Alessio Peyton logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="font-body font-normal text-[#333] text-2xl sm:text-[48px] tracking-[4.8px] sm:tracking-[9.6px] underline decoration-[11%] break-words">
            {nav.logoText}
          </p>
        </div>
      </header>

      <main id="main-content" className="px-6 max-w-[1376px] mx-auto flex flex-col gap-12 py-8">
        {/* About section — replaces the old full-width hero portrait */}
        <section
          aria-label="About"
          className="flex flex-col sm:flex-row gap-8 sm:gap-[50px] items-center w-full"
        >
          <div className="flex-1 font-body font-normal text-black text-base sm:text-2xl tracking-[1px] sm:tracking-[1.2px] whitespace-pre-wrap">
            <p className="mb-0">{about.aboutLabel}</p>
            <p className="mb-0">{about.aboutText}</p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">{about.goalLabel}</p>
            <p>{about.goalText}</p>
          </div>
          <div className="relative w-full sm:w-[624px] h-[240px] sm:h-[385px] shrink-0">
            <Image
              src={about.headshot.src}
              alt={about.headshot.alt}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 640px) 100vw, 624px"
            />
          </div>
        </section>

        <p className="font-body italic text-black text-base sm:text-2xl text-center tracking-[4px] sm:tracking-[4.8px] break-words">
          {hero.tagline}
        </p>

        <hr className="w-full border-t border-black" aria-hidden="true" />

        <section aria-labelledby="projects-heading">
          <h2
            id="projects-heading"
            className="font-body font-normal text-black text-3xl sm:text-[48px] tracking-[4.8px] sm:tracking-[9.6px] mb-8"
          >
            Projects
          </h2>
          <ul className="flex flex-col gap-6">
            {projects.map((project) => {
              const caseStudy = caseStudies.find((c) => c.slug === project.slug);
              return (
                <li key={project.slug} className="w-full">
                  <Link
                    href={`/case-studies/${project.slug}`}
                    className="flex flex-col sm:flex-row gap-[18px] sm:gap-[35px] items-start sm:items-center w-full bg-white border-2 border-[rgba(101,52,0,0.25)] rounded-[18px] p-2.5 transition-transform duration-200 ease-out hover:scale-[1.015] hover:shadow-md"
                  >
                    {caseStudy && (
                      <div className="relative w-full sm:w-[504px] h-[220px] sm:h-[378px] shrink-0 rounded-[10px] overflow-hidden">
                        <Image
                          src={caseStudy.heroImage.src}
                          alt={caseStudy.heroImage.alt}
                          fill
                          className="object-cover rounded-[10px]"
                          sizes="(max-width: 640px) 100vw, 504px"
                        />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col gap-4 sm:gap-8 items-start justify-center sm:self-stretch min-w-0 w-full px-2 sm:px-0">
                      <div className="flex gap-4 sm:gap-8 items-center min-w-0 sm:min-w-[400px] w-full">
                        <p className="font-body font-normal text-[#653400] text-2xl sm:text-[48px] tracking-[4.8px] sm:tracking-[9.6px] whitespace-nowrap shrink-0">
                          {project.number}
                        </p>
                        <p className="font-body font-light text-[#333] text-xl sm:text-[32px] tracking-[3.2px] sm:tracking-[6.4px] sm:w-[324px]">
                          {project.title}
                        </p>
                      </div>
                      <p className="font-body font-light text-[#333] text-base sm:text-[32px] tracking-[2px] sm:tracking-[6.4px] w-full">
                        {project.meta}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <hr className="w-full border-t border-black" aria-hidden="true" />

        <section aria-labelledby="education-heading">
          <h2
            id="education-heading"
            className="font-body font-normal text-black text-3xl sm:text-[48px] tracking-[4.8px] sm:tracking-[9.6px] mb-6"
          >
            Education
          </h2>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-[18px] text-[#333]">
            {education.map((entry) => (
              <div key={entry.school} className="flex flex-col gap-6 px-2.5 py-[15px] sm:w-[605px]">
                <p className="font-body font-light text-xl sm:text-[32px] tracking-[3.2px] sm:tracking-[6.4px]">
                  {entry.school}
                </p>
                <p className="font-body font-normal text-base sm:text-2xl tracking-[1px] sm:tracking-[1.2px] sm:w-[469px]">
                  {entry.degree}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="experience-heading">
          <h2
            id="experience-heading"
            className="font-body font-normal text-black text-3xl sm:text-[48px] tracking-[4.8px] sm:tracking-[9.6px] mb-6"
          >
            Experience
          </h2>
          <div className="flex flex-col gap-6 text-black">
            {experience.map((entry) => (
              <div key={entry.company} className="flex flex-col gap-6">
                <p className="font-body font-light text-xl sm:text-[32px] tracking-[3.2px] sm:tracking-[6.4px]">
                  {entry.company}
                </p>
                <p className="font-body font-normal text-base sm:text-2xl tracking-[1px] sm:tracking-[1.2px]">
                  {entry.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-end w-full">
          {/*
            Resume download: static file in /public — no JS/server needed.
            Replace public/resume.pdf.txt with the real PDF named resume.pdf.
          */}
          <a
            href="/resume.pdf"
            download
            className="inline-block bg-[#653400] px-2.5 py-2 rounded-[1px]"
          >
            <span className="font-body font-normal text-2xl text-white tracking-[1.2px]">
              {hero.resumeButtonLabel}
            </span>
          </a>
        </div>
      </main>
    </>
  );
}
