/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingBag, Heart, User, Settings, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setActivePage: (p: string) => void;
  cartCount: number;
  wishlistCount: number;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  isLoggedIn: boolean;
  userEmail: string;
  onLogout: () => void;
  openAuthModal: () => void;
}

export default function Navbar({
  activePage,
  setActivePage,
  cartCount,
  wishlistCount,
  darkMode,
  setDarkMode,
  isLoggedIn,
  userEmail,
  onLogout,
  openAuthModal
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Connection' },
    { id: 'about', label: 'Our Story' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'backdrop-blur-md bg-[#0A0A0A]/90 border-b border-white/10 shadow-lg' 
        : activePage === 'home'
          ? 'bg-transparent border-b border-transparent'
          : 'backdrop-blur-md bg-[#0A0A0A]/95 border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setActivePage('home')}
            className="flex items-center gap-3 cursor-pointer group"
            id="navbar-logo"
          >
            <span className="text-xl font-bold tracking-tighter italic text-white transition-opacity group-hover:opacity-80">KOTH.</span>
            <div className="flex flex-col border-l border-white/20 pl-3 ml-1">
              <span className="text-sm font-black tracking-[0.2em] text-white uppercase leading-none">
                KOTH CHALLENGES
              </span>
              <span className="text-[9px] tracking-[0.25em] text-zinc-400 font-medium mt-1 uppercase">
                Premium Apparel Studio
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`text-[11px] font-semibold tracking-[0.18em] transition-all duration-300 relative py-1.5 uppercase ${
                    isActive 
                      ? 'text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Toolbar Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Theme Toggle info (styled to fit the dark aesthetic) */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors"
              title="Toggle Theme"
              id="theme-toggle-btn"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setActivePage('account')}
              className="p-2.5 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors relative"
              title="View Wishlist"
              id="wishlist-btn"
            >
              <Heart size={17} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-black text-black leading-none">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setActivePage('cart')}
              className="p-2.5 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors relative"
              title="Shopping Cart"
              id="cart-btn"
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-black text-[9px] font-black leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account Profile / Login */}
            {isLoggedIn ? (
              <button
                onClick={() => setActivePage('account')}
                className="text-[10px] tracking-[0.18em] text-white/80 hover:text-white uppercase font-bold transition-colors py-1.5 px-3 rounded border border-white/10 hover:border-white/30 bg-white/5"
                title="My Account"
                id="profile-panel-btn"
              >
                {userEmail.split('@')[0]}
              </button>
            ) : (
              <button
                onClick={openAuthModal}
                className="text-[10px] tracking-[0.18em] text-white/60 hover:text-white uppercase font-bold transition-colors py-1.5 px-3 rounded border border-white/10 hover:border-white/30"
                title="Login / Register"
                id="login-modal-btn"
              >
                LOGIN
              </button>
            )}

            {/* Admin Controls Panel */}
            <button
              onClick={() => setActivePage('admin')}
              className={`p-2.5 rounded-full transition-colors ${
                activePage === 'admin'
                  ? 'bg-white text-black'
                  : 'hover:bg-white/5 text-white/60 hover:text-white'
              }`}
              title="Admin Dashboard"
              id="admin-dashboard-btn"
            >
              <Settings size={17} />
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}
