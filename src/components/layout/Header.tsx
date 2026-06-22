"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

function LanguageToggleBtn({ scrolled }: { scrolled: boolean }) {
  const locale = useLocale();
  const toggle = () => {
    const newLocale = locale === "en" ? "ja" : "en";
    const path = window.location.pathname.replace(/^\/(en|ja)/, "") || "/";
    window.location.href = `/${newLocale}${path}`;
  };
  // Show the language you can SWITCH TO, not the current one
  return (
    <button
      onClick={toggle}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer text-[13px] font-medium",
        scrolled
          ? "border-charcoal/20 text-charcoal hover:border-saffron hover:text-saffron"
          : "border-white/30 text-white/90 hover:border-white hover:text-white"
      )}
      aria-label={locale === "en" ? "Japaneseに切替" : "Switch to English"}
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      <span>{locale === "en" ? "日本語" : "English"}</span>
    </button>
  );
}

const navLinks = [
  { href: "/", labelKey: "home" },
  { href: "/menu", labelKey: "menu" },
  { href: "/about", labelKey: "about" },
  { href: "/moments", labelKey: "moments" },
  { href: "/blog", labelKey: "blog" },
  { href: "/contact", labelKey: "contact" },
] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`;
    return pathname === fullPath || (href !== "/" && pathname.startsWith(fullPath));
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-[0_1px_20px_rgba(26,26,26,0.06)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center shrink-0"
          >
            <img
              src="/images/logos/cropped-KumarLogo1-2-1-300x143.png"
              alt="Kumar Restaurant"
              className="h-10 sm:h-11 transition-opacity duration-300 hover:opacity-80"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative text-[13px] font-[family-name:var(--font-dm-sans)] font-medium tracking-[0.1em] uppercase transition-colors duration-300 pb-1 group",
                  locale === "ja" && "tracking-normal capitalize",
                  scrolled ? "text-charcoal hover:text-saffron" : "text-white/90 hover:text-white",
                  isActive(link.href) && "text-saffron"
                )}
              >
                {t(link.labelKey)}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[1.5px] bg-saffron origin-left transition-transform duration-300",
                  isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Toggle */}
            <div className="hidden sm:flex">
              <LanguageToggleBtn scrolled={scrolled} />
            </div>

            {/* Reservation Button */}
            <Link
              href={`/${locale}/contact`}
              className={cn(
                "hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-[13px] font-semibold tracking-[0.08em] uppercase font-[family-name:var(--font-dm-sans)] transition-all duration-300 rounded-none",
                scrolled
                  ? "bg-gradient-to-br from-saffron to-gold text-white shadow-[0_4px_15px_rgba(212,132,26,0.25)] hover:shadow-[0_6px_20px_rgba(212,132,26,0.35)] hover:-translate-y-[2px]"
                  : "bg-white/20 text-white border border-white/30 hover:bg-white/30"
              )}
            >
              {t("reservation")}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-charcoal hover:text-saffron transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "lg:hidden fixed inset-y-0 right-0 w-[min(320px,85vw)] bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-out z-50",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Close button */}
        <div className="flex justify-end p-5">
          <button
            onClick={() => setIsOpen(false)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-charcoal hover:text-saffron transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile nav links */}
        <nav className="px-6 space-y-1" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "block min-h-[44px] py-3 text-[15px] font-medium tracking-[0.06em] text-charcoal hover:text-saffron transition-all duration-300 border-b border-charcoal/5",
                locale === "ja" && "tracking-normal",
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0",
                isActive(link.href) && "text-saffron font-semibold"
              )}
              style={{ transitionDelay: isOpen ? `${i * 60 + 100}ms` : "0ms" }}
              onClick={() => setIsOpen(false)}
            >
              {t(link.labelKey)}
            </Link>
          ))}

          {/* Mobile Language Toggle */}
          <div
            className={cn(
              "pt-6 transition-all duration-300",
              isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
            )}
            style={{ transitionDelay: isOpen ? `${navLinks.length * 60 + 100}ms` : "0ms" }}
          >
            <LanguageToggleBtn scrolled={true} />
          </div>

          {/* Mobile Reservation */}
          <div
            className={cn(
              "pt-4 transition-all duration-300",
              isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
            )}
            style={{ transitionDelay: isOpen ? `${(navLinks.length + 1) * 60 + 100}ms` : "0ms" }}
          >
            <Link
              href={`/${locale}/contact`}
              className="block w-full text-center px-6 py-3 bg-gradient-to-br from-saffron to-gold text-white text-[13px] font-semibold tracking-[0.08em] uppercase font-[family-name:var(--font-dm-sans)] shadow-[0_4px_15px_rgba(212,132,26,0.25)] rounded-none"
              onClick={() => setIsOpen(false)}
            >
              {t("reservation")}
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile backdrop */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-charcoal/30 backdrop-blur-sm transition-opacity duration-500 z-40",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />
    </header>
  );
}
