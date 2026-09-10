import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  MessageCircle, 
  ShoppingBag, 
  ArrowRight, 
  MapPin, 
  Phone, 
  User, 
  FileText, 
  CheckCircle2, 
  Truck,
  ShieldCheck
} from 'lucide-react';
import { CartItem, StoreSettings } from '../types';
import { formatRupees, generateWhatsAppOrderUrl, saveStoredInquiry } from '../utils/storage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  settings: StoreSettings;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  settings,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('Lahore');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [lastOrderUrl, setLastOrderUrl] = useState('');

  if (!isOpen) return null;

  const grandTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleCheckoutToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const orderUrl = generateWhatsAppOrderUrl({
      settings,
      customerName,
      customerPhone,
      customerCity,
      deliveryAddress,
      notes: orderNotes,
      cartItems: cart,
    });

    // Save inquiry to storage for admin tracking
    saveStoredInquiry({
      id: 'ORD-' + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString('en-PK', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customerName: customerName || 'Valued Customer',
      customerPhone: customerPhone || 'Not provided',
      customerCity: customerCity || 'Not specified',
      deliveryAddress: deliveryAddress || 'Pending confirmation',
      items: [...cart],
      totalAmount: grandTotal,
      notes: orderNotes,
      status: 'Inquired',
    });

    setLastOrderUrl(orderUrl);
    setOrderSuccess(true);
    onClearCart();

    // Open WhatsApp in new tab
    window.open(orderUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-lg bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#E3D7C5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DFC8] bg-[#F5EFE6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8B5A2B]" />
            <h2 className="font-serif-luxury text-lg font-bold text-[#2C1F14]">
              Your Furniture Cart ({cart.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#5A493B] hover:bg-[#E8DFC8] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {orderSuccess ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#2C1F14]">
                Order Dispatched to WhatsApp!
              </h3>
              <p className="text-sm text-[#5A493B] max-w-sm mx-auto leading-relaxed">
                Thank you! Your customized furniture order specifications have been forwarded to {settings.businessName} on WhatsApp.
              </p>
              <div className="p-4 rounded-xl bg-white border border-[#E8DFC8] text-xs text-left space-y-2 text-[#4A3C31]">
                <p><strong>Customer:</strong> {customerName}</p>
                <p><strong>City / Delivery:</strong> {customerCity} - {deliveryAddress}</p>
                <p><strong>WhatsApp Support:</strong> {settings.phoneDisplay}</p>
              </div>
              <div className="pt-2 space-y-2">
                <a
                  href={lastOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Re-open WhatsApp Chat</span>
                </a>
                <button
                  onClick={() => {
                    setOrderSuccess(false);
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#2C1F14] text-white text-xs font-semibold"
                >
                  Continue Browsing Furniture
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#EADECE] flex items-center justify-center mx-auto text-[#8B5A2B]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#2C1F14]">
                Your Cart is Empty
              </h3>
              <p className="text-xs text-[#7A6958] max-w-xs mx-auto">
                Select any bed set, wardrobe, or custom woodwork to customize size, wood type, and polish shades.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#2C1F14] text-white text-xs font-semibold shadow-xs"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3.5 rounded-xl bg-white border border-[#E8DFC8] space-y-2.5 shadow-2xs"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-16 h-16 rounded-lg object-cover bg-[#2C1F14] shrink-0 border border-[#D9CDB8]"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif-luxury text-sm font-bold text-[#2C1F14] leading-snug line-clamp-2">
                            {item.productName}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.cartItemId)}
                            className="text-[#8C7A6B] hover:text-[#B91C1C] p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs font-bold text-[#8B5A2B] mt-0.5">
                          {formatRupees(item.unitPrice)} each
                        </p>
                      </div>
                    </div>

                    {/* Custom specifications tags */}
                    <div className="bg-[#FAF7F2] p-2 rounded-lg text-[11px] space-y-1 border border-[#EFE7DC] text-[#4A3C31]">
                      <div className="flex items-center justify-between">
                        <span className="text-[#7A6958]">Size:</span>
                        <span className="font-semibold text-right">{item.selectedSize}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#7A6958]">Wood:</span>
                        <span className="font-semibold text-right">{item.selectedWood}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#7A6958]">Finish:</span>
                        <span className="font-semibold text-right">{item.selectedColor}</span>
                      </div>
                      {item.customNotes && (
                        <div className="pt-1 border-t border-[#EFE7DC] text-[#6B5038] italic">
                          "{item.customNotes}"
                        </div>
                      )}
                    </div>

                    {/* Quantity and Subtotal */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#D9CDB8] rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 rounded bg-white text-[#2C1F14] hover:bg-[#E8DFC8] font-bold text-xs flex items-center justify-center shadow-2xs"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#2C1F14]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-white text-[#2C1F14] hover:bg-[#E8DFC8] font-bold text-xs flex items-center justify-center shadow-2xs"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif-luxury font-bold text-sm text-[#2C1F14]">
                        {formatRupees(item.totalPrice)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Form for WhatsApp */}
              <form onSubmit={handleCheckoutToWhatsApp} className="p-4 rounded-xl bg-white border border-[#E8DFC8] space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C1F14] uppercase tracking-wider pb-1 border-b border-[#F2EADB]">
                  <Phone className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  <span>Customer Details for WhatsApp Confirmation:</span>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#5A493B] flex items-center gap-1">
                    <User className="w-3 h-3 text-[#8B5A2B]" />
                    Your Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-3 py-2 rounded-lg bg-[#FAF7F2] border border-[#D9CDB8] text-xs text-[#2C1F14] placeholder-[#8C7A6B] focus:outline-hidden focus:ring-1 focus:ring-[#8B5A2B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#5A493B] flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#8B5A2B]" />
                    WhatsApp Number:
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 0300 1234567"
                    className="w-full px-3 py-2 rounded-lg bg-[#FAF7F2] border border-[#D9CDB8] text-xs text-[#2C1F14] placeholder-[#8C7A6B] focus:outline-hidden focus:ring-1 focus:ring-[#8B5A2B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-[#5A493B] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8B5A2B]" />
                      Delivery City:
                    </label>
                    <select
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      className="w-full px-2 py-2 rounded-lg bg-[#FAF7F2] border border-[#D9CDB8] text-xs text-[#2C1F14] focus:outline-hidden focus:ring-1 focus:ring-[#8B5A2B]"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad / Rawalpindi">Islamabad / Rawalpindi</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Gujrat">Gujrat</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Other City (Pakistan)">Other City</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-[#5A493B]">
                      Delivery Sector/Area:
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. DHA Phase 5, House 12"
                      className="w-full px-2 py-2 rounded-lg bg-[#FAF7F2] border border-[#D9CDB8] text-xs text-[#2C1F14] placeholder-[#8C7A6B] focus:outline-hidden focus:ring-1 focus:ring-[#8B5A2B]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#5A493B] flex items-center gap-1">
                    <FileText className="w-3 h-3 text-[#8B5A2B]" />
                    Additional Notes / Delivery Deadline:
                  </label>
                  <textarea
                    rows={2}
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Need delivery before wedding date next month, call before dispatch..."
                    className="w-full p-2 rounded-lg bg-[#FAF7F2] border border-[#D9CDB8] text-xs text-[#2C1F14] placeholder-[#8C7A6B] focus:outline-hidden focus:ring-1 focus:ring-[#8B5A2B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Order to WhatsApp ({formatRupees(grandTotal)})</span>
                </button>
              </form>

              {/* Guarantees */}
              <div className="p-3 rounded-xl bg-[#F2EADB] border border-[#D9CEBA] flex items-center justify-between text-[11px] text-[#5A493B]">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  Safe Door-step Delivery
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  Advance Confirmation via WhatsApp
                </span>
              </div>
            </>
          )}
        </div>

        {/* Bottom Total Bar when cart has items and not yet submitted */}
        {!orderSuccess && cart.length > 0 && (
          <div className="p-4 border-t border-[#E8DFC8] bg-[#F5EFE6] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#7A6958] font-medium">Grand Total (Rupees):</span>
              <p className="font-serif-luxury text-2xl font-bold text-[#2C1F14]">
                {formatRupees(grandTotal)}
              </p>
            </div>
            <button
              onClick={onClearCart}
              className="text-xs text-[#8C7A6B] hover:text-[#B91C1C] underline font-medium"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
