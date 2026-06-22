"use client";

import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ja" : "en";
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(en|ja)/, "") || "/";
    // Use direct navigation to force full page reload with new locale
    window.location.href = `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center rounded-full border border-charcoal/15 overflow-hidden text-[13px] font-medium transition-all duration-300 cursor-pointer",
        className
      )}
      aria-label={locale === "en" ? "Switch to Japanese" : "Switch to English"}
    >
      <span
        className={cn(
          "px-3 py-1.5 transition-all duration-300",
          locale === "en"
            ? "bg-saffron text-white"
            : "bg-transparent text-charcoal/60"
        )}
      >
        EN
      </span>
      <span
        className={cn(
          "px-3 py-1.5 transition-all duration-300",
          locale === "ja"
            ? "bg-saffron text-white"
            : "bg-transparent text-charcoal/60"
        )}
      >
        JP
      </span>
    </button>
  );
}
