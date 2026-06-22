"use client";

import { useTranslations, useLocale } from "next-intl";
import { Button, Card, CardContent } from "@/components";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generateRestaurantSchema } from "@/lib/schema";
import {
  Star,
  Clock,
  Quote,
  ArrowRight,
  ChevronDown,
  Phone,
} from "lucide-react";
import Link from "next/link";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const REVIEWS = [
  {
    quote: "Very good authentic Indian food... ambience is good and staff are very polite",
    name: "Richa Anand",
    rating: 5,
    avatar: "/images/reviews/1652088639_5159276587499382.jpg",
  },
  {
    quote: "I love Indian food and I love Kumar Indian Restaurant!",
    name: "Joe Libby",
    rating: 5,
    avatar: "/images/reviews/1604328580_3799025100130764.jpg",
  },
  {
    quote: "アクトタワーB1 カレー専門店",
    name: "Kenichi Akimoto",
    rating: 5,
    avatar: "/images/reviews/1605791620_3067210893378725.jpg",
  },
  {
    quote: "very good indian restaurant",
    name: "Corinne Cardinale-Wartelle",
    rating: 5,
    avatar: "/images/reviews/1617103162_5728132990545306.jpg",
  },
  {
    quote: "Kumar Resturant is one of the best Indian cuisine Resturant in Japan",
    name: "Prashant Yadav",
    rating: 5,
    avatar: "/images/reviews/1652263606_5457358670974872.jpg",
  },
  {
    quote: "ディナーが特にメニュー豊富でオススメです",
    name: "Ayaka Takachio",
    rating: 5,
    avatar: "/images/reviews/1604320908_2550660641725798.jpg",
  },
];

const DISHES = [
  {
    key: "chanaMasala",
    image: "/images/food/chole_bhature.jpg",
    price: "1,000",
  },
  {
    key: "butterChicken",
    image: "/images/food/india-indian-indian-food-1481494-1024x682.jpg",
    price: "1,300",
  },
  {
    key: "palakPaneer",
    image: "/images/food/paneer-tikka-cheese-seek-4929034-1024x682.jpg",
    price: "1,200",
  },
  {
    key: "keemaCurry",
    image: "/images/food/skewer-kebab-barbecue-3370443-1024x679.jpg",
    price: "1,100",
  },
];

/* ── Animation Variants ── */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" as const },
  }),
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ── Counter Hook ── */

function useCountUp(target: number, duration: number = 2, inView: boolean) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    let start = 0;
    const step = target / (duration * 60);
    let raf: number;
    const tick = () => {
      start += step;
      if (start >= target) {
        setCount(target);
        return;
      }
      setCount(Math.floor(start * 10) / 10);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return count;
}

/* ── Stat Card Component ── */

function StatCard({
  value,
  suffix,
  label,
  inView,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
  delay?: number;
}) {
  const count = useCountUp(value, 1.5, inView);
  return (
    <motion.div
      className="text-center"
      variants={staggerItem}
    >
      <p className="font-display text-4xl md:text-5xl font-light text-saffron">
        {Math.round(count)}
        {suffix}
      </p>
      <p className="text-sm text-white/60 tracking-widest uppercase mt-1">{label}</p>
    </motion.div>
  );
}

/* ── Star Rating Component ── */

function AnimatedStars({ count, inView }: { count: number; inView: boolean }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={
            inView
              ? { opacity: 1, scale: 1, rotate: 0 }
              : { opacity: 0, scale: 0, rotate: -30 }
          }
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1] as const,
            delay: i * 0.08,
          }}
        >
          <Star className="w-3 h-3 fill-gold text-gold" />
        </motion.div>
      ))}
    </div>
  );
}

/* ── Decorative Divider ── */

