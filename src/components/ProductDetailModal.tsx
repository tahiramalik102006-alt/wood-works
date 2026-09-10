import React, { useState, useMemo } from 'react';
import { 
  X, 
  MessageCircle, 
  ShoppingBag, 
  Check, 
  Ruler, 
  Layers, 
  Paintbrush, 
  ShieldCheck, 
  Clock, 
  Package, 
  Info,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Product, StoreSettings } from '../types';
import { formatRupees, generateWhatsAppOrderUrl } from '../utils/storage';

interface ProductDetailModalProps {
  product: Product | null;
  settings: StoreSettings;
  onClose: () => void;
  onAddToCart: (customizedItem: {
    product: Product;
    selectedSize: string;
    selectedWood: string;
    selectedColor: string;
    customNotes: string;
    unitPrice: number;
    quantity: number;
  }) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  settings,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  // Selected gallery image
  const galleryImages = useMemo(() => {
    const list = [product.image, ...(product.gallery || [])];
    return Array.from(new Set(list)).filter(Boolean);
  }, [product]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Customization state
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedWood, setSelectedWood] = useState(product.woodTypes[0] || 'Pure Seasoned Sheesham');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Natural Sheesham Polish');
  const [customNotes, setCustomNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  // Calculate dynamic price based on size and wood
  const baseActivePrice = product.discountPrice ?? product.basePrice;
  const sizePriceDelta = product.sizes[selectedSizeIndex]?.priceDelta || 0;

  // Additional wood type delta if text contains +Rs or -Rs
  const woodPriceDelta = useMemo(() => {
    const matchPlus = selectedWood.match(/\+Rs\.\s*([\d,]+)/i);
    if (matchPlus) return parseInt(matchPlus[1].replace(/,/g, ''), 10);
    const matchMinus = selectedWood.match(/-Rs\.\s*([\d,]+)/i);
    if (matchMinus) return -parseInt(matchMinus[1].replace(/,/g, ''), 10);
    return 0;
  }, [selectedWood]);

  const calculatedUnitPrice = Math.max(1000, baseActivePrice + sizePriceDelta + woodPriceDelta);
  const calculatedTotalPrice = calculatedUnitPrice * quantity;

  const currentSizeObj = product.sizes[selectedSizeIndex] || { name: 'Standard' };

  // Handle Add to Cart
  const handleAddToCartClick = () => {
    onAddToCart({
      product,
      selectedSize: currentSizeObj.name,
      selectedWood,
      selectedColor,
      customNotes,
      unitPrice: calculatedUnitPrice,
      quantity,
    });
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 2500);
  };

