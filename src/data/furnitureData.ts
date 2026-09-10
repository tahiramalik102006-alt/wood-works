import { Product, StoreSettings } from '../types';

export const INITIAL_SETTINGS: StoreSettings = {
  businessName: 'Aslam Wood Works',
  whatsappNumber: '923001234567',
  phoneDisplay: '+92 300 1234567',
  email: 'info@aslamwoodworks.com',
  address: 'Main Woodcraft Boulevard, Furniture Market, Gujrat / Lahore, Pakistan',
  tagline: 'Master Artisans in Solid Sheesham, Teak & Premium Woodcraft',
  leadTimeInfo: 'Custom hand-crafted furniture ready in 14-21 working days with door-step delivery & setup.',
  currency: 'Rs.',
  isSaleActive: true,
  saleTitle: 'Festive Occasion & Wedding Season Sale',
  saleDiscountPercentage: 15,
  saleBannerText: 'Special Occasion Offer: Flat 15% OFF across all authentic solid Sheesham & Teak master furniture! Free workshop polish upgrade & doorstep setup.',
  saleTagline: 'Limited Occasion Benefit',
};

export const INITIAL_PRODUCTS: Product[] = [
  // ================= BED SETS (ONLY REAL BEDS) =================
  {
    id: 'aww-bed-01',
    name: 'Imperial Solid Sheesham King Bed Set with Fluted Headboard',
    category: 'bed-sets',
    basePrice: 185000,
    discountPrice: 165000,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Crafted from 100% seasoned solid Sheesham (Indian Rosewood), this masterpiece features deep natural wood grain, architectural fluted flairs, heavy-gauge joinery, and an ergonomically tilted headboard upholstered in high-density foam with stain-resistant velvet fabric.',
    dimensions: 'King Bed: 6.5 ft (L) x 6 ft (W) | Headboard Height: 4.5 ft | Bedside Tables: 22" (W) x 16" (D) x 20" (H)',
    woodTypes: [
      'Pure Seasoned Sheesham (Indian Rosewood)',
      'Imported Burma Teak Wood (+Rs. 28,000)',
      'Kikar / Acacia Seasoned Solid Wood (-Rs. 18,000)',
      'American Ash Wood with Dark Stain'
    ],
    sizes: [
      { name: 'King Size (6 x 6.5 ft)', priceDelta: 0, label: 'Standard Master Bedroom (6 x 6.5 ft)' },
      { name: 'Queen Size (5 x 6.5 ft)', priceDelta: -12000, label: 'Standard Bedroom (5 x 6.5 ft)' },
      { name: 'Super King Presidential (6.5 x 7 ft)', priceDelta: 22000, label: 'Spacious Master Luxury (6.5 x 7 ft)' },
      { name: 'Single Bed (3.5 x 6.5 ft)', priceDelta: -55000, label: 'Single / Guest Room (3.5 x 6.5 ft)' }
    ],
    colors: [
      { name: 'Natural Sheesham Polish', hex: '#8B4513', desc: 'Raw golden-brown grain highlights with satin top-coat' },
      { name: 'Dark Walnut Semi-Gloss', hex: '#3E2723', desc: 'Rich deep espresso luxury tone' },
      { name: 'Warm Teak Honey', hex: '#A0522D', desc: 'Golden amber glow with natural timber texture' },
      { name: 'Antique Rosewood Deco', hex: '#4A1515', desc: 'Traditional royal reddish-brown heritage polish' },
      { name: 'Smoked Matte Charcoal', hex: '#262626', desc: 'Ultra-modern urban contemporary matte finish' }
    ],
    includedPieces: [
      '1x Master Solid Wood Bed Frame with Heavy Slats',
      '2x Two-Drawer Matching Bedside Tables',
      'Mattress Base Support Planks (Solid Deodar Pine)',
      'Optional Dressing Table Available'
    ],
    leadTime: '14 to 18 Working Days',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 34
  },
  {
    id: 'aww-bed-02',
    name: 'Heritage Royal Hand-Carved Bridal Bed Set',
    category: 'bed-sets',
    basePrice: 245000,
    discountPrice: 225000,
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A statement bridal collection handcrafted by master Chinioti woodcarvers. Features intricate hand-chiselled floral crown motifs on kiln-dried solid Sheesham with gold leaf accent rub and diamond-tufted Turkish velvet cushioning.',
    dimensions: 'Bed: 6.5 ft (L) x 6 ft (W) | Headboard Height: 5.5 ft | Dressing Console: 54" (W) x 18" (D) x 34" (H)',
    woodTypes: [
      '100% Solid Sheesham (Kiln Dried & Seasoned)',
      'Solid Teakwood Hand-Carved (+Rs. 35,000)',
      'Pure Rosewood with Brass Inlay (+Rs. 45,000)'
    ],
    sizes: [
      { name: 'King Size (6 x 6.5 ft)', priceDelta: 0, label: 'Standard Master Bridal King (6 x 6.5 ft)' },
      { name: 'Grand Presidential (7 x 7 ft)', priceDelta: 30000, label: 'Luxury Villa Size (7 x 7 ft)' },
      { name: 'Queen Size (5 x 6.5 ft)', priceDelta: -15000, label: 'Compact Bridal (5 x 6.5 ft)' }
    ],
    colors: [
      { name: 'Antique Walnut with Gold Highlighting', hex: '#442211', desc: 'Regal dark polish with subtle hand-burnished gold leaf' },
      { name: 'Champagne White Deco with Gold Rub', hex: '#EBE5D8', desc: 'Modern regal bridal finish with pearl sheen' },
      { name: 'Natural Sheesham Deep Grain', hex: '#8B4513', desc: 'Traditional warm wood glow' }
    ],
    includedPieces: [
      '1x Master Carved Bed Frame & Headboard',
      '2x Carved Three-Drawer Side Tables',
      '1x Grand Dressing Table with Beveled Mirror Frame',
      '1x Velvet Upholstered Bed Bench'
    ],
    leadTime: '20 to 25 Working Days',
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 28
  },
  {
    id: 'aww-bed-03',
    name: 'Minimalist Solid Teak Platform King Bed with Floating Nightstands',
    category: 'bed-sets',
    basePrice: 165000,
    discountPrice: 148000,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A contemporary Scandinavian-inspired low profile solid wood platform bed. Features a continuous solid wood plank headboard showing genuine grain patterns and seamless Japanese joinery with integrated floating nightstands.',
    dimensions: 'King Platform: 6.8 ft (L) x 6.2 ft (W) | Platform Height: 12" | Headboard: 40" (H)',
    woodTypes: [
      'Solid Burma Teak Wood',
      '100% Solid Seasoned Sheesham',
      'American Ash Timber'
    ],
    sizes: [
      { name: 'King Size (6 x 6.5 ft)', priceDelta: 0, label: 'Master King Platform' },
      { name: 'Queen Size (5 x 6.5 ft)', priceDelta: -14000, label: 'Queen Platform' }
    ],
    colors: [
      { name: 'Natural Honey Teak Matte', hex: '#A0522D', desc: 'Organic satin natural finish' },
      { name: 'Dark Smoked Walnut', hex: '#2F1E14', desc: 'Sophisticated dark tone' }
    ],
    includedPieces: [
      '1x Low Profile Solid Wood Platform Bed Frame',
      '2x Cantilever Floating Side Shelves',
      'Reinforced Center Beam Support with Steel Brackets'
    ],
    leadTime: '12 to 16 Working Days',
    rating: 4.9,
    reviewsCount: 19
  },
  {
    id: 'aww-bed-04',
    name: 'Grand Floral Carved Sheesham Bridal Bed with Tufted Velvet',
    category: 'bed-sets',
    basePrice: 215000,
    discountPrice: 195000,
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Exquisite bridal bedroom centerpiece showcasing detailed crown carving with deep diamond tufting. Built completely with seasoned Pakistani rosewood to withstand generations without sagging or creaking.',
    dimensions: 'King Bed: 6.5 ft (L) x 6 ft (W) | Headboard: 58" (H) | Footboard: 26" (H)',
    woodTypes: [
      'Solid Sheesham Rosewood',
      'Hand-Carved Burma Teak (+Rs. 30,000)'
    ],
    sizes: [
      { name: 'King Size (6 x 6.5 ft)', priceDelta: 0, label: 'Bridal Master King' },
      { name: 'Queen Size (5 x 6.5 ft)', priceDelta: -16000, label: 'Bridal Queen' }
    ],
    colors: [
      { name: 'Royal Antique Walnut', hex: '#3E2723', desc: 'Deep warm lustrous polish' },
      { name: 'Deco Pearl White & Gold', hex: '#FAF5EE', desc: 'Luxurious light wedding theme' }
    ],
    includedPieces: [
      '1x Heavy Carved Bed Frame',
      '2x Carved 2-Drawer Nightstands',
      'Hardwood Slats & Center Steel Jack'
    ],
    leadTime: '18 to 22 Working Days',
    rating: 5.0,
    reviewsCount: 22
  },

  // ================= WARDROBES & CLOSETS (ONLY REAL CLOSETS) =================
  {
    id: 'aww-wardrobe-01',
    name: 'Nordic Solid Sheesham 4-Door Wardrobe with Drawers',
    category: 'wardrobes',
    basePrice: 195000,
    discountPrice: 178000,
    image: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Clean architectural lines constructed from genuine solid wood boards with soft-closing German hydraulic hinges. Designed with dual full-length hanging zones, built-in lockable jewelry drawers, and heavy-duty lower storage compartments.',
    dimensions: 'Height: 7.5 ft (90") | Width: 6.5 ft (78") | Depth: 2 ft (24")',
    woodTypes: [
      'Pure Solid Sheesham Frame with Commercial Core',
      '100% Solid Sheesham Full Timber (+Rs. 30,000)',
      'Natural Teak Wood Exterior (+Rs. 25,000)'
    ],
    sizes: [
      { name: '4-Door Standard (6.5 x 7.5 ft)', priceDelta: 0, label: '4-Door Standard Layout (6.5 x 7.5 ft)' },
      { name: '3-Door Compact (5 x 7.5 ft)', priceDelta: -38000, label: '3-Door Bedroom Size (5 x 7.5 ft)' },
      { name: '6-Door Master Suite (9.5 x 7.5 ft)', priceDelta: 75000, label: '6-Door Full Wall Luxury (9.5 x 7.5 ft)' }
    ],
    colors: [
      { name: 'Dark Walnut Matte', hex: '#3E2723', desc: 'Refined modern dark brown wood' },
      { name: 'Natural Sheesham Satin', hex: '#8B4513', desc: 'Lustrous rosewood grain with natural sap streaks' },
      { name: 'Smoked Oak Grey Finish', hex: '#4A4643', desc: 'Contemporary muted architectural finish' }
    ],
    includedPieces: [
      'Heavy Solid Wood Outer Cabinet & Doors',
      'Soft-Close Hydraulic Hinges & Telescopic Drawer Rails',
      '2x Solid Metal Clothes Hanging Rods',
      'Dual Key-Locking Security Drawers'
    ],
    leadTime: '16 to 20 Working Days',
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 19
  },
  {
    id: 'aww-wardrobe-02',
    name: 'Executive Modern Sliding Door Master Closet Wardrobe',
    category: 'wardrobes',
    basePrice: 235000,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Contemporary space-saving sliding wardrobe made with high-tensile aluminium tracks and solid Sheesham frame with rich wood grain door panels and concealed interior LED sensor lighting rails.',
    dimensions: 'Height: 8 ft (96") | Width: 7 ft (84") | Depth: 26 inches',
    woodTypes: [
      'Solid Sheesham Frame & Marine Hardwood Core',
      'Solid Teak Frame with Imported Sliding Gear (+Rs. 20,000)'
    ],
    sizes: [
      { name: '2-Sliding Door (7 x 8 ft)', priceDelta: 0, label: 'Standard 2-Sliding Door (7 x 8 ft)' },
      { name: '3-Sliding Door (10 x 8 ft)', priceDelta: 58000, label: 'Large 3-Sliding Door (10 x 8 ft)' },
      { name: 'Compact 2-Door (5.5 x 7 ft)', priceDelta: -28000, label: 'Compact Sliding (5.5 x 7 ft)' }
    ],
    colors: [
      { name: 'Espresso Walnut Dark', hex: '#231F20', desc: 'Luxury designer hotel aesthetic' },
      { name: 'Warm Teak Wood Grain', hex: '#8B5A2B', desc: 'Warm organic modern tone' }
    ],
    includedPieces: [
      'Heavy-duty Bottom Rolling Track System',
      'Internal 6-Shelf Modular Storage + 2 Drawers',
      'Sensor LED Strip Lighting Package'
    ],
    leadTime: '18 to 22 Working Days',
    rating: 4.9,
    reviewsCount: 14
  },
  {
    id: 'aww-wardrobe-03',
    name: 'Solid Sheesham 3-Door Armoire with Beveled Mirror & Deep Shelves',
    category: 'wardrobes',
    basePrice: 145000,
    discountPrice: 132000,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A classic 3-door solid wood armoire with a central full-length dressing mirror, multi-level shelving for folded clothes, and 2 deep bottom shoe and bedding drawers with brass pull handles.',
    dimensions: 'Height: 7 ft (84") | Width: 5 ft (60") | Depth: 22 inches',
    woodTypes: [
      '100% Solid Sheesham',
      'Solid Burma Teak (+Rs. 22,000)'
    ],
    sizes: [
      { name: '3-Door Standard (5 x 7 ft)', priceDelta: 0, label: '3-Door Classic (5x7 ft)' },
      { name: '2-Door Compact (3.5 x 7 ft)', priceDelta: -28000, label: '2-Door Compact (3.5x7 ft)' }
    ],
    colors: [
      { name: 'Natural Sheesham Amber', hex: '#8B4513', desc: 'Natural golden rosewood tone' },
      { name: 'Antique Dark Walnut', hex: '#3E2723', desc: 'Classic antique deep brown' }
    ],
    includedPieces: [
      'Solid Wood Cabinet Body with Beveled Glass Door',
      'Brass Finished Antique Handles & Locks',
      'Removable Solid Wood Shelves'
    ],
    leadTime: '14 to 18 Working Days',
    rating: 4.8,
    reviewsCount: 17
  },
  {
    id: 'aww-wardrobe-04',
    name: 'Grand 6-Door Walk-In Style Solid Teak Master Closet',
    category: 'wardrobes',
    basePrice: 285000,
    discountPrice: 265000,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An expansive 6-door floor-to-ceiling master wardrobe with custom divided sections for his and her clothing, overcoat hanging, soft-close velvet organizers, and safety locker enclosure.',
    dimensions: 'Height: 8.5 ft | Width: 10 ft | Depth: 24 inches',
    woodTypes: [
      'Solid Teak Exterior & Sheesham Frame',
      '100% Solid Pure Sheesham'
    ],
    sizes: [
      { name: '6-Door Full Suite (10 x 8.5 ft)', priceDelta: 0, label: '6-Door Master Suite (10x8.5 ft)' },
      { name: '5-Door Configuration (8.5 x 8.5 ft)', priceDelta: -35000, label: '5-Door Configuration' }
    ],
    colors: [
      { name: 'Smoked Teak Satin', hex: '#5A3D28', desc: 'Warm hand-rubbed oil wax finish' },
      { name: 'Ebony Walnut Deco', hex: '#1C1613', desc: 'Deep black-brown elegance' }
    ],
    includedPieces: [
      'Complete 6-Door Frontage with Precision Hinges',
      'His & Hers Dual Hanging Towers',
      '4 Internal Locking Drawers',
      'Upper Suitcase Storage Compartments'
    ],
    leadTime: '22 to 28 Working Days',
    rating: 5.0,
    reviewsCount: 11
  },

  // ================= DINING SETS (ONLY REAL DINING TABLES & CHAIRS) =================
  {
    id: 'aww-dining-01',
    name: 'Artisan Solid Sheesham 8-Seater Dining Set with Ergonomic Chairs',
    category: 'dining-sets',
    basePrice: 175000,
    discountPrice: 155000,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Constructed from massive 2.5-inch thick single-slab seasoned solid Sheesham timber, featuring smooth chamfered edges and sturdy cross-trestle joinery. Includes 8 handcrafted solid wood chairs with high-resilience fabric seats.',
    dimensions: 'Table: 7 ft (L) x 3.5 ft (W) x 30" (H) | Chairs: 18" seat height, 38" back height',
    woodTypes: [
      '100% Solid Pure Sheesham',
      'Kiln-Dried Solid Teak Wood (+Rs. 32,000)',
      'Acacia Solid Wood with Walnut Stain (-Rs. 15,000)'
    ],
    sizes: [
      { name: '8-Seater Dining Set (7 x 3.5 ft Table + 8 Chairs)', priceDelta: 0, label: '8-Seater Master Family Set' },
      { name: '6-Seater Dining Set (5.5 x 3 ft Table + 6 Chairs)', priceDelta: -32000, label: '6-Seater Apartment / Dining Room' },
      { name: '10-Seater Banquet Set (9 x 4 ft Table + 10 Chairs)', priceDelta: 48000, label: '10-Seater Luxury Banquet Hall' }
    ],
    colors: [
      { name: 'Natural Sheesham Golden Amber', hex: '#8B4513', desc: 'Original wood grains with clear heat-resistant PU coat' },
      { name: 'Rich Walnut Dark Matte', hex: '#3B2414', desc: 'Deep luxurious dark brown' },
      { name: 'Distressed Teak Rustique', hex: '#6E4720', desc: 'Subtle antique wire-brushed texture' }
    ],
    includedPieces: [
      '1x Solid Sheesham Dining Table with Solid Pedestal Base',
      '8x Solid Wood Dining Chairs with Padded Upholstery',
      '1x 8mm Tempered Glass Table Protector Top (Free Bonus)'
    ],
    leadTime: '12 to 16 Working Days',
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 42
  },
  {
    id: 'aww-dining-02',
    name: 'Royal Round Solid Sheesham 6-Seater Pedestal Dining Set',
    category: 'dining-sets',
    basePrice: 155000,
    discountPrice: 138000,
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An intimate, circular solid timber table supported by a heavy hand-carved central urn pedestal. Perfect for family conversations with zero corner obstructions, accompanied by 6 high-backed cushioned Sheesham chairs.',
    dimensions: 'Round Table Diameter: 5 ft (60") x 30" (H) | Chairs: 19" (W) x 39" (H)',
    woodTypes: [
      'Solid Pakistani Sheesham',
      'Solid Teak Wood (+Rs. 25,000)'
    ],
    sizes: [
      { name: '6-Seater Round (5 ft Diameter)', priceDelta: 0, label: '6-Seater (5 ft Dia)' },
      { name: '4-Seater Round (4 ft Diameter)', priceDelta: -28000, label: '4-Seater (4 ft Dia)' },
      { name: '8-Seater Round (6 ft Diameter)', priceDelta: 35000, label: '8-Seater (6 ft Dia)' }
    ],
    colors: [
      { name: 'Deep Mahogany Polish', hex: '#4A1C14', desc: 'Glossy traditional dining polish' },
      { name: 'Natural Honey Rosewood', hex: '#9E5B2D', desc: 'Warm vibrant amber tone' }
    ],
    includedPieces: [
      '1x Round Solid Wood Pedestal Table with Lazy Susan',
      '6x Solid Wood Curved Dining Chairs',
      'Tempered Glass Top'
    ],
    leadTime: '14 to 18 Working Days',
    rating: 4.9,
    reviewsCount: 23
  },
  {
    id: 'aww-dining-03',
    name: 'Contemporary 6-Seater Solid Teak Dining Set with Padded Chairs',
    category: 'dining-sets',
    basePrice: 145000,
    discountPrice: 128000,
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Sleek, streamlined profile showcasing warm natural teakwood grain with tapered solid wood legs and 6 matching chairs upholstered in stain-resistant beige linen fabric.',
    dimensions: 'Table: 6 ft (L) x 3 ft (W) x 30" (H) | 6 Chairs included',
    woodTypes: [
      '100% Solid Burma Teak Wood',
      'Seasoned Sheesham Wood (-Rs. 10,000)'
    ],
    sizes: [
      { name: '6-Seater Set (6 x 3 ft Table)', priceDelta: 0, label: 'Standard 6-Seater' },
      { name: '4-Seater Compact (4.5 x 3 ft Table)', priceDelta: -25000, label: 'Compact 4-Seater' }
    ],
    colors: [
      { name: 'Natural Golden Teak', hex: '#B26E35', desc: 'Warm satin finish' },
      { name: 'Smoked Walnut Finish', hex: '#3B2414', desc: 'Dark espresso matte' }
    ],
    includedPieces: [
      '1x Solid Wood Dining Table',
      '6x Ergonomic Back Cushioned Chairs'
    ],
    leadTime: '12 to 15 Working Days',
    rating: 4.8,
    reviewsCount: 18
  },

  // ================= SOFA SETS & LOUNGES (ONLY REAL SOLID WOOD SOFAS) =================
  {
    id: 'aww-sofa-01',
    name: 'Sultanate 7-Seater Solid Wood Living Room Sofa Set',
    category: 'sofas',
    basePrice: 210000,
    discountPrice: 192000,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512212621149-107ffe572d2f?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A 7-seater configuration (3-seater + 2-seater + 2 single armchairs) showcasing exposed solid Sheesham armrests and base frame with mortise-and-tenon joints. Upholstered with Master MoltyFoam 10-year guaranteed cushions and premium Turkish woven upholstery.',
    dimensions: '3-Seater: 82" (W) x 34" (D) | 2-Seater: 60" (W) | Single Chairs: 34" (W)',
    woodTypes: [
      'Pure Solid Sheesham Base & Frame',
      'Solid Teakwood Frame (+Rs. 24,000)'
    ],
    sizes: [
      { name: '7-Seater Full Set (3+2+1+1)', priceDelta: 0, label: 'Complete Living Room 7-Seater' },
      { name: '5-Seater Set (3+1+1)', priceDelta: -38000, label: '5-Seater Compact Lounge' },
      { name: 'L-Shape Corner Sectional (9 x 7 ft)', priceDelta: 15000, label: 'Modern L-Shaped Sectional' }
    ],
    colors: [
      { name: 'Walnut Wood + Warm Ivory Fabric', hex: '#442C1D', desc: 'Dark Sheesham frame with cream stain-proof fabric' },
      { name: 'Natural Sheesham + Royal Emerald Velvet', hex: '#1B4D3E', desc: 'Vibrant royal green cushions with warm timber' },
      { name: 'Teak Brown + Slate Charcoal Fabric', hex: '#383E42', desc: 'Contemporary minimalist corporate lounge palette' }
    ],
    includedPieces: [
      '1x Three-Seater Solid Wood Sofa',
      '1x Two-Seater Solid Wood Sofa',
      '2x Single Master Armchairs',
      '6x Decorative Throw Pillows'
    ],
    leadTime: '15 to 18 Working Days',
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 22
  },
  {
    id: 'aww-sofa-02',
    name: 'Scandinavian Solid Teakwood 5-Seater Lounge Sofa Set',
    category: 'sofas',
    basePrice: 175000,
    discountPrice: 158000,
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Clean Scandinavian lines with an exposed solid teak frame, slatted backrest, and thick duck-feather blend cushions. Includes 3-seater couch and 2 single lounge chairs with matching coffee table.',
    dimensions: '3-Seater: 76" (W) x 32" (D) | 1-Seaters: 32" (W) x 32" (D)',
    woodTypes: [
      'Solid Burma Teak Wood',
      'Solid Seasoned Sheesham'
    ],
    sizes: [
      { name: '5-Seater Set (3+1+1)', priceDelta: 0, label: '5-Seater Complete Lounge' },
      { name: '3-Seater Couch Only', priceDelta: -55000, label: '3-Seater Sofa Only' }
    ],
    colors: [
      { name: 'Natural Teak + Sand Dune Fabric', hex: '#D6C7B2', desc: 'Warm neutral resort aesthetic' },
      { name: 'Dark Teak + Charcoal Grey', hex: '#424242', desc: 'Urban loft contrast' }
    ],
    includedPieces: [
      '1x Three-Seater Solid Teak Sofa Frame',
      '2x Single Armchairs',
      '1x Solid Teak Coffee Table'
    ],
    leadTime: '14 to 18 Working Days',
    rating: 4.9,
    reviewsCount: 15
  },
  {
    id: 'aww-sofa-03',
    name: 'Handcrafted Sheesham Accent Armchairs Pair with Coffee Table',
    category: 'sofas',
    basePrice: 85000,
    discountPrice: 75000,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512212621149-107ffe572d2f?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A cozy fireside or bedroom sitting set featuring 2 ergonomic solid Sheesham armchairs with hand-carved armrests and a matching two-tier round wooden coffee table.',
    dimensions: 'Chairs: 30" (W) x 32" (D) x 34" (H) | Table: 24" (Dia) x 20" (H)',
    woodTypes: [
      'Pure Solid Sheesham',
      'Burma Teak Wood (+Rs. 15,000)'
    ],
    sizes: [
      { name: 'Pair of Chairs + Center Table', priceDelta: 0, label: '2 Chairs + Center Table' },
      { name: 'Single Accent Chair Only', priceDelta: -40000, label: '1 Chair Only' }
    ],
    colors: [
      { name: 'Natural Sheesham + Ochre Fabric', hex: '#C28E5C', desc: 'Warm timber and mustard accent' },
      { name: 'Walnut + Midnight Blue Velvet', hex: '#1E2B37', desc: 'Regal navy contrast' }
    ],
    includedPieces: [
      '2x Solid Wood Lounge Chairs',
      '1x Solid Wood Coffee Table with Glass Top'
    ],
    leadTime: '10 to 14 Working Days',
    rating: 4.8,
    reviewsCount: 26
  },
  {
    id: 'aww-sofa-04',
    name: 'Chinioti Royal Crown Hand-Carved 5-Seater Sofa Suite',
    category: 'sofas',
    basePrice: 225000,
    discountPrice: 205000,
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Heritage royal drawing room suite with ornate hand-chiselled crown woodwork, solid Sheesham timber legs, and luxury brocade velvet cushioning. A showstopper centerpiece for formal guest entertaining.',
    dimensions: '3-Seater: 80" (W) x 34" (D) x 38" (H) | Single Chairs: 35" (W) x 34" (D) x 38" (H)',
    woodTypes: [
      '100% Solid Seasoned Sheesham Rosewood',
      'Pure Teak Timber (+Rs. 25,000)'
    ],
    sizes: [
      { name: '5-Seater Suite (3+1+1)', priceDelta: 0, label: '5-Seater Royal Suite' },
      { name: '7-Seater Grand (3+2+1+1)', priceDelta: 45000, label: '7-Seater Grand Living Room' }
    ],
    colors: [
      { name: 'Walnut & Gold Rub Polish', hex: '#3E2723', desc: 'Antique walnut with hand-rubbed gold accents' },
      { name: 'Champagne Cream & Teak', hex: '#D2B48C', desc: 'Warm royal cream aesthetic' }
    ],
    includedPieces: [
      '1x 3-Seater Carved Royal Sofa',
      '2x Single Carved Sovereign Armchairs',
      '4x Silk Accent Pillows'
    ],
    leadTime: '18 to 22 Working Days',
    rating: 5.0,
    reviewsCount: 18
  },

  // ================= DRESSING & CONSOLES (ONLY REAL DRESSING TABLES) =================
  {
    id: 'aww-dressing-01',
    name: 'Royale Vanity Dressing Console with Arched Mirror & Stool',
    category: 'dressing-consoles',
    basePrice: 85000,
    discountPrice: 75000,
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An elegant vanity unit with curved solid wood drawers, antique brass knobs, and an oversized arched dressing mirror. Includes a matching upholstered cushioned sitting stool.',
    dimensions: 'Dresser: 48" (W) x 18" (D) x 32" (H) | Mirror: 40" (H) x 32" (W)',
    woodTypes: [
      'Solid Sheesham Hardwood',
      'Solid Teakwood (+Rs. 14,000)',
      'Seasoned Acacia / Ash'
    ],
    sizes: [
      { name: 'Standard 4-Drawer (48" Width)', priceDelta: 0, label: 'Standard 48" Bedroom Vanity' },
      { name: 'Grand 6-Drawer (60" Width)', priceDelta: 16000, label: 'Grand 60" Wide Dresser' },
      { name: 'Compact 3-Drawer (36" Width)', priceDelta: -12000, label: 'Compact 36" Space Saver' }
    ],
    colors: [
      { name: 'Natural Sheesham Polish', hex: '#8B4513', desc: 'Warm honey-rosewood glow' },
      { name: 'White Deco with Gold Handles', hex: '#F4EFEA', desc: 'Pearl white bridal polish' },
      { name: 'Dark Mahogany Satin', hex: '#421C1C', desc: 'Traditional dark mahogany' }
    ],
    includedPieces: [
      '1x Solid Wood Console Table with Drawers',
      '1x Arched Solid Wood Beveled Mirror Frame',
      '1x Matching Upholstered Dressing Stool'
    ],
    leadTime: '10 to 14 Working Days',
    rating: 4.8,
    reviewsCount: 16
  },
  {
    id: 'aww-dressing-02',
    name: 'Modern Sheesham 6-Drawer Dresser with Mirror',
    category: 'dressing-consoles',
    basePrice: 95000,
    discountPrice: 85000,
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Clean modern dresser console featuring 6 spacious push-to-open soft-close drawers and an elegant circular or rectangular beveled glass mirror.',
    dimensions: 'Dresser: 56" (W) x 18" (D) x 34" (H) | Mirror: 36" Dia',
    woodTypes: [
      '100% Solid Seasoned Sheesham',
      'Solid Teak Timber (+Rs. 18,000)'
    ],
    sizes: [
      { name: '6-Drawer Standard (56" Width)', priceDelta: 0, label: '6-Drawer Vanity Console' },
      { name: '4-Drawer Compact (42" Width)', priceDelta: -15000, label: '4-Drawer Compact Console' }
    ],
    colors: [
      { name: 'Dark Walnut Semi-Gloss', hex: '#3E2723', desc: 'Rich espresso tone' },
      { name: 'Natural Sheesham Polish', hex: '#8B4513', desc: 'Golden-brown rosewood grain' }
    ],
    includedPieces: [
      '1x 6-Drawer Solid Wood Dresser',
      '1x Round Beveled Dressing Mirror with Wood Trim'
    ],
    leadTime: '12 to 16 Working Days',
    rating: 4.9,
    reviewsCount: 19
  },
  {
    id: 'aww-dressing-03',
    name: 'Chinioti Hand-Carved Antique Bridal Dressing Table',
    category: 'dressing-consoles',
    basePrice: 110000,
    discountPrice: 98000,
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Heirloom bridal vanity crafted with traditional floral carving around the crown mirror, carved cabriole legs, and jewelry partitions inside velvet lined top drawers.',
    dimensions: 'Dresser: 52" (W) x 20" (D) x 36" (H) | Mirror: 46" (H)',
    woodTypes: [
      'Pure Solid Sheesham Rosewood',
      'Solid Burma Teak (+Rs. 20,000)'
    ],
    sizes: [
      { name: 'Bridal Grand (52" Width)', priceDelta: 0, label: 'Bridal Grand Size' }
    ],
    colors: [
      { name: 'Antique Walnut & Gold Foil', hex: '#442211', desc: 'Traditional burnished gold highlights' },
      { name: 'Champagne White Deco', hex: '#FAF5EE', desc: 'Pearl wedding deco' }
    ],
    includedPieces: [
      '1x Carved Dressing Table with 5 Drawers',
      '1x Carved Crown Mirror Frame with Belgian Glass',
      '1x Matching Carved Dressing Stool'
    ],
    leadTime: '16 to 20 Working Days',
    rating: 5.0,
    reviewsCount: 14
  },
  {
    id: 'aww-dressing-04',
    name: 'Nordic Solid Sheesham Floating Vanity Console & Mirror',
    category: 'dressing-consoles',
    basePrice: 78000,
    discountPrice: 69000,
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A wall-mounted space-saving floating console featuring 2 soft-glide solid wood drawers and an oversized circular beveled glass mirror with integrated solid brass hangers.',
    dimensions: 'Floating Shelf: 42" (W) x 15" (D) x 8" (H) | Mirror: 32" Diameter',
    woodTypes: [
      '100% Solid Seasoned Sheesham',
      'Solid Teak Timber (+Rs. 12,000)'
    ],
    sizes: [
      { name: '42" Width Standard', priceDelta: 0, label: 'Standard 42" Floating Unit' },
      { name: '52" Width Extended', priceDelta: 14000, label: 'Extended 52" Dual Drawer Unit' }
    ],
    colors: [
      { name: 'Natural Sheesham Polish', hex: '#8B4513', desc: 'Rich honey timber sheen' },
      { name: 'Smoked Walnut', hex: '#3E2723', desc: 'Dark matte modern finish' }
    ],
    includedPieces: [
      '1x Solid Wood Wall Mounted Floating Console',
      '1x Round Beveled Edge Mirror',
      'Heavy Duty Wall Anchor Bolts'
    ],
    leadTime: '8 to 12 Working Days',
    rating: 4.9,
    reviewsCount: 11
  },

  // ================= CUSTOM ORDERS & WALLS (ONLY REAL WOODWORK & MEDIA WALLS) =================
  {
    id: 'aww-custom-01',
    name: 'Bespoke Solid Wood TV Media Wall & Fluted Feature Unit',
    category: 'custom-woodwork',
    basePrice: 145000,
    discountPrice: 135000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Custom designed to your room dimensions. Features floor-to-ceiling solid Sheesham fluted wooden acoustic slats, floating lower media console with soft-close push drawers, and concealed cable management channels.',
    dimensions: 'Custom Made to Order (Default: 8 ft Width x 8.5 ft Height)',
    woodTypes: [
      'Solid Sheesham Slats & Console',
      'Imported Teak Timber Slats (+Rs. 25,000)',
      'Walnut Ash Finished Wood'
    ],
    sizes: [
      { name: '8 x 8 ft Wall Coverage', priceDelta: 0, label: 'Standard Living Room Wall (8x8 ft)' },
      { name: '10 x 9 ft Grand Living Room', priceDelta: 35000, label: 'Spacious TV Wall (10x9 ft)' },
      { name: '6 x 7 ft Compact Media Unit', priceDelta: -25000, label: 'Bedroom Media Wall (6x7 ft)' }
    ],
    colors: [
      { name: 'Natural Fluted Sheesham', hex: '#8B4513', desc: 'Organic modern acoustic texture' },
      { name: 'Charcoal Black & Walnut Accent', hex: '#262626', desc: 'Modern high-contrast architectural look' }
    ],
    includedPieces: [
      'Full Vertical Fluted Wall Slats Section',
      'Floating Lower Credenza / Media Box',
      'Concealed Warm-White LED Strip Diffusers',
      'On-site Workshop Installation by our team'
    ],
    leadTime: '15 to 20 Working Days',
    rating: 5.0,
    reviewsCount: 11
  },
  {
    id: 'aww-custom-02',
    name: 'Architectural Fluted Timber Room Divider & Jali Screen',
    category: 'custom-woodwork',
    basePrice: 95000,
    discountPrice: 85000,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Handcrafted floor-to-ceiling solid wood partition panel with rotating vertical slats or intricate geometric jali woodwork. Ideal for separating drawing and dining spaces while allowing light and airflow.',
    dimensions: 'Made to Room Height (e.g. 9 ft Height x 5 ft Width)',
    woodTypes: [
      'Solid Kiln-Dried Sheesham',
      'Solid Teak Timber (+Rs. 20,000)'
    ],
    sizes: [
      { name: '5 x 9 ft Standard Partition', priceDelta: 0, label: 'Standard 5 x 9 ft Partition' },
      { name: '8 x 9 ft Wide Room Divider', priceDelta: 32000, label: 'Wide 8 x 9 ft Divider' }
    ],
    colors: [
      { name: 'Natural Sheesham Polish', hex: '#8B4513', desc: 'Warm natural wood grain' },
      { name: 'Dark Walnut Stain', hex: '#3E2723', desc: 'Modern espresso finish' }
    ],
    includedPieces: [
      'Pre-assembled Modular Slatted Screen',
      'Heavy Base & Ceiling Mounting Brackets'
    ],
    leadTime: '12 to 16 Working Days',
    rating: 4.9,
    reviewsCount: 9
  },
  {
    id: 'aww-custom-03',
    name: 'Handcrafted Solid Sheesham Credenza & Entryway Console',
    category: 'custom-woodwork',
    basePrice: 115000,
    discountPrice: 105000,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A bespoke solid wood buffet sideboard featuring 3D wave-textured wooden door panels, solid brass hardware, and concealed internal shelves. Works as a dining buffet or entryway statement console.',
    dimensions: 'Length: 6 ft (72") x 18" (D) x 32" (H)',
    woodTypes: [
      '100% Solid Seasoned Sheesham',
      'Burma Teak Timber (+Rs. 22,000)'
    ],
    sizes: [
      { name: '6 ft 4-Door Buffet', priceDelta: 0, label: '6 ft (4-Door)' },
      { name: '4.5 ft 3-Door Console', priceDelta: -22000, label: '4.5 ft (3-Door)' }
    ],
    colors: [
      { name: 'Natural Sheesham PU Gloss', hex: '#8B4513', desc: 'High-durability clear coat' },
      { name: 'Walnut Matte', hex: '#3E2723', desc: 'Refined modern dark brown' }
    ],
    includedPieces: [
      '1x Solid Wood 4-Door Sideboard Cabinet',
      'Internal Adjustable Solid Wood Shelves',
      'Solid Brass Knobs and Hinges'
    ],
    leadTime: '14 to 18 Working Days',
    rating: 5.0,
    reviewsCount: 15
  },
  {
    id: 'aww-custom-04',
    name: 'Executive Solid Sheesham Presidential Office Desk & Credenza',
    category: 'custom-woodwork',
    basePrice: 165000,
    discountPrice: 148000,
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Grand executive study desk crafted in heavy seasoned solid Sheesham with wire concealment grommets, locked central drawer, fluted modesty front panel, and matching side credenza.',
    dimensions: 'Main Desk: 6.5 ft (L) x 3 ft (W) x 30" (H) | Side Credenza: 4 ft (L) x 18" (W)',
    woodTypes: [
      '100% Solid Seasoned Sheesham',
      'Solid Burma Teakwood (+Rs. 32,000)'
    ],
    sizes: [
      { name: 'Executive Suite (6.5 ft Desk + Credenza)', priceDelta: 0, label: 'Executive Suite with Side Return' },
      { name: 'Executive Desk Only (6.5 ft)', priceDelta: -45000, label: 'Main Desk Only' }
    ],
    colors: [
      { name: 'Dark Walnut Semi-Gloss', hex: '#3E2723', desc: 'Prestige corporate executive shade' },
      { name: 'Natural Sheesham Polish', hex: '#8B4513', desc: 'Rich amber rosewood grain' }
    ],
    includedPieces: [
      '1x Master Solid Wood Executive Desk',
      '1x Side Credenza with 3 Lockable Drawers',
      'Integrated Brass Wire Grommets'
    ],
    leadTime: '16 to 22 Working Days',
    rating: 5.0,
    reviewsCount: 8
  }
];

