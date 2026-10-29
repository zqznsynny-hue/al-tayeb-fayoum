export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  category: 'platters' | 'grills' | 'tagines' | 'appetizers' | 'desserts' | 'drinks';
  price: number;
  description: string;
  descriptionEn: string;
  image?: string;
  images?: string[]; // Up to 10 images per dish
  tag?: string;
  serves?: string;
  weightOptions?: { label: string; price: number }[];
  isPopular?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  authorBadge: string;
  authorBadgeEn: string;
  reviewCount: number;
  photoCount: number;
  rating: number;
  timeAgo: string;
  timeAgoEn: string;
  comment: string;
  commentEn: string;
  tags: string[];
  likes: number;
  avatarColor: string;
}

export const RESTAURANT_INFO = {
  name: 'مطعم الطيب',
  nameEn: 'El-Tayeb Restaurant',
  tagline: 'أصل المشويات والطواجن المصرية في قلب الفيوم',
  taglineEn: 'Authentic Egyptian Grills & Clay Tagines in Fayoum',
  rating: 4.1,
  reviewCount: 341,
  priceRange: '200–1,000 ج.م',
  priceRangeEn: '200–1,000 EGP',
  priceRangeNote: 'للشخص الواحد (بحسب 58 شخصاً)',
  priceRangeNoteEn: 'Per person (based on 58 ratings)',
  category: 'مطعم مأكولات مصرية ومشويات',
  categoryEn: 'Egyptian Cuisine & Charcoal Grills',
  phone: '010 32555541',
  phoneClean: '201032555541',
  address: 'دله بجوار مستشفي الحياه، برج عزوز، شارع جمال عبد الناصر، قسم الفيوم، أول الفيوم، محافظة الفيوم',
  addressEn: 'Dalla, Next to Al-Hayah Hospital, Azzouz Tower, Gamal Abdel Nasser St, Fayoum',
  plusCode: '8VC5+R37',
  postalCode: '2934372',
  hoursDisplay: 'مفتوح يومياً · يغلق عند الساعة 3:00 ص',
  hoursDisplayEn: 'Open Daily · Closes at 3:00 AM',
  googleMapsUrl: 'https://maps.google.com/?q=8VC5%2BR37%20Fayoum%20Egypt',
  services: [
    { id: 'dine-in', name: 'الجلوس داخل المكان', nameEn: 'Dine-in' },
    { id: 'drive-thru', name: 'خدمة الطلب أثناء القيادة', nameEn: 'Drive-through / Takeout' },
    { id: 'contactless-delivery', name: 'التسليم بدون تلامس', nameEn: 'Contactless Delivery' },
    { id: 'vip-rooms', name: 'غرف خاصة VIP للمجموعات', nameEn: 'VIP Private Rooms' },
    { id: 'kids-area', name: 'صالة ألعاب للأطفال (الدور العلوي)', nameEn: 'Kids Play Zone (Upper Floor)' },
    { id: 'parking', name: 'سهولة ركن السيارات', nameEn: 'Easy Street Parking' },
  ],
  priceBreakdown: [
    { range: '1–200 ج.م', rangeEn: '1–200 EGP', percentage: 14, count: 8 },
    { range: '200–400 ج.م', rangeEn: '200–400 EGP', percentage: 46, count: 27 },
    { range: '400–600 ج.م', rangeEn: '400–600 EGP', percentage: 24, count: 14 },
    { range: '600–800 ج.م', rangeEn: '600–800 EGP', percentage: 10, count: 6 },
    { range: '800–1,000 ج.م', rangeEn: '800–1,000 EGP', percentage: 6, count: 3 },
  ],
  starBreakdown: [
    { stars: 5, percentage: 62 },
    { stars: 4, percentage: 18 },
    { stars: 3, percentage: 8 },
    { stars: 2, percentage: 4 },
    { stars: 1, percentage: 8 },
  ],
  peakHoursThursday: [
    { time: '6ص', hour: 6, label: '6:00 AM', busyLevel: 0 },
    { time: '9ص', hour: 9, label: '9:00 AM', busyLevel: 5 },
    { time: '12م', hour: 12, label: '12:00 PM', busyLevel: 25 },
    { time: '3م', hour: 15, label: '3:00 PM', busyLevel: 65 },
    { time: '6م', hour: 18, label: '6:00 PM', busyLevel: 80 },
    { time: '9م', hour: 21, label: '9:00 PM', busyLevel: 98, isPeak: true },
    { time: '12ص', hour: 0, label: '12:00 AM', busyLevel: 60 },
    { time: '2ص', hour: 2, label: '2:00 AM', busyLevel: 25 },
  ],
  nearbyPlaces: [
    { name: 'مطعم الطيب لفواكه اللحوم', rating: 4.0, reviews: 25, type: 'مطعم' },
    { name: 'محل الطيب', rating: 3.3, reviews: 4, type: 'متجر بقالة' },
    { name: 'مطعم كبابجي صبري العيسوي', rating: 4.2, reviews: 185, type: 'لحوم مشوية' },
    { name: 'مطعم الصعيدي', rating: 3.7, reviews: 6, type: 'مطعم' },
    { name: 'مطعم مشويات', rating: 4.9, reviews: 7, type: 'لحوم مشوية' },
  ],
};

