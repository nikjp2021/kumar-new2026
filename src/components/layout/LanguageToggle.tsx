"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ja" : "en";
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center rounded-full border border-charcoal/15 overflow-hidden text-[13px] font-medium transition-all duration-300",
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
