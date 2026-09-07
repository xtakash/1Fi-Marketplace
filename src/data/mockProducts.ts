import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'apple-iphone-17-pro',
    slug: 'iphone-17-pro',
    name: 'Apple iPhone 17 Pro',
    brand: 'Apple',
    category: 'smartphones',
    rating: 4.8,
    reviewsCount: 3840,
    inStock: true,
    featured: true,
    badge: 'NEW',
    basePrice: 127400,
    originalMrp: 134900,
    discountPercentage: 6,
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
    ],
    shortDesc: 'Titanium chassis, next-gen A19 Pro Bionic, 48MP triple fusion lenses, and 0% Mutual Fund backed EMI.',
    description: 'The revolutionary Apple iPhone 17 Pro features a Grade 5 forged titanium architecture, larger 6.3-inch Super Retina XDR ProMotion panel, and next-generation A19 Pro neural processing engine. Eligible for 1Fi Mutual Fund backed financing with zero down payment and up to ₹7,500 additional cashback.',
    highlights: [
      'Available in 3 signature finishes: Cosmic Orange, Silver, and Deep Titanium',
      'Mutual Fund backed EMI starting from ₹2,842/month',
      'Guaranteed additional cashback of ₹7,500 on all 1Fi plans',
      'A19 Pro processor with hardware accelerated ray tracing',
      '48MP Fusion system with 5x Periscope Optical Zoom',
      'Ceramic Shield gen-2 with 4x drop performance'
    ],
    specifications: {
      'Display': '6.3-inch Super Retina XDR OLED, 120Hz ProMotion, 2500 nits peak',
      'Processor': 'Apple A19 Pro (2nm) with 6-core GPU',
      'Camera': '48MP Main + 48MP Ultra-wide + 48MP 5x Telephoto',
      'Battery': 'All-day battery with 50% charge in 25 mins',
      'OS': 'iOS 19 with 1Fi Instant Pay Integration',
      'Weight': '187 grams'
    },
    warranty: '1 Year Apple India Warranty + 1Fi Purchase Protection',
    deliveryEstimate: 'Dispatch in less than 48 hours | Delivery in 3-5 days',
    seller: {
      name: 'Balaji Infocom (Authorized Partner)',
      rating: 4.8,
      dispatchTime: 'Under 48 hours',
      deliveryWindow: '3-7 working days'
    },
    variants: {
      storage: [
        { id: '256gb', name: '256 GB', ram: '8 GB', priceDelta: 0, badge: 'Popular' },
        { id: '512gb', name: '512 GB', ram: '8 GB', priceDelta: 18000 },
        { id: '1tb', name: '1 TB', ram: '12 GB', priceDelta: 38000 }
      ],
      colors: [
        { id: 'cosmic-orange', name: 'Cosmic Orange', hexCode: '#E6632B', priceDelta: 0 },
        { id: 'silver', name: 'Silver', hexCode: '#E5E7EB', priceDelta: 0 },
        { id: 'deep-blue', name: 'Dark Titanium Blue', hexCode: '#2B3954', priceDelta: 0 }
      ]
    },
    availableTenures: [3, 6, 12, 24, 36, 48, 60],
    noCostTenures: [3, 6, 12, 24],
    cashbackAmount: 7500
  },
  {
    id: 'samsung-galaxy-s24-ultra',
    slug: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra 5G',
    brand: 'Samsung',
    category: 'smartphones',
    rating: 4.7,
    reviewsCount: 2950,
    inStock: true,
    featured: true,
    badge: 'Galaxy AI',
    basePrice: 129999,
    originalMrp: 134999,
    discountPercentage: 4,
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    shortDesc: 'Titanium frame with Galaxy AI, 200MP Quad Tele camera system, and built-in S-Pen.',
    description: 'Welcome to the era of mobile AI. Circle to Search, Live Call Translation, and Note Assist empower your everyday life, wrapped in tough titanium with Gorilla Armor glass.',
    highlights: [
      'Galaxy AI suite built-in with 7 years of software upgrades',
      '200MP Quad Telephoto with 100x Space Zoom',
      'Built-in S-Pen with low 2.8ms latency',
      'Mutual fund backed EMI starting from ₹2,890/month',
      '₹6,500 cashback with 1Fi mutual fund line'
    ],
    specifications: {
      'Display': '6.8-inch Dynamic AMOLED 2X, QHD+, 120Hz flat display',
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy',
      'Camera': '200MP + 50MP 5x + 10MP 3x + 12MP Ultra-wide',
      'Battery': '5000 mAh with 45W Fast Charging',
      'Weight': '232 grams'
    },
    warranty: '1 Year Samsung India Domestic Warranty',
    deliveryEstimate: 'Dispatch in 24 hours | Guaranteed 2-day delivery',
    seller: {
      name: 'Samsung Flagship Store',
      rating: 4.9,
      dispatchTime: '24 hours',
      deliveryWindow: '2-4 working days'
    },
    variants: {
      storage: [
        { id: '256gb', name: '256 GB', ram: '12 GB', priceDelta: 0 },
        { id: '512gb', name: '512 GB', ram: '12 GB', priceDelta: 15000, badge: 'Best Value' },
        { id: '1tb', name: '1 TB', ram: '12 GB', priceDelta: 35000 }
      ],
      colors: [
        { id: 'titanium-gray', name: 'Titanium Gray', hexCode: '#6B6C70', priceDelta: 0 },
        { id: 'titanium-black', name: 'Titanium Black', hexCode: '#2B2B2D', priceDelta: 0 },
        { id: 'titanium-violet', name: 'Titanium Violet', hexCode: '#564E69', priceDelta: 0 }
      ]
    },
    availableTenures: [3, 6, 12, 24, 36, 48],
    noCostTenures: [3, 6, 12, 24],
    cashbackAmount: 6500
  },
  {
    id: 'apple-macbook-air-m3',
    slug: 'macbook-air-m3',
    name: 'Apple MacBook Air 15" M3 Chip',
    brand: 'Apple',
    category: 'laptops',
    rating: 4.9,
    reviewsCount: 1820,
    inStock: true,
    featured: true,
    badge: 'Student & Pro Choice',
    basePrice: 134900,
    originalMrp: 144900,
    discountPercentage: 7,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80'
    ],
    shortDesc: 'Impossibly thin 11.5mm aluminum body, 15.3" Liquid Retina, and silent all-day power.',
    description: 'Supercharged by Apple M3 chip with up to 18 hours battery life, 1080p FaceTime HD camera, MagSafe 3 charging, and dual external monitor support with lid closed.',
    highlights: [
      'Apple M3 chip (8-core CPU, 10-core GPU, 16-core Neural Engine)',
      '15.3-inch Liquid Retina display with 500 nits brightness',
      'Six-speaker sound system with Spatial Audio',
      'Zero cost 1Fi EMI up to 12 months with ₹8,000 mutual fund cashback'
    ],
    specifications: {
      'Display': '15.3-inch Liquid Retina (2880 x 1864)',
      'Processor': 'Apple M3 Chip (3nm)',
      'Memory': '16GB Unified Memory',
      'Storage': '512GB SSD Storage',
      'Battery': 'Up to 18 hours wireless battery life',
      'Weight': '1.51 kg'
    },
    warranty: '1 Year Apple International Warranty',
    deliveryEstimate: 'Express Delivery in 2-3 days',
    seller: {
      name: 'Imagine Apple Premium Reseller',
      rating: 4.9,
      dispatchTime: 'Within 24 hours',
      deliveryWindow: '2-3 working days'
    },
    variants: {
      storage: [
        { id: '512gb', name: '512 GB SSD', ram: '16 GB', priceDelta: 0 },
        { id: '1tb', name: '1 TB SSD', ram: '24 GB', priceDelta: 40000, badge: 'Pro Spec' }
      ],
      colors: [
        { id: 'midnight', name: 'Midnight Blue', hexCode: '#1C2530', priceDelta: 0 },
        { id: 'starlight', name: 'Starlight Champagne', hexCode: '#F0EAD6', priceDelta: 0 },
        { id: 'space-gray', name: 'Space Gray', hexCode: '#68696B', priceDelta: 0 },
        { id: 'silver', name: 'Silver', hexCode: '#E3E4E5', priceDelta: 0 }
      ]
    },
    availableTenures: [3, 6, 12, 24, 36],
    noCostTenures: [3, 6, 12],
    cashbackAmount: 8000
  },
  {
    id: 'sony-wh1000xm5',
    slug: 'sony-wh1000xm5',
    name: 'Sony WH-1000XM5 Noise Cancelling Headphones',
    brand: 'Sony',
    category: 'audio',
    rating: 4.7,
    reviewsCount: 5310,
    inStock: true,
    featured: false,
    badge: 'Award Winner',
    basePrice: 28990,
    originalMrp: 34990,
    discountPercentage: 17,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ],
    shortDesc: 'Dual Processor V1 + HD QN1, 8 microphones, LDAC Hi-Res audio, and 30-hour battery life.',
    description: 'Industry-standard active noise cancelling headphones with custom 30mm precision drivers, multipoint bluetooth pairing, and ultra-comfortable soft fit leather.',
    highlights: [
      'Auto NC Optimizer dynamically adapts to ambient noise',
      'Crystal clear calls with 4 beamforming microphones & AI noise reduction',
      '30 hours of playback with 3-minute quick charge giving 3 hours',
      '1Fi 0% EMI starting at just ₹4,831/month'
    ],
    specifications: {
      'Driver': '30mm Carbon Fiber Composite',
      'Battery': '30 hours with ANC ON, 40 hours with ANC OFF',
      'Codecs': 'LDAC, AAC, SBC with DSEE Extreme',
      'Weight': '250 grams'
    },
    warranty: '1 Year Sony India Domestic Warranty',
    deliveryEstimate: 'Next Day Delivery available',
    seller: {
      name: 'Sony Center Direct',
      rating: 4.8,
      dispatchTime: 'Same day',
      deliveryWindow: '1-3 working days'
    },
    variants: {
      storage: [
        { id: 'standard', name: 'Standard Edition', priceDelta: 0 }
      ],
      colors: [
        { id: 'black', name: 'Matte Black', hexCode: '#111111', priceDelta: 0 },
        { id: 'silver', name: 'Platinum Silver', hexCode: '#DCDCDC', priceDelta: 0 },
        { id: 'midnight-blue', name: 'Midnight Navy', hexCode: '#1E293B', priceDelta: 1000 }
      ]
    },
    availableTenures: [3, 6, 9, 12],
    noCostTenures: [3, 6],
    cashbackAmount: 2500
  },
  {
    id: 'sony-playstation-5-slim',
    slug: 'playstation-5-slim',
    name: 'Sony PlayStation 5 Slim Console',
    brand: 'Sony',
    category: 'gaming',
    rating: 4.9,
    reviewsCount: 4420,
    inStock: true,
    featured: true,
    badge: 'Gamer Choice',
    basePrice: 54990,
    originalMrp: 59990,
    discountPercentage: 8,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80'
    ],
    shortDesc: 'Ultra-high speed 1TB SSD, Ray Tracing, 4K-120fps gaming, and DualSense haptic feedback.',
    description: 'Experience lightning-fast load times with custom SSD architecture and deeper immersion with DualSense wireless controller features including adaptive triggers and 3D audio.',
    highlights: [
      '1TB ultra-fast internal NVMe storage',
      'Ray Tracing support with 120Hz output on compatible 4K displays',
      'Tempest 3D AudioTech support',
      '1Fi Mutual Fund EMI starting from ₹1,225/month with 0% interest'
    ],
    specifications: {
      'Storage': '1TB Custom High-Speed SSD',
      'Processor': 'Custom AMD Zen 2 (8-core/16-thread up to 3.5GHz)',
      'Graphics': 'AMD RDNA 2 GPU with Ray Tracing acceleration',
      'Weight': '3.2 kg'
    },
    warranty: '1 Year Sony Interactive Entertainment Warranty',
    deliveryEstimate: 'Dispatch in 24 hours',
    seller: {
      name: 'GameStop India Partner',
      rating: 4.7,
      dispatchTime: '24 hours',
      deliveryWindow: '2-4 working days'
    },
    variants: {
      storage: [
        { id: 'disc-edition', name: 'Disc Edition (1TB)', priceDelta: 0, badge: 'Popular' },
        { id: 'digital-edition', name: 'Digital Edition (1TB)', priceDelta: -10000 }
      ],
      colors: [
        { id: 'white', name: 'Glacier White', hexCode: '#FFFFFF', priceDelta: 0 },
        { id: 'midnight-black', name: 'Midnight Black Covers', hexCode: '#1A1A1A', priceDelta: 1500 }
      ]
    },
    availableTenures: [3, 6, 12, 18, 24],
    noCostTenures: [3, 6, 12],
    cashbackAmount: 4000
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles' },
  { id: 'smartphones', name: 'Smartphones', icon: 'Smartphone' },
  { id: 'laptops', name: 'Laptops', icon: 'Laptop' },
  { id: 'audio', name: 'Audio', icon: 'Headphones' },
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad2' }
] as const;
