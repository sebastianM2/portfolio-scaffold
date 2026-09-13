import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer, Document, Page, Text, View, Image as PdfImage, StyleSheet } from "@react-pdf/renderer";
// import { Font } from "@react-pdf/renderer"; // uncomment when registering a custom font below
import { caseStudies } from "@/content/site";
import type { CaseStudyBlock } from "@/content/site";

// Register the same typeface used on the site so the PDF matches
// the Figma mockup's fonts. Point src at a real .ttf/.otf file you
// place under /public/fonts once you export it from Figma/Google Fonts.
// Font.register({
//   family: "YourHeadingFont",
//   src: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/fonts/YourHeadingFont-Regular.ttf`,
// });

// Case studies with many images (e.g. Heritage Furniture's ~40 photos)
// can take a little longer to render as a PDF since every image is
// fetched during generation. 30s covers this comfortably on Vercel.
export const maxDuration = 30;

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 11,
    lineHeight: 1.5,
  },
  title: {
    fontSize: 22,
    marginBottom: 4,
    fontWeight: 700,
  },
  summary: {
    fontSize: 12,
    color: "#555555",
    marginBottom: 12,
  },
  heroImage: {
    marginTop: 4,
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: 700,
    marginTop: 16,
    marginBottom: 6,
  },
  subHeading: {
    fontSize: 12,
    fontWeight: 700,
    marginTop: 10,
    marginBottom: 4,
    color: "#653400",
  },
  body: {
    fontSize: 11,
    marginBottom: 8,
  },
  quote: {
    fontSize: 11,
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 10,
    color: "#333333",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    marginVertical: 12,
  },
  caption: {
    fontSize: 9,
    textAlign: "center",
    color: "#555555",
    marginTop: 4,
    marginBottom: 8,
  },
  imageRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 6,
  },
  imageRowItem: {
    flex: 1,
  },
  fullImage: {
    marginBottom: 6,
    maxHeight: 320,
    objectFit: "contain",
  },
  imageTextRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  imageTextImage: {
    width: 180,
  },
  imageTextText: {
    flex: 1,
    fontSize: 11,
  },
});

// Renders a PDF that mirrors the live case study page, images included.
// Images are fetched by @react-pdf/renderer directly from their live
// site URLs during generation (it supports remote http(s) sources
// natively), so this route just needs to pass absolute URLs — no
// manual downloading or base64 encoding required. Because every image
// is embedded at its web-optimized (not further compressed) size, the
// resulting PDF's size roughly tracks the total weight of that case
// study's images — a few hundred KB for lighter case studies, up to a
// few MB for image-heavy ones like Heritage Furniture.
function renderBlock(block: CaseStudyBlock, i: number, origin: string) {
  const abs = (src: string) => `${origin}${src}`;

  switch (block.type) {
    case "divider":
      return <View key={i} style={styles.divider} />;
    case "heading":
      return (
        <Text key={i} style={styles.sectionHeading}>
          {block.text}
        </Text>
      );
    case "subheading":
      return (
        <Text key={i} style={styles.subHeading}>
          {block.text}
        </Text>
      );
    case "paragraph":
      return (
        <Text key={i} style={styles.body}>
          {block.text}
        </Text>
      );
    case "quote":
      return (
        <Text key={i} style={styles.quote}>
          &ldquo;{block.text}&rdquo;
          {block.attribution ? `  —  ${block.attribution}` : ""}
        </Text>
      );
    case "imageRow":
      return (
        <View key={i} wrap={false}>
          <View style={styles.imageRow}>
            {block.images.map((img) => (
              <PdfImage key={img.src} src={abs(img.src)} style={styles.imageRowItem} />
            ))}
          </View>
          {block.caption && <Text style={styles.caption}>{block.caption}</Text>}
        </View>
      );
    case "imageText":
      return (
        <View key={i} style={styles.imageTextRow} wrap={false}>
          {block.imageSide === "left" && (
            <PdfImage src={abs(block.image.src)} style={styles.imageTextImage} />
          )}
          <Text style={styles.imageTextText}>{block.text}</Text>
          {block.imageSide === "right" && (
            <PdfImage src={abs(block.image.src)} style={styles.imageTextImage} />
          )}
        </View>
      );
    case "fullImage":
      return (
        <View key={i} wrap={false}>
          <PdfImage src={abs(block.image.src)} style={styles.fullImage} />
          {block.caption && <Text style={styles.caption}>{block.caption}</Text>}
        </View>
      );
    default:
      return null;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((c) => c.slug === slug);

  if (!caseStudy) {
    return NextResponse.json({ error: "Case study not found" }, { status: 404 });
  }

  const origin = req.nextUrl.origin;

  const doc = (
    <Document title={caseStudy.title} producer="Portfolio Site">
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.title}>{caseStudy.title}</Text>
        <Text style={styles.summary}>{caseStudy.summary}</Text>
        <PdfImage src={`${origin}${caseStudy.heroImage.src}`} style={styles.heroImage} />
        <Text style={styles.sectionHeading}>Project Brief</Text>
        <Text style={styles.body}>{caseStudy.brief}</Text>
        {caseStudy.blocks.map((block, i) => renderBlock(block, i, origin))}
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(doc);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${slug}.pdf"`,
      "Cache-Control": "public, max-age=3600, immutable",
    },
  });
}
