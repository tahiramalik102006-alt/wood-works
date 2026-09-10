import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  ShoppingBag, 
  ShieldCheck, 
  Menu, 
  X, 
  SlidersHorizontal,
  Clock,
  MapPin
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
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  cartCount,
  onOpenCart,
  onOpenAdmin,
  selectedCategory,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const quickWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${settings.businessName}, I would like to inquire about your furniture catalog and custom woodwork services.`
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFC8]">
      {/* Top Announcement Bar */}
      <div className="bg-[#2C1F14] text-[#E8DFC8] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1.5 font-medium text-[#D4AF37]">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Solid Seasoned Sheesham & Teak Wood
            </span>
            <span className="hidden md:inline-block text-[#8C7A6B]">•</span>
            <span className="hidden md:flex items-center gap-1 text-[#C4B5A5]">
              <Clock className="w-3.5 h-3.5" />
              Custom Sizing & Polish Choice Available
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

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
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

          {/* Desktop Navigation Categories */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-medium text-[#4A3C31]">
            {CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-2 rounded-lg transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#EADECE] text-[#2C1F14] font-semibold shadow-xs'
                    : 'hover:bg-[#F2EADB] text-[#5A493B]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Actions: Admin, WhatsApp, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin Portal Button */}
            <button
              id="nav-admin-portal-btn"
              onClick={onOpenAdmin}
              title="Open Admin Portal to add/edit products"
              className="px-2.5 sm:px-3.5 py-2 rounded-lg text-xs font-semibold text-[#5A493B] hover:text-[#2C1F14] bg-[#F2EADB] hover:bg-[#E8DCC9] border border-[#D9CEBA] flex items-center gap-1.5 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B5A2B]" />
              <span className="hidden sm:inline">Admin Portal</span>
              <span className="sm:hidden">Admin</span>
            </button>

            {/* Direct WhatsApp Quick Chat */}
            <a
              id="nav-whatsapp-quick-btn"
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-sm transition-all hover:shadow"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </a>

            {/* Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-lg bg-[#2C1F14] text-[#E8DFC8] hover:bg-[#3D2C1D] flex items-center gap-2 shadow-sm transition-all"
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

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-[#2C1F14] hover:bg-[#EFE7D8]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#E8DFC8] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3">
          <p className="text-xs font-bold text-[#8C7A6B] uppercase tracking-wider px-2">
            Explore Furniture Collections
          </p>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#2C1F14] text-white font-semibold'
                    : 'bg-[#F2EADB] text-[#4A3C31] hover:bg-[#E8DCC9]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8DFC8] flex flex-col gap-2">
            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#25D366]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Contact on WhatsApp (Quick Order)
            </a>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-[#2C1F14] bg-[#EADECE] border border-[#CFC0A8]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#8B5A2B]" />
              Manage Furniture & Prices (Admin)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
