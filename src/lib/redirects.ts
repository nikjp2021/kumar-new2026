import type { NextConfig } from 'next';

export const redirects: NextConfig['redirects'] = async () => [
  {
    source: '/menu/',
    destination: '/en/menu',
    permanent: true,
  },
  {
    source: '/about-us/',
    destination: '/en/about',
    permanent: true,
  },
  {
    source: '/contact/',
    destination: '/en/contact',
    permanent: true,
  },
  {
    source: '/booking-and-reserving-a-table/',
    destination: '/en/contact',
    permanent: true,
  },
  {
    source: '/indo-wedding/',
    destination: '/en/weddings',
    permanent: true,
  },
  {
    source: '/indian-wedding-planning/',
    destination: '/en/weddings',
    permanent: true,
  },
  {
    source: '/our-servicesindian-restaurant-in-hamamatsu/',
    destination: '/en/services',
    permanent: true,
  },
  {
    source: '/privacy-policy/',
    destination: '/en/privacy',
    permanent: true,
  },
  {
    source: '/blog/',
    destination: '/en/blog',
    permanent: true,
  },
];
