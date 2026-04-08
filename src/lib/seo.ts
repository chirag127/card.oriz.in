export function generateCardJsonLd(card: import("@/types/card").CardData) {
  const annualFee = card.charges.find((c) =>
    c.label.toLowerCase().includes("annual")
  )?.amount ?? 0;

  const avgRating =
    card.reviews && card.reviews.length > 0
      ? card.reviews.reduce((sum, r) => sum + r.overallRating, 0) /
        card.reviews.length
      : 0;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: card.name,
    description: card.description || card.tagline,
    brand: {
      "@type": "Organization",
      name: card.bank,
    },
    offers: {
      "@type": "Offer",
      price: annualFee,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    ...(avgRating > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: avgRating.toFixed(1),
            reviewCount: card.reviews?.length ?? 0,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateArticleJsonLd(
  title: string,
  description: string,
  author: string,
  datePublished: string,
  dateModified: string,
  url: string,
  imageUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished,
    dateModified,
    url,
    image: imageUrl,
    publisher: {
      "@type": "Organization",
      name: "card.oriz.in",
      logo: {
        "@type": "ImageObject",
        url: "https://card.oriz.in/favicon.svg",
      },
    },
  };
}

export function generateItemListJsonLd(
  name: string,
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}
