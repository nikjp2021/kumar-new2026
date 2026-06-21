'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface HreflangTagsProps {
  locale: string;
  pagePath?: string;
}

export function HreflangTags({ locale, pagePath }: HreflangTagsProps) {
  const pathname = usePathname();
  const basePath = pagePath || pathname;
  const baseUrl = 'https://kumarhamamatsu.com';

  useEffect(() => {
    const existingTags = document.querySelectorAll('link[data-hreflang]');
    existingTags.forEach(tag => tag.remove());

    const enPath = basePath.replace(/^\/(en|ja)/, '/en');
    const jaPath = basePath.replace(/^\/(en|ja)/, '/ja');

    const enLink = document.createElement('link');
    enLink.rel = 'alternate';
    enLink.hreflang = 'en';
    enLink.href = `${baseUrl}${enPath}`;
    enLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(enLink);

    const jaLink = document.createElement('link');
    jaLink.rel = 'alternate';
    jaLink.hreflang = 'ja';
    jaLink.href = `${baseUrl}${jaPath}`;
    jaLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(jaLink);

    const xDefaultPath = basePath.replace(/^\/(en|ja)/, '');
    const xDefaultLink = document.createElement('link');
    xDefaultLink.rel = 'alternate';
    xDefaultLink.hreflang = 'x-default';
    xDefaultLink.href = `${baseUrl}/en${xDefaultPath}`;
    xDefaultLink.setAttribute('data-hreflang', 'true');
    document.head.appendChild(xDefaultLink);

    return () => {
      const tags = document.querySelectorAll('link[data-hreflang]');
      tags.forEach(tag => tag.remove());
    };
  }, [pathname, locale, pagePath, baseUrl, basePath]);

  return null;
}
