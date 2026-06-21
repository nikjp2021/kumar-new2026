"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { Button, Card, CardContent } from "@/components";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generatePersonSchema } from "@/lib/schema";
import {
  MapPin,
  Phone,
  CreditCard,
  Users,
  Ban,
  Car,
  Quote,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Globe,
  Heart,
  Award,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const galleryImages = [
  { src: "/images/about/AboutUs.png", alt: "Kumar Restaurant Interior" },
  { src: "/images/about/Red-wine-img.jpg", alt: "Wine Selection" },
  { src: "/images/about/Serving-chef.jpg", alt: "Chef Serving" },
  { src: "/images/about/dine-out.jpg", alt: "Dining Experience" },
  { src: "/images/about/site-image.jpg", alt: "Restaurant Exterior" },
  { src: "/images/about/KumarSan.jpg", alt: "Mr. Binay Kumar" },
];

const amenities = [
  { icon: CreditCard, label: "Credit Card Accepted", labelJa: "クレジットカード対応" },
  { icon: Users, label: "Family Dining", labelJa: "ファミリーダイニング" },
  { icon: Ban, label: "Non-Smoking", labelJa: "禁煙" },
  { icon: Car, label: "Parking Available", labelJa: "駐車場あり" },
];

const recognitionPlatforms = [
  { name: "TripAdvisor", logo: "/images/social/tripadvisor.png" },
  { name: "Google", logo: "/images/social/google.png" },
  { name: "Facebook", logo: "/images/social/facebook.png" },
  { name: "Twitter", logo: "/images/social/twitter.png" },
  { name: "Yelp", logo: "/images/social/yelp.png" },
];

export default function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const baseUrl = "https://kumarhamamatsu.com";

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = `${baseUrl}/en/about`;

    const existingTags = document.querySelectorAll('link[data-hreflang]');
    existingTags.forEach(tag => tag.remove());

    const enLink = document.createElement("link");
    enLink.rel = "alternate";
    enLink.hreflang = "en";
    enLink.href = `${baseUrl}/en/about`;
    enLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(enLink);

    const jaLink = document.createElement("link");
    jaLink.rel = "alternate";
    jaLink.hreflang = "ja";
    jaLink.href = `${baseUrl}/ja/about`;
    jaLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(jaLink);

    const xDefaultLink = document.createElement("link");
    xDefaultLink.rel = "alternate";
    xDefaultLink.hreflang = "x-default";
    xDefaultLink.href = `${baseUrl}/en/about`;
    xDefaultLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(xDefaultLink);

    return () => {
      const tags = document.querySelectorAll('link[data-hreflang]');
      tags.forEach(tag => tag.remove());
    };
  }, []);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div>
      <SchemaMarkup data={generatePersonSchema()} />
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about/site-image.jpg"
            alt="Kumar Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {locale === "en" ? "About Kumar Restaurant" : "クマールレストランについて"}
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              {locale === "en"
                ? "Authentic Indian Cuisine in Hamamatsu Since 1995"
                : "1995年から浜松で本格的なインド料理を"}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
                {locale === "en" ? "Our Story" : "私たちの物語"}
              </h2>
              <div className="prose prose-lg text-charcoal/80 space-y-4">
                <p>
                  Since 1995, Kumar Restaurant has been Hamamatsu&apos;s gateway to authentic Indian cuisine. Our journey began when Mr. Binay Kumar, a passionate chef from India, arrived in Japan with a dream of sharing the rich flavors of his homeland with the people of Hamamatsu.
                </p>
                <p>
                  Starting a restaurant in a foreign land was no easy feat. In the mid-1990s, Indian cuisine was still relatively unknown in Japan. Mr. Kumar faced numerous challenges—from sourcing authentic spices and ingredients to introducing unfamiliar flavors to Japanese palates. Many doubted that a small Indian restaurant could thrive in a city dominated by traditional Japanese cuisine.
                </p>
                <p>
                  Undeterred by these obstacles, Mr. Kumar persevered. He spent countless hours perfecting his recipes, adapting traditional dishes to suit local tastes while maintaining the authenticity that makes Indian food so special. He built relationships with local suppliers, imported spices directly from India, and slowly won over the hearts—and taste buds—of Hamamatsu residents.
                </p>
                <p>
                  Over the past 30 years, Kumar Restaurant has grown from a small family-run establishment into a beloved institution in Hamamatsu. We have proudly served thousands of families, couples, and friends, creating memories over plates of our signature dishes. What started as one man&apos;s dream has become a culinary landmark that bridges Indian and Japanese cultures through the universal language of food.
                </p>
                <p>
                  Today, we continue to honor Mr. Kumar&apos;s original vision: to bring genuine Indian hospitality and flavors to every guest who walks through our doors. Our recipes have been passed down through generations, and our commitment to quality remains as strong as ever.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/about/KumarSan.jpg"
                alt="Mr. Binay Kumar"
                className="rounded-xl shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-saffron text-charcoal px-6 py-3 rounded-xl font-bold text-lg shadow-lg">
                {locale === "en" ? "Est. 1995" : "1995年創業"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mr. Binay Kumar Feature Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-saffron" />
                <span className="text-saffron font-semibold uppercase tracking-wider text-sm">
                  {locale === "en" ? "Meet Our Founder" : "創業者紹介"}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
                {locale === "en" ? "Mr. Binay Kumar" : "ビナイ・クマール"}
              </h2>
              <p className="text-lg text-charcoal/80 mb-6">
                Mr. Binay Kumar is highly respected in the Hamamatsu and Japanese communities for his exceptional integrity, dedication, and talent. His passion for authentic Indian cuisine and unwavering commitment to excellence has made Kumar Restaurant a cornerstone of Hamamatsu&apos;s culinary scene.
              </p>
              <div className="bg-cream rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-saffron/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-saffron" />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal mb-2">
                      {locale === "en" ? "G7 Summit 2023" : "G7サミット 2023"}
                    </h3>
                    <p className="text-charcoal/70">
                      {locale === "en"
                        ? "In 2023, Mr. Kumar was honored to cater for world leaders at the G7 Summit in Kyoto. This prestigious recognition is a testament to his culinary excellence and the authentic flavors that have made Kumar Restaurant famous."
                        : "2023年、クマール氏は京都で開催されたG7サミットで世界の指導者们的料理を提供する荣誉に浴しました。この著名な認可は、彼の料理の卓越性とクマールレストランを有名にした本格的な味の証です。"}
                    </p>
                  </div>
                </div>
              </div>
              <Link href="/about/binay-kumar">
                <Button variant="primary" size="lg">
                  {locale === "en" ? "Read Full Story" : "全ストーリーを読む"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="/images/about/Serving-chef.jpg"
                alt="Mr. Binay Kumar Serving"
                className="rounded-xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {locale === "en" ? "Our Values" : "私たちの価値観"}
            </h2>
            <p className="text-lg text-charcoal/70">
              {locale === "en"
                ? "The principles that guide everything we do"
                : "私たちの行動を導く原則"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover className="text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-forest/20 rounded-full flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-forest" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  {locale === "en" ? "Fresh Spices Daily" : "毎日の新鮮なスパイス"}
                </h3>
                <p className="text-charcoal/70">
                  {locale === "en"
                    ? "We grind our spices every morning for maximum flavor and authenticity in every dish."
                    : "毎朝スパイスを挽き、すべての料理に最大限の風味と本格さを提供します。"}
                </p>
              </CardContent>
            </Card>

            <Card hover className="text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-saffron/20 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-saffron" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  {locale === "en" ? "Cultural Bridge" : "文化の架け橋"}
                </h3>
                <p className="text-charcoal/70">
                  {locale === "en"
                    ? "Connecting Indian and Japanese cultures through the universal language of food."
                    : "食という普遍的な言語を通じて、インドと日本の文化をつなげます。"}
                </p>
              </CardContent>
            </Card>

            <Card hover className="text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-red/20 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-red" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  {locale === "en" ? "Community First" : "コミュニティ優先"}
                </h3>
                <p className="text-charcoal/70">
                  {locale === "en"
                    ? "Proudly serving Hamamatsu for over 30 years with warmth and hospitality."
                    : "温かさとおもてなしで30年以上浜松にサービスを提供しています。"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Restaurant Amenities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {locale === "en" ? "Restaurant Amenities" : "レストランの設備"}
            </h2>
            <p className="text-lg text-charcoal/70">
              {locale === "en"
                ? "Everything you need for a comfortable dining experience"
                : "快適な食事体験に必要なすべて"}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-cream rounded-xl"
              >
                <div className="w-14 h-14 bg-saffron/20 rounded-full flex items-center justify-center mb-4">
                  <amenity.icon className="w-7 h-7 text-saffron" />
                </div>
                <span className="font-semibold text-charcoal">
                  {locale === "en" ? amenity.label : amenity.labelJa}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {locale === "en" ? "Our Gallery" : "ギャラリー"}
            </h2>
            <p className="text-lg text-charcoal/70">
              {locale === "en"
                ? "A glimpse into the Kumar Restaurant experience"
                : "クマールレストランの体験を垣間見る"}
            </p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-xl shadow-md">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-saffron transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-saffron transition-colors"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-saffron transition-colors"
          >
            <ChevronRight className="w-12 h-12" />
          </button>
          <div className="max-w-4xl max-h-[80vh] px-12">
            <img
              src={galleryImages[currentImageIndex].src}
              alt={galleryImages[currentImageIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4">
              {galleryImages[currentImageIndex].alt}
            </p>
          </div>
        </div>
      )}

      {/* Recognition Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {locale === "en" ? "Recognition & Reviews" : "評価とレビュー"}
            </h2>
            <p className="text-lg text-charcoal/70">
              {locale === "en"
                ? "Trusted by diners across multiple platforms"
                : "さまざまなプラットフォームで食客から信頼されています"}
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {recognitionPlatforms.map((platform, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
              >
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="h-12 md:h-16 object-contain"
                />
                <span className="text-sm text-charcoal/60">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Location Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {locale === "en" ? "Our Other Restaurant" : "他のレストラン"}
            </h2>
            <p className="text-lg text-charcoal/70">
              {locale === "en"
                ? "Kumar-san's Curry - Another taste of India in Hamamatsu"
                : "クマールさんのカレー - 浜松でもう一つのインドの味"}
            </p>
          </div>
          <Card hover className="max-w-2xl mx-auto">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold text-charcoal mb-6 text-center">
                {locale === "en" ? "Kumar-san's Curry" : "クマールさんのカレー"}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-saffron mt-0.5 flex-shrink-0" />
                  <span className="text-charcoal/80">
                    432-0041 Hamamatsu, Kita-ku, Higashiguchi 2861, Sun Street Hamakita 1F
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-saffron flex-shrink-0" />
                  <a
                    href="tel:053-586-8339"
                    className="text-charcoal/80 hover:text-saffron transition-colors"
                  >
                    053-586-8339
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === "en" ? "Visit Us Today" : "ぜひご来店ください"}
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            {locale === "en"
              ? "Experience the authentic flavors of India at Kumar Restaurant. We look forward to welcoming you."
              : "クマールレストランで本格的なインド料理をお楽しみください。皆様のご来店をお待ちしております。"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                {locale === "en" ? "Reserve a Table" : "予約する"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-saffron" />
              <a
                href="tel:053-586-8339"
                className="text-xl font-semibold hover:text-saffron transition-colors"
              >
                053-586-8339
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
