/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActivePage: (p: string) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  return (
    <footer className="bg-[#0A0A0A] text-zinc-400 border-t border-white/10 transition-colors duration-300" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand & Mission Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="serif text-lg font-light tracking-[0.2em] text-white uppercase italic">
                KOTH.
              </span>
            </div>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light tracking-wide">
              Premium clothing apparel blending central prairie soul with high-fashion urban luxury. Handcrafted, ethically sourced, and designed right in Oklahoma, USA.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-white/5 border border-white/5 text-white/50 hover:text-white transition-colors">
                <Instagram size={14} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-white/5 border border-white/5 text-white/50 hover:text-white transition-colors">
                <Facebook size={14} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-white/5 border border-white/5 text-white/50 hover:text-white transition-colors">
                <Twitter size={14} />
              </a>
            </div>
          </div>

          {/* Quick Shop Routing Links */}
          <div>
            <h3 className="serif text-white font-light text-xs tracking-[0.2em] uppercase mb-5">
              Collections
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-white/50">
              <li>
                <button onClick={() => setActivePage('shop')} className="hover:text-white transition-colors cursor-pointer text-left font-light tracking-wide">
                  Men's Outerwear & Shirts
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('shop')} className="hover:text-white transition-colors cursor-pointer text-left font-light tracking-wide">
                  Women's Prairie Dresses
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('shop')} className="hover:text-white transition-colors cursor-pointer text-left font-light tracking-wide">
                  Unisex Red Dirt Fleece
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('shop')} className="hover:text-white transition-colors cursor-pointer text-left font-light tracking-wide">
                  Oklahoma Architectural Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Store Integrity & Guidelines Links */}
          <div>
            <h3 className="serif text-white font-light text-xs tracking-[0.2em] uppercase mb-5">
              Customer Support
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-white/50">
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-white transition-colors cursor-pointer text-left font-light tracking-wide">
                  About Our Brand
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors cursor-pointer text-left font-light tracking-wide">
                  Contact Informational coordinates
                </button>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest bg-white/5 px-2 py-1 text-white/60 w-max cursor-default">
                  <ShieldCheck size={11} /> Secure Transactions
                </span>
              </li>
            </ul>
          </div>

          {/* Business Hours & Oklahoma Coordinates Column */}
          <div className="space-y-3.5 text-xs sm:text-sm text-white/50">
            <h3 className="serif text-white font-light text-xs tracking-[0.2em] uppercase mb-5 col-title">
              Contact KOTH
            </h3>
            <div className="flex items-start gap-2.5 font-light tracking-wide">
              <MapPin size={16} className="text-white/40 mt-0.5 shrink-0" />
              <span>Oklahoma, USA</span>
            </div>
            <div className="flex items-center gap-2.5 font-light tracking-wide">
              <Phone size={15} className="text-white/40 shrink-0" />
              <a href="tel:4054794552" className="hover:text-white transition-colors">
                405-479-4552
              </a>
            </div>
            <div className="flex items-center gap-2.5 font-light tracking-wide">
              <Mail size={15} className="text-white/40 shrink-0" />
              <a href="mailto:kothchallenges@gmail.com" className="hover:text-white transition-colors break-all">
                kothchallenges@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* Footer Base Separator */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-white/30 tracking-wider gap-4">
          <div>
            &copy; {new Date().getFullYear()} Koth Challenges. All Rights Reserved. Oklahoma's Premier Fashion House.
          </div>
          <div className="font-light tracking-widest">
            Developed by{' '}
            <a 
              href="https://iwebnext.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-white/70 underline underline-offset-4 font-bold uppercase transition-colors"
              id="iwebnext-developer-credit-link"
            >
              iWebNext
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
