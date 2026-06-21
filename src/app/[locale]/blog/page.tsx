"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, Button } from "@/components";
import {
  Clock,
  Calendar,
  ArrowRight,
  User,
} from "lucide-react";
import {
  blogPosts,
  categoryLabels,
  type BlogCategory,
} from "@/lib/blog-data";
import { formatDate } from "@/lib/utils";

const categories: BlogCategory[] = [
  "food",
  "culture",
  "story",
  "wedding",
  "services",
];

export default function BlogPage() {
  const t = useTranslations("blog");
  const locale = useLocale() as "en" | "ja";
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">(
    "all"
  );

  useEffect(() => {
    const baseUrl = "https://kumarhamamatsu.com";

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = `${baseUrl}/en/blog`;

    const existingTags = document.querySelectorAll('link[data-hreflang]');
    existingTags.forEach(tag => tag.remove());

    const enLink = document.createElement("link");
    enLink.rel = "alternate";
    enLink.hreflang = "en";
    enLink.href = `${baseUrl}/en/blog`;
    enLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(enLink);

    const jaLink = document.createElement("link");
    jaLink.rel = "alternate";
    jaLink.hreflang = "ja";
    jaLink.href = `${baseUrl}/ja/blog`;
    jaLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(jaLink);

    const xDefaultLink = document.createElement("link");
    xDefaultLink.rel = "alternate";
    xDefaultLink.hreflang = "x-default";
    xDefaultLink.href = `${baseUrl}/en/blog`;
    xDefaultLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(xDefaultLink);

    return () => {
      const tags = document.querySelectorAll('link[data-hreflang]');
      tags.forEach(tag => tag.remove());
    };
  }, []);

  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter(
    (p) => p.slug !== featuredPost?.slug || activeCategory !== "all"
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && activeCategory === "all" && (
        <section className="py-12 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href={`/${locale}/blog/${featuredPost.slug}`}>
              <Card hover className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title[locale]}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-saffron text-charcoal px-3 py-1 rounded-full text-sm font-semibold">
                        {t("featured")}
                      </span>
                    </div>
                  </div>
                  <CardContent className="flex flex-col justify-center p-8">
                    <span className="text-saffron font-medium text-sm mb-2">
                      {categoryLabels[featuredPost.category][locale]}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
                      {featuredPost.title[locale]}
                    </h2>
                    <p className="text-charcoal/70 mb-4">
                      {featuredPost.excerpt[locale]}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-charcoal/50">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featuredPost.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readingTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </span>
                    </div>
                    <div className="mt-6">
                      <Button variant="primary">
                        {t("readMore")}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="bg-white border-b border-cream sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === "all"
                  ? "bg-charcoal text-white"
                  : "bg-cream text-charcoal hover:bg-cream-dark"
              }`}
            >
              {t("categories.all")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-charcoal text-white"
                    : "bg-cream text-charcoal hover:bg-cream-dark"
                }`}
              >
                {categoryLabels[cat][locale]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeCategory === "all" ? regularPosts : filteredPosts).map(
              (post) => (
                <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
                  <Card hover className="h-full flex flex-col">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title[locale]}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-charcoal/80 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          {categoryLabels[post.category][locale]}
                        </span>
                      </div>
                    </div>
                    <CardContent className="flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-charcoal mb-2 line-clamp-2">
                        {post.title[locale]}
                      </h3>
                      <p className="text-charcoal/70 text-sm mb-4 line-clamp-2 flex-1">
                        {post.excerpt[locale]}
                      </p>
                      <div className="flex items-center justify-between text-xs text-charcoal/50 pt-4 border-t border-cream">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readingTime} min read
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            )}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 text-charcoal/50">
              {t("noPosts")}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-lg text-gray-300 mb-8">{t("cta.subtitle")}</p>
          <Link href={`/${locale}/contact`}>
            <Button variant="primary" size="lg">
              {locale === "en" ? "Reserve a Table" : "ご予約はこちら"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