  // Direct WhatsApp Link
  const directWhatsAppUrl = generateWhatsAppOrderUrl({
    settings,
    customerName: '',
    customerPhone: '',
    customerCity: '',
    notes: customNotes,
    singleItem: {
      product,
      selectedSize: currentSizeObj.name,
      selectedWood,
      selectedColor,
      customNotes,
      totalPrice: calculatedUnitPrice,
      quantity,
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E3D7C5] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8DFC8] bg-[#F5EFE6]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-[#EADECE] text-[#6B5038] border border-[#D5C6AF]">
              {product.category.replace('-', ' ')}
            </span>
            <span className="text-xs text-[#7A6958] hidden sm:inline-block">
              100% Solid Hardwood Custom Order
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#5C4530] hover:bg-[#E8DFC8] hover:text-[#2A1D13] transition-colors"
            aria-label="Close details"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Column: Image Gallery */}
            <div className="md:col-span-6 space-y-3">
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#2C1F14] border border-[#D9CDB8]">
                <img
                  src={galleryImages[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                  Photo {activeImageIndex + 1} of {galleryImages.length}
                </div>
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#8B5A2B] scale-105 shadow-sm'
                          : 'border-[#D9CDB8] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Specifications Box */}
              <div className="p-4 rounded-xl bg-white border border-[#E8DFC8] space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#2C1F14]">
                  <Ruler className="w-4 h-4 text-[#8B5A2B]" />
                  <span>Dimensions &amp; Measurements</span>
                </div>
                <p className="text-[#5A493B] pl-5 leading-relaxed">{product.dimensions}</p>

                <div className="pt-2 border-t border-[#F2EADB]">
                  <div className="flex items-center gap-1.5 font-bold text-[#2C1F14] mb-1">
                    <Package className="w-4 h-4 text-[#8B5A2B]" />
                    <span>Included in This Set:</span>
                  </div>
                  <ul className="pl-5 space-y-1 text-[#5A493B]">
                    {product.includedPieces.map((piece, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#25D366] shrink-0" />
                        <span>{piece}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-[#F2EADB] flex items-center justify-between text-[11px] text-[#7A6958]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#8B5A2B]" />
                    Making Time: {product.leadTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8B5A2B]" />
                    Termite Proof Guaranteed
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Customization Controls */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <h2 className="font-serif-luxury text-2xl font-bold text-[#2A1D13] leading-snug">
                  {product.name}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#5C4D3F] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-3.5 rounded-xl bg-[#EFE7DC] border border-[#D9CDB8] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#7A6958] font-medium block">Customized Total Price:</span>
                  <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#2A1D13]">
                    {formatRupees(calculatedUnitPrice)}
                  </span>
                  {quantity > 1 && (
                    <span className="text-xs text-[#7A6958] block mt-0.5">
                      ({quantity} units = {formatRupees(calculatedTotalPrice)})
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-[#8B5A2B] bg-white px-2.5 py-1 rounded-md border border-[#D5C6AF] shadow-2xs">
                    Price in PKR (Rs.)
                  </span>
                </div>
              </div>

              {/* Step 1: Sizing Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#8B5A2B]" />
                    1. Select Furniture Size / Variant:
                  </span>
                  <span className="text-[11px] font-medium text-[#8B5A2B] capitalize">
                    {currentSizeObj.name}
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.sizes.map((sz, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-3 text-left rounded-xl border text-xs transition-all ${
                        selectedSizeIndex === idx
                          ? 'border-[#8B5A2B] bg-[#2C1F14] text-white shadow-xs'
                          : 'border-[#D9CDB8] bg-white text-[#4A3C31] hover:border-[#8B5A2B]'
                      }`}
                    >
                      <div className="font-bold">{sz.name}</div>
                      <div className={`text-[11px] mt-0.5 ${selectedSizeIndex === idx ? 'text-[#D4AF37]' : 'text-[#7A6958]'}`}>
                        {sz.priceDelta === 0 
                          ? 'Standard Price' 
                          : sz.priceDelta > 0 
                            ? `+${formatRupees(sz.priceDelta)}` 
                            : `-${formatRupees(Math.abs(sz.priceDelta))}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Wood Material Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#8B5A2B]" />
                    2. Select Wood Species:
                  </span>
                </label>
                <div className="space-y-1.5">
                  {product.woodTypes.map((wood, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedWood(wood)}
                      className={`w-full p-2.5 text-left rounded-xl border text-xs flex items-center justify-between transition-all ${
                        selectedWood === wood
                          ? 'border-[#8B5A2B] bg-[#F2EADB] font-bold text-[#2C1F14]'
                          : 'border-[#D9CDB8] bg-white text-[#5A493B] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <span>{wood}</span>
                      {selectedWood === wood && (
                        <Check className="w-4 h-4 text-[#8B5A2B]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Polish / Color Finish Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Paintbrush className="w-3.5 h-3.5 text-[#8B5A2B]" />
                    3. Polish Color &amp; Finish:
                  </span>
                  <span className="text-[11px] font-semibold text-[#8B5A2B]">
                    {selectedColor}
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(c.name)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                        selectedColor === c.name
                          ? 'border-[#8B5A2B] bg-white shadow-xs ring-2 ring-[#8B5A2B]/20'
                          : 'border-[#D9CDB8] bg-white/70 hover:bg-white text-[#5A493B]'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-black/20 shrink-0 shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#2A1D13] truncate">{c.name}</p>
                        <p className="text-[10px] text-[#7A6958] truncate">{c.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Custom Notes / Sizing adjustments */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider flex items-center justify-between">
                  <span>4. Custom Instructions / Room Specifics:</span>
                  <span className="text-[10px] font-normal text-[#8C7A6B]">Optional</span>
                </label>
                <textarea
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. Please make bed height 18 inches, headboard velvet color in beige cream, need key lock on right side table..."
                  className="w-full p-2.5 rounded-xl bg-white border border-[#D9CDB8] text-xs text-[#2C1F14] placeholder-[#8C7A6B] focus:outline-hidden focus:ring-2 focus:ring-[#8B5A2B]"
                />
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center gap-2 bg-white border border-[#D9CDB8] rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg bg-[#FAF7F2] text-[#2C1F14] hover:bg-[#E8DFC8] font-bold text-sm flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[#2C1F14]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-[#FAF7F2] text-[#2C1F14] hover:bg-[#E8DFC8] font-bold text-sm flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Modal Footer / Action Bar */}
        <div className="p-4 sm:p-5 border-t border-[#E8DFC8] bg-[#F5EFE6] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left w-full sm:w-auto">
            <span className="text-[11px] text-[#7A6958] font-medium block">Total Estimate (Rupees):</span>
            <span className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#2C1F14]">
              {formatRupees(calculatedTotalPrice)}
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCartClick}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-[#2C1F14] hover:bg-[#422F1F] text-[#F3ECE2] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span>{addedToast ? 'Added to Cart!' : 'Add to Cart'}</span>
            </button>

            {/* Direct WhatsApp Order Button */}
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Order via WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Toast confirmation */}
        {addedToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#2C1F14] text-[#E8DFC8] px-4 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2 border border-[#D4AF37] animate-bounce">
            <Check className="w-4 h-4 text-[#25D366]" />
            <span>Customized item added to your Cart!</span>
          </div>
        )}
      </div>
    </div>
  );
};
