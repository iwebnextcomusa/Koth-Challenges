/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, ShieldCheck, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [emailValue, setEmailValue] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValue.trim()) return;

    setSubscribed(true);
    setEmailValue('');
  };

  return (
    <div className="w-full bg-[#0E0E0E] text-white p-8 sm:p-12 border border-white/5 relative overflow-hidden my-16 text-left" id="newsletter-signup-panel">
      {/* Decorative ambient blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/5 to-transparent blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tl from-rose-500/5 to-transparent blur-2xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center z-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 text-[9px] font-bold text-white/50 tracking-widest uppercase bg-white/5 border border-white/10 px-3 py-1 cursor-default">
            <Sparkles size={10} className="animate-spin text-white/40" /> JOIN OUR COMMUNITY
          </div>
          <h2 className="serif text-2xl sm:text-3xl font-light tracking-wide uppercase text-white max-w-sm">
            SUBSCRIBE FOR SEASONAL PLAINS LOOKBOOKS
          </h2>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-xs font-light">
            Unlock exclusive access to drop coordinates, holiday promotions and styled outfit reports designed by Koth Challenges and iWebNext.
          </p>
        </div>

        <div>
          {subscribed ? (
            <div className="p-6 bg-white/5 border border-white/10 space-y-2 text-center sm:text-left transition-all duration-300">
              <span className="text-xs font-bold text-white uppercase tracking-widest block">✓ SUCCESSFUL INSCRIPTION</span>
              <p className="text-sm font-light text-white">Lookbook Access Granted!</p>
              <p className="text-xs text-white/50">
                You are now subscribed. Check your inbox for the welcome promotional code!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="flex flex-col sm:flex-row gap-2 pointer-events-auto">
                <input
                  type="email"
                  required
                  placeholder="Insert your email address"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="flex-1 py-3 px-4 border border-white/10 bg-black/30 hover:bg-black/50 focus:border-white focus:outline-none text-xs sm:text-sm text-white placeholder-white/30 font-light tracking-wide"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-white text-black hover:bg-neutral-100 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                >
                  <Mail size={13} /> Subscribe
                </button>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/40 justify-center sm:justify-start">
                <ShieldCheck size={14} className="text-neutral-400" />
                <span>Zero spam • Inscribe or withdraw securely at any moment</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
