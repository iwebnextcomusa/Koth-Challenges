/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, MoveRight, HelpCircle } from 'lucide-react';

interface ParallaxHeroProps {
  onShopClick: () => void;
}

export default function ParallaxHero({ onShopClick }: ParallaxHeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse move effect for subtle 3D tilting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30; // Max 15px shift
      const y = (e.clientY / innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll effect for layers shifting
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? scrolled / maxScroll : 0;
      setScrollProgress(pct * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="relative w-full h-screen min-h-[650px] bg-zinc-950 text-white overflow-hidden flex items-center justify-center -mt-16 sm:-mt-20 pt-28 pb-16 sm:pt-36 sm:pb-24"
      id="brand-parallax-hero"
    >
      {/* 1. Ambient Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 select-none scale-110 blur-[1px] transition-transform duration-300 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1500")',
          transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px) translateY(${scrollProgress * 0.3}px)`
        }}
      />

      {/* 2. Atmospheric Golden Dusk Radial Gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-zinc-950/40 to-zinc-950" />

      {/* 3. Floating 3D Geometric elements (Framer-like abstract canvas vectors) */}
      <div 
        className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500/20 to-rose-500/10 blur-2xl animate-pulse pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * -0.7}px, ${mousePos.y * -0.7}px)`
        }}
      />
      <div 
        className="absolute bottom-1/4 right-10 w-36 h-36 rounded-full bg-gradient-to-tr from-blue-500/10 to-emerald-500/20 blur-3xl pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)`
        }}
      />

      {/* 4. Interactive Hero Text Context Frame */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-8 select-none">
        
        {/* State/Region Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold tracking-widest text-amber-400 capitalize cursor-default"
          style={{
            transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`
          }}
        >
          <Sparkles size={12} className="animate-pulse" />
          EST. Oklahoma, USA
        </div>

        {/* Brand statement Display Heading */}
        <div 
          className="space-y-4 max-w-4xl mx-auto"
          style={{
            transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`
          }}
        >
          <h1 className="serif text-4xl sm:text-7xl lg:text-9xl leading-[0.9] font-light text-white tracking-tight uppercase">
            Modern<br />
            <span className="italic pl-[10%] sm:pl-[12%] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-rose-200">
              Prairie
            </span>
          </h1>
          <p className="text-white/65 text-sm sm:text-base lg:text-lg font-light tracking-widest max-w-xl mx-auto mt-6 uppercase leading-relaxed font-sans">
            Elevated apparel rooted in the heart of Oklahoma. Precision tailoring meets rugged resilience. Designed for the modern sovereign lifestyle.
          </p>
        </div>

        {/* Buttons Action Group */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          style={{
            transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`
          }}
        >
          <button
            onClick={onShopClick}
            className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-950 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-100 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            id="hero-primary-cta"
          >
            Explore collections
            <MoveRight size={16} className="transform group-hover:translate-x-2 transition-transform duration-300" />
          </button>
          
          <button
            onClick={() => {
              const element = document.getElementById('brand-mission-section');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl active:scale-95 transition-all text-center cursor-pointer"
            id="hero-secondary-cta"
          >
            Our story
          </button>
        </div>

      </div>

      {/* 5. Custom sliding Marquee footer representing high-luxury runways */}
      <div className="absolute bottom-0 left-0 right-0 py-3 bg-zinc-900 border-t border-zinc-850 overflow-hidden select-none whitespace-nowrap">
        <div className="marquee-line inline-block text-[9px] sm:text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 space-x-12">
          <span>🌿 GOTS loopback organic Egyptian cotton</span>
          <span>⚡ Electric stadium varsity wools</span>
          <span>⚜️ Tulsa art deco Mulberry silks</span>
          <span>🌾 Authentic Norman wheat fields cable weaves</span>
          <span>🏜️ Oklahoma red soils organic pigment dyes</span>
          
          <span>🌿 GOTS loopback organic Egyptian cotton</span>
          <span>⚡ Electric stadium varsity wools</span>
          <span>⚜️ Tulsa art deco Mulberry silks</span>
          <span>🌾 Authentic Norman wheat fields cable weaves</span>
          <span>🏜️ Oklahoma red soils organic pigment dyes</span>
        </div>
      </div>
    </div>
  );
}