export const MENU_ITEMS: MenuItem[] = [
  // Platters (صواني الطيب الملكية)
  {
    id: 'tray-tayeb-vip',
    name: 'صينية الطيب VIP الملكية',
    nameEn: 'El-Tayeb VIP Royal Platter',
    category: 'platters',
    price: 1450,
    serves: 'تكفي 5-6 أفراد',
    description: 'كباب بتلو، ريش ضاني متبلة، كفتة مشوية، شيش طاووق، 2 فرد حمام محشي فريك، ممبار محمر، ورق عنب، مع سيرفيس أرز بسمتي بالخلطة والمكسرات المحمصة وشوربة كوارع وسلطات كاملة.',
    descriptionEn: 'Tender veal kebab, seasoned lamb chops, charcoal kofta, shish tawook, 2 stuffed pigeons with freekeh, golden mombar, vine leaves, served over saffron basmati rice with toasted nuts and house salads.',
    image: '/src/assets/images/tayeb_royal_platter_1793274352250.jpg',
    tag: 'الأكثر طلباً للعائلات',
    isPopular: true,
  },
  {
    id: 'tray-saada',
    name: 'صينية السعادة العائلية',
    nameEn: 'Al-Saada Family Feast Tray',
    category: 'platters',
    price: 980,
    serves: 'تكفي 3-4 أفراد',
    description: 'نصف كفتة بلدي مشوية، ربع كباب، دجاجة مشوية على الفحم متبلة، طرب بلدي، ورق عنب، أرز بالخلطة، بطاطس محمرة، صوصات وطحينة وعيش بلدي ساخن.',
    descriptionEn: 'Half kg baladi kofta, 250g grilled kebab, whole charcoal chicken, grilled tarb, vine leaves, spiced rice, fries, tahini dip and fresh baladi bread.',
    image: '/src/assets/images/hero_el_tayeb_grills_1793274349815.jpg',
    tag: 'عرض خاص',
    isPopular: true,
  },
  {
    id: 'tray-molook',
    name: 'صينية الملوك مع الحمام المحشي',
    nameEn: 'Kings Platter with Stuffed Pigeon',
    category: 'platters',
    price: 1250,
    serves: 'تكفي 4 أفراد',
    description: '4 فرد حمام بلدي محشي أرز أو فريك ومحمر بالسمن البلدي، نصف كيلو مشويات مشكلة (كفتة وكباب)، طبق ممبار كبير، أرز مكسرات، شوربة لسان عصفور.',
    descriptionEn: '4 Egyptian baladi stuffed pigeons, 500g mix grills, large plate of Egyptian mombar, saffron rice with nuts, orzo soup.',
    image: '/src/assets/images/tayeb_royal_platter_1793274352250.jpg',
    tag: 'VIP مميز',
  },

  // Grills (مشويات الفحم)
  {
    id: 'grill-lamb-chops',
    name: 'ريش ضاني بلدي على الفحم',
    nameEn: 'Baladi Charcoal Lamb Chops',
    category: 'grills',
    price: 490,
    description: 'ريش ضاني بلدي طازجة بتتبيلة الطيب الخاصة المشوية على الفحم، تقدم مع بصل وطماطم مشوية وأرز وسلطة خضراء وطحينة.',
    descriptionEn: 'Fresh succulent lamb chops marinated in El-Tayeb secret spices and char-grilled to perfection, served with roasted veggies, rice and dips.',
    image: '/src/assets/images/hero_el_tayeb_grills_1793274349815.jpg',
    tag: 'موصى به في التقييمات',
    weightOptions: [
      { label: 'نصف كيلو', price: 490 },
      { label: 'كيلو كامل', price: 950 },
    ],
    isPopular: true,
  },
  {
    id: 'grill-kebab-kofta',
    name: 'مشكل كباب وكفتة بلدي',
    nameEn: 'Mixed Veal Kebab & Baladi Kofta',
    category: 'grills',
    price: 420,
    description: 'مزيج فاخر من قطع الكباب البتلو الناعمة وأسياخ الكفتة المشوية بدهن اللية الضاني الطازج وعصير البصل، مع خبز بلدي وطحينة.',
    descriptionEn: 'Prime tender veal kebab skewers combined with spiced baladi kofta on direct charcoal, served with fresh bread and sesame tahini.',
    image: '/src/assets/images/hero_el_tayeb_grills_1793274349815.jpg',
    weightOptions: [
      { label: 'نصف كيلو', price: 420 },
      { label: 'كيلو كامل', price: 820 },
    ],
    isPopular: true,
  },
  {
    id: 'grill-tarb',
    name: 'طرب الطيب المشوي ع الفحم',
    nameEn: 'Egyptian Char-Grilled Tarb',
    category: 'grills',
    price: 390,
    description: 'كفتة لحم بلدي متبلة ملفوفة بمنديل الضاني المقرمش والمشوية حتى تذوب في الفم، نكهة مصرية أصيلة لا تُقاوم.',
    descriptionEn: 'Spiced minced meat skewers wrapped in delicate lamb caul fat and slowly grilled until crisp on the outside and tender inside.',
    weightOptions: [
      { label: 'نصف كيلو', price: 390 },
      { label: 'كيلو كامل', price: 760 },
    ],
  },
  {
    id: 'grill-charcoal-chicken',
    name: 'فراخ مشوية على الفحم (كاملة)',
    nameEn: 'Full Charcoal Grilled Chicken',
    category: 'grills',
    price: 260,
    description: 'دجاجة طازجة متبلة بالليمون والبهارات الشرقية وماء البصل، مشوية على الفحم الهادئ، تقدم مع أرز وبطاطس وطومية.',
    descriptionEn: 'Whole tender marinated chicken grilled over slow charcoal coals, served with aromatic rice, french fries, and garlic dip.',
  },
  {
    id: 'grill-stuffed-pigeon',
    name: 'زوج حمام بلدي محشي فريك أو أرز',
    nameEn: 'Pair of Stuffed Baladi Pigeons',
    category: 'grills',
    price: 290,
    description: 'حمام برجي بلدي طازج محشي بالخلطة الشرقية أو الفريك الصعيدي المحمص بالسمنة البلدي، مقلي ومحمر ذهبي.',
    descriptionEn: 'Pair of tender Egyptian pigeons stuffed with spiced rice or roasted Upper Egyptian green freekeh, crisped in clarified ghee.',
    isPopular: true,
  },

  // Tagines (طواجن فخار الطيب)
  {
    id: 'tagine-akkawi',
    name: 'طاجن عكاوي بالبصل القاورمة والفلفل',
    nameEn: 'Authentic Oxtail Tagine with Shallots',
    category: 'tagines',
    price: 360,
    description: 'عكاوي بتلو بلدي دايبة في صوص البصل المكرمل وجوزة الطيب والمستكة داخل طاجن فخار مسقى في الفرن حتى يكتسب وجه محمر شهي.',
    descriptionEn: 'Slow-braised tender oxtail nestled in caramelized sweet shallots and aromatic spices in a clay earthenware pot baked to perfection.',
    image: '/src/assets/images/egyptian_tagine_clay_pot_1793274350775.jpg',
    tag: 'اختصاص الشيف',
    isPopular: true,
  },
  {
    id: 'tagine-bamya-lamb',
    name: 'طاجن بامية باللحم الضاني البلدي',
    nameEn: 'Okra & Tender Lamb Clay Tagine',
    category: 'tagines',
    price: 320,
    description: 'بامية خضراء بلدي طازجة مع قطع اللحم الضاني الطرية وصلصة الطماطم الغنية بالثوم والكزبرة ولمسة الليمون البلدي.',
    descriptionEn: 'Fresh young green okra simmered with succulent lamb cuts in rich garlic-coriander tomato sauce in glazed pottery.',
    image: '/src/assets/images/egyptian_tagine_clay_pot_1793274350775.jpg',
    isPopular: true,
  },
  {
    id: 'tagine-kawaree-grape-leaves',
    name: 'طاجن كوارع مخلية بورق العنب',
    nameEn: 'Boneless Trotters with Stuffed Vine Leaves',
    category: 'tagines',
    price: 340,
    description: 'كوارع بلدي مسلوقة ومخلية تماماً متوجة بأصابع ورق العنب المتبل بدبس الرمان ودقة الثوم والخل.',
    descriptionEn: 'Tender deboned Egyptian beef trotters layered with spiced Egyptian stuffed grape leaves baked in rich broth.',
  },
  {
    id: 'tagine-moussaka',
    name: 'طاجن مسقعة باللحمة المفرومة والموتزاريلا',
    nameEn: 'Egyptian Moussaka with Minced Beef',
    category: 'tagines',
    price: 210,
    description: 'طبقات الباذنجان الرومي والفلفل الحلو مع اللحم البقري المفروم المتبل وصلصة الطماطم وجبنة محمرة في الفرن.',
    descriptionEn: 'Layers of roasted eggplant and sweet peppers baked with spiced minced beef and light golden cheese crust.',
  },

  // Appetizers & Soups & Mahshi (محاشي ومقبلات وشورب)
  {
    id: 'app-mombar',
    name: 'طبق ممبار بلدي محمر مقرمش',
    nameEn: 'Crispy Egyptian Golden Mombar',
    category: 'appetizers',
    price: 160,
    description: 'ممبار بقري بلدي محشي بخلطة الأرز بالخضرة الطازجة والبهارات، محمر حتى يصبح مقرمشاً من الخارج ودايب من الداخل.',
    descriptionEn: 'Egyptian beef sausage casing stuffed with herbed spiced rice, deep-fried to a golden crunch.',
  },
  {
    id: 'app-grape-leaves',
    name: 'سرفيس محشي ورق عنب بالليمون',
    nameEn: 'Stuffed Vine Leaves with Lemon & Olive Oil',
    category: 'appetizers',
    price: 130,
    description: 'أصابع ورق عنب بناتي ناعم محشوة بخلطة الطيب السرية مع شرائح الليمون ودبس الرمان.',
    descriptionEn: 'Tender grape leaves rolled with fragrant herbed Egyptian rice, garlic, lemon wedges and pomegranate molasses.',
  },
  {
    id: 'app-molokhia',
    name: 'طاجن ملوخية خضراء بالطشة البلدي',
    nameEn: 'Egyptian Green Molokhia with Garlic Tasha',
    category: 'appetizers',
    price: 95,
    description: 'ملوخية خضراء مفرومة طازجة بشوربة الفراخ الدسمة وطشة الثوم والكزبرة الناشفة بالسمنة البلدي الفلاحي.',
    descriptionEn: 'Authentic fresh minced green molokhia jute leaves cooked in rich broth and sizzling garlic-coriander clarified butter.',
    isPopular: true,
  },
  {
    id: 'app-kawaree-soup',
    name: 'شوربة كوارع مخلية بالليمون والثوم',
    nameEn: 'Deboned Trotters Rich Broth Soup',
    category: 'appetizers',
    price: 150,
    description: 'شوربة غنية بالجيلاتين والليمون وقطع الكوارع المخلية تماماً مع توابل المستكة والحبهان.',
    descriptionEn: 'Collagen-rich broth with tender deboned trotters, simmered with cardamom, mastic, and fresh lime.',
  },
  {
    id: 'app-orzo-soup',
    name: 'شوربة لسان عصفور بلدي',
    nameEn: 'Egyptian Orzo Soup',
    category: 'appetizers',
    price: 60,
    description: 'مكرونة لسان عصفور محمرة في السمنة البلدي ومطبوخة في مرقة لحم الطيب الصافية.',
    descriptionEn: 'Roasted orzo pasta cooked in rich clarified beef broth with a squeeze of fresh lemon.',
  },
  {
    id: 'app-dips-trio',
    name: 'تشكيلة مقبلات الطيب (طحينة، بابا غنوج، تومية)',
    nameEn: 'Trio of Dips (Tahini, Baba Ghanoush, Toum)',
    category: 'appetizers',
    price: 85,
    description: 'طحينة سمسم صافية، بابا غنوج مشوي ع الحطب، ثومية كريمية ومخلل مشكل بلدي وعيش ساخن.',
    descriptionEn: 'Pure sesame tahini, charcoal-smoked eggplant dip, creamy garlic dip and Egyptian baladi pickles with warm flatbread.',
  },

  // Desserts & Drinks (حلويات ومشروبات)
  {
    id: 'des-om-ali',
    name: 'طاجن أم علي بالمكسرات والقشطة البلدي',
    nameEn: 'Om Ali with Nuts & Clotted Cream',
    category: 'desserts',
    price: 110,
    description: 'رقائق الميل فوي الهشة مسقية بالحليب المكثف والمكسرات (فستق وبندق ولوز) ومغطاة بطبقة غنية من القشطة الفلاحي.',
    descriptionEn: 'Traditional Egyptian bread pudding baked with sweetened hot milk, raisins, pistachio, hazelnuts, and clotted cream.',
    isPopular: true,
  },
  {
    id: 'des-rice-milk',
    name: 'طاجن أرز باللبن فرن بالمسكة والكراميل',
    nameEn: 'Baked Rice Pudding with Mastic & Caramel',
    category: 'desserts',
    price: 85,
    description: 'أرز باللبن كريمي مطبوخ بالحليب الطبيعي البلدي ووجه محمر مكرمل في الفرن مع رشة مكسرات.',
    descriptionEn: 'Creamy slow-cooked whole-milk rice pudding broiled with a caramelized crust and toasted almonds.',
  },
  {
    id: 'drk-mango-fresh',
    name: 'عصير مانجو فريش طبيعي',
    nameEn: 'Fresh Natural Mango Juice',
    category: 'drinks',
    price: 65,
    description: 'مانجو طبيعية 100% بدون إضافات، مثلجة ومنعشة.',
    descriptionEn: 'Pure 100% chilled natural Egyptian mango pulp.',
  },
  {
    id: 'drk-lemon-mint',
    name: 'ليموناضة بالنعناع الأخضر الفريش',
    nameEn: 'Fresh Lemon Mint Cooler',
    category: 'drinks',
    price: 55,
    description: 'ليمون بلدي مع أوراق النعناع الطازجة والثلج المجروش.',
    descriptionEn: 'Zesty Egyptian limes crushed with fresh spearmint and shaved ice.',
  },
  {
    id: 'drk-charcoal-tea',
    name: 'براد شاي زردة على الفحم بالنعناع',
    nameEn: 'Charcoal Brewed Tea Pot with Mint',
    category: 'drinks',
    price: 45,
    description: 'شاي صعيدي مغلي على رماد الفحم برائحة الحطب مع أعواد النعناع الأخضر.',
    descriptionEn: 'Traditional tea pot brewed slowly over hot wood coals with fresh garden mint.',
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-ziad',
    author: 'زياد زيدان',
    authorBadge: 'مرشد محلي · 42 مراجعة · 186 صورة',
    authorBadgeEn: 'Local Guide · 42 reviews · 186 photos',
    reviewCount: 42,
    photoCount: 186,
    rating: 4,
    timeAgo: 'قبل 4 أشهر',
    timeAgoEn: '4 months ago',
    comment: 'مطعم الطيب مكان كويس ومميز بالنسبه لمطاعم الفيوم المشكله الوحيده هو التاخير في تجهيز الطلب ، يوجد صالات ممتازة والدور العلوي به مكان للعب الاطفال الاسعار مرتفعه الي حدا ما بالنسبه الي أسعاره القديمه، الاغاني بتشتغل بصوت عالي ومزعج ، ومن المفترض الا تفرض علي العميل الاستماع الي الاغاني الصاخبه .وشكرا',
    commentEn: 'El-Tayeb is a good and distinguished spot among Fayoum restaurants. The only issue is some wait time for preparation. There are excellent dining halls, and the upper floor has a play area for kids. Prices are slightly higher than before. Overall a great family destination.',
    tags: ['المكان', 'الاطفال', 'تجربة'],
    likes: 3,
    avatarColor: 'bg-amber-600',
  },
  {
    id: 'rev-milano',
    author: 'Translation Milano',
    authorBadge: 'مرشد محلي · 28 مراجعة · 26 صورة',
    authorBadgeEn: 'Local Guide · 28 reviews · 26 photos',
    reviewCount: 28,
    photoCount: 26,
    rating: 4,
    timeAgo: 'قبل 3 أشهر',
    timeAgoEn: '3 months ago',
    comment: 'مطعم الطيب فى المجمل جيد جدا. بعض الاحيان يتم غلق الصاله الداخليه فيصبح المطعم صغير، المنطقه جيده وسهل وجود مكان لركن السيارة بجوار برج عزوز ومستشفى الحياة.',
    commentEn: 'In summary, El-Tayeb is very good. Sometimes the inner hall is reserved so seating is cozy. The location is convenient and street parking near Azzouz Tower and Al-Hayah Hospital is very easy.',
    tags: ['تجربة', 'المكان'],
    likes: 5,
    avatarColor: 'bg-emerald-600',
  },
  {
    id: 'rev-fadel',
    author: 'فاضل fadel',
    authorBadge: 'مرشد محلي · 1,055 مراجعة · 2,268 صورة',
    authorBadgeEn: 'Local Guide · 1,055 reviews · 2,268 photos',
    reviewCount: 1055,
    photoCount: 2268,
    rating: 5,
    timeAgo: 'قبل سنة (مُعدّل)',
    timeAgoEn: '1 year ago (edited)',
    comment: 'مطعم الطيب يقع في محافظة الفيوم - مصر ، من اجمل المطاعم نكهة اكل ومكان راقي ، يوجد لديهم قاعة العاب للأطفال موظفين استقبال ، لديهم غرف خاصة VIP تنفع للمجموعات ، ولديهم قاعة تنفع لغداء عمل ، بالنسبة للأكل انا جربت لديهم ريش و كباب لحم وممبار وكان من أروع ما تذوقت.',
    commentEn: 'El-Tayeb in Fayoum is one of the finest spots for authentic taste and upscale atmosphere. They have a dedicated kids play zone with staff, VIP private rooms suitable for large family groups and business lunches. Regarding food, I tried their lamb chops, veal kebab, and mombar—truly exceptional.',
    tags: ['تجربة', 'إدارة', 'المكان', 'الاطفال'],
    likes: 9,
    avatarColor: 'bg-blue-600',
  },
  {
    id: 'rev-ahmed',
    author: 'م. أحمد الشيمي',
    authorBadge: 'زائر دائم · 18 مراجعة',
    authorBadgeEn: 'Frequent Visitor · 18 reviews',
    reviewCount: 18,
    photoCount: 12,
    rating: 5,
    timeAgo: 'قبل أسبوعين',
    timeAgoEn: '2 weeks ago',
    comment: 'صواني الطيب لا يُعلى عليها في الفيوم! صينية السعادة كفت المشوار مع الصحاب والريش دايبة دوب. الصالة مريحة جداً والخدمة سريعة في أيام الأسبوع العادية.',
    commentEn: 'El-Tayeb platters are unbeatable in Fayoum! Al-Saada tray was abundant and the chops melted in your mouth. Dining hall is very comfortable and service is swift on weekdays.',
    tags: ['تجربة', 'المكان'],
    likes: 4,
    avatarColor: 'bg-rose-600',
  },
  {
    id: 'rev-nour',
    author: 'سارة نور الدين',
    authorBadge: 'مرشد محلي · 15 مراجعة',
    authorBadgeEn: 'Local Guide · 15 reviews',
    reviewCount: 15,
    photoCount: 8,
    rating: 4,
    timeAgo: 'قبل شهر',
    timeAgoEn: '1 month ago',
    comment: 'غرف الـ VIP مريحة جداً للعائلات اللي معاها أطفال علشان الدور العلوي فيه ملاهي وألعاب مسلية. طاجن العكاوي بالبصل حكاية تستحق التجربة.',
    commentEn: 'VIP private rooms are very convenient for families with kids because the upper floor has safe toys and entertainment. The oxtail tagine with shallots is an absolute must-try.',
    tags: ['الاطفال', 'إدارة'],
    likes: 2,
    avatarColor: 'bg-purple-600',
  },
];
