"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  UtensilsCrossed,
  Package,
  Car,
  PartyPopper,
  Heart,
  Leaf,
  ArrowRight,
  Phone,
  Check,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const services = [
  { key: "dineIn", icon: UtensilsCrossed, link: "/contact" },
  { key: "takeaway", icon: Package, link: "/menu" },
  { key: "delivery", icon: Car, link: "/contact" },
  { key: "catering", icon: PartyPopper, link: "/contact" },
  { key: "wedding", icon: Heart, link: "/weddings" },
  { key: "dietary", icon: Leaf, link: "/menu" },
];

const cateringOptions = [
  { key: "boxLunch", price: "¥1,000–1,500" },
  { key: "buffet", price: "¥2,000–3,000" },
  { key: "cocktail", price: "¥2,500–4,000" },
];

const dietarySymbols = [
  { key: "vegetarian", symbol: "V", color: "bg-forest text-white" },
  { key: "vegan", symbol: "VG", color: "bg-green-600 text-white" },
  { key: "halal", symbol: "H", color: "bg-blue-600 text-white" },
  { key: "glutenFree", symbol: "GF", color: "bg-amber-500 text-white" },
];

export default function ServicesPage() {
  const t = useTranslations("services");
  const locale = useLocale();

  useEffect(() => {
    const baseUrl = "https://kumarhamamatsu.com";

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = `${baseUrl}/en/services`;

    const existingTags = document.querySelectorAll('link[data-hreflang]');
    existingTags.forEach(tag => tag.remove());

    const enLink = document.createElement("link");
    enLink.rel = "alternate";
    enLink.hreflang = "en";
    enLink.href = `${baseUrl}/en/services`;
    enLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(enLink);

    const jaLink = document.createElement("link");
    jaLink.rel = "alternate";
    jaLink.hreflang = "ja";
    jaLink.href = `${baseUrl}/ja/services`;
    jaLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(jaLink);

    const xDefaultLink = document.createElement("link");
    xDefaultLink.rel = "alternate";
    xDefaultLink.hreflang = "x-default";
    xDefaultLink.href = `${baseUrl}/en/services`;
    xDefaultLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(xDefaultLink);

    return () => {
      const tags = document.querySelectorAll('link[data-hreflang]');
      tags.forEach(tag => tag.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      {/* ───────── HERO ───────── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/images/food/india-indian-indian-food-1481500-1024x682.jpg"
            alt="Kumar Restaurant Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />
          <div className="absolute inset-0 pattern-overlay opacity-20" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-saffron/90 font-sans text-sm tracking-[0.3em] uppercase mb-4">
              {locale === "en" ? "What We Offer" : "提供サービス"}
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-tight mb-6">
              {locale === "en" ? "Our Services" : "サービス"}
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto mb-8" />
            <p className="text-lg md:text-xl text-white/80 font-sans max-w-2xl mx-auto">
              {locale === "en"
                ? "From dine-in to delivery, we bring authentic Indian flavors to you"
                : " dine-inからデリバリーまで、本格的なインド料理をお届けします"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ───────── SERVICE CARDS ───────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <p className="text-saffron text-xs tracking-[0.3em] uppercase mb-3 font-sans">
              {locale === "en" ? "Our Offerings" : "提供サービス"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold mb-4">
              {locale === "en" ? "What We Offer" : "提供サービス"}
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <div className="bg-white rounded-3xl border border-charcoal/5 p-8 h-full flex flex-col hover:shadow-[0_8px_40px_rgba(26,26,26,0.06)] transition-shadow duration-300">
                  <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-saffron/10 to-gold/10 flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-saffron" />
                  </div>
                  <h3 className="font-display text-xl text-charcoal font-semibold mb-3">
                    {t(`servicesList.${service.key}.title`)}
                  </h3>
                  <p className="text-charcoal/55 font-sans text-sm leading-relaxed mb-6 flex-1">
                    {t(`servicesList.${service.key}.description`)}
                  </p>
                  <Link
                    href={`/${locale}${service.link}`}
                    className="inline-flex items-center gap-2 text-saffron text-sm font-sans font-medium hover:gap-3 transition-all duration-300"
                  >
                    {locale === "en" ? "Learn More" : "詳しく見る"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CATERING ───────── */}
      <section className="py-20 lg:py-28 bg-burgundy relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-10" />
        <div className="absolute inset-0 noise-overlay opacity-[0.03]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <p className="text-saffron/80 text-xs tracking-[0.3em] uppercase mb-3 font-sans">
              {locale === "en" ? "Events & Gatherings" : "イベント・集会"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white font-semibold mb-4">
              {locale === "en" ? "Corporate Catering" : "法人ケータリング"}
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto mb-6" />
            <p className="text-lg text-white/70 max-w-2xl mx-auto font-sans">
              {locale === "en"
                ? "Making Your Event Unforgettable"
                : "イベントを难忘の思い出に"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {cateringOptions.map((option, index) => (
              <motion.div
                key={option.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center h-full">
                  <h3 className="font-display text-xl text-white font-semibold mb-2">
                    {t(`catering.options.${option.key}.title`)}
                  </h3>
                  <p className="text-white/60 font-sans text-sm mb-5">
                    {t(`catering.options.${option.key}.description`)}
                  </p>
                  <div className="text-2xl font-display font-bold text-saffron">
                    {option.price}
                    <span className="text-sm font-sans font-normal text-white/50">
                      {locale === "en" ? "/person" : "/人"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-saffron to-gold text-white rounded-xl font-sans text-sm font-medium hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300"
            >
              {locale === "en" ? "Request a Quote" : "見積もりを依頼する"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ───────── DIETARY GUIDE ───────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <p className="text-saffron text-xs tracking-[0.3em] uppercase mb-3 font-sans">
              {locale === "en" ? "Dietary Needs" : "食事制限"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold mb-4">
              {locale === "en" ? "Dietary Guide" : "食事制限ガイド"}
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto mb-6" />
            <p className="text-lg text-charcoal/60 font-sans">
              {locale === "en"
                ? "We cater to all dietary needs"
                : "すべての食事制限に対応しています"}
            </p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto bg-cream rounded-3xl border border-charcoal/5 p-8 sm:p-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <div className="grid grid-cols-2 gap-6">
              {dietarySymbols.map((item, index) => (
                <motion.div
                  key={item.key}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ x: 4 }}
                >
                  <span
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-sm font-bold font-sans ${item.color}`}
                  >
                    {item.symbol}
                  </span>
                  <div>
                    <span className="font-sans font-medium text-charcoal block text-sm">
                      {t(`dietary.${item.key}`)}
                    </span>
                    <span className="text-xs text-charcoal/40 font-sans">
                      {item.symbol}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mt-8 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { key: "dairyFree", label: "Dairy-Free", labelJa: "乳製品不使用" },
                { key: "nutFree", label: "Nut-Free", labelJa: "ナッツ不使用" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-2 bg-cream rounded-xl px-5 py-2.5 border border-charcoal/5"
                >
                  <Check className="w-4 h-4 text-forest" />
                  <span className="text-charcoal font-sans text-sm">
                    {locale === "en" ? item.label : item.labelJa}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="py-20 lg:py-28 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="font-display text-4xl md:text-5xl text-white font-semibold mb-6">
              {locale === "en" ? "Ready to Experience India?" : "インドの味を体験しませんか？"}
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto mb-8" />
            <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto font-sans">
              {locale === "en"
                ? "Whether you're dining in, ordering takeaway, or planning a special event, we're here to serve you."
                : "ご来店、テイクアウト、特別なイベントのご相談など、お気軽にご連絡ください。"}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-saffron to-burgundy text-white rounded-xl font-sans text-sm font-medium hover:shadow-lg hover:shadow-saffron/25 transition-all duration-300"
            >
              {locale === "en" ? "Reserve Now" : "今すぐ予約"}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white rounded-xl font-sans text-sm font-medium hover:bg-white/10 transition-all duration-300"
            >
              {locale === "en" ? "Contact Us" : "お問い合わせ"}
            </Link>
            <a
              href="tel:053-451-0154"
              className="inline-flex items-center gap-3 text-white/80 hover:text-saffron transition-colors font-sans"
            >
              <Phone className="w-5 h-5" />
              <span className="text-lg font-sans font-semibold">053-451-0154</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
