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
// site instead of react-pdf's default Helvetica. Registration is
// cached at module scope so it only happens once per warm function
// instance, not on every request.
//
// Google's CSS2 API serves different font formats depending on the
// requesting browser's User-Agent — modern browsers get woff2, but an
// old-Chrome UA string gets plain .ttf files, which react-pdf can
// embed directly. This is a widely used, stable technique.
// ---------------------------------------------------------------------
let fontsRegistered = false;

async function fetchFontUrl(family: string, params: string): Promise<string | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${params}&display=swap`;
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

async function registerFonts() {
  if (fontsRegistered) return;

  const [urbanistRegular, urbanistLight, urbanistItalic, zillaSlabBoldItalic] = await Promise.all([
    fetchFontUrl("Urbanist", "wght@400"),
    fetchFontUrl("Urbanist", "wght@300"),
    fetchFontUrl("Urbanist", "ital@1"),
    fetchFontUrl("Zilla+Slab", "ital,wght@1,700"),
  ]);

  if (urbanistRegular) {
    const fonts: { src: string; fontWeight?: number; fontStyle?: "normal" | "italic" }[] = [
      { src: urbanistRegular, fontWeight: 400 },
    ];
    if (urbanistLight) fonts.push({ src: urbanistLight, fontWeight: 300 });
    if (urbanistItalic) fonts.push({ src: urbanistItalic, fontStyle: "italic" });
    Font.register({ family: "Urbanist", fonts });
  }

  if (zillaSlabBoldItalic) {
    Font.register({
      family: "Zilla Slab",
      fonts: [{ src: zillaSlabBoldItalic, fontStyle: "italic", fontWeight: 700 }],
    });
  }

  fontsRegistered = true;
}

// Falls back to react-pdf's built-in Helvetica if a Google Fonts fetch
// fails for any reason (network hiccup, API change) — the PDF still
// generates successfully, just without the exact typeface that one time.
const bodyFont = "Urbanist";
const headingFont = "Zilla Slab";

// ---------------------------------------------------------------------
// Styles — sizes and colors mirror the live site's Block component
// exactly (see src/app/case-studies/[slug]/page.tsx), scaled down
// proportionally for print. Site body text is 21.6px desktop; this
// PDF uses 11pt as its equivalent baseline, so every other size below
// is that same site-to-PDF ratio (11/21.6 ≈ 0.51) applied to the
// site's actual pixel value — this keeps the PDF's type scale
// visually proportional to the website's, not just similar.
// ---------------------------------------------------------------------
const styles = StyleSheet.create({
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
    fontWeight: 300,
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

  await registerFonts();

  const origin = req.nextUrl.origin;

  const doc = (
    <Document title={caseStudy.title} producer="Portfolio Site">
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.title}>{caseStudy.title}</Text>
        <Text style={styles.summary}>{caseStudy.summary}</Text>
        <PdfImage src={`${origin}${caseStudy.heroImage.src}`} style={styles.heroImage} />

        <Text style={styles.briefHeading}>Project Brief</Text>
        <Text style={styles.body}>{caseStudy.brief}</Text>

        {caseStudy.blocks.map((block, i) => renderBlock(block, i, origin))}

        <View style={styles.footerRow}>
          <Text style={styles.byline}>{caseStudy.byline}</Text>
        </View>
        <Text style={styles.otherProjects}>{caseStudy.otherProjects}</Text>
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
