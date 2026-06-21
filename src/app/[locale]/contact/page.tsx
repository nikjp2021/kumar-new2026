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
      {/* ───────── 1. HERO ───────── */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20 lg:py-32"
        style={{ backgroundImage: "url(/images/about/site-image.jpg)" }}
      >
        <motion.div
          className="absolute inset-0 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
          >
            {isJa ? "お問い合わせ" : "Kumar Restaurant Contact"}
          </motion.h1>
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-6 text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a href="tel:053-451-0154" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 hover:bg-white/20 transition-colors">
              📞 053-451-0154
            </a>
            <a href="tel:+819092766901" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 hover:bg-white/20 transition-colors">
              📱 +81-9092766901 (Kumar)
            </a>
            <a href="tel:+817090621056" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 hover:bg-white/20 transition-colors">
              📱 +81-7090621056
            </a>
          </motion.div>
        </div>
      </section>

      {/* ───────── 2. BOOK A TABLE ───────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {isJa ? "ご予約" : "Book A Table at Kumar Restaurant"}
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              {isJa
                ? "オンラインで予約すると、ご来店時にスムーズにお席をご案内いたします。ご希望の時間帯を事前にお楽しみいただけます。"
                : "Book online for a seamless seating experience. Secure your preferred time and enjoy the advantages of a pre-arranged reservation."}
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, type: "spring" as const }}
                  className="text-center py-16 bg-saffron/5 rounded-2xl border border-saffron/20"
                >
                  <motion.div
                    className="text-5xl mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" as const, stiffness: 200 }}
                  >
                    ✅
                  </motion.div>
                <h3 className="text-2xl font-bold text-charcoal mb-2">
                  {isJa ? "ご予約リクエストを受付しました！" : "Reservation Request Received!"}
                </h3>
                <p className="text-charcoal/70 mb-6">
                  {isJa
                    ? "確認のご連絡をお待ちください。数時間以内にご連絡いたします。"
                    : "We will confirm your reservation shortly. Expect a call or email within a few hours."}
                </p>
                <motion.button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      date: "",
                      time: "",
                      partySize: "2",
                      name: "",
                      phone: "",
                      email: "",
                      specialRequests: "",
                    });
                  }}
                  className="px-6 py-3 bg-charcoal text-white rounded-lg hover:bg-charcoal/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isJa ? "新しい予約" : "New Reservation"}
                </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5 bg-saffron/5 p-6 sm:p-10 rounded-2xl border border-saffron/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
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
                      className={`${inputBase} ${errors.date ? inputError : ""}`}
                    />
                    {errors.date && <p className="mt-1 text-sm text-red">{errors.date}</p>}
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
                      className={`${inputBase} ${errors.time ? inputError : ""}`}
                    >
                      <option value="">{isJa ? "時間を選択" : "Select time"}</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    {errors.time && <p className="mt-1 text-sm text-red">{errors.time}</p>}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
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
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
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
                    placeholder={isJa ? "山田 太郎" : "John Smith"}
                    className={`${inputBase} ${errors.name ? inputError : ""}`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red">{errors.name}</p>}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
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
                    placeholder="090-1234-5678"
                    className={`${inputBase} ${errors.phone ? inputError : ""}`}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red">{errors.phone}</p>}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
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
                    placeholder="example@email.com"
                    className={`${inputBase} ${errors.email ? inputError : ""}`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red">{errors.email}</p>}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
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
                  className="w-full py-3 bg-saffron text-white font-semibold rounded-lg hover:bg-saffron/90 transition-colors text-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: "spring" as const, stiffness: 200 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isJa ? "今すぐ予約" : "Reserve Now"}
                </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ───────── 3. DECORATIVE DIVIDER ───────── */}
      <div className="flex justify-center py-4">
        <img
          src="/images/decorative/frill-free-img.png"
          alt="Decorative divider"
          className="w-48 md:w-64 opacity-60"
        />
      </div>

      {/* ───────── 4. HOURS ───────── */}
      <section className="py-16 lg:py-24 bg-cream">
        <motion.div
          className="max-w-4xl mx-auto px-4 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-8">
            {isJa ? "営業時間" : "Hours"}
          </h2>
          <div className="inline-block text-left bg-white rounded-2xl shadow-sm border border-charcoal/10 overflow-hidden">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-charcoal/10">
                  <td className="px-8 py-4 font-semibold text-charcoal">
                    {isJa ? "月曜日〜金曜日" : "Monday - Friday"}
                  </td>
                  <td className="px-8 py-4 text-charcoal/80">11:00 - 15:00 &amp; 17:00 - 22:00</td>
                </tr>
                <tr>
                  <td className="px-8 py-4 font-semibold text-charcoal">
                    {isJa ? "土曜日・日曜日・祝日" : "Saturday・Sunday・Holiday"}
                  </td>
                  <td className="px-8 py-4 text-charcoal/80">11:00 - 22:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* ───────── 5. OUR LOCATION ───────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-charcoal text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {isJa ? "アクセス" : "Our Location"}
          </motion.h2>
          <motion.p
            className="text-center text-charcoal/70 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isJa
              ? "静岡県浜松市中区板屋町 アクトタワーB1"
              : "430-7790 Shizuoka, Hamamatsu, Naka Ward, Itayamachi, Act Tower B1"}
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <motion.div
              className="rounded-2xl overflow-hidden shadow-sm border border-charcoal/10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.5!2d137.73!3d34.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQWN0IFRvd2VyIELDMSwg44GM44GP44GT44Gr44Gh44Gv!5e0!3m2!1sen!2sjp!4v1"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kumar Restaurant Location"
              />
            </motion.div>

            {/* Contact info cards */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-cream rounded-xl p-6">
                <p className="text-sm font-medium text-charcoal/60 mb-1">{isJa ? "住所" : "Address"}</p>
                <p className="text-charcoal leading-relaxed">
                  430-7790 Shizuoka, Hamamatsu, Naka Ward, Itayamachi, Act Tower B1
                </p>
              </div>

              <a
                href="https://wa.me/+819092766901"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-green-50 rounded-xl p-6 hover:bg-green-100 transition-colors group"
              >
                <span className="text-3xl">💬</span>
                <div>
                  <p className="text-sm font-medium text-charcoal/60">WhatsApp</p>
                  <p className="text-charcoal font-semibold group-hover:text-green-700 transition-colors">
                    +81-9092766901
                  </p>
                </div>
              </a>

              <a
                href="tel:+819092766901"
                className="flex items-center gap-4 bg-saffron/10 rounded-xl p-6 hover:bg-saffron/20 transition-colors group"
              >
                <span className="text-3xl">📱</span>
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Kumar</p>
                  <p className="text-charcoal font-semibold group-hover:text-saffron transition-colors">
                    +81-9092766901
                  </p>
                </div>
              </a>

              <a
                href="tel:+817090621056"
                className="flex items-center gap-4 bg-saffron/10 rounded-xl p-6 hover:bg-saffron/20 transition-colors group"
              >
                <span className="text-3xl">📱</span>
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Phone</p>
                  <p className="text-charcoal font-semibold group-hover:text-saffron transition-colors">
                    +81-7090621056
                  </p>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── 6. CHECK REVIEWS ON ───────── */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-charcoal mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {isJa ? "口コミをチェック" : "Check Reviews On"}
          </motion.h2>
          <motion.p
            className="text-charcoal/70 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isJa
              ? "各プラットフォームでお客様の声をご覧ください"
              : "See what our guests are saying on each platform"}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Facebook */}
            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 shadow-sm border border-charcoal/10 hover:shadow-md transition-shadow w-36"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, type: "spring" as const, stiffness: 200 }}
              whileHover={{ scale: 1.2 }}
            >
              <img
                src="/images/social/fb-free-imng.png"
                alt="Facebook"
                className="w-12 h-12 object-contain"
              />
              <span className="text-sm font-medium text-charcoal">Facebook</span>
            </motion.a>

            {/* Twitter */}
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 shadow-sm border border-charcoal/10 hover:shadow-md transition-shadow w-36"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, type: "spring" as const, stiffness: 200, delay: 0.1 }}
              whileHover={{ scale: 1.2 }}
            >
              <img
                src="/images/social/tweet-free-img.png"
                alt="Twitter"
                className="w-12 h-12 object-contain"
              />
              <span className="text-sm font-medium text-charcoal">Twitter</span>
            </motion.a>

            {/* Google Reviews */}
            <motion.a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 shadow-sm border border-charcoal/10 hover:shadow-md transition-shadow w-36"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, type: "spring" as const, stiffness: 200, delay: 0.2 }}
              whileHover={{ scale: 1.2 }}
            >
              <img
                src="/images/social/google-reviews-free-img.png"
                alt="Google Reviews"
                className="w-12 h-12 object-contain"
              />
              <span className="text-sm font-medium text-charcoal">Google</span>
            </motion.a>

            {/* Instagram */}
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 shadow-sm border border-charcoal/10 hover:shadow-md transition-shadow w-36"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, type: "spring" as const, stiffness: 200, delay: 0.3 }}
              whileHover={{ scale: 1.2 }}
            >
              <svg className="w-12 h-12 text-pink-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="text-sm font-medium text-charcoal">Instagram</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ───────── 7. FOR ONLINE INQUIRIES ───────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            {isJa ? "オンラインお問い合わせ" : "For Online Inquiries"}
          </h2>
          <p className="text-charcoal/70 mb-8">
            {isJa
              ? "お気軽にお問い合わせください。できるだけ早くご返信いたします。"
              : "Feel free to reach out — we respond as quickly as possible."}
          </p>

          <div className="bg-saffron/5 rounded-2xl p-8 sm:p-10 border border-saffron/10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="mailto:info@kumarhamamatsu.com"
                className="flex items-center gap-3 bg-charcoal text-white px-8 py-4 rounded-xl hover:bg-charcoal/80 transition-colors text-lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13L2 4" />
                </svg>
                {isJa ? "メールで問い合わせ" : "Email Us"}
              </a>
              <a
                href="https://wa.me/+819092766901"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-colors text-lg"
              >
                <span className="text-xl">💬</span>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 8. OUR OTHER RESTAURANT ───────── */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-charcoal text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {isJa ? "もう一つのレストラン" : "Our Other Restaurant"}
          </motion.h2>

          <motion.div
            className="bg-white rounded-2xl shadow-sm border border-charcoal/10 overflow-hidden flex flex-col md:flex-row"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="md:w-2/5">
              <img
                src="/images/about/KumarSan.jpg"
                alt="クマールさんのカレー"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-3/5 p-8 sm:p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-charcoal mb-4">クマールさんのカレー</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">📍</span>
                  <div>
                    <p className="text-sm font-medium text-charcoal/60 mb-0.5">{isJa ? "住所" : "Address"}</p>
                    <p className="text-charcoal leading-relaxed">
                      432-0041 浜松市北区平口2861番地 サンストリート浜北１F
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">📞</span>
                  <div>
                    <p className="text-sm font-medium text-charcoal/60 mb-0.5">{isJa ? "電話" : "Phone"}</p>
                    <a
                      href="tel:053-586-8339"
                      className="text-charcoal font-semibold hover:text-saffron transition-colors"
                    >
                      053-586-8339
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────── 9. FOOTER ───────── */}
      <footer className="bg-charcoal text-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/images/decorative/old-typical-phone.png"
              alt="Phone"
              className="w-16 h-16 opacity-80"
            />
          </div>

          <div className="flex justify-center mb-6">
            <img
              src="/images/logos/cropped-KumarLogo1-2-1-300x143.png"
              alt="Kumar Restaurant"
              className="h-16 object-contain"
            />
          </div>

          <p className="text-lg mb-2">
            {isJa ? "ご予約はお電話で" : "Call for All Your Reservations"}
          </p>
          <a
            href="tel:053-451-0154"
            className="text-2xl md:text-3xl font-bold text-saffron hover:text-saffron/80 transition-colors"
          >
            053-451-0154
          </a>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-white/50">
              &copy; {new Date().getFullYear()} Kumar Restaurant. {isJa ? "全著作権所有。" : "All rights reserved."}
            </p>
            <p className="text-sm text-saffron/80 mt-1 italic">
              {isJa ? "人生にスパイスを" : "Spice up life at Kumar Restaurant"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
