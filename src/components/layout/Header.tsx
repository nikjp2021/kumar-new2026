"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
                  scrolled ? "text-charcoal" : "text-charcoal/80",
                  "hover:text-saffron",
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
            <div className="hidden sm:flex items-center rounded-full border border-charcoal/15 overflow-hidden text-[13px] font-medium">
              <span
                className={cn(
                  "px-3 py-1.5 transition-all duration-300 cursor-default",
                  locale === "en"
                    ? "bg-saffron text-white"
                    : "bg-transparent text-charcoal/60 hover:text-charcoal"
                )}
              >
                EN
              </span>
              <span
                className={cn(
                  "px-3 py-1.5 transition-all duration-300 cursor-default",
                  locale === "ja"
                    ? "bg-saffron text-white"
                    : "bg-transparent text-charcoal/60 hover:text-charcoal"
                )}
              >
                JP
              </span>
            </div>

            {/* Reservation Button */}
            <Link
              href={`/${locale}/contact`}
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-br from-saffron to-gold text-white text-[13px] font-semibold tracking-[0.08em] uppercase font-[family-name:var(--font-dm-sans)] shadow-[0_4px_15px_rgba(212,132,26,0.25)] hover:shadow-[0_6px_20px_rgba(212,132,26,0.35)] hover:-translate-y-[2px] transition-all duration-300 rounded-none"
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
            <div className="flex items-center rounded-full border border-charcoal/15 overflow-hidden text-[13px] font-medium w-fit">
              <span
                className={cn(
                  "px-4 py-2 transition-all duration-300",
                  locale === "en"
                    ? "bg-saffron text-white"
                    : "bg-transparent text-charcoal/60"
                )}
              >
                EN
              </span>
              <span
                className={cn(
                  "px-4 py-2 transition-all duration-300",
                  locale === "ja"
                    ? "bg-saffron text-white"
                    : "bg-transparent text-charcoal/60"
                )}
              >
                JP
              </span>
            </div>
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
