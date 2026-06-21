"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { DietaryBadges, Button } from "@/components";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generateMenuSchema } from "@/lib/schema";
import {
  UtensilsCrossed,
  ShoppingBag,
  Phone,
} from "lucide-react";

type DietaryTag = "vegetarian" | "vegan" | "halal" | "glutenFree";

type MenuCategory =
  | "all"
  | "appetizers"
  | "curries"
  | "tandoori"
  | "biryani"
  | "breads"
  | "desserts"
  | "beverages";

interface MenuItem {
  name: string;
  nameJa: string;
  nameEn: string;
  price: number;
  description: string;
  descriptionJa: string;
  dietary: DietaryTag[];
  category: Exclude<MenuCategory, "all">;
  image?: string;
}

const menuItems: MenuItem[] = [
  // Appetizers
  {
    name: "Samosa",
    nameEn: "Samosa",
    nameJa: "サモサ",
    price: 500,
    description: "Crispy pastry with spiced potatoes and peas",
    descriptionJa: "スパイス入りジャガイモとエンドウ豆の入ったカリカリのパストリー",
    dietary: ["vegetarian", "vegan"],
    category: "appetizers",
    image: "/images/menu/1-2.png",
  },
  {
    name: "Paneer Tikka",
    nameEn: "Paneer Tikka",
    nameJa: "パニールティッカ",
    price: 700,
    description: "Grilled cottage cheese with spices",
    descriptionJa: "スパイス入りグリルカッテージチーズ",
    dietary: ["vegetarian"],
    category: "appetizers",
    image: "/images/menu/3-2.png",
  },
  {
    name: "Vegetable Pakora",
    nameEn: "Vegetable Pakora",
    nameJa: "野菜パコラ",
    price: 500,
    description: "Crispy fried vegetable fritters",
    descriptionJa: "カリカリの揚げ野菜フライター",
    dietary: ["vegetarian", "vegan"],
    category: "appetizers",
    image: "/images/menu/2-2.png",
  },
  {
    name: "Chicken Tikka",
    nameEn: "Chicken Tikka",
    nameJa: "チキンティッカ",
    price: 800,
    description: "Marinated chicken grilled in clay oven",
    descriptionJa: "タンドールオーブンで焼いたマリネチキン",
    dietary: ["halal"],
    category: "appetizers",
    image: "/images/menu/4-2.png",
  },
  // Curries
  {
    name: "Butter Chicken",
    nameEn: "Butter Chicken",
    nameJa: "バターチキン",
    price: 1300,
    description: "Clay oven roasted chicken in tomato sauce",
    descriptionJa: "タンドールオーブンで焼いたチキンのトマトソース",
    dietary: ["halal"],
    category: "curries",
    image: "/images/menu/5-2.png",
  },
  {
    name: "Chana Masala",
    nameEn: "Chana Masala",
    nameJa: "チャナマサラ",
    price: 1000,
    description: "Chickpeas in tomato and spice gravy",
    descriptionJa: "トマトとスパイスのグレービーのひよこ豆",
    dietary: ["vegetarian", "vegan", "halal"],
    category: "curries",
    image: "/images/menu/6-2.png",
  },
  {
    name: "Palak Paneer",
    nameEn: "Palak Paneer",
    nameJa: "パラックパニール",
    price: 1200,
    description: "Cottage cheese in spinach curry",
    descriptionJa: "ほうれん草カレー入りカッテージチーズ",
    dietary: ["vegetarian", "halal"],
    category: "curries",
    image: "/images/menu/7-2.png",
  },
  {
    name: "Keema Curry",
    nameEn: "Keema Curry",
    nameJa: "キーマカレー",
    price: 1100,
    description: "Minced lamb with ginger and garlic",
    descriptionJa: "ジンジャーとガーリック入りひき肉カレー",
    dietary: ["halal"],
    category: "curries",
    image: "/images/menu/9-2.png",
  },
  {
    name: "Dal Makhani",
    nameEn: "Dal Makhani",
    nameJa: "ダルマカニ",
    price: 900,
    description: "Black lentils slow-cooked with butter",
    descriptionJa: "バターでゆっくり煮込んだ黒 lentils",
    dietary: ["vegetarian", "halal"],
    category: "curries",
    image: "/images/menu/8-2.png",
  },
  {
    name: "Chicken Vindaloo",
    nameEn: "Chicken Vindaloo",
    nameJa: "チキンヴィンダルー",
    price: 1300,
    description: "Spicy Goan curry with potatoes",
    descriptionJa: "ジャガイモ入りスパイシーなゴアカレー",
    dietary: ["halal"],
    category: "curries",
  },
  {
    name: "Lamb Rogan Josh",
    nameEn: "Lamb Rogan Josh",
    nameJa: "ラムロガンジョッシュ",
    price: 1400,
    description: "Aromatic lamb in Kashmiri spices",
    descriptionJa: "カシミールスパイス入り香り高いラム",
    dietary: ["halal"],
    category: "curries",
  },
  {
    name: "Paneer Butter Masala",
    nameEn: "Paneer Butter Masala",
    nameJa: "パニールバターマサラ",
    price: 1200,
    description: "Cottage cheese in creamy tomato",
    descriptionJa: "クリーミーなトマト入りカッテージチーズ",
    dietary: ["vegetarian", "halal"],
    category: "curries",
  },
  // Tandoori
  {
    name: "Tandoori Chicken",
    nameEn: "Tandoori Chicken",
    nameJa: "タンドーリチキン",
    price: 1200,
    description: "Half chicken marinated and clay oven roasted",
    descriptionJa: "マリネしてタンドールオーブンで焼いた半分のチキン",
    dietary: ["halal"],
    category: "tandoori",
    image: "/images/menu/10-2.png",
  },
  {
    name: "Seekh Kebab",
    nameEn: "Seekh Kebab",
    nameJa: "シーキューケバブ",
    price: 1000,
    description: "Minced lamb skewers with spices",
    descriptionJa: "スパイス入りひき肉の串ケバブ",
    dietary: ["halal"],
    category: "tandoori",
    image: "/images/menu/11.png",
  },
  {
    name: "Tandoori Prawns",
    nameEn: "Tandoori Prawns",
    nameJa: "タンドーリエビ",
    price: 1500,
    description: "Jumbo prawns in clay oven",
    descriptionJa: "タンドールオーブン入りジャンボエビ",
    dietary: ["halal"],
    category: "tandoori",
  },
  // Biryani & Rice
  {
    name: "Chicken Biryani",
    nameEn: "Chicken Biryani",
    nameJa: "チキンビリヤニ",
    price: 1300,
    description: "Aromatic basmati rice with chicken",
    descriptionJa: "チキン入り香り高いバスマティライス",
    dietary: ["halal"],
    category: "biryani",
    image: "/images/menu/13.png",
  },
  {
    name: "Vegetable Biryani",
    nameEn: "Vegetable Biryani",
    nameJa: "野菜ビリヤニ",
    price: 1000,
    description: "Mixed vegetables with saffron rice",
    descriptionJa: "サフランライス入り混合野菜",
    dietary: ["vegetarian", "vegan", "halal"],
    category: "biryani",
    image: "/images/menu/14.png",
  },
  {
    name: "Lamb Biryani",
    nameEn: "Lamb Biryani",
    nameJa: "ラムビリヤニ",
    price: 1500,
    description: "Tender lamb with fragrant rice",
    descriptionJa: "柔らかいラムと香り高いライス",
    dietary: ["halal"],
    category: "biryani",
  },
  {
    name: "Steamed Basmati Rice",
    nameEn: "Steamed Basmati Rice",
    nameJa: "蒸しバスマティライス",
    price: 300,
    description: "Plain basmati rice",
    descriptionJa: "プレーンバスマティライス",
    dietary: ["vegetarian", "vegan", "halal"],
    category: "biryani",
  },
  // Naan & Breads
  {
    name: "Plain Naan",
    nameEn: "Plain Naan",
    nameJa: "プレーンナーン",
    price: 200,
    description: "Soft leavened bread",
    descriptionJa: "柔らかい発酵パン",
    dietary: ["vegetarian"],
    category: "breads",
    image: "/images/menu/12.png",
  },
  {
    name: "Garlic Naan",
    nameEn: "Garlic Naan",
    nameJa: "ガーリックナーン",
    price: 250,
    description: "Naan with garlic and butter",
    descriptionJa: "ガーリックとバター入りナーン",
    dietary: ["vegetarian"],
    category: "breads",
  },
  {
    name: "Cheese Naan",
    nameEn: "Cheese Naan",
    nameJa: "チーズナーン",
    price: 300,
    description: "Naan stuffed with cheese",
    descriptionJa: "チーズ入り詰め合わせナーン",
    dietary: ["vegetarian"],
    category: "breads",
  },
  {
    name: "Keema Naan",
    nameEn: "Keema Naan",
    nameJa: "キーマナーン",
    price: 350,
    description: "Naan stuffed with spiced minced meat",
    descriptionJa: "スパイス入りひき肉詰めナーン",
    dietary: ["halal"],
    category: "breads",
  },
  {
    name: "Roti",
    nameEn: "Roti",
    nameJa: "ロティ",
    price: 150,
    description: "Whole wheat flatbread",
    descriptionJa: "全粒粉フラットブレッド",
    dietary: ["vegetarian", "vegan"],
    category: "breads",
  },
  // Desserts
  {
    name: "Gulab Jamun",
    nameEn: "Gulab Jamun",
    nameJa: "グラブジャムン",
    price: 400,
    description: "Deep-fried milk dumplings in sugar syrup",
    descriptionJa: "シロップ入り揚げミルクダンプリング",
    dietary: ["vegetarian"],
    category: "desserts",
    image: "/images/menu/16.png",
  },
  {
    name: "Kheer",
    nameEn: "Kheer",
    nameJa: "クヒール",
    price: 400,
    description: "Rice pudding with cardamom and nuts",
    descriptionJa: "カルダモンとナッツ入りライスプリン",
    dietary: ["vegetarian"],
    category: "desserts",
  },
  {
    name: "Mango Lassi",
    nameEn: "Mango Lassi",
    nameJa: "マンゴーラッシー",
    price: 400,
    description: "Sweet yogurt drink with mango",
    descriptionJa: "マンゴー入り甘いヨーグルトドリンク",
    dietary: ["vegetarian"],
    category: "desserts",
  },
  // Beverages
  {
    name: "Masala Chai",
    nameEn: "Masala Chai",
    nameJa: "マサラチャイ",
    price: 300,
    description: "Spiced Indian tea with milk",
    descriptionJa: "ミルク入りスパイシーなインドティー",
    dietary: ["vegetarian"],
    category: "beverages",
  },
  {
    name: "Indian Beer",
    nameEn: "Indian Beer",
    nameJa: "インドビール",
    price: 500,
    description: "Kingfisher or Taj Mahal",
    descriptionJa: "キングフィッシャーまたはタージマハル",
    dietary: [],
    category: "beverages",
  },
  {
    name: "Soft Drinks",
    nameEn: "Soft Drinks",
    nameJa: "ソフトドリンク",
    price: 200,
    description: "Coke, Sprite, etc.",
    descriptionJa: "コーラ、スプライトなど",
    dietary: [],
    category: "beverages",
  },
];

