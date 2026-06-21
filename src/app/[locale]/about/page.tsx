"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { Button } from "@/components";
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
  ArrowRight,
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

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 20 } },
};

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

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" as const }}
        >
          <img
            src="/images/about/site-image.jpg"
            alt="Kumar Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
            >
              {locale === "en" ? "About Kumar Restaurant" : "クマールレストランについて"}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as const }}
            >
              {locale === "en"
                ? "Learn more about Kumar Restaurant, the first Indian restaurant in Hamamatsu, Japan."
                : "日本初のインドレストラン、クマールレストランについて詳しくご紹介します。"}
            </motion.p>
          </div>
        </div>
      </section>

      {/* OUR RESTAURANT SECTION */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" as const }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight">
                {locale === "en"
                  ? "Our Restaurant Is A Collective Of Amazing People Striving To Build Delightful Indian Cuisine"
                  : "素晴らしい人々が集い、おいしいインド料理を作り上げるレストラン"}
              </h2>
              <div className="prose prose-lg text-charcoal/80 space-y-4">
                <p>
                  {locale === "en"
                    ? "Kumar Restaurant is located in Act Tower, the heart of Hamamatsu City, serving authentic Indian cuisine. As soon as you step into Kumar Restaurant, you will be greeted by Mr. Binay Kumar, the owner of the establishment and his friendly staff. More than just a restaurant this place is an abode of Indian culture and tradition. The restaurant grinds fresh spices every morning to serve you the best of its flavor and aroma!"
                    : "クマールレストランは浜松市の中心、アクトタワーにあり、本格的なインド料理を提供しています。クマールレストランに入ると、オーナーのビナイ・クマール氏と彼のフレンドリーなスタッフに出迎えられます。レストランというだけでなく、インドの文化と伝統の居場所です。毎朝新鮮なスパイスを挽いて、最高の風味と香りを提供しています！"}
                </p>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" as const }}
            >
              <img
                src="/images/about/AboutUs.png"
                alt="Kumar Restaurant Interior"
                className="rounded-xl shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUR TEAM SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-charcoal mb-4"
              >
                {locale === "en" ? "Our Team" : "私たちのチーム"}
              </motion.h2>
              <motion.img
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                src="/images/decorative/frill-free-img.png"
                alt=""
                className="w-32 mb-6"
              />
              <motion.p
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="text-lg text-charcoal/80 mb-6"
              >
                {locale === "en"
                  ? "Mr. Binay Kumar (Owner) - Mr. Binay Kumar is highly respected in the Hamamatsu and Japanese communities for his exceptional integrity, dedication, and talent. His contributions to the community are widely recognized and deeply appreciated."
                  : "ビナイ・クマール氏（オーナー）- ビナイ・クマール氏は、卓越した誠実さ、献身、才能により、浜松および日本のコミュニティから高く尊敬されています。コミュニティへの貢献は広く認識され、深く感謝されています。"}
              </motion.p>
              <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                <Link href={`/${locale}/about/binay-kumar`}>
                  <Button variant="primary" size="lg">
                    {locale === "en" ? "Know Mr. Binay Kumar" : "ビナイ・クマール氏を知る"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring" as const, stiffness: 200, damping: 20 }}
            >
              <img
                src="/images/about/Serving-chef.jpg"
                alt="Mr. Binay Kumar"
                className="rounded-xl shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* RESTAURANT AMENITIES SECTION */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {locale === "en" ? "Restaurant Amenities" : "レストランの設備"}
            </h2>
          </div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="w-14 h-14 bg-saffron/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-saffron/40 transition-colors">
                  <amenity.icon className="w-7 h-7 text-saffron" />
                </div>
                <span className="font-semibold text-charcoal">
                  {locale === "en" ? amenity.label : amenity.labelJa}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {locale === "en" ? "Gallery" : "ギャラリー"}
            </h2>
            <p className="text-lg text-charcoal/70 max-w-3xl mx-auto">
              {locale === "en"
                ? "It's an honor that we could meet such highly noted personalities through our food over several years."
                : "何年もの间、料理を通じて著名な方々とお会いできたことを光栄に思います。"}
            </p>
          </div>
          <motion.div
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <motion.div
                  className="relative overflow-hidden rounded-xl shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">{image.caption}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-saffron transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 text-white hover:text-saffron transition-colors z-10"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 text-white hover:text-saffron transition-colors z-10"
            >
              <ChevronRight className="w-12 h-12" />
            </button>
            <motion.div
              className="max-w-4xl max-h-[80vh] px-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
            >
              <img
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <p className="text-white text-center mt-4 text-lg">
                {galleryImages[currentImageIndex].caption}
              </p>
              <p className="text-white/50 text-center mt-1 text-sm">
                {currentImageIndex + 1} / {galleryImages.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RECOMMENDED BY SECTION */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {locale === "en" ? "Recommended By" : "おすすめ"}
            </h2>
          </div>
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {recommendedBy.map((platform, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.15 }}
                className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
              >
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="h-12 md:h-16 object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FOOTER / CTA SECTION */}
      <section className="py-16 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/images/decorative/old-typical-phone.png"
              alt="Phone"
              className="w-16 h-16"
            />
          </motion.div>
          <motion.img
            src="/images/logos/cropped-KumarLogo1-2-1-300x143.png"
            alt="Kumar Restaurant Logo"
            className="h-16 mx-auto mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
          <motion.p
            className="text-xl md:text-2xl font-semibold mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {locale === "en"
              ? "Call for All Your Reservations: 053-451-0154"
              : "ご予約はお電話で: 053-451-0154"}
          </motion.p>
          <motion.a
            href="tel:053-451-0154"
            className="text-saffron hover:text-saffron/80 transition-colors text-lg font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            053-451-0154
          </motion.a>
          <motion.div
            className="mt-8 pt-8 border-t border-white/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Kumar Restaurant. All rights reserved.
            </p>
            <p className="text-white/40 text-xs mt-2">
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
