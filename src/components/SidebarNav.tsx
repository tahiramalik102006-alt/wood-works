import React from 'react';
import { 
  Search, 
  X, 
  MessageCircle, 
  ShoppingBag, 
  ShieldCheck, 
  Lock, 
  SlidersHorizontal, 
  Sparkles, 
  Layers, 
  Bed, 
  DoorClosed, 
  Utensils, 
  Armchair, 
  Frame, 
  Hammer, 
  Filter, 
  Check, 
  ChevronRight,
  Phone
} from 'lucide-react';
import { StoreSettings } from '../types';
import { CATEGORIES } from '../data/furnitureData';

interface SidebarNavProps {
  settings: StoreSettings;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedWoodFilter: string;
  onSelectWoodFilter: (wood: string) => void;
  selectedPriceFilter: string;
  onSelectPriceFilter: (price: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  categoryCounts: Record<string, number>;
  totalProductsCount: number;
}

// Icon mapper for categories
const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'bed-sets':
      return <Bed className="w-4 h-4 shrink-0" />;
    case 'wardrobes':
      return <DoorClosed className="w-4 h-4 shrink-0" />;
    case 'dining-sets':
      return <Utensils className="w-4 h-4 shrink-0" />;
    case 'sofas':
      return <Armchair className="w-4 h-4 shrink-0" />;
    case 'dressing-consoles':
      return <Frame className="w-4 h-4 shrink-0" />;
    case 'custom-woodwork':
      return <Hammer className="w-4 h-4 shrink-0" />;
    default:
      return <Sparkles className="w-4 h-4 shrink-0" />;
  }
};

