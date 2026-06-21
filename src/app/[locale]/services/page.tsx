"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button, Card, CardContent } from "@/components";
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

const services = [
  {
    key: "dineIn",
    icon: UtensilsCrossed,
    color: "saffron",
    link: "/contact",
  },
  {
    key: "takeaway",
    icon: Package,
    color: "forest",
    link: "/menu",
  },
  {
    key: "delivery",
    icon: Car,
    color: "red",
    link: "/contact",
  },
  {
    key: "catering",
    icon: PartyPopper,
    color: "saffron",
    link: "/contact",
  },
  {
    key: "wedding",
    icon: Heart,
    color: "red",
    link: "/weddings",
  },
  {
    key: "dietary",
    icon: Leaf,
    color: "forest",
    link: "/menu",
  },
];

const cateringOptions = [
  {
    key: "boxLunch",
    price: "¥1,000–1,500",
  },
  {
    key: "buffet",
    price: "¥2,000–3,000",
  },
  {
    key: "cocktail",
    price: "¥2,500–4,000",
  },
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
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/food/india-indian-indian-food-1481500-1024x682.jpg"
            alt="Kumar Restaurant Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {locale === "en" ? "Our Services" : "サービス"}
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              {locale === "en"
                ? "From dine-in to delivery, we bring authentic Indian flavors to you"
                : " dine-inからデリバリーまで、本格的なインド料理をお届けします"}
            </p>
          </div>
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {locale === "en" ? "What We Offer" : "提供サービス"}
            </h2>
            <p className="text-lg text-charcoal/70">
              {locale === "en"
                ? "Choose the service that suits your needs"
                : "ご希望に合わせたサービスをお選びください"}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.key} hover className="h-full flex flex-col">
                <CardContent className="pt-8 pb-8 flex flex-col flex-1">
                  <div
                    className={`w-16 h-16 mb-6 rounded-full flex items-center justify-center ${
                      service.color === "saffron"
                        ? "bg-saffron/20"
                        : service.color === "forest"
                        ? "bg-forest/20"
                        : "bg-red/20"
                    }`}
                  >
                    <service.icon
                      className={`w-8 h-8 ${
                        service.color === "saffron"
                          ? "text-saffron"
                          : service.color === "forest"
                          ? "text-forest"
                          : "text-red"
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    {t(`servicesList.${service.key}.title`)}
                  </h3>
                  <p className="text-charcoal/70 mb-6 flex-1">
                    {t(`servicesList.${service.key}.description`)}
                  </p>
                  <Link href={service.link}>
                    <Button variant="secondary" size="sm" className="w-full">
                      {locale === "en" ? "Learn More" : "詳しく見る"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Catering Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {locale === "en"
                ? "Corporate Catering"
                : "法人ケータリング"}
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              {locale === "en"
                ? "Making Your Event Unforgettable"
                : "イベントを难忘の思い出に"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {cateringOptions.map((option) => (
              <Card key={option.key} hover className="text-center">
                <CardContent className="pt-8 pb-8">
                  <h3 className="text-xl font-semibold text-charcoal mb-2">
                    {t(`catering.options.${option.key}.title`)}
                  </h3>
                  <p className="text-charcoal/70 mb-4">
                    {t(`catering.options.${option.key}.description`)}
                  </p>
                  <div className="text-2xl font-bold text-saffron">
                    {option.price}
                    <span className="text-sm font-normal text-charcoal/60">
                      {locale === "en" ? "/person" : "/人"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                {locale === "en" ? "Request a Quote" : "見積もりを依頼する"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dietary Guide Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {locale === "en" ? "Dietary Guide" : "食事制限ガイド"}
            </h2>
            <p className="text-lg text-charcoal/70">
              {locale === "en"
                ? "We cater to all dietary needs"
                : "すべての食事制限に対応しています"}
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-8 pb-8">
              <div className="grid grid-cols-2 gap-6">
                {dietarySymbols.map((item) => (
                  <div key={item.key} className="flex items-center gap-4">
                    <span
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-sm font-bold ${item.color}`}
                    >
                      {item.symbol}
                    </span>
                    <div>
                      <span className="font-semibold text-charcoal block">
                        {t(`dietary.${item.key}`)}
                      </span>
                      <span className="text-sm text-charcoal/60">
                        {locale === "en" ? "Symbol:" : "シンボル:"}{" "}
                        {item.symbol}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 max-w-2xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { key: "dairyFree", label: "Dairy-Free", labelJa: "乳製品不使用" },
                { key: "nutFree", label: "Nut-Free", labelJa: "ナッツ不使用" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-2 bg-white rounded-lg px-4 py-2"
                >
                  <Check className="w-5 h-5 text-forest" />
                  <span className="text-charcoal font-medium">
                    {locale === "en" ? item.label : item.labelJa}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === "en" ? "Ready to Experience India?" : "インドの味を体験しませんか？"}
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            {locale === "en"
              ? "Whether you're dining in, ordering takeaway, or planning a special event, we're here to serve you."
              : "ご来店、テイクアウト、特別なイベントのご相談など、お気軽にご連絡ください。"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                {locale === "en" ? "Reserve Now" : "今すぐ予約"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="ghost"
                size="lg"
                className="text-white border-2 border-white hover:bg-white/10"
              >
                {locale === "en" ? "Contact Us" : "お問い合わせ"}
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-saffron" />
              <a
                href="tel:053-451-0154"
                className="text-xl font-semibold hover:text-saffron transition-colors"
              >
                053-451-0154
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
