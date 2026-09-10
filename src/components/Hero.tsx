import React from 'react';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  MessageCircle, 
  Truck, 
  Paintbrush, 
  Ruler, 
  Layers 
} from 'lucide-react';
import { StoreSettings } from '../types';
import { CATEGORIES } from '../data/furnitureData';

interface HeroProps {
  settings: StoreSettings;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenCustomOrder: () => void;
  totalProductsCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onOpenCustomOrder,
  totalProductsCount,
}) => {
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const customWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${settings.businessName}, I have a custom furniture design/sizing requirement and would like an estimate.`
  )}`;

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#EFE7DC] border-b border-[#E3D7C5]">
      {/* Subtle wood grain artistic overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(#4A3222 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-10 sm:pb-14 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADECE] text-[#5C4530] text-xs font-semibold border border-[#D5C6AF] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C28E5C]" />
              <span>Authentic Pakistani Hardwood Craftsmanship</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#2A1D13] leading-[1.15] tracking-tight">
              Pure Solid Wood Furniture Handcrafted for Generations
            </h1>

            <p className="text-base sm:text-lg text-[#5E4D3E] max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Explore real handcrafted bed sets, luxury wardrobes, dining tables, and bespoke woodwork in genuine seasoned <strong className="text-[#2A1D13] font-semibold">Sheesham (Rosewood)</strong> &amp; <strong className="text-[#2A1D13] font-semibold">Teak</strong>. Custom size &amp; polish options with direct WhatsApp order confirmation.
            </p>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-left">
              <div className="p-2.5 rounded-lg bg-white/70 border border-[#E8DFC8] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#8B5A2B] shrink-0" />
                <div className="text-[11px] leading-tight font-medium text-[#4A3C31]">
                  100% Solid Sheesham / Teak
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 border border-[#E8DFC8] flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#8B5A2B] shrink-0" />
                <div className="text-[11px] leading-tight font-medium text-[#4A3C31]">
                  Any Custom Sizing &amp; Dimensions
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 border border-[#E8DFC8] flex items-center gap-2">
                <Paintbrush className="w-4 h-4 text-[#8B5A2B] shrink-0" />
                <div className="text-[11px] leading-tight font-medium text-[#4A3C31]">
                  5+ Wood Polish Shades
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 border border-[#E8DFC8] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#8B5A2B] shrink-0" />
                <div className="text-[11px] leading-tight font-medium text-[#4A3C31]">
                  Delivery Across Pakistan
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href={customWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Share Design on WhatsApp</span>
              </a>
              <button
                onClick={onOpenCustomOrder}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#2C1F14] hover:bg-[#422F1F] text-[#F3ECE2] font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Request Custom Sizing Quote</span>
              </button>
            </div>
          </div>

          {/* Right Column: Featured Woodwork Highlight Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-[#D9CDB8] group">
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#2C1F14] relative">
                <img
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=85"
                  alt="Real Sheesham Wood King Bed Set at Aslam Wood Works"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                
                {/* Floating Tag */}
                <div className="absolute top-3 left-3 bg-[#2C1F14]/90 backdrop-blur-md text-[#E8DFC8] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#D4AF37]/40 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                  Factory Workshop In Production
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider">
                    Masterpiece of the Month
                  </span>
                  <h3 className="font-serif-luxury text-lg font-bold leading-tight">
                    Imperial Sheesham King Bed Set &amp; Side Tables
                  </h3>
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="text-[#E8DFC8]">Price: <strong className="text-white text-sm font-bold">Rs. 165,000</strong></span>
                    <span className="text-[#D4AF37] font-medium bg-[#2C1F14]/80 px-2 py-0.5 rounded">
                      Sheesham Rosewood
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom strip of the card */}
              <div className="p-4 bg-[#FAF7F2] border-t border-[#E8DFC8] flex items-center justify-between text-xs text-[#5A493B]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8B5A2B]" />
                  <span>Real timber photo • No synthetic MDF</span>
                </div>
                <span className="font-semibold text-[#2C1F14]">
                  {totalProductsCount} Models Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar & Category Filter Strip */}
        <div className="mt-10 pt-8 border-t border-[#E3D7C5]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search bed sets, wardrobes, dining..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D9CDB8] text-sm text-[#2C1F14] placeholder-[#8C7A6B] focus:outline-hidden focus:ring-2 focus:ring-[#8B5A2B] transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7A6B] hover:text-[#2C1F14]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category tabs scroll */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1.5 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-[#2C1F14] text-white shadow-xs'
                      : 'bg-white text-[#5A493B] hover:bg-[#F2EADB] border border-[#D9CDB8]'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
