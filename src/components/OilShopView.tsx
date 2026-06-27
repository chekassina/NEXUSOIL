/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, SlidersHorizontal, Droplet, Sparkles, AlertCircle, MessageCircle, FileText, ChevronDown, CheckCircle } from 'lucide-react';
import { FEATURED_OILS, OIL_BRANDS, OIL_VISCOSITIES, OIL_TYPES, VEHICLE_TYPES } from '../data/products';
import { EngineOil, OilFilterState } from '../types';

interface OilShopViewProps {
  onSelectOilForEnquiry: (oil: EngineOil) => void;
}

export default function OilShopView({ onSelectOilForEnquiry }: OilShopViewProps) {
  // Filters State
  const [filters, setFilters] = useState<OilFilterState>({
    vehicleType: 'All Vehicles',
    oilType: 'All Types',
    viscosity: 'All Viscosities',
    brand: 'All Brands',
    search: ''
  });

  // Toggle Filters on mobile
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Recommendation Tool State
  const [recoForm, setRecoForm] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    conditions: 'Standard/mixed highway & city driving'
  });
  const [loadingReco, setLoadingReco] = useState(false);
  const [recommendation, setRecommendation] = useState<any | null>(null);
  const [recoError, setRecoError] = useState<string | null>(null);

  // Filter products
  const filteredProducts = FEATURED_OILS.filter((oil) => {
    const matchesSearch = oil.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                          oil.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
                          oil.compatibility.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesBrand = filters.brand === 'All Brands' || oil.brand === filters.brand;
    const matchesViscosity = filters.viscosity === 'All Viscosities' || oil.viscosity === filters.viscosity;
    const matchesType = filters.oilType === 'All Types' || oil.oilType === filters.oilType;
    
    // Simple mock vehicle compatibility mapping for filter illustration
    let matchesVehicleType = true;
    if (filters.vehicleType === 'SUVs & Light Trucks') {
      matchesVehicleType = oil.compatibility.toLowerCase().includes('suv') || oil.compatibility.toLowerCase().includes('van');
    } else if (filters.vehicleType === 'Passenger Cars') {
      matchesVehicleType = oil.compatibility.toLowerCase().includes('passenger') || oil.compatibility.toLowerCase().includes('car');
    } else if (filters.vehicleType === 'Heavy Duty / Commercial') {
      matchesVehicleType = oil.compatibility.toLowerCase().includes('heavy-duty') || oil.compatibility.toLowerCase().includes('diesel');
    } else if (filters.vehicleType === 'Classic / Vintage') {
      matchesVehicleType = oil.compatibility.toLowerCase().includes('classic') || oil.compatibility.toLowerCase().includes('older');
    }

    return matchesSearch && matchesBrand && matchesViscosity && matchesType && matchesVehicleType;
  });

  const handleRecommendationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoForm.make || !recoForm.model || !recoForm.year) {
      setRecoError('Please provide vehicle Make, Model and Year.');
      return;
    }

    setLoadingReco(true);
    setRecoError(null);
    setRecommendation(null);

    try {
      const response = await fetch('/api/recommend/oil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          make: recoForm.make,
          model: recoForm.model,
          year: recoForm.year,
          mileage: recoForm.mileage,
          drivingConditions: recoForm.conditions
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendation from the AI server.');
      }

      const data = await response.json();
      setRecommendation(data);
    } catch (err: any) {
      console.error(err);
      setRecoError(err.message || 'AI selection assistant is temporarily busy. Please try again or message our staff directly.');
    } finally {
      setLoadingReco(false);
    }
  };

  const getWhatsAppEnquiryText = (oil: EngineOil) => {
    const text = `Hello LubriCoat! I want to order/enquire about this engine oil:
Brand: ${oil.brand}
Product: ${oil.name}
Viscosity: ${oil.viscosity}
Price: ${oil.price ? `${oil.price.toLocaleString()} FCFA` : 'Request Quote'}
Volume: ${oil.volume}
Please confirm availability and dispatch terms.`;
    return `https://wa.me/447911123456?text=${encodeURIComponent(text)}`;
  };

  const getWhatsAppRecoEnquiryText = () => {
    if (!recommendation) return '';
    const text = `Hello LubriCoat! I just ran your AI Oil Selector for my vehicle:
Vehicle: ${recoForm.year} ${recoForm.make} ${recoForm.model} (${recoForm.mileage || 'unknown'} miles)
Recommended Viscosity: ${recommendation.viscosity}
Oil Type: ${recommendation.oilType}
Suggested Brands: ${recommendation.recommendedBrands?.join(', ')}
Specifications: ${recommendation.specifications}
Please quote me pricing and availability for these specifications.`;
    return `https://wa.me/447911123456?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="oil-shop-view" className="animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title Header */}
      <div className="text-left border-b border-neutral-200 pb-6 mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 uppercase tracking-tight">
          Engine Oil <span className="text-orange-600">Shop Catalog</span>
        </h1>
        <p className="text-neutral-500 text-sm mt-1.5 max-w-3xl">
          Order premium OEM lubricants immediately. All listings are stocked and ready for immediate dispatch. Confirm pricing and secure slots on WhatsApp in minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Filters - Desktop (Col-span 3) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 text-left">
          <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm space-y-6">
            <h3 className="font-extrabold text-sm text-neutral-950 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-neutral-100">
              <SlidersHorizontal size={16} className="text-orange-600" />
              <span>Filter Products</span>
            </h3>

            {/* Vehicle Type Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider">Vehicle Type</label>
              <select
                value={filters.vehicleType}
                onChange={(e) => setFilters({ ...filters, vehicleType: e.target.value })}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
              >
                {VEHICLE_TYPES.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider">Brand</label>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
              >
                {OIL_BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Viscosity Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider">Viscosity</label>
              <select
                value={filters.viscosity}
                onChange={(e) => setFilters({ ...filters, viscosity: e.target.value })}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
              >
                {OIL_VISCOSITIES.map((vis) => (
                  <option key={vis} value={vis}>{vis}</option>
                ))}
              </select>
            </div>

            {/* Oil Type Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider">Lubricant Base</label>
              <select
                value={filters.oilType}
                onChange={(e) => setFilters({ ...filters, oilType: e.target.value })}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
              >
                {OIL_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setFilters({ vehicleType: 'All Vehicles', oilType: 'All Types', viscosity: 'All Viscosities', brand: 'All Brands', search: '' })}
              className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Product Grid & Search (Col-span 9) */}
        <section className="lg:col-span-9 space-y-6">
          {/* Search bar and mobile filter toggle */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="text"
                placeholder="Search engine oil products by brand, compatibility specs (e.g. BMW Longlife)..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center justify-center gap-2 bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm font-bold text-neutral-700"
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>
          </div>

          {/* Mobile Filters panel */}
          {showMobileFilters && (
            <div className="lg:hidden bg-white rounded-2xl p-5 border border-neutral-200 shadow-md grid grid-cols-2 gap-4 text-left animate-slideDown">
              <div className="col-span-2 flex justify-between items-center pb-2 border-b border-neutral-100 mb-2">
                <span className="font-extrabold text-xs uppercase text-neutral-500">Filters</span>
                <button onClick={() => setShowMobileFilters(false)} className="text-xs font-bold text-rose-500">Close</button>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Vehicle Type</span>
                <select
                  value={filters.vehicleType}
                  onChange={(e) => setFilters({ ...filters, vehicleType: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs"
                >
                  {VEHICLE_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Brand</span>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs"
                >
                  {OIL_BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Viscosity</span>
                <select
                  value={filters.viscosity}
                  onChange={(e) => setFilters({ ...filters, viscosity: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs"
                >
                  {OIL_VISCOSITIES.map(vis => <option key={vis} value={vis}>{vis}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Lubricant Base</span>
                <select
                  value={filters.oilType}
                  onChange={(e) => setFilters({ ...filters, oilType: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs"
                >
                  {OIL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <button
                onClick={() => setFilters({ vehicleType: 'All Vehicles', oilType: 'All Types', viscosity: 'All Viscosities', brand: 'All Brands', search: '' })}
                className="col-span-2 py-2 bg-neutral-100 font-bold text-xs rounded-lg mt-2 text-center"
              >
                Reset
              </button>
            </div>
          )}

          {/* Results statement */}
          <div className="text-left text-xs font-semibold text-neutral-400">
            Showing {filteredProducts.length} premium engine oils
          </div>

          {/* Product grid list */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200 py-16 px-6 text-center text-neutral-500 max-w-xl mx-auto space-y-4 shadow-sm">
              <AlertCircle size={40} className="text-neutral-300 mx-auto" />
              <h3 className="font-extrabold text-neutral-900 text-lg">No matching lubricants found</h3>
              <p className="text-sm">
                We couldn't find any products in our database matching those filters. Try selecting "All Viscosities" or use the AI Selection Assistant tool below to find your specific oil!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 text-left">
              {filteredProducts.map((oil) => (
                <div
                  key={oil.id}
                  className="bg-white rounded-2xl border border-neutral-200/70 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image Area */}
                    <div className="h-44 bg-neutral-100 relative overflow-hidden group">
                      <img
                        src={oil.image}
                        alt={oil.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-neutral-950 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                        {oil.brand}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-white/95 text-neutral-950 text-xs font-extrabold px-2.5 py-1 rounded-md border border-neutral-100">
                        {oil.viscosity}
                      </span>
                    </div>

                    {/* Content Area */}
                    <div className="p-5 space-y-2">
                      <h4 className="font-extrabold text-neutral-950 text-base leading-snug line-clamp-1">{oil.name}</h4>
                      
                      <div className="flex gap-1.5 flex-wrap">
                        <span className="bg-orange-50 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-100">
                          {oil.oilType}
                        </span>
                        <span className="bg-neutral-100 text-neutral-700 text-[10px] font-bold px-2 py-0.5 rounded">
                          {oil.volume}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 pt-1">{oil.description}</p>

                      <div className="bg-neutral-50 rounded-xl p-2.5 border border-neutral-100 mt-2 text-[11px] leading-relaxed text-neutral-600">
                        <span className="font-bold text-neutral-800 block text-[10px] uppercase tracking-wider mb-0.5">Compatibility</span>
                        {oil.compatibility}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and WhatsApp Trigger */}
                  <div className="p-5 pt-0 mt-2">
                    <div className="border-t border-neutral-100 pt-4 flex items-center justify-between gap-2">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400">Retail Price (FCFA)</span>
                        <span className="text-lg font-extrabold text-slate-950">
                          {oil.price ? `${oil.price.toLocaleString()} FCFA` : 'Request Price'}
                        </span>
                      </div>
                      <a
                        href={getWhatsAppEnquiryText(oil)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-4 py-3 rounded-xl shadow-sm transition-all"
                      >
                        <MessageCircle size={15} className="fill-white" />
                        <span>Order Now</span>
                      </a>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Oil Recommendation Tool section (Aesthetic Block) */}
      <section className="mt-16 bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-900 shadow-2xl relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Side (Col-span 5) */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-850 px-3 py-1.5 rounded-full text-xs font-bold text-orange-500 uppercase tracking-widest">
              <Sparkles size={12} className="animate-pulse" />
              <span>AI-Powered Selector Assistant</span>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Need Recommendation?</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed font-normal">
                Provide your vehicle make, model, and mileage, and our server-side Gemini AI model will calculate the exact engine oil type, viscosity standards, and compatible brands.
              </p>
            </div>

            <form onSubmit={handleRecommendationSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">Make / Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. BMW"
                    value={recoForm.make}
                    onChange={(e) => setRecoForm({ ...recoForm, make: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-3 py-3 text-white placeholder-slate-700 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">Model Name</label>
                  <input
                    type="text"
                    placeholder="e.g. 3 Series"
                    value={recoForm.model}
                    onChange={(e) => setRecoForm({ ...recoForm, model: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-3 py-3 text-white placeholder-slate-700 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">Year of Manufacture</label>
                  <input
                    type="text"
                    placeholder="e.g. 2017"
                    value={recoForm.year}
                    onChange={(e) => setRecoForm({ ...recoForm, year: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-3 py-3 text-white placeholder-slate-700 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">Mileage (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 85,000 miles"
                    value={recoForm.mileage}
                    onChange={(e) => setRecoForm({ ...recoForm, mileage: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-3 py-3 text-white placeholder-slate-700 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">Driving Habits / Conditions</label>
                <select
                  value={recoForm.conditions}
                  onChange={(e) => setRecoForm({ ...recoForm, conditions: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-850 rounded-xl px-3 py-3 text-white focus:ring-1 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="Standard/mixed highway & city driving">Mixed City & Motorway Driving</option>
                  <option value="Mainly urban short trips (stop and start)">Short Stop-and-Start Urban Commuting</option>
                  <option value="Heavy load carrying / towing / mountain hills">Towing / Severe Cargo / Hill Terrain</option>
                  <option value="High performance spirited / track days">Spirited Driving / High Performance</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loadingReco}
                className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
              >
                {loadingReco ? (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Analyzing specifications...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Run AI Recommendation</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Side (Col-span 7) */}
          <div className="lg:col-span-7 h-full flex flex-col justify-center">
            {loadingReco && (
              <div className="bg-slate-900 rounded-2xl p-8 border border-slate-850 text-center space-y-4 py-16 animate-pulse">
                <div className="h-10 w-10 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mx-auto">
                  <Droplet className="animate-bounce" size={20} />
                </div>
                <h4 className="font-extrabold text-white text-base">Querying Manufacturer Databases</h4>
                <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                  Analyzing specifications for {recoForm.year} {recoForm.make} {recoForm.model}. Searching OEM oil approvals and matching viscosity indexes...
                </p>
              </div>
            )}

            {!loadingReco && !recommendation && !recoError && (
              <div className="bg-slate-900/40 rounded-2xl p-8 border border-slate-850/60 text-center py-20 text-slate-400 space-y-3">
                <FileText size={32} className="mx-auto text-slate-600" />
                <h4 className="font-bold text-sm text-slate-300">No active analysis active</h4>
                <p className="text-xs max-w-sm mx-auto leading-relaxed">
                  Enter your vehicle specs and click 'Run AI Recommendation' to receive real-time, tailored motor oil recommendations powered by server-side Gemini.
                </p>
              </div>
            )}

            {recoError && (
              <div className="bg-rose-950/20 border border-rose-900/40 rounded-2xl p-8 text-center space-y-3 py-16">
                <AlertCircle size={32} className="text-rose-500 mx-auto" />
                <h4 className="font-extrabold text-white text-base">Analysis Interrupted</h4>
                <p className="text-xs text-rose-300 max-w-md mx-auto leading-relaxed">
                  {recoError}
                </p>
              </div>
            )}

            {recommendation && (
              <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 text-left space-y-4 animate-fadeIn relative">
                <div className="absolute top-4 right-4 text-xs font-bold text-orange-500 flex items-center gap-1">
                  <CheckCircle size={14} className="text-orange-500" />
                  <span>Match Guaranteed</span>
                </div>
                
                <h3 className="font-extrabold text-lg text-white border-b border-slate-800 pb-2 flex items-center gap-2">
                  <Droplet size={18} className="text-orange-500" />
                  <span>Recommendation for {recoForm.year} {recoForm.make} {recoForm.model}</span>
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                    <span className="text-slate-500 block text-[9px] font-bold uppercase">Ideal Viscosity</span>
                    <span className="text-white font-extrabold text-sm">{recommendation.viscosity}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                    <span className="text-slate-500 block text-[9px] font-bold uppercase">Base Lubricant</span>
                    <span className="text-white font-extrabold text-sm capitalize">{recommendation.oilType}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 col-span-2 md:col-span-1">
                    <span className="text-slate-500 block text-[9px] font-bold uppercase">Interval</span>
                    <span className="text-orange-500 font-extrabold text-sm">{recommendation.interval}</span>
                  </div>
                </div>

                <div className="text-xs space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-850">
                  <span className="text-slate-500 block text-[9px] font-bold uppercase">Required Specs & Approvals</span>
                  <span className="text-slate-355 leading-relaxed font-semibold">{recommendation.specifications}</span>
                </div>

                <div className="text-xs space-y-1">
                  <span className="text-slate-500 block text-[9px] font-bold uppercase">Recommended Premium Brands</span>
                  <div className="flex gap-2 pt-1">
                    {recommendation.recommendedBrands?.map((brand: string) => (
                      <span key={brand} className="bg-slate-950 text-white border border-slate-850 px-3 py-1.5 rounded-lg font-bold">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-850">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-500 text-[9px] font-bold uppercase">Technical Explanation</span>
                    <span className="text-slate-400 text-[9px]">Filter Type: {recommendation.oilFilterType || 'Cartridge'}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{recommendation.explanation}</p>
                </div>

                <div className="pt-2">
                  <a
                    href={getWhatsAppRecoEnquiryText()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} className="fill-white" />
                    <span>Enquire Pricing via WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
