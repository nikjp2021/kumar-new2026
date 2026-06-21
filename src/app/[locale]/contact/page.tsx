"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent, Button } from "@/components";
import {
  Phone,
  Smartphone,
  MessageCircle,
  MapPin,
  Clock,
  Navigation,
  CalendarDays,
  Users,
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

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
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {isJa ? "ご予約・お問い合わせ" : "Reserve & Contact Us"}
          </h1>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            {isJa
              ? "オンラインで予約するか、お気軽にご連絡ください"
              : "Book online or get in touch — we look forward to welcoming you"}
          </p>
        </div>

        {/* Quick Action Buttons (mobile-friendly) */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 lg:hidden">
          <a href="tel:053-451-0154" className="flex-1 min-w-[140px]">
            <Button variant="primary" className="w-full gap-2">
              <Phone className="w-4 h-4" />
              {isJa ? "今すぐ電話" : "Call Now"}
            </Button>
          </a>
          <a
            href="https://wa.me/817090621056"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[140px]"
          >
            <Button variant="secondary" className="w-full gap-2">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </a>
          <a
            href="https://maps.google.com/?q=Act+Tower+B1+Itayamachi+Naka+Ward+Hamamatsu+Shizuoka"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[140px]"
          >
            <Button variant="ghost" className="w-full gap-2 border border-charcoal/20">
              <Navigation className="w-4 h-4" />
              {isJa ? "地図を見る" : "Directions"}
            </Button>
          </a>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* LEFT COLUMN — Reservation Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center">
                    <CalendarDays className="w-5 h-5 text-saffron" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-charcoal">
                      {isJa ? "ご予約" : "Book a Table"}
                    </h2>
                    <p className="text-sm text-charcoal/60">
                      {isJa ? "オンラインで簡単予約" : "Quick online reservation"}
                    </p>
                  </div>
                </div>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-forest/10 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-forest" />
                    </div>
                    <h3 className="text-xl font-semibold text-charcoal mb-2">
                      {isJa ? "ご予約リクエストを受付しました！" : "Reservation Request Received!"}
                    </h3>
                    <p className="text-charcoal/70 mb-6">
                      {isJa
                        ? "確認のご連絡をお待ちください。数時間以内にご連絡いたします。"
                        : "We will confirm your reservation shortly. Expect a call or email within a few hours."}
                    </p>
                    <Button
                      variant="secondary"
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
                    >
                      {isJa ? "新しい予約" : "New Reservation"}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Date & Time Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        {errors.date && (
                          <p className="mt-1 text-sm text-red flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.date}
                          </p>
                        )}
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
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                        {errors.time && (
                          <p className="mt-1 text-sm text-red flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.time}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Party Size */}
                    <div>
                      <label htmlFor="partySize" className={labelBase}>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-charcoal/60" />
                          {isJa ? "人数" : "Party Size"}
                        </span>
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
                    </div>

                    {/* Name */}
                    <div>
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
                      {errors.name && (
                        <p className="mt-1 text-sm text-red flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
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
                        placeholder={isJa ? "090-1234-5678" : "090-1234-5678"}
                        className={`${inputBase} ${errors.phone ? inputError : ""}`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className={labelBase}>
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-4 h-4 text-charcoal/60" />
                          {isJa ? "メールアドレス" : "Email"}
                        </span>
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

                    {/* Special Requests */}
                    <div>
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
                    </div>

                    <Button type="submit" variant="primary" size="lg" className="w-full">
                      {isJa ? "今すぐ予約" : "Reserve Now"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN — Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Details */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-red" />
                  </div>
                  <h2 className="text-2xl font-bold text-charcoal">
                    {isJa ? "お問い合わせ" : "Contact Us"}
                  </h2>
                </div>

                <div className="space-y-5">
                  {/* Phone */}
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

                  {/* Mobile */}
                  <a
                    href="tel:+819092766901"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-saffron/10 flex items-center justify-center shrink-0 group-hover:bg-saffron/20 transition-colors">
                      <Smartphone className="w-5 h-5 text-saffron" />
                    </div>
                    <div>
                      <p className="text-sm text-charcoal/60 mb-0.5">
                        {isJa ? "携帯" : "Mobile"} — Kumar
                      </p>
                      <p className="text-charcoal font-medium group-hover:text-saffron transition-colors">
                        +81-90-9276-6901
                      </p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/817090621056"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center shrink-0 group-hover:bg-forest/20 transition-colors">
                      <MessageCircle className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <p className="text-sm text-charcoal/60 mb-0.5">WhatsApp</p>
                      <p className="text-charcoal font-medium group-hover:text-forest transition-colors">
                        +81-70-9062-1056
                      </p>
                    </div>
                  </a>

                  {/* Address */}
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

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-saffron/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-saffron" />
                    </div>
                    <div>
                      <p className="text-sm text-charcoal/60 mb-0.5">
                        {isJa ? "営業時間" : "Opening Hours"}
                      </p>
                      <div className="text-charcoal text-sm space-y-1">
                        <div className="flex justify-between gap-6">
                          <span className="font-medium">
                            {isJa ? "月〜金" : "Mon – Fri"}
                          </span>
                          <span>11:00 – 15:00 &amp; 17:00 – 22:00</span>
                        </div>
                        <div className="flex justify-between gap-6">
                          <span className="font-medium">
                            {isJa ? "土日祝" : "Sat – Sun – Holiday"}
                          </span>
                          <span>11:00 – 22:00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="pt-4 border-t border-charcoal/10">
                    <p className="text-sm text-charcoal/60 mb-3">
                      {isJa ? "SNSでフォロー" : "Follow Us"}
                    </p>
                    <div className="flex gap-3">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-charcoal/5 flex items-center justify-center hover:bg-saffron/10 transition-colors"
                        aria-label="Facebook"
                      >
                        <FacebookIcon className="w-5 h-5 text-charcoal/70" />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-charcoal/5 flex items-center justify-center hover:bg-saffron/10 transition-colors"
                        aria-label="Instagram"
                      >
                        <InstagramIcon className="w-5 h-5 text-charcoal/70" />
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-charcoal/5 flex items-center justify-center hover:bg-saffron/10 transition-colors"
                        aria-label="Twitter"
                      >
                        <TwitterIcon className="w-5 h-5 text-charcoal/70" />
                      </a>
                      <a
                        href="https://maps.google.com/?q=Act+Tower+B1+Itayamachi+Naka+Ward+Hamamatsu+Shizuoka"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-charcoal/5 flex items-center justify-center hover:bg-saffron/10 transition-colors"
                        aria-label="Google Maps"
                      >
                        <MapPin className="w-5 h-5 text-charcoal/70" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Maps Embed */}
            <Card>
              <div className="aspect-[4/3] w-full bg-charcoal/5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.5!2d137.73!3d34.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQWN0IFRvd2VyIELDMSwg44GM44GP44GT44Gr44Gh44Gv!5e0!3m2!1sen!2sjp!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kumar Restaurant Location"
                  className="rounded-b-xl"
                />
              </div>
            </Card>
          </div>
        </div>

        {/* SECOND LOCATION */}
        <div className="mt-16">
          <Card>
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-red" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-charcoal">
                    {isJa ? "もう一つのレストラン" : "Our Other Restaurant"}
                  </h2>
                  <p className="text-saffron font-semibold">クマールさんのカレー</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-charcoal/60 mb-0.5">
                      {isJa ? "住所" : "Address"}
                    </p>
                    <p className="text-charcoal text-sm leading-relaxed">
                      432-0041 浜松市北区東口2861
                      <br />
                      サンストリート浜北 1F
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-saffron mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-charcoal/60 mb-0.5">
                      {isJa ? "電話" : "Phone"}
                    </p>
                    <a
                      href="tel:053-586-8339"
                      className="text-charcoal font-medium hover:text-saffron transition-colors"
                    >
                      053-586-8339
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* DESKTOP Quick Actions */}
        <div className="hidden lg:flex justify-center gap-4 mt-12">
          <a href="tel:053-451-0154">
            <Button variant="primary" size="lg" className="gap-2">
              <Phone className="w-5 h-5" />
              {isJa ? "今すぐ電話" : "Call Now"}
            </Button>
          </a>
          <a href="https://wa.me/817090621056" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg" className="gap-2">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Button>
          </a>
          <a
            href="https://maps.google.com/?q=Act+Tower+B1+Itayamachi+Naka+Ward+Hamamatsu+Shizuoka"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="lg" className="gap-2 border border-charcoal/20">
              <Navigation className="w-5 h-5" />
              {isJa ? "地図を見る" : "Get Directions"}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
