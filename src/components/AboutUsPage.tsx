/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { Target, Heart, Scale, ShieldCheck } from 'lucide-react';

export default function AboutUsPage() {
  const images = [
    "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=700",
    "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=700",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=700",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=700"
  ];

  const valuesCodes = [
    {
      icon: <Target className="text-zinc-900 dark:text-white" size={24} />,
      title: "Prairie Honesty",
      desc: "Our business operations prioritize transparency and fair dealing. We operate directly, avoiding hidden markups or misleading promotions."
    },
    {
      icon: <Heart className="text-zinc-900 dark:text-white" size={24} />,
      title: "Authentic Sourcing",
      desc: "We commit to organic, loopback cotton weaves naturally dyed with mineral-rich clay, and traceable Australian wool, respecting community environments."
    },
    {
      icon: <Scale className="text-zinc-900 dark:text-white" size={24} />,
      title: "Modern Sustainability",
      desc: "Minimizing carbon footsteps by crafting clothing that endures. We eschew fast-fashion cycles in favor of permanent, high-quality wear."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20 text-left" id="about-us-page-view">
      
      {/* 1. Header Hero section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
          Our Heritage
        </span>
        <h1 className="serif text-4xl sm:text-5xl font-light tracking-tight text-white uppercase leading-tight">
          SOONER STATE LUXURY APPAREL
        </h1>
        <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light tracking-wide max-w-2xl mx-auto">
          Koth Challenges was founded to bridge Oklahoma’s rich, natural, heartland history with the sophisticated lines of modern luxury streetwear. Designed in Oklahoma City and Tulsa, we create clothing of permanent character.
        </p>
      </div>

      {/* 2. Brand Story Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-white/10 pt-16" id="brand-mission-section">
        <div className="space-y-6">
          <h2 className="serif text-2xl sm:text-3xl font-light tracking-wide uppercase text-white">
            Whip-Sawed Prairie Winds & Elegant Silk
          </h2>
          <p className="text-white/70 text-sm leading-relaxed tracking-wide font-light">
            Oklahoma’s landscapes are defined by contrast—from the sharp sand dunes of the Salt Plains to the Art Deco crown jewels peaking above Tulsa's skyline. Koth Challenges embodies this dramatic landscape.
          </p>
          <p className="text-white/70 text-sm leading-relaxed tracking-wide font-light">
            Our Red Dirt loopback Egyptian cotton sweaters are washed under meticulous enzyme balances to lock in their signature clay hues, while our premium varsity jackets represent the high-energy roar of downtown arena nights.
          </p>
          <div className="p-5 bg-white/[0.02] border border-white/5 flex items-start gap-4">
            <ShieldCheck className="text-amber-400 shrink-0 mt-0.5" size={20} />
            <span className="text-xs leading-relaxed text-white/50 tracking-wide font-light">
              <strong>Our Commitment:</strong> We ensure 100% verified materials, ethical wages for our garment artisans, and durable double-needle stitching that stays reliable for decades.
            </span>
          </div>
        </div>

        {/* Brand Culture Lifestyle Image grid with parallax highlights */}
        <div className="grid grid-cols-2 gap-4">
          {images.map((imgUrl, index) => (
            <div 
              key={index}
              className={`aspect-square overflow-hidden border border-white/5 shadow-sm relative group transform transition-all hover:scale-102 duration-300 ${
                index % 2 === 1 ? 'translate-y-6' : ''
              }`}
            >
              <img 
                src={imgUrl} 
                alt={`Lifestyle brand model ${index}`}
                className="w-full h-full object-cover transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-[9px] text-white/80 font-bold uppercase tracking-widest leading-none">
                  KOTH CHALLENGES COLLECTION
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Core Values Grid Section */}
      <div className="border-t border-white/10 pt-20">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="serif text-2xl font-light tracking-wide text-white uppercase">
            OUR OPERATIONS STANDARDS
          </h2>
          <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mt-1">Foundational rules of our sovereign plains business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valuesCodes.map((val, idx) => (
            <div 
              key={idx}
              className="p-8 bg-white/[0.02] border border-white/5 text-center space-y-4 hover:border-white/20 transition-all duration-300"
            >
              <div className="p-3 bg-white/5 w-max mx-auto">
                {val.icon}
              </div>
              <h3 className="serif text-base font-light tracking-widest text-white uppercase">
                {val.title}
              </h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light tracking-wide">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
