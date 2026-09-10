import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Upload, 
  Trash2, 
  Edit3, 
  Save, 
  Image as ImageIcon, 
  Check, 
  Phone, 
  Settings, 
  Package, 
  ShoppingBag, 
  RotateCcw,
  Eye,
  EyeOff,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  DollarSign,
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  Tag,
  Sparkles,
  Flame,
  Percent,
  Bell
} from 'lucide-react';
import { Product, StoreSettings, OrderInquiry, ProductSize, ProductColor } from '../types';
import { formatRupees, getStoredInquiries } from '../utils/storage';
import { CATEGORIES } from '../data/furnitureData';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  settings: StoreSettings;
  onSaveProducts: (products: Product[]) => void;
  onSaveSettings: (settings: StoreSettings) => void;
  onResetProducts: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  products,
  settings,
  onSaveProducts,
  onSaveSettings,
  onResetProducts,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'add-product' | 'sale' | 'settings' | 'inquiries'>('products');
  const [inquiries, setInquiries] = useState<OrderInquiry[]>(() => getStoredInquiries());

  // Editing state for an existing product
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // New product form state
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Product['category']>('bed-sets');
  const [formBasePrice, setFormBasePrice] = useState<number>(150000);
  const [formDiscountPrice, setFormDiscountPrice] = useState<string>('');
  const [formImage, setFormImage] = useState<string>('');
  const [formGallery, setFormGallery] = useState<string[]>([]);
  const [formDescription, setFormDescription] = useState('');
  const [formDimensions, setFormDimensions] = useState('Standard Size: 6.5 ft (L) x 6 ft (W)');
  const [formLeadTime, setFormLeadTime] = useState('14 to 18 Working Days');
  const [formWoodTypes, setFormWoodTypes] = useState('Pure Seasoned Sheesham, Solid Teak Wood, Kikar Solid Wood');
  const [formIncluded, setFormIncluded] = useState('1x Bed Frame, 2x Side Tables, Heavy Slats Support');
  const [formIsFeatured, setFormIsFeatured] = useState(true);

  // Sizes for the form
  const [formSizes, setFormSizes] = useState<ProductSize[]>([
    { name: 'King Size (6 x 6.5 ft)', priceDelta: 0, label: 'Master King (6x6.5 ft)' },
    { name: 'Queen Size (5 x 6.5 ft)', priceDelta: -12000, label: 'Standard Queen (5x6.5 ft)' },
    { name: 'Single Bed (3.5 x 6.5 ft)', priceDelta: -45000, label: 'Single (3.5x6.5 ft)' }
  ]);

  // Colors for the form
  const [formColors, setFormColors] = useState<ProductColor[]>([
    { name: 'Natural Sheesham Polish', hex: '#8B4513', desc: 'Raw grain satin finish' },
    { name: 'Dark Walnut Semi-Gloss', hex: '#3E2723', desc: 'Rich espresso brown' },
    { name: 'Antique Deco Rosewood', hex: '#4A1515', desc: 'Royal traditional red-brown' },
    { name: 'Modern Matte Charcoal', hex: '#262626', desc: 'Contemporary minimalist finish' }
  ]);

  // Store settings form state
  const [settingsBusinessName, setSettingsBusinessName] = useState(settings.businessName);
  const [settingsWhatsapp, setSettingsWhatsapp] = useState(settings.whatsappNumber);
  const [settingsPhoneDisplay, setSettingsPhoneDisplay] = useState(settings.phoneDisplay);
  const [settingsAddress, setSettingsAddress] = useState(settings.address);
  const [settingsTagline, setSettingsTagline] = useState(settings.tagline);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // OCCASION SALE & PROMOTIONS STATE
  const [isSaleActive, setIsSaleActive] = useState<boolean>(settings.isSaleActive ?? false);
  const [saleTitle, setSaleTitle] = useState(settings.saleTitle || 'Special Occasion Sale');
  const [saleDiscountPercentage, setSaleDiscountPercentage] = useState<number>(settings.saleDiscountPercentage || 15);
  const [saleBannerText, setSaleBannerText] = useState(settings.saleBannerText || 'Special Occasion Sale: Flat 15% OFF on all handcrafted furniture! Order directly via WhatsApp.');
  const [saleTagline, setSaleTagline] = useState(settings.saleTagline || 'Limited Time Occasion Offer');
  const [saleSavedToast, setSaleSavedToast] = useState(false);

  // Sync settings when modified externally
  useEffect(() => {
    setIsSaleActive(settings.isSaleActive ?? false);
    setSaleTitle(settings.saleTitle || 'Special Occasion Sale');
    setSaleDiscountPercentage(settings.saleDiscountPercentage || 15);
    setSaleBannerText(settings.saleBannerText || 'Special Occasion Sale: Flat 15% OFF on all handcrafted furniture! Order directly via WhatsApp.');
    setSaleTagline(settings.saleTagline || 'Limited Time Occasion Offer');
    setSettingsBusinessName(settings.businessName);
    setSettingsWhatsapp(settings.whatsappNumber);
    setSettingsPhoneDisplay(settings.phoneDisplay);
    setSettingsAddress(settings.address);
    setSettingsTagline(settings.tagline);
  }, [settings]);

  // OWNER AUTHENTICATION STATE (Strictly limited to owner)
  const OWNER_PIN_STORAGE_KEY = 'aslam_wood_works_owner_pin_v1';
  const getStoredPin = () => localStorage.getItem(OWNER_PIN_STORAGE_KEY) || 'aslam123';

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('aslam_owner_session_auth') === 'true';
  });
  const [enteredPin, setEnteredPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [pinError, setPinError] = useState<string | null>(null);

  // Passcode change inside Settings tab
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState<string | null>(null);
  const [pinChangeError, setPinChangeError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle owner unlock
  const handleOwnerUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getStoredPin();
    if (enteredPin.trim() === correctPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('aslam_owner_session_auth', 'true');
      setPinError(null);
      setEnteredPin('');
    } else {
      setPinError('Incorrect owner passcode. Access denied.');
    }
  };

  const handleOwnerLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('aslam_owner_session_auth');
    setEnteredPin('');
    setPinError(null);
  };

  const handleChangeOwnerPin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinChangeError(null);
    setPinChangeSuccess(null);
    const correctPin = getStoredPin();

    if (currentPinInput !== correctPin) {
      setPinChangeError('Current passcode is incorrect.');
      return;
    }
    if (!newPinInput || newPinInput.length < 4) {
      setPinChangeError('New passcode must be at least 4 characters long.');
      return;
    }
    if (newPinInput !== confirmPinInput) {
      setPinChangeError('New passcodes do not match.');
      return;
    }

    localStorage.setItem(OWNER_PIN_STORAGE_KEY, newPinInput);
    setPinChangeSuccess('Owner passcode successfully updated! Keep this safe.');
    setCurrentPinInput('');
    setNewPinInput('');
    setConfirmPinInput('');
  };

  // Handle local image file upload converting to Base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 4MB)
    if (file.size > 4 * 1024 * 1024) {
      alert('Image is too large. Please select an image under 4MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (isGallery) {
        setFormGallery(prev => [...prev, base64]);
      } else {
        setFormImage(base64);
        if (!formGallery.includes(base64)) {
          setFormGallery(prev => [base64, ...prev]);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle saving new or edited product
  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const finalImage = formImage.trim() || 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85';
    const finalGallery = formGallery.length > 0 ? formGallery : [finalImage];

    const woodArray = formWoodTypes
      .split(',')
      .map(w => w.trim())
      .filter(Boolean);

    const includedArray = formIncluded
      .split(',')
      .map(p => p.trim())
      .filter(Boolean);

    if (editingProductId) {
      // Update existing
      const updated = products.map(p => {
        if (p.id === editingProductId) {
          return {
            ...p,
            name: formName,
            category: formCategory,
            basePrice: Number(formBasePrice),
            discountPrice: formDiscountPrice ? Number(formDiscountPrice) : undefined,
            image: finalImage,
            gallery: finalGallery,
            description: formDescription,
            dimensions: formDimensions,
            leadTime: formLeadTime,
            woodTypes: woodArray.length ? woodArray : p.woodTypes,
            includedPieces: includedArray.length ? includedArray : p.includedPieces,
            sizes: formSizes,
            colors: formColors,
            isFeatured: formIsFeatured,
          };
        }
        return p;
      });
      onSaveProducts(updated);
      alert('Furniture product updated successfully!');
    } else {
      // Create new
      const newProduct: Product = {
        id: 'aww-custom-' + Date.now().toString().slice(-6),
        name: formName,
        category: formCategory,
        basePrice: Number(formBasePrice),
        discountPrice: formDiscountPrice ? Number(formDiscountPrice) : undefined,
        image: finalImage,
        gallery: finalGallery,
        description: formDescription || 'Premium solid wood craftsmanship by Aslam Wood Works.',
        dimensions: formDimensions,
        leadTime: formLeadTime,
        woodTypes: woodArray.length ? woodArray : ['100% Solid Seasoned Sheesham'],
        includedPieces: includedArray.length ? includedArray : ['Solid Wood Frame and Fittings'],
        sizes: formSizes,
        colors: formColors,
        isFeatured: formIsFeatured,
        isNew: true,
        rating: 5.0,
        reviewsCount: 1,
      };
      onSaveProducts([newProduct, ...products]);
      alert('New furniture added! Customers can now view and order it on WhatsApp.');
    }

    resetProductForm();
    setActiveTab('products');
  };

  const resetProductForm = () => {
    setEditingProductId(null);
    setFormName('');
    setFormCategory('bed-sets');
    setFormBasePrice(150000);
    setFormDiscountPrice('');
    setFormImage('');
    setFormGallery([]);
    setFormDescription('');
    setFormDimensions('Standard Size: 6.5 ft (L) x 6 ft (W)');
    setFormLeadTime('14 to 18 Working Days');
    setFormWoodTypes('Pure Seasoned Sheesham, Solid Teak Wood, Kikar Solid Wood');
    setFormIncluded('1x Bed Frame, 2x Side Tables, Heavy Slats Support');
    setFormIsFeatured(true);
  };

  const startEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormBasePrice(p.basePrice);
    setFormDiscountPrice(p.discountPrice ? String(p.discountPrice) : '');
    setFormImage(p.image);
    setFormGallery(p.gallery || [p.image]);
    setFormDescription(p.description);
    setFormDimensions(p.dimensions);
    setFormLeadTime(p.leadTime);
    setFormWoodTypes(p.woodTypes.join(', '));
    setFormIncluded(p.includedPieces.join(', '));
    setFormSizes(p.sizes);
    setFormColors(p.colors);
    setFormIsFeatured(p.isFeatured ?? false);
    setActiveTab('add-product');
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from the catalog?`)) {
      const filtered = products.filter(p => p.id !== id);
      onSaveProducts(filtered);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      ...settings,
      businessName: settingsBusinessName,
      whatsappNumber: settingsWhatsapp,
      phoneDisplay: settingsPhoneDisplay,
      address: settingsAddress,
      tagline: settingsTagline,
      isSaleActive,
      saleTitle,
      saleDiscountPercentage: Number(saleDiscountPercentage),
      saleBannerText,
      saleTagline,
    });
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 2500);
  };

  const handleSaveSaleSettings = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSaveSettings({
      ...settings,
      isSaleActive,
      saleTitle,
      saleDiscountPercentage: Number(saleDiscountPercentage),
      saleBannerText,
      saleTagline,
    });
    setSaleSavedToast(true);
    setTimeout(() => setSaleSavedToast(false), 2500);
  };

  const handleQuickToggleSale = (newStatus: boolean) => {
    setIsSaleActive(newStatus);
    onSaveSettings({
      ...settings,
      isSaleActive: newStatus,
      saleTitle,
      saleDiscountPercentage: Number(saleDiscountPercentage),
      saleBannerText,
      saleTagline,
    });
    setSaleSavedToast(true);
    setTimeout(() => setSaleSavedToast(false), 2500);
  };

  const OCCASION_PRESETS = [
    {
      title: 'Eid-ul-Fitr Grand Woodcraft Sale',
      discount: 15,
      banner: '🌙 Eid-ul-Fitr Mubarak! Flat 15% OFF On All Solid Sheesham & Teak Wood Furniture + Free White-Glove Delivery.',
      tagline: 'Festive Eid Blessings & Solid Wood Craft',
      badge: '🌙 Eid Special'
    },
    {
      title: 'Eid-ul-Adha Heritage Timber Festival',
      discount: 15,
      banner: '✨ Eid-ul-Adha Special: Flat 15% OFF on Living Room Sets, Dining Tables & Custom Media Walls.',
      tagline: 'Pure Seasoned Timber Celebration',
      badge: '✨ Bari Eid Offer'
    },
    {
      title: 'Royal Bridal & Wedding Season Package',
      discount: 20,
      banner: '💍 Royal Wedding Season Special: 20% OFF on Full Bridal Bedroom Sets, Dressing Consoles & Master Wardrobes.',
      tagline: 'Heirloom Furniture for Your New Beginning',
      badge: '💍 Bridal Package'
    },
    {
      title: 'Pakistan Day & Independence Fest',
      discount: 14,
      banner: '🇵🇰 Special National Fest: Flat 14% OFF on 100% Genuine Handcrafted Pakistani Sheesham Furniture.',
      tagline: 'Proudly Handcrafted in Pakistan',
      badge: '🇵🇰 National Day'
    },
    {
      title: 'Winter Luxury Wood Showcase',
      discount: 25,
      banner: '❄️ Winter Special Offer: Up to 25% OFF on Artisan Solid Wood Sofa Lounges, Bed Sets & TV Media Walls.',
      tagline: 'Warm Timber for Cozy Winter Living',
      badge: '❄️ Winter Special'
    },
    {
      title: 'Workshop Direct Craft Benefit',
      discount: 10,
      banner: '🪵 Direct From Artisan Workshop: 10% Instant Benefit on all in-stock Handcrafted Pieces.',
      tagline: 'Zero Middlemen, Pure Timber Quality',
      badge: '🪵 Workshop Direct'
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <div 
          className="relative w-full max-w-md bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#D5C6AF] overflow-hidden p-6 sm:p-8 space-y-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2C1F14] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-luxury text-lg font-bold text-[#2C1F14]">
                  Owner Access Only
                </h2>
                <p className="text-[11px] text-[#7A6958]">
                  {settings.businessName} Security
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#8C7A6B] hover:text-[#2C1F14] hover:bg-[#EADECE] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#F4EDE2] border border-[#E3D7C5] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2C1F14]">
              <ShieldAlert className="w-4 h-4 text-[#8B5A2B]" />
              <span>Restricted Workshop Portal</span>
            </div>
            <p className="text-xs text-[#6B5A4B] leading-relaxed">
              This admin area is restricted exclusively to the workshop owner to upload real furniture photos, update prices, and manage WhatsApp orders.
            </p>
          </div>

          <form onSubmit={handleOwnerUnlock} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="owner-pin-input" className="block text-xs font-bold uppercase tracking-wider text-[#2C1F14]">
                Enter Owner Passcode:
              </label>
              <div className="relative">
                <input
                  id="owner-pin-input"
                  type={showPin ? 'text' : 'password'}
                  required
                  autoFocus
                  value={enteredPin}
                  onChange={(e) => {
                    setEnteredPin(e.target.value);
                    if (pinError) setPinError(null);
                  }}
                  placeholder="Enter passcode..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9CDB8] text-sm text-[#2C1F14] focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] font-mono tracking-wider pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7A6B] hover:text-[#2C1F14] p-1"
                  tabIndex={-1}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {pinError && (
                <p className="text-xs text-red-600 font-semibold flex items-center gap-1 mt-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {pinError}
                </p>
              )}
            </div>

            <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFC8] text-[11px] text-[#7A6958]">
              <span className="font-semibold text-[#2C1F14]">Default owner passcode:</span> <code className="bg-[#EADECE] px-1.5 py-0.5 rounded font-mono text-[#2C1F14]">aslam123</code> (You can change this in Settings once unlocked).
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-white border border-[#D9CDB8] text-xs font-semibold text-[#5A493B] hover:bg-[#F5EFE6] transition-colors"
              >
                Back to Showroom
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#2C1F14] hover:bg-[#422F1F] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Unlock className="w-4 h-4 text-[#D4AF37]" />
                <span>Unlock Portal</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E3D7C5] overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DFC8] bg-[#2C1F14] text-[#E8DFC8]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#4A3222] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-white">
                {settings.businessName} — Admin Management Portal
              </h2>
              <p className="text-[11px] text-[#C4B5A5]">
                Add real furniture pictures, update prices in Rupees, and manage WhatsApp orders
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#4A3222] text-[#D4AF37] text-[11px] font-semibold border border-[#D4AF37]/30">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Owner Mode</span>
            </span>
            <button
              onClick={handleOwnerLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#3A291A] text-[#E8DFC8] hover:bg-[#4A3222] hover:text-white transition-colors"
              title="Lock admin portal"
            >
              <LogOut className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Lock Portal</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#C4B5A5] hover:text-white hover:bg-[#4A3222] transition-colors"
              aria-label="Close admin portal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-[#E8DFC8] bg-[#F5EFE6] overflow-x-auto no-scrollbar">
          <button
            onClick={() => {
              setActiveTab('products');
              setEditingProductId(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'products'
                ? 'bg-[#2C1F14] text-white shadow-xs'
                : 'text-[#5A493B] hover:bg-[#EADECE]'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Manage Furniture Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => {
              if (!editingProductId) resetProductForm();
              setActiveTab('add-product');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'add-product'
                ? 'bg-[#2C1F14] text-white shadow-xs'
                : 'text-[#5A493B] hover:bg-[#EADECE]'
            }`}
          >
            <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{editingProductId ? 'Edit Furniture' : 'Add New Furniture with Real Photos'}</span>
          </button>

          <button
            onClick={() => setActiveTab('sale')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'sale'
                ? 'bg-gradient-to-r from-[#B91C1C] to-[#991B1B] text-white shadow-md'
                : isSaleActive
                ? 'bg-red-50 text-red-800 border border-red-300 hover:bg-red-100'
                : 'text-[#5A493B] hover:bg-[#EADECE]'
            }`}
          >
            <Tag className={`w-3.5 h-3.5 ${activeTab === 'sale' ? 'text-[#D4AF37]' : isSaleActive ? 'text-red-600' : 'text-[#8B5A2B]'}`} />
            <span>Occasion Sale &amp; Benefits {isSaleActive ? `(${saleDiscountPercentage}% ON)` : '(OFF)'}</span>
            {isSaleActive && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-[#2C1F14] text-white shadow-xs'
                : 'text-[#5A493B] hover:bg-[#EADECE]'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>WhatsApp &amp; Store Setup</span>
          </button>

          <button
            onClick={() => {
              setInquiries(getStoredInquiries());
              setActiveTab('inquiries');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'inquiries'
                ? 'bg-[#2C1F14] text-white shadow-xs'
                : 'text-[#5A493B] hover:bg-[#EADECE]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>WhatsApp Orders Log ({inquiries.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: PRODUCT LIST */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E8DFC8]">
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-[#2C1F14]">
                    Active Furniture Showroom Items
                  </h3>
                  <p className="text-xs text-[#7A6958]">
                    All items visible to customers with pricing in Rupees and WhatsApp order buttons.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      resetProductForm();
                      setActiveTab('add-product');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload New Furniture</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Restore default Aslam Wood Works furniture catalog?')) {
                        onResetProducts();
                      }
                    }}
                    className="px-3 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECE] text-[#5A493B] border border-[#D9CDB8] text-xs font-medium flex items-center gap-1"
                    title="Reset to factory catalog"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span className="hidden sm:inline">Reset Defaults</span>
                  </button>
                </div>
              </div>

              {/* Products Table / Grid */}
              <div className="grid grid-cols-1 gap-3">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-4 rounded-xl bg-white border border-[#E8DFC8] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs hover:border-[#8B5A2B]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-20 h-20 rounded-lg object-cover bg-[#2C1F14] shrink-0 border border-[#D9CDB8]"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5EFE6] text-[#8B5A2B]">
                            {prod.category.replace('-', ' ')}
                          </span>
                          {prod.isFeatured && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#2C1F14] text-[#D4AF37]">
                              Featured
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif-luxury text-sm font-bold text-[#2C1F14] truncate mt-0.5">
                          {prod.name}
                        </h4>
                        <p className="text-xs text-[#7A6958] truncate">
                          {prod.woodTypes[0]} • {prod.sizes.length} sizes • {prod.colors.length} colors
                        </p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm font-bold text-[#2C1F14]">
                            {formatRupees(prod.discountPrice ?? prod.basePrice)}
                          </span>
                          {prod.discountPrice && (
                            <span className="text-xs text-[#8C7A6B] line-through">
                              {formatRupees(prod.basePrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-[#F2EADB]">
                      <button
                        onClick={() => startEditProduct(prod)}
                        className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#E8DFC8] border border-[#D9CDB8] text-xs font-semibold text-[#2C1F14] flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#8B5A2B]" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id, prod.name)}
                        className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-semibold text-red-700 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ADD OR EDIT PRODUCT */}
          {activeTab === 'add-product' && (
            <form onSubmit={handleSubmitProduct} className="space-y-6 max-w-3xl mx-auto">
              <div className="border-b border-[#E8DFC8] pb-3">
                <h3 className="font-serif-luxury text-xl font-bold text-[#2C1F14]">
                  {editingProductId ? 'Edit Furniture Piece' : 'Add New Furniture to Showroom'}
                </h3>
                <p className="text-xs text-[#7A6958]">
                  Upload real furniture photos from your phone/computer, set price in Rupees, and configure custom sizes.
                </p>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                    Furniture Name / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Royal Sheesham King Bed Set with Carved Headboard"
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D9CDB8] text-xs text-[#2C1F14] focus:outline-hidden focus:ring-2 focus:ring-[#8B5A2B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D9CDB8] text-xs text-[#2C1F14] focus:outline-hidden focus:ring-2 focus:ring-[#8B5A2B]"
                  >
                    <option value="bed-sets">Bed Sets</option>
                    <option value="wardrobes">Wardrobes &amp; Closets</option>
                    <option value="dining-sets">Dining Sets</option>
                    <option value="sofas">Sofa Sets</option>
                    <option value="dressing-consoles">Dressing &amp; Consoles</option>
                    <option value="custom-woodwork">Custom Woodwork &amp; Walls</option>
                  </select>
                </div>
              </div>

              {/* Pricing in Rupees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#F5EFE6] border border-[#E8DFC8]">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                    Base Price in Rupees (Rs.) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1000}
                    step={500}
                    value={formBasePrice}
                    onChange={(e) => setFormBasePrice(Number(e.target.value))}
                    placeholder="185000"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D9CDB8] text-xs font-bold text-[#2C1F14] focus:outline-hidden focus:ring-2 focus:ring-[#8B5A2B]"
                  />
                  <span className="text-[11px] text-[#7A6958]">Displays as: {formatRupees(formBasePrice)}</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                    Discounted Price (Optional)
                  </label>
                  <input
                    type="number"
                    min={1000}
                    step={500}
                    value={formDiscountPrice}
                    onChange={(e) => setFormDiscountPrice(e.target.value)}
                    placeholder="e.g. 165000 (shows discount tag)"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D9CDB8] text-xs text-[#2C1F14] focus:outline-hidden focus:ring-2 focus:ring-[#8B5A2B]"
                  />
                  {formDiscountPrice && (
                    <span className="text-[11px] text-green-700 font-semibold">
                      Discounted to: {formatRupees(Number(formDiscountPrice))}
                    </span>
                  )}
                </div>
              </div>

              {/* REAL BASE FURNITURE PICTURE UPLOAD SECTION */}
              <div className="p-4 rounded-xl bg-white border border-[#E8DFC8] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#8B5A2B]" />
                    <span className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                      Real Furniture Pictures &amp; Woodwork Photos *
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8C7A6B]">Upload photo or paste URL</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* File Upload from Computer / Mobile */}
                  <div className="border-2 border-dashed border-[#D9CDB8] rounded-xl p-4 text-center bg-[#FAF7F2] hover:bg-[#F5EFE6] transition-colors flex flex-col items-center justify-center cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, false)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-7 h-7 text-[#8B5A2B] mb-2" />
                    <p className="text-xs font-bold text-[#2C1F14]">
                      Click to Upload Real Photo from Device
                    </p>
                    <p className="text-[11px] text-[#7A6958] mt-1">
                      Supports JPG, PNG, WEBP from your phone or PC camera
                    </p>
                  </div>

                  {/* Image URL Input */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-[#5A493B]">
                      Or Paste Image Web Link / URL:
                    </label>
                    <input
                      type="url"
                      value={formImage}
                      onChange={(e) => {
                        setFormImage(e.target.value);
                        if (e.target.value && !formGallery.includes(e.target.value)) {
                          setFormGallery(prev => [e.target.value, ...prev]);
                        }
                      }}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-lg bg-[#FAF7F2] border border-[#D9CDB8] text-xs text-[#2C1F14] focus:outline-hidden focus:ring-1 focus:ring-[#8B5A2B]"
                    />
                    <p className="text-[10px] text-[#8C7A6B]">
                      Leave empty to use high quality solid wood preset photo.
                    </p>
                  </div>
                </div>

                {/* Picture Preview */}
                {formImage && (
                  <div className="space-y-2 pt-2 border-t border-[#F2EADB]">
                    <span className="text-[11px] font-bold text-[#2C1F14]">Main Photo Preview:</span>
                    <div className="relative w-40 h-28 rounded-lg overflow-hidden border border-[#8B5A2B] shadow-xs">
                      <img src={formImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
              </div>

              {/* Dimensions & Lead Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                    Dimensions (Feet / Inches) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formDimensions}
                    onChange={(e) => setFormDimensions(e.target.value)}
                    placeholder="Bed: 6 x 6.5 ft | Side Tables: 22 x 16 x 20 in"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D9CDB8] text-xs text-[#2C1F14] focus:outline-hidden focus:ring-2 focus:ring-[#8B5A2B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                    Manufacturing Lead Time
                  </label>
                  <input
                    type="text"
                    value={formLeadTime}
                    onChange={(e) => setFormLeadTime(e.target.value)}
                    placeholder="14 to 18 Working Days"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D9CDB8] text-xs text-[#2C1F14] focus:outline-hidden focus:ring-2 focus:ring-[#8B5A2B]"
                  />
                </div>
              </div>

              {/* Wood species & Included items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                    Wood Species (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formWoodTypes}
                    onChange={(e) => setFormWoodTypes(e.target.value)}
                    placeholder="Pure Seasoned Sheesham, Solid Teak Wood, Kikar Solid Wood"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D9CDB8] text-xs text-[#2C1F14] focus:outline-hidden focus:ring-2 focus:ring-[#8B5A2B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                    Included Pieces (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formIncluded}
                    onChange={(e) => setFormIncluded(e.target.value)}
                    placeholder="1x Bed Frame, 2x Side Tables, Support Slats"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D9CDB8] text-xs text-[#2C1F14] focus:outline-hidden focus:ring-2 focus:ring-[#8B5A2B]"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                  Product Description &amp; Woodcraft Specifications
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe wood seasoning, joinery, carving motifs, fabric quality, and polish protection..."
                  className="w-full p-3 rounded-xl bg-white border border-[#D9CDB8] text-xs text-[#2C1F14] focus:outline-hidden focus:ring-2 focus:ring-[#8B5A2B]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E8DFC8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    resetProductForm();
                    setActiveTab('products');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white border border-[#D9CDB8] text-xs font-semibold text-[#5A493B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#2C1F14] hover:bg-[#422F1F] text-white text-xs font-bold flex items-center gap-2 shadow-xs"
                >
                  <Save className="w-4 h-4 text-[#D4AF37]" />
                  <span>{editingProductId ? 'Update Furniture Item' : 'Publish to Catalog'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: OCCASION SALE & CUSTOMER BENEFITS */}
          {activeTab === 'sale' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              {/* Header */}
              <div className="border-b border-[#E8DFC8] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#2C1F14] flex items-center gap-2">
                    <Flame className="w-5 h-5 text-[#B91C1C]" />
                    <span>Occasion Sale &amp; Customer Benefit Manager</span>
                  </h3>
                  <p className="text-xs text-[#7A6958]">
                    Activate discounts anytime (Eid, Wedding Season, New Year) to benefit customers. Prices update automatically on furniture and in WhatsApp orders.
                  </p>
                </div>

                {/* 1-Click Master Sale Toggle */}
                <button
                  type="button"
                  onClick={() => handleQuickToggleSale(!isSaleActive)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm ${
                    isSaleActive
                      ? 'bg-[#B91C1C] hover:bg-[#991B1B] text-white ring-2 ring-red-300'
                      : 'bg-[#2C1F14] hover:bg-[#4A3222] text-[#E8DFC8]'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${isSaleActive ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'}`} />
                  <span>{isSaleActive ? 'Sale is ACTIVE (Turn OFF)' : 'Sale is OFF (Turn ON)'}</span>
                </button>
              </div>

              {/* Big Interactive Status Hero Card */}
              <div className={`p-5 rounded-2xl border transition-all ${
                isSaleActive
                  ? 'bg-gradient-to-br from-amber-50/90 via-red-50/50 to-amber-50/90 border-[#D4AF37]/50 shadow-md'
                  : 'bg-white border-[#E8DFC8]'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        isSaleActive ? 'bg-red-600 text-white animate-pulse' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {isSaleActive ? '🎉 SALE LIVE IN SHOWROOM' : '⏸️ SALE PAUSED'}
                      </span>
                      <span className="text-xs font-semibold text-[#8B5A2B]">
                        {isSaleActive ? `${saleDiscountPercentage}% occasion discount active` : 'Standard catalog prices active'}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#2C1F14]">
                      {saleTitle || 'Special Occasion Sale'}
                    </h4>
                    <p className="text-xs text-[#6B5A4B]">
                      {saleBannerText}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <span className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#B91C1C]">
                      {saleDiscountPercentage}% OFF
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuickToggleSale(!isSaleActive)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        isSaleActive
                          ? 'bg-red-100 text-red-800 hover:bg-red-200'
                          : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold'
                      }`}
                    >
                      {isSaleActive ? 'Turn Off Sale' : 'Activate 1-Click Sale'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Section: 1-Click Occasion Presets */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>1-Click Occasion Presets (Pakistani Festivals &amp; Seasons)</span>
                  </label>
                  <span className="text-[11px] text-[#8C7A6B]">Click any box to auto-fill details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {OCCASION_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSaleTitle(preset.title);
                        setSaleDiscountPercentage(preset.discount);
                        setSaleBannerText(preset.banner);
                        setSaleTagline(preset.tagline);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all hover:scale-[1.01] ${
                        saleTitle === preset.title
                          ? 'border-[#B91C1C] bg-red-50/70 shadow-xs ring-1 ring-red-400'
                          : 'border-[#E8DFC8] bg-white hover:border-[#8B5A2B] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[11px] font-bold text-[#8B5A2B]">{preset.badge}</span>
                        <span className="text-xs font-bold text-[#B91C1C] bg-red-100 px-1.5 py-0.5 rounded">
                          {preset.discount}% OFF
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#2C1F14] leading-snug truncate">
                        {preset.title}
                      </p>
                      <p className="text-[10px] text-[#7A6958] mt-1 line-clamp-2">
                        {preset.banner}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sale Configuration Form */}
              <form onSubmit={handleSaveSaleSettings} className="space-y-4 p-5 rounded-2xl bg-white border border-[#E8DFC8] shadow-xs">
                <h4 className="text-sm font-bold text-[#2C1F14] flex items-center gap-2 pb-2 border-b border-[#F2EADB]">
                  <Settings className="w-4 h-4 text-[#8B5A2B]" />
                  <span>Customize Sale Details &amp; Discount Percentage</span>
                </h4>

                {/* Sale Active Switch */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8]">
                  <div>
                    <span className="text-xs font-bold text-[#2C1F14] block">Sale Status for Customers:</span>
                    <span className="text-[11px] text-[#7A6958]">When enabled, top announcement banner & discounted prices show immediately</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSaleActive(!isSaleActive)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      isSaleActive ? 'bg-[#B91C1C]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        isSaleActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Sale Title */}
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                      Occasion / Sale Title:
                    </label>
                    <input
                      type="text"
                      required
                      value={saleTitle}
                      onChange={(e) => setSaleTitle(e.target.value)}
                      placeholder="e.g. Eid-ul-Fitr Grand Woodcraft Sale"
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9CDB8] text-xs font-bold text-[#2C1F14]"
                    />
                  </div>

                  {/* Discount Percentage */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider flex items-center justify-between">
                      <span>Discount:</span>
                      <span className="text-xs font-bold text-[#B91C1C]">{saleDiscountPercentage}% OFF</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="70"
                        required
                        value={saleDiscountPercentage}
                        onChange={(e) => setSaleDiscountPercentage(Math.max(1, Math.min(70, Number(e.target.value))))}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9CDB8] text-xs font-bold text-[#2C1F14]"
                      />
                      <span className="text-xs font-bold text-[#7A6958]">%</span>
                    </div>
                    {/* Quick % chips */}
                    <div className="flex items-center gap-1 pt-1">
                      {[5, 10, 15, 20, 25].map(pct => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setSaleDiscountPercentage(pct)}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            saleDiscountPercentage === pct 
                              ? 'bg-[#B91C1C] text-white' 
                              : 'bg-[#EADECE] text-[#4A392B] hover:bg-[#D9CDB8]'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sale Banner Text */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-[#8B5A2B]" />
                      Top Announcement Bar Text:
                    </span>
                    <span className="text-[10px] text-[#8C7A6B]">Visible to every customer visiting the website</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={saleBannerText}
                    onChange={(e) => setSaleBannerText(e.target.value)}
                    placeholder="e.g. 🌙 Eid Mubarak! Enjoy flat 15% discount on all solid wood bedroom and dining furniture. Direct WhatsApp confirmation."
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#D9CDB8] text-xs text-[#2C1F14]"
                  />
                </div>

                {/* Sale Tagline */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                    Occasion Subtitle / Tagline:
                  </label>
                  <input
                    type="text"
                    value={saleTagline}
                    onChange={(e) => setSaleTagline(e.target.value)}
                    placeholder="e.g. Limited Time Occasion Offer"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9CDB8] text-xs text-[#2C1F14]"
                  />
                </div>

                {/* Save Button */}
                <div className="pt-3 border-t border-[#F2EADB] flex items-center justify-between">
                  {saleSavedToast && (
                    <span className="text-xs font-bold text-green-700 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Sale settings updated successfully!
                    </span>
                  )}
                  <button
                    type="submit"
                    className="ml-auto px-6 py-2.5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Occasion Sale Settings</span>
                  </button>
                </div>
              </form>

              {/* Live Simulation Card */}
              <div className="p-4 rounded-2xl bg-[#2C1F14] text-white space-y-3 shadow-md">
                <div className="flex items-center justify-between text-xs text-[#D4AF37]">
                  <span className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Customer View Live Simulation
                  </span>
                  <span className="text-[11px] opacity-80">{isSaleActive ? 'Showing in Showroom' : 'Hidden while sale is OFF'}</span>
                </div>

                {/* Top Banner simulation */}
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#B91C1C] to-[#881337] text-white text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-extrabold uppercase">
                      {saleDiscountPercentage}% OFF
                    </span>
                    <span className="truncate font-medium">{saleBannerText}</span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-300 underline shrink-0">
                    Order on WhatsApp
                  </span>
                </div>

                {/* WhatsApp Message simulation */}
                <div className="p-3 rounded-xl bg-[#1E293B] border border-slate-700 text-xs text-slate-300 space-y-1 font-mono">
                  <p className="text-emerald-400 font-bold">📲 How customer order looks on WhatsApp:</p>
                  <p className="text-slate-400">... Royal Solid Sheesham Bed Set</p>
                  <p className="text-slate-400">Original Price: Rs. 165,000</p>
                  {isSaleActive ? (
                    <p className="text-amber-300 font-bold">
                      🎉 OCCASION BENEFIT APPLIED: {saleTitle} ({saleDiscountPercentage}% OFF)
                      <br />
                      &gt;&gt; Discounted Total: Rs. {Math.round(165000 * (1 - saleDiscountPercentage / 100)).toLocaleString()}
                    </p>
                  ) : (
                    <p className="text-slate-400">Total Price: Rs. 165,000 (Standard Pricing)</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS & WHATSAPP CONFIG */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl mx-auto">
              <div className="border-b border-[#E8DFC8] pb-3">
                <h3 className="font-serif-luxury text-xl font-bold text-[#2C1F14]">
                  WhatsApp Business &amp; Workshop Settings
                </h3>
                <p className="text-xs text-[#7A6958]">
                  Configure your WhatsApp number where all customer order confirmations and custom specifications will be sent directly.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                  Workshop / Brand Name:
                </label>
                <input
                  type="text"
                  required
                  value={settingsBusinessName}
                  onChange={(e) => setSettingsBusinessName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D9CDB8] text-xs text-[#2C1F14] font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                    WhatsApp Ordering Number (with country code):
                  </span>
                  <span className="text-[10px] text-[#8C7A6B]">Format: 923001234567</span>
                </label>
                <input
                  type="text"
                  required
                  value={settingsWhatsapp}
                  onChange={(e) => setSettingsWhatsapp(e.target.value)}
                  placeholder="923001234567"
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D9CDB8] text-xs text-[#2C1F14] font-bold"
                />
                <p className="text-[11px] text-[#7A6958]">
                  * Every customer clicking "Order via WhatsApp" or "Send Order to WhatsApp" will open a chat with this phone number.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                  Phone Number for Display / Direct Calls:
                </label>
                <input
                  type="text"
                  required
                  value={settingsPhoneDisplay}
                  onChange={(e) => setSettingsPhoneDisplay(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D9CDB8] text-xs text-[#2C1F14]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                  Physical Workshop &amp; Showroom Address:
                </label>
                <input
                  type="text"
                  value={settingsAddress}
                  onChange={(e) => setSettingsAddress(e.target.value)}
                  placeholder="Main Furniture Market, Workshop & Display Center, Gujrat / Lahore, Pakistan"
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D9CDB8] text-xs text-[#2C1F14]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2C1F14] uppercase tracking-wider">
                  Brand Tagline / Quality Promise:
                </label>
                <input
                  type="text"
                  value={settingsTagline}
                  onChange={(e) => setSettingsTagline(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D9CDB8] text-xs text-[#2C1F14]"
                />
              </div>

              {/* Occasion Sale Quick Status & Link */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isSaleActive ? 'bg-red-100 text-[#B91C1C]' : 'bg-[#EADECE] text-[#5A493B]'}`}>
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2C1F14]">
                      Occasion Sale: {isSaleActive ? `${saleDiscountPercentage}% OFF Active (${saleTitle})` : 'Currently Inactive'}
                    </h4>
                    <p className="text-[11px] text-[#7A6958]">
                      Turn special discounts on or off anytime for Eid, Weddings, and festive occasions.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('sale')}
                  className="px-3 py-1.5 rounded-lg bg-[#2C1F14] text-[#E8DFC8] hover:text-white text-xs font-semibold hover:bg-[#4A3222] transition-colors shrink-0"
                >
                  Configure Sale &rarr;
                </button>
              </div>

              <div className="pt-4 border-t border-[#E8DFC8] flex items-center justify-between">
                {settingsSavedToast && (
                  <span className="text-xs font-bold text-green-700 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Settings updated successfully!
                  </span>
                )}
                <button
                  type="submit"
                  className="ml-auto px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center gap-2 shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Save WhatsApp &amp; Store Info</span>
                </button>
              </div>

              {/* Owner Passcode Management Section */}
              <div className="mt-8 pt-6 border-t-2 border-[#E8DFC8]">
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D5C6AF] shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#2C1F14] text-[#D4AF37] flex items-center justify-center">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2C1F14]">
                        Owner Security: Change Admin Passcode
                      </h4>
                      <p className="text-[11px] text-[#7A6958]">
                        Prevent unauthorized access to the admin portal by setting your own secret password.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2C1F14]">
                        Current Passcode:
                      </label>
                      <input
                        type="password"
                        value={currentPinInput}
                        onChange={(e) => setCurrentPinInput(e.target.value)}
                        placeholder="Current passcode"
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9CDB8] text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2C1F14]">
                        New Passcode:
                      </label>
                      <input
                        type="password"
                        value={newPinInput}
                        onChange={(e) => setNewPinInput(e.target.value)}
                        placeholder="At least 4 chars"
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9CDB8] text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2C1F14]">
                        Confirm New Passcode:
                      </label>
                      <input
                        type="password"
                        value={confirmPinInput}
                        onChange={(e) => setConfirmPinInput(e.target.value)}
                        placeholder="Repeat new passcode"
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9CDB8] text-xs font-mono"
                      />
                    </div>
                  </div>

                  {pinChangeError && (
                    <p className="text-xs text-red-600 font-semibold flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      {pinChangeError}
                    </p>
                  )}
                  {pinChangeSuccess && (
                    <p className="text-xs text-green-700 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {pinChangeSuccess}
                    </p>
                  )}

                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={handleChangeOwnerPin}
                      className="px-4 py-2 rounded-xl bg-[#2C1F14] hover:bg-[#4A3222] text-white text-xs font-bold flex items-center gap-2 transition-colors"
                    >
                      <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Update Owner Passcode</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* TAB 4: WHATSAPP ORDERS INQUIRY LOG */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DFC8]">
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-[#2C1F14]">
                    Customer WhatsApp Orders Log
                  </h3>
                  <p className="text-xs text-[#7A6958]">
                    Record of order inquiries dispatched to WhatsApp by customers.
                  </p>
                </div>
                <button
                  onClick={() => setInquiries(getStoredInquiries())}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#D9CDB8] text-xs font-medium text-[#5A493B]"
                >
                  Refresh Log
                </button>
              </div>

              {inquiries.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#7A6958] space-y-2">
                  <ShoppingBag className="w-10 h-10 text-[#C4B5A5] mx-auto" />
                  <p className="font-semibold text-[#2C1F14]">No customer orders logged yet</p>
                  <p>When customers click "Send Order to WhatsApp", their order summary will appear here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 rounded-xl bg-white border border-[#E8DFC8] space-y-2.5 text-xs text-[#4A3C31]"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#F2EADB]">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#2C1F14]">{inq.id}</span>
                          <span className="text-[#8C7A6B]">• {inq.date}</span>
                        </div>
                        <span className="font-serif-luxury font-bold text-sm text-[#8B5A2B]">
                          Total: {formatRupees(inq.totalAmount)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <strong className="text-[#2C1F14]">Customer:</strong> {inq.customerName}
                        </div>
                        <div>
                          <strong className="text-[#2C1F14]">Phone:</strong> {inq.customerPhone}
                        </div>
                        <div>
                          <strong className="text-[#2C1F14]">City / Address:</strong> {inq.customerCity} - {inq.deliveryAddress}
                        </div>
                      </div>

                      {/* Items */}
                      <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#EFE7DC] space-y-1">
                        <strong className="text-[#2C1F14] block">Ordered Items:</strong>
                        {inq.items.map((it, idx) => (
                          <div key={idx} className="flex items-center justify-between text-[11px] text-[#5A493B]">
                            <span>
                              {it.quantity}x {it.productName} ({it.selectedSize}, {it.selectedWood}, {it.selectedColor})
                            </span>
                            <span className="font-semibold">{formatRupees(it.totalPrice)}</span>
                          </div>
                        ))}
                      </div>

                      {inq.notes && (
                        <p className="text-[11px] text-[#7A6958] italic">
                          <strong>Note:</strong> {inq.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
