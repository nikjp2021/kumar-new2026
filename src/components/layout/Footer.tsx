import Link from "next/link";
import { useTranslations } from "next-intl";
import { UtensilsCrossed, Mail, Phone, MapPin } from "lucide-react";

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <UtensilsCrossed className="w-8 h-8 text-saffron" />
              <span className="text-xl font-bold">{tCommon("restaurantName")}</span>
            </Link>
            <p className="text-gray-400 text-sm">{tCommon("tagline")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {locale === "en" ? "Quick Links" : "クイックリンク"}
            </h3>
            <ul className="space-y-2">
              {["home", "menu", "about", "blog", "contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${locale}${item === "home" ? "" : `/${item}`}`}
                    className="text-gray-400 hover:text-saffron transition-colors"
                  >
                    {tNav(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {locale === "en" ? "Contact Info" : "連絡先"}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-saffron" />
                <span>{tCommon("address")}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-saffron" />
                <span>{tCommon("phone")}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-saffron" />
                <span>{tCommon("email")}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("newsletter.title")}
            </h3>
            <form className="space-y-3">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="w-full px-4 py-2 rounded-lg bg-charcoal/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-saffron"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-saffron text-charcoal font-semibold rounded-lg hover:bg-saffron/90 transition-colors"
              >
                {t("newsletter.subscribe")}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              {t("copyright", { year: currentYear })}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">{t("social")}</span>
              <div className="flex gap-4">
                {/* Social links would go here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