const categories: { key: MenuCategory; label: string; labelJa: string }[] = [
  { key: "all", label: "All", labelJa: "すべて" },
  { key: "appetizers", label: "Appetizers", labelJa: "前菜" },
  { key: "curries", label: "Curries", labelJa: "カレー" },
  { key: "tandoori", label: "Tandoori", labelJa: "タンドーリ" },
  { key: "biryani", label: "Biryani & Rice", labelJa: "ビリヤニ＆ライス" },
  { key: "breads", label: "Naan & Breads", labelJa: "ナーン＆ブレッド" },
  { key: "desserts", label: "Desserts", labelJa: "デザート" },
  { key: "beverages", label: "Beverages", labelJa: "ビバレッジ" },
];

const dietaryFilters: { key: DietaryTag; label: string; labelJa: string }[] = [
  { key: "vegetarian", label: "Vegetarian", labelJa: "ベジタリアン" },
  { key: "vegan", label: "Vegan", labelJa: "ヴィーガン" },
  { key: "halal", label: "Halal", labelJa: "ハラル" },
];

export default function MenuPage() {
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isJa = locale === "ja";

  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [activeDietary, setActiveDietary] = useState<DietaryTag | null>(null);

  useEffect(() => {
    const baseUrl = "https://kumarhamamatsu.com";
    const locale = useLocale();
    const canonicalPath = `/en/menu`;

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = `${baseUrl}${canonicalPath}`;

    const existingTags = document.querySelectorAll('link[data-hreflang]');
    existingTags.forEach(tag => tag.remove());

    const enLink = document.createElement("link");
    enLink.rel = "alternate";
    enLink.hreflang = "en";
    enLink.href = `${baseUrl}/en/menu`;
    enLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(enLink);

    const jaLink = document.createElement("link");
    jaLink.rel = "alternate";
    jaLink.hreflang = "ja";
    jaLink.href = `${baseUrl}/ja/menu`;
    jaLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(jaLink);

    const xDefaultLink = document.createElement("link");
    xDefaultLink.rel = "alternate";
    xDefaultLink.hreflang = "x-default";
    xDefaultLink.href = `${baseUrl}/en/menu`;
    xDefaultLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(xDefaultLink);

    return () => {
      const tags = document.querySelectorAll('link[data-hreflang]');
      tags.forEach(tag => tag.remove());
    };
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesDietary =
      activeDietary === null || item.dietary.includes(activeDietary);
    return matchesCategory && matchesDietary;
  });

  return (
    <div>
      <SchemaMarkup data={generateMenuSchema(menuItems)} />
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/about/dine-out.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {isJa ? "メニュー" : "Our Menu"}
            </h1>
            <p className="text-xl md:text-2xl text-saffron-light">
              {isJa ? "高品質な食材、美味しい料理" : "Quality Ingredients, Tasty Meals"}
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto py-4 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat.key
                      ? "bg-saffron text-charcoal shadow-md"
                      : "bg-cream text-charcoal/70 hover:bg-saffron/20"
                  }`}
                >
                  {isJa ? cat.labelJa : cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dietary Filters */}
      <section className="bg-white border-b border-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-charcoal/70">
              {isJa ? "食事制限で絞り込む:" : "Filter by dietary:"}
            </span>
            <button
              onClick={() => setActiveDietary(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeDietary === null
                  ? "bg-charcoal text-white"
                  : "bg-cream text-charcoal/70 hover:bg-cream-dark"
              }`}
            >
              {isJa ? "すべて" : "All"}
            </button>
            {dietaryFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() =>
                  setActiveDietary(activeDietary === filter.key ? null : filter.key)
                }
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeDietary === filter.key
                    ? "bg-charcoal text-white"
                    : "bg-cream text-charcoal/70 hover:bg-cream-dark"
                }`}
              >
                {isJa ? filter.labelJa : filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <UtensilsCrossed className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
              <p className="text-xl text-charcoal/50">
                {isJa
                  ? "この条件に一致する料理は見つかりませんでした"
                  : "No dishes match the selected filters"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.name}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  {item.image && (
                    <div className="relative aspect-[16/10] bg-charcoal/5 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={isJa ? item.nameJa : item.nameEn}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg font-bold text-charcoal">
                        {isJa ? item.nameJa : item.nameEn}
                      </h3>
                      <span className="text-lg font-bold text-red whitespace-nowrap">
                        ¥{item.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-charcoal/60 mb-3">
                      {isJa ? item.descriptionJa : item.description}
                    </p>
                    {item.dietary.length > 0 && (
                      <DietaryBadges dietary={item.dietary} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Takeout Specials */}
      <section className="py-16 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ShoppingBag className="w-8 h-8 text-saffron" />
                <h2 className="text-3xl font-bold">
                  {isJa ? "テイクアウト特集" : "Takeout Specials"}
                </h2>
              </div>
              <p className="text-gray-300 mb-6">
                {isJa
                  ? "お気に入りの料理をお持ち帰りください。テイクアウトで10%割引！"
                  : "Take your favorite dishes to go. Get 10% off on takeout orders!"}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <span className="w-2 h-2 bg-saffron rounded-full" />
                  {isJa ? "全メニュー対象" : "All menu items available for takeout"}
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <span className="w-2 h-2 bg-saffron rounded-full" />
                  {isJa ? "テイクアウト10%割引" : "10% discount on takeout orders"}
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <span className="w-2 h-2 bg-saffron rounded-full" />
                  {isJa ? "電話で事前注文可能" : "Pre-order by phone available"}
                </li>
              </ul>
              <div className="flex items-center gap-4">
                <a href={`tel:${tCommon("phone")}`}>
                  <Button variant="primary" size="lg">
                    <Phone className="w-5 h-5 mr-2" />
                    {tCommon("phone")}
                  </Button>
                </a>
              </div>
            </div>
            <div className="bg-charcoal/50 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-saffron">
                {isJa ? "人気テイクアウトセット" : "Popular Takeout Sets"}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <div>
                    <p className="font-medium">{isJa ? "ビリヤニセット" : "Biryani Set"}</p>
                    <p className="text-sm text-gray-400">
                      {isJa ? "ビリヤニ + ナーン + ラッシー" : "Biryani + Naan + Lassi"}
                    </p>
                  </div>
                  <span className="text-saffron font-bold">¥1,800</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <div>
                    <p className="font-medium">{isJa ? "カレーセット" : "Curry Set"}</p>
                    <p className="text-sm text-gray-400">
                      {isJa ? "カレー + ライス + ナーン" : "Curry + Rice + Naan"}
                    </p>
                  </div>
                  <span className="text-saffron font-bold">¥1,600</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <div>
                    <p className="font-medium">{isJa ? "タンドーリセット" : "Tandoori Set"}</p>
                    <p className="text-sm text-gray-400">
                      {isJa ? "タンドーリチキン + サラダ + ナーン" : "Tandoori Chicken + Salad + Naan"}
                    </p>
                  </div>
                  <span className="text-saffron font-bold">¥2,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-saffron">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            {isJa ? "ご予約" : "Reserve a Table"}
          </h2>
          <p className="text-lg text-charcoal/70 mb-8 max-w-2xl mx-auto">
            {isJa
              ? "レストランで本格インド料理をお楽しみください。ご予約をお待ちしております。"
              : "Experience authentic Indian dining at its finest. We look forward to welcoming you."}
          </p>
          <Link href={`/${locale}/contact`}>
            <Button variant="secondary" size="lg">
              {isJa ? "ご予約はこちら" : "Reserve Now"}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
