export interface ProductSize {
  name: string;
  priceDelta: number;
  label: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  desc: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'bed-sets' | 'wardrobes' | 'dining-sets' | 'sofas' | 'dressing-consoles' | 'custom-woodwork';
  basePrice: number;
  discountPrice?: number;
  image: string;
  gallery: string[];
  description: string;
  dimensions: string;
  woodTypes: string[];
  sizes: ProductSize[];
  colors: ProductColor[];
  includedPieces: string[];
  leadTime: string;
  isFeatured?: boolean;
  isNew?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  productName: string;
  image: string;
  selectedSize: string;
  selectedWood: string;
  selectedColor: string;
  customNotes?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface StoreSettings {
  businessName: string;
  whatsappNumber: string; // E.g. "923001234567"
  phoneDisplay: string;   // E.g. "+92 300 1234567"
  email: string;
  address: string;
  tagline: string;
  leadTimeInfo: string;
  currency: string;
  // Occasion & Promotional Sale Options
  isSaleActive?: boolean;
  saleTitle?: string;              // e.g. "Festive Occasion Sale" or "Wedding Season Grand Sale"
  saleDiscountPercentage?: number; // e.g. 15 for 15% OFF
  saleBannerText?: string;         // e.g. "Special Occasion Discount: Flat 15% OFF across all solid timber furniture!"
  saleTagline?: string;            // e.g. "Limited-Time Festive Benefit"
}

export interface OrderInquiry {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  deliveryAddress: string;
  items: CartItem[];
  totalAmount: number;
  notes: string;
  status: 'Inquired' | 'Confirmed' | 'In Production' | 'Ready' | 'Delivered';
}
