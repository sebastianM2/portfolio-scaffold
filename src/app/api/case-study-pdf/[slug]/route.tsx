import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
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
    marginBottom: 24,
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
  },
});

// Renders a text-only, vector PDF — no rasterized screenshots — which keeps
// file size minimal (kilobytes, not megabytes) regardless of how many
// images the web page has. Images are intentionally omitted from the PDF
// to keep it small and fast to generate; the case study images live on
// the live page. If you want a couple of key images included, add an
// <Image> node here with a pre-compressed (~1200px wide, JPEG q=70-80)
// version — that is the single biggest lever on output size.
function renderBlock(block: CaseStudyBlock, i: number) {
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
      return block.caption ? (
        <Text key={i} style={styles.caption}>
          {block.caption}
        </Text>
      ) : null;
    case "imageText":
      return (
        <Text key={i} style={styles.body}>
          {block.text}
        </Text>
      );
    case "fullImage":
      return block.caption ? (
        <Text key={i} style={styles.caption}>
          {block.caption}
        </Text>
      ) : null;
    default:
      return null;
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((c) => c.slug === slug);

  if (!caseStudy) {
    return NextResponse.json({ error: "Case study not found" }, { status: 404 });
  }

  const doc = (
    <Document title={caseStudy.title} producer="Portfolio Site">
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.title}>{caseStudy.title}</Text>
        <Text style={styles.summary}>{caseStudy.summary}</Text>
        <Text style={styles.sectionHeading}>Project Brief</Text>
        <Text style={styles.body}>{caseStudy.brief}</Text>
        {caseStudy.blocks.map(renderBlock)}
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
