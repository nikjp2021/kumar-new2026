export type BlogCategory = "food" | "culture" | "story" | "wedding" | "services";

export interface BlogPost {
  slug: string;
  title: { en: string; ja: string };
  excerpt: { en: string; ja: string };
  content: { en: string; ja: string };
  category: BlogCategory;
  image: string;
  date: string;
  author: string;
  readingTime: number;
  featured?: boolean;
}

export const categoryLabels: Record<BlogCategory, { en: string; ja: string }> = {
  food: { en: "Food & Recipes", ja: "料理＆レシピ" },
  culture: { en: "Culture & Events", ja: "文化＆イベント" },
  story: { en: "Our Story", ja: "私たちのストーリー" },
  wedding: { en: "Weddings", ja: "結婚式" },
  services: { en: "Services", ja: "サービス" },
};

export const blogPosts: BlogPost[] = [
  {
    slug: "kumar-story",
    title: {
      en: "The Story of Kumar Restaurant: 30 Years of Indian Tradition in Hamamatsu",
      ja: "クマールレストランの物語：浜松で30年間のインドの伝統",
    },
    excerpt: {
      en: "From a small kitchen dream to Hamamatsu's most beloved Indian restaurant — discover the passion behind three generations of authentic cuisine.",
      ja: "小さな台所の夢から浜松で最も愛されるインド料理店へ — 三代にわたる本格料理への情熱をご紹介します。",
    },
    content: {
      en: `## A Dream Takes Root

In 1995, Kumar Restaurant opened its doors for the first time in the heart of Hamamatsu. What started as a small family kitchen with a handful of recipes passed down through generations quickly grew into something much bigger — a bridge between Indian culinary tradition and the people of Japan.

## Three Generations of Passion

Our recipes have traveled across oceans and generations. Each dish carries the warmth of family gatherings, the aroma of freshly ground spices, and the dedication of cooks who refuse to compromise on authenticity.

> "Food is the language of love. When you cook with passion, every bite tells a story." — Kumar Family

## Growing with Hamamatsu

Over three decades, we've grown alongside this beautiful city. From hosting the G7 Summit catering to serving daily lunches at Act Tower, we've been honored to be part of Hamamatsu's vibrant community.

## What Sets Us Apart

- **Fresh spices ground daily** — We select and grind our spices every morning
- **300+ year old recipes** — Traditional methods preserved with care
- **Family values** — Every guest is treated like family

## Looking Forward

As we continue to serve authentic Indian cuisine, we remain committed to our founding principles: quality ingredients, traditional techniques, and genuine hospitality. We look forward to welcoming you at Kumar Restaurant.`,
      ja: `## 夢が根を張る

1995年、クマールレストランは浜松の中心部で初めてドアを開けました。世代に受け継がれたレシピで小さな台所から始まった夢は、やがて大きく成長しました — インドの料理の伝統と日本の人々をつなぐ架け橋として。

## 三代にわたる情熱

私たちのレシピは海と世代を越えてきました。一つ一つの料理には、家族の集まりの温もり、挽きたてスパイスの香り、そして本格性を妥協しない料理人たちの献身が込められています。

> 「食べ物は愛の言葉です。情熱を持って料理すれば、一口一口が物語を語ります。」 — クマール家族

## 浜松とともに

30年間にわたり、私たちは美しいこの街とともに成長してきました。G7サミットのケータリングからアクトタワーでのランチサービスまで、浜松の活気あるコミュニティの一部であることを光栄に思っています。

## 選ばれる理由

- **毎日挽く新鮮なスパイス** — 毎朝スパイスを選んで挽いています
- **300年以上のレシピ** — 厳選された伝統的な調理法
- **家族の価値観** — すべてのお客様を家族として大切に

## 未来へ向けて

本格的なインド料理を提供し続けると同時に、創業時の原則 — 高品質な食材、伝統的な技術、そして真のおもてなし — を守り続けます。クマールレストランでお会いできることを楽しみにしています。`,
    },
    image: "/images/blog/brown-bread-on-blue-and-white-ceramic-plate.webp",
    date: "2024-01-15",
    author: "Kumar Team",
    readingTime: 5,
    featured: true,
    category: "story",
  },
  {
    slug: "top-10-must-try-dishes",
    title: {
      en: "Top 10 Must-Try Dishes at Kumar Restaurant",
      ja: "クマールレストランで必食のトップ10ディッシュ",
    },
    excerpt: {
      en: "Whether you're a first-time visitor or a regular guest, these signature dishes will take you on a culinary journey through India.",
      ja: "初めてのご来店でも常連さんでも、これらのシグネチャー料理がインドの料理への旅をお届けします。",
    },
    content: {
      en: `## 1. Butter Chicken (バターチキン)

Our butter chicken is a creamy, rich blend of tandoor-roasted chicken in a spiced tomato sauce. The balance of sweetness and warmth makes it a perennial favorite.

## 2. Chana Masala (チャナマサラ)

Chickpeas slow-cooked with tomatoes, cashew paste, and our signature spice blend. A vegetarian masterpiece that even meat lovers adore.

## 3. Palak Paneer (パラクパニール)

Fresh spinach curry with cubes of Indian cottage cheese. Light, nutritious, and bursting with flavor.

## 4. Biryani (ビリヤニ)

Fragrant basmati rice layered with tender meat, saffron, and aromatic spices. Each grain tells a story.

## 5. Tandoori Chicken (タンドーリチキン)

Marinated for 24 hours in yogurt and spices, then roasted to perfection in our traditional clay oven.

## 6. Naan Bread (ナーン)

Freshly baked in our tandoor oven — plain, garlic, or cheese. The perfect companion to any curry.

## 7. Keema Curry (キーマカレー)

Minced lamb with ginger, garlic, and cream. Rich, hearty, and deeply satisfying.

## 8. Samosa (サモサ)

Crispy pastry filled with spiced potatoes and peas. The perfect appetizer to start your meal.

## 9. Mango Lassi (マンゴーラッシー)

A refreshing yogurt-based drink blended with sweet mangoes. The ideal way to cool down after a spicy meal.

## 10. Gulab Jamun (グラブジャムン)

Soft, syrupy dumplings soaked in rose-flavored sugar syrup. The sweet ending to an unforgettable meal.

---

*Visit us at Act Tower B1 or Hamakita to try these dishes!*`,
      ja: `## 1. バターチキン

タンドーリでローストした鶏肉をスパイストマトソースで仕上げたクリーミーでリッチな料理。甘みと温かさのバランスが絶品です。

## 2. チャナマサラ

トマト、カシューナッツペースト、そして独自のスパイスブレンドでじっくり煮込んだひよこ豆。ベジタリアンの傑作で、肉好きな方にも大人気です。

## 3. パラクパニール

ホウレン草カレーにインドリコッテージチーズのキューブ。軽やかで栄養豊富、風味たっぷりです。

## 4. ビリヤニ

香り高いバスマティライスに柔らかい肉、サフラン、芳香スパイスを層状に重ねた一品。粒粒が物語を語ります。

## 5. タンドーリチキン

ヨーグルトとスパイスで24時間漬け込み、伝統的な土窯で完璧にロースト。

## 6. ナーン

タンドーリで焼きたて — プレーン、ガーリック、チーズからお選びいただけます。カレーの最高の相棒です。

## 7. キーマカレー

ジンジャー、ガーリック、クリーム入りのひき肉。リッチで hearty、深い満足感を提供します。

## 8. サモサ

スパイシーなじゃがいとエンドウ豆を詰めたカリカリのパストラ。食事のスタートに最適な前菜です。

## 9. マンゴーラッシー

甘いマンゴーとヨーグルトをブレンドした爽やかな飲み物。スパイシーな食事の後に最適です。

## 10. グラブジャムン

ローズ風味のシロップに浸した柔らかい団子。忘れられない食事の甘い締めくくりに。

---

*アクトタワーB1または浜北でこれらの料理をお試しください！*`,
    },
    image: "/images/food/india-indian-indian-food-1481494-1024x682.jpg",
    date: "2024-02-10",
    author: "Chef Kumar",
    readingTime: 6,
    category: "food",
  },
  {
    slug: "hamamatsu-matsuri-celebration",
    title: {
      en: "Celebrating Hamamatsu Matsuri: Where Indian Meets Japanese Festival",
      ja: "浜松祭りの祝祭：インドと日本の祭りが出会う場所",
    },
    excerpt: {
      en: "Every spring, Hamamatsu comes alive with kites and music. Here's how Kumar Restaurant celebrates this beloved local festival with Indian flavors.",
      ja: "毎年春になると、浜松は凧と音楽で活気づきます。クマールレストランがインドの風味でこの愛され地元祭りを祝う方法をご紹介。",
    },
    content: {
      en: `## The Spirit of Hamamatsu Matsuri

Every year in May, Hamamatsu transforms into a city of celebration. The Hamamatsu Matsuri, with its iconic kite battles and vibrant parades, is one of Japan's most exciting festivals.

## A Cultural Fusion

At Kumar Restaurant, we believe festivals are about bringing people together. During Hamamatsu Matsuri, we add special Indian touches to the celebration:

- **Special festival menu** — Curries and tandoori dishes with a festive twist
- **Decorations** — Colorful rangoli patterns and traditional Indian decorations
- **Music and atmosphere** — A blend of Japanese and Indian festive energy

## Our Festival Traditions

For over 20 years, we've been part of the Hamamatsu Matsuri celebration. Our kitchen comes alive with special dishes that honor both Indian and Japanese culinary traditions.

## Join the Celebration

If you're in Hamamatsu during Matsuri season, come experience the cultural fusion at Kumar. Enjoy authentic Indian food while soaking in the festive atmosphere of one of Japan's greatest celebrations.`,
      ja: `## 浜松祭りの精神

毎年5月、浜松は祝祭の街に変わります。象徴的な凧の戦いや華やかなパレードが繰り広げられる浜松祭りは、日本で最もエキサイティングな祭りの一つです。

## 文化の融合

クマールレストランでは、祭りは人々をつなぐものだと信じています。浜松祭りの期間中、インドの特別なタッチを加えています：

- **特別な祭りメニュー** — 祝祭風味のカレーやタンドーリ料理
- **装飾** — 色鮮やかなランゴリーパターンと伝統的なインドの装飾
- **音楽と雰囲気** — 日本とインドの祭りのエネルギーの融合

## 私たちの祭りの伝統

20年以上にわたり、浜松祭りの祝典の一部となっています。インドと日本の料理の伝統を honor する特別な料理で、キッチンが活気づきます。

## 祝祭に参加

浜松祭りの時期に浜松にお越しの際は、クマールで文化の融合を体験してください。日本の最も偉大な祝祭の一つの祭りの雰囲気を感じながら、本格的なインド料理をお楽しみください。`,
    },
    image: "/images/blog/group-of-people-in-front-of-temple.webp",
    date: "2024-03-20",
    author: "Kumar Team",
    readingTime: 4,
    category: "culture",
  },
  {
    slug: "vegetarian-guide-hamamatsu",
    title: {
      en: "The Complete Vegetarian Guide to Kumar Restaurant",
      ja: "クマールレストランの完全ベジタリアンガイド",
    },
    excerpt: {
      en: "India has the world's richest vegetarian culinary tradition. Discover our extensive plant-based menu that satisfies every palate.",
      ja: "インドは世界で最も豊かなベジタリアン料理の伝統を持っています。すべての味覚を満たす広範なプラントベースメニューをご紹介。",
    },
    content: {
      en: `## Why Indian Cuisine is Perfect for Vegetarians

India has the highest percentage of vegetarians in the world. Our cuisine has evolved over centuries to create dishes that are as satisfying as any meat-based meal.

## Our Vegetarian Highlights

### Starters
- **Samosa** — Crispy pastry with spiced potato filling
- **Pakora** — Crispy vegetable fritters
- **Paneer Tikka** — Grilled cottage cheese with spices

### Main Courses
- **Chana Masala** — Chickpeas in rich tomato sauce
- **Palak Paneer** — Spinach curry with cottage cheese
- **Aloo Gobi** — Potatoes and cauliflower with turmeric
- **Dal Makhani** — Black lentils slow-cooked overnight
- **Malai Kofta** — Cheese dumplings in creamy sauce

### Breads
- **Plain Naan** — Fresh tandoor-baked bread
- **Garlic Naan** — Infused with fresh garlic
- **Aloo Paratha** — Stuffed potato flatbread

### Rice
- **Vegetable Biryani** — Fragrant rice with mixed vegetables
- **Jeera Rice** — Cumin-flavored basmati rice

## Vegan Options

Many of our vegetarian dishes can be prepared vegan upon request. Simply let our staff know your dietary preferences.

## Dietary Accommodations

We take dietary restrictions seriously. All our vegetarian dishes are prepared separately to avoid cross-contamination.`,
      ja: `## インド料理がベジタリアンに最適な理由

インドは世界でベジタリアンの割合が最も多い国です。何世紀にもわたる進化を遂げた料理は、肉料理と同等の満足感を提供します。

## ベジタリアンのハイライト

### スターター
- **サモサ** — スパイシーなじゃがいのフィリングのカリカリパストラ
- **パコラ** — カリカリの野菜フライター
- **パニールティカ** — スパイスでグリルしたリコッテージチーズ

### メインコース
- **チャナマサラ** — リッチなトマトソースのひよこ豆
- **パラクパニール** — リコッテージチーズのホウレン草カレー
- **アローゴビ** — ターメリック入りのじゃがいとカリフラワー
- **ダルマカニ** — 一晩じっくり煮込んだ黒レンズ豆
- **マライコフタ** — クリーミーソースのチーズ団子

### ブレッド
- **プレーンナーン** — タンドーリで焼きたてのパン
- **ガーリックナーン** — 生ガーリックを練り込んだナーン
- **アローパラータ** — じゃがいを詰めたフルートブレッド

### ライス
- **ベジタリアンビリヤニ** — 混合野菜の香り高いライス
- **ジーラライス** — キュミン風バスマティライス

## ヴィーガンオプション

多くのベジタリアン料理はご要望でヴィーガン仕上げも可能です。スタッフに食事制限をお伝えください。

## 食事制限への配慮

食事制限には最大限の配慮を払っています。すべてのベジタリアン料理は別途調理され、交叉汚染を防いでいます。`,
    },
    image: "/images/blog/a-variety-of-spices-on-a-white-table.webp",
    date: "2024-04-05",
    author: "Chef Kumar",
    readingTime: 5,
    category: "food",
  },
  {
    slug: "indian-wedding-planning",
    title: {
      en: "Planning Your Dream Indian Wedding in Hamamatsu",
      ja: "浜松で夢のインド式ウェディングを計画する",
    },
    excerpt: {
      en: "From mehndi ceremonies to grand receptions — let Kumar Restaurant help you plan every detail of your traditional Indian wedding celebration.",
      ja: "メヘンディ式から盛大なレセプションまで — クマールレストランが伝統的なインド式ウェディングのすべてのディテールをお手伝いします。",
    },
    content: {
      en: `## Your Wedding, Your Way

Planning a wedding is one of life's most exciting adventures. At Kumar Restaurant, we specialize in creating beautiful Indian wedding celebrations that honor tradition while reflecting your unique style.

## Our Wedding Services

### Catering
- Customized menus for 50-500+ guests
- Both vegetarian and non-vegetarian options
- Traditional Indian sweets and desserts
- Professional service staff

### Mehndi & Pre-Wedding Events
- Beautiful mehndi ceremony setups
- Sangeet night catering
- Haldi ceremony arrangements

### Reception Dinner
- Grand buffet or seated dinner options
- Indian fusion cuisine available
- Full beverage service

## Popular Wedding Menu Items

- **Butter Chicken** — A crowd favorite
- **Lamb Biryani** — Elegant and aromatic
- **Paneer Makhani** — Rich and creamy
- **Tandoori Platter** — A feast for the eyes
- **Gulab Jamun & Jalebi** — Sweet endings

## Why Choose Kumar for Your Wedding?

- 20+ years of wedding catering experience
- Flexible menu customization
- Beautiful presentation and serving
- Attentive, professional staff
- Two convenient locations in Hamamatsu

## Start Planning Today

Contact us to schedule a tasting session and discuss your wedding vision. We'll work with you to create a celebration as unique as your love story.`,
      ja: `## あなたのウェディング、あなたのスタイル

ウェディングの計画は人生で最もエキサイティングな冒険の一つです。クマールレストランでは、伝統を尊重しながらもユニークなスタイルを反映した美しいインド式ウェディングの創造を専門としています。

## 私たちのウェディングサービス

### ケータリング
- 50〜500名以上のゲストに対応するカスタマイズメニュー
- ベジタリアンと非ベジタリアンの両方のオプション
- 伝統的なインドのスイーツとデザート
- プロフェッショナルなサービススタッフ

### メヘンディ＆プレウェディングイベント
- 美しいメヘンディ式のセットアップ
- サンギートナイトのケータリング
- ハルディ式の手配

### レセプションディナー
- 大判ビュッフェまたは着席ディナーオプション
- インドフュージョン料理も可能
- 完全なビバレッジサービス

## 人気のウェディングメニュー

- **バターチキン** — ゲストに大人気
- **ラムビリヤニ** — エレガントで香り高い
- **パニールマカニ** — リッチでクリーミー
- **タンドーリプラッター** — 見るだけで満足
- **グラブジャムン＆ジャレビ** — 甘い締めくくり

## クマールを選ぶ理由

- 20年以上のウェディングケータリング経験
- 柔軟なメニューのカスタマイズ
- 美しいプレゼンテーションとサービス
- 丁寧でプロフェッショナルなスタッフ
- 浜松に2つの便利なロケーション

## 今日から計画を始めましょう

テイスティングセッションのスケジュールとウェディングビジョンについてご相談ください。あなたたちの愛の物語のようにユニークなお祝いを作り上げます。`,
    },
    image: "/images/blog/photo-of-pub-set-in-room-during-daytime.webp",
    date: "2024-05-10",
    author: "Kumar Team",
    readingTime: 6,
    category: "wedding",
  },
  {
    slug: "fresh-spices-secret",
    title: {
      en: "The Secret Behind Our Fresh Spices: A Guide to Indian Spice Mastery",
      ja: "新鮮なスパイスの秘密：インドスパイスマスターガイド",
    },
    excerpt: {
      en: "We grind our spices fresh every morning. Learn why fresh spices make all the difference and discover the key ingredients in Indian cooking.",
      ja: "毎朝スパイスを挽いています。なぜ新鮮なスパイスがすべてを変えるのか、インド料理の主要な食材をご紹介します。",
    },
    content: {
      en: `## Why Fresh Spices Matter

In Indian cooking, spices are everything. They provide not just flavor, but also color, aroma, and even health benefits. At Kumar Restaurant, we believe that pre-ground spices simply can't match the depth of freshly ground ones.

## Our Daily Spice Ritual

Every morning before opening, our kitchen team selects and grinds the day's spices. This daily ritual ensures:

- **Maximum flavor** — Volatile oils in spices begin to degrade immediately after grinding
- **Vibrant color** — Fresh turmeric provides a richer golden hue
- **Rich aroma** — The difference is noticeable from the moment you walk in

## Essential Indian Spices

### Cumin (ジーラ)
Earthy, warm, and slightly bitter. Used in almost every Indian dish.

### Turmeric (ターメリック)
Golden-hued and anti-inflammatory. The backbone of Indian cooking.

### Coriander (コリアンダー)
Citrusy and floral. Works beautifully with cumin.

### Cardamom (カルダモン)
Sweet and aromatic. Used in both savory dishes and desserts.

### Cloves (クローブ)
Intense and warming. A little goes a long way.

### Garam Masala (ガラムマサラ)
Our signature blend of warming spices, unique to Kumar Restaurant.

## The Kumar Difference

While many restaurants use pre-packaged spice blends, we create our own garam masala and curry powders from scratch. Each blend is carefully balanced to create the perfect flavor profile for every dish.

## Health Benefits

Indian spices are not just about flavor — they're packed with health benefits:
- Turmeric is a powerful anti-inflammatory
- Cumin aids digestion
- Coriander is rich in antioxidants
- Cardamom helps with detoxification

## Taste the Difference

When you dine at Kumar, you taste the difference that fresh spices make. It's a commitment to quality that you can experience in every bite.`,
      ja: `## 新鮮なスパイスが大切な理由

インド料理において、スパイスはすべてです。風味だけでなく、色、香り、さらには健康効果も提供します。クマールレストランでは、挽いたてのスパイスの深みに匹敵するものはないと信じています。

## 毎日のスパイスの儀式

毎朝開店前、キッチンチームがその日のスパイスを選んで挽きます。この毎日の儀式が以下を確実にします：

- **最大限の風味** — スパイスの揮発性油は挽いた直後から劣化し始めます
- **鮮やかな色** — 新鮮なターメリックがより豊かな金色を提供
- **リッチな香り** — 入った瞬間から違いがわかります

## 主要なインドスパイス

### ジーラ
土のような、温かく、わずかに苦みのある味わい。ほぼすべてのインド料理で使用されています。

### ターメリック
金色で抗炎症作用あり。インド料理の背骨です。

### コリアンダー
柑橘系でフローラルな味わい。ジーラと美しい組み合わせを奏でます。

### カルダモン
甘く芳醇。.savory料理からデザートまで幅広く使用。

### クローブ
強烈で温かみのある風味。少量で十分効果を発揮します。

### ガラムマサラ
クマールレストラン独自の、温かみのあるスパイスのブレンド。

## クマールの違い

多くのレストランがパッケージ入りのスパイスブレンドを使用する中、私たちはガラムマサラやカレーパウダーを一から作っています。すべてのブレンドは、各料理の完璧な風味プロファイルのために慎重にバランスが取られています。

## 健康効果

インドスパイスは風味だけでなく、健康効果も満載です：
- ターメリックは強力な抗炎症作用
- ジーラは消化を助けます
- コリアンダーは抗酸化物質が豊富
- カルダモンはデトックスに効果的

## 違いを味わって

クマールでお食事の際、新鮮なスパイスが生み出す違いを味わってください。一口一口に感じいただける品質へのこだわりです。`,
    },
    image: "/images/food/india-indian-indian-food-1481500-1024x682.jpg",
    date: "2024-06-01",
    author: "Chef Kumar",
    readingTime: 5,
    category: "food",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find((post) => post.featured);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return blogPosts.slice(0, limit);
  return blogPosts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === current.category && b.category !== current.category)
        return -1;
      if (a.category !== current.category && b.category === current.category)
        return 1;
      return 0;
    })
    .slice(0, limit);
}
