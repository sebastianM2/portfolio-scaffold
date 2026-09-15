import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer, Document, Page, Text, View, Image as PdfImage, StyleSheet, Font } from "@react-pdf/renderer";
import { caseStudies } from "@/content/site";
import type { CaseStudyBlock } from "@/content/site";

// Case studies with many images (e.g. Heritage Furniture's ~40 photos)
// can take a little longer to render as a PDF since every image is
// fetched during generation. 30s covers this comfortably on Vercel.
export const maxDuration = 30;

// ---------------------------------------------------------------------
// Real fonts (Urbanist + Zilla Slab), fetched from Google Fonts at
// request time so the PDF uses the exact same typefaces as the live
// site instead of react-pdf's default Helvetica. Registration state is
// cached at module scope so it only happens once per warm function
// instance, not on every request.
//
// Google's CSS2 API serves different font formats depending on the
// requesting browser's User-Agent — modern browsers get woff2, but an
// old-Chrome UA string gets plain .ttf files, which react-pdf can
// embed directly. This is a widely used, stable technique.
//
// IMPORTANT: Google's API expects spaces in family names encoded as a
// literal "+" (e.g. "Zilla+Slab"), NOT run through encodeURIComponent
// (which would turn "+" into "%2B" and break the lookup). That
// mismatch was the root cause of the "Font family not registered:
// Zilla Slab" crash — fixed below by building the family param
// manually instead of encoding it.
// ---------------------------------------------------------------------
let fontsReady: { urbanist: boolean; zillaSlab: boolean } | null = null;

async function fetchFontUrl(family: string, params: string): Promise<string | null> {
  try {
    const familyParam = family.trim().replace(/\s+/g, "+");
    const cssUrl = `https://fonts.googleapis.com/css2?family=${familyParam}:${params}&display=swap`;
    const res = await fetch(cssUrl, {
      headers: {
        // Old Chrome UA -> Google Fonts serves .ttf instead of .woff2
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
      },
    });
    if (!res.ok) return null;
    const css = await res.text();
    const match = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.ttf)\)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

// Registers fonts if not already done, and returns which families
// actually succeeded — callers MUST only reference a family in a style
// if this reports it as ready, or react-pdf throws at render time.
async function ensureFontsRegistered(): Promise<{ urbanist: boolean; zillaSlab: boolean }> {
  if (fontsReady) return fontsReady;

  const [urbanistRegular, urbanistLight, urbanistItalic, zillaSlabBoldItalic] = await Promise.all([
    fetchFontUrl("Urbanist", "wght@400"),
    fetchFontUrl("Urbanist", "wght@300"),
    fetchFontUrl("Urbanist", "ital@1"),
    fetchFontUrl("Zilla Slab", "ital,wght@1,700"),
  ]);

  let urbanistOk = false;
  if (urbanistRegular) {
    const fonts: { src: string; fontWeight?: number; fontStyle?: "normal" | "italic" }[] = [
      { src: urbanistRegular, fontWeight: 400 },
    ];
    if (urbanistLight) fonts.push({ src: urbanistLight, fontWeight: 300 });
    if (urbanistItalic) fonts.push({ src: urbanistItalic, fontStyle: "italic" });
    try {
      Font.register({ family: "Urbanist", fonts });
      urbanistOk = true;
    } catch {
      urbanistOk = false;
    }
  }

  let zillaSlabOk = false;
  if (zillaSlabBoldItalic) {
    try {
      Font.register({
        family: "Zilla Slab",
        fonts: [{ src: zillaSlabBoldItalic, fontStyle: "italic", fontWeight: 700 }],
      });
      zillaSlabOk = true;
    } catch {
      zillaSlabOk = false;
    }
  }

  fontsReady = { urbanist: urbanistOk, zillaSlab: zillaSlabOk };
  return fontsReady;
}

