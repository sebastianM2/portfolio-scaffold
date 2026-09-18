// =============================================================
// SINGLE SOURCE OF TRUTH for site copy.
// Paste exact text/labels from the Figma file here — do not
// paraphrase or "improve" wording; it must match the mockup 1:1.
// =============================================================

export const siteMeta = {
  siteName: "Sebastian Alessio Peyton",
  title: "Sebastian Alessio Peyton — Product Designer",
  description:
    "Portfolio of Sebastian Alessio Peyton, a strategic designer interested in human craft and innovation. Product design, furniture design, and industrial design projects.",
  url: "https://sebastianalessiopeyton.com", 
};

export const nav = {
  logoText: "Sebastian Alessio Peyton",
};

export const about = {
  headshot: { src: "/images/headshot.png", alt: "Portrait of Sebastian Alessio Peyton" },
  aboutLabel: "About: ",
  aboutText:
    "I am a product designer currently studying at the Sapienza University of Rome within the product and service design masters program. I’m passionate about human centered products, focusing on day to day life and sustainability. ",
  goalLabel: "My goal: ",
  goalText: "I want design solutions that empower users to lead better lives.",
};

export const hero = {
  tagline: "“I believe that design is the process of making life a little bit easier” ",
  resumeButtonLabel: "Download Full Resume",
};

export type Project = {
  number: string;
  title: string;
  meta: string; // e.g. "Furniture Design/Industrial Design/2026"
  slug: string;
};

// Note: numbering is sequential (01-05) per the site owner's request.
export const projects: Project[] = [
  {
    number: "01",
    title: "Piccola Libreria",
    meta: "Furniture Design/Industrial Design/2026",
    slug: "piccola-libreria",
  },
  {
    number: "02",
    title: "Good Pistachios",
    meta: "Sustainable Packaging/Service Design/2025",
    slug: "good-pistachios",
  },
  {
    number: "03",
    title: "Heritage Furniture",
    meta: "Furniture Design/Physical Prototyping/2024",
    slug: "heritage-furniture",
  },
  {
    number: "04",
    title: "Knows Eyewear",
    meta: "Eyewear/Industrial Design/2023",
    slug: "knows-eyewear",
  },
  {
    number: "05",
    title: "Brush Buddy",
    meta: "Consumer Product/Interaction Design/2022",
    slug: "brush-buddy",
  },
];

export type EducationEntry = { school: string; degree: string };

export const education: EducationEntry[] = [
  {
    school: "Sapienza University of Rome",
    degree: "Masters Degree in Product and Service Design",
  },
  {
    school: "Drexel University",
    degree: "Bachelors Degree in Product Design",
  },
];

export type ExperienceEntry = { company: string; role: string };

export const experience: ExperienceEntry[] = [
  { company: "Knows Eyewear", role: "Industrial Design Consultant (2022-2022)" },
  { company: "Follicle Hair Studios", role: "Contract User Experience Designer (2023-2023)" },
  { company: "SimpleTire LLC", role: "Product Management Intern (2023-2024)" },
];

// Case studies use a block-based content model since each Figma case study
// page mixes different section types (image rows, quotes, image+text pairs).
export type CaseStudyImage = { src: string; alt: string };

