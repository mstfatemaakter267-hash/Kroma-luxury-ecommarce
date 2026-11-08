import { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_luxe_living_1794158466677.jpg';
export const CATEGORY_APPAREL_IMAGE = '/src/assets/images/category_apparel_minimal_1794158469006.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Atelier Chronograph 01',
    tagline: 'Titanium automatic timepiece with Swiss movement',
    description: 'Precision-engineered from Grade 5 titanium with an anti-reflective sapphire crystal face. Crafted with a 40-hour power reserve Swiss automatic caliber, tactile knurled pushers, and a water-resistant charcoal nubuck leather strap. A timeless investment in pure functional beauty.',
    price: 890,
    originalPrice: 1050,
    category: 'watches',
    brand: 'Horos Atelier',
    rating: 4.9,
    reviewCount: 38,
    images: [
      '/src/assets/images/product_minimal_watch_1794158467476.jpg',
      '/src/assets/images/product_minimal_watch_1794158467476.jpg',
    ],
    inStock: true,
    stockCount: 14,
    colors: [
      { name: 'Matte Titanium', hex: '#4A4D52' },
      { name: 'Obsidian Black', hex: '#1C1D21' },
      { name: 'Brushed Silver', hex: '#CBD5E1' }
    ],
    specifications: {
      'Case Diameter': '41mm',
      'Case Material': 'Grade 5 Aerospace Titanium',
      'Movement': 'Automatic Caliber H-220 (28,800 vph)',
      'Crystal': 'Double-domed Sapphire with AR coating',
      'Water Resistance': '10 ATM (100 meters)',
      'Strap': 'Italian Nubuck leather with quick-release bars'
    },
    features: [
      '40-hour power reserve with bi-directional winding rotor',
      'Sub-dial chronograph registers with 1/5-second accuracy',
      'Super-LumiNova BGW9 luminous indices and hands',
      'Custom serialized exhibition caseback'
    ],
    isNew: false,
    isTrending: true,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-01',
        userName: 'Julian Vance',
        rating: 5,
        date: 'October 14, 2026',
        title: 'Masterclass in understated horology',
        comment: 'The weight of titanium on the wrist is surreal. The knurling on the chronograph pushers clicks with such mechanical certainty. Easily rivals timepieces twice this price.',
        verified: true
      },
      {
        id: 'rev-02',
        userName: 'Elena Rostova',
        rating: 5,
        date: 'September 28, 2026',
        title: 'Flawless everyday design',
        comment: 'Super clean dial, crisp typography, and the strap is butter-soft right out of the box. Arrived in a wooden presentation box with certificate of calibration.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-02',
    name: 'Sylvan Daypack & Weekender',
    tagline: 'Vegetable-tanned full-grain cognac leather travel bag',
    description: 'Constructed by master leather smiths in Tuscany using full-grain, vegetable-tanned leather that develops a distinctive golden-honey patina with age. Featuring hand-hammered solid brass hardware, a reinforced padded 16-inch laptop compartment, and an exterior passport stow pocket.',
    price: 640,
    originalPrice: 720,
    category: 'leather',
    brand: 'Aethel Leather',
    rating: 4.8,
    reviewCount: 52,
    images: [
      '/src/assets/images/product_leather_bag_1794158467710.jpg',
      '/src/assets/images/product_leather_bag_1794158467710.jpg'
    ],
    inStock: true,
    stockCount: 9,
    colors: [
      { name: 'Cognac Saddle', hex: '#9A5B2D' },
      { name: 'Espresso Brown', hex: '#3E2723' },
      { name: 'Pitch Black', hex: '#18181B' }
    ],
    specifications: {
      'Dimensions': '48cm x 30cm x 24cm (35L capacity)',
      'Weight': '1.85 kg',
      'Exterior': 'Full-grain Tuscan vegetable-tanned cowhide',
      'Lining': 'Water-resistant heavy Belgian cotton twill',
      'Hardware': 'Solid antiqued brass with YKK Excella zippers',
      'Origin': 'Handcrafted in Florence, Italy'
    },
    features: [
      'TSA-compliant carry-on dimensions for all international airlines',
      'Reinforced structured base with protective brass feet',
      'Removable ergonomic leather shoulder strap with shoulder pad',
      'Hidden luggage trolley sleeve on reverse panel'
    ],
    isNew: false,
    isTrending: true,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-03',
        userName: 'Marcus Sterling',
        rating: 5,
        date: 'October 2, 2026',
        title: 'Worth every single penny',
        comment: 'The scent of real Tuscan leather is unmistakable. It fits a 4-day trip wardrobe effortlessly and slips right into the overhead bin.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-03',
    name: 'Acoustic One Studio Headphones',
    tagline: 'Wireless planar magnetic studio reference monitors',
    description: 'Engineered for audio purists and sound architects. Bespoke 50mm beryllium-coated dynamic drivers deliver unmatched acoustic transparency, expansive spatial soundstaging, and linear sub-bass down to 10Hz. CNC-milled anodized aluminum earcups with magnetic lambskin cushions.',
    price: 520,
    category: 'audio',
    brand: 'Solis Audio',
    rating: 4.9,
    reviewCount: 64,
    images: [
      '/src/assets/images/product_audio_headphones_1794158468186.jpg',
      '/src/assets/images/product_audio_headphones_1794158468186.jpg'
    ],
    inStock: true,
    stockCount: 18,
    colors: [
      { name: 'Space Graphite', hex: '#374151' },
      { name: 'Silver Milled', hex: '#E2E8F0' },
      { name: 'Raw Sand', hex: '#D6C7B2' }
    ],
    specifications: {
      'Driver Type': '50mm Beryllium Dynamic Transducer',
      'Frequency Response': '10 Hz – 42,000 Hz',
      'Impedance': '32 Ohms (High-efficiency drive)',
      'Battery Life': '42 hours playback with ANC engaged',
      'Connectivity': 'Bluetooth 5.4 (LDAC, aptX Lossless) & 3.5mm passive',
      'Weight': '310 grams'
    },
    features: [
      'Hybrid active noise cancellation with 6 MEMS micro-beamforming mics',
      'Multipoint dual-device pairing with instant switching',
      'Tactile rotary crown for volume and transparency mix control',
      'Includes aluminum travel hardcase and braided silver-plated cable'
    ],
    isNew: true,
    isTrending: true,
    isBestSeller: false,
    reviews: [
      {
        id: 'rev-04',
        userName: 'Hannah Lindqvist',
        rating: 5,
        date: 'November 1, 2026',
        title: 'Studio monitor fidelity on the go',
        comment: 'I master audio recordings for independent film. These headphones reveal nuances and low-end harmonics that my previous desktop cans missed completely.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-04',
    name: 'Nordic Wave Chaise Lounge',
    tagline: 'Sculptural solid white oak frame with textured boucle upholstery',
    description: 'Designed as an organic study in architectural relaxation. Sweeping continuous steam-bent white oak contours support an ergonomically sculpted seat upholstered in tactile woven wool boucle. Built to anchor modern interiors with quiet warmth and sculptural gravitas.',
    price: 1850,
    originalPrice: 2100,
    category: 'furniture',
    brand: 'Artek Nord',
    rating: 5.0,
    reviewCount: 21,
    images: [
      '/src/assets/images/hero_luxe_living_1794158466677.jpg',
      '/src/assets/images/hero_luxe_living_1794158466677.jpg'
    ],
    inStock: true,
    stockCount: 5,
    colors: [
      { name: 'Natural Wool Cream', hex: '#F5F5F0' },
      { name: 'Smoked Charcoal', hex: '#262626' },
      { name: 'Oatmeal Taupe', hex: '#DDD0C0' }
    ],
    specifications: {
      'Dimensions': '165cm L x 68cm W x 74cm H',
      'Seat Height': '38cm',
      'Frame': 'FSC-Certified Solid European White Oak',
      'Upholstery': '85% New Zealand Wool, 15% Linen Bouclé',
      'Foam': 'Multi-density natural latex and recycled memory foam',
      'Finish': 'Low-VOC matte organic oil'
    },
    features: [
      'Hand-shaped steam-bent organic arch support',
      'Stain-resistant textile treatment that maintains natural breathability',
      'Concealed brass structural dowels for lifetime durability',
      'Crafted individually upon order by Danish artisans'
    ],
    isNew: false,
    isTrending: false,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-05',
        userName: 'David Chen',
        rating: 5,
        date: 'September 12, 2026',
        title: 'The centerpiece of our architectural home',
        comment: 'Photos cannot capture the warmth of the oak joinery. It cradles your lumbar curve perfectly for afternoon reading sessions.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-05',
    name: 'Merino Wool Atelier Overcoat',
    tagline: 'Double-faced virgin merino wool tailored minimalist coat',
    description: 'A benchmark in minimalist tailoring. Woven from 100% Australian virgin merino wool in a dense double-face construction that provides featherlight warmth without bulk. Features hand-stitched split lapels, horn buttons, and hidden seam pockets.',
    price: 490,
    category: 'apparel',
    brand: 'Kroma Studio',
    rating: 4.8,
    reviewCount: 29,
    images: [
      '/src/assets/images/category_apparel_minimal_1794158469006.jpg',
      '/src/assets/images/category_apparel_minimal_1794158469006.jpg'
    ],
    inStock: true,
    stockCount: 16,
    colors: [
      { name: 'Charcoal Melange', hex: '#374151' },
      { name: 'Raw Bone Ecru', hex: '#F3F0EA' },
      { name: 'Toffee Camel', hex: '#B8860B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    specifications: {
      'Material': '100% Double-Faced Virgin Merino Wool (650 g/m²)',
      'Lining': 'Unlined interior with bound silk-finish bias seams',
      'Buttons': 'Real buffalo horn from sustainable harvest',
      'Fit': 'Relaxed architectural drape, falls to mid-calf',
      'Care': 'Specialist dry clean only'
    },
    features: [
      'Naturally thermo-regulating and water-repellent wool weave',
      'Clean unconstructed shoulder with soft internal canvas stabilization',
      'Deep welted hand-warmer pockets lined in brushed cotton',
      'Internal secure passport and card pocket'
    ],
    isNew: true,
    isTrending: true,
    isBestSeller: false,
    reviews: [
      {
        id: 'rev-06',
        userName: 'Camilla Dupont',
        rating: 5,
        date: 'October 19, 2026',
        title: 'The holy grail of winter outerwear',
        comment: 'Drapes like a bespoke dream. The double-faced wool is extraordinarily soft and doesn’t catch lint. Will keep this for a decade.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-06',
    name: 'Solstice Ceramic Arc Vessel',
    tagline: 'Wheel-thrown stoneware vase with volcanic crater glaze',
    description: 'Each vessel is thrown on the potter’s wheel in small numbered batches using iron-rich stoneware clay. Coated in a custom mineral crater glaze that bubbles and crystallizes during high firing, producing a tactile surface reminiscent of lunar basalt.',
    price: 180,
    category: 'furniture',
    brand: 'Studio Valo',
    rating: 4.7,
    reviewCount: 19,
    images: [
      '/src/assets/images/hero_luxe_living_1794158466677.jpg',
      '/src/assets/images/hero_luxe_living_1794158466677.jpg'
    ],
    inStock: true,
    stockCount: 8,
    colors: [
      { name: 'Volcanic Basalt', hex: '#2B2B2B' },
      { name: 'Chalk White', hex: '#EBEAE5' }
    ],
    specifications: {
      'Height': '32cm',
      'Diameter': '22cm at widest point',
      'Clay': 'Iron-bearing coarse stoneware',
      'Glaze': 'Matte feldspathic crater formulation',
      'Waterproof': '100% Vitrified watertight interior'
    },
    features: [
      'Individually numbered by the artisan on unglazed base',
      'Holds large floral arrangements or stands as an autonomous sculpture',
      'Padded cork foot base prevents scratching furniture surfaces'
    ],
    isNew: false,
    isTrending: false,
    isBestSeller: false
  },
  {
    id: 'prod-07',
    name: 'Kroma Minimalist Cardfold',
    tagline: 'Full-grain French calfskin ultra-slim wallet',
    description: 'Precision-stitched edge-to-edge with Japanese waxed polycord. Holds up to 8 credit cards and folded banknotes while remaining under 6mm thin in your pocket. Features RFID shielding layer woven between leather plies.',
    price: 110,
    originalPrice: 135,
    category: 'leather',
    brand: 'Aethel Leather',
    rating: 4.9,
    reviewCount: 44,
    images: [
      '/src/assets/images/product_leather_bag_1794158467710.jpg',
      '/src/assets/images/product_leather_bag_1794158467710.jpg'
    ],
    inStock: true,
    stockCount: 25,
    colors: [
      { name: 'Cognac', hex: '#9A5B2D' },
      { name: 'Dark Slate', hex: '#1E293B' },
      { name: 'Forest Green', hex: '#143825' }
    ],
    specifications: {
      'Dimensions': '10cm x 7.2cm x 0.5cm',
      'Leather': 'French vegetable-tanned Box calfskin',
      'Capacity': '6-8 cards + currency slot',
      'Edge Finish': 'Hand-burnished with natural beeswax'
    },
    features: [
      'Built-in ultra-thin RFID blocking lining for security',
      'Quick-access front thumb slot for primary transit/payment card',
      'Delivered in embossed foil gift box with cotton dust pouch'
    ],
    isNew: false,
    isTrending: false,
    isBestSeller: true
  },
  {
    id: 'prod-08',
    name: 'Kyoto Automatic GMT Watch',
    tagline: 'Dual-time traveler mechanical timepiece with ceramic bezel',
    description: 'Built for globetrotters and design minimalists. Features a 24-click bi-directional ceramic bezel, independent quick-set 24-hour GMT hand, and 200m water resistance. Finished with a solid link H-bracelet with micro-adjust clasp.',
    price: 1150,
    originalPrice: 1300,
    category: 'watches',
    brand: 'Horos Atelier',
    rating: 4.9,
    reviewCount: 31,
    images: [
      '/src/assets/images/product_minimal_watch_1794158467476.jpg',
      '/src/assets/images/product_minimal_watch_1794158467476.jpg'
    ],
    inStock: true,
    stockCount: 7,
    colors: [
      { name: 'Phantom Black', hex: '#0F172A' },
      { name: 'Midnight Navy', hex: '#1E3A8A' }
    ],
    specifications: {
      'Case Diameter': '40mm',
      'Thickness': '12.2mm',
      'Movement': 'Miyota 9075 True Flyer GMT (28,800 vph)',
      'Bezel': 'Polished Zirconia Ceramic 24-Hour',
      'Bracelet': '316L Stainless Steel with solid endlinks'
    },
    features: [
      'Independent jumping local hour hand for effortless timezone changes',
      'Sapphire crystal with triple inner anti-reflective coatings',
      'Micro-adjusting on-the-fly diver extension clasp'
    ],
    isNew: true,
    isTrending: false,
    isBestSeller: false
  },
  {
    id: 'prod-09',
    name: 'Alabaster Linear Table Lamp',
    tagline: 'Carved Spanish alabaster cylinder with warm dimmable LED',
    description: 'Carved from a solid block of translucent Spanish alabaster stone. When illuminated, the organic mineral veining glows with a calm golden luminescence that transforms any credenza, bedside, or study desk.',
    price: 360,
    category: 'furniture',
    brand: 'Studio Valo',
    rating: 4.8,
    reviewCount: 15,
    images: [
      '/src/assets/images/hero_luxe_living_1794158466677.jpg',
      '/src/assets/images/hero_luxe_living_1794158466677.jpg'
    ],
    inStock: true,
    stockCount: 11,
    colors: [
      { name: 'Warm Alabaster', hex: '#F5EBE1' },
      { name: 'Veined Smoke', hex: '#D1C7BD' }
    ],
    specifications: {
      'Dimensions': '14cm Diameter x 28cm Height',
      'Material': 'Genuine Aragon Alabaster & Solid Brushed Brass',
      'Light Source': 'Integrated 2200K-3000K Warm Dim LED (800 lumens)',
      'Switch': 'Touch-sensitive rotary brass knob with continuous dimming',
      'Cord': '2-meter braided linen cord'
    },
    features: [
      'Unique mineral veining makes every single piece one-of-a-kind',
      'Zero-flicker dimming driver for restful ambient light',
      'Heavy weighted brass base ensures stable stance'
    ],
    isNew: true,
    isTrending: false,
    isBestSeller: false
  },
  {
    id: 'prod-10',
    name: 'Pure Heavyweight Linen Shirt',
    tagline: 'Pre-washed French flax linen relaxed leisure shirt',
    description: 'Crafted from premium 190 g/m² Normandy flax linen that has been garment-washed for a soft broken-in hand. Designed with a clean camp collar, mother-of-pearl buttons, and relaxed straight hem with side vents.',
    price: 165,
    category: 'apparel',
    brand: 'Kroma Studio',
    rating: 4.7,
    reviewCount: 37,
    images: [
      '/src/assets/images/category_apparel_minimal_1794158469006.jpg',
      '/src/assets/images/category_apparel_minimal_1794158469006.jpg'
    ],
    inStock: true,
    stockCount: 22,
    colors: [
      { name: 'Crisp Chalk', hex: '#FFFFFF' },
      { name: 'Sand Khaki', hex: '#D2B48C' },
      { name: 'Slate Indigo', hex: '#3B4D61' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    specifications: {
      'Fabric': '100% Certified French Normandy Flax (190 gsm)',
      'Buttons': 'Genuine Australian Mother-of-Pearl',
      'Collar': 'Convertible camp collar with loop closure',
      'Wash': 'Pre-shrunk enzyme stone washed'
    },
    features: [
      'Highly breathable natural flax fiber wicks heat and moisture',
      'Reinforced gusseted side hem splits',
      'Drapes gracefully without clinging in warm weather'
    ],
    isNew: false,
    isTrending: false,
    isBestSeller: true
  },
  {
    id: 'prod-11',
    name: 'Solis Spatial Soundbar',
    tagline: 'Milled aluminum and walnut wireless sound system',
    description: 'Compact acoustic prowess for modern interiors. Powered by six discrete class-D amplifiers pushing neodymium drivers and dual passive bass radiators. Connects via AirPlay 2, Spotify Connect, and eARC HDMI.',
    price: 780,
    originalPrice: 890,
    category: 'audio',
    brand: 'Solis Audio',
    rating: 4.9,
    reviewCount: 41,
    images: [
      '/src/assets/images/product_audio_headphones_1794158468186.jpg',
      '/src/assets/images/product_audio_headphones_1794158468186.jpg'
    ],
    inStock: true,
    stockCount: 12,
    colors: [
      { name: 'Walnut & Silver', hex: '#5D4037' },
      { name: 'Smoked Oak & Black', hex: '#212121' }
    ],
    specifications: {
      'Power Output': '240 Watts Total Peak Output',
      'Amplification': '6x Class-D digital amplifiers',
      'Inputs': 'HDMI eARC, Optical Toslink, Wi-Fi 6, Bluetooth 5.3',
      'Dimensions': '75cm W x 8.5cm H x 11cm D'
    },
    features: [
      'Room-sensing acoustic calibration with built-in mic array',
      'Dolby Atmos spatial audio rendering',
      'Machined touch controls with proximity backlight detection'
    ],
    isNew: false,
    isTrending: true,
    isBestSeller: false
  },
  {
    id: 'prod-12',
    name: 'Aethel Bridle Leather Belt',
    tagline: 'English bridle leather with hand-forged brass buckle',
    description: 'Constructed from heavy 10-12oz full-grain English bridle leather steeped in tallows and waxes. Hand-beveled and burnished edges paired with a solid sand-cast brass buckle. Designed to outlast generations.',
    price: 95,
    category: 'leather',
    brand: 'Aethel Leather',
    rating: 4.9,
    reviewCount: 28,
    images: [
      '/src/assets/images/product_leather_bag_1794158467710.jpg',
      '/src/assets/images/product_leather_bag_1794158467710.jpg'
    ],
    inStock: true,
    stockCount: 19,
    colors: [
      { name: 'London Tan', hex: '#A0522D' },
      { name: 'Havana Dark Brown', hex: '#3B2219' },
      { name: 'Black Bridle', hex: '#1C1917' }
    ],
    sizes: ['30', '32', '34', '36', '38'],
    specifications: {
      'Width': '35mm (1.38 inches)',
      'Leather': 'Full-grain English Bridle Cowhide (4.5mm thick)',
      'Buckle': 'Sand-cast solid brass with natural patina finish',
      'Fastening': 'Solid brass Chicago screw posts'
    },
    features: [
      'Hand-waxed burnished edges with vegetable carnauba',
      'Tallow-stuffed leather softens gracefully without cracking',
      'Teardrop sizing holes for seamless buckling'
    ],
    isNew: false,
    isTrending: false,
    isBestSeller: false
  }
];

export const CATEGORIES = [
  {
    id: 'all',
    name: 'All Curations',
    count: 12,
    description: 'Our full portfolio of architectural design objects and luxury wares.'
  },
  {
    id: 'furniture',
    name: 'Furniture & Living',
    count: 3,
    description: 'Sculptural seating, warm lighting, and artisanal ceramics.'
  },
  {
    id: 'watches',
    name: 'Timepieces',
    count: 2,
    description: 'Precision Swiss and Japanese mechanical horology.'
  },
  {
    id: 'leather',
    name: 'Leather Goods',
    count: 3,
    description: 'Vegetable-tanned Tuscan weekenders, cardfolds, and belts.'
  },
  {
    id: 'audio',
    name: 'Audio & Acoustics',
    count: 2,
    description: 'Planar magnetic studio monitors and spatial sound architecture.'
  },
  {
    id: 'apparel',
    name: 'Atelier Apparel',
    count: 2,
    description: 'Double-faced virgin wool outerwear and Normandy flax linen.'
  }
];

export const BRANDS = [
  'Horos Atelier',
  'Aethel Leather',
  'Solis Audio',
  'Artek Nord',
  'Kroma Studio',
  'Studio Valo'
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    quote: 'The Atelier Chronograph is an absolute marvel. In an era of disposable digital gadgets, having a mechanical instrument crafted from titanium brings genuine everyday joy.',
    name: 'Marcus Sterling',
    role: 'Architectural Director',
    location: 'Copenhagen',
    product: 'Atelier Chronograph 01'
  },
  {
    id: 't-2',
    quote: 'The leather patina on my Sylvan Weekender after six months of travel across Milan and Tokyo is breathtaking. You can immediately feel the weight of genuine craftsmanship.',
    name: 'Dr. Soraya Hadad',
    role: 'Design Curator & Critic',
    location: 'London',
    product: 'Sylvan Daypack & Weekender'
  },
  {
    id: 't-3',
    quote: 'The Acoustic One headphones have replaced my studio monitors for late-night master evaluation. Unflinching clarity without fatigue.',
    name: 'Julian Vance',
    role: 'Music Producer & Sound Designer',
    location: 'Stockholm',
    product: 'Acoustic One Studio Headphones'
  }
];
