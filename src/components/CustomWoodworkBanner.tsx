import React, { useState } from 'react';
import { 
  Hammer, 
  MessageCircle, 
  Ruler, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  PhoneCall,
  Image as ImageIcon
} from 'lucide-react';
import { StoreSettings } from '../types';

interface CustomWoodworkBannerProps {
  settings: StoreSettings;
}

export const CustomWoodworkBanner: React.FC<CustomWoodworkBannerProps> = ({ settings }) => {
  const [roomType, setRoomType] = useState('Master Bedroom');
  const [dimensions, setDimensions] = useState('');
  const [woodChoice, setWoodChoice] = useState('Pure Solid Sheesham');
  const [specialNeeds, setSpecialNeeds] = useState('');

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');

  const handleSendCustomInquiry = (e: React.FormEvent) => {
    e.preventDefault();

    let text = `*CUSTOM WOODWORK INQUIRY - ${settings.businessName.toUpperCase()}*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `🛋️ *Room / Furniture Type:* ${roomType}\n`;
    text += `🪵 *Preferred Wood Material:* ${woodChoice}\n`;
    if (dimensions) {
      text += `📐 *Estimated Dimensions:* ${dimensions}\n`;
    }
    if (specialNeeds) {
      text += `📝 *Design Requirements / Notes:*\n"${specialNeeds}"\n`;
    }
    text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Hello ${settings.businessName}, I have attached / would like to discuss my custom furniture requirement and need a price estimate in Rupees.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="my-14 bg-gradient-to-r from-[#2C1F14] via-[#3A291A] to-[#251A10] rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 text-white relative">
      {/* Texture Accent */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A3222] text-[#D4AF37] text-xs font-semibold border border-[#D4AF37]/40">
              <Hammer className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Bespoke Architectural Woodcraft</span>
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-[#F3ECE2] leading-tight">
              Have a Custom Furniture Design or Pinterest Photo?
            </h2>

            <p className="text-sm sm:text-base text-[#D5C6AF] leading-relaxed">
              At <strong className="text-white font-semibold">Aslam Wood Works</strong>, our master artisans manufacture any custom bed set, fitted wardrobe, luxury dining table, or media wall precisely to your room dimensions and polish shade.
            </p>

            <div className="space-y-2 pt-2 text-xs text-[#E8DFC8]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Bring your own CAD drawing, Pinterest photo, or rough sketch</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>On-site space measurement &amp; wood seasoning consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Instant WhatsApp quote in Pakistani Rupees (PKR)</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366] flex items-center justify-center text-[#25D366]">
                <MessageCircle className="w-5 h-5 fill-[#25D366]" />
              </div>
              <div className="text-xs">
                <span className="text-[#C4B5A5] block">Direct Workshop Master Line:</span>
                <span className="text-sm font-bold text-white">{settings.phoneDisplay}</span>
              </div>
            </div>
          </div>

          {/* Right: Quick Custom Consultation Form */}
          <div className="lg:col-span-6">
            <form
              onSubmit={handleSendCustomInquiry}
              className="bg-[#FAF7F2] text-[#2C1F14] p-6 sm:p-7 rounded-2xl shadow-xl border border-[#D9CDB8] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-3">
                <h3 className="font-serif-luxury text-lg font-bold text-[#2C1F14]">
                  Request Custom Woodwork Quote
                </h3>
                <span className="text-[11px] font-bold text-[#8B5A2B] bg-[#F5EFE6] px-2 py-0.5 rounded">
                  Direct WhatsApp Response
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                    Furniture Type:
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9CDB8] text-xs text-[#2C1F14] focus:outline-hidden focus:ring-1 focus:ring-[#8B5A2B]"
                  >
                    <option value="Master Bedroom Bed Set">Master Bedroom Bed Set</option>
                    <option value="Custom Built-in Wardrobe">Custom Built-in Wardrobe</option>
                    <option value="Solid Dining Table & Chairs">Solid Dining Table &amp; Chairs</option>
                    <option value="TV Feature Slatted Wall">TV Feature Slatted Wall</option>
                    <option value="Living Room Luxury Sofa Set">Living Room Luxury Sofa Set</option>
                    <option value="Entryway Vanity / Console">Entryway Vanity / Console</option>
                    <option value="Complete Home Woodwork">Complete Home Woodwork</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                    Preferred Wood:
                  </label>
                  <select
                    value={woodChoice}
                    onChange={(e) => setWoodChoice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9CDB8] text-xs text-[#2C1F14] focus:outline-hidden focus:ring-1 focus:ring-[#8B5A2B]"
                  >
                    <option value="Pure Seasoned Sheesham (Indian Rosewood)">Pure Seasoned Sheesham</option>
                    <option value="Imported Burma Teak Wood">Imported Burma Teak Wood</option>
                    <option value="Solid Walnut Ash Wood">Solid Walnut Ash Wood</option>
                    <option value="Seasoned Acacia (Kikar)">Seasoned Acacia (Kikar)</option>
                    <option value="Need Recommendation by Artisan">Need Recommendation by Artisan</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider flex items-center justify-between">
                  <span>Room or Furniture Dimensions:</span>
                  <span className="text-[10px] text-[#8C7A6B]">Optional</span>
                </label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="e.g. Wall size 12x10 ft, or Bed size 6.5x6 ft"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9CDB8] text-xs text-[#2C1F14] placeholder-[#8C7A6B] focus:outline-hidden focus:ring-1 focus:ring-[#8B5A2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                  Specific Requirements or Photo Link:
                </label>
                <textarea
                  rows={2}
                  value={specialNeeds}
                  onChange={(e) => setSpecialNeeds(e.target.value)}
                  placeholder="e.g. I have a reference photo on my phone to send, want dark walnut deco finish..."
                  className="w-full p-2.5 rounded-xl bg-white border border-[#D9CDB8] text-xs text-[#2C1F14] placeholder-[#8C7A6B] focus:outline-hidden focus:ring-1 focus:ring-[#8B5A2B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Discuss Custom Order on WhatsApp</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