export type CaseStudyBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "imageRow"; images: CaseStudyImage[]; caption?: string; fit?: "cover" | "contain" }
  | {
      type: "imageText";
      image: CaseStudyImage;
      text: string;
      imageSide: "left" | "right";
      fit?: "cover" | "contain";
    }
  | { type: "fullImage"; image: CaseStudyImage; caption?: string; fit?: "cover" | "contain" }
  | { type: "divider" };

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string; // used for card/meta on home page + OG tags
  heroImage: CaseStudyImage;
  brief: string;
  blocks: CaseStudyBlock[];
  otherProjects: string; // e.g. "Piccola Libreria - Heritage Furniture - Knows Eyewear"
  byline: string; // e.g. "Brush Buddy by Sebastian Alessio Peyton (2022)"
  downloadPdfLabel: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "brush-buddy",
    title: "Brush Buddy",
    summary: "Consumer Product/Interaction/2022",
    heroImage: { src: "/images/case-studies/brush-buddy/hero.jpg", alt: "Brush Buddy product render" },
    brief:
      "The goal for this project was to create a new and innovative design for the Native brand focusing in the areas of self care and hygiene. My focus for this project was specifically in children\u2019s dental hygiene.",
    otherProjects: "Piccola Libreria - Good Pistachios - Heritage Furniture - Knows Eyewear",
    byline: "Brush Buddy by Sebastian Alessio Peyton (2022)",
    downloadPdfLabel: "Download this case study",
    blocks: [
      { type: "divider" },
      { type: "heading", text: "Research" },
      { type: "subheading", text: "Market Research" },
      {
        type: "imageRow",
        fit: "cover",
        images: [
          { src: "/images/case-studies/brush-buddy/research-toothpaste.jpg", alt: "Children's branded toothpaste" },
          { src: "/images/case-studies/brush-buddy/research-mouthwash.jpg", alt: "Children's mouthwash" },
          { src: "/images/case-studies/brush-buddy/research-toothbrush.jpg", alt: "Children's toothbrushes" },
        ],
        caption:
          "The first step of the process was to understand what products are being offered to children for dental hygiene",
      },
      {
        type: "quote",
        text: "We noticed in our initial research phase that the design for children\u2019s dental care products heavily featured characters in the design.",
      },
      { type: "subheading", text: "User Interview" },
      {
        type: "quote",
        text: "I don\u2019t have much fun with my toothbrush but I deal with it.",
        attribution: "Interview participant 5",
      },
      {
        type: "paragraph",
        text: "After understanding what was available on the market, the next step was to conduct user interviews. 20 users between the ages of 5-11 were interviewed for the project. above is an excerpt from that conversation.",
      },
      { type: "subheading", text: "Persona" },
      {
        type: "paragraph",
        text: "From the user interviews I was able to generate a persona that captured similar habits seen in the user interviews.",
      },
      {
        type: "imageText",
        imageSide: "left",
        fit: "cover",
        image: { src: "/images/case-studies/brush-buddy/persona-timmy.jpg", alt: "Timmy persona illustration" },
        text: "Timmy\nAge: 11\n\nTimmy is a young child that is starting to experience the negative effects of poor dental hygiene. His dentist recently told him that he is starting to develop cavities. When asked about his dental routine Timmy reveals that he tries to brush twice a day\u2026but sometimes only before bed, he almost never flosses and hasn\u2019t used mouth wash since his last dentist visit.",
      },
      {
        type: "quote",
        text: "Young children have low participation in the extended steps of oral hygiene due to lack of interest and availability of options. Our opportunity is to create solutions that increase interest in hygiene and establishes good habits.",
      },
      { type: "divider" },
      { type: "heading", text: "Design" },
      { type: "subheading", text: "References" },
      {
        type: "imageRow",
        images: [
          { src: "/images/case-studies/brush-buddy/ref-idog-1.jpg", alt: "i-dog robot toy reference" },
          { src: "/images/case-studies/brush-buddy/ref-idog-lights.jpg", alt: "i-dog robot toy with lit sensors" },
          { src: "/images/case-studies/brush-buddy/ref-remote-dog.jpg", alt: "Remote-control robot dog toy reference" },
        ],
        fit: "contain",
        caption:
          "during the design phase I was inspired by the aesthetic and functionality of robot dog toys from the early 2000s, such as the i-dog from Sega.",
      },
      { type: "subheading", text: "Design Concept" },
      {
        type: "imageText",
        imageSide: "right",
        fit: "contain",
        image: { src: "/images/case-studies/brush-buddy/concept-sketches.png", alt: "Early concept sketches" },
        text: "This is a caption to a left sided Image, use this space to add context to the image.",
      },
      {
        type: "imageText",
        imageSide: "left",
        fit: "cover",
        image: { src: "/images/case-studies/brush-buddy/final-sketch.png", alt: "Final concept sketch of Brush Buddy" },
        text: "To the left is a sketch of the final concept: Brush Buddy. Brush Buddy is an appliance intended to help children develop strong dental hygiene habits. These habits are built through interacting with the character that provides encouragement the child.",
      },
      {
        type: "fullImage",
        fit: "contain",
        image: { src: "/images/case-studies/brush-buddy/scenario.png", alt: "Storyboard of a child's morning routine using Brush Buddy" },
        caption: "Above is a scenario outlining how the brush buddy will be used in daily life.",
      },
      { type: "divider" },
      { type: "heading", text: "Outcome" },
      {
        type: "fullImage",
        fit: "cover",
        image: { src: "/images/case-studies/brush-buddy/outcome.jpg", alt: "Brush Buddy product in a bathroom setting" },
        caption: "The brush buddy design proposal has not yet been user tested",
      },
    ],
  },
  // TODO: Heritage Furniture — same MCP workflow.
  {
    slug: "piccola-libreria",
    title: "Piccola Libreria",
    summary: "Furniture Design/Industrial Design/2026",
    heroImage: {
      src: "/images/case-studies/piccola-libreria/hero.jpg",
      alt: "Piazza dei Quiriti in Rome, with benches, a fountain, and a park trash can",
    },
    brief:
      "The Goal for this project was to design an outdoor urban design intervention in one of the historic neighborhoods of Rome. For my project I was assigned to work within the neighborhood of Prati, with a focus on the Piazza Dei Quiriti.",
    otherProjects: "Brush Buddy - Good Pistachios - Heritage Furniture - Knows Eyewear",
    byline: "Piccola Libreria by Sebastian Alessio Peyton (2026)",
    downloadPdfLabel: "Download this case study",
    blocks: [
      { type: "divider" },
      { type: "heading", text: "Research" },
      { type: "subheading", text: "Field Research" },
      {
        type: "imageText",
        imageSide: "left",
        fit: "contain",
        image: {
          src: "/images/case-studies/piccola-libreria/field-research-bench.jpg",
          alt: "A man sitting alone on a park bench in Piazza dei Quiriti",
        },
        text: "The first step of my research was to go to the area and understand how people spent time in the area. I visited the site on 3 different occasions to understand user behavior across the following conditions: Morning, Afternoon, Night",
      },
      {
        type: "quote",
        text: "People are mainly drawn to the benches, both when alone and in groups",
      },
      {
        type: "imageText",
        imageSide: "right",
        fit: "cover",
        image: {
          src: "/images/case-studies/piccola-libreria/field-research-plan.jpg",
          alt: "Official city plan of Piazza dei Quiriti from the city of Rome",
        },
        text: "To better understand the scale of the design intervention a plan of the area was found from the city of Rome.",
      },
      { type: "subheading", text: "User Journey" },
      
      {
        type: "fullImage",
        fit: "contain",
        image: {
          src: "/images/case-studies/piccola-libreria/user-journey.png",
          alt: "Park experience journey map for a single visitor to Piazza dei Quiriti",
        },
        caption: "To better understand the problem that was presented by the benches I created a user journey map showing where a potential pain point can be found",
      },
      { type: "divider" },
      { type: "heading", text: "Design" },
      { type: "subheading", text: "References" },
      {
        type: "imageRow",
        fit: "cover",
        images: [
          { src: "/images/case-studies/piccola-libreria/Cesto Transparent.png", alt: "AI-generated concept of a book-sharing trash can structure in a park setting" },
          { src: "/images/case-studies/piccola-libreria/ref-ai-library.jpg", alt: "AI-generated concept of a round book-sharing structure in the piazza" },
          { src: "/images/case-studies/piccola-libreria/ref-ai-trashcan-closeup.jpg", alt: "Close-up AI-generated concept of the book-sharing trash can structure" },
        ],
        caption:
          "Inspiration for this came primarily from public park trash cans that are found in Rome. Alongside the original design reference, AI was used to supplement the initial ideation phase.",
      },
      { type: "subheading", text: "Design Concept" },
      {
        type: "imageText",
        imageSide: "right",
        fit: "contain",
        image: { src: "/images/case-studies/piccola-libreria/sketch-page-1.jpeg", alt: "Early concept sketch of a pavilion-like structure" },
        text: "To the right is a sketch book page studying what form language I thought would be best to move forward with.",
      },
      {
        type: "imageText",
        imageSide: "left",
        fit: "contain",
        image: { src: "/images/case-studies/piccola-libreria/sketch-page-3.jpeg", alt: "Concept sketch exploring a hinged opening mechanism" },
        text: "As the form started to take shape, I continued exploring how to increase the intervention's visual interest and how users would interact with it.",
      },
      {
        type: "fullImage",
        fit: "contain",
        image: { src: "/images/case-studies/piccola-libreria/final-sketch.jpg", alt: "Final concept sketch of the tiered book-sharing structure" },
        caption: "Above is a sketch that would go on to become the final design intervention.",
      },
      {
        type: "imageRow",
        fit: "contain",
        images: [
          { src: "/images/case-studies/piccola-libreria/Photogrametry Rendering Cleaned Left.png", alt: "Photogrammetry scan of the park corner, angle 1" },
          { src: "/images/case-studies/piccola-libreria/Photogrametry Rendering Cleaned top.png", alt: "Photogrammetry scan of the park corner, angle 2" },
          { src: "/images/case-studies/piccola-libreria/Photogrametry Rendering Cleaned.png", alt: "Photogrammetry scan of the park corner, angle 3" },
        ],
        caption:
          "To better understand the scale of the design intervention in relation to other elements of the park, a 3d model was created through photogrammetry. The model was focused solely on the corner section of the park with bench",
      },
      { type: "divider" },
      { type: "subheading", text: "Outcome" },
      {
        type: "fullImage",
        fit: "contain",
        image: {
          src: "/images/case-studies/piccola-libreria/outcome.jpg",
          alt: "Final rendered design of the book-sharing structure placed in context in the piazza",
        },
        caption: "The final design was presented to small group of potential users with mixed results. Users reported that they were interested in the idea, however felt that the form of the design intervention could be further refined to better communicated the objects function.",
      },
    ],
  },
  {
    slug: "knows-eyewear",
    title: "Knows Eyewear",
    summary: "Eyewear/Industrial Design/2023",
    heroImage: {
      src: "/images/case-studies/knows-eyewear/hero.jpg",
      alt: "Three pairs of redesigned sunglasses displayed on cylindrical pedestals",
    },
    brief:
      "The goal of this project was to revise the design of sunglasses made by Knows Eyewear. They wanted to renew their aesthetic language while maintaining the functionality of their proprietary design.",
    otherProjects: "Piccola Libreria - Good Pistachios - Heritage Furniture - Brush Buddy",
    byline: "Knows Eyewear Redesign by Sebastian Alessio Peyton (2023)",
    downloadPdfLabel: "Download this case study",
    blocks: [
      { type: "divider" },
      { type: "heading", text: "Research" },
      { type: "subheading", text: "Background Research" },
      {
        type: "imageText",
        imageSide: "left",
        fit: "contain",
        image: { src: "/images/case-studies/knows-eyewear/idea-map.jpg", alt: "Idea map breaking down the parts of sunglasses" },
        text: "Before starting the designing phase an idea map was created that explored the different parts of sunglasses. I tried to understand how the different parts of sunglasses could be manipulated to create a unique design aesthetic.",
      },
      {
        type: "fullImage",
        fit: "contain",
        image: { src: "/images/case-studies/knows-eyewear/knows-notes.jpg", alt: "Annotated photo of the current Knows Eyewear design noting areas for improvement" },
        caption: "Along with the idea map, I studied the current Knows Eyewear design to understand areas of focus.",
      },
      { type: "subheading", text: "References" },
      {
        type: "imageRow",
        fit: "cover",
        images: [
          { src: "/images/case-studies/knows-eyewear/ref-1.jpg", alt: "Ray-Ban campaign photograph, used as a styling reference" },
          { src: "/images/case-studies/knows-eyewear/ref-2.jpg", alt: "Close-up product photo of the original Knows Eyewear frame" },
          { src: "/images/case-studies/knows-eyewear/ref-3.jpg", alt: "Ray-Ban Wayfarer detail photograph, used as a materials/lighting reference" },
        ],
        caption:
          "To guide the creative vision for the project a mood board was created that highlights not only the form of the glasses but also aesthetics and materials. Reference photography (Ray-Ban campaign and product images) is used here for research purposes only.",
      },
      {
        type: "quote",
        text: "Looking at what is available on the market, there is an opportunity to pull from well recognized silhouettes.",
      },
      { type: "divider" },
      { type: "heading", text: "Design" },
      { type: "subheading", text: "Sketching" },
      {
        type: "imageRow",
        fit: "contain",
        images: [
          { src: "/images/case-studies/knows-eyewear/sketch-1.jpg", alt: "Aesthetic concept sketch 1 of the double-layered frame" },
          { src: "/images/case-studies/knows-eyewear/sketch-2.jpg", alt: "Aesthetic concept sketch exploring a chain detail" },
          { src: "/images/case-studies/knows-eyewear/sketch-3.jpg", alt: "Aesthetic concept sketch 3" },
        ],
      },
      {
        type: "imageRow",
        fit: "contain",
        images: [
          { src: "/images/case-studies/knows-eyewear/sketch-4.jpg", alt: "Aesthetic concept sketch 4" },
          { src: "/images/case-studies/knows-eyewear/sketch-5.jpg", alt: "Aesthetic concept sketch 5" },
          { src: "/images/case-studies/knows-eyewear/sketch-6.jpg", alt: "Aesthetic concept sketch 6" },
        ],
        caption:
          "My design concept went through various iterations before landing on the final idea that would be translated into 3D models for both manufacturing and commercial renders.",
      },
      { type: "subheading", text: "Final Concept" },
      {
        type: "imageRow",
        fit: "contain",
        images: [
          { src: "/images/case-studies/knows-eyewear/final-concept-1.jpg", alt: "Final concept sketch 1 with material callouts" },
          { src: "/images/case-studies/knows-eyewear/final-concept-2.jpg", alt: "Final concept sketch 2" },
          { src: "/images/case-studies/knows-eyewear/final-concept-3.jpg", alt: "Final concept sketch 3" },
        ],
        caption: "The above sketches are the final concept that would be initially presented to Knows Eyewear.",
      },
      {
        type: "imageRow",
        fit: "contain",
        images: [
          { src: "/images/case-studies/knows-eyewear/render-blue.jpg", alt: "3D render of the final frame in blue" },
          { src: "/images/case-studies/knows-eyewear/render-grey.jpg", alt: "3D render of the final frame in grey" },
          { src: "/images/case-studies/knows-eyewear/render-red.jpg", alt: "3D render of the final frame in red" },
        ],
        caption: "After some modifications to the proposed design, 3D renders were created to better understand material and color choices.",
      },
      { type: "divider" },
      { type: "heading", text: "Outcome" },
      {
        type: "fullImage",
        fit: "contain",
        image: {
          src: "/images/case-studies/knows-eyewear/outcome.jpg",
          alt: "AI-generated lifestyle image of a model wearing the redesigned sunglasses",
        },
        caption:
          "At the end of the design period Knows Eyewear chose not to move forward with the design changes to continue focus on refining their proprietary innovation. Image above generated using Krea AI",
      },
    ],
  },
  {
    slug: "heritage-furniture",
    title: "Heritage Furniture",
    summary: "Furniture/Physical Prototyping/2024",
    heroImage: {
      src: "/images/case-studies/heritage-furniture/hero.jpg",
      alt: "The cherry wood side table from the collection, next to a potted cactus",
    },
    brief:
      "The goal for this project was to create a furniture collection of 3 unique items: A chair, A lamp, A Side Table The theme of the collection was to highlight the ways that interaction with an object can effect its aesthetic qualities.",
    otherProjects: "Piccola Libreria - Good Pistachios - Knows Eyewear - Brush Buddy",
    byline: "Heritage Furniture by Sebastian Alessio Peyton (2024)",
    downloadPdfLabel: "Download this case study",
    blocks: [
      { type: "divider" },
      { type: "heading", text: "Research" },
      { type: "subheading", text: "Space Research" },
      {
        type: "imageText",
        imageSide: "left",
        fit: "contain",
        image: { src: "/images/case-studies/heritage-furniture/heatmap.jpg", alt: "Heat map of a one-bedroom apartment showing where survey respondents spend the most time" },
        text: "The first step of the process was to conduct both quantitative and qualitative research on how users feel about the furniture in their home.\n\n30 people were asked to complete a survey of where they felt they spent the most time when alone in their homes. The heat map shows a representation of their responses, with an overwhelming majority highlighting their preferences for the living room. This lead me to focus my ideation on living room furniture.",
      },
      { type: "subheading", text: "User Interviews" },
      {
        type: "imageRow",
        fit: "cover",
        images: [
          { src: "/images/case-studies/heritage-furniture/interview-1.jpg", alt: "Stylized portrait of interview participant Anabel" },
          { src: "/images/case-studies/heritage-furniture/interview-2.jpg", alt: "Stylized portrait of interview participant Marina" },
        ],
        caption: "Of those 30 people, 2 participants were asked to participate in hour-long interviews to gain deeper insight on their attitudes towards furniture.",
      },
      { type: "subheading", text: "Material Study" },
      {
        type: "imageRow",
        fit: "cover",
        images: [
          { src: "/images/case-studies/heritage-furniture/material-1.jpg", alt: "Close-up study of a brushed brass material sample" },
          { src: "/images/case-studies/heritage-furniture/material-2.jpg", alt: "Close-up study of a material sample" },
          { src: "/images/case-studies/heritage-furniture/material-3.jpg", alt: "Close-up study of terracotta texture" },
        ],
        caption: "To highlight the ways that time and human interaction will affect the design objects I conducted a variety of studies on different materials. The 3 samples above would go on to become core materials that would be featured throughout the collection.",
      },
      { type: "divider" },
      { type: "heading", text: "Design" },
      { type: "subheading", text: "References" },
      {
        type: "imageRow",
        fit: "cover",
        images: [
          { src: "/images/case-studies/heritage-furniture/ref-saarinen-portrait.jpg", alt: "Portrait of designer Eero Saarinen" },
          { src: "/images/case-studies/heritage-furniture/ref-knoll-portrait.jpg", alt: "Portrait of designer Florence Knoll" },
          { src: "/images/case-studies/heritage-furniture/ref-magistretti-portrait.jpg", alt: "Portrait of designer Vico Magistretti" },
        ],
      },
      {
        type: "imageRow",
        fit: "cover",
        images: [
          { src: "/images/case-studies/heritage-furniture/ref-saarinen-work.jpg", alt: "Tulip table by Eero Saarinen" },
          { src: "/images/case-studies/heritage-furniture/ref-knoll-work.jpg", alt: "Relaxed lounge chair by Florence Knoll" },
          { src: "/images/case-studies/heritage-furniture/ref-magistretti-work.jpg", alt: "Lamp by Vico Magistretti" },
        ],
        caption: "The designs for this project took references from other famous Mid-century designers such as: Eero Saarinen, Florence Knoll, and Vico Magistretti.",
      },
      {
        type: "quote",
        text: "Goal of any designer should be to create objects that people refuse to throw out",
      },
      { type: "subheading", text: "Design Concept" },
      {
        type: "imageRow",
        fit: "contain",
        images: [
          { src: "/images/case-studies/heritage-furniture/concept-sketch-1.jpg", alt: "Early concept sketch page 1" },
          { src: "/images/case-studies/heritage-furniture/concept-sketch-2.jpg", alt: "Early concept sketch page 2" },
          { src: "/images/case-studies/heritage-furniture/concept-sketch-3.jpg", alt: "Early concept sketch page 3" },
        ],
      },
      {
        type: "imageRow",
        fit: "cover",
        images: [
          { src: "/images/case-studies/heritage-furniture/concept-sketch-4.jpg", alt: "Early concept sketch page 4" },
          { src: "/images/case-studies/heritage-furniture/concept-sketch-5.jpg", alt: "Early concept sketch page 5" },
          { src: "/images/case-studies/heritage-furniture/concept-sketch-6.jpg", alt: "Early concept sketch page 6" },
        ],
        caption: "Above is a series of sketches that would go on to become the final design.",
      },
      {
        type: "imageRow",
        fit: "contain",
        images: [
          { src: "/images/case-studies/heritage-furniture/final-drawing-chair.jpg", alt: "Final manufacturing drawing of the chair, with material callouts" },
          { src: "/images/case-studies/heritage-furniture/final-drawing-lamp.jpg", alt: "Final manufacturing drawing of the lamp" },
          { src: "/images/case-studies/heritage-furniture/final-drawing-sidetable.jpg", alt: "Final manufacturing drawing of the side table" },
        ],
        caption: "Above are final sketches that would be used to manufacture the physical prototypes of the collection.",
      },
      {
        type: "fullImage",
        fit: "contain",
        image: { src: "/images/case-studies/heritage-furniture/3d-render-all-pieces.jpg", alt: "3D render of the chair, lamp, and side table together" },
        caption: "Above is a 3D render of the pieces together to better understand their proportions as well as aesthetic similarity.",
      },
      { type: "divider" },
      { type: "heading", text: "Prototyping" },
      {
        type: "paragraph",
        text: "Below are photo collections that document how each of the prototypes were manufactured. The goal is to document both process as well as evolutions in the design as the prototype was being produced.",
      },
      {
        type: "imageRow",
        fit: "cover",
        images: [
          { src: "/images/case-studies/heritage-furniture/proto-chair-1.jpg", alt: "Chair prototyping process photo 1" },
          { src: "/images/case-studies/heritage-furniture/proto-chair-2.jpg", alt: "Chair prototyping process photo 2" },
          { src: "/images/case-studies/heritage-furniture/proto-chair-3.jpg", alt: "Chair prototyping process photo 3" },
        ],
      },
      {
        type: "imageRow",
        fit: "cover",
        images: [
          { src: "/images/case-studies/heritage-furniture/proto-chair-4.jpg", alt: "Chair prototyping process photo 4" },
          { src: "/images/case-studies/heritage-furniture/proto-chair-5.jpg", alt: "Chair prototyping process photo 5" },
          { src: "/images/case-studies/heritage-furniture/proto-chair-6.jpg", alt: "Chair prototyping process photo 6" },
        ],
      },
      {
        type: "imageRow",
        fit: "cover",
        images: [
          { src: "/images/case-studies/heritage-furniture/proto-lamp-1.jpg", alt: "Lamp prototyping process photo 1" },
          { src: "/images/case-studies/heritage-furniture/proto-lamp-2.jpg", alt: "Lamp prototyping process photo 2" },
          { src: "/images/case-studies/heritage-furniture/proto-lamp-3.jpg", alt: "Lamp prototyping process photo 3" },
        ],
      },
      {
        type: "imageRow",
        fit: "cover",
        images: [
          { src: "/images/case-studies/heritage-furniture/proto-lamp-4.jpg", alt: "Lamp prototyping process photo 4" },
          { src: "/images/case-studies/heritage-furniture/proto-lamp-5.jpg", alt: "Lamp prototyping process photo 5" },
          { src: "/images/case-studies/heritage-furniture/proto-lamp-6.jpg", alt: "Lamp prototyping process photo 6" },
        ],
      },
      {
        type: "imageRow",
        fit: "cover",
        images: [
          { src: "/images/case-studies/heritage-furniture/proto-table-1.jpg", alt: "Side table prototyping process photo 1" },
          { src: "/images/case-studies/heritage-furniture/proto-table-2.jpg", alt: "Side table prototyping process photo 2" },
          { src: "/images/case-studies/heritage-furniture/proto-table-3.jpg", alt: "Side table prototyping process photo 3" },
        ],
      },
      {
        type: "imageRow",
        fit: "cover",
        images: [
          { src: "/images/case-studies/heritage-furniture/proto-table-4.jpg", alt: "Side table prototyping process photo 4" },
          { src: "/images/case-studies/heritage-furniture/proto-table-5.jpg", alt: "Side table prototyping process photo 5" },
          { src: "/images/case-studies/heritage-furniture/proto-table-6.jpg", alt: "Side table prototyping process photo 6" },
        ],
      },
      { type: "heading", text: "Outcome" },
      {
        type: "fullImage",
        fit: "contain",
        image: {
          src: "/images/case-studies/heritage-furniture/outcome.jpg",
          alt: "The 3 prototypes on display at the Drexel Westphal exhibition",
        },
        caption: "The 3 prototypes would be presented at the Drexel Westphal as part of the exhibition on student work throughout the Westphal Antoinette College of Media and Design",
      },
    ],
  },
  {
    slug: "good-pistachios",
    title: "Good Pistachios",
    summary: "Sustainable Packaging/Service Design/2025",
    heroImage: {
      src: "/images/case-studies/good-pistachios/hero.jpg",
      alt: "Good Pistachios packaging bag with pistachios falling into it",
    },
    brief:
      "The goal for this project was to design a sustainable design intervention meant to address waste within a food system. The focus of this project is on the pistachio food system within the United States of America.",
    otherProjects: "Piccola Libreria - Heritage Furniture - Knows Eyewear - Brush Buddy",
    byline: "Good Pistachios by Sebastian Alessio Peyton & Ekin Su Ekinci (2025)",
    downloadPdfLabel: "Download this case study",
    blocks: [
      { type: "divider" },
      { type: "heading", text: "Research" },
      { type: "subheading", text: "Problem definition" },
      {
        type: "fullImage",
        fit: "contain",
        image: {
          src: "/images/case-studies/good-pistachios/problem-definition.jpg",
          alt: "Problem definition chart covering the pistachio supply chain, stakeholders, and industry problems",
        },
        caption:
          "The first step of the process was to better understand what problems were present within the supply chain of pistachio farming within the United States. Our initial research led us to understand that a point of focus would be the end consumer waste that is produced from the consumption of pistachios",
      },
      {
        type: "quote",
        text: "If the most waste is produced during the end of the supply chain, we need to investigate if there are any opportunities to minimize the waste earlier.",
      },
      { type: "subheading", text: "Journey Map" },
      {
        type: "fullImage",
        fit: "contain",
        image: {
          src: "/images/case-studies/good-pistachios/journey-map.jpg",
          alt: "Pistachio snack journey map outlining critical points across the supply chain",
        },
        caption:
          "The journey map outlines critical points where a design intervention could be introduced to reduce waste within the pistachio supply chain",
      },
      { type: "subheading", text: "Persona" },
      {
        type: "imageText",
        imageSide: "left",
        fit: "contain",
        image: {
          src: "/images/case-studies/good-pistachios/persona.jpg",
          alt: "Target Users and Personas: Marta, Alessandro, and Giovanna, with their goals for a sustainable pistachio product",
        },
        text: "Once we understood the supply chain we also studied the main customers of pistachios in America, to the left are personas that are created based on snack pistachio consumer data",
      },
      { type: "divider" },
      { type: "heading", text: "Design" },
      { type: "subheading", text: "Design Concept" },
      {
        type: "imageRow",
        fit: "contain",
        images: [
          { src: "/images/case-studies/good-pistachios/design-concept-sketch-1.jpg", alt: "Design concept sketch of a two-compartment tray with sliding divider" },
          { src: "/images/case-studies/good-pistachios/design-concept-sketch-2.jpg", alt: "Design concept sketch of a resealable shipping bag with QR code tracking" },
        ],
        caption:
          "Our team decided that we would have the most impact on pistachio waste by creating a consumer facing design intervention. we began designing different packaging solutions that address how a consumer can mitigate the waste that is created from snack pistachios",
      },
      { type: "subheading", text: "Design Concept" },
      {
        type: "fullImage",
        fit: "contain",
        image: {
          src: "/images/case-studies/good-pistachios/concept-sheet.jpg",
          alt: "Concept sheet covering morphology, technology, and function of the Good Pistachios packaging system",
        },
        caption:
          "Above is a concept sheet that explains how the final design can help address the waste the is generated from snack pistachio products",
      },
      {
        type: "fullImage",
        fit: "contain",
        image: {
          src: "/images/case-studies/good-pistachios/packaging-render.jpg",
          alt: "3D render of the Good Pistachios packaging",
        },
        caption: "Along with design 3D renders of the packaging were created to communicate the design of packaging",
      },
      { type: "divider" },
      { type: "heading", text: "Business Plan" },
      {
        type: "fullImage",
        fit: "cover",
        image: {
          src: "/images/case-studies/good-pistachios/business-model-canvas.jpg",
          alt: "Business Model Canvas for the Good Pistachios packaging service",
        },
        caption:
          "As part of the project to understand how our proposal would affect the existing pistachio snack industry a business model was created. That business model was synthesized utilizing the Business Model Canvas above.",
      },
      {
        type: "fullImage",
        fit: "contain",
        image: {
          src: "/images/case-studies/good-pistachios/competitive-analysis.jpg",
          alt: "Competitive analysis comparing Good Pistachios against Wonderful Pistachios and Verde Dorato",
        },
        caption:
          "Once the business plan was defined a competitive analysis was also created to highlight how the design intervention fills gaps that are currently missed from major pistachio snack producers",
      },
      {
        type: "fullImage",
        fit: "contain",
        image: {
          src: "/images/case-studies/good-pistachios/system-map.jpg",
          alt: "System map showing stakeholders in the B2B packaging service for pistachio processing plants",
        },
        caption:
          "Along with the business model canvas this graphic outlines exactly how different stakeholders would be affected by the proposed design intervention; both negatively and positively.",
      },
      { type: "divider" },
      { type: "heading", text: "Outcome" },
      {
        type: "fullImage",
        fit: "cover",
        image: {
          src: "/images/case-studies/good-pistachios/outcome.jpg",
          alt: "Good Pistachios packaging and resealable pouch staged on a table for validation",
        },
        caption:
          "The proposal was presented to sustainable business experts and design professionals. The idea garnered some interest but must be further refined.",
      },
    ],
  },
];
