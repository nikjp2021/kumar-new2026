import Link from "next/link";
import { useTranslations } from "next-intl";
import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";

export function Footer({ locale }: { locale: string }) {
  const tNav = useTranslations("nav");
  const currentYear = new Date().getFullYear();
  const isJa = locale === "ja";

  return (
    <footer className="bg-charcoal text-white pattern-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href={`/${locale}`} className="flex justify-center md:justify-start">
              <img
                src="/images/logos/cropped-KumarLogo1-2-1-300x143.png"
                alt="Kumar Restaurant"
                className="h-14 opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </Link>
            <p className="text-saffron-light italic font-[family-name:var(--font-dm-sans)] text-[15px] text-center md:text-left">
              {isJa ? "スパイシーな生活を" : "Spice up life at Kumar Restaurant"}
            </p>
            <div className="flex items-center gap-2 text-saffron justify-center md:justify-start">
              <img
                src="/images/decorative/old-typical-phone.png"
                alt="Phone"
                className="w-5 h-5 opacity-80"
              />
              <a href="tel:053-451-0154" className="font-bold text-lg hover:underline">
                053-451-0154
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="font-[family-name:var(--font-dm-sans)] text-[13px] uppercase tracking-[0.15em] text-gold mb-5">
              {isJa ? "クイックリンク" : "Quick Links"}
            </h3>
            <ul className="space-y-2.5">
              {["home", "menu", "about", "blog", "contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${locale}${item === "home" ? "" : `/${item}`}`}
                    className="text-gray-400 text-sm hover:text-saffron transition-colors duration-300 inline-block"
                  >
                    {tNav(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="font-[family-name:var(--font-dm-sans)] text-[13px] uppercase tracking-[0.15em] text-gold mb-5">
              {isJa ? "連絡先" : "Contact Info"}
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-saffron mt-0.5 shrink-0" />
                <span>{isJa ? "〒430-7790 静岡県浜松市中区伊場町 アクトタワーB1" : "430-7790 Shizuoka, Hamamatsu, Naka Ward, Itayamachi, Act Tower B1"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-saffron shrink-0" />
                <div>
                  <a href="tel:053-451-0154" className="hover:text-saffron transition-colors block">053-451-0154</a>
                  <a href="tel:+81-90-9276-6901" className="hover:text-saffron transition-colors block text-xs mt-0.5">+81-90-9276-6901 (Kumar)</a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-saffron shrink-0" />
                <a href="https://wa.me/+819092766901" target="_blank" rel="noopener noreferrer" className="hover:text-saffron transition-colors">
                  WhatsApp: +81-70-9062-1056
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-saffron shrink-0" />
                <a href="mailto:info@kumarhamamatsu.com" className="hover:text-saffron transition-colors">info@kumarhamamatsu.com</a>
              </li>
            </ul>
          </div>

          {/* Hours + Social */}
          <div className="text-center md:text-left">
            <h3 className="font-[family-name:var(--font-dm-sans)] text-[13px] uppercase tracking-[0.15em] text-gold mb-5">
              {isJa ? "営業時間" : "Hours"}
            </h3>
            <div className="text-gray-400 text-sm space-y-1 mb-8">
              <p>{isJa ? "月〜金: 11:00-15:00 & 17:00-22:00" : "Mon-Fri: 11:00-15:00 & 17:00-22:00"}</p>
              <p>{isJa ? "土・日・祝: 11:00-22:00" : "Sat-Sun-Holiday: 11:00-22:00"}</p>
            </div>
            <h3 className="font-[family-name:var(--font-dm-sans)] text-[13px] uppercase tracking-[0.15em] text-gold mb-4">
              {isJa ? "フォローする" : "Follow Us"}
            </h3>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <a href="https://www.facebook.com/kumarhamamatsu/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-charcoal-light border border-white/10 flex items-center justify-center hover:bg-saffron hover:border-saffron hover:scale-110 transition-all duration-300">
                <img src="/images/social/fb-free-imng.png" alt="Facebook" className="w-4 h-4 brightness-0 invert opacity-70 hover:opacity-100" />
              </a>
              <a href="https://twitter.com/HamamatsuKumar" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-charcoal-light border border-white/10 flex items-center justify-center hover:bg-saffron hover:border-saffron hover:scale-110 transition-all duration-300">
                <img src="/images/social/tweet-free-img.png" alt="Twitter" className="w-4 h-4 brightness-0 invert opacity-70 hover:opacity-100" />
              </a>
              <a href="https://g.page/kumarhamamatsu/review" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-charcoal-light border border-white/10 flex items-center justify-center hover:bg-saffron hover:border-saffron hover:scale-110 transition-all duration-300">
                <img src="/images/social/google-reviews-free-img.png" alt="Google" className="w-4 h-4 brightness-0 invert opacity-70 hover:opacity-100" />
              </a>
              <a href="https://www.instagram.com/kumarhamamatsu/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-charcoal-light border border-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 hover:border-transparent hover:scale-110 transition-all duration-300">
                <span className="text-white/70 font-bold text-[10px] hover:text-white">Ig</span>
              </a>
            </div>
          </div>
        </div>

        {/* Gold divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        {/* Second Restaurant */}
        <div className="border border-gold/20 rounded-sm p-6 sm:p-8 bg-charcoal-light/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-gray-500 text-xs uppercase tracking-[0.15em] mb-1.5 font-[family-name:var(--font-dm-sans)]">
                {isJa ? "我们的另一家餐厅" : "Our Other Restaurant"}
              </p>
              <p className="text-white font-[family-name:var(--font-dm-sans)] text-lg">
                {isJa ? "クマールさんのカレー" : "Kumar-san's Curry"}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {isJa ? "〒432-0041 浜松市北区平口2861番地 サンストリート浜北１F" : "432-0041 Hamamatsu, Kita-ku, Higashiguchi 2861, Sun Street Hamakita 1F"}
              </p>
              <a href="tel:053-586-8339" className="text-saffron text-sm hover:underline mt-1 inline-block">053-586-8339</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-xs">
            &copy; {currentYear} Kumar Restaurant. {isJa ? "全著作権所有" : "All rights reserved."}
          </p>
          <p className="text-gray-600 text-[11px] mt-1.5">
            Powered by Nik&apos;s Consulting
          </p>
        </div>
      </div>
    </footer>
  );
}
