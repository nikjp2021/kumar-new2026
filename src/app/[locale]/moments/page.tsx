"use client";

import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  captionJa: string;
}

const guestsImages: GalleryImage[] = [
  { src: "/images/blog/Screenshot_20201119-125135__01-1024x745.jpg", alt: "Mr. Binay Kumar with guest", caption: "With Distinguished Guest", captionJa: "著名なゲスト様" },
  { src: "/images/blog/Screenshot_20201119-125214-300x274.jpg", alt: "Mr. Binay Kumar with guest", caption: "With Honored Guest", captionJa: "尊敬するゲスト様" },
  { src: "/images/blog/Screenshot_20201119-125314-300x266.jpg", alt: "Mr. Binay Kumar with guest", caption: "With Special Guest", captionJa: "特別ゲスト様" },
  { src: "/images/blog/Screenshot_20201119-125401-768x537.jpg", alt: "Mr. Binay Kumar with guest", caption: "With VIP Guest", captionJa: "VIPゲスト様" },
  { src: "/images/blog/Screenshot_20201119-125444.jpg", alt: "Mr. Binay Kumar with guest", caption: "With Dear Guest", captionJa: "大切なゲスト様" },
  { src: "/images/blog/Screenshot_20201119-125456.jpg", alt: "Mr. Binay Kumar with guest", caption: "With Welcomed Guest", captionJa: "歓迎されたゲスト様" },
  { src: "/images/food/IMG-20201123-WA0002__01-768x762.jpg", alt: "Mr. Kumar with Guests", caption: "Memorable Gathering", captionJa: "忘れられない集い" },
];

const restaurantImages: GalleryImage[] = [
  { src: "/images/about/AboutUs.png", alt: "Kumar Restaurant Interior", caption: "Restaurant Interior", captionJa: "店内風景" },
  { src: "/images/about/dine-out.jpg", alt: "Dining Experience", caption: "Dining Experience", captionJa: "ダイニング体験" },
  { src: "/images/about/site-image.jpg", alt: "Restaurant Exterior", caption: "Restaurant Exterior", captionJa: "レストラン外観" },
  { src: "/images/about/KumarSan.jpg", alt: "Mr. Binay Kumar", caption: "Mr. Binay Kumar", captionJa: "ビナイ・クマー氏" },
  { src: "/images/about/113.png", alt: "Kumar Restaurant", caption: "Kumar Restaurant", captionJa: "クマールレストラン" },
  { src: "/images/about/image-1698146736.jpg", alt: "Kumar Restaurant Photo", caption: "Our Restaurant", captionJa: "私たちのレストラン" },
  { src: "/images/about/image-1698146927.jpg", alt: "Kumar Restaurant Photo", caption: "Restaurant View", captionJa: "レストランの風景" },
  { src: "/images/about/クマールMain-rotated.jpg", alt: "Kumar Restaurant Main", caption: "Kumar Restaurant Main", captionJa: "クマールメイン" },
  { src: "/images/about/Serving-chef.jpg", alt: "Chef Serving", caption: "Chef in Action", captionJa: "料理長" },
  { src: "/images/about/Serving-chef-owcre1sm9n7ysujexuahw9245a7wb87bmmf02yig40.jpg", alt: "Chef Serving", caption: "Dedicated Chef", captionJa: "熱心なシェフ" },
];

