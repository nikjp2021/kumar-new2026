"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Phone } from "lucide-react";

const seasonalMenuImages = [
  { src: "/images/menu/H26春_クマールパーティー.jpg", alt: "Spring Party 2014" },
  { src: "/images/menu/H28%E7%A7%8B_%E3%82%AF%E3%83%9E%E3%83%BC%E3%83%AB%E3%83%91%E3%83%BC%E3%83%86%E3%82%A3%E3%83%BC.jpg", alt: "Autumn Party Menu 2016" },
  { src: "/images/menu/H31%E6%98%A5_%E3%82%AF%E3%83%9E%E3%83%BC%E3%83%AB_%E3%83%91%E3%83%B3%E3%83%95%E2%91%A4-1024x683.jpg", alt: "Spring Lunch 1 2019" },
  { src: "/images/menu/H31%E6%98%A5_%E3%82%AF%E3%83%9E%E3%83%BC%E3%83%AB_%E3%83%91%E3%83%B3%E3%83%95%E2%91%A5-1024x683.jpg", alt: "Spring Lunch 2 2019" },
  { src: "/images/menu/H31%E6%98%A5_%E3%82%AF%E3%83%9E%E3%83%BC%E3%83%AB_%E3%83%91%E3%83%B3%E3%83%95%E2%91%A7-1024x683.jpg", alt: "Spring Lunch 3 2019" },
  { src: "/images/menu/H31%E6%98%A5_%E3%82%AF%E3%83%9E%E3%83%BC%E3%83%AB_%E3%83%91%E3%83%B3%E3%83%95%E2%91%A8-1024x683.jpg", alt: "Spring Lunch 4 2019" },
  { src: "/images/menu/28%E5%B9%B4%E5%BA%A6%E5%86%AC%E3%80%80%E3%82%AF%E3%83%9E%E3%83%BC%E3%83%AB%E3%80%80%E3%83%9B%E3%83%AA%E3%83%87%E3%83%BC%E3%83%A9%E3%83%B3%E3%83%81.jpg", alt: "Holiday Lunch 2016" },
  { src: "/images/menu/29%E5%A4%8F_%E3%82%AF%E3%83%9E%E3%83%BC%E3%83%AB_%E5%B9%B3%E6%97%A5%E3%83%A9%E3%83%B3%E3%83%81.jpg", alt: "Summer Lunch 2017" },
  { src: "/images/menu/%E3%82%AF%E3%83%9E%E3%83%BC%E3%83%AB%E3%80%80%EF%BC%A828%E7%A7%8B%E2%91%A0.jpg", alt: "Autumn Menu 2016" },
];

const delicacyImages = [
  { src: "/images/food/india-indian-indian-food-1481500-1024x682.jpg", name: "Samosa", nameJa: "サモサ" },
  { src: "/images/food/india-indian-indian-food-1481494-1024x682.jpg", name: "Tandoori Chicken", nameJa: "タンドーリチキン" },
  { src: "/images/food/chole_bhature.jpg", name: "Chole Bhature", nameJa: "チョーレ バチューレ" },
  { src: "/images/food/paneer-tikka-cheese-seek-4929034-1024x682.jpg", name: "Paneer Tikka", nameJa: "パニールティッカ" },
  { src: "/images/food/skewer-kebab-barbecue-3370443-1024x679.jpg", name: "Kebab", nameJa: "ケバブ" },
  { src: "/images/food/veg_manchurian-1024x498.jpg", name: "Veg Manchurian", nameJa: "ベジ マンチュリアン" },
];

const allMenuImages = [
  "/images/menu/1-1-150x150.png",
  "/images/menu/2-1-150x150.png",
  "/images/menu/3-1-150x150.png",
  "/images/menu/4-1-150x150.png",
  "/images/menu/5-1-150x150.png",
  "/images/menu/6-1-150x150.png",
  "/images/menu/7-1-150x150.png",
  "/images/menu/8-1-150x150.png",
  "/images/menu/9-1-150x150.png",
  "/images/menu/10-1-150x150.png",
  "/images/menu/1-150x150.png",
  "/images/menu/2-150x150.png",
];

