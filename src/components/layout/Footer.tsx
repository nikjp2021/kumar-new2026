import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const currentYear = new Date().getFullYear();
  const isJa = locale === "ja";

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <img
                src="/images/logos/cropped-KumarLogo1-2-1-300x143.png"
                alt="Kumar Restaurant"
                className="h-12"
              />
            </Link>
            <p className="text-gray-400 text-sm">{tCommon("tagline")}</p>
            <div className="flex items-center gap-2 text-saffron">
              <img
                src="/images/decorative/old-typical-phone.png"
                alt="Phone"
                className="w-6 h-6"
              />
              <a href="tel:053-451-0154" className="font-bold text-lg hover:underline">
                053-451-0154
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isJa ? "クイックリンク" : "Quick Links"}
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
              {isJa ? "連絡先" : "Contact Info"}
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-saffron mt-1">📍</span>
                <span>{isJa ? "〒430-7790 静岡県浜松市中区伊場町 アクトタワーB1" : "430-7790 Shizuoka, Hamamatsu, Naka Ward, Itayamachi, Act Tower B1"}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-saffron">📞</span>
                <div>
                  <a href="tel:053-451-0154" className="hover:text-saffron transition-colors block">053-451-0154</a>
                  <a href="tel:+81-90-9276-6901" className="hover:text-saffron transition-colors block text-xs">+81-90-9276-6901 (Kumar)</a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-saffron">💬</span>
                <a href="https://wa.me/+819092766901" target="_blank" rel="noopener noreferrer" className="hover:text-saffron transition-colors">
                  WhatsApp: +81-70-9062-1056
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-saffron">✉️</span>
                <a href="mailto:info@kumarhamamatsu.com" className="hover:text-saffron transition-colors">info@kumarhamamatsu.com</a>
              </li>
            </ul>
          </div>

          {/* Hours + Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isJa ? "営業時間" : "Hours"}
            </h3>
            <div className="text-gray-400 text-sm space-y-1 mb-6">
              <p>{isJa ? "月〜金: 11:00-15:00 & 17:00-22:00" : "Mon-Fri: 11:00-15:00 & 17:00-22:00"}</p>
              <p>{isJa ? "土・日・祝: 11:00-22:00" : "Sat-Sun-Holiday: 11:00-22:00"}</p>
            </div>
            <h3 className="text-lg font-semibold mb-3">
              {isJa ? "フォローする" : "Follow Us"}
            </h3>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/kumarhamamatsu/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src="/images/social/fb-free-imng.png" alt="Facebook" className="w-8 h-8" />
              </a>
              <a href="https://twitter.com/HamamatsuKumar" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src="/images/social/tweet-free-img.png" alt="Twitter" className="w-8 h-8" />
              </a>
              <a href="https://g.page/kumarhamamatsu/review" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src="/images/social/google-reviews-free-img.png" alt="Google" className="w-8 h-8" />
              </a>
              <a href="https://www.instagram.com/kumarhamamatsu/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Ig</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Second Restaurant */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm mb-1">
                {isJa ? " our other restaurant:" : "Our other restaurant:"}
              </p>
              <p className="text-white font-semibold">
                {isJa ? "クマールさんのカレー" : "Kumar-san's Curry"}
              </p>
              <p className="text-gray-400 text-xs">
                {isJa ? "〒432-0041 浜松市北区平口2861番地 サンストリート浜北１F" : "432-0041 Hamamatsu, Kita-ku, Higashiguchi 2861, Sun Street Hamakita 1F"}
              </p>
              <a href="tel:053-586-8339" className="text-saffron text-sm hover:underline">053-586-8339</a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {currentYear} Kumar Restaurant
              </p>
              <p className="text-saffron text-sm italic">
                {isJa ? "スパイシーな生活を" : "Spice up life at Kumar Restaurant"}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Powered by Nik&apos;s Consulting
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
