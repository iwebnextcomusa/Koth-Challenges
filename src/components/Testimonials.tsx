/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { INITIAL_TESTIMONIALS } from '../data';
import { Star, Quote, Heart } from 'lucide-react';

export default function Testimonials() {
  return (
    <div className="w-full py-16" id="client-testimonials-section text-left">
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
          HEARTLAND OPINIONS
        </span>
        <h2 className="serif text-3xl font-light text-white uppercase mt-2">
          WHAT THEY SAY ABOUT KOTH
        </h2>
        <p className="text-xs tracking-widest text-white/40 uppercase mt-2">Verified buyer experiences across Oklahoma</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {INITIAL_TESTIMONIALS.map((test) => (
          <div 
            key={test.id}
            className="p-8 bg-white/[0.02] border border-white/5 relative flex flex-col justify-between hover:border-white/20 transition-all duration-300"
          >
            {/* Top-right Quote icon */}
            <Quote className="absolute top-6 right-6 text-white/5 shrink-0 pointer-events-none" size={32} />

            <div className="space-y-4">
              {/* Stars ratings */}
              <div className="flex text-amber-300 gap-0.5">
                {Array.from({ length: test.rating }).map((_, i) => (
                  <Star key={i} size={11} fill="currentColor" />
                ))}
              </div>

              {/* Feedback comment */}
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light italic relative z-10 text-left">
                "{test.comment}"
              </p>
            </div>

            {/* Author info row aligned bottom */}
            <div className="flex items-center gap-3.5 mt-8 border-t border-white/5 pt-5 select-none text-left">
              <img 
                src={test.avatar} 
                alt={test.name} 
                className="w-10 h-10 object-cover shrink-0 bg-neutral-900 border border-white/5"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="serif text-sm font-light text-white block">{test.name}</span>
                <span className="text-[10px] text-white/40 tracking-wider block mt-0.5">{test.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