const takeoutImages = [
  "/images/menu/1-150x150.png",
  "/images/menu/2-150x150.png",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
} as const;

const rowContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
} as const;

const gridItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 14 },
  },
} as const;

export default function MenuPage() {
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isJa = locale === "ja";

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const baseUrl = "https://kumarhamamatsu.com";
    const canonicalPath = `/en/menu`;

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = `${baseUrl}${canonicalPath}`;

    const existingTags = document.querySelectorAll('link[data-hreflang]');
    existingTags.forEach(tag => tag.remove());

    const enLink = document.createElement("link");
    enLink.rel = "alternate";
    enLink.hreflang = "en";
    enLink.href = `${baseUrl}/en/menu`;
    enLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(enLink);

    const jaLink = document.createElement("link");
    jaLink.rel = "alternate";
    jaLink.hreflang = "ja";
    jaLink.href = `${baseUrl}/ja/menu`;
    jaLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(jaLink);

    const xDefaultLink = document.createElement("link");
    xDefaultLink.rel = "alternate";
    xDefaultLink.hreflang = "x-default";
    xDefaultLink.href = `${baseUrl}/en/menu`;
    xDefaultLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(xDefaultLink);

    return () => {
      const tags = document.querySelectorAll('link[data-hreflang]');
      tags.forEach(tag => tag.remove());
    };
  }, []);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const navigateLightbox = useCallback((direction: "prev" | "next") => {
    if (lightboxIndex === null) return;
    if (direction === "next") {
      setLightboxIndex((lightboxIndex + 1) % allMenuImages.length);
    } else {
      setLightboxIndex((lightboxIndex - 1 + allMenuImages.length) % allMenuImages.length);
    }
  }, [lightboxIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, navigateLightbox]);

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden noise-overlay">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/about/dine-out.jpg)" }}
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" as const }}
          viewport={{ once: true }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/85" />
        <div className="absolute inset-0 pattern-overlay opacity-30" />

        <motion.div
          className="absolute top-8 right-8 md:top-12 md:right-12 opacity-15 pointer-events-none"
          initial={{ rotate: -15, opacity: 0, scale: 0.8 }}
          whileInView={{ rotate: 5, opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" as const }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/decorative/frill-free-img.png"
            alt=""
            width={220}
            height={220}
          />
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-8 md:bottom-12 md:left-12 opacity-10 pointer-events-none"
          initial={{ rotate: 20, opacity: 0, scale: 0.8 }}
          whileInView={{ rotate: 10, opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" as const }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/decorative/leaf-free-img.png"
            alt=""
            width={160}
            height={160}
          />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" as const }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent flex-1 max-w-[120px]" />
              <motion.span
                className="text-gold text-sm font-sans tracking-[0.3em] uppercase"
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {isJa ? "本日のおすすめ" : "Curated with care"}
              </motion.span>
              <div className="h-px bg-gradient-to-r from-gold via-transparent to-transparent flex-1 max-w-[120px]" />
            </div>
          </motion.div>

          <motion.h1
            className="font-display text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-[0.95] tracking-tight"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 70, damping: 14, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {isJa ? "クマールレストラン メニュー" : "Kumar Restaurant Menu"}
          </motion.h1>

          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="h-px bg-gradient-to-r from-transparent to-gold w-16" />
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-gold">
              <path
                d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5L12 2Z"
                fill="currentColor"
                opacity="0.8"
              />
            </svg>
            <div className="h-px bg-gradient-to-l from-transparent to-gold w-16" />
          </motion.div>

          <motion.p
            className="font-sans text-lg md:text-xl text-cream/85 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {isJa
              ? "日本の浜松の中心部に位置するクマールレストランは、本格的なインド料理の灯台です。"
              : "Nestled in the heart of Hamamatsu, Japan, Kumar Restaurant stands as a beacon of authentic Indian cuisine."}
          </motion.p>
        </div>
      </section>

      {/* The Kumar Experience */}
      <section className="py-24 bg-white pattern-overlay relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="h-px bg-gradient-to-r from-transparent to-gold flex-1 max-w-[100px]" />
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-sans">
                {isJa ? "季節の特別メニュー" : "Seasonal Specials"}
              </span>
              <div className="h-px bg-gradient-to-l from-transparent to-gold flex-1 max-w-[100px]" />
            </motion.div>

            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" as const, stiffness: 100, damping: 15 }}
              viewport={{ once: true }}
            >
              {isJa ? "クマール体験" : "The Kumar Experience"}
            </motion.h2>
            <motion.p
              className="font-sans text-lg text-charcoal/60 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {isJa
                ? "伝統的なインド料理と温かいおもてなしをお楽しみください。季節の特别メニューで、新しい味わいをお届けします。"
                : "Savor the warmth of traditional Indian hospitality paired with our carefully crafted seasonal menus. Each season brings new flavors to delight your palate."}
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {seasonalMenuImages.slice(0, 3).map((img, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(107,29,42,0.15)" }}
                onClick={() => openLightbox(i)}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="font-display text-2xl text-white">{img.alt}</p>
                  <div className="w-12 h-0.5 bg-gold mt-2" />
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Indian Delicacies */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative">
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-10 opacity-25 pointer-events-none"
              initial={{ y: -40, opacity: 0, rotate: -10 }}
              whileInView={{ y: 0, opacity: 0.25, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" as const }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/decorative/leaf-free-img.png"
                alt=""
                width={100}
                height={100}
              />
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="h-px bg-gradient-to-r from-transparent to-gold flex-1 max-w-[80px]" />
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-sans">
                {isJa ? "本格の味わい" : "Authentic flavors"}
              </span>
              <div className="h-px bg-gradient-to-l from-transparent to-gold flex-1 max-w-[80px]" />
            </motion.div>

            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" as const, stiffness: 100, damping: 15 }}
              viewport={{ once: true }}
            >
              {isJa ? "インドの美食" : "Indian Delicacies"}
            </motion.h2>
            <motion.p
              className="font-sans text-lg text-charcoal/60 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {isJa
                ? "最高の食材と伝統的な調理法で作られた、本格的なインド料理を味わってください。"
                : "Discover our signature dishes crafted with the finest ingredients and traditional cooking methods passed down through generations."}
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {delicacyImages.map((dish, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={dish.src}
                    alt={isJa ? dish.nameJa : dish.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="relative p-5 text-center">
                  <h3 className="font-display text-xl md:text-2xl text-charcoal group-hover:text-saffron transition-colors duration-300">
                    {isJa ? dish.nameJa : dish.name}
                  </h3>
                  <div className="w-8 h-0.5 bg-gold mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Full Menu Gallery */}
      <section className="py-24 bg-white pattern-overlay relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="h-px bg-gradient-to-r from-transparent to-gold flex-1 max-w-[80px]" />
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-sans">
                {isJa ? "全メニュー" : "Complete offerings"}
              </span>
              <div className="h-px bg-gradient-to-l from-transparent to-gold flex-1 max-w-[80px]" />
            </motion.div>

            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" as const, stiffness: 80, damping: 12 }}
              viewport={{ once: true }}
            >
              {isJa ? "メニュー" : "Our Menu"}
            </motion.h2>
            <motion.p
              className="font-sans text-lg text-charcoal/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {isJa
                ? "メニュー画像をクリックで拡大表示"
                : "Click on any menu image to view full size"}
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5"
            variants={rowContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {allMenuImages.map((src, i) => (
              <motion.button
                key={i}
                variants={gridItemVariants}
                onClick={() => openLightbox(i)}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(107,29,42,0.2)" }}
                className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md cursor-pointer group bg-cream-dark"
              >
                <Image
                  src={src}
                  alt={`Menu page ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 17vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-center pb-4">
                  <span className="text-white text-xs font-sans tracking-wider uppercase bg-charcoal/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {isJa ? "拡大" : "View"}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Takeout Special */}
      <section className="py-24 bg-burgundy noise-overlay relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: "spring" as const, stiffness: 80, damping: 15 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px bg-gradient-to-r from-gold to-transparent flex-1 max-w-[60px]" />
                <span className="text-gold text-xs tracking-[0.3em] uppercase font-sans">
                  {isJa ? "テイクアウト" : "Takeaway"}
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl text-white mb-6 leading-tight">
                {isJa ? "テイクアウト特集" : "Takeout Special"}
              </h2>
              <p className="font-sans text-cream/70 text-lg mb-8 leading-relaxed">
                {isJa
                  ? "お気に入りの料理をお持ち帰りください。テイクアウトで10%割引！"
                  : "Take your favorite dishes to go. Get 10% off on takeout orders!"}
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  { ja: "全メニュー対象", en: "All menu items available for takeout" },
                  { ja: "テイクアウト10%割引", en: "10% discount on takeout orders" },
                  { ja: "電話で事前注文可能", en: "Pre-order by phone available" },
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-4 text-cream/80 font-sans"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                    {isJa ? item.ja : item.en}
                  </motion.li>
                ))}
              </ul>
              <motion.a
                href="tel:053-451-0154"
                className="inline-flex items-center gap-3 bg-gold text-charcoal px-8 py-4 rounded-full font-sans font-semibold hover:bg-gold-light transition-colors duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" as const }}
                >
                  <Phone className="w-5 h-5" />
                </motion.div>
                {isJa ? "今すぐ注文" : "Order Now"}
              </motion.a>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {takeoutImages.map((src, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? 1 : -1 }}
                >
                  <Image
                    src={src}
                    alt={`Takeout menu ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy/40 to-transparent" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="relative bg-charcoal py-20 noise-overlay overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex justify-center mb-8"
              whileHover={{ y: -3 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" as const }}
              >
                <Image
                  src="/images/decorative/old-typical-phone.png"
                  alt="Phone"
                  width={56}
                  height={56}
                  className="opacity-80"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-px bg-gradient-to-r from-transparent to-gold/40 w-12" />
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-sans">
                {isJa ? "ご予約はこちら" : "Reservations"}
              </span>
              <div className="h-px bg-gradient-to-l from-transparent to-gold/40 w-12" />
            </motion.div>

            <motion.a
              href="tel:053-451-0154"
              className="font-display text-4xl md:text-5xl text-saffron hover:text-saffron-light transition-colors duration-300 inline-block mb-8"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
            >
              053-451-0154
            </motion.a>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Image
                src="/images/logos/cropped-KumarLogo1-2-1-300x143.png"
                alt="Kumar Restaurant Logo"
                width={180}
                height={85}
                className="mx-auto mb-6"
              />
            </motion.div>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="font-sans text-white/40 text-sm mb-2">
                {isJa
                  ? `© ${new Date().getFullYear()} クマールレストラン. All rights reserved.`
                  : `© ${new Date().getFullYear()} Kumar Restaurant. All rights reserved.`}
              </p>
              <p className="font-display text-gold/80 text-lg italic">
                {isJa ? "スパイシーな生活を" : "Spice up life at Kumar Restaurant"}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center noise-overlay"
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-gold transition-colors z-10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            <motion.button
              onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
              className="absolute left-4 md:left-8 text-white/70 hover:text-gold transition-colors z-10 p-3"
              whileHover={{ scale: 1.15, x: -4 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 15 }}
            >
              <ChevronLeft className="w-10 h-10" />
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.div
                className="relative max-w-5xl max-h-[90vh] w-full h-full p-4 md:p-8"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: -20 }}
                transition={{ type: "spring" as const, stiffness: 120, damping: 20 }}
                key={lightboxIndex}
              >
                <Image
                  src={allMenuImages[lightboxIndex]}
                  alt={`Menu page ${lightboxIndex + 1}`}
                  fill
                  className="object-contain rounded-lg"
                  sizes="90vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <motion.button
              onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
              className="absolute right-4 md:right-8 text-white/70 hover:text-gold transition-colors z-10 p-3"
              whileHover={{ scale: 1.15, x: 4 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 15 }}
            >
              <ChevronRight className="w-10 h-10" />
            </motion.button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <span className="font-sans text-white/50 text-sm tracking-wider">
                {lightboxIndex + 1} / {allMenuImages.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
