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
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 20, delay },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  }),
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 24 },
  },
};

const heroContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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
      className="text-center p-4 bg-cream rounded-xl"
      variants={staggerItem}
    >
      <p className="text-2xl font-bold text-saffron">
        {Math.round(count)}
        {suffix}
      </p>
      <p className="text-sm text-charcoal/70">{label}</p>
    </motion.div>
  );
}

/* ── Star Rating Component with stagger ── */

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
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: i * 0.1,
          }}
        >
          <Star className="w-3 h-3 fill-saffron text-saffron" />
        </motion.div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [reviewsInView, setReviewsInView] = useState(false);
  const [googleInView, setGoogleInView] = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const [ratingInView, setRatingInView] = useState(false);
  const rating = useCountUp(4.5, 1.5, ratingInView);

  return (
    <div className="overflow-hidden">
      <SchemaMarkup data={generateRestaurantSchema(locale)} />

      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <motion.img
            src="/images/about/クマールMain-rotated.jpg"
            alt="Kumar Restaurant Interior"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" as const }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Decorative fork left */}
        <motion.img
          src="/images/decorative/fork-free-img.png"
          alt=""
          className="absolute left-4 md:left-12 top-1/3 w-12 md:w-20 opacity-60 -rotate-12 hidden sm:block"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
        {/* Decorative knife right */}
        <motion.img
          src="/images/decorative/knife-free-imge.png"
          alt=""
          className="absolute right-4 md:right-12 top-1/3 w-12 md:w-20 opacity-60 rotate-12 hidden sm:block"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.1 }}
          >
            <img
              src="/images/decorative/frill-free-img.png"
              alt=""
              className="mx-auto w-32 md:w-48 opacity-80"
            />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2 leading-tight tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {locale === "en" ? "Kumar Restaurant" : "クマールレストラン"}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-3 italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {locale === "en"
              ? "Home of Indian tradition and exquisite preparation"
              : "インドの伝統と卓越した料理の故郷"}
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="h-px w-12 bg-saffron/60" />
            <p className="text-base md:text-lg text-saffron font-medium tracking-widest uppercase">
              {locale === "en"
                ? "Good Food | Good Culture"
                : "美味しい食べ物 | 美しい文化"}
            </p>
            <span className="h-px w-12 bg-saffron/60" />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.7 }}
          >
            <Link href={`/${locale}/contact`}>
              <Button variant="primary" size="lg" className="min-w-[200px]">
                {locale === "en" ? "Reserve" : "予約する"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Clock className="w-4 h-4 text-saffron" />
            <span className="text-white text-xs md:text-sm">
              {t("hero.hours")}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. BOOK A TABLE SECTION ===== */}
      <motion.section
        className="py-16 bg-cream"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 1 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-charcoal mb-4"
            variants={fadeInUp}
          >
            {locale === "en" ? "Book a table!" : "ご予約！"}
          </motion.h2>
          <motion.p
            className="text-lg text-charcoal/70 mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            {locale === "en"
              ? "Discover the convenience of booking a table online without any hassle."
              : "お手間をかけずにオンラインでテーブルを予約する便利さをご体験ください。"}
          </motion.p>
          <motion.div variants={scaleIn}>
            <Link href={`/${locale}/contact`}>
              <Button variant="primary" size="lg">
                {locale === "en" ? "Reserve Now" : "今すぐ予約"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== 3. WELCOME SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 1 },
                visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
              }}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-charcoal mb-3"
                variants={slideInLeft}
              >
                {locale === "en"
                  ? "Welcome to Kumar Restaurant"
                  : "クマールレストランへようこそ"}
              </motion.h2>
              <motion.p
                className="text-xl text-saffron font-semibold mb-6"
                variants={slideInLeft}
              >
                {locale === "en"
                  ? "Hamamatsu's First Indian Restaurant! Serving Since 1995"
                  : "「浜松初のインド料理店！1995年より営業」"}
              </motion.p>
              <motion.p
                className="text-lg text-charcoal/70 leading-relaxed mb-8"
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
              transition={{ duration: 0.7, ease: "easeOut" as const }}
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/about/Serving-chef.jpg"
                  alt="Mr. Binay Kumar - Chef and Owner"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -bottom-4 -left-4 bg-saffron text-charcoal px-6 py-3 rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
              >
                <p className="font-bold text-lg">Since 1995</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 3.5 MEET MR. BINAY KUMAR SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" as const }}
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/about/Serving-chef.jpg"
                  alt="Mr. Binay Kumar - Owner"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -top-4 -right-4 bg-saffron text-charcoal px-6 py-3 rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
              >
                <p className="font-bold text-lg">G7 Summit Caterer 2023</p>
              </motion.div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 1 },
                visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
              }}
            >
              <motion.p
                className="text-saffron font-semibold text-lg mb-2"
                variants={fadeInUp}
              >
                {locale === "en" ? "Meet Our Owner" : "オーナー紹介"}
              </motion.p>
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-charcoal mb-6"
                variants={fadeInUp}
              >
                {locale === "en" ? "Mr. Binay Kumar" : "ビナイ・クマー氏"}
              </motion.h2>
              <motion.p
                className="text-lg text-charcoal/70 leading-relaxed mb-8"
                variants={fadeInUp}
              >
                {locale === "en"
                  ? "Mr. Binay Kumar is the heart and soul of Kumar Restaurant. His passion for authentic Indian cuisine and dedication to serving the Hamamatsu community for over 30 years has made Kumar Restaurant a beloved institution. In 2023, he was honored to cater for world leaders at the G7 Summit in Kyoto, bringing international recognition to our little restaurant in Act Tower."
                  : "ビナイ・クマー氏はクマールレストランの心と魂です。本格的なインド料理への情熱と、30年以上にわたる浜松コミュニティへの奉仕は、クマールレストランを愛されinstitutionsにしました。2023年には京都で開催されたG7サミットで世界のリーダーたちに料理を振る舞う名誉に浴しました。"}
              </motion.p>
              <motion.div
                className="grid grid-cols-3 gap-4 mb-8"
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
                  className="text-center p-4 bg-cream rounded-xl"
                  variants={staggerItem}
                >
                  <p className="text-2xl font-bold text-saffron">G7</p>
                  <p className="text-sm text-charcoal/70">
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
                  <Button variant="secondary" size="lg">
                    {locale === "en" ? "Read Full Story" : "详情を見る"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 4. OUR HOURS SECTION ===== */}
      <motion.section
        className="py-20 bg-charcoal text-white relative overflow-hidden"
        initial={{ backgroundPositionY: "0%" }}
        whileInView={{ backgroundPositionY: "20%" }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <img
            src="/images/about/dine-out.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 1 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10"
            variants={fadeInUp}
          >
            {locale === "en" ? "Hours" : "営業時間"}
          </motion.h2>
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-lg mx-auto"
            variants={scaleIn}
          >
            <div className="space-y-6">
              <div>
                <p className="text-saffron font-semibold text-lg mb-1">
                  {locale === "en" ? "Monday - Friday" : "月曜日 - 金曜日"}
                </p>
                <p className="text-xl">11:00 - 15:00 &amp; 17:00 - 22:00</p>
              </div>
              <div className="h-px bg-white/20" />
              <div>
                <p className="text-saffron font-semibold text-lg mb-1">
                  {locale === "en"
                    ? "Saturday · Sunday · Holiday"
                    : "土曜日・日曜日・祝日"}
                </p>
                <p className="text-xl">11:00 - 22:00</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ===== 5. OUR MENU SECTION ===== */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" as const }}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/food/india-indian-indian-food-1481500-1024x682.jpg"
                  alt="Samosa - Indian appetizer"
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
                visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
              }}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-charcoal mb-3"
                variants={slideInRight}
              >
                {locale === "en" ? "Our Menu" : "メニュー"}
              </motion.h2>
              <motion.p
                className="text-xl text-saffron font-semibold mb-6"
                variants={slideInRight}
              >
                {locale === "en"
                  ? "Quality Ingredients, Tasty Meals"
                  : "「高品質な食材、美味しい料理」"}
              </motion.p>
              <motion.p
                className="text-lg text-charcoal/70 leading-relaxed mb-8"
                variants={slideInRight}
              >
                {locale === "en"
                  ? "Kumar Restaurant serves cuisine made from recipes culled from the royal Indian menus dating back 300 to 400 years using the freshest local ingredients and precious Indian spices."
                  : "クマールレストランでは、300〜400年前のインド王室のメニューから得たレシピを使用し、最も新鮮な地元の食材と貴重なインドスパイスを用いた料理を提供しています。"}
              </motion.p>
              <motion.div variants={slideInRight}>
                <Link href={`/${locale}/menu`}>
                  <Button variant="primary" size="lg">
                    {locale === "en" ? "Discover Entire Menu" : "全メニューを見る"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 6. TASTY TRADITIONS SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 1 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-charcoal mb-3"
              variants={fadeInUp}
            >
              {t("signatureDishes.title")}
            </motion.h2>
            <motion.p className="text-lg text-charcoal/70" variants={fadeInUp}>
              {t("signatureDishes.subtitle")}
            </motion.p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {DISHES.map((dish) => (
              <motion.div
                key={dish.key}
                variants={staggerItem}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="h-full">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={dish.image}
                      alt={t(`signatureDishes.dishes.${dish.key}.name`)}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-charcoal mb-2">
                      {t(`signatureDishes.dishes.${dish.key}.name`)}
                    </h3>
                    <p className="text-charcoal/70 text-sm mb-4 flex-1">
                      {t(`signatureDishes.dishes.${dish.key}.description`)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-saffron">
                        ¥{dish.price}
                      </span>
                      <Link href={`/${locale}/menu`}>
                        <Button variant="secondary" size="sm">
                          {locale === "en" ? "Order" : "注文"}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-12">
            <Link href={`/${locale}/menu`}>
              <Button variant="primary" size="lg">
                {locale === "en" ? "Discover Entire Menu" : "全メニューを見る"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 7. HAPPY CUSTOMERS SECTION ===== */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 1 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-charcoal mb-3"
              variants={fadeInUp}
            >
              {locale === "en" ? "Happy Customers!" : "お客様の声！"}
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
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
                whileHover={{ y: -5, boxShadow: "0 15px 35px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6 pb-6">
                    <Quote className="w-8 h-8 text-saffron/40 mb-3" />
                    <p className="text-charcoal/80 italic mb-4 text-sm leading-relaxed">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal text-sm">
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

          {/* Social proof about dietary options */}
          <motion.div
            className="bg-white rounded-2xl p-8 text-center shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-charcoal/70 text-lg mb-4">
              {locale === "en"
                ? "We offer a variety of Indian food options for every dietary need"
                : "あらゆる食事のニーズに対応する多様なインド料理を提供しています"}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {[
                { en: "Vegetarian", jp: "ベジタリアン" },
                { en: "Vegan", jp: "ヴィーガン" },
                { en: "Halal", jp: "ハラル" },
                { en: "Gluten-Free", jp: "グルテンフリー" },
              ].map((item) => (
                <span
                  key={item.en}
                  className="px-4 py-2 bg-forest/10 text-forest rounded-full text-sm font-medium"
                >
                  {locale === "en" ? item.en : item.jp}
                </span>
              ))}
            </div>
            <a
              href="https://www.instagram.com/kumarhamamatsu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="md">
                {locale === "en" ? "Follow on Instagram" : "Instagramをフォロー"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== 8. GOOGLE REVIEWS SECTION ===== */}
      <motion.section
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: { opacity: 1 },
          visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
        }}
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-charcoal mb-3"
            variants={fadeInUp}
          >
            {locale === "en" ? "Google Reviews" : "Googleレビュー"}
          </motion.h2>
          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            variants={fadeInUp}
          >
            <motion.span
              className="text-5xl font-bold text-charcoal"
              onViewportEnter={() => setRatingInView(true)}
            >
              {ratingInView ? rating.toFixed(1) : "0.0"}
            </motion.span>
            <div className="text-left">
              <div className="flex gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? "fill-saffron text-saffron" : "fill-saffron/50 text-saffron/50"}`}
                  />
                ))}
              </div>
              <p className="text-charcoal/60 text-sm">
                {locale === "en"
                  ? "GOOD · Based on 168 reviews"
                  : "良い · 168件のレビューに基づく"}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {REVIEWS.slice(0, 3).map((review, index) => (
              <motion.div
                key={index}
                className="bg-cream/50 rounded-xl p-6 text-left"
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-sm">
                      {review.name}
                    </p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-saffron text-saffron"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-charcoal/70 text-sm italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ===== 9. FACEBOOK REVIEWS SECTION ===== */}
      <motion.section
        className="py-20 bg-cream"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: { opacity: 1 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-center gap-4 mb-12"
            variants={fadeInUp}
          >
            <img
              src="/images/social/fb-free-imng.png"
              alt="Facebook"
              className="w-10 h-10"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal">
              {locale === "en" ? "Facebook Reviews" : "Facebookレビュー"}
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {REVIEWS.map((review, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal">
                          {review.name}
                        </p>
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-saffron text-saffron"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-charcoal/70 text-sm leading-relaxed">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ===== 10. SOCIAL LINKS ===== */}
      <section className="py-12 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4">
          <motion.p
            className="text-center text-white/80 mb-6 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {locale === "en" ? "Follow Us" : "フォローする"}
          </motion.p>
          <div className="flex items-center justify-center gap-6">
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
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: i * 0.1 }}
              >
                <img
                  src={social.img}
                  alt={social.alt}
                  className="w-12 h-12"
                />
              </motion.a>
            ))}
            <motion.a
              href="https://www.instagram.com/kumarhamamatsu/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Ig</span>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ===== 11. FOOTER CTA ===== */}
      <section className="py-20 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
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
          <motion.img
            src="/images/decorative/old-typical-phone.png"
            alt="Phone"
            className="mx-auto w-16 h-16 mb-6 opacity-80"
            variants={fadeInUp}
            whileHover={{ rotate: [0, -5, 5, -3, 3, 0] }}
            transition={{ duration: 0.5 }}
          />
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-4"
            variants={fadeInUp}
          >
            {locale === "en"
              ? "Call for All Your Reservations"
              : "ご予約はお電話で"}
          </motion.h2>
          <motion.a
            href="tel:053-451-0154"
            className="text-3xl md:text-4xl font-bold text-saffron hover:text-saffron/80 transition-colors mb-8 inline-block"
            variants={fadeInUp}
            animate={{ textShadow: ["0 0 0px rgba(232,163,53,0)", "0 0 12px rgba(232,163,53,0.3)", "0 0 0px rgba(232,163,53,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" as const }}
          >
            053-451-0154
          </motion.a>

          <div className="mt-12 mb-6">
            <motion.img
              src="/images/logos/cropped-KumarLogo1-2-1-300x143.png"
              alt="Kumar Restaurant Logo"
              className="mx-auto w-48 md:w-64"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>

          <p className="text-white/50 text-sm mb-2">
            © {new Date().getFullYear()} Kumar Restaurant. All rights reserved.
          </p>
          <p className="text-saffron/80 text-sm italic">
            {locale === "en"
              ? "Spice up life at Kumar Restaurant"
              : "クマールレストランで人生をスパイシーに"}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
