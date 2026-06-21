"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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

const celebrationsImages: GalleryImage[] = [
  { src: "/images/wedding/20231018_212357-1024x942.jpg", alt: "Wedding Celebration", caption: "Wedding Ceremony", captionJa: "結婚式" },
  { src: "/images/wedding/20231018_212407-1024x909.jpg", alt: "Wedding Celebration", caption: "Joyful Moments", captionJa: "幸せな瞬間" },
  { src: "/images/wedding/20231018_212424-1024x665.jpg", alt: "Wedding Celebration", caption: "Celebration", captionJa: "お祝い" },
  { src: "/images/wedding/20231018_212435-1024x766.jpg", alt: "Wedding Celebration", caption: "Special Event", captionJa: "特別なイベント" },
  { src: "/images/wedding/20231018_212449-1024x579.jpg", alt: "Wedding Celebration", caption: "Gathering", captionJa: "集まり" },
  { src: "/images/wedding/20231018_212616-1024x1019.jpg", alt: "Wedding Celebration", caption: "Festive Occasion", captionJa: "お祝いの場" },
];

function MasonryGallery({ images, onImageClick }: { images: GalleryImage[]; onImageClick: (index: number) => void }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="break-inside-avoid cursor-pointer group"
          onClick={() => onImageClick(index)}
        >
          <div className="relative overflow-hidden rounded-xl shadow-md">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm font-medium">{image.caption}</p>
              <p className="text-white/70 text-xs">{image.captionJa}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
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

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === currentImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about/site-image.jpg"
            alt="Kumar Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {locale === "en" ? "Kumar Moments" : "クマールの思い出"}
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              {locale === "en"
                ? "Memories from our journey since 1995"
                : "1995年からの歩みの思い出"}
            </p>
          </div>
        </div>
      </section>

      {/* MR. KUMAR WITH GUESTS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {locale === "en" ? "Mr. Binay Kumar with Our Guests" : "ビナイ・クマー氏とお客様"}
            </h2>
            <p className="text-lg text-charcoal/70 max-w-3xl mx-auto">
              {locale === "en"
                ? "It's an honor that we could meet such highly noted personalities through our food over several years."
                : "何年もの間、料理を通じて著名な方々とお会いできたことを光栄に思います。"}
            </p>
          </div>
          <MasonryGallery
            images={guestsImages}
            onImageClick={(index) => openLightbox(guestsImages, index)}
          />
        </div>
      </section>

      {/* RESTAURANT ATMOSPHERE SECTION */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {locale === "en" ? "Our Restaurant" : "私たちのレストラン"}
            </h2>
            <p className="text-lg text-charcoal/70 max-w-3xl mx-auto">
              {locale === "en"
                ? "Step inside and experience the warm atmosphere of Kumar Restaurant."
                : "クマールレストランの温かい雰囲気を体験してください。"}
            </p>
          </div>
          <MasonryGallery
            images={restaurantImages}
            onImageClick={(index) => openLightbox(restaurantImages, index)}
          />
        </div>
      </section>

      {/* CELEBRATIONS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {locale === "en" ? "Celebrations & Events" : "お祝いとイベント"}
            </h2>
            <p className="text-lg text-charcoal/70 max-w-3xl mx-auto">
              {locale === "en"
                ? "We've had the privilege of being part of many beautiful celebrations."
                : "多くの美しいお祝いに参加できることを光栄に思います。"}
            </p>
          </div>
          <MasonryGallery
            images={celebrationsImages}
            onImageClick={(index) => openLightbox(celebrationsImages, index)}
          />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src="/images/logos/cropped-KumarLogo1-2-1-300x143.png"
            alt="Kumar Restaurant Logo"
            className="h-16 mx-auto mb-6"
          />
          <p className="text-xl md:text-2xl font-semibold mb-2">
            {locale === "en"
              ? "Call for All Your Reservations: 053-451-0154"
              : "ご予約はお電話で: 053-451-0154"}
          </p>
          <a
            href="tel:053-451-0154"
            className="text-saffron hover:text-saffron/80 transition-colors text-lg font-medium"
          >
            053-451-0154
          </a>
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Kumar Restaurant. All rights reserved.
            </p>
            <p className="text-white/40 text-xs mt-2">
              {locale === "en"
                ? "Authentic Indian Cuisine in Hamamatsu Since 1995"
                : "1995年から浜松で本格的なインド料理を"}
            </p>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
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
          <div className="max-w-4xl max-h-[80vh] px-16">
            <img
              src={currentImages[currentImageIndex]?.src}
              alt={currentImages[currentImageIndex]?.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4 text-lg">
              {locale === "en"
                ? currentImages[currentImageIndex]?.caption
                : currentImages[currentImageIndex]?.captionJa}
            </p>
            <p className="text-white/50 text-center mt-1 text-sm">
              {currentImageIndex + 1} / {currentImages.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
