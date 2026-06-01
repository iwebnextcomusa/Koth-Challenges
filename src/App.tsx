/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParallaxHero from './components/ParallaxHero';
import Chatbot from './components/Chatbot';
import AdminDashboard from './components/AdminDashboard';
import ProductDetailPage from './components/ProductDetailPage';
import AboutUsPage from './components/AboutUsPage';
import ContactPage from './components/ContactPage';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import { Product, CartItem, Order, DiscountCoupon } from './types';
import { INITIAL_PRODUCTS, AVAILABLE_COUPONS } from './data';
import { 
  Heart, ShoppingCart, Star, ToggleLeft, ShieldCheck, 
  Trash2, CreditCard, Sparkles, AlertCircle, CheckCircle, 
  ChevronRight, Search, Sliders, ArrowUp, X, MapPin, UserCheck
} from 'lucide-react';

export default function App() {
  // Global App States
  const [activePage, setActivePage] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [coupons, setCoupons] = useState<DiscountCoupon[]>(AVAILABLE_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<DiscountCoupon | null>(null);
  
  const [activeProductId, setActiveProductId] = useState<string>('');
  
  // Custom states for orders (seeding initially)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "7309",
      date: "May 25, 2026",
      items: [
        {
          productId: "ok-001",
          name: "Sooner State Cotton Trench",
          price: 189.00,
          quantity: 1,
          size: "M",
          color: "Prairie Camel",
          image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=700"
        }
      ],
      subtotal: 189.00,
      discount: 18.90,
      tax: 14.50,
      shipping: 0.00,
      total: 184.60,
      shippingAddress: {
        fullName: "Sarah Jenkins",
        address: "704 NW 12th St",
        city: "Oklahoma City",
        state: "OK",
        zipCode: "73103",
        phone: "405-479-4552"
      },
      paymentMethod: "Stripe Checkout",
      status: "Shipped",
      trackingNumber: "KOTH-7731952"
    }
  ]);

  // Filters Shop Page
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sizeFilter, setSizeFilter] = useState('All');
  const [colorFilter, setColorFilter] = useState('All');
  const [sortOption, setSortOption] = useState('featured');

  // Customer Authentication Simulation
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('1402 South Jenkins Ave');
  const [city, setCity] = useState('Norman');
  const [zipCode, setZipCode] = useState('73072');
  const [phone, setPhone] = useState('405-479-4552');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authError, setAuthError] = useState('');

  // Cart Checkout Wizard coordinates
  const [checkoutStage, setCheckoutStage] = useState<'cart' | 'shipping' | 'payment' | 'completed'>('cart');
  const [checkFullName, setCheckFullName] = useState('');
  const [checkAddress, setCheckAddress] = useState('');
  const [checkCity, setCheckCity] = useState('Oklahoma City');
  const [checkState, setCheckState] = useState('OK');
  const [checkZip, setCheckZip] = useState('73102');
  const [checkPhone, setCheckPhone] = useState('405-479-4552');
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Scroll to top button visibility check
  const [scrollVisible, setScrollVisible] = useState(false);

  // apply standard HTML Class theme swapping
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Monitor scroll for ScrollToTop trigger
  useEffect(() => {
    const toggleScrollVisible = () => {
      if (window.scrollY > 400) {
        setScrollVisible(true);
      } else {
        setScrollVisible(false);
      }
    };
    window.addEventListener('scroll', toggleScrollVisible);
    return () => window.removeEventListener('scroll', toggleScrollVisible);
  }, []);

  // Quick Action Buttons
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add Item to Cart
  const handleAddToCart = (
    product: Product,
    size: string,
    color: { name: string; value: string },
    quantity: number
  ) => {
    const cartItemId = `${product.id}-${size}-${color.name}`;
    
    setCart((prev) => {
      const exists = prev.find((item) => item.id === cartItemId);
      if (exists) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: Math.min(product.inventory, item.quantity + quantity) }
            : item
        );
      } else {
        return [...prev, { id: cartItemId, product, selectedSize: size, selectedColor: color, quantity }];
      }
    });

    // Notify of success or open cart view
    setActivePage('cart');
    setCheckoutStage('cart');
  };

  // Add Item to Wishlist
  const handleAddToWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Remove item from Cart
  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((it) => it.id !== itemId));
  };

  // Auth login simulation
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userPassword) {
      setAuthError("Please provide all fields.");
      return;
    }

    setIsLoggedIn(true);
    setFullName(fullName || userEmail.split('@')[0]);
    setShowAuthModal(false);
    setAuthError('');
  };

  // Auth register simulation
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userPassword || !fullName) {
      setAuthError("All credentials are required.");
      return;
    }

    setIsLoggedIn(true);
    setShowAuthModal(false);
    setAuthError('');
  };

  // apply discount codes logic
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCodeInput.trim().toUpperCase();
    const verifiedCoupon = coupons.find((c) => c.code === code);

    if (!verifiedCoupon) {
      setCouponError("Invalid discount coupon.");
      return;
    }

    setAppliedCoupon(verifiedCoupon);
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, it) => acc + (it.product.price * it.quantity), 0);
  
  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      cartDiscount = (cartSubtotal * appliedCoupon.value) / 100;
    } else if (appliedCoupon.type === 'fixed_value') {
      cartDiscount = Math.min(cartSubtotal, appliedCoupon.value);
    }
  }

  const taxableAmount = Math.max(0, cartSubtotal - cartDiscount);
  const cartTax = taxableAmount * 0.0825; // Oklahoma sales tax rate approx 8.25%
  const cartShipping = appliedCoupon?.type === 'free_shipping' || taxableAmount > 100 ? 0.00 : 7.99;
  const cartTotal = taxableAmount + cartTax + cartShipping;

  // Complete orders checkout
  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: cart.map((it) => ({
        productId: it.product.id,
        name: it.product.name,
        price: it.product.price,
        quantity: it.quantity,
        size: it.selectedSize,
        color: it.selectedColor.name,
        image: it.product.images[0]
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      tax: cartTax,
      shipping: cartShipping,
      total: cartTotal,
      shippingAddress: {
        fullName: checkFullName || fullName || "Guest Shopper",
        address: checkAddress || address || "Midtown OKC Blvd",
        city: checkCity || city || "Oklahoma City",
        state: "OK",
        zipCode: checkZip || zipCode || "73101",
        phone: checkPhone || phone || "405-479-4552"
      },
      paymentMethod: "Stripe Online Pay Gateway",
      status: "Processing"
    };

    // Update logistics states
    setOrders((prev) => [newOrder, ...prev]);
    setPlacedOrder(newOrder);
    
    // Deduct stock levels in products state
    setProducts((prev) => prev.map((p) => {
      const match = cart.find(c => c.product.id === p.id);
      if (match) {
        return { ...p, inventory: Math.max(0, p.inventory - match.quantity) };
      }
      return p;
    }));

    // Reset checkout forms
    setCart([]);
    setAppliedCoupon(null);
    setCheckoutStage('completed');
  };

  // Filter shop catalog listing
  const filteredProducts = products.filter((p) => {
    // Search filter
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.subcategory.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;

    // Size filter
    const matchesSize = sizeFilter === 'All' || p.sizes.includes(sizeFilter);

    // Color filter
    const matchesColor = colorFilter === 'All' || p.colors.some(c => c.name === colorFilter);

    return matchesSearch && matchesCategory && matchesSize && matchesColor;
  });

  // Sort shop catalog
  const sortedAndFilteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    return 0; // featured/default fallback
  });

  // Extract all single sizes & colors for filtering widgets
  const allUniqueSizesArr = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const allUniqueColorsArr = ['Prairie Camel', 'Dusk Charcoal', 'Electric Navy', 'Sleek Obsidian', 'Oklahoma Red Soil', 'Sage Creek White', 'Oatmeal Heather', 'Terracotta Glow'];

  return (
    <div className="min-h-screen flex flex-col justify-between transition-colors duration-300 dark:bg-zinc-900 bg-zinc-50" id="main-root-workspace">
      
      {/* 1. Header Navigation Bar */}
      <Navbar 
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo(0, 0);
        }}
        cartCount={cart.reduce((sum, it) => sum + it.quantity, 0)}
        wishlistCount={wishlist.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail || "shopper@gmail.com"}
        onLogout={() => {
          setIsLoggedIn(false);
          setUserEmail('');
        }}
        openAuthModal={() => {
          setAuthError('');
          setShowAuthModal(true);
        }}
      />

      {/* 2. Main content pages */}
      <main className="flex-grow">
        
        {/* VIEW: HOME PAGE */}
        {activePage === 'home' && (
          <div id="home-view-canvas">
            {/* Parallax hero banner */}
            <ParallaxHero 
              onShopClick={() => {
                setCategoryFilter('All');
                setActivePage('shop');
                window.scrollTo(0, 0);
              }}
            />

            {/* Quick Collections Categories Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-white/5 bg-[#0A0A0A]">
              <div className="text-center max-w-xl mx-auto mb-14 select-none">
                <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
                  Curated Collections
                </span>
                <h2 className="serif text-3xl sm:text-4xl font-light text-white uppercase mt-2">
                  Browse by category
                </h2>
                <p className="text-xs tracking-widest text-white/40 uppercase mt-2">Ethical, timeless garments tailored to fit your sovereign life</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Women', label: 'Womenswear', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=700' },
                  { name: 'Men', label: 'Menswear', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=700' },
                  { name: 'Unisex', label: 'Unisex Standard', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=700' },
                  { name: 'Accessories', label: 'Luxury Accessories', img: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=700' }
                ].map((cat) => (
                  <div
                    key={cat.name}
                    onClick={() => {
                      setCategoryFilter(cat.name);
                      setActivePage('shop');
                      window.scrollTo(0, 0);
                    }}
                    className="group relative h-96 overflow-hidden border border-white/5 cursor-pointer"
                  >
                    <img 
                      src={cat.img} 
                      alt={cat.label} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/20 to-transparent flex flex-col justify-end p-6" />
                    <div className="absolute bottom-6 left-6 z-10 text-left">
                      <h3 className="serif text-white font-light text-xl uppercase tracking-wide">{cat.label}</h3>
                      <span className="text-[10px] text-white/50 tracking-widest font-bold uppercase mt-1.5 flex items-center gap-1">
                        Explore line <ChevronRight size={12} className="transform group-hover:translate-x-1.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured New Arrivals / Best Seller Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-white/10 pb-5 mb-14 text-left">
                <div>
                  <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
                    Oklahoma Standards
                  </span>
                  <h2 className="serif text-3xl font-light text-white uppercase mt-2">
                    Featured Releases
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setCategoryFilter('All');
                    setActivePage('shop');
                    window.scrollTo(0, 0);
                  }}
                  className="text-[10px] tracking-widest text-white/50 uppercase border-b border-white/20 pb-1 hover:text-white transition-colors cursor-pointer"
                >
                  View full catalog →
                </button>
              </div>

              {/* Products Row Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {products.slice(0, 6).map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setActiveProductId(prod.id);
                      setActivePage('product');
                      window.scrollTo(0, 0);
                    }}
                    className="group bg-white/[0.02] border border-white/5 p-4 cursor-pointer hover:border-white/20 transition-all duration-300"
                    id={`product-card-${prod.id}`}
                  >
                    <div className="aspect-[4/5] bg-neutral-900 overflow-hidden mb-4 relative">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {prod.isNewArrival && (
                        <span className="absolute top-3 left-3 bg-white text-black text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
                          New arrivals
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-start gap-2 text-left">
                      <div>
                        <span className="text-[10px] text-white/40 tracking-widest uppercase block">{prod.subcategory} • {prod.category}</span>
                        <h4 className="serif text-base font-light text-white mt-1.5 truncate max-w-[180px] sm:max-w-xs group-hover:underline">
                          {prod.name}
                        </h4>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <span className="font-light text-sm text-white/90 block font-mono">${prod.price.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mt-2.5 text-xs text-white/55">
                      <div className="flex text-amber-300 gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={11} fill={i < Math.round(prod.rating) ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <span className="text-[9px] tracking-widest font-mono">({prod.reviewsCount})</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* In-Home widgets for testimonials & newsletter */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <Testimonials />
              <Newsletter />
            </section>
          </div>
        )}

        {/* VIEW: SHOP CATALOG PAGE */}
        {activePage === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="shop-catalog-panel">
            <div className="space-y-2 mb-8 border-b border-gray-150 dark:border-zinc-800 pb-5 text-left">
              <span className="text-xs font-black tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
                Collections
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white uppercase font-display leading-none mt-0.5">
                Explore the KOTH Lineup
              </h1>
            </div>

            {/* Filter controls shelf */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Filter Column Side panel */}
              <div className="space-y-6 lg:sticky lg:top-24 h-max p-5 bg-white dark:bg-zinc-850 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm text-left">
                <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-800 pb-3">
                  <h3 className="font-bold flex items-center gap-1.5 uppercase text-xs tracking-widest text-zinc-950 dark:text-white">
                    <Sliders size={14} /> Catalog Filters
                  </h3>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setCategoryFilter('All');
                      setSizeFilter('All');
                      setColorFilter('All');
                    }}
                    className="text-[10px] font-bold text-rose-500 uppercase tracking-widest hover:underline"
                  >
                    Reset All
                  </button>
                </div>

                {/* SEARCH INTENT */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Search keywords</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Trench, Sweatshirt, Raw..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full py-2.5 pl-9 pr-4 text-xs border border-zinc-200 dark:border-zinc-750 focus:border-zinc-950 focus:outline-none rounded-xl bg-gray-50 dark:bg-zinc-805 text-zinc-950 dark:text-white"
                    />
                    <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400" size={13} />
                  </div>
                </div>

                {/* CATEGORIES RADIO GRID */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Collection list</label>
                  <div className="flex flex-col space-y-1.5">
                    {['All', 'Men', 'Women', 'Accessories', 'Unisex'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`text-xs font-semibold uppercase tracking-wider text-left py-1.5 px-3 rounded-lg w-full transition-all flex items-center justify-between ${
                          categoryFilter === cat
                            ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'
                            : 'text-zinc-650 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <span>{cat} Wear</span>
                        {categoryFilter === cat && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SIZES FILTERS */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Clothing Sizes</label>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setSizeFilter('All')}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg border transition-all ${
                        sizeFilter === 'All'
                          ? 'border-transparent bg-zinc-950 dark:bg-white text-white dark:text-zinc-950'
                          : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      All Sizing
                    </button>
                    {allUniqueSizesArr.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSizeFilter(sz)}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg border transition-all ${
                          sizeFilter === sz
                            ? 'border-transparent bg-zinc-950 dark:bg-white text-white dark:text-zinc-950'
                            : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* COLORS FILTER */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block font-sans">Apparel color tones</label>
                  <div className="flex flex-col space-y-1.5">
                    <button
                      onClick={() => setColorFilter('All')}
                      className={`text-xs font-semibold uppercase tracking-wider py-1 px-2.5 rounded-lg text-left ${
                        colorFilter === 'All' 
                          ? 'bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-white font-bold' 
                          : 'text-zinc-500 hover:text-zinc-950 dark:hover:text-white'
                      }`}
                    >
                      All colors
                    </button>
                    {allUniqueColorsArr.map((colName) => (
                      <button
                        key={colName}
                        onClick={() => setColorFilter(colName)}
                        className={`text-xs font-semibold capitalize tracking-wider py-1 px-2.5 rounded-lg text-left flex items-center justify-between ${
                          colorFilter === colName 
                            ? 'bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-white font-bold' 
                            : 'text-zinc-500 hover:text-zinc-950 dark:hover:text-white'
                        }`}
                      >
                        <span>{colName}</span>
                        {colorFilter === colName && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SORT OPTIONS */}
                <div className="space-y-2 pt-2 border-t border-zinc-150 dark:border-zinc-800">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Sort pricing rating</label>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full py-2 px-3 text-xs border border-zinc-200 dark:border-zinc-750 focus:outline-none rounded-xl dark:bg-zinc-805 text-zinc-950 dark:text-white"
                  >
                    <option value="featured">Featured Standards</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Reviews and Ratings</option>
                  </select>
                </div>
              </div>

              {/* Products Grid display */}
              <div className="lg:col-span-3 space-y-6">
                
                {/* Metrics top banner info */}
                <div className="flex justify-between items-center text-xs text-zinc-400 uppercase font-bold py-1 border-b border-zinc-150 dark:border-zinc-800 lg:px-2 select-none">
                  <span>Displaying {sortedAndFilteredProducts.length} unique products</span>
                  <span>Filtered Category: {categoryFilter}</span>
                </div>

                {sortedAndFilteredProducts.length === 0 ? (
                  <div className="py-20 text-center space-y-3 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm">
                    <span className="p-4 bg-zinc-100 dark:bg-zinc-805 text-zinc-400 rounded-full inline-block scale-110">
                      <Search size={28} />
                    </span>
                    <h3 className="font-bold text-sm sm:text-base tracking-widest text-zinc-950 dark:text-white uppercase mt-4">No matching apparel found</h3>
                    <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                      We couldn't locate any products matching search queries or filtering conditions. Try resetting filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setCategoryFilter('All');
                        setSizeFilter('All');
                        setColorFilter('All');
                      }}
                      className="mt-4 px-6 py-2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold uppercase rounded-xl hover:opacity-90 active:scale-95 transition-all text-center cursor-pointer shadow-sm"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {sortedAndFilteredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setActiveProductId(prod.id);
                          setActivePage('product');
                          window.scrollTo(0, 0);
                        }}
                        className="group bg-white dark:bg-zinc-850 border border-gray-100 dark:border-zinc-800 rounded-2xl p-3.5 shadow-sm cursor-pointer hover:border-zinc-950 dark:hover:border-white transition-all duration-300"
                        id={`product-card-${prod.id}`}
                      >
                        <div className="aspect-[4/5] bg-gray-50 dark:bg-zinc-800 rounded-xl overflow-hidden mb-3.5 relative">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          {prod.inventory < 12 && (
                            <span className="absolute top-2 right-2 bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                              Low Stock
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-1 text-left">
                          <span className="text-[9px] text-zinc-400 font-bold uppercase block">{prod.subcategory} • {prod.category}</span>
                          <h4 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white leading-tight truncate group-hover:underline">
                            {prod.name}
                          </h4>
                          
                          <div className="flex items-center justify-between pt-1">
                            <span className="font-extrabold text-sm text-zinc-950 dark:text-white">${prod.price.toFixed(2)}</span>
                            
                            <div className="flex items-center gap-0.5 text-amber-400 text-[10px] font-extrabold">
                              <Star size={11} fill="currentColor" />
                              <span>{prod.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: PRODUCT DETAIL PAGE */}
        {activePage === 'product' && (
          (() => {
            const currentItemDetail = products.find((p) => p.id === activeProductId) || products[0];
            const relatedProductsLine = products.filter(
              (p) => p.category === currentItemDetail.category && p.id !== currentItemDetail.id
            );
            return (
              <ProductDetailPage
                product={currentItemDetail}
                onBack={() => setActivePage('shop')}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                isWishlisted={!!wishlist.find((p) => p.id === currentItemDetail.id)}
                relatedProducts={relatedProductsLine.length > 0 ? relatedProductsLine : products}
                onSelectProduct={(id) => setActiveProductId(id)}
              />
            );
          })()
        )}

        {/* VIEW: ABOUT BRAND PAGE STORY */}
        {activePage === 'about' && <AboutUsPage />}

        {/* VIEW: CONTACT PAGE DETAILS */}
        {activePage === 'contact' && <ContactPage />}

        {/* VIEW: CUSTOMER ACCOUNT AREA (WISHLIST & HISTORY LOGS) */}
        {activePage === 'account' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="customer-account-records">
            <div className="border-b border-gray-150 dark:border-zinc-800 pb-5 mb-8 text-left">
              <span className="text-xs font-black tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
                Customer Space
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white uppercase font-display leading-none mt-0.5">
                My Sovereign Space
              </h1>
            </div>

            {isLoggedIn ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Account Details left column */}
                <div className="p-6 bg-white dark:bg-zinc-850 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm text-left h-max space-y-6">
                  <div className="flex items-center gap-3 border-b border-zinc-150 dark:border-zinc-800 pb-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-black text-center flex items-center justify-center text-lg select-none uppercase">
                      {fullName ? fullName[0] : "O"}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-white leading-none capitalize">{fullName}</h4>
                      <span className="text-[10px] text-zinc-400 tracking-wider block mt-1">Verified Member • Koth Challenges</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed text-zinc-650 dark:text-zinc-300">
                    <div>
                      <span className="font-bold text-zinc-400 uppercase block text-[10px]">Saved Email</span>
                      {userEmail || "shopper@gmail.com"}
                    </div>
                    <div>
                      <span className="font-bold text-zinc-400 uppercase block text-[10px]">Saved Delivery Address</span>
                      {address}, {city}, OK, {zipCode}
                    </div>
                    <div>
                      <span className="font-bold text-zinc-400 uppercase block text-[10px]">Phone contact</span>
                      {phone}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setUserEmail('');
                    }}
                    className="w-full py-2 border border-zinc-200 dark:border-zinc-700 text-rose-500 rounded-xl text-xs font-bold uppercase tracking-widest transition-all text-center cursor-pointer"
                  >
                    Logout Account
                  </button>
                </div>

                {/* Wishlist and Order logs right column */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* WISHLIST TRACKING */}
                  <div className="p-6 bg-white dark:bg-zinc-853 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm text-left">
                    <h3 className="font-bold uppercase text-xs tracking-widest text-zinc-950 dark:text-white mb-4">Bookmarked Wishlist ({wishlist.length})</h3>
                    {wishlist.length === 0 ? (
                      <p className="text-xs text-zinc-405 italic py-3">Your wishlist is empty. Explore our catalog to add items!</p>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {wishlist.map((w) => (
                          <div 
                            key={w.id} 
                            onClick={() => {
                              setActiveProductId(w.id);
                              setActivePage('product');
                            }}
                            className="group p-2 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 cursor-pointer hover:border-zinc-950 text-left"
                          >
                            <img src={w.images[0]} alt={w.name} className="w-full aspect-[4/5] object-cover rounded-lg mb-2" />
                            <h4 className="font-extrabold text-xs text-zinc-900 dark:text-white truncate">{w.name}</h4>
                            <span className="text-xs font-bold text-zinc-500 block mt-1">${w.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ORDER HISTORIES */}
                  <div className="p-6 bg-white dark:bg-zinc-853 rounded-2xl border border-gray-120 dark:border-zinc-800 shadow-sm text-left">
                    <h3 className="font-bold uppercase text-xs tracking-widest text-zinc-950 dark:text-white mb-4">Historic Deliveries ({orders.length})</h3>
                    {orders.length === 0 ? (
                      <p className="text-xs text-zinc-405 italic py-3">No orders placed under this account yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((ord) => (
                          <div key={ord.id} className="p-4 bg-gray-50/50 dark:bg-zinc-900/60 rounded-xl border border-zinc-150 dark:border-zinc-800 space-y-3">
                            <div className="flex justify-between items-center text-xs">
                              <div>
                                <span className="font-bold text-zinc-900 dark:text-white">Order ID: #{ord.id}</span>
                                <span className="text-zinc-450 block text-[10px]">{ord.date}</span>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase ${
                                ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400' :
                                ord.status === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400' :
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {ord.status}
                              </span>
                            </div>

                            <ul className="text-xs text-zinc-500 list-disc list-inside">
                              {ord.items.map((itemValue, index) => (
                                <li key={index}>
                                  {itemValue.name} ({itemValue.size}/{itemValue.color}) x{itemValue.quantity}
                                </li>
                              ))}
                            </ul>

                            <div className="flex justify-between items-center pt-2.5 border-t border-zinc-150 dark:border-zinc-800 text-xs">
                              <span className="text-zinc-500">Paid Total:</span>
                              <span className="font-bold text-zinc-950 dark:text-white">${ord.total.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

              </div>
            ) : (
              <div className="py-12 max-w-md mx-auto p-6 bg-white dark:bg-zinc-850 rounded-3xl border border-gray-150 dark:border-zinc-800 shadow-sm text-center space-y-6">
                <span className="p-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-full inline-block scale-110">
                  <UserCheck size={28} />
                </span>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-zinc-950 dark:text-white text-sm sm:text-base">Login simulation panel</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">Access your saved addresses, lookbooks, and tracking histories instantly.</p>
                </div>
                
                <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                  <div>
                    <input
                      type="email"
                      placeholder="shopper@gmail.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full py-2.5 px-4 text-xs border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white rounded-xl focus:border-zinc-950 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      className="w-full py-2.5 px-4 text-xs border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl focus:border-zinc-950 focus:outline-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-all cursor-pointer text-center shadow-sm"
                  >
                    Authenticate
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* VIEW: CART PAGE & WIZARD CHECKOUT */}
        {activePage === 'cart' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left" id="cart-workspace-panel">
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5 mb-8">
              <span className="text-xs font-black tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
                Fulfillment Desk
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white uppercase font-display leading-none mt-0.5">
                My Shopping Cart
              </h1>
            </div>

            {cart.length === 0 && checkoutStage !== 'completed' ? (
              <div className="py-20 text-center space-y-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm">
                <span className="p-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-full inline-block scale-110">
                  <ShoppingCart size={32} />
                </span>
                <h3 className="font-bold text-sm sm:text-base tracking-widest text-zinc-950 dark:text-white uppercase mt-4">Your Shopping Cart is vacant</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  You haven't added any Koth Challenges items to your cart yet. Dive into the shop collections to browse styles.
                </p>
                <button
                  onClick={() => setActivePage('shop')}
                  className="mt-4 px-6 py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-95 transition-all text-center cursor-pointer shadow-sm"
                >
                  Start shopping now
                </button>
              </div>
            ) : (
              <div>
                
                {/* CHECKOUT FLOW WIZARD HEADER STEPS */}
                {checkoutStage !== 'completed' && (
                  <div className="flex bg-gray-105 border border-zinc-200 dark:border-zinc-750 dark:bg-zinc-850 p-1.5 rounded-xl max-w-xl mb-8 flex-wrap">
                    {['cart', 'shipping', 'payment'].map((stage) => {
                      const isActive = checkoutStage === stage;
                      return (
                        <button
                          key={stage}
                          onClick={() => {
                            if (stage === 'cart') setCheckoutStage('cart');
                            if (stage === 'shipping' && cart.length > 0) setCheckoutStage('shipping');
                            if (stage === 'payment' && cart.length > 0) setCheckoutStage('payment');
                          }}
                          className={`flex-1 py-2 px-3 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all text-center cursor-pointer ${
                            isActive
                              ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                              : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white'
                          }`}
                        >
                          {stage}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* FLOW WIZARD STAGES IMPLEMENTATION */}
                {checkoutStage === 'cart' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Cart items manager */}
                    <div className="lg:col-span-2 space-y-4">
                      {cart.map((it) => (
                        <div 
                          key={it.id} 
                          className="p-4 bg-white dark:bg-zinc-850 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap"
                        >
                          <img src={it.product.images[0]} alt={it.product.name} className="w-16 h-20 rounded bg-gray-50 object-cover shrink-0" />
                          <div className="flex-1 min-w-[120px]">
                            <h4 className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white leading-tight">{it.product.name}</h4>
                            <div className="flex gap-2 text-[10px] text-zinc-400 font-bold uppercase mt-1">
                              <span>Size: <span className="text-zinc-650 dark:text-zinc-200">{it.selectedSize}</span></span>
                              <span>Color: <span className="text-zinc-650 dark:text-zinc-200">{it.selectedColor.name}</span></span>
                            </div>
                            <span className="text-xs font-bold text-zinc-900 dark:text-white block mt-1.5">${it.product.price.toFixed(2)}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Quantity counters */}
                            <div className="flex items-center border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg overflow-hidden h-9">
                              <button
                                onClick={() => {
                                  setCart(prev => prev.map((item) =>
                                    item.id === it.id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
                                  ));
                                }}
                                className="px-2.5 h-full hover:bg-gray-50 dark:hover:bg-zinc-800 font-bold text-xs cursor-pointer"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-xs font-bold antialiased text-zinc-900 dark:text-white">
                                {it.quantity}
                              </span>
                              <button
                                onClick={() => {
                                  setCart(prev => prev.map((item) =>
                                    item.id === it.id ? { ...item, quantity: Math.min(item.product.inventory, item.quantity + 1) } : item
                                  ));
                                }}
                                className="px-2.5 h-full hover:bg-gray-50 dark:hover:bg-zinc-800 font-bold text-xs cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => handleRemoveFromCart(it.id)}
                              className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right Column: checkout order totals card summary */}
                    <div className="p-6 bg-white dark:bg-zinc-850 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm h-max space-y-6">
                      <h3 className="font-bold flex items-center gap-1.5 uppercase text-xs tracking-widest text-zinc-950 dark:text-white">
                        Review Totals Summary
                      </h3>

                      {/* Coupon validation widget */}
                      <form onSubmit={handleApplyCoupon} className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wildest block">Coupon code support</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. KOTH10"
                            value={couponCodeInput}
                            onChange={(e) => setCouponCodeInput(e.target.value)}
                            className="flex-1 py-1.5 px-3 text-xs border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white uppercase font-mono rounded"
                          />
                          <button
                            type="submit"
                            className="py-1.5 px-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[10px] font-bold uppercase rounded cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                        {couponError && <span className="text-[10px] text-rose-500 block">{couponError}</span>}
                        {appliedCoupon && (
                          <span className="text-[10px] text-emerald-500 font-bold block mt-1">
                            Coupon {appliedCoupon.code} applied! ({appliedCoupon.description})
                          </span>
                        )}
                      </form>

                      {/* Calculations breakdown */}
                      <div className="text-xs space-y-3.5 border-t border-zinc-150 dark:border-zinc-800 pt-4.5 text-zinc-550 dark:text-zinc-300">
                        <div className="flex justify-between">
                          <span>Subtotal Cost:</span>
                          <span className="font-semibold text-zinc-900 dark:text-white">${cartSubtotal.toFixed(2)}</span>
                        </div>
                        {cartDiscount > 0 && (
                          <div className="flex justify-between text-emerald-500">
                            <span>Promotional Coupon Discount:</span>
                            <span>-${cartDiscount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Estimated Oklahoma Sales Tax (8.25%):</span>
                          <span className="font-semibold text-zinc-900 dark:text-white">${cartTax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ground Cargo Post Shipping:</span>
                          <span className="font-semibold text-zinc-900 dark:text-white">
                            {cartShipping === 0 ? 'FREE' : `$${cartShipping.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-zinc-150 dark:border-zinc-800 pt-3.5 text-sm">
                          <span className="font-bold text-zinc-900 dark:text-white">Final Paid Total:</span>
                          <span className="font-black text-zinc-950 dark:text-white text-base">${cartTotal.toFixed(2)}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setCheckoutStage('shipping')}
                        className="w-full py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-all text-center shadow-md cursor-pointer"
                      >
                        Proceed to Logistics Details
                      </button>
                    </div>

                  </div>
                )}

                {/* STAGE 2: SHIPPING Logistics address form */}
                {checkoutStage === 'shipping' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Deliver form left columns */}
                    <div className="lg:col-span-2 p-6 bg-white dark:bg-zinc-850 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-5">
                      <h3 className="font-bold uppercase text-xs tracking-widest text-zinc-950 dark:text-white mb-4">Shipping Logistics Address</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Full recipient Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Alexis Carter"
                            value={checkFullName}
                            onChange={(e) => setCheckFullName(e.target.value)}
                            className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white rounded-xl text-xs sm:text-sm focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Delivery Phone contact *</label>
                          <input
                            type="tel"
                            required
                            placeholder="405-479-4552"
                            value={checkPhone}
                            onChange={(e) => setCheckPhone(e.target.value)}
                            className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white rounded-xl text-xs sm:text-sm focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Street address *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 1402 Jenkins Ave Blvd"
                          value={checkAddress}
                          onChange={(e) => setCheckAddress(e.target.value)}
                          className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white rounded-xl text-xs sm:text-sm focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Town / City *</label>
                          <input
                            type="text"
                            required
                            placeholder="Oklahoma City"
                            value={checkCity}
                            onChange={(e) => setCheckCity(e.target.value)}
                            className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white rounded-xl text-xs sm:text-sm focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-1">State Code</label>
                          <input
                            type="text"
                            value={checkState}
                            disabled
                            className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 text-zinc-500 rounded-xl text-xs sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Zip Code *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 73102"
                          value={checkZip}
                          onChange={(e) => setCheckZip(e.target.value)}
                          className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white rounded-xl text-xs sm:text-sm focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-zinc-150 dark:border-zinc-800">
                        <button
                          onClick={() => setCheckoutStage('cart')}
                          className="px-6 py-2 h-11 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-700 dark:text-zinc-300 text-xs font-bold uppercase tracking-widest"
                        >
                          Item review
                        </button>
                        <button
                          onClick={() => {
                            if (checkFullName && checkAddress && checkCity) {
                              setCheckoutStage('payment');
                            }
                          }}
                          disabled={!checkFullName || !checkAddress || !checkCity}
                          className="px-6 py-2 h-11 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 disabled:opacity-50 hover:opacity-90 rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer"
                        >
                          Payment portal
                        </button>
                      </div>
                    </div>

                    {/* Order summary item column sidebar */}
                    <div className="p-6 bg-white dark:bg-zinc-850 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm h-max space-y-4">
                      <h3 className="font-bold uppercase text-xs tracking-widest text-zinc-950 dark:text-white mb-2">Checkout Bag</h3>
                      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        {cart.map((it) => (
                          <div key={it.id} className="py-2.1 flex justify-between items-center text-xs text-zinc-600 dark:text-zinc-300">
                            <span className="truncate max-w-[150px]">{it.product.name} (x{it.quantity})</span>
                            <span className="font-bold text-zinc-900 dark:text-white">${(it.product.price * it.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-zinc-150 dark:border-zinc-800 pt-3 flex justify-between text-xs text-zinc-900 dark:text-white font-extrabold">
                        <span>Invoice Total Amount:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>

                  </div>
                )}

                {/* STAGE 3: PAYMENT mockup Stripe portal */}
                {checkoutStage === 'payment' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Card inputs left column */}
                    <form onSubmit={handleCompletePayment} className="lg:col-span-2 p-6 bg-white dark:bg-zinc-850 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-5">
                      <h3 className="font-bold flex items-center gap-1.5 uppercase text-xs tracking-widest text-zinc-950 dark:text-white mb-4">
                        <CreditCard size={15} /> Card Transaction Gateway
                      </h3>
                      
                      <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/40 text-xs flex gap-2">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <div>
                          <strong>Mock transactions model:</strong> Insert any random 16 digit card number to submit. This uses styled Stripe layout rules. No real money triggers.
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Card Holder Recipient *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alexis Carter"
                          defaultValue={checkFullName}
                          className="w-full py-2.5 px-4 border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white rounded-xl text-xs sm:text-sm focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Card Number *</label>
                        <input
                          type="text"
                          required
                          placeholder="4111 2222 3333 4444"
                          maxLength={19}
                          className="w-full py-2.5 px-4 border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white font-mono rounded-xl text-xs sm:text-sm focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Expiration date *</label>
                          <input
                            type="text"
                            required
                            placeholder="MM / YY"
                            maxLength={5}
                            className="w-full py-2.5 px-4 border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white rounded-xl text-xs sm:text-sm focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-1">CVC Code *</label>
                          <input
                            type="password"
                            required
                            placeholder="•••"
                            maxLength={3}
                            className="w-full py-2.5 px-4 border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white rounded-xl text-xs sm:text-sm focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-zinc-150 dark:border-zinc-800">
                        <button
                          type="button"
                          onClick={() => setCheckoutStage('shipping')}
                          className="px-6 py-2 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-widest"
                        >
                          Shipping data
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-900 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          Complete Order of ${cartTotal.toFixed(2)}
                        </button>
                      </div>
                    </form>

                    {/* summary item column sidebar */}
                    <div className="p-6 bg-white dark:bg-zinc-850 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm h-max text-xs space-y-4">
                      <h3 className="font-bold uppercase text-xs tracking-widest text-zinc-950 dark:text-white mb-2">Invoice Summary Breakdown</h3>
                      <div className="flex justify-between">
                        <span>Items subtotal Amount:</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">${cartSubtotal.toFixed(2)}</span>
                      </div>
                      {cartDiscount > 0 && (
                        <div className="flex justify-between text-emerald-500">
                          <span>Applied Coupon reduction:</span>
                          <span>-${cartDiscount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Ground post shipping:</span>
                        <span>{cartShipping === 0 ? 'FREE' : `$${cartShipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sales tax computation:</span>
                        <span>${cartTax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-zinc-150 dark:border-zinc-800 pt-3 flex justify-between font-extrabold text-sm text-zinc-950 dark:text-white">
                        <span>Total Paid sum:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>

                  </div>
                )}

                {/* STAGE 4: CHECKOUT COMPLETED INVOICE RECEIPT */}
                {checkoutStage === 'completed' && placedOrder && (
                  <div className="max-w-xl mx-auto p-6 sm:p-8 bg-white dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl relative space-y-6" id="order-completed-receipt">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full w-max mx-auto text-center scale-110">
                      <CheckCircle size={32} />
                    </div>

                    <div className="text-center space-y-1">
                      <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.25em] block">✓ CASH SECURE SUCCESS</span>
                      <h3 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white uppercase font-display leading-none">Order Invoice Placed!</h3>
                      <p className="text-xs text-zinc-405">Thank you for supporting sovereign Oklahoma-built apparel.</p>
                    </div>

                    {/* Invoice Receipt tickets */}
                    <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-150 dark:border-zinc-800 text-xs font-mono space-y-3">
                      <div className="flex justify-between font-bold border-b border-dashed border-zinc-250 pb-2.5 text-zinc-900 dark:text-white">
                        <span>Invoice ID: #{placedOrder.id}</span>
                        <span>Date: {placedOrder.date}</span>
                      </div>

                      <div className="space-y-1.5 pb-2.5">
                        <span className="font-sans font-extrabold block text-zinc-500 text-[10px] tracking-widest uppercase">Bought items log</span>
                        {placedOrder.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{it.name} (x{it.quantity})</span>
                            <span className="font-sans font-bold text-zinc-950 dark:text-white">${(it.price * it.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-dashed border-zinc-250 pt-2.5 space-y-2 text-zinc-655">
                        <div className="flex justify-between">
                          <span>Tax component:</span>
                          <span>${placedOrder.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping Cargo:</span>
                          <span>{placedOrder.shipping === 0 ? 'FREE' : `$${placedOrder.shipping.toFixed(2)}`}</span>
                        </div>
                        {placedOrder.discount > 0 && (
                          <div className="flex justify-between text-emerald-500">
                            <span>Promotional Coupon deduction:</span>
                            <span>-${placedOrder.discount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm font-extrabold border-t border-zinc-200 dark:border-zinc-700 pt-2 text-zinc-950 dark:text-white">
                          <span>Total Amount Paid:</span>
                          <span>${placedOrder.total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="border-t border-dashed border-zinc-250 pt-2.5 font-sans leading-relaxed text-zinc-500 text-[10px]">
                        <span className="font-extrabold uppercase block text-zinc-400">Logistics address</span>
                        <strong>Name:</strong> {placedOrder.shippingAddress.fullName} <br />
                        <strong>Address:</strong> {placedOrder.shippingAddress.address}, {placedOrder.shippingAddress.city}, OK, {placedOrder.shippingAddress.zipCode}
                      </div>
                    </div>

                    <div className="flex justify-center pt-3.5">
                      <button
                        onClick={() => {
                          setPlacedOrder(null);
                          setActivePage('home');
                          window.scrollTo(0, 0);
                        }}
                        className="px-8 py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-all text-center"
                      >
                        Return to Dashboard
                      </button>
                    </div>

                  </div>
                )}

              </div>
            )}
          </div>
        )}

        {/* VIEW: ADMIN OPERATIONS DASHBOARD */}
        {activePage === 'admin' && (
          <AdminDashboard 
            products={products}
            setProducts={setProducts}
            orders={orders}
            setOrders={setOrders}
            coupons={coupons}
            setCoupons={setCoupons}
          />
        )}

      </main>

      {/* 3. Immersive Footer Credits */}
      <Footer setActivePage={setActivePage} />

      {/* 4. Interactive Floating Chat-Stylist Concierge */}
      <Chatbot />

      {/* 5. Scroll To Top Floaters */}
      {scrollVisible && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full col bg-white dark:bg-zinc-800 text-zinc-850 dark:text-white border border-zinc-200 dark:border-zinc-700 shadow-xl flex items-center justify-center hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          id="scroll-to-top-floater-btn"
          title="Scroll back to top"
        >
          <ArrowUp size={18} className="animate-pulse" />
        </button>
      )}

      {/* AUTHENTICATION MODAL POPUP */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative text-left">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="font-extrabold tracking-widest text-sm uppercase text-zinc-400 block mb-1">
              KOTH CHALLENGES MEMBERSHIP
            </h3>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-950 dark:text-white font-display">
              Access Sovereign Account
            </h2>

            <form onSubmit={handleLoginSubmit} className="space-y-4 pt-6">
              {authError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950/40 text-rose-600 dark:text-rose-450 text-xs rounded-xl">
                  {authError}
                </div>
              )}

              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-1">Email Coordinates *</label>
                <input
                  type="email"
                  placeholder="shopper@gmail.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full py-2.5 px-4 text-xs border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white rounded-xl focus:border-zinc-950 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-1">Account Secret Password *</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="w-full py-2.5 px-4 text-xs border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white rounded-xl focus:border-zinc-950 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-black uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-95 transition-all text-center shadow-md cursor-pointer"
                >
                  Confirm Signin Access
                </button>
              </div>

              <div className="text-center text-[10px] text-zinc-400 uppercase pt-2">
                Don't have a login coordinate? Simply input any email & password to test sign-up instantly.
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
