"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import {
  Heart,
  Phone,
  Mail,
  Users,
  CalendarDays,
  Quote,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Crown,
  Gift,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const galleryImages = [
  { src: "/images/wedding/20231018_212357-1024x942.jpg", alt: "Indian Wedding Celebration at Kumar Restaurant" },
  { src: "/images/wedding/20231018_212407-1024x909.jpg", alt: "Wedding Decorations and Setup" },
  { src: "/images/wedding/20231018_212424-1024x665.jpg", alt: "Traditional Indian Wedding Ceremony" },
  { src: "/images/wedding/20231018_212435-1024x766.jpg", alt: "Wedding Reception Dinner" },
  { src: "/images/wedding/20231018_212449-1024x579.jpg", alt: "Wedding Guests and Family" },
  { src: "/images/wedding/20231018_212616-1024x1019.jpg", alt: "Wedding Feast and Catering" },
];

const packages = [
  { key: "intimate", icon: Heart, guests: "30-50", popular: false },
  { key: "standard", icon: Crown, guests: "50-100", popular: true },
  { key: "grand", icon: Sparkles, guests: "100-200", popular: false },
];

const guestOptions = ["", "30-50", "50-75", "75-100", "100-150", "150-200", "200+"];
const budgetOptions = ["", "500000", "500000-1000000", "1000000-2000000", "2000000+"];

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  guests?: string;
  budget?: string;
}

