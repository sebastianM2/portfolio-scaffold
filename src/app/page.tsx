import Image from "next/image";
import Link from "next/link";
import { hero, nav, projects, education, experience } from "@/content/site";

export default function Home() {
  return (
    <>
      <header className="flex flex-col sm:flex-row items-center sm:justify-between gap-[14.4px] px-[21.6px] py-[9px] max-w-[1238.4px] mx-auto">
        <div className="flex items-center gap-[9px]">
          {/* Wax seal logo — original source file (not PDF-extracted) */}
          <div className="relative shrink-0 size-[57.6px] sm:size-[72px]">
            <Image
              src="/images/logo.png"
              alt="Sebastian Alessio Peyton logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="font-body font-normal text-[#333] text-[21.6px] sm:text-[43.2px] tracking-[4.3px] sm:tracking-[8.6px] underline decoration-[11%] break-words">
            {nav.logoText}
          </p>
        </div>
        {/* Simple circle outline — reproduced as inline SVG rather than a raster asset */}
        <svg
          className="shrink-0 size-[57.6px] sm:size-[73.8px]"
          viewBox="0 0 82 82"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="41" cy="41" r="40" stroke="black" strokeWidth="1" />
        </svg>
      </header>

      <main id="main-content" className="px-[21.6px] max-w-[1252.8px] mx-auto flex flex-col gap-[43.2px] py-[32.4px]">
        {/* Hero portrait — original B&W source file (not PDF-extracted), cropped/optimized for web */}
        <div className="relative w-full aspect-[1392/750]">
          <Image
            src="/images/hero-portrait.jpg"
            alt="Portrait of Sebastian Alessio Peyton"
            fill
            className="object-cover object-bottom"
            priority
            sizes="(max-width: 1392px) 100vw, 1392px"
          />
        </div>

        <p className="font-body italic text-black text-[18px] sm:text-[28.8px] text-center tracking-[2.7px] sm:tracking-[5.8px] break-words">
          {hero.tagline}
        </p>

        <hr className="w-full border-t border-black" aria-hidden="true" />

        <section aria-labelledby="projects-heading">
          <h2
            id="projects-heading"
            className="font-body font-normal text-black text-[27px] sm:text-[43.2px] tracking-[4.3px] sm:tracking-[8.6px] mb-[43.2px]"
          >
            Projects
          </h2>
          <ul className="flex flex-col gap-[43.2px]">
            {projects.map((project) => (
              <li key={project.slug} className="w-full">
                <Link
                  href={`/case-studies/${project.slug}`}
                  className="flex flex-col sm:flex-row gap-[14.4px] sm:gap-[18px] sm:items-center w-full"
                >
                  <div className="flex flex-1 gap-[14.4px] sm:gap-[18px] items-start min-w-0 sm:min-w-[360px]">
                    <p className="font-heading italic font-bold text-[#653400] text-[32.4px] sm:text-[57.6px] tracking-[1.4px] sm:tracking-[2.9px] whitespace-nowrap shrink-0">
                      {project.number}
                    </p>
                    <p className="font-body font-normal text-[#333] text-[21.6px] sm:text-[43.2px] tracking-[4.3px] sm:tracking-[8.6px] sm:w-[291.6px]">
                      {project.title}
                    </p>
                  </div>
                  <p className="flex-1 font-body font-light text-[#333] text-[16.2px] sm:text-[32.4px] tracking-[2.9px] sm:tracking-[6.5px]">
                    {project.meta}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <hr className="w-full border-t border-black" aria-hidden="true" />

        <section aria-labelledby="education-heading">
          <h2
            id="education-heading"
            className="font-body font-normal text-black text-[27px] sm:text-[43.2px] tracking-[4.3px] sm:tracking-[8.6px] mb-[21.6px]"
          >
            Education
          </h2>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-[18px] text-[#333]">
            {education.map((entry) => (
              <div key={entry.school} className="flex flex-col gap-[21.6px] px-[9px] py-[13.5px] sm:w-[544.5px]">
                <p className="font-body font-light text-[21.6px] sm:text-[32.4px] tracking-[2.9px] sm:tracking-[6.5px]">
                  {entry.school}
                </p>
                <p className="font-body font-normal text-[14.4px] sm:text-[21.6px] tracking-[0.5px] sm:tracking-[1.1px] sm:w-[422.1px]">
                  {entry.degree}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="experience-heading">
          <h2
            id="experience-heading"
            className="font-body font-normal text-black text-[27px] sm:text-[43.2px] tracking-[4.3px] sm:tracking-[8.6px] mb-[21.6px]"
          >
            Experience
          </h2>
          <div className="flex flex-col gap-[21.6px] text-black">
            {experience.map((entry) => (
              <div key={entry.company} className="flex flex-col gap-[21.6px]">
                <p className="font-body font-light text-[21.6px] sm:text-[32.4px] tracking-[2.9px] sm:tracking-[6.5px]">
                  {entry.company}
                </p>
                <p className="font-body font-normal text-[14.4px] sm:text-[21.6px] tracking-[0.5px] sm:tracking-[1.1px]">
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
            className="inline-block bg-[#653400] px-[9px] py-[6.5px] rounded-[1px]"
          >
            <span className="font-body font-normal text-[21.6px] text-white tracking-[1.1px]">
              {hero.resumeButtonLabel}
            </span>
          </a>
        </div>
      </main>
    </>
  );
}