function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-gold/60" />
      <span className="text-gold text-[10px] leading-none">✦ ◆ ✦</span>
      <span className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [reviewsInView, setReviewsInView] = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const [ratingInView, setRatingInView] = useState(false);
  const rating = useCountUp(4.5, 1.5, ratingInView);

  return (
    <div className="overflow-hidden">
      <SchemaMarkup data={generateRestaurantSchema(locale)} />

      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center noise-overlay">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: 0 }}
          initial={{ y: -30, scale: 1.08 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" as const }}
        >
          <img
            src="/images/about/クマールMain-rotated.jpg"
            alt="Kumar Restaurant Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
        </motion.div>

        {/* Decorative fork left */}
        <motion.img
          src="/images/decorative/fork-free-img.png"
          alt=""
          className="absolute left-6 md:left-16 top-1/4 w-14 md:w-24 opacity-40 -rotate-[25deg] hidden sm:block"
          initial={{ opacity: 0, x: -40, rotate: -40 }}
          animate={{ opacity: 0.4, x: 0, rotate: -25 }}
          transition={{ duration: 1, delay: 1.2 }}
        />
        {/* Decorative knife right */}
        <motion.img
          src="/images/decorative/knife-free-imge.png"
          alt=""
          className="absolute right-6 md:right-16 top-1/4 w-14 md:w-24 opacity-40 rotate-[25deg] hidden sm:block"
          initial={{ opacity: 0, x: 40, rotate: 40 }}
          animate={{ opacity: 0.4, x: 0, rotate: 25 }}
          transition={{ duration: 1, delay: 1.2 }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-24">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
          >
            <img
              src="/images/decorative/frill-free-img.png"
              alt=""
              className="mx-auto w-36 md:w-52 opacity-70"
            />
          </motion.div>

          <motion.h1
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white mb-4 leading-[0.95] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {locale === "en" ? "Kumar" : "クマール"}
            <br />
            <span className="font-display italic font-light">
              {locale === "en" ? "Restaurant" : "レストラン"}
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/80 mb-6 font-light tracking-[0.15em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {locale === "en"
              ? "Home of Indian tradition and exquisite preparation"
              : "インドの伝統と卓越した料理の故郷"}
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            <p className="text-sm md:text-base text-gold font-light tracking-[0.25em] uppercase">
              {locale === "en"
                ? "Good Food | Good Culture"
                : "美味しい食べ物 | 美しい文化"}
            </p>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.8 }}
          >
            <Link href={`/${locale}/contact`}>
              <Button variant="primary" size="lg" className="min-w-[220px] focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2">
                {locale === "en" ? "Reserve a Table" : "ご予約"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href={`/${locale}/menu`}>
              <Button variant="secondary" size="lg" className="min-w-[220px] border-white/40 text-white hover:bg-white/10 hover:border-white/60 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2">
                {locale === "en" ? "View Menu" : "メニューを見る"}
              </Button>
            </Link>
          </motion.div>

          {/* Hours Badge */}
          <motion.div
            className="inline-flex items-center gap-3 bg-saffron/10 border border-saffron/20 rounded-full px-6 py-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <Clock className="w-4 h-4 text-gold" />
            <span className="text-white/90 text-xs md:text-sm tracking-wide">
              {t("hero.hours")}
            </span>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <ChevronDown className="w-6 h-6 text-white/40" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      {/* ===== 3. WELCOME SECTION ===== */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 1 },
                visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
              }}
            >
              <motion.p
                className="text-sm text-gold tracking-[0.2em] uppercase mb-3"
                variants={slideInLeft}
              >
                {locale === "en" ? "Since 1995" : "1995年より"}
              </motion.p>
              <motion.h2
                className="font-display text-4xl md:text-5xl text-charcoal mb-6 leading-tight"
                variants={slideInLeft}
              >
                {locale === "en"
                  ? "Welcome to Kumar Restaurant"
                  : "クマールレストランへようこそ"}
              </motion.h2>
              <GoldDivider className="!justify-start mb-8" />
              <motion.p
                className="text-lg text-charcoal/60 leading-relaxed mb-10 font-light"
                variants={slideInLeft}
              >
                {locale === "en"
                  ? "We have made a commitment to bring variety, high quality and large selection of Indian dishes to our customers."
                  : "お客様に多様性、高品質、そして豊富なインド料理を提供することをお約束しています。"}
              </motion.p>
              <motion.div variants={slideInLeft}>
                <Link href={`/${locale}/about`}>
                  <Button variant="secondary" size="lg">
                    {locale === "en" ? "More About Us" : "詳しく見る"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
            >
              {/* Gold frame effect */}
              <div className="absolute -inset-3 border-2 border-gold/30" />
              <div className="absolute -inset-6 border border-gold/15" />
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src="/images/about/Serving-chef.jpg"
                  alt="Mr. Binay Kumar - Chef and Owner"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -bottom-5 -left-5 bg-gold text-charcoal px-7 py-3 shadow-xl"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.4 }}
              >
                <p className="font-display text-xl font-semibold tracking-wide">Since 1995</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* ===== 4. MEET BINAY KUMAR ===== */}
      <section className="py-24 bg-burgundy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <img
            src="/images/decorative/frill-free-img.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
            >
              <div className="absolute -inset-3 border-2 border-saffron/20" />
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src="/images/about/Serving-chef.jpg"
                  alt="Mr. Binay Kumar - Owner"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -top-5 -right-5 bg-gold text-charcoal px-7 py-3 shadow-xl"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 }}
              >
                <p className="font-display text-lg font-semibold tracking-wide">G7 Summit 2023</p>
              </motion.div>
            </motion.div>
            <motion.div
              className="order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 1 },
                visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
              }}
            >
              <motion.p
                className="text-saffron font-light tracking-[0.2em] uppercase text-sm mb-3"
                variants={fadeInUp}
              >
                {locale === "en" ? "Meet Our Owner" : "オーナー紹介"}
              </motion.p>
              <motion.h2
                className="font-display text-4xl md:text-5xl text-white mb-6 leading-tight"
                variants={fadeInUp}
              >
                {locale === "en" ? "Mr. Binay Kumar" : "ビナイ・クマー氏"}
              </motion.h2>
              <GoldDivider className="!justify-start mb-8" />
              <motion.p
                className="text-base md:text-lg text-white/70 leading-relaxed mb-10 font-light"
                variants={fadeInUp}
              >
                {locale === "en"
                  ? "Mr. Binay Kumar is the heart and soul of Kumar Restaurant. His passion for authentic Indian cuisine and dedication to serving the Hamamatsu community for over 30 years has made Kumar Restaurant a beloved institution. In 2023, he was honored to cater for world leaders at the G7 Summit in Kyoto."
                  : "ビナイ・クマー氏はクマールレストランの心と魂です。本格的なインド料理への情熱と、30年以上にわたる浜松コミュニティへの奉仕は、クマールレストランを愛される存在にしました。2023年には京都で開催されたG7サミットで世界のリーダーたちに料理を振る舞う名誉に浴しました。"}
              </motion.p>
              <motion.div
                className="grid grid-cols-3 gap-6 mb-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onViewportEnter={() => setStatsInView(true)}
                variants={{
                  hidden: { opacity: 1 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
                }}
              >
                <StatCard
                  value={30}
                  suffix="+"
                  label={locale === "en" ? "Years" : "年以上"}
                  inView={statsInView}
                />
                <motion.div
                  className="text-center"
                  variants={staggerItem}
                >
                  <p className="font-display text-4xl md:text-5xl font-light text-gold">G7</p>
                  <p className="text-sm text-white/60 tracking-widest uppercase mt-1">
                    {locale === "en" ? "Summit" : "サミット"}
                  </p>
                </motion.div>
                <StatCard
                  value={168}
                  suffix="+"
                  label={locale === "en" ? "Reviews" : "件以上のレビュー"}
                  inView={statsInView}
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link href={`/${locale}/about`}>
                  <Button variant="secondary" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                    {locale === "en" ? "Read Full Story" : "详情を見る"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 5. OUR HOURS ===== */}
      <motion.section
        className="py-24 bg-charcoal text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: { opacity: 1 },
          visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
        }}
      >
        <div className="absolute inset-0 opacity-5">
          <img
            src="/images/about/dine-out.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.p
            className="text-gold tracking-[0.2em] uppercase text-sm mb-3"
            variants={fadeInUp}
          >
            {locale === "en" ? "Visit Us" : "ご来店お待ちしております"}
          </motion.p>
          <motion.h2
            className="font-display text-4xl md:text-5xl text-white mb-4"
            variants={fadeInUp}
          >
            {locale === "en" ? "Our Hours" : "営業時間"}
          </motion.h2>
          <GoldDivider className="mb-10" />
          <motion.div
            className="bg-white/5 border border-white/10 p-10 md:p-14 max-w-lg mx-auto"
            variants={scaleIn}
          >
            <div className="space-y-8">
              <div>
                <p className="text-gold font-display text-xl mb-2">
                  {locale === "en" ? "Monday — Friday" : "月曜日 — 金曜日"}
                </p>
                <p className="text-lg text-white/90 font-light tracking-wide">11:00 — 15:00 &amp; 17:00 — 22:00</p>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              <div>
                <p className="text-gold font-display text-xl mb-2">
                  {locale === "en"
                    ? "Saturday · Sunday · Holiday"
                    : "土曜日・日曜日・祝日"}
                </p>
                <p className="text-lg text-white/90 font-light tracking-wide">11:00 — 22:00</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      {/* ===== 6. OUR MENU ===== */}
      <section className="py-24 bg-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1 relative"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
            >
              <div className="absolute -inset-3 border-2 border-gold/30" />
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src="/images/food/india-indian-indian-food-1481500-1024x682.jpg"
                  alt="Indian cuisine"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              className="order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 1 },
                visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
              }}
            >
              <motion.p
                className="text-sm text-gold tracking-[0.2em] uppercase mb-3"
                variants={slideInRight}
              >
                {locale === "en" ? "Royal Recipes" : "王室のレシピ"}
              </motion.p>
              <motion.h2
                className="font-display text-4xl md:text-5xl text-charcoal mb-6 leading-tight"
                variants={slideInRight}
              >
                {locale === "en" ? "Our Menu" : "メニュー"}
              </motion.h2>
              <GoldDivider className="!justify-start mb-8" />
              <motion.p
                className="text-base md:text-lg text-charcoal/60 leading-relaxed mb-10 font-light"
                variants={slideInRight}
              >
                {locale === "en"
                  ? "Kumar Restaurant serves cuisine made from recipes culled from the royal Indian menus dating back 300 to 400 years using the freshest local ingredients and precious Indian spices."
                  : "クマールレストランでは、300〜400年前のインド王室のメニューから得たレシピを使用し、最も新鮮な地元の食材と貴重なインドスパイスを用いた料理を提供しています。"}
              </motion.p>
              <motion.div variants={slideInRight}>
                <Link href={`/${locale}/menu`}>
              <Button variant="primary" size="lg" className="focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2">
                {locale === "en" ? "Reserve Now" : "今すぐ予約"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 7. TASTY TRADITIONS ===== */}
      <section className="py-24 bg-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 1 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.p
              className="text-sm text-gold tracking-[0.2em] uppercase mb-3"
              variants={fadeInUp}
            >
              {locale === "en" ? "Signature Dishes" : "名物料理"}
            </motion.p>
            <motion.h2
              className="font-display text-4xl md:text-5xl text-charcoal mb-4"
              variants={fadeInUp}
            >
              {t("signatureDishes.title")}
            </motion.h2>
            <GoldDivider className="mb-6" />
            <motion.p className="text-base text-charcoal/60 font-light max-w-2xl mx-auto" variants={fadeInUp}>
              {t("signatureDishes.subtitle")}
            </motion.p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {DISHES.map((dish) => (
              <motion.div
                key={dish.key}
                variants={staggerItem}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } }}
              >
                <Card hover className="h-full">
                  <div className="aspect-[4/3] relative overflow-hidden group">
                    <img
                      src={dish.image}
                      alt={t(`signatureDishes.dishes.${dish.key}.name`)}
                      className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-[2px] bg-gold" />
                    </div>
                    <span className="absolute bottom-3 right-3 text-lg font-display font-semibold text-gold drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
                      ¥{dish.price}
                    </span>
                  </div>
                  <CardContent className="flex flex-col h-full">
                    <h3 className="font-display text-xl text-charcoal mb-2">
                      {t(`signatureDishes.dishes.${dish.key}.name`)}
                    </h3>
                    <p className="text-charcoal/60 text-sm mb-4 flex-1 font-light leading-relaxed">
                      {t(`signatureDishes.dishes.${dish.key}.description`)}
                    </p>
                    <Link href={`/${locale}/menu`}>
                      <Button variant="secondary" size="sm" className="w-full">
                        {locale === "en" ? "Order" : "注文"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-14">
            <Link href={`/${locale}/menu`}>
              <Button variant="primary" size="lg">
                {locale === "en" ? "Discover Entire Menu" : "全メニューを見る"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 8. REVIEWS ===== */}
      <section className="py-24 bg-cream pattern-overlay relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Google Reviews */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 1 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.p
              className="text-sm text-gold tracking-[0.2em] uppercase mb-3"
              variants={fadeInUp}
            >
              {locale === "en" ? "What Our Guests Say" : "お客様の声"}
            </motion.p>
            <motion.h2
              className="font-display text-4xl md:text-5xl text-charcoal mb-4"
              variants={fadeInUp}
            >
              {locale === "en" ? "Google Reviews" : "Googleレビュー"}
            </motion.h2>
            <GoldDivider className="mb-8" />
            <motion.div
              className="flex items-center justify-center gap-4 mb-10"
              variants={fadeInUp}
            >
              <motion.span
                className="font-display text-6xl text-charcoal font-light"
                onViewportEnter={() => setRatingInView(true)}
              >
                {ratingInView ? rating.toFixed(1) : "0.0"}
              </motion.span>
              <div className="text-left">
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? "fill-gold text-gold" : "fill-gold/40 text-gold/40"}`}
                    />
                  ))}
                </div>
                <p className="text-charcoal/50 text-sm font-light">
                  {locale === "en"
                    ? "Based on 168 reviews"
                    : "168件のレビューに基づく"}
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            onViewportEnter={() => setReviewsInView(true)}
          >
            {REVIEWS.map((review, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <Card hover className="h-full">
                  <CardContent className="pt-8 pb-8">
                    <Quote className="w-8 h-8 text-gold/30 mb-4" />
                    <p className="text-charcoal/70 italic mb-5 text-sm leading-relaxed font-light">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gold/20">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-display text-base text-charcoal">
                          {review.name}
                        </p>
                        <AnimatedStars count={review.rating} inView={reviewsInView} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Facebook Reviews */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/images/social/fb-free-imng.png"
              alt="Facebook"
              className="w-10 h-10"
            />
            <h2 className="font-display text-3xl md:text-4xl text-charcoal">
              {locale === "en" ? "Facebook Reviews" : "Facebookレビュー"}
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {REVIEWS.map((review, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <Card hover className="h-full">
                  <CardContent className="pt-8 pb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold/20">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-display text-base text-charcoal">
                          {review.name}
                        </p>
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-gold text-gold"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-charcoal/60 text-sm leading-relaxed font-light">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 9. SOCIAL LINKS ===== */}
      <section className="py-14 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4">
          <motion.p
            className="text-center text-white/60 mb-8 text-sm tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {locale === "en" ? "Follow Us" : "フォローする"}
          </motion.p>
          <div className="flex items-center justify-center gap-8">
            {[
              { href: "https://www.facebook.com/kumarhamamatsu/", img: "/images/social/fb-free-imng.png", alt: "Facebook" },
              { href: "https://twitter.com/kumarhamamatsu", img: "/images/social/tweet-free-img.png", alt: "Twitter" },
              { href: "https://g.page/kumarhamamatsu/review", img: "/images/social/google-reviews-free-img.png", alt: "Google Reviews" },
            ].map((social, i) => (
              <motion.a
                key={social.alt}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-gold/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.08 }}
              >
                <img
                  src={social.img}
                  alt={social.alt}
                  className="w-7 h-7"
                />
              </motion.a>
            ))}
            <motion.a
              href="https://www.instagram.com/kumarhamamatsu/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center hover:scale-110 transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const, delay: 0.25 }}
            >
              <span className="text-white font-bold text-lg">Ig</span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ===== 10. FOOTER CTA ===== */}
      <section className="py-24 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <img
            src="/images/decorative/frill-free-img.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 1 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-saffron/10 border border-saffron/20 mb-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <Phone className="w-8 h-8 text-saffron" />
          </motion.div>

          <motion.h2
            className="font-display text-3xl md:text-4xl mb-5"
            variants={fadeInUp}
          >
            {locale === "en"
              ? "Call for Reservations"
              : "ご予約はお電話で"}
          </motion.h2>
          <motion.a
            href="tel:053-451-0154"
            className="font-display text-4xl md:text-5xl text-saffron hover:text-gold transition-colors duration-300 mb-10 inline-block font-light tracking-wide"
            variants={fadeInUp}
          >
            053-451-0154
          </motion.a>

          <div className="mt-12 mb-8">
            <motion.img
              src="/images/logos/cropped-KumarLogo1-2-1-300x143.png"
              alt="Kumar Restaurant Logo"
              className="mx-auto w-48 md:w-64 opacity-90"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>

          <GoldDivider className="mb-6" />

          <p className="text-white/40 text-xs tracking-wider mb-2">
            © {new Date().getFullYear()} Kumar Restaurant. All rights reserved.
          </p>
          <p className="text-gold/60 text-sm italic font-display">
            {locale === "en"
              ? "Spice up life at Kumar Restaurant"
              : "クマールレストランで人生をスパイシーに"}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