export const CATEGORIES = [
  { 
    id: 'all', 
    label: 'All Woodwork', 
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
    description: 'Explore the complete master catalog of handcrafted solid timber creations.',
    tagline: 'Entire Workshop Collection'
  },
  { 
    id: 'bed-sets', 
    label: 'Bed Sets', 
    icon: 'Bed',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
    description: 'Heirloom King & Queen bed sets with matching side tables and fluted headboards.',
    tagline: 'Master Bedroom Luxury'
  },
  { 
    id: 'wardrobes', 
    label: 'Wardrobes & Closets', 
    icon: 'DoorClosed',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
    description: '3-door, 4-door & 6-door wardrobes in solid Sheesham with internal solid drawers.',
    tagline: 'Spacious Storage Craft'
  },
  { 
    id: 'dining-sets', 
    label: 'Dining Sets', 
    icon: 'Utensils',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85',
    description: '6-seater & 8-seater solid timber dining tables with hand-carved ergonomic chairs.',
    tagline: 'Family Gatherings & Feasts'
  },
  { 
    id: 'sofas', 
    label: 'Sofa Sets & Lounges', 
    icon: 'Armchair',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
    description: 'Solid wood framed living room sofas, Scandinavian teak lounges & accent chairs.',
    tagline: 'Comfort & Timber Strength'
  },
  { 
    id: 'dressing-consoles', 
    label: 'Dressing & Consoles', 
    icon: 'Frame',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
    description: 'Vanity dressing tables with beveled mirrors, velvet drawer partitions & stools.',
    tagline: 'Elegance & Grooming'
  },
  { 
    id: 'custom-woodwork', 
    label: 'Custom Orders & Walls', 
    icon: 'Hammer',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    description: 'Architectural fluted TV media walls, room dividers, credenzas & bespoke orders.',
    tagline: 'Bespoke Architectural Craft'
  },
] as const;
