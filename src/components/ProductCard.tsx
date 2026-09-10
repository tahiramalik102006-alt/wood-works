import React from 'react';
import { 
  MessageCircle, 
  Sliders, 
  Layers, 
  Ruler, 
  Star 
} from 'lucide-react';
import { Product, StoreSettings } from '../types';
import { formatRupees, generateWhatsAppOrderUrl } from '../utils/storage';

interface ProductCardProps {
  product: Product;
  settings: StoreSettings;
  onSelectProduct: (p: Product) => void;
  onQuickWhatsApp: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  settings,
  onSelectProduct,
  onQuickWhatsApp,
}) => {
  const currentPrice = product.discountPrice ?? product.basePrice;
  const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.basePrice);

  const defaultSize = product.sizes[0]?.name || 'Standard';
  const defaultWood = product.woodTypes[0] || 'Solid Sheesham';
  const defaultColor = product.colors[0]?.name || 'Natural Polish';

  const quickWhatsAppUrl = generateWhatsAppOrderUrl({
    settings,
    customerName: '',
    customerPhone: '',
    customerCity: '',
    singleItem: {
      product,
      selectedSize: defaultSize,
      selectedWood: defaultWood,
      selectedColor: defaultColor,
      totalPrice: currentPrice,
      quantity: 1,
    }
  });

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E3D7C5] hover:border-[#8B5A2B]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-[#2C1F14] overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.isFeatured && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#2C1F14]/90 text-[#D4AF37] backdrop-blur-xs border border-[#D4AF37]/30 shadow-xs">
              Handcrafted Masterpiece
            </span>
          )}
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#B91C1C] text-white shadow-xs">
              Save {formatRupees(product.basePrice - (product.discountPrice || 0))}
            </span>
          )}
        </div>

        {/* Real Wood Tag on Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/60 text-white backdrop-blur-xs flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#D4AF37]" />
            {product.woodTypes[0]?.split(' ')[0] || 'Solid'} Wood
          </span>
          {product.rating && (
            <span className="px-2 py-1 rounded-md text-[11px] font-semibold bg-black/60 text-[#D4AF37] backdrop-blur-xs flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
              {product.rating} ({product.reviewsCount})
            </span>
          )}
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          {/* Category & Lead Time */}
          <div className="flex items-center justify-between text-xs text-[#7A6958]">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-[#8B5A2B] bg-[#F5EFE6] px-2 py-0.5 rounded">
              {product.category.replace('-', ' ')}
            </span>
            <span className="text-[11px] text-[#7A6958]">
              Ready in: {product.leadTime.split(' ')[0]} - {product.leadTime.split(' ')[2]} days
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-serif-luxury text-lg font-bold text-[#2A1D13] leading-snug group-hover:text-[#8B5A2B] transition-colors cursor-pointer line-clamp-2"
          >
            {product.name}
          </h3>

          {/* Dimensions Hint */}
          <div className="flex items-center gap-1.5 text-xs text-[#6B5A4B] line-clamp-1">
            <Ruler className="w-3.5 h-3.5 text-[#8B5A2B] shrink-0" />
            <span className="truncate">{product.dimensions}</span>
          </div>

          {/* Color & Size count preview */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] text-[#5A493B] font-medium bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8DFC8]">
              {product.sizes.length} Sizes
            </span>
            <span className="text-[11px] text-[#5A493B] font-medium bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8DFC8]">
              {product.colors.length} Polish Colors
            </span>
            {/* Swatch dots */}
            <div className="flex items-center -space-x-1 ml-auto">
              {product.colors.slice(0, 4).map((c, i) => (
                <span
                  key={i}
                  className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-[#EFE7DC] space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-[#7A6958] font-medium block">Starting from:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#2A1D13]">
                  {formatRupees(currentPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-[#8C7A6B] line-through">
                    {formatRupees(product.basePrice)}
                  </span>
                )}
              </div>
            </div>
            <span className="text-[11px] text-[#8B5A2B] font-semibold">
              Tax &amp; Polish Included
            </span>
          </div>

          {/* Button actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectProduct(product)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#2C1F14] hover:bg-[#422F1F] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Customize</span>
            </button>

            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                // If user clicks, optionally trigger quick handler
                onQuickWhatsApp(product);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
