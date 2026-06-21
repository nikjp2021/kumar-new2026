"use client";

import { useTranslations, useLocale } from "next-intl";
import { Button, Card, CardContent } from "@/components";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generateRestaurantSchema } from "@/lib/schema";
import {
  Star,
  Clock,
  Phone,
  Quote,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <div className="overflow-hidden">
      <SchemaMarkup data={generateRestaurantSchema(locale)} />

      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about/クマールMain-rotated.jpg"
            alt="Kumar Restaurant Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Decorative fork left */}
        <img
          src="/images/decorative/fork-free-img.png"
          alt=""
          className="absolute left-4 md:left-12 top-1/3 w-12 md:w-20 opacity-60 -rotate-12 hidden sm:block"
        />
        {/* Decorative knife right */}
        <img
          src="/images/decorative/knife-free-imge.png"
          alt=""
          className="absolute right-4 md:right-12 top-1/3 w-12 md:w-20 opacity-60 rotate-12 hidden sm:block"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
          <div className="mb-6">
            <img
              src="/images/decorative/frill-free-img.png"
              alt=""
              className="mx-auto w-32 md:w-48 opacity-80"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2 leading-tight tracking-wide">
            {locale === "en" ? "Kumar Restaurant" : "クマールレストラン"}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-3 italic">
            {locale === "en"
              ? "Home of Indian tradition and exquisite preparation"
              : "インドの伝統と卓越した料理の故郷"}
          </p>

          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-12 bg-saffron/60" />
            <p className="text-base md:text-lg text-saffron font-medium tracking-widest uppercase">
              {locale === "en"
                ? "Good Food | Good Culture"
                : "美味しい食べ物 | 美しい文化"}
            </p>
            <span className="h-px w-12 bg-saffron/60" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href={`/${locale}/contact`}>
              <Button variant="primary" size="lg" className="min-w-[200px]">
                {locale === "en" ? "Reserve" : "予約する"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
            <Clock className="w-4 h-4 text-saffron" />
            <span className="text-white text-xs md:text-sm">
              {t("hero.hours")}
            </span>
          </div>
        </div>
      </section>

      {/* ===== 2. BOOK A TABLE SECTION ===== */}
      <section className="py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            {locale === "en" ? "Book a table!" : "ご予約！"}
          </h2>
          <p className="text-lg text-charcoal/70 mb-8 max-w-2xl mx-auto">
            {locale === "en"
              ? "Discover the convenience of booking a table online without any hassle."
              : "お手間をかけずにオンラインでテーブルを予約する便利さをご体験ください。"}
          </p>
          <Link href={`/${locale}/contact`}>
            <Button variant="primary" size="lg">
              {locale === "en" ? "Reserve Now" : "今すぐ予約"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ===== 3. WELCOME SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
                {locale === "en"
                  ? "Welcome to Kumar Restaurant"
                  : "クマールレストランへようこそ"}
              </h2>
              <p className="text-xl text-saffron font-semibold mb-6">
                {locale === "en"
                  ? "Hamamatsu's First Indian Restaurant! Serving Since 1995"
                  : "「浜松初のインド料理店！1995年より営業」"}
              </p>
              <p className="text-lg text-charcoal/70 leading-relaxed mb-8">
                {locale === "en"
                  ? "We have made a commitment to bring variety, high quality and large selection of Indian dishes to our customers."
                  : "お客様に多様性、高品質、そして豊富なインド料理を提供することをお約束しています。"}
              </p>
              <Link href={`/${locale}/about`}>
                <Button variant="secondary" size="lg">
                  {locale === "en" ? "More About Us" : "詳しく見る"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/about/Serving-chef.jpg"
                  alt="Mr. Binay Kumar - Chef and Owner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-saffron text-charcoal px-6 py-3 rounded-xl shadow-lg">
                <p className="font-bold text-lg">Since 1995</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3.5 MEET MR. BINAY KUMAR SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/about/Serving-chef.jpg"
                  alt="Mr. Binay Kumar - Owner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-saffron text-charcoal px-6 py-3 rounded-xl shadow-lg">
                <p className="font-bold text-lg">G7 Summit Caterer 2023</p>
              </div>
            </div>
            <div>
              <p className="text-saffron font-semibold text-lg mb-2">
                {locale === "en" ? "Meet Our Owner" : "オーナー紹介"}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
                {locale === "en" ? "Mr. Binay Kumar" : "ビナイ・クマー氏"}
              </h2>
              <p className="text-lg text-charcoal/70 leading-relaxed mb-8">
                {locale === "en"
                  ? "Mr. Binay Kumar is the heart and soul of Kumar Restaurant. His passion for authentic Indian cuisine and dedication to serving the Hamamatsu community for over 30 years has made Kumar Restaurant a beloved institution. In 2023, he was honored to cater for world leaders at the G7 Summit in Kyoto, bringing international recognition to our little restaurant in Act Tower."
                  : "ビナイ・クマー氏はクマールレストランの心と魂です。本格的なインド料理への情熱と、30年以上にわたる浜松コミュニティへの奉仕は、クマールレストランを愛されinstitutionsにしました。2023年には京都で開催されたG7サミットで世界のリーダーたちに料理を振る舞う名誉に浴しました。"}
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-cream rounded-xl">
                  <p className="text-2xl font-bold text-saffron">30+</p>
                  <p className="text-sm text-charcoal/70">
                    {locale === "en" ? "Years" : "年以上"}
                  </p>
                </div>
                <div className="text-center p-4 bg-cream rounded-xl">
                  <p className="text-2xl font-bold text-saffron">G7</p>
                  <p className="text-sm text-charcoal/70">
                    {locale === "en" ? "Summit" : "サミット"}
                  </p>
                </div>
                <div className="text-center p-4 bg-cream rounded-xl">
                  <p className="text-2xl font-bold text-saffron">168+</p>
                  <p className="text-sm text-charcoal/70">
                    {locale === "en" ? "Reviews" : "件以上のレビュー"}
                  </p>
                </div>
              </div>
              <Link href={`/${locale}/about`}>
                <Button variant="secondary" size="lg">
                  {locale === "en" ? "Read Full Story" : "详情を見る"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. OUR HOURS SECTION ===== */}
      <section className="py-20 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/images/about/dine-out.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            {locale === "en" ? "Hours" : "営業時間"}
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-lg mx-auto">
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
          </div>
        </div>
      </section>

      {/* ===== 5. OUR MENU SECTION ===== */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/food/india-indian-indian-food-1481500-1024x682.jpg"
                  alt="Samosa - Indian appetizer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
                {locale === "en" ? "Our Menu" : "メニュー"}
              </h2>
              <p className="text-xl text-saffron font-semibold mb-6">
                {locale === "en"
                  ? "Quality Ingredients, Tasty Meals"
                  : "「高品質な食材、美味しい料理」"}
              </p>
              <p className="text-lg text-charcoal/70 leading-relaxed mb-8">
                {locale === "en"
                  ? "Kumar Restaurant serves cuisine made from recipes culled from the royal Indian menus dating back 300 to 400 years using the freshest local ingredients and precious Indian spices."
                  : "クマールレストランでは、300〜400年前のインド王室のメニューから得たレシピを使用し、最も新鮮な地元の食材と貴重なインドスパイスを用いた料理を提供しています。"}
              </p>
              <Link href={`/${locale}/menu`}>
                <Button variant="primary" size="lg">
                  {locale === "en" ? "Discover Entire Menu" : "全メニューを見る"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. TASTY TRADITIONS SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
              {t("signatureDishes.title")}
            </h2>
            <p className="text-lg text-charcoal/70">
              {t("signatureDishes.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DISHES.map((dish) => (
              <Card key={dish.key} hover className="h-full">
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
            ))}
          </div>
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
              {locale === "en" ? "Happy Customers!" : "お客様の声！"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {REVIEWS.map((review, index) => (
              <Card key={index} hover>
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
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Social proof about dietary options */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
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
          </div>
        </div>
      </section>

      {/* ===== 8. GOOGLE REVIEWS SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
            {locale === "en" ? "Google Reviews" : "Googleレビュー"}
          </h2>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-5xl font-bold text-charcoal">4.5</span>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.slice(0, 3).map((review, index) => (
              <div
                key={index}
                className="bg-cream/50 rounded-xl p-6 text-left"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. FACEBOOK REVIEWS SECTION ===== */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-12">
            <img
              src="/images/social/fb-free-imng.png"
              alt="Facebook"
              className="w-10 h-10"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal">
              {locale === "en" ? "Facebook Reviews" : "Facebookレビュー"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review, index) => (
              <Card key={index} hover>
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
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. SOCIAL LINKS ===== */}
      <section className="py-12 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center text-white/80 mb-6 text-lg">
            {locale === "en" ? "Follow Us" : "フォローする"}
          </p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://www.facebook.com/kumarhamamatsu/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src="/images/social/fb-free-imng.png"
                alt="Facebook"
                className="w-12 h-12"
              />
            </a>
            <a
              href="https://twitter.com/kumarhamamatsu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src="/images/social/tweet-free-img.png"
                alt="Twitter"
                className="w-12 h-12"
              />
            </a>
            <a
              href="https://g.page/kumarhamamatsu/review"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src="/images/social/google-reviews-free-img.png"
                alt="Google Reviews"
                className="w-12 h-12"
              />
            </a>
            <a
              href="https://www.instagram.com/kumarhamamatsu/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Ig</span>
              </div>
            </a>
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
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <img
            src="/images/decorative/old-typical-phone.png"
            alt="Phone"
            className="mx-auto w-16 h-16 mb-6 opacity-80"
          />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {locale === "en"
              ? "Call for All Your Reservations"
              : "ご予約はお電話で"}
          </h2>
          <a
            href="tel:053-451-0154"
            className="text-3xl md:text-4xl font-bold text-saffron hover:text-saffron/80 transition-colors mb-8 inline-block"
          >
            053-451-0154
          </a>

          <div className="mt-12 mb-6">
            <img
              src="/images/logos/cropped-KumarLogo1-2-1-300x143.png"
              alt="Kumar Restaurant Logo"
              className="mx-auto w-48 md:w-64"
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
        </div>
      </section>
    </div>
  );
}
