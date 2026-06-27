/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Droplet, Paintbrush, ShieldCheck, ChevronRight, CheckCircle2, Star, Sparkles, AlertCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { FEATURED_OILS, MOCK_TESTIMONIALS } from '../data/products';
import { EngineOil } from '../types';

interface HomeViewProps {
  onNavigate: (tabId: string) => void;
  onSelectOilForEnquiry: (oil: EngineOil) => void;
}

export default function HomeView({ onNavigate, onSelectOilForEnquiry }: HomeViewProps) {
  // Paint quick request form state
  const [quickPaint, setQuickPaint] = useState({
    brand: '',
    model: '',
    year: '',
    searchQuery: '',
    finish: 'Gloss',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleQuickPaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPaint.brand || !quickPaint.model || !quickPaint.year) {
      alert('Please fill out vehicle make, model and year.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/requests/paint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: 'Quick Web Customer',
          phone: '+44 7900 000000',
          vehicleBrand: quickPaint.brand,
          model: quickPaint.model,
          year: quickPaint.year,
          paintCode: quickPaint.searchQuery || 'Not specified',
          desiredFinish: quickPaint.finish,
          paintType: 'Basecoat',
          quantity: '1.0 Litre',
          notes: 'Submitted via Quick Request tool on Home Page.',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset after 4 seconds
        setTimeout(() => {
          setSubmitted(false);
          setQuickPaint({ brand: '', model: '', year: '', searchQuery: '', finish: 'Gloss' });
        }, 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppEnquiry = (oil: EngineOil) => {
    const text = `Hello! I would like to order/enquire about this engine oil:
Brand: ${oil.brand}
Product: ${oil.name}
Viscosity: ${oil.viscosity}
Price: ${oil.price ? `${oil.price.toLocaleString()} FCFA` : 'Request Price'}
Please let me know availability and delivery options.`;
    return `https://wa.me/447911123456?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="home-view-root" className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-20 sm:py-28 lg:py-32 border-b-4 border-orange-600">
        {/* Abstract background graphics */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-orange-600/10 blur-3xl"></div>
          {/* Decorative Grid Lines */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Intro Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-850 px-3 py-1.5 rounded-full text-xs font-bold text-orange-500 uppercase tracking-widest">
                <Sparkles size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
                <span>Next-Gen Oil & Color Match Tech</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
                Premium Engine Oils & High-Quality <span className="text-orange-500">Automotive Paints</span>
              </h1>
              <p className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed font-normal">
                Order premium passenger and heavy-duty motor oils with fast WhatsApp dispatch. Access our custom master automotive color formulation and precision paint requests with rapid expert confirmation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => onNavigate('oil')}
                  className="bg-orange-600 hover:bg-orange-500 text-white text-base font-extrabold px-8 py-4 rounded-xl shadow-lg hover:shadow-orange-600/20 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Shop Engine Oil</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('paint')}
                  className="bg-slate-900 hover:bg-slate-850 border border-slate-750 text-white text-base font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Request Automotive Paint</span>
                  <Paintbrush size={18} className="text-orange-500" />
                </button>
              </div>

              {/* USP Icons */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-900 text-slate-400 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-orange-500 shrink-0" />
                  <span>100% OEM Original</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span>Expert Color Matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle size={18} className="text-emerald-500 shrink-0 fill-emerald-500/20" />
                  <span>&lt;15m Quoting</span>
                </div>
              </div>
            </div>

            {/* Right Visual Box (Aesthetic Product Panel) */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden relative group">
                {/* Decorative gradients */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl"></div>

                <div className="relative space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Fast Inquiry Dashboard</span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full font-bold">Online Dispatch</span>
                  </div>

                  {/* Oil Panel Preview */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 shrink-0">
                      <Droplet className="text-orange-500 fill-orange-500/20" size={32} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-white">Mobil 1 FS 5W-30</h3>
                      <p className="text-xs text-slate-400 mt-1">Viscosity: 5W-30 • Fully Synthetic</p>
                      <span className="inline-block bg-orange-500/15 text-orange-500 text-[10px] font-bold px-2 py-0.5 rounded-full mt-2 border border-orange-500/10">In Stock</span>
                    </div>
                  </div>

                  {/* Paint Panel Preview */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-850 shrink-0 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 via-purple-600 to-blue-500 opacity-60"></div>
                      <Paintbrush className="text-white z-10" size={24} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-white">Automotive Paint Match</h3>
                      <p className="text-xs text-slate-400 mt-1">Vehicle OEM Formulation Matching</p>
                      <span className="inline-block bg-emerald-500/15 text-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded-full mt-2 border border-emerald-500/10">Request Formula</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => onNavigate('quote')}
                    className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Get Fast Quoting Now</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Cards */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-orange-600 text-xs font-bold uppercase tracking-widest block">Complete Automotive Solutions</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Professional Engine Oil & Custom Refinishing
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            We deliver maximum engine performance products and precise automotive coating color formulation matching for workshops, fleets, and individual vehicle owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 flex flex-col items-start gap-4 hover:shadow-lg transition-all">
            <div className="h-12 w-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
              <Droplet size={24} className="fill-orange-600/10" />
            </div>
            <div className="space-y-2 text-left">
              <h3 className="font-extrabold text-lg text-slate-950">Engine Oil Supply</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Stocking premium mineral, semi-synthetic, and full synthetic motor oils. Selected for high viscosity indexes, thermal stability, and maximum engine cleaning properties.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('oil')}
              className="text-orange-600 font-bold text-sm inline-flex items-center gap-1 mt-auto hover:text-orange-700 hover:underline"
            >
              <span>Explore shop catalog</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 flex flex-col items-start gap-4 hover:shadow-lg transition-all">
            <div className="h-12 w-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
              <Paintbrush size={24} />
            </div>
            <div className="space-y-2 text-left">
              <h3 className="font-extrabold text-lg text-slate-950">Automotive Paint Supply</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Professional refinishing formulations including clear coats, direct-gloss enamels, basecoat tones, and high-build primers. Customized precisely to manufacturer specifications.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('paint')}
              className="text-orange-600 font-bold text-sm inline-flex items-center gap-1 mt-auto hover:text-orange-700 hover:underline"
            >
              <span>Request custom match</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-neutral-100 flex flex-col items-start gap-4 hover:shadow-lg transition-all">
            <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Sparkles size={24} />
            </div>
            <div className="space-y-2 text-left">
              <h3 className="font-extrabold text-lg text-neutral-950">Expert Recommendations</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Instantly consult our AI-powered selector assistants on the shop page. Get vehicle compatibility lists, OEM specifications, and step-by-step refinishing guides in seconds.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('oil')}
              className="text-emerald-600 font-bold text-sm inline-flex items-center gap-1 mt-auto hover:text-emerald-700 hover:underline"
            >
              <span>Get AI advice</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 py-16 sm:py-20 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-orange-600 text-xs font-bold uppercase tracking-widest block">Streamlined Ordering</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Our 4-Step Express Service
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Say goodbye to complicated online baskets. We connect you directly with a dispatch coordinator immediately after a color or lubricant selection is submitted.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 text-left relative overflow-hidden">
              <div className="absolute top-2 right-4 text-7xl font-extrabold text-slate-100 pointer-events-none select-none">
                01
              </div>
              <div className="relative space-y-3">
                <div className="h-8 w-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h4 className="font-extrabold text-base text-slate-900">Browse or Submit</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Browse our premium oils or fill out the custom paint color formulations requests tool with your vehicle's specifications.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 text-left relative overflow-hidden">
              <div className="absolute top-2 right-4 text-7xl font-extrabold text-slate-100 pointer-events-none select-none">
                02
              </div>
              <div className="relative space-y-3">
                <div className="h-8 w-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h4 className="font-extrabold text-base text-slate-900">We Verify Match</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Our professional technicians check lubricant OEM specs or analyze paint pigment recipes to guarantee a perfect matching profile.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 text-left relative overflow-hidden">
              <div className="absolute top-2 right-4 text-7xl font-extrabold text-slate-100 pointer-events-none select-none">
                03
              </div>
              <div className="relative space-y-3">
                <div className="h-8 w-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h4 className="font-extrabold text-base text-slate-900">WhatsApp Quote</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Receive an instant WhatsApp message with the exact item availability, breakdown of prices, and localized delivery time slot options.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 text-left relative overflow-hidden">
              <div className="absolute top-2 right-4 text-7xl font-extrabold text-slate-100 pointer-events-none select-none">
                04
              </div>
              <div className="relative space-y-3">
                <div className="h-8 w-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <h4 className="font-extrabold text-base text-slate-900">Dispatch / Pickup</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Accept the quote and let us arrange express dispatch directly to your home/workshop, or pick it up locally in-store.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Engine Oil Products */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-12 text-left">
          <div className="space-y-2">
            <span className="text-orange-600 text-xs font-bold uppercase tracking-widest block">Featured Oils</span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Premium Lubricants Ready to Order
            </h2>
          </div>
          <button 
            onClick={() => onNavigate('oil')}
            className="text-orange-600 font-extrabold text-sm flex items-center gap-1.5 hover:text-orange-700 hover:underline mt-4 sm:mt-0"
          >
            <span>View all products ({FEATURED_OILS.length})</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {FEATURED_OILS.slice(0, 4).map((oil) => (
            <div 
              key={oil.id}
              className="bg-white rounded-2xl border border-neutral-200/70 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {/* Image Container */}
              <div className="h-48 bg-neutral-100 relative overflow-hidden group">
                <img 
                  src={oil.image} 
                  alt={oil.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-neutral-950 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                  {oil.brand}
                </span>
                <span className="absolute bottom-3 right-3 bg-white/95 text-neutral-950 text-xs font-extrabold px-2.5 py-1 rounded-md shadow-sm border border-neutral-100">
                  {oil.viscosity}
                </span>
              </div>

              {/* Product Content */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-950 text-base line-clamp-1 leading-tight">{oil.name}</h3>
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="bg-orange-50 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-100">
                      {oil.oilType}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                      {oil.volume}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-1">
                    {oil.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-150 flex items-center justify-between gap-2">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Price Quote</span>
                    <span className="text-lg font-extrabold text-slate-950">
                      {oil.price ? `${oil.price.toLocaleString()} FCFA` : 'Request Quote'}
                    </span>
                  </div>
                  <a
                    href={getWhatsAppEnquiry(oil)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-3 py-2.5 rounded-xl shadow-sm transition-all shrink-0"
                  >
                    <MessageCircle size={14} className="fill-white" />
                    <span>Inquire</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Automotive Paint Quick Request */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Prompt Info */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">Aerosols • Drums • Touch-Up Pots</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Need Automotive Paint Color Formulation Matching?
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Submit a quick vehicle query, and our technicians will research your original paint formula code (such as Audi LY3D or Ford Frozen White). We formulate exact metallic flake proportions and supply primers or clear coats.
              </p>
              
              <div className="space-y-3.5 pt-2 text-sm text-slate-355">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                  <span>High coverage basecoats & high-gloss 2K polyurethane finishes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                  <span>We supply touch-up brush pots, aerosol spray cans, & bulk spray tins</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                  <span>Receive formulation match sheet details on WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Right Quick Request Form */}
            <div className="lg:col-span-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative text-left">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Paintbrush size={20} className="text-orange-500" />
                  <span>Quick Color Match Inquiry</span>
                </h3>
                <p className="text-slate-400 text-xs mb-6">No payment details required. Simple fast availability check.</p>

                {submitted ? (
                  <div className="bg-emerald-950/40 border border-emerald-800/60 p-6 rounded-xl space-y-3 text-center py-10">
                    <div className="h-12 w-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center font-bold mx-auto text-xl animate-bounce">
                      ✓
                    </div>
                    <h4 className="font-extrabold text-white text-base">Inquiry Submitted Successfully!</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Our paint technicians have received your request. We will verify the formulation match and send availability/pricing quotes shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuickPaintSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                        Paint Brand, Code, or Color Description
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. BMW Isle of Man Green (C4G) or Metallic Silver"
                        value={quickPaint.searchQuery}
                        onChange={(e) => setQuickPaint({ ...quickPaint, searchQuery: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                          Make (Brand)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Ford"
                          value={quickPaint.brand}
                          onChange={(e) => setQuickPaint({ ...quickPaint, brand: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-white placeholder-slate-600 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                          Model
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Focus"
                          value={quickPaint.model}
                          onChange={(e) => setQuickPaint({ ...quickPaint, model: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-white placeholder-slate-600 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                          Year
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2019"
                          value={quickPaint.year}
                          onChange={(e) => setQuickPaint({ ...quickPaint, year: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-white placeholder-slate-600 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                        Desired Coating Finish
                      </label>
                      <select
                        value={quickPaint.finish}
                        onChange={(e) => setQuickPaint({ ...quickPaint, finish: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-white focus:ring-1 focus:ring-orange-500 focus:outline-none"
                      >
                        <option value="Gloss">High Gloss Solid</option>
                        <option value="Matte">Satin / Flat Matte</option>
                        <option value="Metallic">Shimmering Metallic Flake</option>
                        <option value="Pearl">Tri-Coat Pearl Essence</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                    >
                      {submitting ? 'Sending Request...' : 'Submit Paint Request'}
                      <ArrowRight size={16} />
                    </button>
                  </form>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white rounded-3xl my-12 border border-slate-100 shadow-sm">
        <div className="space-y-3 max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-orange-600 text-xs font-bold uppercase tracking-widest block">Customer Reviews</span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Trusted by Garages and Enthusiasts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {MOCK_TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1 text-orange-500">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={16} className="fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>
              <div className="pt-6 border-t border-slate-200/50 mt-6 flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-900 text-white rounded-full font-extrabold flex items-center justify-center text-sm uppercase">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-950 text-xs">{t.name}</h4>
                  <p className="text-[10px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