function buildStyles(fonts: { urbanist: boolean; zillaSlab: boolean }) {
  // Built-in react-pdf fonts (no registration needed) used as safe
  // fallbacks if a Google Fonts fetch ever fails, so the PDF always
  // renders successfully even if it can't get the exact typeface.
  const bodyFont = fonts.urbanist ? "Urbanist" : "Helvetica";
  const headingFont = fonts.zillaSlab ? "Zilla Slab" : "Helvetica-BoldOblique";

  return StyleSheet.create({
    page: {
      padding: 40,
      fontSize: 11,
      lineHeight: 1.5,
      fontFamily: bodyFont,
      color: "#000000",
    },
    title: {
      fontFamily: headingFont,
      fontStyle: "italic",
      fontWeight: 700,
      fontSize: 29,
      color: "#000000",
      marginBottom: 4,
    },
    summary: {
      fontSize: 10,
      color: "#858585",
      marginBottom: 14,
    },
    heroImage: {
      marginTop: 4,
      marginBottom: 18,
    },
    sectionHeading: {
      fontFamily: bodyFont,
      fontWeight: 400,
      fontSize: 22,
      color: "#000000",
      marginTop: 18,
      marginBottom: 8,
    },
    subHeading: {
      fontFamily: bodyFont,
      fontWeight: fonts.urbanist ? 300 : 400,
      fontSize: 16.5,
      color: "#000000",
      marginTop: 10,
      marginBottom: 5,
    },
    body: {
      fontFamily: bodyFont,
      fontWeight: 400,
      fontSize: 11,
      color: "#000000",
      marginBottom: 8,
      textAlign: "center",
    },
    bodyLeft: {
      fontFamily: bodyFont,
      fontWeight: 400,
      fontSize: 11,
      color: "#000000",
    },
    quote: {
      fontFamily: bodyFont,
      fontStyle: "italic",
      fontSize: 14.7,
      textAlign: "center",
      marginVertical: 12,
      color: "#000000",
    },
    quoteAttribution: {
      fontFamily: bodyFont,
      fontStyle: "normal",
      fontSize: 11,
      marginTop: 4,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: "#000000",
      marginVertical: 14,
    },
    caption: {
      fontFamily: bodyFont,
      fontSize: 11,
      textAlign: "center",
      color: "#000000",
      marginTop: 5,
      marginBottom: 8,
    },
    imageRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 6,
    },
    imageRowItem: {
      flex: 1,
    },
    fullImage: {
      marginBottom: 6,
      maxHeight: 300,
      objectFit: "contain",
    },
    imageTextRow: {
      flexDirection: "row",
      gap: 14,
      alignItems: "center",
      marginBottom: 12,
    },
    imageTextImage: {
      width: 190,
    },
    imageTextText: {
      flex: 1,
    },
    briefHeading: {
      fontFamily: bodyFont,
      fontWeight: 400,
      fontSize: 22,
      color: "#000000",
      marginBottom: 8,
    },
    footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
      paddingTop: 14,
      borderTopWidth: 1,
      borderTopColor: "#000000",
    },
    byline: {
      fontFamily: bodyFont,
      fontWeight: 400,
      fontSize: 11,
      color: "#000000",
    },
    otherProjects: {
      fontFamily: bodyFont,
      fontWeight: 400,
      fontSize: 10,
      color: "#858585",
      marginTop: 10,
    },
  });
}

function renderBlock(
  block: CaseStudyBlock,
  i: number,
  origin: string,
  styles: ReturnType<typeof buildStyles>
) {
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
          {block.attribution && <Text style={styles.quoteAttribution}>{"\n" + block.attribution}</Text>}
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
          <Text style={[styles.imageTextText, styles.bodyLeft]}>{block.text}</Text>
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

  let buffer: Buffer;
  try {
    const fontStatus = await ensureFontsRegistered();
    const styles = buildStyles(fontStatus);
    const origin = req.nextUrl.origin;

    const doc = (
      <Document title={caseStudy.title} producer="Portfolio Site">
        <Page size="A4" style={styles.page} wrap>
          <Text style={styles.title}>{caseStudy.title}</Text>
          <Text style={styles.summary}>{caseStudy.summary}</Text>
          <PdfImage src={`${origin}${caseStudy.heroImage.src}`} style={styles.heroImage} />

          <Text style={styles.briefHeading}>Project Brief</Text>
          <Text style={styles.body}>{caseStudy.brief}</Text>

          {caseStudy.blocks.map((block, i) => renderBlock(block, i, origin, styles))}

          <View style={styles.footerRow}>
            <Text style={styles.byline}>{caseStudy.byline}</Text>
          </View>
          <Text style={styles.otherProjects}>{caseStudy.otherProjects}</Text>
        </Page>
      </Document>
    );

    buffer = await renderToBuffer(doc);
  } catch (err) {
    console.error(`PDF generation failed for case study "${slug}":`, err);
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${slug}.pdf"`,
      "Cache-Control": "public, max-age=3600, immutable",
    },
  });
}
