"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BinayKumarRedirect() {
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${locale}/about#team`);
  }, [locale, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <p className="text-charcoal/60">Redirecting...</p>
    </div>
  );
}
