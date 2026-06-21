"use client";

import { useTranslations, useLocale } from "next-intl";
import { Button, Card, CardContent } from "@/components";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generateRestaurantSchema } from "@/lib/schema";
import {
  Star,
  Clock,
  Award,
  MapPin,
  Phone,
  Leaf,
  BookOpen,
  Heart,
  Quote,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();

  const dishes = [
    {
      key: "chanaMasala",
      image: "/images/food/chole_bhature.jpg",
    },
    {
      key: "butterChicken",
      image: "/images/food/paneer-tikka-cheese-seek-4929034-1024x682.jpg",
    },
    {
      key: "palakPaneer",
      image: "/images/food/veg_manchurian-1024x498.jpg",
    },
    {
      key: "keemaCurry",
      image: "/images/food/skewer-kebab-barbecue-3370443-1024x679.jpg",
    },
  ];

  const reviews = [
    {
      quote: t("reviews.items.0.quote"),
      name: t("reviews.items.0.name"),
      rating: 5,
    },
    {
      quote: t("reviews.items.1.quote"),
      name: t("reviews.items.1.name"),
      rating: 5,
    },
    {
      quote: t("reviews.items.2.quote"),
      name: t("reviews.items.2.name"),
      rating: 5,
    },
  ];

  return (
    <div>
      <SchemaMarkup data={generateRestaurantSchema(locale)} />
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/food/india-indian-indian-food-1481500-1024x682.jpg"
            alt="Indian Cuisine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                    {locale === "en" ? "Reserve a Table" : "予約する"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/menu">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-2 border-white hover:bg-white/10"
                >
                  {locale === "en" ? "View Menu" : "メニューを見る"}
                </Button>
              </Link>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <Clock className="w-5 h-5 text-saffron" />
              <span className="text-white text-sm md:text-base">
                {t("hero.hours")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-charcoal py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 text-white">
              <Star className="w-6 h-6 text-saffron flex-shrink-0" />
              <span className="text-sm md:text-base font-medium">
                {t("trustBar.rating")}
              </span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Clock className="w-6 h-6 text-saffron flex-shrink-0" />
              <span className="text-sm md:text-base font-medium">
                {t("trustBar.since")}
              </span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Award className="w-6 h-6 text-saffron flex-shrink-0" />
              <span className="text-sm md:text-base font-medium">
                {t("trustBar.g7")}
              </span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Award className="w-6 h-6 text-saffron flex-shrink-0" />
              <span className="text-sm md:text-base font-medium">
                {t("trustBar.first")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dishes */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {t("signatureDishes.title")}
            </h2>
            <p className="text-lg text-charcoal/70">
              {t("signatureDishes.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dishes.map((dish) => (
              <Card key={dish.key} hover className="h-full">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={dish.image}
                    alt={t(`signatureDishes.dishes.${dish.key}.name`)}
                    className="w-full h-full object-cover"
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
                      ¥{t(`signatureDishes.dishes.${dish.key}.price`)}
                    </span>
                    <Button variant="secondary" size="sm">
                      {locale === "en" ? "Order Now" : "注文する"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/menu">
              <Button variant="primary" size="lg">
                {locale === "en" ? "View Full Menu" : "メニューを見る"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Kumar */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {t("whyChoose.title")}
            </h2>
            <p className="text-lg text-charcoal/70">
              {t("whyChoose.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover className="text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-forest/20 rounded-full flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-forest" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  {t("whyChoose.freshSpices.title")}
                </h3>
                <p className="text-charcoal/70">
                  {t("whyChoose.freshSpices.description")}
                </p>
              </CardContent>
            </Card>

            <Card hover className="text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-saffron/20 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-saffron" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  {t("whyChoose.oldRecipes.title")}
                </h3>
                <p className="text-charcoal/70">
                  {t("whyChoose.oldRecipes.description")}
                </p>
              </CardContent>
            </Card>

            <Card hover className="text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-red/20 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-red" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  {t("whyChoose.family.title")}
                </h3>
                <p className="text-charcoal/70">
                  {t("whyChoose.family.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {t("reviews.title")}
            </h2>
            <p className="text-lg text-charcoal/70">
              {t("reviews.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} hover>
                <CardContent className="pt-6 pb-6">
                  <Quote className="w-10 h-10 text-saffron/40 mb-4" />
                  <p className="text-charcoal/80 italic mb-4">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-charcoal">
                      {review.name}
                    </span>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-saffron text-saffron"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {t("locations.title")}
            </h2>
            <p className="text-lg text-charcoal/70">
              {t("locations.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card hover>
              <CardContent className="pt-8 pb-8">
                <h3 className="text-xl font-bold text-charcoal mb-4">
                  {t("locations.actTower.name")}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-saffron mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal/70">
                      {t("locations.actTower.address")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-saffron flex-shrink-0" />
                    <span className="text-charcoal/70">
                      {t("locations.actTower.phone")}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-saffron mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal/70">
                      {t("locations.actTower.hours")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="pt-8 pb-8">
                <h3 className="text-xl font-bold text-charcoal mb-4">
                  {t("locations.hamakita.name")}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-saffron mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal/70">
                      {t("locations.hamakita.address")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-saffron flex-shrink-0" />
                    <span className="text-charcoal/70">
                      {t("locations.hamakita.phone")}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-saffron mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal/70">
                      {t("locations.hamakita.hours")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                {locale === "en" ? "Reserve Now" : "今すぐ予約"}
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-saffron" />
              <a
                href={`tel:${t("cta.phone")}`}
                className="text-xl font-semibold hover:text-saffron transition-colors"
              >
                {t("cta.phone")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
