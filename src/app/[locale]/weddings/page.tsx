"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Button, Card, CardContent } from "@/components";
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

const galleryImages = [
  { src: "/images/wedding/20231018_212357-1024x942.jpg", alt: "Indian Wedding Celebration at Kumar Restaurant" },
  { src: "/images/wedding/20231018_212407-1024x909.jpg", alt: "Wedding Decorations and Setup" },
  { src: "/images/wedding/20231018_212424-1024x665.jpg", alt: "Traditional Indian Wedding Ceremony" },
  { src: "/images/wedding/20231018_212435-1024x766.jpg", alt: "Wedding Reception Dinner" },
  { src: "/images/wedding/20231018_212449-1024x579.jpg", alt: "Wedding Guests and Family" },
  { src: "/images/wedding/20231018_212616-1024x1019.jpg", alt: "Wedding Feast and Catering" },
];

const packages = [
  {
    key: "intimate",
    icon: Heart,
    guests: "30-50",
    color: "saffron",
  },
  {
    key: "standard",
    icon: Crown,
    guests: "50-100",
    color: "forest",
  },
  {
    key: "grand",
    icon: Sparkles,
    guests: "100-200",
    color: "red",
  },
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

  const getTodayString = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = (now.getMonth() + 1).toString().padStart(2, "0");
    const d = now.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = isJa ? "名前を入力してください" : "Please enter your name";
    }
    if (!formData.email.trim()) {
      newErrors.email = isJa ? "メールアドレスを入力してください" : "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = isJa ? "有効なメールアドレスを入力してください" : "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = isJa ? "電話番号を入力してください" : "Please enter your phone number";
    }
    if (!formData.date) {
      newErrors.date = isJa ? "挙式日を選択してください" : "Please select a wedding date";
    }
    if (!formData.guests) {
      newErrors.guests = isJa ? "ゲスト数を選択してください" : "Please select guest count";
    }
    if (!formData.budget) {
      newErrors.budget = isJa ? "予算を選択してください" : "Please select a budget range";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-saffron transition-colors";
  const inputError = "border-red focus:ring-red focus:border-red";
  const labelBase = "block text-sm font-medium text-charcoal mb-1.5";

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" as const }}
        >
          <img
            src="/images/wedding/20231018_212357-1024x942.jpg"
            alt="Indian Wedding at Kumar Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Heart className="w-4 h-4 text-saffron" />
              <span className="text-white text-sm font-medium">
                {isJa ? "挙式プランニング" : "Wedding Planning"}
              </span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" as const }}
            >
              {isJa ? "インド式挙式プランニング" : "Indian Wedding Planning"}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {isJa
                ? "浜松で夢のようなインド式挙式を実現しませんか"
                : "Make your dream Indian wedding a reality in Hamamatsu"}
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a href="#inquiry">
                <Button variant="primary" size="lg">
                  {isJa ? "お問い合わせ" : "Inquire Now"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <a href="tel:053-451-0154">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-2 border-white hover:bg-white/10"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  053-451-0154
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Kumar Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {isJa ? "クマールが選ばれる理由" : "Why Choose Kumar"}
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              {isJa
                ? "夢のようなインド式挙式を浜松で実現しませんか"
                : "Make your dream Indian wedding a reality in Hamamatsu"}
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card hover className="text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-saffron/20 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-saffron" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    {isJa ? "広々とした宴会場" : "Spacious Banquet Hall"}
                  </h3>
                  <p className="text-charcoal/70 text-sm">
                    {isJa
                      ? "最大200名様まで収容可能な広々とした宴会場"
                      : "Accommodating up to 200 guests in our spacious venue"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card hover className="text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-forest/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-forest" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    {isJa ? "本格インド料理" : "Authentic Indian Catering"}
                  </h3>
                  <p className="text-charcoal/70 text-sm">
                    {isJa
                      ? "本場インドのスパイスを使った本格的なケータリング"
                      : "Genuine Indian cuisine with spices imported from India"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card hover className="text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-red/20 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-red" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    {isJa ? "文化的専門知識" : "Cultural Expertise"}
                  </h3>
                  <p className="text-charcoal/70 text-sm">
                    {isJa
                      ? "インドの挙式慣行に精通した専門スタッフ"
                      : "Experienced staff knowledgeable in Indian wedding traditions"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card hover className="text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-charcoal/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-charcoal">EN/JP</span>
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    {isJa ? "バイリンガル対応" : "Bilingual Support"}
                  </h3>
                  <p className="text-charcoal/70 text-sm">
                    {isJa
                      ? "英語と日本語のバイリンガルサポート"
                      : "Full support in both English and Japanese"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Traditional Elements Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {isJa ? "伝統的な要素" : "Traditional Elements"}
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              {isJa
                ? "インドの伝統的な挙式要素を完全にサポート"
                : "We help you incorporate authentic Indian wedding traditions"}
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card hover>
                <CardContent className="pt-8 pb-8">
                  <div className="w-14 h-14 mb-5 bg-forest/20 rounded-xl flex items-center justify-center">
                    <Gift className="w-7 h-7 text-forest" />
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal mb-2">
                    {isJa ? "メヘンディー" : "Mehendi Ceremony"}
                  </h3>
                  <p className="text-charcoal/70 text-sm">
                    {isJa
                      ? "ヘナを使った伝統的な装饰儀式"
                      : "Traditional henna art ceremony for the bride"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card hover>
                <CardContent className="pt-8 pb-8">
                  <div className="w-14 h-14 mb-5 bg-saffron/20 rounded-xl flex items-center justify-center">
                    <Heart className="w-7 h-7 text-saffron" />
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal mb-2">
                    {isJa ? "サプタパディ" : "Saptapadi"}
                  </h3>
                  <p className="text-charcoal/70 text-sm">
                    {isJa
                      ? "七つの誓いの伝統的なセレモニー"
                      : "The sacred seven steps around the holy fire"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card hover>
                <CardContent className="pt-8 pb-8">
                  <div className="w-14 h-14 mb-5 bg-red/20 rounded-xl flex items-center justify-center">
                    <Crown className="w-7 h-7 text-red" />
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal mb-2">
                    {isJa ? "マンダプ装饰" : "Mandap Decoration"}
                  </h3>
                  <p className="text-charcoal/70 text-sm">
                    {isJa
                      ? "華やかな挙式用テントの装饰"
                      : "Beautifully decorated wedding canopy setup"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card hover>
                <CardContent className="pt-8 pb-8">
                  <div className="w-14 h-14 mb-5 bg-saffron-light/40 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-saffron" />
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal mb-2">
                    {isJa ? "バラート" : "Baraat"}
                  </h3>
                  <p className="text-charcoal/70 text-sm">
                    {isJa
                      ? "新郎の華やかな行列"
                      : "The groom's grand celebratory procession"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Wedding Packages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {isJa ? "挙式パッケージ" : "Wedding Packages"}
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              {isJa
                ? "お二人の特別な日に合わせた柔軟なプランをご用意しています"
                : "Flexible packages tailored to your special day"}
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className={pkg.key === "standard" ? "relative" : ""}
              >
                {pkg.key === "standard" && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-saffron to-forest rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                )}
                <Card hover className={`text-center relative ${pkg.key === "standard" ? "border-2 border-saffron" : ""}`}>
                  <CardContent className="pt-8 pb-8">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 ${
                      pkg.color === "saffron"
                        ? "bg-saffron/20"
                        : pkg.color === "forest"
                        ? "bg-forest/20"
                        : "bg-red/20"
                    } rounded-full flex items-center justify-center`}
                  >
                    <pkg.icon
                      className={`w-8 h-8 ${
                        pkg.color === "saffron"
                          ? "text-saffron"
                          : pkg.color === "forest"
                          ? "text-forest"
                          : "text-red"
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">
                    {isJa
                      ? pkg.key === "intimate"
                        ? "インティメイト"
                        : pkg.key === "standard"
                        ? "スタンダード"
                        : "グランド"
                      : pkg.key.charAt(0).toUpperCase() + pkg.key.slice(1)}
                  </h3>
                  <p className="text-3xl font-bold text-saffron mb-2">
                    {pkg.guests}
                  </p>
                  <p className="text-charcoal/60 text-sm mb-6">
                    {isJa ? "ゲスト" : "guests"}
                  </p>
                  <ul className="text-left text-charcoal/70 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-forest mt-0.5 flex-shrink-0" />
                      {isJa ? "専用宴会場" : "Dedicated banquet space"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-forest mt-0.5 flex-shrink-0" />
                      {isJa ? "フルケータリング" : "Full catering service"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-forest mt-0.5 flex-shrink-0" />
                      {isJa ? "装飾サポート" : "Decoration assistance"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-forest mt-0.5 flex-shrink-0" />
                      {isJa ? "バイリンガルMC" : "Bilingual MC support"}
                    </li>
                  </ul>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card hover className="inline-block">
              <CardContent className="pt-6 pb-6 px-8">
                <p className="text-charcoal/70 mb-3">
                  {isJa
                    ? "カスタムパッケージもご相談可能です"
                    : "Custom packages available to suit your needs"}
                </p>
                <a href="#inquiry">
                  <Button variant="secondary" size="sm">
                    {isJa ? "お問い合わせ" : "Inquire Now"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {isJa ? "ウェディングギャラリー" : "Wedding Gallery"}
            </h2>
            <p className="text-lg text-charcoal/70">
              {isJa
                ? "過去の挙式の美しい瞬間"
                : "Beautiful moments from past weddings"}
            </p>
          </motion.div>
          <motion.div
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => openLightbox(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative overflow-hidden rounded-xl shadow-md">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
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
              className="absolute top-4 right-4 text-white hover:text-saffron transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 text-white hover:text-saffron transition-colors"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 text-white hover:text-saffron transition-colors"
            >
              <ChevronRight className="w-12 h-12" />
            </button>
            <motion.div
              className="max-w-4xl max-h-[80vh] px-12"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <p className="text-white text-center mt-4">
                {galleryImages[currentImageIndex].alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wedding Inquiry Form */}
      <section id="inquiry" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <motion.div
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-saffron" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-charcoal">
                        {isJa ? "挙式のお問い合わせ" : "Wedding Inquiry"}
                      </h2>
                      <p className="text-sm text-charcoal/60">
                        {isJa ? "ご希望をお聞かせください" : "Tell us about your dream wedding"}
                      </p>
                    </div>
                  </motion.div>

                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, type: "spring" as const }}
                        className="text-center py-12"
                      >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-forest/10 flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-forest" />
                      </div>
                      <h3 className="text-xl font-semibold text-charcoal mb-2">
                        {isJa ? "お問い合わせを受け付けました！" : "Inquiry Received!"}
                      </h3>
                      <p className="text-charcoal/70 mb-6">
                        {isJa
                          ? "詳細をご確認の上、近日中にご連絡いたします。"
                          : "We will review your inquiry and get back to you soon."}
                      </p>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            date: "",
                            guests: "",
                            budget: "",
                            specialRequests: "",
                          });
                        }}
                      >
                        {isJa ? "新しいお問い合わせ" : "New Inquiry"}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Name */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                      >
                        <label htmlFor="name" className={labelBase}>
                          {isJa ? "お名前" : "Name"} *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={isJa ? "山田 太郎" : "Your Name"}
                          className={`${inputBase} ${errors.name ? inputError : ""}`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.name}
                          </p>
                        )}
                      </motion.div>

                      {/* Email & Phone Row */}
                      <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <div>
                          <label htmlFor="email" className={labelBase}>
                            {isJa ? "メールアドレス" : "Email"} *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            className={`${inputBase} ${errors.email ? inputError : ""}`}
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="phone" className={labelBase}>
                            {isJa ? "電話番号" : "Phone"} *
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="090-1234-5678"
                            className={`${inputBase} ${errors.phone ? inputError : ""}`}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {errors.phone}
                          </p>
                        )}
                      </div>
                      </motion.div>

                      {/* Wedding Date */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <label htmlFor="date" className={labelBase}>
                          {isJa ? "挙式予定日" : "Wedding Date"} *
                        </label>
                        <input
                          id="date"
                          name="date"
                          type="date"
                          min={getTodayString()}
                          value={formData.date}
                          onChange={handleChange}
                          className={`${inputBase} ${errors.date ? inputError : ""}`}
                        />
                        {errors.date && (
                          <p className="mt-1 text-sm text-red flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.date}
                          </p>
                        )}
                      </motion.div>

                      {/* Guest Count & Budget Row */}
                      <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <div>
                          <label htmlFor="guests" className={labelBase}>
                            {isJa ? "ゲスト数" : "Guest Count"} *
                          </label>
                          <select
                            id="guests"
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            className={`${inputBase} ${errors.guests ? inputError : ""}`}
                          >
                            <option value="">
                              {isJa ? "ゲスト数を選択" : "Select guest count"}
                            </option>
                            {guestOptions.slice(1).map((opt) => (
                              <option key={opt} value={opt}>
                                {opt} {isJa ? "名" : "guests"}
                              </option>
                            ))}
                          </select>
                          {errors.guests && (
                            <p className="mt-1 text-sm text-red flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {errors.guests}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="budget" className={labelBase}>
                            {isJa ? "予算" : "Budget Range"} *
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className={`${inputBase} ${errors.budget ? inputError : ""}`}
                          >
                            <option value="">
                              {isJa ? "予算を選択" : "Select budget"}
                            </option>
                            <option value="500000">
                              {isJa ? "~ ¥500,000" : "~ ¥500,000"}
                            </option>
                            <option value="500000-1000000">
                              ¥500,000 - ¥1,000,000
                            </option>
                            <option value="1000000-2000000">
                              ¥1,000,000 - ¥2,000,000
                            </option>
                            <option value="2000000+">
                              {isJa ? "¥2,000,000以上" : "¥2,000,000+"}
                            </option>
                          </select>
                          {errors.budget && (
                            <p className="mt-1 text-sm text-red flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {errors.budget}
                          </p>
                        )}
                      </div>
                      </motion.div>

                      {/* Special Requests */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <label htmlFor="specialRequests" className={labelBase}>
                          {isJa ? "特別なご要望" : "Special Requests"}
                        </label>
                        <textarea
                          id="specialRequests"
                          name="specialRequests"
                          rows={4}
                          value={formData.specialRequests}
                          onChange={handleChange}
                          placeholder={
                            isJa
                              ? "挙式スタイル、装飾、メニューの要望など"
                              : "Wedding style, decoration preferences, menu requests, etc."
                          }
                          className={`${inputBase} resize-none`}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.02, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
                        >
                          <Button type="submit" variant="primary" size="lg" className="w-full">
                            {isJa ? "今すぐお問い合わせ" : "Inquire Now"}
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.form>
                  )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-charcoal mb-6">
                    {isJa ? "お問い合わせ" : "Get in Touch"}
                  </h3>
                  <div className="space-y-5">
                    <a
                      href="tel:053-451-0154"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-saffron/10 flex items-center justify-center shrink-0 group-hover:bg-saffron/20 transition-colors">
                        <Phone className="w-5 h-5 text-saffron" />
                      </div>
                      <div>
                        <p className="text-sm text-charcoal/60 mb-0.5">
                          {isJa ? "電話" : "Phone"}
                        </p>
                        <p className="text-charcoal font-medium group-hover:text-saffron transition-colors">
                          053-451-0154
                        </p>
                      </div>
                    </a>

                    <a
                      href="mailto:weddings@kumar-hamamatsu.com"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center shrink-0 group-hover:bg-forest/20 transition-colors">
                        <Mail className="w-5 h-5 text-forest" />
                      </div>
                      <div>
                        <p className="text-sm text-charcoal/60 mb-0.5">
                          {isJa ? "メール" : "Email"}
                        </p>
                        <p className="text-charcoal font-medium text-sm group-hover:text-forest transition-colors">
                          weddings@kumar-hamamatsu.com
                        </p>
                      </div>
                    </a>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-red/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-red" />
                      </div>
                      <div>
                        <p className="text-sm text-charcoal/60 mb-0.5">
                          {isJa ? "住所" : "Address"}
                        </p>
                        <p className="text-charcoal text-sm leading-relaxed">
                          Act Tower B1, Itayamachi, Naka Ward,
                          <br />
                          Hamamatsu, Shizuoka 430-7790
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-charcoal mb-4">
                    {isJa ? "ご予約の流れ" : "How It Works"}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-saffron">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-charcoal text-sm">
                          {isJa ? "お問い合わせ" : "Inquire"}
                        </p>
                        <p className="text-charcoal/60 text-xs">
                          {isJa ? "フォームまたはお電話でご連絡ください" : "Contact us via form or phone"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-saffron">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-charcoal text-sm">
                          {isJa ? "打ち合わせ" : "Consultation"}
                        </p>
                        <p className="text-charcoal/60 text-xs">
                          {isJa ? "詳細をご相談します" : "We discuss your vision and requirements"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-saffron">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-charcoal text-sm">
                          {isJa ? "プラン確定" : "Plan Confirmation"}
                        </p>
                        <p className="text-charcoal/60 text-xs">
                          {isJa ? "カスタムプランをお出しします" : "We create your custom wedding plan"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-saffron">4</span>
                      </div>
                      <div>
                        <p className="font-medium text-charcoal text-sm">
                          {isJa ? "挙式当日" : "Your Special Day"}
                        </p>
                        <p className="text-charcoal/60 text-xs">
                          {isJa ? "最高の一日を演出します" : "We make your dream wedding come true"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {isJa ? "お客様の声" : "Happy Couples"}
            </h2>
            <p className="text-lg text-charcoal/70">
              {isJa
                ? "クマールで挙式されたカップルの声"
                : "What couples say about their wedding at Kumar"}
            </p>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card hover>
                <CardContent className="p-8">
                  <Quote className="w-10 h-10 text-saffron/40 mb-4" />
                  <p className="text-lg text-charcoal/80 italic mb-6">
                    &ldquo;
                    {isJa
                      ? "クマールレストランでの挙式は魔法のようでした！料理は素晴らしく、スタッフの皆さんがすべてを完璧にしてくれました。"
                      : "Our wedding at Kumar Restaurant was magical! The food was incredible and the staff made everything perfect."}
                    &rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-saffron text-saffron" />
                      ))}
                    </div>
                    <span className="font-semibold text-charcoal">
                      {isJa ? "幸せなカップル" : "Happy Couple"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {isJa ? "挙式についてお問い合わせください" : "Ready to Plan Your Dream Wedding?"}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isJa
              ? "クマールレストランであなたの特別な日を演出しませんか。まずはお問い合わせください。"
              : "Let Kumar Restaurant be the venue for your most special day. Contact us to get started."}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a href="#inquiry">
              <Button variant="primary" size="lg">
                {isJa ? "お問い合わせ" : "Contact Us"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-saffron" />
              <a
                href="tel:053-451-0154"
                className="text-xl font-semibold hover:text-saffron transition-colors"
              >
                053-451-0154
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