const restaurantMomentsImages: GalleryImage[] = [
  { src: "/images/menu/1-2.png", alt: "Kumar Restaurant Moment", caption: "Restaurant Moment", captionJa: "レストランの思い出" },
  { src: "/images/menu/2-2.png", alt: "Kumar Restaurant Moment", caption: "Dining Memory", captionJa: "ダイニングの思い出" },
  { src: "/images/menu/3-2.png", alt: "Kumar Restaurant Moment", caption: "Special Occasion", captionJa: "特別な瞬間" },
  { src: "/images/menu/4-2.png", alt: "Kumar Restaurant Moment", caption: "Guest Experience", captionJa: "お客様の体験" },
  { src: "/images/menu/5-2.png", alt: "Kumar Restaurant Moment", caption: "Memorable Event", captionJa: "忘れられないイベント" },
  { src: "/images/menu/6-2-211x300.png", alt: "Kumar Restaurant Moment", caption: "Festive Moment", captionJa: "お祝いの瞬間" },
  { src: "/images/menu/7-2-205x300.png", alt: "Kumar Restaurant Moment", caption: "Celebration", captionJa: "お祝い" },
  { src: "/images/menu/9-2.png", alt: "Kumar Restaurant Moment", caption: "Restaurant Life", captionJa: "レストランの日常" },
  { src: "/images/menu/10-2.png", alt: "Kumar Restaurant Moment", caption: "Happy Times", captionJa: "幸せな時間" },
  { src: "/images/menu/11.png", alt: "Kumar Restaurant Moment", caption: "Cherished Memory", captionJa: "大切な思い出" },
  { src: "/images/menu/12.png", alt: "Kumar Restaurant Moment", caption: "Special Day", captionJa: "特別な日" },
  { src: "/images/menu/13.png", alt: "Kumar Restaurant Moment", caption: "Wonderful Moment", captionJa: "素晴らしい瞬間" },
  { src: "/images/menu/14.png", alt: "Kumar Restaurant Moment", caption: "Precious Memory", captionJa: "貴重な思い出" },
  { src: "/images/menu/16.png", alt: "Kumar Restaurant Moment", caption: "Joyful Occasion", captionJa: "楽しい出来事" },
  { src: "/images/menu/17.png", alt: "Kumar Restaurant Moment", caption: "Beautiful Memory", captionJa: "美しい思い出" },
  { src: "/images/menu/19.png", alt: "Kumar Restaurant Moment", caption: "Heartfelt Moment", captionJa: "心温まる瞬間" },
  { src: "/images/menu/13-214x300.png", alt: "Kumar Restaurant Moment", caption: "Restaurant Scene", captionJa: "レストランの風景" },
  { src: "/images/menu/17-214x300.png", alt: "Kumar Restaurant Moment", caption: "Dining Scene", captionJa: "食事の風景" },
  { src: "/images/menu/18-209x300.png", alt: "Kumar Restaurant Moment", caption: "Kumar Life", captionJa: "クマールの日常" },
  { src: "/images/menu/21-210x300.png", alt: "Kumar Restaurant Moment", caption: "Restaurant Story", captionJa: "レストランの物語" },
];

const celebrationsImages: GalleryImage[] = [
  { src: "/images/wedding/20231018_212357-1024x942.jpg", alt: "Wedding Celebration", caption: "Wedding Ceremony", captionJa: "結婚式" },
  { src: "/images/wedding/20231018_212407-1024x909.jpg", alt: "Wedding Celebration", caption: "Joyful Moments", captionJa: "幸せな瞬間" },
  { src: "/images/wedding/20231018_212424-1024x665.jpg", alt: "Wedding Celebration", caption: "Celebration", captionJa: "お祝い" },
  { src: "/images/wedding/20231018_212435-1024x766.jpg", alt: "Wedding Celebration", caption: "Special Event", captionJa: "特別なイベント" },
  { src: "/images/wedding/20231018_212449-1024x579.jpg", alt: "Wedding Celebration", caption: "Gathering", captionJa: "集まり" },
  { src: "/images/wedding/20231018_212616-1024x1019.jpg", alt: "Wedding Celebration", caption: "Festive Occasion", captionJa: "お祝いの場" },
];

function SectionHeader({ titleEn, titleJa, subtitleEn, subtitleJa, locale }: { titleEn: string; titleJa: string; subtitleEn: string; subtitleJa: string; locale: string }) {
  return (
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
          {locale === "en" ? titleEn : titleJa}
        </span>
        <span className="w-16 h-[1px] bg-gold/40" />
      </div>
      <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4">
        {locale === "en" ? titleEn : titleJa}
      </h2>
      <p className="font-sans text-charcoal/60 max-w-2xl mx-auto text-lg">
        {locale === "en" ? subtitleEn : subtitleJa}
      </p>
    </motion.div>
  );
}

