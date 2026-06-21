"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
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
  "/images/menu/1-2.png",
  "/images/menu/2-2.png",
  "/images/menu/3-2.png",
  "/images/menu/4-2.png",
  "/images/menu/5-2.png",
  "/images/menu/6-2-211x300.png",
  "/images/menu/7-2-205x300.png",
  "/images/menu/9-2.png",
  "/images/menu/10-2.png",
  "/images/menu/11.png",
  "/images/menu/12.png",
  "/images/menu/13.png",
  "/images/menu/14.png",
  "/images/menu/16.png",
  "/images/menu/17.png",
  "/images/menu/19.png",
  "/images/menu/13-214x300.png",
  "/images/menu/17-214x300.png",
  "/images/menu/18-209x300.png",
  "/images/menu/21-210x300.png",
  "/images/menu/6-2-211x300.png",
  "/images/menu/7-2-205x300.png",
  "/images/menu/1-150x150.png",
  "/images/menu/2-150x150.png",
];

const takeoutImages = [
  "/images/menu/1-150x150.png",
  "/images/menu/2-150x150.png",
];

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
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/about/dine-out.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
        <div className="absolute top-4 right-4 md:top-8 md:right-8 opacity-20 pointer-events-none">
          <Image
            src="/images/decorative/frill-free-img.png"
            alt=""
            width={200}
            height={200}
          />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {isJa ? "クマールレストラン メニュー" : "Kumar restaurant Menu."}
            </h1>
            <p className="text-xl md:text-2xl text-saffron-light max-w-3xl mx-auto">
              {isJa
                ? "日本の浜松の中心部に位置するクマールレストランは、本格的なインド料理の灯台です。"
                : "Nestled in the heart of Hamamatsu, Japan, Kumar Restaurant stands as a beacon of authentic Indian cuisine."}
            </p>
          </div>
        </div>
      </section>

      {/* The Kumar Experience */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {isJa ? "クマール体験" : "The Kumar Experience"}
            </h2>
            <p className="text-lg text-charcoal/70 max-w-3xl mx-auto">
              {isJa
                ? "伝統的なインド料理と温かいおもてなしをお楽しみください。季節の特别メニューで、新しい味わいをお届けします。"
                : "Savor the warmth of traditional Indian hospitality paired with our carefully crafted seasonal menus. Each season brings new flavors to delight your palate."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {seasonalMenuImages.map((img, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-lg font-semibold">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Indian Delicacies */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 opacity-30 pointer-events-none">
              <Image
                src="/images/decorative/leaf-free-img.png"
                alt=""
                width={120}
                height={120}
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {isJa ? "インドの美食" : "Indian Delicacies"}
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              {isJa
                ? "最高の食材と伝統的な調理法で作られた、本格的なインド料理を味わってください。"
                : "Discover our signature dishes crafted with the finest ingredients and traditional cooking methods passed down through generations."}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {delicacyImages.map((dish, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={dish.src}
                    alt={isJa ? dish.nameJa : dish.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-charcoal">
                    {isJa ? dish.nameJa : dish.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Menu Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {isJa ? "メニュー" : "Menu"}
            </h2>
            <p className="text-lg text-charcoal/70">
              {isJa
                ? "メニュー画像をクリックで拡大表示"
                : "Click on any menu image to view full size"}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {allMenuImages.map((src, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group bg-charcoal/5"
              >
                <Image
                  src={src}
                  alt={`Menu page ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 17vw"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium bg-charcoal/60 px-2 py-1 rounded">
                    {isJa ? "拡大" : "View"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Takeout Special */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {isJa ? "テイクアウト特集" : "Takeout Special"}
              </h2>
              <p className="text-gray-300 mb-6">
                {isJa
                  ? "お気に入りの料理をお持ち帰りください。テイクアウトで10%割引！"
                  : "Take your favorite dishes to go. Get 10% off on takeout orders!"}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <span className="w-2 h-2 bg-saffron rounded-full" />
                  {isJa ? "全メニュー対象" : "All menu items available for takeout"}
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <span className="w-2 h-2 bg-saffron rounded-full" />
                  {isJa ? "テイクアウト10%割引" : "10% discount on takeout orders"}
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <span className="w-2 h-2 bg-saffron rounded-full" />
                  {isJa ? "電話で事前注文可能" : "Pre-order by phone available"}
                </li>
              </ul>
              <a
                href="tel:053-451-0154"
                className="inline-flex items-center gap-2 bg-saffron text-charcoal px-6 py-3 rounded-lg font-semibold hover:bg-saffron-light transition-colors"
              >
                <Phone className="w-5 h-5" />
                {isJa ? "今すぐ注文" : "Order Now"}
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {takeoutImages.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={src}
                    alt={`Takeout menu ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left">
              <Image
                src="/images/logos/cropped-KumarLogo1-2-1-300x143.png"
                alt="Kumar Restaurant Logo"
                width={200}
                height={95}
                className="mx-auto md:mx-0 mb-4"
              />
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Image
                  src="/images/decorative/old-typical-phone.png"
                  alt="Phone"
                  width={40}
                  height={40}
                  className="opacity-70"
                />
                <div>
                  <p className="text-sm text-gray-400">
                    {isJa ? "ご予約はこちら" : "Call for All Your Reservations"}
                  </p>
                  <a href="tel:053-451-0154" className="text-xl font-bold text-saffron hover:text-saffron-light transition-colors">
                    053-451-0154
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm mb-2">
                {isJa
                  ? `© ${new Date().getFullYear()} クマールレストラン. All rights reserved.`
                  : `© ${new Date().getFullYear()} Kumar Restaurant. All rights reserved.`}
              </p>
              <p className="text-saffron font-semibold text-lg italic">
                {isJa ? "スパイシーな生活を" : "Spice up life at Kumar Restaurant"}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-saffron transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
            className="absolute left-4 text-white hover:text-saffron transition-colors z-10 p-2"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div
            className="relative max-w-4xl max-h-[90vh] w-full h-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allMenuImages[lightboxIndex]}
              alt={`Menu page ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
            className="absolute right-4 text-white hover:text-saffron transition-colors z-10 p-2"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="absolute bottom-4 text-white text-sm">
            {lightboxIndex + 1} / {allMenuImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
