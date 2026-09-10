/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  MessageCircle, 
  ShoppingBag, 
  Phone, 
  SlidersHorizontal, 
  Sparkles, 
  Layers, 
  Ruler, 
  CheckCircle2, 
  Filter, 
  ArrowUpRight,
  Search,
  X,
  RotateCcw
} from 'lucide-react';
import { Product, StoreSettings, CartItem } from './types';
import { 
  getStoredProducts, 
  saveStoredProducts, 
  resetStoredProducts,
  getStoredSettings, 
  saveStoredSettings, 
  getStoredCart, 
  saveStoredCart,
  formatRupees,
  generateWhatsAppOrderUrl
} from './utils/storage';
import { CATEGORIES } from './data/furnitureData';
import { Navbar } from './components/Navbar';
import { SidebarNav } from './components/SidebarNav';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminPortal } from './components/AdminPortal';
import { CustomWoodworkBanner } from './components/CustomWoodworkBanner';
import { Footer } from './components/Footer';

export default function App() {
  // Core state
  const [products, setProducts] = useState<Product[]>(() => getStoredProducts());
  const [settings, setSettings] = useState<StoreSettings>(() => getStoredSettings());
  const [cart, setCart] = useState<CartItem[]>(() => getStoredCart());

  // Navigation and Filter state (Side Navigation Bar)
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedWoodFilter, setSelectedWoodFilter] = useState<string>('all');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<string>('all');
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState<boolean>(false);

  // Modals state
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Sync cart to localStorage whenever it updates
  useEffect(() => {
    saveStoredCart(cart);
  }, [cart]);

  // Compute category counts for side navigation badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Handle Cart Operations
  const handleAddToCart = (customizedItem: {
    product: Product;
    selectedSize: string;
    selectedWood: string;
    selectedColor: string;
    customNotes: string;
    unitPrice: number;
    quantity: number;
  }) => {
    const cartItemId = `${customizedItem.product.id}-${customizedItem.selectedSize}-${customizedItem.selectedWood}-${customizedItem.selectedColor}-${Date.now().toString().slice(-4)}`;
    
    const newItem: CartItem = {
      cartItemId,
      productId: customizedItem.product.id,
      productName: customizedItem.product.name,
      image: customizedItem.product.image,
      selectedSize: customizedItem.selectedSize,
      selectedWood: customizedItem.selectedWood,
      selectedColor: customizedItem.selectedColor,
      customNotes: customizedItem.customNotes,
      unitPrice: customizedItem.unitPrice,
      quantity: customizedItem.quantity,
      totalPrice: customizedItem.unitPrice * customizedItem.quantity,
    };

    setCart(prev => [newItem, ...prev]);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQty, totalPrice: item.unitPrice * newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Handle Admin Saves
  const handleSaveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    saveStoredProducts(updatedProducts);
  };

  const handleResetProducts = () => {
    const resetted = resetStoredProducts();
    setProducts(resetted);
  };

  const handleSaveSettings = (updatedSettings: StoreSettings) => {
    setSettings(updatedSettings);
    saveStoredSettings(updatedSettings);
  };

  // Reset all filters
  const handleResetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedWoodFilter('all');
    setSelectedPriceFilter('all');
  };

  // Filtered Products (supporting search, category, wood species, and price range)
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Search query filter (checks name, description, category, wood types)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesWood = p.woodTypes.some(w => w.toLowerCase().includes(query));
        const matchesCategory = p.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesWood && !matchesCategory) {
          return false;
        }
      }

      // Wood species filter
      if (selectedWoodFilter !== 'all') {
        const targetWood = selectedWoodFilter.toLowerCase();
        const hasWood = p.woodTypes.some(w => w.toLowerCase().includes(targetWood));
        if (!hasWood) return false;
      }

      // Price range filter
      if (selectedPriceFilter !== 'all') {
        if (selectedPriceFilter === 'under-75k' && p.basePrice >= 75000) return false;
        if (selectedPriceFilter === '75k-150k' && (p.basePrice < 75000 || p.basePrice > 150000)) return false;
        if (selectedPriceFilter === '150k-300k' && (p.basePrice < 150000 || p.basePrice > 300000)) return false;
        if (selectedPriceFilter === 'above-300k' && p.basePrice <= 300000) return false;
      }

      return true;
    });
  }, [products, selectedCategory, searchQuery, selectedWoodFilter, selectedPriceFilter]);

  const totalCartCount = cart.reduce((total, it) => total + it.quantity, 0);

  // Quick WhatsApp Consultation URL
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const floatingWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${settings.businessName}, I would like to inquire about your furniture collection and custom woodcraft orders.`
  )}`;

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery.trim() !== '' || selectedWoodFilter !== 'all' || selectedPriceFilter !== 'all';

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1E1B18]">
      {/* Top Navbar */}
      <Navbar
        settings={settings}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onToggleSidebar={() => setIsSidebarOpenMobile(prev => !prev)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Responsive Layout with Side Navigation Bar */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto">
        {/* Left Side Navigation Bar (Search, Categories, Wood Species, Price Filters) */}
        <SidebarNav
          settings={settings}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('catalog-section-top');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          selectedWoodFilter={selectedWoodFilter}
          onSelectWoodFilter={setSelectedWoodFilter}
          selectedPriceFilter={selectedPriceFilter}
          onSelectPriceFilter={setSelectedPriceFilter}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
          isOpenMobile={isSidebarOpenMobile}
          onCloseMobile={() => setIsSidebarOpenMobile(false)}
          categoryCounts={categoryCounts}
          totalProductsCount={products.length}
        />

        {/* Right Main Content Column */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Main Banner / Hero */}
          <Hero
            settings={settings}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onOpenCustomOrder={() => {
              const el = document.getElementById('custom-woodwork-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            totalProductsCount={products.length}
          />

          {/* Main Furniture Catalog Section */}
          <main id="catalog-section-top" className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 flex-1 w-full">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#E8DFC8]">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
                  <Layers className="w-3.5 h-3.5" />
                  <span>
                    {selectedCategory === 'all'
                      ? 'Complete Master Collection'
                      : CATEGORIES.find(c => c.id === selectedCategory)?.label || 'Furniture'}
                  </span>
                </div>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2A1D13] mt-1">
                  Solid Wood Showroom &amp; Workshop Pieces
                </h2>
                <p className="text-xs sm:text-sm text-[#6B5A4B] mt-1">
                  Browse authentic solid wood pieces with real photos. Configure size, polish, and order directly on WhatsApp.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#7A6958]">
                <span>Showing <strong className="text-[#2C1F14]">{filteredProducts.length}</strong> of {products.length} items</span>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetAllFilters}
                    className="inline-flex items-center gap-1 text-[#8B5A2B] hover:text-[#5A3816] font-bold"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset All
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters Pill Bar (When search or filters are active) */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap py-3 border-b border-[#EFE7D8] text-xs">
                <span className="text-[#8C7A6B] font-medium text-[11px]">Active Filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EADECE] text-[#2C1F14] font-semibold">
                    Category: {CATEGORIES.find(c => c.id === selectedCategory)?.label}
                    <button onClick={() => setSelectedCategory('all')} className="hover:text-red-700">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EADECE] text-[#2C1F14] font-semibold">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-red-700">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedWoodFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EADECE] text-[#2C1F14] font-semibold">
                    Wood: {selectedWoodFilter}
                    <button onClick={() => setSelectedWoodFilter('all')} className="hover:text-red-700">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedPriceFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EADECE] text-[#2C1F14] font-semibold">
                    Price: {selectedPriceFilter}
                    <button onClick={() => setSelectedPriceFilter('all')} className="hover:text-red-700">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EADECE] flex items-center justify-center mx-auto text-[#8B5A2B]">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#2C1F14]">
                  No furniture found matching your criteria
                </h3>
                <p className="text-xs text-[#7A6958] max-w-sm mx-auto">
                  We couldn't find any items matching your current filters or search query. Try clearing filters or searching for another term.
                </p>
                <div className="pt-2 flex items-center justify-center gap-2">
                  <button
                    onClick={handleResetAllFilters}
                    className="px-4 py-2.5 rounded-xl bg-[#2C1F14] text-white text-xs font-semibold hover:bg-[#422F1F] transition-colors"
                  >
                    Reset All Filters &amp; Search
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 pt-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    settings={settings}
                    onSelectProduct={(p) => setSelectedProductForDetail(p)}
                    onQuickWhatsApp={(p) => {
                      // Handled by card
                    }}
                  />
                ))}
              </div>
            )}

            {/* Bespoke Custom Woodwork Section */}
            <section id="custom-woodwork-section" className="mt-14">
              <CustomWoodworkBanner settings={settings} />
            </section>
          </main>

          {/* Footer */}
          <Footer
            settings={settings}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onOpenCustom={() => {
              const el = document.getElementById('custom-woodwork-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </div>

      {/* Product Customization & Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        settings={settings}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={(customizedItem) => handleAddToCart(customizedItem)}
      />

      {/* Cart Drawer & WhatsApp Checkout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        settings={settings}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Admin Portal Modal (Protected with Owner Passcode) */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        settings={settings}
        onSaveProducts={handleSaveProducts}
        onSaveSettings={handleSaveSettings}
        onResetProducts={handleResetProducts}
      />

      {/* Floating WhatsApp Quick Action Button (Desktop & Mobile) */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
        <a
          id="floating-whatsapp-btn"
          href={floatingWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba59] hover:shadow-2xl transition-all duration-300 scale-100 hover:scale-105 border-2 border-white/40"
          aria-label="Direct WhatsApp Chat"
        >
          <MessageCircle className="w-5 h-5 fill-white shrink-0" />
          <span className="text-xs font-bold tracking-wide hidden md:inline-block">
            Chat on WhatsApp
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping hidden md:inline-block"></span>
        </a>
      </div>

      {/* Mobile Bottom Sticky Navigation Bar (Responsive on all mobile screens) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/98 backdrop-blur-md border-t border-[#E8DFC8] px-4 py-2.5 flex items-center justify-between gap-3 shadow-lg">
        {/* Open Side Navigation Bar & Search */}
        <button
          onClick={() => setIsSidebarOpenMobile(true)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#FAF7F2] text-[#2C1F14] border border-[#D9CDB8] text-xs font-bold shadow-xs active:bg-[#EADECE]"
        >
          <Search className="w-4 h-4 text-[#8B5A2B]" />
          <span>Side Menu &amp; Search</span>
        </button>

        {/* Quick WhatsApp Order */}
        <a
          href={floatingWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-xs active:bg-[#20ba59]"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>WhatsApp</span>
        </a>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#2C1F14] text-white text-xs font-bold shadow-xs relative active:bg-[#3D2C1D]"
        >
          <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
          <span>Cart</span>
          {totalCartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C28E5C] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
