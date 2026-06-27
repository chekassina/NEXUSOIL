/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, MessageCircle, Droplet, Paintbrush, ArrowRight, CheckCircle2 } from 'lucide-react';

export function NexusOilLogo({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Golden Circle */}
      <circle cx="100" cy="100" r="90" stroke="url(#goldGradient)" strokeWidth="4" fill="none" />
      
      {/* Gear teeth on the right */}
      <g stroke="url(#gearGradient)" strokeWidth="6" fill="none">
        <path d="M170 60 L180 65 M180 80 L190 85 M185 100 L195 100 M180 120 L190 125 M170 140 L180 145" strokeLinecap="round" strokeWidth="8" />
        <path d="M165 50 A 90 90 0 0 1 185 110" strokeWidth="12" strokeLinecap="round" />
      </g>
      
      {/* Golden Drop of Oil (Left) */}
      <path d="M55 45 C55 45 40 70 40 85 C40 98 50 108 63 108 C76 108 86 98 86 85 C86 70 71 45 71 45 C71 45 63 35 55 45 Z" fill="url(#goldGradient)" filter="url(#dropShadow)" />
      {/* Highlight inside drop */}
      <path d="M50 70 C50 60 55 52 55 52 C55 52 61 60 61 70 C61 75 58 80 55 80 C52 80 50 75 50 70 Z" fill="white" opacity="0.3" />
      
      {/* Main Letter 'N' */}
      {/* Left leg (black/dark grey) */}
      <path d="M75 130 L75 55 L105 55 L105 130 Z" fill="#1A1A1A" />
      {/* Diagonal & Right Leg (Shiny gold) */}
      <path d="M75 55 L135 130 L165 130 L165 55 L135 55 L135 100 Z" fill="url(#goldGradient)" />
      
      {/* Cameroon Flag Wave (Green, Red, Yellow stripes sweeping bottom) */}
      <path d="M45 125 Q 100 165 155 125" stroke="#E30010" strokeWidth="18" fill="none" />
      <path d="M45 116 Q 100 156 155 116" stroke="#007A5E" strokeWidth="8" fill="none" />
      <path d="M45 134 Q 100 174 155 134" stroke="#FCD116" strokeWidth="8" fill="none" />
      
      {/* Yellow Star in the center red stripe */}
      <polygon points="100,133 103,140 110,140 105,144 107,151 100,147 93,151 95,144 90,140 97,140" fill="#FCD116" />

      {/* Gradients */}
      <defs>
        <linearGradient id="goldGradient" x1="40" y1="45" x2="165" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE082" />
          <stop offset="35%" stopColor="#FFD54F" />
          <stop offset="70%" stopColor="#FFB300" />
          <stop offset="100%" stopColor="#B78103" />
        </linearGradient>
        <linearGradient id="gearGradient" x1="150" y1="50" x2="190" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#333333" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
        <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.2" />
        </filter>
      </defs>
    </svg>
  );
}

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [whatsappMsg, setWhatsappMsg] = useState('');

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'oil', label: 'Engine Oil' },
    { id: 'paint', label: 'Automotive Paint' },
    { id: 'quote', label: 'Request Quote' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
    { id: 'dashboard', label: 'Admin Panel' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getWhatsAppLink = (messageText: string) => {
    const phone = '237670123456'; // Cameroon priority line
    const encodedText = encodeURIComponent(messageText || "Hello! I am interested in your premium products.");
    return `https://wa.me/${phone}?text=${encodedText}`;
  };

  return (
    <div id="layout-root" className="min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-800 antialiased">
      {/* Top Bar Contact Header */}
      <div className="bg-slate-900 text-white text-xs py-2.5 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone size={13} className="text-orange-500" />
              <span>+237 670 123 456</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={13} className="text-orange-500" />
              <span>info@nexusoilcameroon.com</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-orange-500" />
              <span>Zone Industrielle de Bassa, Douala, Cameroon</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Response time: &lt;15 mins</span>
            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
              <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              WhatsApp Live
            </span>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group transition-all"
            >
              <NexusOilLogo className="h-10 w-10 sm:h-12 sm:w-12 transition-transform group-hover:scale-105" />
              <div>
                <span className="block text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 uppercase leading-none">
                  NEXUS<span className="text-amber-500 font-black">OIL</span>
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-slate-500 font-extrabold mt-0.5">
                  CAMEROON
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-bold tracking-wide transition-all ${
                    activeTab === item.id
                      ? 'bg-orange-50 text-orange-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Call to Action Button */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={getWhatsAppLink("Hello, I would like to enquire about your engine oils and paint services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-md hover:shadow transition-all"
              >
                <MessageCircle size={16} className="fill-white" />
                <span>WhatsApp Order</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 transition-colors"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-neutral-100 px-4 pt-2 pb-6 space-y-1.5 animate-fadeIn">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-bold transition-all ${
                  activeTab === item.id
                    ? 'bg-neutral-950 text-white shadow-md'
                    : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-neutral-100 flex flex-col gap-3">
              <a
                href={getWhatsAppLink("Hello! I want to submit an automotive paint or engine oil request.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md"
              >
                <MessageCircle size={18} className="fill-white" />
                <span>Enquire via WhatsApp</span>
              </a>
              <div className="text-center text-xs text-neutral-500">
                Call: +237 670 123 456 • 08:30 - 18:00
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
            
            {/* Business Bio */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <NexusOilLogo className="h-11 w-11" />
                <span className="text-xl font-extrabold tracking-tight uppercase">
                  NEXUS<span className="text-amber-500 font-black">OIL</span> <span className="text-[11px] text-slate-400 font-bold block">CAMEROON</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your premium source for certified engine lubricants, industrial and automotive coatings, and expert spectrophotometer paint matching across Cameroon. Power. Protection. Performance.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Certified OEM Grade Lubricants</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 sm:mb-5">Our Offerings</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={() => handleNavClick('oil')} className="hover:text-orange-500 hover:underline text-slate-400 transition-colors">
                    Engine Oil Catalog
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('paint')} className="hover:text-orange-500 hover:underline text-slate-400 transition-colors">
                    Automotive Paint Matching
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('quote')} className="hover:text-orange-500 hover:underline text-slate-400 transition-colors">
                    Custom Paint & Oil Quote
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('oil')} className="hover:text-orange-500 hover:underline text-slate-400 transition-colors">
                    Oil Selector Assistance
                  </button>
                </li>
              </ul>
            </div>

            {/* Contacts & Hours */}
            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 sm:mb-5">Contact Details</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-orange-500 shrink-0 mt-0.5" />
                  <span>Zone Industrielle de Bassa,<br />Douala, Cameroon</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={16} className="text-orange-500 shrink-0" />
                  <span>+237 670 123 456 (WhatsApp)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={16} className="text-orange-500 shrink-0" />
                  <span>info@nexusoilcameroon.com</span>
                </li>
              </ul>
            </div>

            {/* Business Hours */}
            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 sm:mb-5">Business Hours</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex justify-between border-b border-slate-900 pb-1.5">
                  <span>Monday - Friday:</span>
                  <span className="text-white">08:30 - 18:00</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-1.5">
                  <span>Saturday:</span>
                  <span className="text-white">09:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday & Holidays:</span>
                  <span className="text-rose-400">Closed (Inquiry Only)</span>
                </div>
                <div className="pt-3">
                  <span className="block text-xs text-slate-500 italic">WhatsApp inquiries checked 24/7.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright Area */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} NEXUSOIL CAMEROON. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span className="hover:underline cursor-pointer">Terms of Service</span>
              <span className="hover:underline cursor-pointer" onClick={() => handleNavClick('dashboard')}>Staff Login</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Chat Button / Interactive Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Chat window overlay */}
        {showWhatsAppPopup && (
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 w-80 mb-3 overflow-hidden animate-slideUp">
            {/* Widget Header */}
            <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-neutral-900 border border-emerald-500/20">
                  <img src="'/images/lp1.jpg" alt="NexusOil Logo" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-400 border-2 border-emerald-600 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">NexusOil Support</h4>
                  <p className="text-[11px] text-emerald-100">Typically replies in under 5 minutes</p>
                </div>
              </div>
              <button 
                onClick={() => setShowWhatsAppPopup(false)}
                className="hover:bg-white/10 p-1 rounded-full text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
 
            {/* Simulated Chat Area */}
            <div className="p-4 bg-neutral-50 space-y-3 text-xs max-h-60 overflow-y-auto">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-neutral-700 leading-relaxed border border-neutral-100">
                Hi there! 👋 How can we help you today?
                <span className="block text-[10px] text-neutral-400 mt-1">NexusOil Agent • Live</span>
              </div>
              
              {/* Quick suggestions */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Frequently Asked Questions</p>
                <button 
                  onClick={() => setWhatsappMsg("Hello, I would like to get an Engine Oil quote for my car.")}
                  className="w-full text-left bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-100 px-3 py-2 rounded-xl font-medium transition-colors"
                >
                  "Engine Oil Quote request"
                </button>
                <button 
                  onClick={() => setWhatsappMsg("Hello, I need help matching a custom paint color code for my vehicle.")}
                  className="w-full text-left bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-100 px-3 py-2 rounded-xl font-medium transition-colors"
                >
                  "Automotive Paint Color Matching"
                </button>
                <button 
                  onClick={() => handleNavClick('quote')}
                  className="w-full text-left bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200 px-3 py-2 rounded-xl font-medium transition-colors"
                >
                  "Submit general custom quotation"
                </button>
              </div>
            </div>

            {/* Input & Submit */}
            <div className="p-3 bg-white border-t border-neutral-100 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={whatsappMsg}
                onChange={(e) => setWhatsappMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && whatsappMsg.trim()) {
                    window.open(getWhatsAppLink(whatsappMsg), '_blank');
                    setWhatsappMsg('');
                  }
                }}
                className="flex-grow border border-neutral-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
              <a
                href={getWhatsAppLink(whatsappMsg || "Hello!")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setWhatsappMsg('')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl flex items-center justify-center shrink-0 shadow transition-colors"
              >
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        )}

        {/* Floating Green WhatsApp Circle Button */}
        <button
          onClick={() => setShowWhatsAppPopup(!showWhatsAppPopup)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center relative animate-pulse"
          style={{ animationDuration: '3s' }}
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle size={26} className="fill-white stroke-[1.5]" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border border-white text-[9px] text-white font-extrabold justify-center items-center">1</span>
          </span>
        </button>
      </div>
    </div>
  );
}
