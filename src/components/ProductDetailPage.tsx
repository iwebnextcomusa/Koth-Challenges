/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, Review } from '../types';
import { 
  Heart, ShoppingCart, Star, ShieldCheck, ArrowLeft, Ruler, 
  HelpCircle, MessageSquare, Flame, CheckCircle, AlertCircle
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (prod: Product, size: string, color: { name: string; value: string }, qty: number) => void;
  onAddToWishlist: (prod: Product) => void;
  isWishlisted: boolean;
  relatedProducts: Product[];
  onSelectProduct: (id: string) => void;
}

export default function ProductDetailPage({
  product,
  onBack,
  onAddToCart,
  onAddToWishlist,
  isWishlisted,
  relatedProducts,
  onSelectProduct
}: ProductDetailPageProps) {
  const [selectedImg, setSelectedImg] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Reviews list stored locally to allow user additions
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "r-1",
      userName: "Madison Wright",
      rating: 5,
      comment: `Perfect craftsmanship! I bought this item to wear at an outdoor arts evening in Tulsa. It kept me incredibly snug and I received countless compliments on the styling details. Will definitely order in other colors!`,
      date: "May 12, 2026",
      verified: true
    },
    {
      id: "r-2",
      userName: "Jake Henderson",
      rating: 4,
      comment: `The material feels dense and premium, not like thin mall fast fashion. Delivery to Norman took only 2 days! Deducted 1 star because sizes run slightly relaxed, but fits great. Highly recommended.`,
      date: "April 28, 2026",
      verified: true
    }
  ]);

  // Review Form States
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Sync state if product shifts
  useEffect(() => {
    setSelectedImg(product.images[0]);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setQty(1);
    setReviewSuccess(false);
  }, [product]);

  // Handle adding new review
  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formComment) return;

    const newRevItem: Review = {
      id: `r-user-${Date.now()}`,
      userName: formName,
      rating: formRating,
      comment: formComment,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      verified: true
    };

    setReviews(prev => [newRevItem, ...prev]);
    setReviewSuccess(true);
    setFormName('');
    setFormComment('');
    setFormRating(5);
  };

  // Score Calculations
  const averageRating = (
    (reviews.reduce((acc, rev) => acc + rev.rating, 0) + (product.rating * product.reviewsCount)) / 
    (reviews.length + product.reviewsCount)
  ).toFixed(1);

  const totalReviewsCount = reviews.length + product.reviewsCount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left" id="product-detail-view-container">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white mb-10 group cursor-pointer"
        id="detail-back-button"
      >
        <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" />
        Return to shop catalog
      </button>

      {/* Main product setup columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left Column: Visual gallery aspect */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-[#0E0E0E] overflow-hidden border border-white/5 relative group">
            <img
              src={selectedImg}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
            />
            {product.isNewArrival && (
              <span className="absolute top-4 left-4 bg-white text-black text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                New Arrival
              </span>
            )}
            {product.inventory < 12 && (
              <span className="absolute top-4 right-4 bg-white/20 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 flex items-center gap-1 backdrop-blur-sm">
                <Flame size={12} /> Low Stock
              </span>
            )}
          </div>
          
          {/* Thumbnails list row */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImg(img)}
                className={`aspect-[4/5] overflow-hidden border transition-all ${
                  selectedImg === img 
                    ? 'border-white border-2' 
                    : 'border-white/5 bg-[#0E0E0E] hover:border-white/20'
                }`}
              >
                <img src={img} alt={`thumbnail-${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Buying controls & detail data */}
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-6 text-left">
            <span className="text-[10px] tracking-[0.2em] text-white/35 uppercase block">
              {product.category} • {product.subcategory}
            </span>
            <h1 className="serif text-3xl sm:text-4xl lg:text-5xl font-light text-white uppercase mt-2">
              {product.name}
            </h1>
            
            {/* Rating row */}
            <div className="flex items-center gap-2 mt-4 text-xs font-mono">
              <div className="flex text-amber-300 gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    fill={i < Math.round(parseFloat(averageRating)) ? "currentColor" : "none"} 
                  />
                ))}
              </div>
              <span className="text-[10px] tracking-widest text-white/40 block">
                {averageRating} / 5.0 • ({totalReviewsCount} Customer reviews)
              </span>
            </div>

            {/* Price values */}
            <div className="flex items-baseline gap-3.5 mt-6">
              <span className="font-light text-2xl sm:text-3xl text-white font-mono">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs font-light text-white/40 line-through font-mono">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Description blocks */}
          <p className="text-white/70 text-sm leading-relaxed tracking-wide font-light text-left">
            {product.description}
          </p>

          {/* COLOR SELECTOR */}
          <div>
            <span className="text-[10px] text-white/40 uppercase tracking-[0.15em] block mb-3">
              Select Color Variant: <span className="text-white font-semibold">{selectedColor.name}</span>
            </span>
            <div className="flex items-center space-x-3.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-7 h-7 rounded-full border-2 transition-all relative ${
                    selectedColor.name === color.name
                      ? 'border-white scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {selectedColor.name === color.name && (
                    <span className="absolute inset-0.5 rounded-full border border-black mix-blend-difference" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* SIZE CHANGER & SIZE GUIDE */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] text-white/40 uppercase tracking-[0.15em]">
                Select Size: <span className="text-white font-semibold">{selectedSize}</span>
              </span>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="flex items-center gap-1.5 text-[10px] font-bold text-white/40 hover:text-white uppercase tracking-widest underline underline-offset-4 cursor-pointer"
                id="size-guide-modal-trigger"
              >
                <Ruler size={12} /> Sizing Chart
              </button>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`min-w-[48px] h-12 text-xs font-bold uppercase transition-all tracking-wider ${
                    selectedSize === sz
                      ? 'bg-white text-black font-bold border-transparent'
                      : 'border border-white/10 hover:border-white/30 text-white bg-black/10'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY CONTROL & PRIMARY ADD BUTTON */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            
            <div className="flex items-center gap-3">
              {/* Quant helper count */}
              <div className="flex items-center border border-white/15 bg-black/20 h-14 overflow-hidden">
                <button
                  onClick={() => setQty(prev => Math.max(1, prev - 1))}
                  className="w-12 h-full hover:bg-white/5 active:bg-white/10 flex items-center justify-center font-bold text-lg text-white/50 hover:text-white cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center text-xs font-semibold text-white font-mono">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(prev => Math.min(product.inventory, prev + 1))}
                  className="w-12 h-full hover:bg-white/5 active:bg-white/10 flex items-center justify-center font-bold text-lg text-white/50 hover:text-white cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Primary Cart Add key */}
              <button
                onClick={() => onAddToCart(product, selectedSize, selectedColor, qty)}
                className="flex-1 h-14 bg-white text-black hover:opacity-90 active:scale-98 text-xs font-bold uppercase tracking-widest transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-md"
                id="add-to-cart-cta"
              >
                <ShoppingCart size={14} />
                Add to shopping bag
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => onAddToWishlist(product)}
                className={`h-14 w-14 border flex items-center justify-center transition-all cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-950/20 border-rose-900/50 text-rose-400'
                    : 'border-white/10 hover:border-white text-white/40 hover:text-white'
                }`}
                title="Bookmark to Wishlist"
              >
                <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Shipment delivery terms overview */}
            <div className="flex items-center gap-2.5 text-[10px] text-white/40 tracking-wider mt-2 uppercase">
              <ShieldCheck size={14} className="text-white/60" />
              <span>Full GOTS authenticity guaranteed • Prompt Oklahoma-based delivery</span>
            </div>
          </div>

          {/* Details specs bullet breakdown */}
          <div className="border-t border-white/10 pt-6 text-left">
            <h4 className="text-[10px] tracking-widest text-white/40 uppercase block mb-3 font-semibold">Product specifications</h4>
            <ul className="text-xs text-white/60 space-y-1.5 list-disc list-inside leading-relaxed font-light tracking-wide">
              {product.details.map((det, idx) => (
                <li key={idx}>{det}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* REVIEWS SEGMENT */}
      <div className="border-t border-white/10 mt-20 pt-16 max-w-4xl text-left">
        <h3 className="serif text-2xl font-light text-white uppercase mb-1 flex items-center gap-2">
          <MessageSquare size={18} className="text-white/50" /> Customer Reviews
        </h3>
        <p className="text-xs tracking-widest text-white/40 uppercase mb-8">What our customers say about {product.name}</p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Summary Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="p-6 bg-white/[0.02] border border-white/5 text-center">
              <span className="text-5xl font-light text-white block font-mono">{averageRating}</span>
              <span className="text-[10px] tracking-widest text-white/45 block mt-2 uppercase">Out of 5 Stars</span>
              <div className="flex justify-center text-amber-300 my-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    fill={i < Math.round(parseFloat(averageRating)) ? "currentColor" : "none"} 
                  />
                ))}
              </div>
              <span className="text-xs font-light text-white/50 block">
                Based on {totalReviewsCount} ratings
              </span>
            </div>

            {/* Add Review Form */}
            <form onSubmit={handleAddReviewSubmit} className="p-6 bg-white/[0.02] border border-white/5 space-y-4">
              <h4 className="serif text-sm font-light text-white uppercase tracking-wider mb-2">Write a Review</h4>
              
              {reviewSuccess ? (
                <div className="p-4 bg-white/5 border border-white/10 text-white text-xs flex gap-2">
                  <CheckCircle size={15} className="shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Review Published!</span>
                    Thank you. Your feedback is verified and posted dynamically.
                  </div>
                </div>
              ) : (
                <>
                  <div className="pointer-events-auto">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full py-2.5 px-3 text-xs border border-white/10 bg-black/30 placeholder-white/20 text-white focus:border-white focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[9px] text-white/40 uppercase tracking-widest block mb-2">Star rating ({formRating}/5)</label>
                    <div className="flex text-amber-300 gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => setFormRating(i + 1)}
                          className="hover:scale-110 active:scale-95 transition-transform"
                        >
                          <Star size={18} fill={i < formRating ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pointer-events-auto">
                    <textarea
                      placeholder="Write your review experience here..."
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      rows={3}
                      className="w-full py-2.5 px-3 text-xs border border-white/10 bg-black/30 placeholder-white/20 text-white focus:border-white focus:outline-none resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer text-center"
                  >
                    Submit Review
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Reviews list log */}
          <div className="md:col-span-3 space-y-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-white/[0.02] border border-white/5 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-4 text-left">
                  <div>
                    <span className="serif text-base font-light text-white block">{rev.userName}</span>
                    <span className="text-[10px] text-white/40 font-mono block mt-1">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-300">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={11} 
                        fill={i < rev.rating ? "currentColor" : "none"} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-white/70 leading-relaxed mt-4 italic text-left font-light tracking-wide">
                  "{rev.comment}"
                </p>
                {rev.verified && (
                  <div className="flex items-center gap-1.5 text-[9px] tracking-widest text-emerald-400 mt-4 uppercase">
                    <CheckCircle size={12} /> Verified Buyer
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="border-t border-white/10 mt-20 pt-16 text-left">
        <h3 className="serif text-2xl font-light text-white uppercase mb-1">
          Related Apparel Items
        </h3>
        <p className="text-xs tracking-widest text-white/40 uppercase mb-8">Complement your collections with native KOTH standards</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.slice(0, 4).map((rel) => (
            <div 
              key={rel.id} 
              onClick={() => onSelectProduct(rel.id)}
              className="group bg-white/[0.02] border border-white/5 p-4 cursor-pointer hover:border-white/20 transition-all duration-350"
            >
              <div className="aspect-[4/5] bg-neutral-900 overflow-hidden mb-4 relative">
                <img 
                  src={rel.images[0]} 
                  alt={rel.name} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                />
              </div>
              <span className="text-[10px] text-white/40 tracking-wider block mt-2 uppercase">{rel.subcategory}</span>
              <span className="serif text-base font-light text-white block truncate mt-1 group-hover:underline">
                {rel.name}
              </span>
              <span className="font-light text-xs sm:text-sm font-mono text-white/80 block mt-1.5">${rel.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SIZING CHART MODAL POPUP */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left">
          <div className="bg-[#0F0F0F] border border-white/10 p-6 w-full max-w-md shadow-2xl relative">
            <h3 className="serif text-lg font-light text-white uppercase tracking-wider mb-4">
              KOTH Sizing Chart Guide
            </h3>
            
            <p className="text-xs text-white/55 leading-relaxed mb-4 font-light tracking-wide">
              All sizes are styled with a slightly relaxed, premium modern fit. Measure around your chest, waist, and sleeve boundaries to find your fit block.
            </p>

            <table className="w-full text-left text-xs border border-white/10">
              <thead>
                <tr className="bg-white/5 text-white border-b border-white/15">
                  <th className="p-2.5 uppercase font-bold tracking-wider">Size label</th>
                  <th className="p-2.5 uppercase font-bold tracking-wider">Chest (inch)</th>
                  <th className="p-2.5 uppercase font-bold tracking-wider font-mono">Waist (inch)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/60 tracking-wide font-light">
                <tr>
                  <td className="p-2.5 font-bold">XS</td>
                  <td className="p-2.5">32 - 34"</td>
                  <td className="p-2.5">26 - 28"</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">S</td>
                  <td className="p-2.5">35 - 37"</td>
                  <td className="p-2.5">29 - 31"</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">M</td>
                  <td className="p-2.5">38 - 40"</td>
                  <td className="p-2.5">32 - 34"</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">L</td>
                  <td className="p-2.5">41 - 43"</td>
                  <td className="p-2.5">35 - 37"</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">XL</td>
                  <td className="p-2.5">44 - 46"</td>
                  <td className="p-2.5">38 - 40"</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">XXL</td>
                  <td className="p-2.5">47 - 49"</td>
                  <td className="p-2.5">41 - 43"</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end pt-5">
              <button
                onClick={() => setShowSizeGuide(false)}
                className="px-6 py-2 bg-white text-black hover:opacity-90 text-xs font-bold uppercase tracking-widest transition-opacity cursor-pointer text-center"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
