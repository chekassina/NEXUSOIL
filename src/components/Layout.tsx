/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [whatsappMsg, setWhatsappMsg] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'oil', label: 'Engine Oil' },
    { id: 'paint', label: 'Automotive Paint' },
    { id: 'quote', label: 'Request Quote' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
    { id: 'dashboard', label: 'Admin Panel' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getWhatsAppLink = (messageText: string) => {
    const phone = '237670123456';
    const encodedText = encodeURIComponent(messageText || 'Hello! I am interested in your premium products.');
    return `https://wa.me/${phone}?text=${encodedText}`;
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-800 antialiased">

      {/* ── Top Contact Bar (md+) ── */}
      <div className="hidden md:block bg-slate-900 text-white text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap justify-between items-center gap-y-1">
          <div className="flex flex-wrap items-center gap-4 lg:gap-6">
            <span className="flex items-center gap-1.5">
              <Phone size={12} className="text-orange-500 shrink-0" />
              +237 670 123 456
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={12} className="text-orange-500 shrink-0" />
              info@nexusoilcameroon.com
            </span>
            <span className="hidden lg:flex items-center gap-1.5">
              <MapPin size={12} className="text-orange-500 shrink-0" />
              Zone Industrielle de Bassa, Douala, Cameroon
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 hidden sm:inline">Response time: &lt;15 mins</span>
            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
              <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse" />
              WhatsApp Live
            </span>
          </div>
        </div>
      </div>

      {/* ── Sticky Header ── */}
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100 transition-shadow duration-200 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">

            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 shrink-0 group transition-all"
              aria-label="Go to homepage"
            >
              <img
                src="/images/logo.png"
                alt="NexusOil Logo"
                className="h-9 w-9 sm:h-11 sm:w-11 object-contain transition-transform group-hover:scale-105"
              />
              <div className="leading-none">
                <span className="block text-base sm:text-xl font-extrabold tracking-tight text-slate-900 uppercase">
                  NEXUS<span className="text-amber-500">OIL</span>
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-slate-500 font-extrabold mt-0.5">
                  CAMEROON
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-bold tracking-wide transition-all ${
                    activeTab === item.id
                      ? 'bg-orange-50 text-orange-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* WhatsApp CTA — hidden on smallest screens */}
              <a
                href={getWhatsAppLink('Hello, I would like to enquire about your engine oils and paint services.')}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl shadow-md hover:shadow transition-all"
              >
                <MessageCircle size={15} className="fill-white" />
                <span className="hidden md:inline">WhatsApp Order</span>
                <span className="md:hidden">Order</span>
              </a>

              {/* Hamburger — visible below lg */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 top-[56px] sm:top-[64px] z-30 flex flex-col bg-white border-t border-neutral-100 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav className="px-4 pt-3 pb-4 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-[15px] font-bold transition-all ${
                    activeTab === item.id
                      ? 'bg-slate-900 text-white shadow'
                      : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="px-4 pb-8 pt-2 border-t border-neutral-100 space-y-3">
              <a
                href={getWhatsAppLink('Hello! I want to submit an automotive paint or engine oil request.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md text-sm transition-colors"
              >
                <MessageCircle size={17} className="fill-white" />
                Enquire via WhatsApp
              </a>
              <p className="text-center text-xs text-neutral-500">
                Call: +237 670 123 456 · 08:30–18:00
              </p>
            </div>
          </div>
        )}
      </header>

      {/* ── Main Content ── */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">

            {/* Bio */}
            <div className="sm:col-span-2 lg:col-span-1 space-y-4">
              <div className="flex items-center gap-2 text-white">
                <img src="/images/logo.png" alt="NexusOil Logo" className="h-10 w-10 object-contain" />
                <div className="leading-none">
                  <span className="text-xl font-extrabold tracking-tight uppercase">
                    NEXUS<span className="text-amber-500">OIL</span>
                  </span>
                  <span className="block text-[10px] text-slate-400 font-bold tracking-wide mt-0.5">CAMEROON</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your premium source for certified engine lubricants, industrial and automotive coatings, and expert spectrophotometer paint matching across Cameroon. Power. Protection. Performance.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                Certified OEM Grade Lubricants
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Our Offerings</h3>
              <ul className="space-y-2.5 text-sm">
                {[
                  { tab: 'oil', label: 'Engine Oil Catalog' },
                  { tab: 'paint', label: 'Automotive Paint Matching' },
                  { tab: 'quote', label: 'Custom Paint & Oil Quote' },
                  { tab: 'oil', label: 'Oil Selector Assistance' },
                ].map(({ tab, label }) => (
                  <li key={label}>
                    <button
                      onClick={() => handleNavClick(tab)}
                      className="text-slate-400 hover:text-orange-400 hover:underline transition-colors text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Contact Details</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-orange-500 shrink-0 mt-0.5" />
                  <span>Zone Industrielle de Bassa,<br />Douala, Cameroon</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={15} className="text-orange-500 shrink-0" />
                  +237 670 123 456 (WhatsApp)
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={15} className="text-orange-500 shrink-0" />
                  info@nexusoilcameroon.com
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm text-slate-400">
                {[
                  { day: 'Monday – Friday', hours: '08:30 – 18:00', color: 'text-white' },
                  { day: 'Saturday', hours: '09:00 – 16:00', color: 'text-white' },
                  { day: 'Sunday & Holidays', hours: 'Closed (Inquiry Only)', color: 'text-rose-400' },
                ].map(({ day, hours, color }) => (
                  <div key={day} className="flex justify-between border-b border-slate-900 pb-1.5 last:border-0 gap-2">
                    <span className="shrink-0">{day}:</span>
                    <span className={`${color} text-right`}>{hours}</span>
                  </div>
                ))}
                <p className="text-xs text-slate-500 italic pt-2">WhatsApp inquiries checked 24/7.</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} NEXUSOIL CAMEROON. All rights reserved.</p>
            <div className="flex gap-4 flex-wrap justify-center">
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
              <button
                onClick={() => handleNavClick('dashboard')}
                className="hover:text-slate-300 cursor-pointer transition-colors"
              >
                Staff Login
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp Button ── */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">

        {/* Chat Popup */}
        {showWhatsAppPopup && (
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 w-[calc(100vw-2rem)] max-w-[320px] mb-3 overflow-hidden">

            {/* Popup Header */}
            <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-slate-900 border border-emerald-500/30 shrink-0">
                  <img src="/images/logo.png" alt="NexusOil Logo" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-400 border-2 border-emerald-600 rounded-full" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm leading-tight truncate">NexusOil Support</h4>
                  <p className="text-[11px] text-emerald-100">Typically replies in under 5 minutes</p>
                </div>
              </div>
              <button
                onClick={() => setShowWhatsAppPopup(false)}
                className="hover:bg-white/10 p-1.5 rounded-full transition-colors shrink-0 ml-2"
                aria-label="Close chat"
              >
                <X size={17} />
              </button>
            </div>

            {/* Simulated Chat */}
            <div className="p-4 bg-neutral-50 space-y-3 text-xs max-h-56 overflow-y-auto">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-neutral-700 leading-relaxed border border-neutral-100">
                Hi there! 👋 How can we help you today?
                <span className="block text-[10px] text-neutral-400 mt-1">NexusOil Agent · Live</span>
              </div>

              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Quick Options</p>
                <button
                  onClick={() => setWhatsappMsg('Hello, I would like to get an Engine Oil quote for my car.')}
                  className="w-full text-left bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-100 px-3 py-2 rounded-xl font-medium transition-colors"
                >
                  Engine Oil Quote request
                </button>
                <button
                  onClick={() => setWhatsappMsg('Hello, I need help matching a custom paint color code for my vehicle.')}
                  className="w-full text-left bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-100 px-3 py-2 rounded-xl font-medium transition-colors"
                >
                  Automotive Paint Color Matching
                </button>
                <button
                  onClick={() => handleNavClick('quote')}
                  className="w-full text-left bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200 px-3 py-2 rounded-xl font-medium transition-colors"
                >
                  Submit general quotation
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-neutral-100 flex gap-2">
              <input
                type="text"
                placeholder="Type your message…"
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
                href={getWhatsAppLink(whatsappMsg || 'Hello!')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setWhatsappMsg('')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl flex items-center justify-center shrink-0 shadow transition-colors"
                aria-label="Send via WhatsApp"
              >
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={() => setShowWhatsAppPopup(!showWhatsAppPopup)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full p-3.5 sm:p-4 shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center relative"
          style={{ animation: 'pulse 3s ease-in-out infinite' }}
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle size={24} className="fill-white stroke-[1.5]" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border border-white text-[9px] text-white font-extrabold justify-center items-center">1</span>
          </span>
        </button>
      </div>
    </div>
  );
}
