import { Product, StoreSettings, OrderInquiry, CartItem } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS } from '../data/furnitureData';

const PRODUCTS_KEY = 'aslam_wood_works_products_v2';
const SETTINGS_KEY = 'aslam_wood_works_settings_v1';
const CART_KEY = 'aslam_wood_works_cart_v1';
const INQUIRIES_KEY = 'aslam_wood_works_inquiries_v1';

export function getStoredProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      // Check if user had created custom items in v1
      const oldRaw = localStorage.getItem('aslam_wood_works_products_v1');
      let customUserItems: Product[] = [];
      if (oldRaw) {
        try {
          const oldList: Product[] = JSON.parse(oldRaw);
          customUserItems = oldList.filter(item => !item.id.startsWith('aww-'));
        } catch {
          // ignore
        }
      }
      const merged = [...INITIAL_PRODUCTS, ...customUserItems];
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(merged));
      return merged;
    }
    const parsed: Product[] = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // If parsed has fewer default items than INITIAL_PRODUCTS, merge new initial products
      const existingIds = new Set(parsed.map(p => p.id));
      const missingDefaults = INITIAL_PRODUCTS.filter(p => !existingIds.has(p.id));
      if (missingDefaults.length > 0) {
        const updated = [...parsed, ...missingDefaults];
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
        return updated;
      }
      return parsed;
    }
    return INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function saveStoredProducts(products: Product[]): void {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Failed to save products to localStorage', err);
  }
}

export function resetStoredProducts(): Product[] {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function getStoredSettings(): StoreSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(INITIAL_SETTINGS));
      return INITIAL_SETTINGS;
    }
    return { ...INITIAL_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return INITIAL_SETTINGS;
  }
}

export function saveStoredSettings(settings: StoreSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings', err);
  }
}

export function getStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredCart(cart: CartItem[]): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (err) {
    console.error('Failed to save cart', err);
  }
}

export function getStoredInquiries(): OrderInquiry[] {
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredInquiry(inquiry: OrderInquiry): void {
  try {
    const current = getStoredInquiries();
    const updated = [inquiry, ...current];
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save inquiry', err);
  }
}

export function formatRupees(amount: number): string {
  return 'Rs. ' + amount.toLocaleString('en-PK');
}

export function getEffectiveProductPrice(
  product: Product,
  settings: StoreSettings
): {
  basePrice: number;
  finalPrice: number;
  hasDiscount: boolean;
  savings: number;
  discountPercentage: number;
  isOccasionSale: boolean;
} {
  const basePrice = product.basePrice;
  let finalPrice = product.discountPrice ?? basePrice;
  let isOccasionSale = false;
  let discountPercentage = 0;

  if (settings.isSaleActive && settings.saleDiscountPercentage && settings.saleDiscountPercentage > 0) {
    const occasionSalePrice = Math.round(basePrice * (1 - settings.saleDiscountPercentage / 100));
    // If product doesn't have an individual discount price, or occasion price is lower
    if (!product.discountPrice || occasionSalePrice <= product.discountPrice) {
      finalPrice = occasionSalePrice;
      isOccasionSale = true;
      discountPercentage = settings.saleDiscountPercentage;
    } else {
      discountPercentage = Math.round(((basePrice - finalPrice) / basePrice) * 100);
    }
  } else if (product.discountPrice && product.discountPrice < basePrice) {
    discountPercentage = Math.round(((basePrice - product.discountPrice) / basePrice) * 100);
  }

  const hasDiscount = finalPrice < basePrice;
  const savings = Math.max(0, basePrice - finalPrice);

  return {
    basePrice,
    finalPrice,
    hasDiscount,
    savings,
    discountPercentage,
    isOccasionSale,
  };
}

export function generateWhatsAppOrderUrl({
  settings,
  customerName,
  customerPhone,
  customerCity,
  deliveryAddress,
  notes,
  cartItems,
  singleItem,
}: {
  settings: StoreSettings;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  deliveryAddress?: string;
  notes?: string;
  cartItems?: CartItem[];
  singleItem?: {
    product: Product;
    selectedSize: string;
    selectedWood: string;
    selectedColor: string;
    customNotes?: string;
    totalPrice: number;
    quantity: number;
  };
}): string {
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');

  let text = `*NEW FURNITURE ORDER INQUIRY - ${settings.businessName.toUpperCase()}*\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `👤 *Customer Name:* ${customerName || 'Valued Customer'}\n`;
  text += `📞 *Phone Number:* ${customerPhone || 'Not provided'}\n`;
  text += `📍 *City:* ${customerCity || 'Not provided'}\n`;
  if (deliveryAddress) {
    text += `🏠 *Delivery Address:* ${deliveryAddress}\n`;
  }
  text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `🛋️ *ORDERED WOODWORK ITEMS:*\n\n`;

  let grandTotal = 0;

  if (singleItem) {
    grandTotal = singleItem.totalPrice * singleItem.quantity;
    text += `*1. ${singleItem.product.name}*\n`;
    text += `   • *Size:* ${singleItem.selectedSize}\n`;
    text += `   • *Wood Material:* ${singleItem.selectedWood}\n`;
    text += `   • *Polish / Color:* ${singleItem.selectedColor}\n`;
    text += `   • *Quantity:* ${singleItem.quantity}\n`;
    text += `   • *Price:* ${formatRupees(singleItem.totalPrice * singleItem.quantity)}\n`;
    if (singleItem.customNotes) {
      text += `   • *Customization Note:* "${singleItem.customNotes}"\n`;
    }
    text += `\n`;
  } else if (cartItems && cartItems.length > 0) {
    cartItems.forEach((item, idx) => {
      grandTotal += item.totalPrice;
      text += `*${idx + 1}. ${item.productName}*\n`;
      text += `   • *Size:* ${item.selectedSize}\n`;
      text += `   • *Wood Type:* ${item.selectedWood}\n`;
      text += `   • *Polish / Color:* ${item.selectedColor}\n`;
      text += `   • *Quantity:* ${item.quantity}\n`;
      text += `   • *Unit Price:* ${formatRupees(item.unitPrice)}\n`;
      text += `   • *Item Total:* ${formatRupees(item.totalPrice)}\n`;
      if (item.customNotes) {
        text += `   • *Customization Note:* "${item.customNotes}"\n`;
      }
      text += `\n`;
    });
  }

  text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  if (settings.isSaleActive && settings.saleDiscountPercentage) {
    text += `🎉 *OCCASION BENEFIT APPLIED:* ${settings.saleTitle || 'Special Festive Sale'} (${settings.saleDiscountPercentage}% OFF)\n`;
  }
  text += `💰 *ESTIMATED TOTAL:* *${formatRupees(grandTotal)}*\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━\n`;

  if (notes) {
    text += `📝 *Special Instructions / Custom Sizing:* \n${notes}\n\n`;
  }

  text += `Hello Aslam Wood Works! I would like to confirm my furniture order specifications, payment terms, and delivery timeline. Please advise. Thank you!`;

  const encoded = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
