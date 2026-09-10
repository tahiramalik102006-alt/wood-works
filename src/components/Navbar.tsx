import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  ShoppingBag, 
  ShieldCheck, 
  Menu, 
  X, 
  Search,
  SlidersHorizontal,
  Clock,
  MapPin,
  Lock,
  Tag,
  Sparkles
} from 'lucide-react';
import { StoreSettings } from '../types';
import { CATEGORIES } from '../data/furnitureData';

interface NavbarProps {
  settings: StoreSettings;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onToggleSidebar?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  cartCount,
  onOpenCart,
  onOpenAdmin,
  selectedCategory,
  onSelectCategory,
  onToggleSidebar,
  searchQuery = '',
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const quickWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${settings.businessName}, I would like to inquire about your furniture catalog and custom woodwork services.`
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFC8]">
      {/* Top Announcement Bar / Occasion Sale Banner */}
      {settings.isSaleActive ? (
        <div className="bg-gradient-to-r from-[#991B1B] via-[#B91C1C] to-[#881337] text-white text-xs py-2 px-4 shadow-sm border-b border-red-900/40">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
            <div className="flex items-center gap-2 flex-wrap justify-center font-medium">
              <span className="px-2 py-0.5 rounded-full bg-white text-[#991B1B] text-[10px] font-extrabold uppercase tracking-wider shadow-xs animate-pulse">
                {settings.saleDiscountPercentage || 15}% OFF
              </span>
              <span className="font-bold text-[#FEF3C7] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {settings.saleTitle || 'Special Occasion Sale'}:
              </span>
              <span className="text-white/95 text-[11px] sm:text-xs">
                {settings.saleBannerText || 'Flat discount applied across entire furniture catalog. Direct WhatsApp order confirmation.'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs shrink-0">
              <a
                id="top-bar-sale-whatsapp-btn"
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `Hello ${settings.businessName}, I would like to order furniture with the ${settings.saleTitle || 'Occasion Sale'} (${settings.saleDiscountPercentage || 15}% discount benefit).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#991B1B] bg-white hover:bg-amber-100 px-3 py-1 rounded-full font-bold shadow-xs transition-all text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
                <span>Claim Discount on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#2C1F14] text-[#E8DFC8] text-xs py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <span className="flex items-center gap-1.5 font-medium text-[#D4AF37]">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Solid Seasoned Sheesham &amp; Teak Wood
              </span>
              <span className="hidden md:inline-block text-[#8C7A6B]">•</span>
              <span className="hidden md:flex items-center gap-1 text-[#C4B5A5]">
                <Clock className="w-3.5 h-3.5" />
                Custom Sizing &amp; Polish Choice Available
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <a
                id="top-bar-whatsapp-btn"
                href={quickWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white bg-[#25D366] hover:bg-[#20ba59] px-3 py-1 rounded-full font-semibold shadow-xs transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Contact on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Sidebar Toggle Button (Mobile/Tablet) + Logo & Branding */}
          <div className="flex items-center gap-3">
            {/* Side Menu Toggle for mobile/tablet */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl bg-[#2C1F14] text-[#D4AF37] hover:bg-[#3D2C1D] transition-colors flex items-center gap-1.5"
              aria-label="Open side navigation and search"
              title="Search and categories"
            >
              <Menu className="w-5 h-5" />
              <span className="text-xs font-bold text-white pr-1">Catalog</span>
            </button>

            <button
              onClick={() => onSelectCategory('all')}
              className="text-left group flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#4A3222] to-[#2C1F14] border border-[#8B5A2B]/40 flex items-center justify-center text-[#E8DFC8] shadow-md group-hover:scale-105 transition-transform">
                <span className="font-serif-luxury font-bold text-xl tracking-tighter text-[#D4AF37]">AW</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-[#2C1F14] group-hover:text-[#8B5A2B] transition-colors">
                    {settings.businessName}
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#EFE7D8] text-[#6B5038] font-semibold border border-[#D9CEBA]">
                    Handcrafted
                  </span>
                </div>
                <p className="text-[11px] text-[#7A6958] font-medium tracking-wide">
                  Master Furniture Workshop & Showroom
                </p>
              </div>
            </button>
          </div>

          {/* Quick Search trigger in navbar for customer convenience */}
          {onSearchChange && (
            <div className="hidden md:flex items-center flex-1 max-w-xs mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Quick search furniture..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-[#D9CDB8] text-xs text-[#2C1F14] placeholder-[#8C7A6B] focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
                />
                <Search className="w-3.5 h-3.5 text-[#8C7A6B] absolute left-2.5 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8C7A6B] hover:text-[#2C1F14]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Actions: Side Menu button, WhatsApp, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Side Navigation Trigger button */}
            <button
              onClick={onToggleSidebar}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-[#2C1F14] bg-[#EADECE] hover:bg-[#D5C4AC] border border-[#CFC0A8] flex items-center gap-1.5 transition-colors"
              title="Open full catalog search and wood filters"
            >
              <Search className="w-3.5 h-3.5 text-[#8B5A2B]" />
              <span className="hidden sm:inline">Search &amp; Filters</span>
              <span className="sm:hidden">Search</span>
            </button>

            {/* Direct WhatsApp Quick Chat */}
            <a
              id="nav-whatsapp-quick-btn"
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-sm transition-all hover:shadow"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </a>

            {/* Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-[#2C1F14] text-[#E8DFC8] hover:bg-[#3D2C1D] flex items-center gap-2 shadow-sm transition-all"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:inline text-xs font-semibold text-white">Cart</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full bg-[#C28E5C] text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
