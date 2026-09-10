import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  Truck, 
  SlidersHorizontal,
  Layers,
  Heart
} from 'lucide-react';
import { StoreSettings } from '../types';
import { CATEGORIES } from '../data/furnitureData';

interface FooterProps {
  settings: StoreSettings;
  onSelectCategory: (cat: string) => void;
  onOpenAdmin: () => void;
  onOpenCustom: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onSelectCategory,
  onOpenAdmin,
  onOpenCustom,
}) => {
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${settings.businessName}, I would like to inquire about your furniture collection and custom manufacturing.`
  )}`;

  return (
    <footer className="bg-[#24190F] text-[#E8DFC8] border-t border-[#3A291A]">
      {/* Quality Guarantees Strip */}
      <div className="border-b border-[#3A291A] bg-[#2C1F14] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#4A3222] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif-luxury font-bold text-white text-sm">
                  100% Solid Kiln-Dried Timber
                </h4>
                <p className="text-xs text-[#A89887] mt-0.5 leading-relaxed">
                  Only authentic seasoned Sheesham and Teak wood. Zero MDF or paper veneers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#4A3222] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif-luxury font-bold text-white text-sm">
                  Custom Sizing &amp; Polish
                </h4>
                <p className="text-xs text-[#A89887] mt-0.5 leading-relaxed">
                  Every piece is tailored to your room dimensions and preferred lacquer tone.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#4A3222] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif-luxury font-bold text-white text-sm">
                  Direct WhatsApp Orders
                </h4>
                <p className="text-xs text-[#A89887] mt-0.5 leading-relaxed">
                  Instant personal order confirmation and live progress photos of your furniture.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#4A3222] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif-luxury font-bold text-white text-sm">
                  Safe Nationwide Delivery
                </h4>
                <p className="text-xs text-[#A89887] mt-0.5 leading-relaxed">
                  Professional packing and home delivery to Lahore, Islamabad, Karachi, and all cities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#4A3222] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <span className="font-serif-luxury font-bold text-lg">AW</span>
              </div>
              <div>
                <span className="font-serif-luxury text-xl font-bold text-white tracking-tight">
                  {settings.businessName}
                </span>
                <p className="text-[11px] text-[#A89887]">
                  Master Furniture Artisans &amp; Woodcraft Workshop
                </p>
              </div>
            </div>

            <p className="text-xs text-[#C4B5A5] leading-relaxed max-w-sm">
              Specialized in high-end handcrafted residential and bridal furniture in solid Sheesham (Indian Rosewood) and Burma Teak wood. Custom designs tailored to perfection.
            </p>

            <div className="space-y-2 pt-2 text-xs text-[#C4B5A5]">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#25D366] hover:underline font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: {settings.phoneDisplay}</span>
              </a>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{settings.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Doorstep Delivery across all cities in Pakistan</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
              Furniture Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#C4B5A5]">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-[#D4AF37] transition-colors"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenCustom}
                  className="text-[#D4AF37] hover:underline font-semibold"
                >
                  + Custom Woodwork / CAD Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Connect & Admin Access */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
              Order via WhatsApp
            </h4>
            <p className="text-xs text-[#C4B5A5]">
              Chat directly with our master woodcraft consultant for price estimates, custom dimensions, and wood polish catalogs.
            </p>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Connect on WhatsApp ({settings.phoneDisplay})</span>
            </a>

            <div className="pt-2 border-t border-[#3A291A]">
              <button
                onClick={onOpenAdmin}
                className="text-xs text-[#A89887] hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Owner Admin Portal (Add Real Photos &amp; Prices)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-[#3A291A] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8C7A6B]">
          <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Handcrafted with solid wood pride in Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
};
