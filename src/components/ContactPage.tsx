/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Clock, Heart, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulate sending, show beautiful success banner
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const storeLocations = [
    {
      city: "Oklahoma City Flagship",
      address: "124 NW 10th St, Midtown OKC",
      zip: "OK 73103",
      phone: "405-479-4552"
    },
    {
      city: "Tulsa Arts District Showroom",
      address: "18 E M.B. Brady St, Tulsa Arts",
      zip: "OK 74103",
      phone: "405-479-4552"
    },
    {
      city: "Norman Campus Boutique",
      address: "329 Campus Corner St, Norman",
      zip: "OK 73069",
      phone: "405-479-4552"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 text-left" id="contact-us-page-view">
      
      {/* 1. Header coordinates */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
          Reach Out to Us
        </span>
        <h1 className="serif text-4xl font-light text-white uppercase leading-tight">
          Contact Koth Challenges
        </h1>
        <p className="text-white/60 text-sm leading-relaxed tracking-wide font-light max-w-lg mx-auto">
          Have an inquiry regarding bulk orders, custom sizing, or styling advice? Speak with our hospitality concierge desk in Oklahoma.
        </p>
      </div>

      {/* 2. Interactive Page grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact details and stores map mockup */}
        <div className="space-y-8">
          
          {/* Quick coordinates cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white/[0.02] border border-white/5 flex items-start gap-4">
              <div className="p-3 bg-white/5 text-white shrink-0">
                <Phone size={16} />
              </div>
              <div>
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Phone Support</span>
                <a href="tel:4054794552" className="text-sm font-semibold text-white hover:underline mt-1 block">
                  405-479-4552
                </a>
                <span className="text-[10px] text-white/30 block mt-1">Mon-Fri • 9 AM - 6 PM</span>
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 flex items-start gap-4">
              <div className="p-3 bg-white/5 text-white shrink-0">
                <Mail size={16} />
              </div>
              <div>
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Email Concierge</span>
                <a href="mailto:kothchallenges@gmail.com" className="text-sm font-semibold text-white hover:underline mt-1 block break-all">
                  kothchallenges@gmail.com
                </a>
                <span className="text-[10px] text-white/30 block mt-1">Replies under 12h guaranteed</span>
              </div>
            </div>
          </div>

          {/* Interactive Styled store maps mock box */}
          <div className="p-6 bg-white/[0.02] border border-white/5 relative">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase mb-4 flex items-center gap-1.5 col-title">
              <MapPin size={14} className="text-white/50" /> Retail Store Coordinates
            </h3>

            {/* Simulated Vector Stylized Map illustration */}
            <div className="aspect-[16/9] w-full bg-black relative overflow-hidden border border-white/5 shadow-inner mb-6 flex items-center justify-center p-4">
              {/* Simulated Map lines overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <line x1="10%" y1="0%" x2="10%" y2="100%" stroke="white" strokeWidth="1" />
                  <line x1="40%" y1="0%" x2="40%" y2="100%" stroke="white" strokeWidth="1" />
                  <line x1="75%" y1="0%" x2="75%" y2="100%" stroke="white" strokeWidth="1" />
                  <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="white" strokeWidth="1" />
                  <line x1="0%" y1="80%" x2="100%" y2="80%" stroke="white" strokeWidth="1" />
                </svg>
              </div>

              {/* Integrated city landmarks */}
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-black animate-pulse cursor-pointer" title="OKC Flagship" />
                <span className="text-[8px] font-bold text-white/50 uppercase tracking-widest mt-1 bg-black/80 px-1 py-0.5 border border-white/5 leading-none block">OKC Store</span>
              </div>

              <div className="absolute top-1/3 right-1/4 -translate-y-1/2 translate-x-1/2 flex flex-col items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-black animate-pulse cursor-pointer" title="Tulsa Showroom" />
                <span className="text-[8px] font-bold text-white/50 uppercase tracking-widest mt-1 bg-black/80 px-1 py-0.5 border border-white/5 leading-none block">Tulsa Store</span>
              </div>

              <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 flex flex-col items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-black animate-pulse cursor-pointer" title="Norman Corner" />
                <span className="text-[8px] font-bold text-white/50 uppercase tracking-widest mt-1 bg-black/80 px-1 py-0.5 border border-white/5 leading-none block">Norman Store</span>
              </div>

              <div className="text-center z-10 select-none">
                <span className="text-[8px] text-white/35 uppercase tracking-widest block mb-1">OKLAHOMA MAP LAYOUT</span>
                <span className="text-white font-light text-xs tracking-wider">3 Store Locations connected across the State</span>
              </div>
            </div>

            {/* Stores table locations list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/5">
              {storeLocations.map((loc, idx) => (
                <div key={idx} className="border-b sm:border-b-0 sm:border-r border-white/5 last:border-0 p-1.5 space-y-1 text-left">
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-widest leading-none truncate">{loc.city}</h4>
                  <p className="text-[10px] text-white/50 leading-relaxed font-light mt-0.5">{loc.address}, {loc.zip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Contact Form block */}
        <div className="p-8 bg-white/[0.02] border border-white/5">
          <h2 className="serif text-2xl font-light text-white uppercase mb-8">
            Message the Fashion Desk
          </h2>
          
          {submitted ? (
            <div className="space-y-4 py-8 text-center" id="contact-success-notification">
              <div className="p-4 bg-white/5 border border-white/10 w-max mx-auto text-white scale-110">
                <CheckCircle size={28} />
              </div>
              <h3 className="serif text-lg font-light tracking-wider text-white uppercase">Your Message has been Dispatched!</h3>
              <p className="text-xs text-white/60 max-w-xs mx-auto leading-relaxed tracking-wide">
                Thank you. Your request was securely delivered to our customer hospitality office in Norman. Our stylists will contact you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-8 py-3.5 border border-white/20 text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer bg-white/5 hover:bg-white/10"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">First & Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alexis Carter"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-3 px-4 border border-white/10 focus:border-white focus:outline-none text-xs sm:text-sm bg-black/30 text-white placeholder-white/20 font-light tracking-wide outline-none"
                    id="contact-form-name"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">Email address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alexis@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3 px-4 border border-white/10 focus:border-white focus:outline-none text-xs sm:text-sm bg-black/30 text-white placeholder-white/20 font-light tracking-wide outline-none"
                    id="contact-form-email"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">Subject topic</label>
                <input
                  type="text"
                  placeholder="e.g. Bulk ordering custom wool sweatshirts for a local event"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full py-3 px-4 border border-white/10 focus:border-white focus:outline-none text-xs sm:text-sm bg-black/30 text-white placeholder-white/20 font-light tracking-wide outline-none"
                  id="contact-form-subject"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">Your message details *</label>
                <textarea
                  required
                  placeholder="Explain your inquiry. We love hearing about outfit cooperations..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full py-3 px-4 border border-white/10 focus:border-white focus:outline-none text-xs sm:text-sm bg-black/30 text-white placeholder-white/20 font-light tracking-wide outline-none resize-none"
                  id="contact-form-message"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs transition-opacity hover:opacity-90 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-md"
                id="submit-contact-form"
              >
                <Send size={13} /> Send message details
              </button>
            </form>
          )}

        </div>
      </div>

    </div>
  );
}
