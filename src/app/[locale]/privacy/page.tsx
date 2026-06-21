"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export default function PrivacyPage() {
  const t = useTranslations("privacy");
  const locale = useLocale();
  const isJa = locale === "ja";

  useEffect(() => {
    const baseUrl = "https://kumarhamamatsu.com";

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = `${baseUrl}/en/privacy`;

    const existingTags = document.querySelectorAll('link[data-hreflang]');
    existingTags.forEach(tag => tag.remove());

    const enLink = document.createElement("link");
    enLink.rel = "alternate";
    enLink.hreflang = "en";
    enLink.href = `${baseUrl}/en/privacy`;
    enLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(enLink);

    const jaLink = document.createElement("link");
    jaLink.rel = "alternate";
    jaLink.hreflang = "ja";
    jaLink.href = `${baseUrl}/ja/privacy`;
    jaLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(jaLink);

    const xDefaultLink = document.createElement("link");
    xDefaultLink.rel = "alternate";
    xDefaultLink.hreflang = "x-default";
    xDefaultLink.href = `${baseUrl}/en/privacy`;
    xDefaultLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(xDefaultLink);

    return () => {
      const tags = document.querySelectorAll('link[data-hreflang]');
      tags.forEach(tag => tag.remove());
    };
  }, []);

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-saffron/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-saffron" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal">{t("title")}</h1>
        </div>
        <p className="text-sm text-charcoal/50 mb-10">
          {t("lastUpdated")}: {isJa ? "2024年1月1日" : "January 1, 2024"}
        </p>

        <div className="prose prose-lg max-w-none text-charcoal/80 space-y-10">
          {/* Who We Are */}
          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-3">
              {isJa ? "運営者情報" : "Who We Are"}
            </h2>
            <p>
              {isJa
                ? "Kumar Restaurant（以下「当店」）は、浜松市中区板屋町アクトタワーB1に所在するインド料理レストランです。当店は、お客様の個人情報の保護に努めております。"
                : "Kumar Restaurant (\"we\", \"us\", or \"our\") is an Indian restaurant located at Act Tower B1, Itayamachi, Naka Ward, Hamamatsu, Shizuoka, Japan. We are committed to protecting the privacy of our website visitors and customers."}
            </p>
          </section>

          {/* Data We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-3">
              {isJa ? "収集する個人データ" : "What Personal Data We Collect"}
            </h2>
            <p>
              {isJa
                ? "当店は、以下の方法で個人データを収集する場合があります："
                : "We may collect the following types of personal data:"}
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>{isJa ? "コメント・お問い合わせフォーム" : "Comments & Contact Forms"}</strong>
                {" — "}
                {isJa
                  ? "フォーム送信時に、お名前、メールアドレス、メッセージ内容を収集します。"
                  : "When you submit a comment or contact form, we collect your name, email address, and message content."}
              </li>
              <li>
                <strong>{isJa ? "予約情報" : "Reservation Information"}</strong>
                {" — "}
                {isJa
                  ? "ご予約時に、お名前、電話番号、メールアドレス、ご来店日時、人数などの情報を収集します。"
                  : "When you make a reservation, we collect your name, phone number, email address, date and time of visit, and party size."}
              </li>
              <li>
                <strong>{isJa ? "Cookie" : "Cookies"}</strong>
                {" — "}
                {isJa
                  ? "ウェブサイトの利便性向上のため、Cookieを使用する場合があります。Cookieは、ウェブブラウザに保存される小さなテキストファイルです。"
                  : "We may use cookies to improve your browsing experience. Cookies are small text files stored on your browser that help us understand how you use our website."}
              </li>
              <li>
                <strong>{isJa ? "サーバーログ" : "Server Logs"}</strong>
                {" — "}
                {isJa
                  ? "ウェブサイトへのアクセス時に、IPアドレス、ブラウザタイプ、アクセス日時などの情報が自動的に記録されます。"
                  : "When you visit our website, information such as your IP address, browser type, and access time is automatically logged."}
              </li>
            </ul>
          </section>

          {/* How We Use Data */}
          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-3">
              {isJa ? "個人データの利用目的" : "How We Use Your Data"}
            </h2>
            <p>
              {isJa
                ? "収集した個人データは、以下の目的で使用します："
                : "We use the collected personal data for the following purposes:"}
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>{isJa ? "ご予約の確認・管理" : "Reservation confirmation and management"}</li>
              <li>{isJa ? "お問い合わせへの対応" : "Responding to your inquiries"}</li>
              <li>{isJa ? "ウェブサイトの改善・分析" : "Website improvement and analytics"}</li>
              <li>{isJa ? "お客様へのお知らせ（ご同意いただいた場合）" : "Sending updates (with your consent)"}</li>
              <li>{isJa ? "法令に基づく対応" : "Compliance with legal obligations"}</li>
            </ul>
          </section>

          {/* Who We Share With */}
          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-3">
              {isJa ? "データの共有" : "Who We Share Data With"}
            </h2>
            <p>
              {isJa
                ? "当店は、お客様の個人データを第三者と共有する場合があります："
                : "We may share your personal data with the following third parties:"}
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                {isJa
                  ? "ウェブサイトホスティングサービス（データの保存・配信のため）"
                  : "Website hosting services (for data storage and delivery)"}
              </li>
              <li>
                {isJa
                  ? "_ANALYTICSサービス（ウェブサイトの利用状況分析のため）"
                  : "Analytics services (to understand website usage)"}
              </li>
              <li>
                {isJa
                  ? "法令に基づく開示が求められた場合"
                  : "When required by law or legal process"}
              </li>
            </ul>
            <p className="mt-3">
              {isJa
                ? "当店は、お客様の同意なく個人データを販売することはありません。"
                : "We do not sell your personal data to third parties."}
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-3">
              {isJa ? "データの保存期間" : "How Long We Retain Data"}
            </h2>
            <p>
              {isJa
                ? "個人データは、収集目的が達成されるまで、または法令に定められた保存期間中保持されます。具体的には："
                : "Personal data is retained for as long as necessary to fulfill the purposes for which it was collected, or as required by law. Specifically:"}
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                {isJa
                  ? "予約情報：利用後1年間"
                  : "Reservation data: up to 1 year after your visit"}
              </li>
              <li>
                {isJa
                  ? "お問い合わせ情報：対応完了後6ヶ月間"
                  : "Inquiry data: up to 6 months after resolution"}
              </li>
              <li>
                {isJa
                  ? "サーバーログ：最大90日間"
                  : "Server logs: up to 90 days"}
              </li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-3">
              {isJa ? "お客様の権利" : "Your Rights Over Your Data"}
            </h2>
            <p>
              {isJa
                ? "お客様は、ご自身の個人データについて以下の権利を有しています："
                : "You have the following rights regarding your personal data:"}
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>{isJa ? "アクセス" : "Access"}</strong>
                {" — "}
                {isJa
                  ? "当店が保有するご自身の個人データを確認する権利"
                  : "The right to request access to the personal data we hold about you"}
              </li>
              <li>
                <strong>{isJa ? "訂正" : "Correction"}</strong>
                {" — "}
                {isJa
                  ? "不正確なデータの訂正を求める権利"
                  : "The right to request correction of inaccurate data"}
              </li>
              <li>
                <strong>{isJa ? "削除" : "Deletion"}</strong>
                {" — "}
                {isJa
                  ? "不要となったデータの削除を求める権利"
                  : "The right to request deletion of your data when it is no longer needed"}
              </li>
              <li>
                <strong>{isJa ? "利用停止" : "Restriction"}</strong>
                {" — "}
                {isJa
                  ? "データ利用の停止を求める権利"
                  : "The right to restrict the processing of your data"}
              </li>
            </ul>
            <p className="mt-3">
              {isJa
                ? "上記の権利を行使される場合は、下記のお問い合わせ先までご連絡ください。"
                : "To exercise any of these rights, please contact us using the information below."}
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-3">
              {isJa ? "お問い合わせ先" : "Contact Us"}
            </h2>
            <p>
              {isJa
                ? "プライバシーに関するご質問やご意見がございましたら、以下までお問い合わせください："
                : "If you have any questions or concerns about this Privacy Policy, please contact us:"}
            </p>
            <div className="mt-4 bg-cream rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-saffron flex-shrink-0" />
                <span>Act Tower B1, Itayamachi, Naka Ward, Hamamatsu, Shizuoka 430-8588</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-saffron flex-shrink-0" />
                <a href="tel:053-451-0154" className="hover:text-saffron transition-colors">
                  053-451-0154
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-saffron flex-shrink-0" />
                <a href="mailto:info@kumarhamamatsu.com" className="hover:text-saffron transition-colors">
                  info@kumarhamamatsu.com
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
