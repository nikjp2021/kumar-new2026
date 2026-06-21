import type { Metadata } from "next";

const BASE_URL = "https://kumarhamamatsu.com";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: "website" | "article";
  locale?: string;
}

export function generateMetadata({
  title,
  description,
  image = "/images/about/site-image.jpg",
  url,
  type = "website",
  locale = "en",
}: SEOProps): Metadata {
  const fullUrl = `${BASE_URL}${url}`;
  const fullImage = image.startsWith("http") ? image : `${BASE_URL}${image}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "Kumar Restaurant",
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === "ja" ? "ja_JP" : "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImage],
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        en: `${BASE_URL}/en${url.replace(/^\/ja/, "")}`,
        ja: `${BASE_URL}/ja${url.replace(/^\/en/, "")}`,
      },
    },
  };
}
