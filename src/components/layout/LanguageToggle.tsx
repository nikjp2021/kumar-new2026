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
        "flex items-center gap-2 px-3 py-2 rounded-lg bg-cream text-charcoal hover:bg-charcoal/10 transition-colors",
        className
      )}
      aria-label={locale === "en" ? "Switch to Japanese" : "Switch to English"}
    >
      <span className="text-sm font-medium">
        {locale === "en" ? "JP" : "EN"}
      </span>
    </button>
  );
}
