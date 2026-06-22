"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface FormErrors {
  date?: string;
  time?: string;
  partySize?: string;
  name?: string;
  phone?: string;
  email?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function ContactPage() {
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
    canonicalLink.href = `${baseUrl}/en/contact`;

    const existingTags = document.querySelectorAll('link[data-hreflang]');
    existingTags.forEach(tag => tag.remove());

    const enLink = document.createElement("link");
    enLink.rel = "alternate";
    enLink.hreflang = "en";
    enLink.href = `${baseUrl}/en/contact`;
    enLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(enLink);

    const jaLink = document.createElement("link");
    jaLink.rel = "alternate";
    jaLink.hreflang = "ja";
    jaLink.href = `${baseUrl}/ja/contact`;
    jaLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(jaLink);

    const xDefaultLink = document.createElement("link");
    xDefaultLink.rel = "alternate";
    xDefaultLink.hreflang = "x-default";
    xDefaultLink.href = `${baseUrl}/en/contact`;
    xDefaultLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(xDefaultLink);

    return () => {
      const tags = document.querySelectorAll('link[data-hreflang]');
      tags.forEach(tag => tag.remove());
    };
  }, []);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    partySize: "2",
    name: "",
    phone: "",
    email: "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const timeSlots = Array.from({ length: 22 }, (_, i) => {
    const hour = 11 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    if (hour > 21 || (hour === 21 && minute === "30")) return null;
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  }).filter(Boolean) as string[];

  const partyOptions = Array.from({ length: 11 }, (_, i) => i + 1);

  const getTodayString = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = (now.getMonth() + 1).toString().padStart(2, "0");
    const d = now.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.date) {
      newErrors.date = isJa ? "日付を選択してください" : "Please select a date";
    }
    if (!formData.time) {
      newErrors.time = isJa ? "時間を選択してください" : "Please select a time";
    }
    if (!formData.name.trim()) {
      newErrors.name = isJa ? "名前を入力してください" : "Please enter your name";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = isJa ? "電話番号を入力してください" : "Please enter your phone number";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = isJa ? "有効なメールアドレスを入力してください" : "Please enter a valid email address";
    }
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
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/images/about/site-image.jpg"
            alt="Kumar Restaurant"
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
              {isJa ? "お問い合わせ" : "Get in Touch"}
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-tight mb-6">
              {isJa ? "お問い合わせ" : "Contact Us"}
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto mb-8" />
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a
              href="tel:053-451-0154"
              className="flex items-center gap-2 bg-saffron/10 border border-saffron/20 rounded-full px-6 py-3 text-white text-sm hover:bg-saffron/20 transition-all duration-300"
            >
              <svg className="w-4 h-4 text-saffron" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              053-451-0154
            </a>
            <a
              href="tel:+819092766901"
              className="flex items-center gap-2 bg-saffron/10 border border-saffron/20 rounded-full px-6 py-3 text-white text-sm hover:bg-saffron/20 transition-all duration-300"
            >
              <svg className="w-4 h-4 text-saffron" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              +81-9092766901
            </a>
            <a
              href="tel:+817090621056"
              className="flex items-center gap-2 bg-saffron/10 border border-saffron/20 rounded-full px-6 py-3 text-white text-sm hover:bg-saffron/20 transition-all duration-300"
            >
              <svg className="w-4 h-4 text-saffron" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              +81-7090621056
            </a>
          </motion.div>
        </div>
      </section>

      {/* ───────── 2. BOOK A TABLE ───────── */}
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
              {isJa ? "ご予約" : "Reservations"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold mb-4">
              {isJa ? "ご予約" : "Book A Table"}
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto mb-6" />
            <p className="text-charcoal/60 max-w-xl mx-auto font-sans">
              {isJa
                ? "オンラインで予約すると、ご来店時にスムーズにお席をご案内いたします。"
                : "Secure your preferred time and enjoy a seamless dining experience."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 max-w-6xl mx-auto">
            {/* Left: Form */}
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
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="font-display text-2xl text-charcoal font-semibold mb-3">
                      {isJa ? "ご予約リクエストを受付しました！" : "Reservation Request Received!"}
                    </h3>
                    <p className="text-charcoal/60 mb-8 font-sans max-w-md mx-auto">
                      {isJa
                        ? "確認のご連絡をお待ちください。数時間以内にご連絡いたします。"
                        : "We will confirm your reservation shortly. Expect a call or email within a few hours."}
                    </p>
                    <motion.button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ date: "", time: "", partySize: "2", name: "", phone: "", email: "", specialRequests: "" });
                      }}
                      className="px-8 py-3 bg-charcoal text-white rounded-xl hover:bg-charcoal/80 transition-colors font-sans text-sm"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isJa ? "新しい予約" : "New Reservation"}
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
                      className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={0}
                    >
                      <div>
                        <label htmlFor="date" className={labelBase}>
                          {isJa ? "日付" : "Date"} *
                        </label>
                        <input
                          id="date"
                          name="date"
                          type="date"
                          min={getTodayString()}
                          value={formData.date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${inputBase} ${errors.date ? inputError : ""}`}
                          aria-required="true"
                          aria-invalid={!!errors.date}
                          aria-describedby={errors.date ? "date-error" : undefined}
                        />
                        {errors.date && <p id="date-error" className="mt-1.5 text-xs text-red" role="alert">{errors.date}</p>}
                      </div>
                      <div>
                        <label htmlFor="time" className={labelBase}>
                          {isJa ? "時間" : "Time"} *
                        </label>
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${inputBase} ${errors.time ? inputError : ""}`}
                          aria-required="true"
                          aria-invalid={!!errors.time}
                          aria-describedby={errors.time ? "time-error" : undefined}
                        >
                          <option value="">{isJa ? "時間を選択" : "Select time"}</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                        {errors.time && <p id="time-error" className="mt-1.5 text-xs text-red" role="alert">{errors.time}</p>}
                      </div>
                    </motion.div>

                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={1}
                    >
                      <label htmlFor="partySize" className={labelBase}>
                        {isJa ? "人数" : "Party Size"}
                      </label>
                      <select
                        id="partySize"
                        name="partySize"
                        value={formData.partySize}
                        onChange={handleChange}
                        className={inputBase}
                      >
                        {partyOptions.map((n) => (
                          <option key={n} value={n}>
                            {n === 10 ? `10+ ${isJa ? "人以上" : "guests"}` : `${n} ${isJa ? "人" : "guests"}`}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={2}
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
                        onBlur={handleBlur}
                        placeholder={isJa ? "山田 太郎" : "John Smith"}
                        className={`${inputBase} ${errors.name ? inputError : ""}`}
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red" role="alert">{errors.name}</p>}
                    </motion.div>

                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={3}
                    >
                      <label htmlFor="phone" className={labelBase}>
                        {isJa ? "電話番号" : "Phone"} *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="090-1234-5678"
                        className={`${inputBase} ${errors.phone ? inputError : ""}`}
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      />
                      {errors.phone && <p id="phone-error" className="mt-1.5 text-xs text-red" role="alert">{errors.phone}</p>}
                    </motion.div>

                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={4}
                    >
                      <label htmlFor="email" className={labelBase}>
                        {isJa ? "メールアドレス" : "Email"}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="example@email.com"
                        className={`${inputBase} ${errors.email ? inputError : ""}`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red" role="alert">{errors.email}</p>}
                    </motion.div>

                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={5}
                    >
                      <label htmlFor="specialRequests" className={labelBase}>
                        {isJa ? "特別なご要望" : "Special Requests"}
                      </label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        rows={3}
                        value={formData.specialRequests}
                        onChange={handleChange}
                        placeholder={
                          isJa
                            ? "アレルギー、ベビーチェア、記念日など"
                            : "Allergies, high chairs, celebrations, etc."
                        }
                        className={`${inputBase} resize-none`}
                      />
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-saffron to-burgundy text-white font-sans font-medium rounded-xl hover:shadow-lg hover:shadow-saffron/25 transition-all duration-300 text-sm tracking-wide disabled:opacity-70 disabled:cursor-wait"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                      whileHover={isSubmitting ? undefined : { scale: 1.02 }}
                      whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                    >
                      {isSubmitting
                        ? (isJa ? "送信中..." : "Submitting...")
                        : (isJa ? "今すぐ予約" : "Reserve Now")}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Contact Info Card */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <div className="bg-cream rounded-3xl p-8 border border-charcoal/5">
                <h3 className="font-display text-2xl text-charcoal font-semibold mb-6">
                  {isJa ? "連絡先情報" : "Contact Information"}
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-saffron" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 mb-1 tracking-wider uppercase font-sans">{isJa ? "電話" : "Phone"}</p>
                      <a href="tel:053-451-0154" className="text-charcoal font-medium hover:text-saffron transition-colors font-sans">
                        053-451-0154
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-saffron" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 mb-1 tracking-wider uppercase font-sans">Kumar</p>
                      <a href="tel:+819092766901" className="text-charcoal font-medium hover:text-saffron transition-colors font-sans">
                        +81-9092766901
                      </a>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/+819092766901"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                      <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 mb-1 tracking-wider uppercase font-sans">WhatsApp</p>
                      <p className="text-charcoal font-medium group-hover:text-green-600 transition-colors font-sans">
                        +81-9092766901
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@kumarhamamatsu.com"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-burgundy/10 flex items-center justify-center shrink-0 group-hover:bg-burgundy/20 transition-colors">
                      <svg className="w-5 h-5 text-burgundy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M22 4L12 13L2 4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 mb-1 tracking-wider uppercase font-sans">{isJa ? "メール" : "Email"}</p>
                      <p className="text-charcoal font-medium text-sm group-hover:text-burgundy transition-colors font-sans">
                        info@kumarhamamatsu.com
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── 3. HOURS ───────── */}
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
              {isJa ? "営業時間" : "Opening Hours"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold mb-4">
              {isJa ? "営業時間" : "Hours"}
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto mb-10" />
          </motion.div>

          <motion.div
            className="inline-block bg-white rounded-3xl border border-charcoal/5 overflow-hidden shadow-[0_4px_40px_rgba(26,26,26,0.03)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <table className="w-full">
              <tbody>
                <tr className="border-b border-charcoal/5">
                  <td className="px-10 py-5 text-left font-sans">
                    <span className="text-charcoal font-medium">{isJa ? "月曜日〜金曜日" : "Monday — Friday"}</span>
                  </td>
                  <td className="px-10 py-5 text-right font-sans text-charcoal/60">11:00 — 15:00 &amp; 17:00 — 22:00</td>
                </tr>
                <tr>
                  <td className="px-10 py-5 text-left font-sans">
                    <span className="text-charcoal font-medium">{isJa ? "土曜日・日曜日・祝日" : "Saturday · Sunday · Holiday"}</span>
                  </td>
                  <td className="px-10 py-5 text-right font-sans text-charcoal/60">11:00 — 22:00</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ───────── 4. LOCATION ───────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <p className="text-saffron text-xs tracking-[0.3em] uppercase mb-3 font-sans">
              {isJa ? "アクセス" : "Find Us"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold mb-4">
              {isJa ? "アクセス" : "Our Location"}
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto mb-6" />
            <p className="text-charcoal/60 max-w-xl mx-auto font-sans">
              {isJa
                ? "静岡県浜松市中区板屋町 アクトタワーB1"
                : "430-7790 Shizuoka, Hamamatsu, Naka Ward, Itayamachi, Act Tower B1"}
            </p>
          </motion.div>

          <motion.div
            className="rounded-3xl overflow-hidden shadow-[0_4px_40px_rgba(26,26,26,0.06)] border border-charcoal/5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.5!2d137.73!3d34.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQWN0IFRvd2VyIELDMSwg44GM44GP44GT44Gr44Gh44Gv!5e0!3m2!1sen!2sjp!4v1"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kumar Restaurant Location"
            />
          </motion.div>
        </div>
      </section>

      {/* ───────── 5. REVIEWS ───────── */}
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
              {isJa ? "口コミ" : "Reviews"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold mb-4">
              {isJa ? "口コミをチェック" : "Check Reviews On"}
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto mb-6" />
            <p className="text-charcoal/60 mb-12 font-sans">
              {isJa
                ? "各プラットフォームでお客様の声をご覧ください"
                : "See what our guests are saying on each platform"}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            {[
              { name: "Facebook", href: "https://facebook.com", img: "/images/social/fb-free-imng.png" },
              { name: "Twitter", href: "https://twitter.com", img: "/images/social/tweet-free-img.png" },
              { name: "Google", href: "https://www.google.com/maps", img: "/images/social/google-reviews-free-img.png" },
              { name: "Instagram", href: "https://instagram.com", svg: true },
            ].map((platform, i) => (
              <motion.a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 border border-charcoal/5 hover:border-saffron/20 transition-all duration-300 w-36 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.08, y: -4 }}
              >
                {platform.svg ? (
                  <svg className="w-10 h-10 text-charcoal/70 group-hover:text-pink-600 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                ) : (
                  <img
                    src={platform.img}
                    alt={platform.name}
                    className="w-10 h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                )}
                <span className="text-sm font-sans text-charcoal/70 group-hover:text-charcoal transition-colors">{platform.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────── 6. SECOND RESTAURANT ───────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <p className="text-saffron text-xs tracking-[0.3em] uppercase mb-3 font-sans">
              {isJa ? "姉妹店" : "Our Family"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold mb-4">
              {isJa ? "もう一つのレストラン" : "Our Other Restaurant"}
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-saffron to-gold mx-auto" />
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl border border-charcoal/5 overflow-hidden flex flex-col md:flex-row shadow-[0_4px_40px_rgba(26,26,26,0.04)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <div className="md:w-2/5">
              <img
                src="/images/about/KumarSan.jpg"
                alt="クマールさんのカレー"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-3/5 p-8 sm:p-10 flex flex-col justify-center border-l-4 border-gold">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2 font-sans">
                {isJa ? "姉妹店" : "Sister Restaurant"}
              </p>
              <h3 className="font-display text-2xl md:text-3xl text-charcoal font-semibold mb-5">
                クマールさんのカレー
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-saffron mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <div>
                    <p className="text-xs text-charcoal/50 mb-1 tracking-wider uppercase font-sans">{isJa ? "住所" : "Address"}</p>
                    <p className="text-charcoal font-sans leading-relaxed">
                      432-0041 浜松市北区平口2861番地 サンストリート浜北１F
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-saffron mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <div>
                    <p className="text-xs text-charcoal/50 mb-1 tracking-wider uppercase font-sans">{isJa ? "電話" : "Phone"}</p>
                    <a href="tel:053-586-8339" className="text-charcoal font-medium hover:text-saffron transition-colors font-sans">
                      053-586-8339
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
