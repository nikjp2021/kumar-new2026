import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, Button, HreflangTags } from "@/components";
import {
  Clock,
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Share2,
} from "lucide-react";
import {
  getPostBySlug,
  getRelatedPosts,
  categoryLabels,
} from "@/lib/blog-data";
import { formatDate } from "@/lib/utils";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations("blog");
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const typedLocale = locale as "en" | "ja";

  const shareUrl = `https://kumarhamamatsu.com/${locale}/blog/${slug}`;
  const shareTitle = post.title[typedLocale];

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`,
  };

  function renderContent(content: string) {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];

    function flushList() {
      if (listItems.length > 0) {
        elements.push(
          <ul
            key={`list-${elements.length}`}
            className="list-disc list-inside space-y-2 mb-6 text-charcoal/80"
          >
            {listItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <h2
            key={i}
            className="text-2xl font-bold text-charcoal mt-8 mb-4"
          >
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <h3
            key={i}
            className="text-xl font-semibold text-charcoal mt-6 mb-3"
          >
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("- ")) {
        listItems.push(line.replace("- ", ""));
      } else if (line.startsWith("> ")) {
        flushList();
        elements.push(
          <blockquote
            key={i}
            className="border-l-4 border-saffron pl-4 italic text-charcoal/70 my-6"
          >
            {line.replace("> ", "").replace(/"/g, "")}
          </blockquote>
        );
      } else if (line.startsWith("---")) {
        flushList();
        elements.push(
          <hr key={i} className="my-8 border-cream" />
        );
      } else if (line.startsWith("*") && line.endsWith("*")) {
        flushList();
        elements.push(
          <p key={i} className="text-charcoal/60 italic text-sm mt-4">
            {line.replace(/\*/g, "")}
          </p>
        );
      } else if (line.trim() === "") {
        flushList();
      } else {
        flushList();
        elements.push(
          <p key={i} className="text-charcoal/80 mb-4 leading-relaxed">
            {line}
          </p>
        );
      }
    }

    flushList();
    return elements;
  }

  return (
    <div>
      <HreflangTags locale={typedLocale} pagePath={`/${typedLocale}/blog/${slug}`} />
      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] bg-charcoal">
        <img
          src={post.image}
          alt={post.title[typedLocale]}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center text-white/80 hover:text-white text-sm mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToList")}
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-saffron/20 text-saffron px-3 py-1 rounded-full text-sm font-medium">
              {categoryLabels[post.category][typedLocale]}
            </span>
            <span className="flex items-center gap-1 text-sm text-charcoal/50">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1 text-sm text-charcoal/50">
              <Clock className="w-4 h-4" />
              {post.readingTime} min read
            </span>
            <span className="flex items-center gap-1 text-sm text-charcoal/50">
              <User className="w-4 h-4" />
              {post.author}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-8">
            {post.title[typedLocale]}
          </h1>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {renderContent(post.content[typedLocale])}
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-cream">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-charcoal font-medium">
                <Share2 className="w-5 h-5" />
                {locale === "en" ? "Share" : "シェア"}
              </span>
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Share on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                aria-label="Share on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="Share on WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-cream rounded-xl text-center">
            <h3 className="text-2xl font-bold text-charcoal mb-3">
              {locale === "en"
                ? "Visit Kumar Restaurant"
                : "クマールレストランにご来店ください"}
            </h3>
            <p className="text-charcoal/70 mb-6">
              {locale === "en"
                ? "Experience authentic Indian cuisine in the heart of Hamamatsu."
                : "浜松の中心部で本格的なインド料理を体験してください。"}
            </p>
            <Link href={`/${locale}/contact`}>
              <Button variant="primary" size="lg">
                {locale === "en" ? "Reserve a Table" : "ご予約はこちら"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-charcoal mb-8">
              {locale === "en" ? "Related Posts" : "関連記事"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${locale}/blog/${related.slug}`}
                >
                  <Card hover className="h-full flex flex-col">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title[typedLocale]}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-charcoal/80 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          {categoryLabels[related.category][typedLocale]}
                        </span>
                      </div>
                    </div>
                    <CardContent className="flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-charcoal mb-2 line-clamp-2">
                        {related.title[typedLocale]}
                      </h3>
                      <p className="text-charcoal/70 text-sm line-clamp-2 flex-1">
                        {related.excerpt[typedLocale]}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-charcoal/50 mt-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(related.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {related.readingTime} min
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