export const SidebarNav: React.FC<SidebarNavProps> = ({
  settings,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedWoodFilter,
  onSelectWoodFilter,
  selectedPriceFilter,
  onSelectPriceFilter,
  cartCount,
  onOpenCart,
  onOpenAdmin,
  isOpenMobile,
  onCloseMobile,
  categoryCounts,
  totalProductsCount,
}) => {
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${settings.businessName}, I would like to inquire about your furniture collection and custom woodcraft orders.`
  )}`;

  const content = (
    <div className="h-full flex flex-col justify-between bg-[#24190F] text-[#E8DFC8] border-r border-[#3A291A]">
      {/* Top Header / Branding */}
      <div className="p-5 border-b border-[#3A291A]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4A3222] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-sm font-serif-luxury font-bold text-lg">
              AW
            </div>
            <div>
              <h1 className="font-serif-luxury text-lg font-bold text-white tracking-tight leading-tight">
                {settings.businessName}
              </h1>
              <p className="text-[11px] text-[#A89887] flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                <span>Solid Timber Workshop</span>
              </p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-[#A89887] hover:text-white hover:bg-[#3A291A] transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PROMINENT SEARCH BAR (Requested by user) */}
        <div className="mt-5">
          <label htmlFor="sidebar-search-input" className="block text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
            Search Furniture
          </label>
          <div className="relative">
            <input
              id="sidebar-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search beds, closets, dining..."
              className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#2C1F14] border border-[#4A3222] text-sm text-white placeholder-[#8C7A6B] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
            />
            <Search className="w-4 h-4 text-[#A89887] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C7A6B] hover:text-white p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="flex items-center justify-between text-[11px] text-[#A89887] mt-1.5 px-1">
              <span>Filtering for "{searchQuery}"</span>
              <button 
                onClick={() => onSearchChange('')}
                className="text-[#D4AF37] hover:underline"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Navigation Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {/* Category Navigation */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2 text-[11px] font-bold uppercase tracking-wider text-[#A89887]">
            <span>Collections</span>
            <span>{totalProductsCount} Items</span>
          </div>

          <nav className="space-y-1" aria-label="Furniture Categories">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] ?? 0;

              return (
                <button
                  key={cat.id}
                  id={`nav-cat-${cat.id}`}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-[#4A3222] text-[#D4AF37] shadow-sm border border-[#D4AF37]/30'
                      : 'text-[#C4B5A5] hover:bg-[#2C1F14] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-[#D4AF37]' : 'text-[#8C7A6B] group-hover:text-[#D4AF37] transition-colors'}>
                      {getCategoryIcon(cat.id)}
                    </span>
                    <span className="truncate">{cat.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                      : 'bg-[#2C1F14] text-[#8C7A6B]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Wood Species Quick Filter */}
        <div>
          <div className="px-2 mb-2 text-[11px] font-bold uppercase tracking-wider text-[#A89887] flex items-center justify-between">
            <span>Wood Species</span>
            {selectedWoodFilter !== 'all' && (
              <button
                onClick={() => onSelectWoodFilter('all')}
                className="text-[#D4AF37] text-[10px] hover:underline normal-case"
              >
                Clear
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-1.5 px-1">
            {[
              { id: 'all', label: 'All Woods' },
              { id: 'sheesham', label: 'Pure Sheesham' },
              { id: 'teak', label: 'Burma Teak' },
              { id: 'ash', label: 'Walnut / Ash' },
            ].map((wood) => {
              const isSelected = selectedWoodFilter === wood.id;
              return (
                <button
                  key={wood.id}
                  onClick={() => onSelectWoodFilter(wood.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] text-center font-medium transition-all ${
                    isSelected
                      ? 'bg-[#D4AF37] text-[#24190F] font-bold shadow-xs'
                      : 'bg-[#2C1F14] text-[#C4B5A5] hover:bg-[#3A291A] hover:text-white border border-[#3A291A]'
                  }`}
                >
                  {wood.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <div className="px-2 mb-2 text-[11px] font-bold uppercase tracking-wider text-[#A89887] flex items-center justify-between">
            <span>Price Range (PKR)</span>
            {selectedPriceFilter !== 'all' && (
              <button
                onClick={() => onSelectPriceFilter('all')}
                className="text-[#D4AF37] text-[10px] hover:underline normal-case"
              >
                Clear
              </button>
            )}
          </div>
          <div className="space-y-1 px-1 text-xs">
            {[
              { id: 'all', label: 'All Prices' },
              { id: 'under-100k', label: 'Under Rs. 100,000' },
              { id: '100k-180k', label: 'Rs. 100,000 - 180,000' },
              { id: 'above-180k', label: 'Luxury (Rs. 180,000+)' },
            ].map((range) => {
              const isSelected = selectedPriceFilter === range.id;
              return (
                <button
                  key={range.id}
                  onClick={() => onSelectPriceFilter(range.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] transition-all ${
                    isSelected
                      ? 'bg-[#4A3222] text-[#D4AF37] font-semibold'
                      : 'text-[#A89887] hover:text-white hover:bg-[#2C1F14]'
                  }`}
                >
                  <span>{range.label}</span>
                  {isSelected && <Check className="w-3 h-3 text-[#D4AF37]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Workshop Direct Contact Card */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#2C1F14] to-[#3A291A] border border-[#D4AF37]/20 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span>Master Craftsman Online</span>
          </div>
          <p className="text-[11px] text-[#A89887] leading-relaxed">
            Need custom bed measurements, room CAD layouts, or polish shade samples?
          </p>
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white shrink-0" />
            <span>WhatsApp Us Directly</span>
          </a>
        </div>
      </div>

      {/* Sidebar Footer: Cart & Discreet Admin Lock */}
      <div className="p-4 border-t border-[#3A291A] bg-[#1E140C] space-y-2">
        {/* Cart Quick Button */}
        <button
          onClick={() => {
            onOpenCart();
            onCloseMobile();
          }}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#2C1F14] hover:bg-[#3A291A] text-white text-xs font-bold border border-[#4A3222] transition-colors"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            <span>Shopping Cart</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#C28E5C] text-white text-[11px] font-bold">
            {cartCount}
          </span>
        </button>

        {/* Discreet Owner Login / Admin Portal button (Password protected) */}
        <div className="pt-2 flex items-center justify-between text-[11px] text-[#6E5D4F]">
          <button
            onClick={() => {
              onOpenAdmin();
              onCloseMobile();
            }}
            className="flex items-center gap-1.5 text-[#8C7A6B] hover:text-[#D4AF37] transition-colors group"
            title="Restricted to workshop owner"
          >
            <Lock className="w-3.5 h-3.5 text-[#6E5D4F] group-hover:text-[#D4AF37] transition-colors" />
            <span>Owner Login (PIN)</span>
          </button>
          <span className="text-[10px] text-[#4E3F35]">v2.2</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar (Visible on lg screens and up) */}
      <aside className="hidden lg:block w-72 xl:w-80 h-screen sticky top-0 shrink-0 z-30 shadow-xl">
        {content}
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar (Visible when toggled on mobile/tablet) */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer container */}
          <div className="relative w-72 sm:w-80 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
