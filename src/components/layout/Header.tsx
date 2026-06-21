"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui";
import { LanguageToggle } from "./LanguageToggle";

const navLinks = [
  { href: "/", labelKey: "home" },
  { href: "/menu", labelKey: "menu" },
  { href: "/about", labelKey: "about" },
  { href: "/blog", labelKey: "blog" },
  { href: "/contact", labelKey: "contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 group"
          >
            <UtensilsCrossed className="w-8 h-8 text-saffron group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold text-charcoal">
              {t("home") === "Home" ? "Kumar" : "クマール"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className="text-charcoal hover:text-saffron transition-colors font-medium"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <LanguageToggle className="hidden sm:flex" />
            <Button
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              {t("reservation")}
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-cream"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-cream">
          <nav className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className="block px-4 py-2 rounded-lg text-charcoal hover:bg-cream transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <div className="pt-4 border-t border-cream">
              <LanguageToggle className="w-full" />
              <Button variant="primary" className="w-full mt-4">
                {t("reservation")}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
