import type { Metadata } from "next";

const BASE_URL = "https://kumarhamamatsu.com";

interface PageMetadata {
  en: Metadata;
  ja: Metadata;
}

export function generateHomeMetadata(): PageMetadata {
  return {
    en: {
      title: "Kumar Restaurant - Authentic Indian Cuisine in Hamamatsu",
      description:
        "Experience the rich flavors of India at Kumar Restaurant in Hamamatsu, Japan. Traditional recipes, fresh spices daily, and warm hospitality since 1995.",
      openGraph: {
        title: "Kumar Restaurant - Authentic Indian Cuisine in Hamamatsu",
        description:
          "Experience the rich flavors of India at Kumar Restaurant in Hamamatsu, Japan.",
        url: BASE_URL,
        siteName: "Kumar Restaurant",
        images: [
          {
            url: `${BASE_URL}/images/about/site-image.jpg`,
            width: 1200,
            height: 630,
            alt: "Kumar Restaurant",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Kumar Restaurant - Authentic Indian Cuisine in Hamamatsu",
        description:
          "Experience the rich flavors of India at Kumar Restaurant in Hamamatsu, Japan.",
        images: [`${BASE_URL}/images/about/site-image.jpg`],
      },
      alternates: {
        canonical: BASE_URL,
        languages: {
          en: `${BASE_URL}/en`,
          ja: `${BASE_URL}/ja`,
        },
      },
    },
    ja: {
      title: "クマールレストラン - 浜松の本格インド料理",
      description:
        "浜松のクマールレストランでインドの豊かな味わいを体験してください。1995年からの伝統的なレシピ、毎日の新鮮なスパイス、そして温かいおもてなし。",
      openGraph: {
        title: "クマールレストラン - 浜松の本格インド料理",
        description:
          "浜松のクマールレストランでインドの豊かな味わいを体験してください。",
        url: `${BASE_URL}/ja`,
        siteName: "Kumar Restaurant",
        images: [
          {
            url: `${BASE_URL}/images/about/site-image.jpg`,
            width: 1200,
            height: 630,
            alt: "クマールレストラン",
          },
        ],
        locale: "ja_JP",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "クマールレストラン - 浜松の本格インド料理",
        description:
          "浜松のクマールレストランでインドの豊かな味わいを体験してください。",
        images: [`${BASE_URL}/images/about/site-image.jpg`],
      },
      alternates: {
        canonical: `${BASE_URL}/ja`,
        languages: {
          en: BASE_URL,
          ja: `${BASE_URL}/ja`,
        },
      },
    },
  };
}

export function generateMenuMetadata(): PageMetadata {
  return {
    en: {
      title: "Menu - Kumar Restaurant | Indian Cuisine Hamamatsu",
      description:
        "Explore our authentic Indian menu featuring curries, tandoori, biryani, naan breads, and more. Vegetarian and halal options available.",
      openGraph: {
        title: "Menu - Kumar Restaurant | Indian Cuisine Hamamatsu",
        description:
          "Explore our authentic Indian menu featuring curries, tandoori, biryani, naan breads, and more.",
        url: `${BASE_URL}/en/menu`,
        siteName: "Kumar Restaurant",
        images: [
          {
            url: `${BASE_URL}/images/about/dine-out.jpg`,
            width: 1200,
            height: 630,
            alt: "Kumar Restaurant Menu",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Menu - Kumar Restaurant | Indian Cuisine Hamamatsu",
        description:
          "Explore our authentic Indian menu featuring curries, tandoori, biryani, naan breads, and more.",
        images: [`${BASE_URL}/images/about/dine-out.jpg`],
      },
      alternates: {
        canonical: `${BASE_URL}/en/menu`,
        languages: {
          en: `${BASE_URL}/en/menu`,
          ja: `${BASE_URL}/ja/menu`,
        },
      },
    },
    ja: {
      title: "メニュー - クマールレストラン | 浜松インド料理",
      description:
        "カレー、タンドーリ、ビリヤニ、ナーンなどの本格インドメニューをご覧ください。ベジタリアン・ハラル対応あり。",
      openGraph: {
        title: "メニュー - クマールレストラン | 浜松インド料理",
        description:
          "カレー、タンドーリ、ビリヤニ、ナーンなどの本格インドメニューをご覧ください。",
        url: `${BASE_URL}/ja/menu`,
        siteName: "Kumar Restaurant",
        images: [
          {
            url: `${BASE_URL}/images/about/dine-out.jpg`,
            width: 1200,
            height: 630,
            alt: "クマールレストラン メニュー",
          },
        ],
        locale: "ja_JP",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "メニュー - クマールレストラン | 浜松インド料理",
        description:
          "カレー、タンドーリ、ビリヤニ、ナーンなどの本格インドメニューをご覧ください。",
        images: [`${BASE_URL}/images/about/dine-out.jpg`],
      },
      alternates: {
        canonical: `${BASE_URL}/ja/menu`,
        languages: {
          en: `${BASE_URL}/en/menu`,
          ja: `${BASE_URL}/ja/menu`,
        },
      },
    },
  };
}

export function generateAboutMetadata(): PageMetadata {
  return {
    en: {
      title: "About Us - Kumar Restaurant | Our Story Since 1995",
      description:
        "Discover the story of Kumar Restaurant, Hamamatsu's first Indian restaurant. Founded by Binay Kumar, serving authentic Indian cuisine since 1995.",
      openGraph: {
        title: "About Us - Kumar Restaurant | Our Story Since 1995",
        description:
          "Discover the story of Kumar Restaurant, Hamamatsu's first Indian restaurant.",
        url: `${BASE_URL}/en/about`,
        siteName: "Kumar Restaurant",
        images: [
          {
            url: `${BASE_URL}/images/about/KumarSan.jpg`,
            width: 1200,
            height: 630,
            alt: "Mr. Binay Kumar - Founder",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "About Us - Kumar Restaurant | Our Story Since 1995",
        description:
          "Discover the story of Kumar Restaurant, Hamamatsu's first Indian restaurant.",
        images: [`${BASE_URL}/images/about/KumarSan.jpg`],
      },
      alternates: {
        canonical: `${BASE_URL}/en/about`,
        languages: {
          en: `${BASE_URL}/en/about`,
          ja: `${BASE_URL}/ja/about`,
        },
      },
    },
    ja: {
      title: "私たちについて - クマールレストラン | 1995年からの物語",
      description:
        "浜松初のインド料理店クマールレストランの物語をご覧ください。ビナイ・クマール氏が1995年に創業。本格インド料理を提供し続けています。",
      openGraph: {
        title: "私たちについて - クマールレストラン | 1995年からの物語",
        description:
          "浜松初のインド料理店クマールレストランの物語をご覧ください。",
        url: `${BASE_URL}/ja/about`,
        siteName: "Kumar Restaurant",
        images: [
          {
            url: `${BASE_URL}/images/about/KumarSan.jpg`,
            width: 1200,
            height: 630,
            alt: "ビナイ・クマール - 創業者",
          },
        ],
        locale: "ja_JP",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "私たちについて - クマールレストラン | 1995年からの物語",
        description:
          "浜松初のインド料理店クマールレストランの物語をご覧ください。",
        images: [`${BASE_URL}/images/about/KumarSan.jpg`],
      },
      alternates: {
        canonical: `${BASE_URL}/ja/about`,
        languages: {
          en: `${BASE_URL}/en/about`,
          ja: `${BASE_URL}/ja/about`,
        },
      },
    },
  };
}

export function generateContactMetadata(): PageMetadata {
  return {
    en: {
      title: "Contact Us - Kumar Restaurant | Reservations & Inquiries",
      description:
        "Contact Kumar Restaurant for reservations, inquiries, or catering requests. Located at Act Tower B1, Hamamatsu. Call 053-451-0154.",
      openGraph: {
        title: "Contact Us - Kumar Restaurant | Reservations & Inquiries",
        description:
          "Contact Kumar Restaurant for reservations, inquiries, or catering requests.",
        url: `${BASE_URL}/en/contact`,
        siteName: "Kumar Restaurant",
        images: [
          {
            url: `${BASE_URL}/images/about/site-image.jpg`,
            width: 1200,
            height: 630,
            alt: "Contact Kumar Restaurant",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Contact Us - Kumar Restaurant | Reservations & Inquiries",
        description:
          "Contact Kumar Restaurant for reservations, inquiries, or catering requests.",
        images: [`${BASE_URL}/images/about/site-image.jpg`],
      },
      alternates: {
        canonical: `${BASE_URL}/en/contact`,
        languages: {
          en: `${BASE_URL}/en/contact`,
          ja: `${BASE_URL}/ja/contact`,
        },
      },
    },
    ja: {
      title: "お問い合わせ - クマールレストラン | ご予約・お問い合わせ",
      description:
        "ご予約、お問い合わせ、ケータリングのご依頼はクマールレストランへ。浜松アクトタワーB1。電話: 053-451-0154",
      openGraph: {
        title: "お問い合わせ - クマールレストラン | ご予約・お問い合わせ",
        description:
          "ご予約、お問い合わせ、ケータリングのご依頼はクマールレストランへ。",
        url: `${BASE_URL}/ja/contact`,
        siteName: "Kumar Restaurant",
        images: [
          {
            url: `${BASE_URL}/images/about/site-image.jpg`,
            width: 1200,
            height: 630,
            alt: "クマールレストラン お問い合わせ",
          },
        ],
        locale: "ja_JP",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "お問い合わせ - クマールレストラン | ご予約・お問い合わせ",
        description:
          "ご予約、お問い合わせ、ケータリングのご依頼はクマールレストランへ。",
        images: [`${BASE_URL}/images/about/site-image.jpg`],
      },
      alternates: {
        canonical: `${BASE_URL}/ja/contact`,
        languages: {
          en: `${BASE_URL}/en/contact`,
          ja: `${BASE_URL}/ja/contact`,
        },
      },
    },
  };
}

export function generateBlogMetadata(): PageMetadata {
  return {
    en: {
      title: "Blog - Kumar Restaurant | News & Updates",
      description:
        "Read the latest news, recipes, and stories from Kumar Restaurant. Discover Indian cuisine, culture, and our journey in Hamamatsu.",
      openGraph: {
        title: "Blog - Kumar Restaurant | News & Updates",
        description:
          "Read the latest news, recipes, and stories from Kumar Restaurant.",
        url: `${BASE_URL}/en/blog`,
        siteName: "Kumar Restaurant",
        images: [
          {
            url: `${BASE_URL}/images/blog/brown-bread-on-blue-and-white-ceramic-plate.webp`,
            width: 1200,
            height: 630,
            alt: "Kumar Restaurant Blog",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog - Kumar Restaurant | News & Updates",
        description:
          "Read the latest news, recipes, and stories from Kumar Restaurant.",
        images: [
          `${BASE_URL}/images/blog/brown-bread-on-blue-and-white-ceramic-plate.webp`,
        ],
      },
      alternates: {
        canonical: `${BASE_URL}/en/blog`,
        languages: {
          en: `${BASE_URL}/en/blog`,
          ja: `${BASE_URL}/ja/blog`,
        },
      },
    },
    ja: {
      title: "ブログ - クマールレストラン | ニュース＆最新情報",
      description:
        "クマールレストランの最新ニュース、レシピ、ストーリーをお読みください。インド料理、文化、そして浜松での私たちの旅。",
      openGraph: {
        title: "ブログ - クマールレストラン | ニュース＆最新情報",
        description:
          "クマールレストランの最新ニュース、レシピ、ストーリーをお読みください。",
        url: `${BASE_URL}/ja/blog`,
        siteName: "Kumar Restaurant",
        images: [
          {
            url: `${BASE_URL}/images/blog/brown-bread-on-blue-and-white-ceramic-plate.webp`,
            width: 1200,
            height: 630,
            alt: "クマールレストラン ブログ",
          },
        ],
        locale: "ja_JP",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "ブログ - クマールレストラン | ニュース＆最新情報",
        description:
          "クマールレストランの最新ニュース、レシピ、ストーリーをお読みください。",
        images: [
          `${BASE_URL}/images/blog/brown-bread-on-blue-and-white-ceramic-plate.webp`,
        ],
      },
      alternates: {
        canonical: `${BASE_URL}/ja/blog`,
        languages: {
          en: `${BASE_URL}/en/blog`,
          ja: `${BASE_URL}/ja/blog`,
        },
      },
    },
  };
}

export function generateBlogPostMetadata(post: {
  slug: string;
  title: { en: string; ja: string };
  excerpt: { en: string; ja: string };
  image: string;
  date: string;
}): PageMetadata {
  return {
    en: {
      title: `${post.title.en} - Kumar Restaurant Blog`,
      description: post.excerpt.en,
      openGraph: {
        title: post.title.en,
        description: post.excerpt.en,
        url: `${BASE_URL}/en/blog/${post.slug}`,
        siteName: "Kumar Restaurant",
        images: [
          {
            url: `${BASE_URL}${post.image}`,
            width: 1200,
            height: 630,
            alt: post.title.en,
          },
        ],
        locale: "en_US",
        type: "article",
        publishedTime: post.date,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title.en,
        description: post.excerpt.en,
        images: [`${BASE_URL}${post.image}`],
      },
      alternates: {
        canonical: `${BASE_URL}/en/blog/${post.slug}`,
        languages: {
          en: `${BASE_URL}/en/blog/${post.slug}`,
          ja: `${BASE_URL}/ja/blog/${post.slug}`,
        },
      },
    },
    ja: {
      title: `${post.title.ja} - クマールレストラン ブログ`,
      description: post.excerpt.ja,
      openGraph: {
        title: post.title.ja,
        description: post.excerpt.ja,
        url: `${BASE_URL}/ja/blog/${post.slug}`,
        siteName: "Kumar Restaurant",
        images: [
          {
            url: `${BASE_URL}${post.image}`,
            width: 1200,
            height: 630,
            alt: post.title.ja,
          },
        ],
        locale: "ja_JP",
        type: "article",
        publishedTime: post.date,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title.ja,
        description: post.excerpt.ja,
        images: [`${BASE_URL}${post.image}`],
      },
      alternates: {
        canonical: `${BASE_URL}/ja/blog/${post.slug}`,
        languages: {
          en: `${BASE_URL}/en/blog/${post.slug}`,
          ja: `${BASE_URL}/ja/blog/${post.slug}`,
        },
      },
    },
  };
}

export function generateServicesMetadata(): PageMetadata {
  return {
    en: {
      title: "Services - Kumar Restaurant | Catering, Delivery & Events",
      description:
        "Explore Kumar Restaurant services: dine-in, takeaway, delivery, catering, and wedding planning. Authentic Indian cuisine for every occasion.",
      openGraph: {
        title: "Services - Kumar Restaurant | Catering, Delivery & Events",
        description:
          "Explore Kumar Restaurant services: dine-in, takeaway, delivery, catering, and wedding planning.",
        url: `${BASE_URL}/en/services`,
        siteName: "Kumar Restaurant",
        images: [
          {
            url: `${BASE_URL}/images/about/site-image.jpg`,
            width: 1200,
            height: 630,
            alt: "Kumar Restaurant Services",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Services - Kumar Restaurant | Catering, Delivery & Events",
        description:
          "Explore Kumar Restaurant services: dine-in, takeaway, delivery, catering, and wedding planning.",
        images: [`${BASE_URL}/images/about/site-image.jpg`],
      },
      alternates: {
        canonical: `${BASE_URL}/en/services`,
        languages: {
          en: `${BASE_URL}/en/services`,
          ja: `${BASE_URL}/ja/services`,
        },
      },
    },
    ja: {
      title: "サービス - クマールレストラン | ケータリング、配達、イベント",
      description:
        "クマールレストランのサービス：ダイニング、テイクアウト、配達、ケータリング、ウェディング企画。すべての occasions に本格インド料理。",
      openGraph: {
        title:
          "サービス - クマールレストラン | ケータリング、配達、イベント",
        description:
          "クマールレストランのサービス：ダイニング、テイクアウト、配達、ケータリング、ウェディング企画。",
        url: `${BASE_URL}/ja/services`,
        siteName: "Kumar Restaurant",
        images: [
          {
            url: `${BASE_URL}/images/about/site-image.jpg`,
            width: 1200,
            height: 630,
            alt: "クマールレストラン サービス",
          },
        ],
        locale: "ja_JP",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title:
          "サービス - クマールレストラン | ケータリング、配達、イベント",
        description:
          "クマールレストランのサービス：ダイニング、テイクアウト、配達、ケータリング、ウェディング企画。",
        images: [`${BASE_URL}/images/about/site-image.jpg`],
      },
      alternates: {
        canonical: `${BASE_URL}/ja/services`,
        languages: {
          en: `${BASE_URL}/en/services`,
          ja: `${BASE_URL}/ja/services`,
        },
      },
    },
  };
}

export function generateWeddingsMetadata(): PageMetadata {
  return {
    en: {
      title:
        "Wedding Services - Kumar Restaurant | Indian Wedding Catering Hamamatsu",
      description:
        "Plan your dream Indian wedding with Kumar Restaurant. Professional catering, customized menus, and beautiful decorations for 50-500+ guests.",
      openGraph: {
        title:
          "Wedding Services - Kumar Restaurant | Indian Wedding Catering Hamamatsu",
        description:
          "Plan your dream Indian wedding with Kumar Restaurant. Professional catering and customized menus.",
        url: `${BASE_URL}/en/weddings`,
        siteName: "Kumar Restaurant",
        images: [
          {
            url: `${BASE_URL}/images/blog/photo-of-pub-set-in-room-during-daytime.webp`,
            width: 1200,
            height: 630,
            alt: "Kumar Restaurant Wedding Services",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title:
          "Wedding Services - Kumar Restaurant | Indian Wedding Catering Hamamatsu",
        description:
          "Plan your dream Indian wedding with Kumar Restaurant. Professional catering and customized menus.",
        images: [
          `${BASE_URL}/images/blog/photo-of-pub-set-in-room-during-daytime.webp`,
        ],
      },
      alternates: {
        canonical: `${BASE_URL}/en/weddings`,
        languages: {
          en: `${BASE_URL}/en/weddings`,
          ja: `${BASE_URL}/ja/weddings`,
        },
      },
    },
    ja: {
      title:
        "ウェディングサービス - クマールレストラン | 浜松インド式ウェディング",
      description:
        "クマールレストランで夢のインド式ウェディングを計画してください。プロフェッショナルなケータリング、カスタマイズメニュー、50〜500名以上のゲストに対応。",
      openGraph: {
        title:
          "ウェディングサービス - クマールレストラン | 浜松インド式ウェディング",
        description:
          "クマールレストランで夢のインド式ウェディングを計画してください。",
        url: `${BASE_URL}/ja/weddings`,
        siteName: "Kumar Restaurant",
        images: [
          {
            url: `${BASE_URL}/images/blog/photo-of-pub-set-in-room-during-daytime.webp`,
            width: 1200,
            height: 630,
            alt: "クマールレストラン ウェディングサービス",
          },
        ],
        locale: "ja_JP",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title:
          "ウェディングサービス - クマールレストラン | 浜松インド式ウェディング",
        description:
          "クマールレストランで夢のインド式ウェディングを計画してください。",
        images: [
          `${BASE_URL}/images/blog/photo-of-pub-set-in-room-during-daytime.webp`,
        ],
      },
      alternates: {
        canonical: `${BASE_URL}/ja/weddings`,
        languages: {
          en: `${BASE_URL}/en/weddings`,
          ja: `${BASE_URL}/ja/weddings`,
        },
      },
    },
  };
}
