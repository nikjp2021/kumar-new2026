"use client";

import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generatePersonSchema } from "@/lib/schema";
import {
  MapPin,
  Phone,
  CreditCard,
  Users,
  Ban,
  Car,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const galleryImages = [
  { src: "/images/about/AboutUs.png", alt: "Kumar Restaurant Interior", caption: "Restaurant Interior" },
  { src: "/images/about/KumarSan.jpg", alt: "Mr. Binay Kumar", caption: "Mr. Binay Kumar" },
  { src: "/images/about/Red-wine-img.jpg", alt: "Wine Selection", caption: "Wine Selection" },
  { src: "/images/about/Serving-chef.jpg", alt: "Chef Serving", caption: "Chef Serving" },
  { src: "/images/about/dine-out.jpg", alt: "Dining Experience", caption: "Dining Experience" },
  { src: "/images/about/site-image.jpg", alt: "Restaurant Exterior", caption: "Restaurant Exterior" },
  { src: "/images/about/113.png", alt: "Kumar Restaurant", caption: "Kumar Restaurant" },
  { src: "/images/about/image-1698146736.jpg", alt: "Kumar Restaurant Photo", caption: "Kumar Restaurant" },
  { src: "/images/about/image-1698146927.jpg", alt: "Kumar Restaurant Photo", caption: "Kumar Restaurant" },
  { src: "/images/about/Serving-chef-owcre1sm9n7ysujexuahw9245a7wb87bmmf02yig40.jpg", alt: "Chef Serving", caption: "Chef Serving" },
  { src: "/images/about/クマールMain-rotated.jpg", alt: "Kumar Restaurant Main", caption: "Kumar Restaurant Main" },
];

const amenities = [
  { icon: CreditCard, label: "Credit Card Accepted", labelJa: "クレジットカード対応" },
  { icon: Users, label: "Family Dining", labelJa: "ファミリーダイニング" },
  { icon: Ban, label: "Non-Smoking", labelJa: "禁煙" },
  { icon: Car, label: "Parking", labelJa: "駐車場あり" },
];

const recommendedBy = [
  { name: "TripAdvisor", logo: "/images/social/tripadvisorlogo1-free-img.png" },
  { name: "Yelp", logo: "/images/social/yelp-free-img.png" },
  { name: "Google Reviews", logo: "/images/social/google-reviews-free-img.png" },
  { name: "Facebook", logo: "/images/social/fb-free-imng.png" },
  { name: "Twitter", logo: "/images/social/tweet-free-img.png" },
];

export default function AboutPage() {
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
    canonicalLink.href = `${baseUrl}/${locale}/about`;
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
  }, [locale]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = () => setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  const nextImage = () => setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));

  return (
    <div className="bg-cream">
      <SchemaMarkup data={generatePersonSchema()} />

      {/* HERO */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" as const }}
        >
          <img
            src="/images/about/site-image.jpg"
            alt="Kumar Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal/80 via-charcoal/60 to-burgundy/30" />
          <div className="absolute inset-0 noise-overlay" />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" as const }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-gold" />
              <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">
                {locale === "en" ? "Est. 1995" : "1995年創業"}
              </span>
              <span className="w-12 h-[2px] bg-gold" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1] tracking-tight">
              {locale === "en" ? (
                <>About <span className="text-gradient">Kumar</span> Restaurant</>
              ) : (
                <>クマールレストラン<span className="text-gradient">について</span></>
              )}
            </h1>
            <p className="font-sans text-xl md:text-2xl text-white/80 max-w-xl leading-relaxed font-light">
              {locale === "en"
                ? "Hamamatsu's first Indian restaurant, where tradition meets warmth since 1995."
                : "1995年以来、伝統と温かさが出会う浜松初のインドレストラン。"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR RESTAURANT */}
      <section className="py-24 bg-cream pattern-overlay relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-gold" />
                <span className="text-gold font-sans text-xs tracking-[0.25em] uppercase">
                  {locale === "en" ? "Our Story" : "私たちの物語"}
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-charcoal mb-8 leading-tight">
                {locale === "en" ? (
                  <>A Collective of Amazing People, One <span className="text-gradient">Delightful</span> Cuisine</>
                ) : (
                  <>素晴らしい人々が集い、<span className="text-gradient">おいしい</span>インド料理を</>
                )}
              </h2>
              <div className="space-y-5">
                <p className="font-sans text-charcoal/75 leading-relaxed text-lg">
                  {locale === "en"
                    ? "Kumar Restaurant is located in Act Tower, the heart of Hamamatsu City, serving authentic Indian cuisine. As soon as you step in, you will be greeted by Mr. Binay Kumar, the owner, and his friendly staff."
                    : "クマールレストランは浜松市の中心、アクトタワーにあり、本格的なインド料理を提供しています。入ると、オーナーのビナイ・クマール氏とフレンドリーなスタッフに出迎えられます。"}
                </p>
                <p className="font-sans text-charcoal/75 leading-relaxed text-lg">
                  {locale === "en"
                    ? "More than just a restaurant, this place is an abode of Indian culture and tradition. We grind fresh spices every morning to serve you the best of flavor and aroma."
                    : "レストランというだけでなく、インドの文化と伝統の居場所です。毎朝新鮮なスパイスを挽いて、最高の風味と香りを提供しています。"}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-8">
                <Link
                  href={`/${locale}/about/binay-kumar`}
                  className="inline-flex items-center gap-2 font-sans text-saffron hover:text-burgundy transition-colors font-medium group"
                >
                  {locale === "en" ? "Meet Mr. Binay Kumar" : "ビナイ・クマール氏に会う"}
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" as const }}
            >
              <div className="relative">
                <div className="absolute -inset-3 border-2 border-gold/30 rounded-2xl" />
                <div className="absolute -inset-6 border border-gold/15 rounded-3xl" />
                <img
                  src="/images/about/AboutUs.png"
                  alt="Kumar Restaurant Interior"
                  className="rounded-xl shadow-2xl w-full relative z-10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUR TEAM */}
      <section className="py-24 bg-burgundy noise-overlay relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 pattern-overlay" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-gold/60" />
                <span className="text-gold font-sans text-xs tracking-[0.25em] uppercase">
                  {locale === "en" ? "Leadership" : "リーダーシップ"}
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                {locale === "en" ? (
                  <>Meet <span className="text-gold">Mr. Binay Kumar</span></>
                ) : (
                  <>ビナイ・クマール氏<span className="text-gold">に会う</span></>
                )}
              </h2>
              <p className="font-sans text-white/80 leading-relaxed text-lg mb-6">
                {locale === "en"
                  ? "Mr. Binay Kumar (Owner) — Highly respected in the Hamamatsu and Japanese communities for his exceptional integrity, dedication, and talent. His contributions to the community are widely recognized and deeply appreciated."
                  : "ビナイ・クマール氏（オーナー）— 卓越した誠実さ、献身、才能により、浜松および日本のコミュニティから高く尊敬されています。コミュニティへの貢献は広く認識され、深く感謝されています。"}
              </p>
              <Link
                href={`/${locale}/about/binay-kumar`}
                className="inline-flex items-center gap-2 font-sans text-gold hover:text-gold-light transition-colors font-medium group"
              >
                {locale === "en" ? "Learn More" : "詳しく見る"}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
            <motion.div
              className="order-1 lg:order-2 flex justify-center"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring" as const, stiffness: 180, damping: 20 }}
            >
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-full border-4 border-gold/40 overflow-hidden shadow-2xl">
                  <img
                    src="/images/about/Serving-chef.jpg"
                    alt="Mr. Binay Kumar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gold rounded-full flex items-center justify-center shadow-lg">
                  <span className="font-display text-burgundy text-xl font-bold">G7</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="py-24 bg-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-16 h-[1px] bg-gold/40" />
              <span className="text-gold font-sans text-xs tracking-[0.25em] uppercase">
                {locale === "en" ? "Amenities" : "設備"}
              </span>
              <span className="w-16 h-[1px] bg-gold/40" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal">
              {locale === "en" ? "Restaurant Amenities" : "レストランの設備"}
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
            }}
          >
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center p-8 bg-white rounded-xl border border-gold/10 hover:border-gold/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-cream border border-gold/20 flex items-center justify-center mb-5">
                  <amenity.icon className="w-7 h-7 text-gold" />
                </div>
                <span className="font-sans font-medium text-charcoal text-sm">
                  {locale === "en" ? amenity.label : amenity.labelJa}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-16 h-[1px] bg-gold/40" />
              <span className="text-gold font-sans text-xs tracking-[0.25em] uppercase">
                {locale === "en" ? "Gallery" : "ギャラリー"}
              </span>
              <span className="w-16 h-[1px] bg-gold/40" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4">
              {locale === "en" ? "Inside Kumar" : "クマールの中"}
            </h2>
            <p className="font-sans text-charcoal/60 max-w-2xl mx-auto text-lg">
              {locale === "en"
                ? "A glimpse into the world of Kumar Restaurant."
                : "クマールレストランの世界を覗いてみましょう。"}
            </p>
          </motion.div>
          <motion.div
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <motion.div
                  className="relative overflow-hidden rounded-xl shadow-md"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.35 }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400 translate-y-2 group-hover:translate-y-0">
                    <p className="font-sans text-white text-sm font-medium">{image.caption}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-gold transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-8 text-white/70 hover:text-gold transition-colors z-10"
            >
              <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-8 text-white/70 hover:text-gold transition-colors z-10"
            >
              <ChevronRight className="w-10 h-10 md:w-12 md:h-12" />
            </button>
            <motion.div
              className="max-w-5xl max-h-[85vh] px-16"
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
            >
              <img
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-center">
                <p className="font-display text-white text-xl">{galleryImages[currentImageIndex].caption}</p>
                <p className="font-sans text-gold/70 text-sm mt-1">
                  {currentImageIndex + 1} / {galleryImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RECOMMENDED BY */}
      <section className="py-24 bg-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-16 h-[1px] bg-gold/40" />
              <span className="text-gold font-sans text-xs tracking-[0.25em] uppercase">
                {locale === "en" ? "Recommended By" : "おすすめ"}
              </span>
              <span className="w-16 h-[1px] bg-gold/40" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal">
              {locale === "en" ? "Trusted Worldwide" : "世界から信頼"}
            </h2>
          </motion.div>
          <motion.div
            className="flex flex-wrap justify-center items-center gap-10 md:gap-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {recommendedBy.map((platform, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 15 } },
                }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border border-gold/15 hover:border-gold/40 hover:shadow-md transition-all duration-300 p-3"
              >
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal noise-overlay relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.img
            src="/images/logos/cropped-KumarLogo1-2-1-300x143.png"
            alt="Kumar Restaurant Logo"
            className="h-14 mx-auto mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="font-sans text-white/60 text-sm tracking-widest uppercase mb-4">
              {locale === "en" ? "For Reservations" : "ご予約はこちら"}
            </p>
            <a
              href="tel:053-451-0154"
              className="font-display text-4xl md:text-5xl text-gold hover:text-gold-light transition-colors"
            >
              053-451-0154
            </a>
          </motion.div>
          <motion.div
            className="mt-12 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="font-sans text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Kumar Restaurant. All rights reserved.
            </p>
            <p className="font-sans text-white/25 text-xs mt-2">
              {locale === "en"
                ? "Authentic Indian Cuisine in Hamamatsu Since 1995"
                : "1995年から浜松で本格的なインド料理を"}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
