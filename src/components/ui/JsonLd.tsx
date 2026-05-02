export default function JsonLd({ siteUrl }: { siteUrl: string }) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Katy Díaz Beltrán",
    alternateName: ["Katy Diaz", "Katy Díaz", "katydiazbeltran"],
    jobTitle: "Frontend Developer",
    description:
      "Desarrolladora frontend freelance especializada en React, Next.js, TypeScript y animaciones web. Disponible para proyectos remotos y en Barranquilla, Colombia.",
    url: siteUrl,
    image: `${siteUrl}/katy.png`,
    email: "diazkaty0409@gmail.com",
    sameAs: [
      "https://www.linkedin.com/in/kdiaz11/",
      "https://github.com/Katkat04",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barranquilla",
      addressRegion: "Atlántico",
      addressCountry: "CO",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "CSS",
      "Tailwind CSS",
      "GSAP",
      "Animaciones Web",
      "Frontend Development",
      "Desarrollo Web",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Frontend Developer",
      occupationLocation: {
        "@type": "City",
        name: "Barranquilla",
      },
      description: "Desarrollo de interfaces web con React y Next.js",
    },
    offers: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Desarrollo Frontend Freelance",
        description:
          "Desarrollo de sitios web y aplicaciones frontend con React, Next.js y TypeScript. Disponible de forma remota o en Barranquilla, Colombia.",
        areaServed: [
          { "@type": "Country", name: "Colombia" },
          { "@type": "AdministrativeArea", name: "Atlántico" },
          { "@type": "City", name: "Barranquilla" },
          "Remote",
        ],
        provider: {
          "@type": "Person",
          name: "Katy Díaz Beltrán",
        },
      },
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Katy Díaz Beltrán — Portfolio",
    url: siteUrl,
    description:
      "Portfolio de Katy Díaz Beltrán, desarrolladora frontend freelance en Barranquilla, Colombia.",
    author: {
      "@type": "Person",
      name: "Katy Díaz Beltrán",
    },
    inLanguage: ["es-CO", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}