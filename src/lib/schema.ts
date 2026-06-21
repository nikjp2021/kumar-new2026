const BASE_URL = "https://kumarhamamatsu.com";

interface MenuItem {
  name: string;
  nameJa: string;
  nameEn: string;
  price: number;
  description: string;
  descriptionJa: string;
  dietary: string[];
  category: string;
}

interface BlogPost {
  slug: string;
  title: { en: string; ja: string };
  excerpt: { en: string; ja: string };
  content: { en: string; ja: string };
  image: string;
  date: string;
  author: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateRestaurantSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Kumar Restaurant",
    alternateName: locale === "ja" ? "クマールレストラン" : undefined,
    image: `${BASE_URL}/images/about/site-image.jpg`,
    url: BASE_URL,
    telephone: "+81-53-451-0154",
    email: "info@kumarhamamatsu.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Act Tower B1, Itayamachi",
      addressLocality: "Hamamatsu",
      addressRegion: "Shizuoka",
      postalCode: "430-8588",
      addressCountry: "JP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.7037,
      longitude: 137.7283,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "11:00",
        closes: "15:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "17:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "11:00",
        closes: "22:00",
      },
    ],
    servesCuisine: "Indian",
    priceRange: "¥¥",
    acceptsReservations: true,
    hasMenu: `${BASE_URL}/menu`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "168",
      bestRating: "5",
    },
    sameAs: [
      "https://www.facebook.com/kumarhamamatsu",
      "https://www.tripadvisor.com/kumarhamamatsu",
    ],
  };
}

export function generateMenuSchema(menuItems: MenuItem[], locale: string = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: locale === "ja" ? "クマールレストラン メニュー" : "Kumar Restaurant Menu",
    description:
      "Authentic Indian cuisine menu featuring curries, tandoori, biryani, naan breads, and more",
    url: `${BASE_URL}/menu`,
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Appetizers",
        hasMenuItem: menuItems
          .filter((item) => item.category === "appetizers")
          .map((item) => ({
            "@type": "MenuItem",
            name: item.nameEn,
            description: item.description,
            offers: {
              "@type": "Offer",
              price: item.price,
              priceCurrency: "JPY",
            },
            suitableForDiet: item.dietary.includes("vegetarian")
              ? "https://schema.org/VegetarianDiet"
              : item.dietary.includes("vegan")
                ? "https://schema.org/VeganDiet"
                : undefined,
          })),
      },
      {
        "@type": "MenuSection",
        name: "Curries",
        hasMenuItem: menuItems
          .filter((item) => item.category === "curries")
          .map((item) => ({
            "@type": "MenuItem",
            name: item.nameEn,
            description: item.description,
            offers: {
              "@type": "Offer",
              price: item.price,
              priceCurrency: "JPY",
            },
          })),
      },
      {
        "@type": "MenuSection",
        name: "Tandoori",
        hasMenuItem: menuItems
          .filter((item) => item.category === "tandoori")
          .map((item) => ({
            "@type": "MenuItem",
            name: item.nameEn,
            description: item.description,
            offers: {
              "@type": "Offer",
              price: item.price,
              priceCurrency: "JPY",
            },
          })),
      },
      {
        "@type": "MenuSection",
        name: "Biryani & Rice",
        hasMenuItem: menuItems
          .filter((item) => item.category === "biryani")
          .map((item) => ({
            "@type": "MenuItem",
            name: item.nameEn,
            description: item.description,
            offers: {
              "@type": "Offer",
              price: item.price,
              priceCurrency: "JPY",
            },
          })),
      },
      {
        "@type": "MenuSection",
        name: "Naan & Breads",
        hasMenuItem: menuItems
          .filter((item) => item.category === "breads")
          .map((item) => ({
            "@type": "MenuItem",
            name: item.nameEn,
            description: item.description,
            offers: {
              "@type": "Offer",
              price: item.price,
              priceCurrency: "JPY",
            },
          })),
      },
      {
        "@type": "MenuSection",
        name: "Desserts",
        hasMenuItem: menuItems
          .filter((item) => item.category === "desserts")
          .map((item) => ({
            "@type": "MenuItem",
            name: item.nameEn,
            description: item.description,
            offers: {
              "@type": "Offer",
              price: item.price,
              priceCurrency: "JPY",
            },
          })),
      },
      {
        "@type": "MenuSection",
        name: "Beverages",
        hasMenuItem: menuItems
          .filter((item) => item.category === "beverages")
          .map((item) => ({
            "@type": "MenuItem",
            name: item.nameEn,
            description: item.description,
            offers: {
              "@type": "Offer",
              price: item.price,
              priceCurrency: "JPY",
            },
          })),
      },
    ],
  };
}

export function generateArticleSchema(post: BlogPost, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[locale as "en" | "ja"],
    description: post.excerpt[locale as "en" | "ja"],
    image: `${BASE_URL}${post.image}`,
    url: `${BASE_URL}/${locale}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Kumar Restaurant",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logos/cropped-KumarLogo1-2-1-300x143.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${locale}/blog/${post.slug}`,
    },
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Binay Kumar",
    jobTitle: "Founder & Head Chef",
    worksFor: {
      "@type": "Restaurant",
      name: "Kumar Restaurant",
      url: BASE_URL,
    },
    description:
      "Founder of Kumar Restaurant, a celebrated Indian chef known for authentic cuisine and G7 Summit catering.",
    knowsAbout: ["Indian Cuisine", "Spice Blending", "Restaurant Management"],
    award: ["G7 Summit Caterer 2023"],
  };
}

export function generateEventSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Wedding Catering Service",
    provider: {
      "@type": "Restaurant",
      name: "Kumar Restaurant",
      url: BASE_URL,
    },
    description:
      "Professional Indian wedding catering services in Hamamatsu, Japan. Customized menus for 50-500+ guests.",
    areaServed: {
      "@type": "City",
      name: "Hamamatsu",
    },
    serviceType: "Wedding Catering",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wedding Menu Options",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Buffet Catering",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Seated Dinner Service",
          },
        },
      ],
    },
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export function generateLocalBusinessSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kumar Restaurant",
    alternateName: locale === "ja" ? "クマールレストラン" : undefined,
    image: `${BASE_URL}/images/about/site-image.jpg`,
    url: BASE_URL,
    telephone: "+81-53-451-0154",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Act Tower B1, Itayamachi",
      addressLocality: "Hamamatsu",
      addressRegion: "Shizuoka",
      postalCode: "430-8588",
      addressCountry: "JP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.7037,
      longitude: 137.7283,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "11:00",
        closes: "15:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "17:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "11:00",
        closes: "22:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "168",
      bestRating: "5",
    },
  };
}