export default function WeddingsPage() {
  const locale = useLocale();
  const isJa = locale === "ja";

  useEffect(() => {
    const baseUrl = "https://kumarhamamatsu.com";

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = `${baseUrl}/en/weddings`;

    const existingTags = document.querySelectorAll('link[data-hreflang]');
    existingTags.forEach(tag => tag.remove());

    const enLink = document.createElement("link");
    enLink.rel = "alternate";
    enLink.hreflang = "en";
    enLink.href = `${baseUrl}/en/weddings`;
    enLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(enLink);

    const jaLink = document.createElement("link");
    jaLink.rel = "alternate";
    jaLink.hreflang = "ja";
    jaLink.href = `${baseUrl}/ja/weddings`;
    jaLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(jaLink);

    const xDefaultLink = document.createElement("link");
    xDefaultLink.rel = "alternate";
    xDefaultLink.hreflang = "x-default";
    xDefaultLink.href = `${baseUrl}/en/weddings`;
    xDefaultLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(xDefaultLink);

    return () => {
      const tags = document.querySelectorAll('link[data-hreflang]');
      tags.forEach(tag => tag.remove());
    };
  }, []);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    budget: "",
    specialRequests: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevImage = () => {
    setCurrentImageIndex((prev) => prev === 0 ? galleryImages.length - 1 : prev - 1);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => prev === galleryImages.length - 1 ? 0 : prev + 1);
  };

  const getTodayString = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = (now.getMonth() + 1).toString().padStart(2, "0");
    const d = now.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = isJa ? "名前を入力してください" : "Please enter your name";
    if (!formData.email.trim()) {
      newErrors.email = isJa ? "メールアドレスを入力してください" : "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = isJa ? "有効なメールアドレスを入力してください" : "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = isJa ? "電話番号を入力してください" : "Please enter your phone number";
    if (!formData.date) newErrors.date = isJa ? "挙式日を選択してください" : "Please select a wedding date";
    if (!formData.guests) newErrors.guests = isJa ? "ゲスト数を選択してください" : "Please select guest count";
    if (!formData.budget) newErrors.budget = isJa ? "予算を選択してください" : "Please select a budget range";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 1500));
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touchedFields.has(name) && errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouchedFields((prev) => new Set(prev).add(name));
    const fieldErrors = validate();
    if (fieldErrors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof FormErrors] }));
    }
  };

  const inputBase =
    "w-full px-5 py-3.5 bg-white border border-charcoal/15 rounded-xl text-charcoal placeholder-charcoal/35 focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all duration-300 font-sans";
  const inputError = "border-red focus:ring-red/20 focus:border-red";
  const labelBase = "block text-xs font-medium text-charcoal/60 mb-2 tracking-wider uppercase";

  return (
    <div className="min-h-screen bg-cream">
      {/* ───────── 1. HERO ───────── */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/images/wedding/20231018_212357-1024x942.jpg"
            alt="Indian Wedding at Kumar Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/70" />
          <div className="absolute inset-0 pattern-overlay opacity-15" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 rounded-full px-5 py-2.5 mb-6">
              <Heart className="w-4 h-4 text-saffron" />
              <span className="text-white text-sm font-sans font-medium">
                {isJa ? "挙式プランニング" : "Wedding Planning"}
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-tight mb-6">
              {isJa ? "インド式挙式プランニング" : "Indian Wedding Planning"}
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto mb-8" />
            <p className="text-xl md:text-2xl text-white/80 font-display italic mb-10 max-w-2xl mx-auto">
              {isJa
                ? "浜松で夢のようなインド式挙式を実現しませんか"
                : "Make your dream Indian wedding a reality in Hamamatsu"}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="#inquiry"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-saffron to-burgundy text-white rounded-xl font-sans text-sm font-medium hover:shadow-lg hover:shadow-saffron/25 transition-all duration-300"
            >
              {isJa ? "お問い合わせ" : "Inquire Now"}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:053-451-0154"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white rounded-xl font-sans text-sm font-medium hover:bg-white/10 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              053-451-0154
            </a>
          </motion.div>
        </div>
      </section>

      {/* ───────── 2. WHY KUMAR ───────── */}
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
              {isJa ? "選ばれる理由" : "Why Us"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold mb-4">
              {isJa ? "クマールが選ばれる理由" : "Why Choose Kumar"}
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, titleEn: "Spacious Banquet Hall", titleJa: "広々とした宴会場", descEn: "Accommodating up to 200 guests in our spacious venue", descJa: "最大200名様まで収容可能な広々とした宴会場" },
              { icon: Sparkles, titleEn: "Authentic Indian Catering", titleJa: "本格インド料理", descEn: "Genuine Indian cuisine with spices imported from India", descJa: "本場インドのスパイスを使った本格的なケータリング" },
              { icon: Heart, titleEn: "Cultural Expertise", titleJa: "文化的専門知識", descEn: "Experienced staff knowledgeable in Indian wedding traditions", descJa: "インドの挙式慣行に精通した専門スタッフ" },
              { icon: Users, titleEn: "Bilingual Support", titleJa: "バイリンガル対応", descEn: "Full support in both English and Japanese", descJa: "英語と日本語のバイリンガルサポート" },
            ].map((item, i) => (
              <motion.div
                key={item.titleEn}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <div className="bg-cream rounded-3xl border border-charcoal/5 p-8 text-center h-full">
                  <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-saffron/15 to-gold/15 flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-saffron" />
                  </div>
                  <h3 className="font-display text-lg text-charcoal font-semibold mb-2">
                    {isJa ? item.titleJa : item.titleEn}
                  </h3>
                  <p className="text-charcoal/55 font-sans text-sm leading-relaxed">
                    {isJa ? item.descJa : item.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 3. TRADITIONAL ELEMENTS ───────── */}
      <section className="py-20 lg:py-28 bg-cream">
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
              {isJa ? "伝統的な要素" : "Traditions"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold mb-4">
              {isJa ? "伝統的な要素" : "Traditional Elements"}
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto mb-6" />
            <p className="text-lg text-charcoal/60 max-w-2xl mx-auto font-sans">
              {isJa
                ? "インドの伝統的な挙式要素を完全にサポート"
                : "We help you incorporate authentic Indian wedding traditions"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Gift, color: "forest", titleEn: "Mehendi Ceremony", titleJa: "メヘンディー", descEn: "Traditional henna art ceremony for the bride", descJa: "ヘナを使った伝統的な装饰儀式" },
              { icon: Heart, color: "saffron", titleEn: "Saptapadi", titleJa: "サプタパディ", descEn: "The sacred seven steps around the holy fire", descJa: "七つの誓いの伝統的なセレモニー" },
              { icon: Crown, color: "red", titleEn: "Mandap Decoration", titleJa: "マンダプ装饰", descEn: "Beautifully decorated wedding canopy setup", descJa: "華やかな挙式用テントの装饰" },
              { icon: Sparkles, color: "saffron", titleEn: "Baraat", titleJa: "バラート", descEn: "The groom's grand celebratory procession", descJa: "新郎の華やかな行列" },
            ].map((item, i) => (
              <motion.div
                key={item.titleEn}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <div className="bg-white rounded-3xl border border-charcoal/5 p-8 h-full">
                  <div className={`w-12 h-12 mb-5 rounded-xl flex items-center justify-center ${
                    item.color === "forest" ? "bg-forest/10" : item.color === "red" ? "bg-red/10" : "bg-saffron/10"
                  }`}>
                    <item.icon className={`w-6 h-6 ${
                      item.color === "forest" ? "text-forest" : item.color === "red" ? "text-red" : "text-saffron"
                    }`} />
                  </div>
                  <h3 className="font-display text-lg text-charcoal font-semibold mb-2">
                    {isJa ? item.titleJa : item.titleEn}
                  </h3>
                  <p className="text-charcoal/55 font-sans text-sm leading-relaxed">
                    {isJa ? item.descJa : item.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 4. PACKAGES ───────── */}
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
              {isJa ? "挙式パッケージ" : "Packages"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold mb-4">
              {isJa ? "挙式パッケージ" : "Wedding Packages"}
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto mb-6" />
            <p className="text-lg text-charcoal/60 max-w-2xl mx-auto font-sans">
              {isJa
                ? "お二人の特別な日に合わせた柔軟なプランをご用意しています"
                : "Flexible packages tailored to your special day"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <div className={`rounded-3xl p-8 text-center h-full relative ${
                  pkg.popular
                    ? "bg-gradient-to-b from-white to-saffron/5 border-2 border-gold shadow-[0_4px_40px_rgba(212,175,55,0.12)]"
                    : "bg-white border border-charcoal/5"
                }`}>
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 bg-gradient-to-r from-saffron to-gold text-white text-xs font-sans font-medium rounded-full tracking-wider uppercase">
                      {isJa ? "人気" : "Popular"}
                    </div>
                  )}
                  <div className={`w-14 h-14 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                    pkg.popular ? "bg-gradient-to-br from-saffron/20 to-gold/20" : "bg-cream"
                  }`}>
                    <pkg.icon className={`w-7 h-7 ${pkg.popular ? "text-saffron" : "text-charcoal/60"}`} />
                  </div>
                  <h3 className="font-display text-xl text-charcoal font-semibold mb-2">
                    {isJa
                      ? pkg.key === "intimate" ? "インティメイト" : pkg.key === "standard" ? "スタンダード" : "グランド"
                      : pkg.key.charAt(0).toUpperCase() + pkg.key.slice(1)}
                  </h3>
                  <p className={`text-3xl font-display font-bold mb-1 ${pkg.popular ? "text-saffron" : "text-charcoal"}`}>
                    {pkg.guests}
                  </p>
                  <p className="text-charcoal/40 text-xs font-sans tracking-wider uppercase mb-6">
                    {isJa ? "ゲスト" : "guests"}
                  </p>
                  <div className="w-full h-px bg-charcoal/5 mb-6" />
                  <ul className="text-left text-charcoal/60 text-sm font-sans space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-forest mt-0.5 flex-shrink-0" />
                      {isJa ? "専用宴会場" : "Dedicated banquet space"}
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-forest mt-0.5 flex-shrink-0" />
                      {isJa ? "フルケータリング" : "Full catering service"}
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-forest mt-0.5 flex-shrink-0" />
                      {isJa ? "装飾サポート" : "Decoration assistance"}
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-forest mt-0.5 flex-shrink-0" />
                      {isJa ? "バイリンガルMC" : "Bilingual MC support"}
                    </li>
                  </ul>
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
            <div className="inline-block bg-cream rounded-2xl px-8 py-5 border border-charcoal/5">
              <p className="text-charcoal/60 font-sans text-sm mb-3">
                {isJa ? "カスタムパッケージもご相談可能です" : "Custom packages available to suit your needs"}
              </p>
              <a href="#inquiry" className="inline-flex items-center gap-2 text-saffron text-sm font-sans font-medium hover:gap-3 transition-all duration-300">
                {isJa ? "お問い合わせ" : "Inquire Now"}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────── 5. GALLERY ───────── */}
      <section className="py-20 lg:py-28 bg-cream">
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
              {isJa ? "ギャラリー" : "Gallery"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold mb-4">
              {isJa ? "ウェディングギャラリー" : "Wedding Gallery"}
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto mb-6" />
            <p className="text-lg text-charcoal/60 font-sans">
              {isJa ? "過去の挙式の美しい瞬間" : "Beautiful moments from past weddings"}
            </p>
          </motion.div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => openLightbox(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── LIGHTBOX ───────── */}
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
              className="absolute top-6 right-6 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-8 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-8 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            <motion.div
              className="max-w-4xl max-h-[85vh] px-16"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-xl"
              />
              <p className="text-white/50 text-center mt-4 font-sans text-sm">
                {galleryImages[currentImageIndex].alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────── 6. INQUIRY FORM ───────── */}
      <section id="inquiry" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                    className="text-center py-16 bg-cream rounded-3xl border border-saffron/15"
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="font-display text-2xl text-charcoal font-semibold mb-3">
                      {isJa ? "お問い合わせを受け付けました！" : "Inquiry Received!"}
                    </h3>
                    <p className="text-charcoal/60 mb-8 font-sans max-w-md mx-auto">
                      {isJa ? "詳細をご確認の上、近日中にご連絡いたします。" : "We will review your inquiry and get back to you soon."}
                    </p>
                    <motion.button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", phone: "", date: "", guests: "", budget: "", specialRequests: "" });
                      }}
                      className="px-8 py-3 bg-charcoal text-white rounded-xl hover:bg-charcoal/80 transition-colors font-sans text-sm"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isJa ? "新しいお問い合わせ" : "New Inquiry"}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5 bg-white rounded-3xl border border-charcoal/10 p-8 sm:p-10 shadow-[0_4px_40px_rgba(26,26,26,0.04)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={0}
                    >
                      <label htmlFor="name" className={labelBase}>{isJa ? "お名前" : "Name"} *</label>
                      <input
                        id="name" name="name" type="text"
                        value={formData.name} onChange={handleChange} onBlur={handleBlur}
                        placeholder={isJa ? "山田 太郎" : "Your Name"}
                        className={`${inputBase} ${errors.name ? inputError : ""}`}
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "w-name-error" : undefined}
                      />
                      {errors.name && <p id="w-name-error" className="mt-1.5 text-xs text-red flex items-center gap-1" role="alert"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={1}
                    >
                      <div>
                        <label htmlFor="email" className={labelBase}>{isJa ? "メールアドレス" : "Email"} *</label>
                        <input
                          id="email" name="email" type="email"
                          value={formData.email} onChange={handleChange} onBlur={handleBlur}
                          placeholder="example@email.com"
                          className={`${inputBase} ${errors.email ? inputError : ""}`}
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "w-email-error" : undefined}
                        />
                        {errors.email && <p id="w-email-error" className="mt-1.5 text-xs text-red flex items-center gap-1" role="alert"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelBase}>{isJa ? "電話番号" : "Phone"} *</label>
                        <input
                          id="phone" name="phone" type="tel"
                          value={formData.phone} onChange={handleChange} onBlur={handleBlur}
                          placeholder="090-1234-5678"
                          className={`${inputBase} ${errors.phone ? inputError : ""}`}
                          aria-required="true"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "w-phone-error" : undefined}
                        />
                        {errors.phone && <p id="w-phone-error" className="mt-1.5 text-xs text-red flex items-center gap-1" role="alert"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                      </div>
                    </motion.div>

                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={2}
                    >
                      <label htmlFor="date" className={labelBase}>{isJa ? "挙式予定日" : "Wedding Date"} *</label>
                      <input
                        id="date" name="date" type="date"
                        min={getTodayString()}
                        value={formData.date} onChange={handleChange} onBlur={handleBlur}
                        className={`${inputBase} ${errors.date ? inputError : ""}`}
                        aria-required="true"
                        aria-invalid={!!errors.date}
                        aria-describedby={errors.date ? "w-date-error" : undefined}
                      />
                      {errors.date && <p id="w-date-error" className="mt-1.5 text-xs text-red flex items-center gap-1" role="alert"><AlertCircle className="w-3 h-3" />{errors.date}</p>}
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={3}
                    >
                      <div>
                        <label htmlFor="guests" className={labelBase}>{isJa ? "ゲスト数" : "Guest Count"} *</label>
                        <select
                          id="guests" name="guests"
                          value={formData.guests} onChange={handleChange} onBlur={handleBlur}
                          className={`${inputBase} ${errors.guests ? inputError : ""}`}
                          aria-required="true"
                          aria-invalid={!!errors.guests}
                          aria-describedby={errors.guests ? "w-guests-error" : undefined}
                        >
                          <option value="">{isJa ? "ゲスト数を選択" : "Select guest count"}</option>
                          {guestOptions.slice(1).map((opt) => (
                            <option key={opt} value={opt}>{opt} {isJa ? "名" : "guests"}</option>
                          ))}
                        </select>
                        {errors.guests && <p id="w-guests-error" className="mt-1.5 text-xs text-red flex items-center gap-1" role="alert"><AlertCircle className="w-3 h-3" />{errors.guests}</p>}
                      </div>
                      <div>
                        <label htmlFor="budget" className={labelBase}>{isJa ? "予算" : "Budget Range"} *</label>
                        <select
                          id="budget" name="budget"
                          value={formData.budget} onChange={handleChange} onBlur={handleBlur}
                          className={`${inputBase} ${errors.budget ? inputError : ""}`}
                          aria-required="true"
                          aria-invalid={!!errors.budget}
                          aria-describedby={errors.budget ? "w-budget-error" : undefined}
                        >
                          <option value="">{isJa ? "予算を選択" : "Select budget"}</option>
                          <option value="500000">{isJa ? "~ ¥500,000" : "~ ¥500,000"}</option>
                          <option value="500000-1000000">¥500,000 - ¥1,000,000</option>
                          <option value="1000000-2000000">¥1,000,000 - ¥2,000,000</option>
                          <option value="2000000+">{isJa ? "¥2,000,000以上" : "¥2,000,000+"}</option>
                        </select>
                        {errors.budget && <p id="w-budget-error" className="mt-1.5 text-xs text-red flex items-center gap-1" role="alert"><AlertCircle className="w-3 h-3" />{errors.budget}</p>}
                      </div>
                    </motion.div>

                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={4}
                    >
                      <label htmlFor="specialRequests" className={labelBase}>{isJa ? "特別なご要望" : "Special Requests"}</label>
                      <textarea
                        id="specialRequests" name="specialRequests" rows={4}
                        value={formData.specialRequests} onChange={handleChange}
                        placeholder={isJa ? "挙式スタイル、装飾、メニューの要望など" : "Wedding style, decoration preferences, menu requests, etc."}
                        className={`${inputBase} resize-none`}
                      />
                    </motion.div>

                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={5}
                    >
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-gradient-to-r from-saffron to-burgundy text-white font-sans font-medium rounded-xl hover:shadow-lg hover:shadow-saffron/25 transition-all duration-300 text-sm tracking-wide disabled:opacity-70 disabled:cursor-wait"
                        whileHover={isSubmitting ? undefined : { scale: 1.02 }}
                        whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                      >
                        {isSubmitting
                          ? (isJa ? "送信中..." : "Submitting...")
                          : (isJa ? "今すぐお問い合わせ" : "Inquire Now")}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                className="bg-cream rounded-3xl border border-charcoal/5 p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={1}
              >
                <h3 className="font-display text-xl text-charcoal font-semibold mb-6">
                  {isJa ? "お問い合わせ" : "Get in Touch"}
                </h3>
                <div className="space-y-5">
                  <a href="tel:053-451-0154" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0 group-hover:bg-saffron/20 transition-colors">
                      <Phone className="w-5 h-5 text-saffron" />
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 mb-1 tracking-wider uppercase font-sans">{isJa ? "電話" : "Phone"}</p>
                      <p className="text-charcoal font-medium font-sans group-hover:text-saffron transition-colors">053-451-0154</p>
                    </div>
                  </a>

                  <a href="mailto:weddings@kumar-hamamatsu.com" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-burgundy/10 flex items-center justify-center shrink-0 group-hover:bg-burgundy/20 transition-colors">
                      <Mail className="w-5 h-5 text-burgundy" />
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 mb-1 tracking-wider uppercase font-sans">{isJa ? "メール" : "Email"}</p>
                      <p className="text-charcoal font-medium text-sm font-sans group-hover:text-burgundy transition-colors">
                        weddings@kumar-hamamatsu.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 mb-1 tracking-wider uppercase font-sans">{isJa ? "住所" : "Address"}</p>
                      <p className="text-charcoal text-sm font-sans leading-relaxed">
                        Act Tower B1, Itayamachi, Naka Ward,<br />
                        Hamamatsu, Shizuoka 430-7790
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-cream rounded-3xl border border-charcoal/5 p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={2}
              >
                <h3 className="font-display text-xl text-charcoal font-semibold mb-5">
                  {isJa ? "ご予約の流れ" : "How It Works"}
                </h3>
                <div className="space-y-4">
                  {[
                    { num: "1", titleEn: "Inquire", titleJa: "お問い合わせ", descEn: "Contact us via form or phone", descJa: "フォームまたはお電話でご連絡ください" },
                    { num: "2", titleEn: "Consultation", titleJa: "打ち合わせ", descEn: "We discuss your vision and requirements", descJa: "詳細をご相談します" },
                    { num: "3", titleEn: "Plan Confirmation", titleJa: "プラン確定", descEn: "We create your custom wedding plan", descJa: "カスタムプランをお出しします" },
                    { num: "4", titleEn: "Your Special Day", titleJa: "挙式当日", descEn: "We make your dream wedding come true", descJa: "最高の一日を演出します" },
                  ].map((step) => (
                    <div key={step.num} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron/20 to-gold/20 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-saffron font-sans">{step.num}</span>
                      </div>
                      <div>
                        <p className="font-sans font-medium text-charcoal text-sm">
                          {isJa ? step.titleJa : step.titleEn}
                        </p>
                        <p className="text-charcoal/50 text-xs font-sans">
                          {isJa ? step.descJa : step.descEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 7. TESTIMONIALS ───────── */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <p className="text-saffron text-xs tracking-[0.3em] uppercase mb-3 font-sans">
              {isJa ? "お客様の声" : "Testimonials"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold mb-4">
              {isJa ? "お客様の声" : "Happy Couples"}
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto mb-6" />
            <p className="text-lg text-charcoal/60 font-sans">
              {isJa ? "クマールで挙式されたカップルの声" : "What couples say about their wedding at Kumar"}
            </p>
          </motion.div>

          <motion.div
            className="mt-12 bg-white rounded-3xl border border-charcoal/5 p-10 sm:p-12 relative shadow-[0_4px_40px_rgba(26,26,26,0.03)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <div className="absolute -top-5 left-10 w-10 h-10 bg-gradient-to-br from-saffron to-gold rounded-xl flex items-center justify-center">
              <Quote className="w-5 h-5 text-white" />
            </div>
            <p className="font-display text-xl md:text-2xl text-charcoal/80 italic leading-relaxed mb-8 mt-2">
              &ldquo;{isJa
                ? "クマールレストランでの挙式は魔法のようでした！料理は素晴らしく、スタッフの皆さんがすべてを完璧にしてくれました。"
                : "Our wedding at Kumar Restaurant was magical! The food was incredible and the staff made everything perfect."}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="font-sans text-sm text-charcoal/60">
                — {isJa ? "幸せなカップル" : "Happy Couple"}
              </span>
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
              {isJa ? "挙式についてお問い合わせください" : "Ready to Plan Your Dream Wedding?"}
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto mb-8" />
            <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto font-sans">
              {isJa
                ? "クマールレストランであなたの特別な日を演出しませんか。まずはお問い合わせください。"
                : "Let Kumar Restaurant be the venue for your most special day. Contact us to get started."}
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
            <a
              href="#inquiry"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-saffron to-burgundy text-white rounded-xl font-sans text-sm font-medium hover:shadow-lg hover:shadow-saffron/25 transition-all duration-300"
            >
              {isJa ? "お問い合わせ" : "Contact Us"}
              <ArrowRight className="w-4 h-4" />
            </a>
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
