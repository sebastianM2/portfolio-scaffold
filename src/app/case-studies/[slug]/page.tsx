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
    <p className="font-body font-normal text-[#858585] text-[14.4px] sm:text-[21.6px] tracking-[0.5px] sm:tracking-[1.1px]">
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
        <h2 className="font-body font-normal text-black text-[27px] sm:text-[43.2px] tracking-[4.3px] sm:tracking-[8.6px]">
          {block.text}
        </h2>
      );

    case "subheading":
      return (
        <h3 className="font-body font-light text-black text-[18px] sm:text-[32.4px] tracking-[2.9px] sm:tracking-[6.5px]">
          {block.text}
        </h3>
      );

    case "paragraph":
      return (
        <p className="font-body font-normal text-black text-[14.4px] sm:text-[21.6px] text-center tracking-[0.5px] sm:tracking-[1.1px]">
          {block.text}
        </p>
      );

    case "quote":
      return (
        <p className="font-body italic text-black text-[18px] sm:text-[28.8px] text-center tracking-[2.7px] sm:tracking-[5.8px] break-words">
          &ldquo;{block.text}&rdquo;
          {block.attribution && (
            <span className="block font-normal not-italic text-[14.4px] sm:text-[21.6px] tracking-[0.5px] sm:tracking-[1.1px] mt-[6.5px]">
              {block.attribution}
            </span>
          )}
        </p>
      );

    case "imageRow":
      return (
        <div className="flex flex-col items-center gap-[32.4px] w-full">
          <div className="flex flex-col sm:flex-row gap-[18px] items-center justify-center w-full">
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
            <p className="font-body font-normal text-black text-[14.4px] sm:text-[21.6px] text-center tracking-[0.5px] sm:tracking-[1.1px]">
              {block.caption}
            </p>
          )}
        </div>
      );

    case "imageText": {
      const imageEl = (
        <div className="relative w-full sm:w-[561.6px] h-[216px] sm:h-[346.5px] shrink-0">
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
        <p className="flex-1 font-body font-normal text-black text-[14.4px] sm:text-[21.6px] tracking-[0.5px] sm:tracking-[1.1px] whitespace-pre-line">
          {block.text}
        </p>
      );
      return (
        <div className="flex flex-col sm:flex-row gap-[18px] sm:gap-[45px] items-center justify-center w-full">
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
        <div className="flex flex-col items-center gap-[32.4px] w-full">
          <div className="relative w-full h-[288px] sm:h-[765px]">
            <Image
              src={block.image.src}
              alt={block.image.alt}
              fill
              className={block.fit === "contain" ? "object-contain" : "object-cover"}
              sizes="100vw"
            />
          </div>
          {block.caption && (
            <p className="font-body font-normal text-black text-[14.4px] sm:text-[21.6px] text-center tracking-[0.5px] sm:tracking-[1.1px]">
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
      <header className="flex flex-col sm:flex-row items-center sm:justify-between gap-[14.4px] px-[21.6px] sm:px-[28.8px] py-[9px] max-w-[1296px] mx-auto">
        <Link href="/" className="flex items-center h-[57.6px] sm:h-[72px] shrink-0">
          <div className="relative shrink-0 size-[57.6px] sm:size-[72px]">
            <Image src="/images/logo.png" alt={nav.logoText} fill className="object-contain" priority />
          </div>
        </Link>
        
      </header>

      <main id="main-content" className="px-[21.6px] sm:px-[28.8px] max-w-[1296px] mx-auto flex flex-col gap-[43.2px] py-[32.4px]">
        <h1 className="font-body font-black text-black text-[32.4px] sm:text-[57.6px]">
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

        <section className="flex flex-col items-center gap-[32.4px] w-full" aria-labelledby="brief-heading">
          <h2
            id="brief-heading"
            className="font-body font-normal text-black text-[27px] sm:text-[43.2px] tracking-[4.3px] sm:tracking-[8.6px] w-full"
          >
            Project Brief
          </h2>
          <p className="font-body font-normal text-black text-[14.4px] sm:text-[21.6px] text-center tracking-[0.5px] sm:tracking-[1.1px] w-full">
            {caseStudy.brief}
          </p>
        </section>

        {caseStudy.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-[14.4px] w-full p-[9px]">
          <OtherProjectsLinks text={caseStudy.otherProjects} />
          {/*
            Case study PDF download: static, pre-made file in /public,
            same pattern as the homepage resume download. No server
            rendering involved — this is just a plain file link.
          */}
          <a
            href={`/case-study-pdfs/${caseStudy.slug}.pdf`}
            download={`${caseStudy.slug}.pdf`}
            className="inline-block bg-[#653400] px-[9px] py-[6.5px] rounded-[1px]"
          >
            <span className="font-body font-normal text-[21.6px] text-white tracking-[1.1px]">
              {caseStudy.downloadPdfLabel}
            </span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-[14.4px] w-full py-[14.4px]">
          <p className="font-body font-normal text-black text-[21.6px] tracking-[1.1px]">{caseStudy.byline}</p>
          <div className="relative w-[57.6px] h-[57.6px] shrink-0">
            <Image src="/images/logo.png" alt="" fill className="object-contain" aria-hidden="true" />
          </div>
        </div>
      </main>
    </>
  );
}
