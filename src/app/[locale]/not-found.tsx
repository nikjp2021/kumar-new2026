"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { Button } from "@/components";
import { UtensilsCrossed, Home, BookOpen } from "lucide-react";

export default function NotFound() {
  const locale = useLocale();
  const isJa = locale === "ja";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Decorative food icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-saffron/10 flex items-center justify-center animate-bounce-slow">
          <UtensilsCrossed className="w-12 h-12 text-saffron" />
        </div>

        {/* Big 404 */}
        <h1 className="text-8xl font-extrabold text-saffron/20 mb-2 select-none">
          404
        </h1>

        {/* Fun headline */}
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
          {isJa
            ? "このメニューにはございません"
            : "Oops! This page is not on the menu"}
        </h2>

        {/* Subtext */}
        <p className="text-charcoal/60 text-lg mb-8">
          {isJa
            ? "お探しのページは存在しないか、移動した可能性があります。"
            : "The page you're looking for doesn't exist or has been moved."}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button variant="primary" size="lg" className="gap-2">
              <Home className="w-5 h-5" />
              {isJa ? "トップページへ" : "Back to Home"}
            </Button>
          </Link>
          <Link href={`/${locale}/menu`}>
            <Button variant="secondary" size="lg" className="gap-2">
              <BookOpen className="w-5 h-5" />
              {isJa ? "メニューを見る" : "View Menu"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