function MasonryGallery({ images, onImageClick, locale }: { images: GalleryImage[]; onImageClick: (index: number) => void; locale: string }) {
  return (
    <motion.div
      className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
      }}
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="break-inside-avoid cursor-pointer group"
          onClick={() => onImageClick(index)}
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
              <p className="font-sans text-white/60 text-xs mt-0.5">
                {locale === "ja" ? image.captionJa : ""}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function MomentsPage() {
  const locale = useLocale();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<GalleryImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const baseUrl = "https://kumarhamamatsu.com";
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = `${baseUrl}/${locale}/moments`;
    const existingTags = document.querySelectorAll('link[data-hreflang]');
    existingTags.forEach(tag => tag.remove());
    const enLink = document.createElement("link");
    enLink.rel = "alternate";
    enLink.hreflang = "en";
    enLink.href = `${baseUrl}/en/moments`;
    enLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(enLink);
    const jaLink = document.createElement("link");
    jaLink.rel = "alternate";
    jaLink.hreflang = "ja";
    jaLink.href = `${baseUrl}/ja/moments`;
    jaLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(jaLink);
    const xDefaultLink = document.createElement("link");
    xDefaultLink.rel = "alternate";
    xDefaultLink.hreflang = "x-default";
    xDefaultLink.href = `${baseUrl}/en/moments`;
    xDefaultLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(xDefaultLink);
    return () => {
      const tags = document.querySelectorAll('link[data-hreflang]');
      tags.forEach(tag => tag.remove());
    };
  }, [locale]);

  const openLightbox = (images: GalleryImage[], index: number) => {
    setCurrentImages(images);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = () => setCurrentImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  const nextImage = () => setCurrentImageIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));

  return (
    <div className="bg-cream">
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal/85 via-charcoal/60 to-burgundy/30" />
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
                {locale === "en" ? "Since 1995" : "1995年から"}
              </span>
              <span className="w-12 h-[2px] bg-gold" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1] tracking-tight">
              {locale === "en" ? (
                <>Kumar <span className="text-gradient">Moments</span></>
              ) : (
                <>クマールの<span className="text-gradient">思い出</span></>
              )}
            </h1>
            <p className="font-display italic text-xl md:text-2xl text-white/75 max-w-xl leading-relaxed">
              {locale === "en"
                ? "Memories from our journey, one dish at a time."
                : "一皿一皿から紡がれた、私たちの歩みの思い出。"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* MR. KUMAR WITH GUESTS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            titleEn="Mr. Binay Kumar with Our Guests"
            titleJa="ビナイ・クマー氏とお客様"
            subtitleEn="It's an honor that we could meet such highly noted personalities through our food over several years."
            subtitleJa="何年もの間、料理を通じて著名な方々とお会いできたことを光栄に思います。"
            locale={locale}
          />
          <MasonryGallery
            images={guestsImages}
            onImageClick={(index) => openLightbox(guestsImages, index)}
            locale={locale}
          />
        </div>
      </section>

      {/* RESTAURANT ATMOSPHERE */}
      <section className="py-24 bg-cream pattern-overlay relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            titleEn="Our Restaurant"
            titleJa="私たちのレストラン"
            subtitleEn="Step inside and experience the warm atmosphere of Kumar Restaurant."
            subtitleJa="クマールレストランの温かい雰囲気を体験してください。"
            locale={locale}
          />
          <MasonryGallery
            images={restaurantImages}
            onImageClick={(index) => openLightbox(restaurantImages, index)}
            locale={locale}
          />
        </div>
      </section>

      {/* RESTAURANT MOMENTS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            titleEn="Kumar Restaurant Moments"
            titleJa="クマールレストランの思い出"
            subtitleEn="Every visit tells a story. These are the moments that make Kumar Restaurant special."
            subtitleJa="それぞれの訪問に物語があります。これらの瞬間がクマールレストランを特別にしています。"
            locale={locale}
          />
          <MasonryGallery
            images={restaurantMomentsImages}
            onImageClick={(index) => openLightbox(restaurantMomentsImages, index)}
            locale={locale}
          />
        </div>
      </section>

      {/* CELEBRATIONS */}
      <section className="py-24 bg-cream pattern-overlay relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            titleEn="Celebrations & Events"
            titleJa="お祝いとイベント"
            subtitleEn="We've had the privilege of being part of many beautiful celebrations."
            subtitleJa="多くの美しいお祝いに参加できることを光栄に思います。"
            locale={locale}
          />
          <MasonryGallery
            images={celebrationsImages}
            onImageClick={(index) => openLightbox(celebrationsImages, index)}
            locale={locale}
          />
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
              className="absolute top-6 right-6 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/70 hover:text-gold transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-8 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/70 hover:text-gold transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-8 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/70 hover:text-gold transition-colors z-10"
              aria-label="Next image"
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
                src={currentImages[currentImageIndex]?.src}
                alt={currentImages[currentImageIndex]?.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-center">
                <p className="font-display text-white text-xl">
                  {locale === "en"
                    ? currentImages[currentImageIndex]?.caption
                    : currentImages[currentImageIndex]?.captionJa}
                </p>
                <p className="font-sans text-gold/70 text-sm mt-1">
                  {currentImageIndex + 1} / {currentImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
