import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { caseStudies, nav } from "@/content/site";
import type { CaseStudyBlock } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find((c) => c.slug === slug);
  if (!caseStudy) return {};
  return {
    title: caseStudy.title,
    description: caseStudy.brief,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.brief,
      images: [caseStudy.heroImage.src],
    },
  };
}

// Renders the "otherProjects" byline (e.g. "Piccola Libreria - Heritage
// Furniture - Knows Eyewear") as individually clickable links to each
// matching case study, preserving the original " - " separators as
// plain text so the visual format matches the Figma mockup exactly.
function OtherProjectsLinks({ text }: { text: string }) {
  const names = text.split(" - ");
  return (
    <p className="font-body font-normal text-[#858585] text-base sm:text-2xl tracking-[0.6px] sm:tracking-[1.2px]">
      {names.map((name, i) => {
        const trimmed = name.trim();
        const match = caseStudies.find((c) => c.title === trimmed);
        return (
          <span key={trimmed}>
            {match ? (
              <Link
                href={`/case-studies/${match.slug}`}
                className="hover:text-black hover:underline underline-offset-4 transition-colors"
              >
                {name}
              </Link>
            ) : (
              name
            )}
            {i < names.length - 1 && " - "}
          </span>
        );
      })}
    </p>
  );
}

function Block({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "divider":
      return <hr className="w-full border-t border-black" aria-hidden="true" />;

    case "heading":
      return (
        <h2 className="font-body font-normal text-black text-3xl sm:text-[48px] tracking-[4.8px] sm:tracking-[9.6px]">
          {block.text}
        </h2>
      );

    case "subheading":
      return (
        <h3 className="font-body font-light text-black text-xl sm:text-[36px] tracking-[3.6px] sm:tracking-[7.2px]">
          {block.text}
        </h3>
      );

    case "paragraph":
      return (
        <p className="font-body font-normal text-black text-base sm:text-2xl text-center tracking-[0.6px] sm:tracking-[1.2px]">
          {block.text}
        </p>
      );

    case "quote":
      return (
        <p className="font-body italic text-black text-xl sm:text-[32px] text-center tracking-[3px] sm:tracking-[6.4px] break-words">
          &ldquo;{block.text}&rdquo;
          {block.attribution && (
            <span className="block font-normal not-italic text-base sm:text-2xl tracking-[0.6px] sm:tracking-[1.2px] mt-2">
              {block.attribution}
            </span>
          )}
        </p>
      );

    case "imageRow":
      return (
        <div className="flex flex-col items-center gap-9 w-full">
          <div className="flex flex-col sm:flex-row gap-8 items-center justify-center w-full">
            {block.images.map((img) => (
              <div key={img.src} className="relative w-full sm:flex-1 aspect-square">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={block.fit === "contain" ? "object-contain" : "object-cover"}
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
          {block.caption && (
            <p className="font-body font-normal text-black text-base sm:text-2xl text-center tracking-[0.6px] sm:tracking-[1.2px]">
              {block.caption}
            </p>
          )}
        </div>
      );

    case "imageText": {
      const imageEl = (
        <div className="relative w-full sm:w-[624px] h-[240px] sm:h-[385px] shrink-0">
          <Image
            src={block.image.src}
            alt={block.image.alt}
            fill
            className={block.fit === "contain" ? "object-contain" : "object-cover"}
            sizes="(max-width: 640px) 100vw, 624px"
          />
        </div>
      );
      const textEl = (
        <p className="flex-1 font-body font-normal text-black text-base sm:text-2xl tracking-[0.6px] sm:tracking-[1.2px] whitespace-pre-line">
          {block.text}
        </p>
      );
      return (
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-[50px] items-center justify-center w-full">
          {block.imageSide === "left" ? (
            <>
              {imageEl}
              {textEl}
            </>
          ) : (
            <>
              {textEl}
              {imageEl}
            </>
          )}
        </div>
      );
    }

    case "fullImage":
      return (
        <div className="flex flex-col items-center gap-9 w-full">
          <div className="relative w-full h-[320px] sm:h-[850px]">
            <Image
              src={block.image.src}
              alt={block.image.alt}
              fill
              className={block.fit === "contain" ? "object-contain" : "object-cover"}
              sizes="100vw"
            />
          </div>
          {block.caption && (
            <p className="font-body font-normal text-black text-base sm:text-2xl text-center tracking-[0.6px] sm:tracking-[1.2px]">
              {block.caption}
            </p>
          )}
        </div>
      );
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((c) => c.slug === slug);
  if (!caseStudy) notFound();

  return (
    <>
      <header className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 px-6 sm:px-8 py-2.5 max-w-[1440px] mx-auto">
        <Link href="/" className="flex items-center h-16 sm:h-20 shrink-0">
          <div className="relative shrink-0 size-16 sm:size-20">
            <Image src="/images/logo.png" alt={nav.logoText} fill className="object-contain" priority />
          </div>
        </Link>
        <svg className="shrink-0 size-16 sm:size-[82px]" viewBox="0 0 82 82" fill="none" aria-hidden="true">
          <circle cx="41" cy="41" r="40" stroke="black" strokeWidth="1" />
        </svg>
      </header>

      <main id="main-content" className="px-6 sm:px-8 max-w-[1440px] mx-auto flex flex-col gap-12 py-10">
        <h1 className="font-heading italic font-bold text-black text-4xl sm:text-[64px] tracking-[1.6px] sm:tracking-[3.2px]">
          {caseStudy.title}
        </h1>

        <div className="relative w-full aspect-[1376/850]">
          <Image
            src={caseStudy.heroImage.src}
            alt={caseStudy.heroImage.alt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1376px) 100vw, 1376px"
          />
        </div>

        <section className="flex flex-col items-center gap-9 w-full" aria-labelledby="brief-heading">
          <h2
            id="brief-heading"
            className="font-body font-normal text-black text-3xl sm:text-[48px] tracking-[4.8px] sm:tracking-[9.6px] w-full"
          >
            Project Brief
          </h2>
          <p className="font-body font-normal text-black text-base sm:text-2xl text-center tracking-[0.6px] sm:tracking-[1.2px] w-full">
            {caseStudy.brief}
          </p>
        </section>

        {caseStudy.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full p-2.5">
          <OtherProjectsLinks text={caseStudy.otherProjects} />
          {/*
            Case study PDF download: hits the API route, which renders
            a fresh, size-optimized PDF of this specific case study on demand.
          */}
          <a
            href={`/api/case-study-pdf/${caseStudy.slug}`}
            download={`${caseStudy.slug}.pdf`}
            className="inline-block bg-[#653400] px-2.5 py-2 rounded-[1px]"
          >
            <span className="font-body font-normal text-2xl text-white tracking-[1.2px]">
              {caseStudy.downloadPdfLabel}
            </span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full py-4">
          <p className="font-body font-normal text-black text-2xl tracking-[1.2px]">{caseStudy.byline}</p>
          <div className="relative w-16 h-16 shrink-0">
            <Image src="/images/logo.png" alt="" fill className="object-contain" aria-hidden="true" />
          </div>
        </div>
      </main>
    </>
  );
}
