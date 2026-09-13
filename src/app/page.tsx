import Image from "next/image";
import Link from "next/link";
import { hero, nav, projects, education, experience } from "@/content/site";

export default function Home() {
  return (
    <>
      <header className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 px-6 py-2.5 max-w-[1376px] mx-auto">
        <div className="flex items-center gap-2.5">
          {/* Wax seal logo — original source file (not PDF-extracted) */}
          <div className="relative shrink-0 size-16 sm:size-20">
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
        {/* Simple circle outline — reproduced as inline SVG rather than a raster asset */}
        <svg
          className="shrink-0 size-16 sm:size-[82px]"
          viewBox="0 0 82 82"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="41" cy="41" r="40" stroke="black" strokeWidth="1" />
        </svg>
      </header>

      <main id="main-content" className="px-6 max-w-[1392px] mx-auto flex flex-col gap-12 py-10">
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

        <p className="font-body italic text-black text-xl sm:text-[32px] text-center tracking-[3px] sm:tracking-[6.4px] break-words">
          {hero.tagline}
        </p>

        <hr className="w-full border-t border-black" aria-hidden="true" />

        <section aria-labelledby="projects-heading">
          <h2
            id="projects-heading"
            className="font-body font-normal text-black text-3xl sm:text-[48px] tracking-[4.8px] sm:tracking-[9.6px] mb-12"
          >
            Projects
          </h2>
          <ul className="flex flex-col gap-12">
            {projects.map((project) => (
              <li key={project.slug} className="w-full">
                <Link
                  href={`/case-studies/${project.slug}`}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-8 sm:items-center w-full"
                >
                  <div className="flex flex-1 gap-4 sm:gap-8 items-start min-w-0 sm:min-w-[400px]">
                    <p className="font-heading italic font-bold text-[#653400] text-4xl sm:text-[64px] tracking-[1.6px] sm:tracking-[3.2px] whitespace-nowrap shrink-0">
                      {project.number}
                    </p>
                    <p className="font-body font-normal text-[#333] text-2xl sm:text-[48px] tracking-[4.8px] sm:tracking-[9.6px] sm:w-[324px]">
                      {project.title}
                    </p>
                  </div>
                  <p className="flex-1 font-body font-light text-[#333] text-lg sm:text-[36px] tracking-[3.6px] sm:tracking-[7.2px]">
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
            className="font-body font-normal text-black text-3xl sm:text-[48px] tracking-[4.8px] sm:tracking-[9.6px] mb-6"
          >
            Education
          </h2>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-8 text-[#333]">
            {education.map((entry) => (
              <div key={entry.school} className="flex flex-col gap-6 px-2.5 py-[15px] sm:w-[605px]">
                <p className="font-body font-light text-2xl sm:text-[36px] tracking-[3.6px] sm:tracking-[7.2px]">
                  {entry.school}
                </p>
                <p className="font-body font-normal text-base sm:text-2xl tracking-[0.6px] sm:tracking-[1.2px] sm:w-[469px]">
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
                <p className="font-body font-light text-2xl sm:text-[36px] tracking-[3.6px] sm:tracking-[7.2px]">
                  {entry.company}
                </p>
                <p className="font-body font-normal text-base sm:text-2xl tracking-[0.6px] sm:tracking-[1.2px]">
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
