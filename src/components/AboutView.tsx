/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Truck, Users, Award, Heart, CheckCircle2 } from 'lucide-react';

export default function AboutView() {
  return (
    <div id="about-view" className="animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      
      {/* Title Header */}
      <div className="border-b border-neutral-200 pb-6 mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 uppercase tracking-tight">
          About <span className="text-amber-500">NexusOil Cameroon</span>
        </h1>
        <p className="text-neutral-500 text-sm mt-1.5 max-w-2xl">
          Learn more about our dedication to precision formulations, high-caliber motor oils, and master matching automotive coatings.
        </p>
      </div>

      {/* Main Core Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        {/* Text Area */}
        <div className="lg:col-span-7 space-y-5">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Our Heritage & Commitment</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 leading-tight">
            Distributing Premium Lubricants and Master Formulating Coatings Since 2012
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            NexusOil Cameroon was founded with a clear, singular vision: to eliminate the friction from purchasing heavy-duty automotive consumables. We realized that fleet operators, local garages, and motor enthusiasts faced complex, sluggish pipelines when sourcing specific engine lubricants or trying to get accurate paint code refinishes.
          </p>
          <p className="text-neutral-600 text-sm leading-relaxed">
            By combining high-performance lubrication products certified under strict OEM specs with a modernized laboratory paint formulation service, we offer a hybrid sales solution. Our priority is immediate response times, precise color matching ratios, and direct WhatsApp communication for fast order conversion and dispatch.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="border-l-4 border-amber-500 pl-3">
              <span className="block text-2xl font-extrabold text-neutral-950">99.8%</span>
              <span className="text-xs text-neutral-400 font-semibold uppercase">Color Accuracy Match</span>
            </div>
            <div className="border-l-4 border-emerald-500 pl-3">
              <span className="block text-2xl font-extrabold text-neutral-950">&lt; 15 Mins</span>
              <span className="text-xs text-neutral-400 font-semibold uppercase">Average Response Time</span>
            </div>
          </div>
        </div>

        {/* Visual Box Side */}
        <div className="lg:col-span-5 space-y-6">
          {/* Texaco Station Image Card */}
          <div className="relative group overflow-hidden rounded-3xl border border-neutral-200 shadow-xl bg-neutral-900 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/11]">
            <img 
              src="/images/lp2.jpg" 
              alt="NexusOil Texaco Partner Forecourt" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent"></div>
            {/* Text badge inside the image */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[9px] uppercase font-black tracking-widest text-amber-400 bg-amber-500/10 border border-amber-400/30 px-2 py-0.5 rounded-full backdrop-blur-md inline-block">
                Certified Partner Forecourt
              </span>
              <h4 className="font-extrabold text-sm sm:text-base mt-2 leading-tight drop-shadow-md text-white">
                Fueling Cameroonian Industry Night & Day
              </h4>
              <p className="text-[10px] text-neutral-300 mt-0.5 leading-normal opacity-90">
                Strategic partnerships bringing international standards of lubrication to Douala.
              </p>
            </div>
          </div>

          {/* Benefits Box */}
          <div className="bg-slate-950 text-white p-6 rounded-3xl border border-slate-900 shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <h3 className="font-extrabold text-lg border-b border-slate-900 pb-2">Why Partner With Us?</h3>
            
            <ul className="space-y-4 text-xs">
              <li className="flex gap-3">
                <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-orange-500 border border-slate-850 shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-200">100% OEM Original Sourcing</h4>
                  <p className="text-neutral-400 mt-0.5">We distribute premium brands strictly compliant with original manufacturer warranties.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-orange-500 border border-slate-850 shrink-0">
                  <Truck size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-200">Local Express Logistics</h4>
                  <p className="text-neutral-400 mt-0.5">Same-day dispatch or immediate local collection slots available for custom paint formulations.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-emerald-500 border border-slate-850 shrink-0">
                  <Users size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-200">Dedicated Technical Desk</h4>
                  <p className="text-neutral-400 mt-0.5">Direct chat access with chemical formulation engineers and lubrication experts.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mission & Vision Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-3">
          <span className="bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1 rounded-full w-max block border border-orange-100">Our Mission</span>
          <h3 className="text-xl font-extrabold text-neutral-950">Empowering Refinishing & Reliability</h3>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Our mission is to supply automotive professionals and enthusiasts with chemical motor components that excel under extreme thermal pressures and precise color-matching paint coatings that seamlessly repair factory finishes. We strive to provide premium quality at bulk speed.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-3">
          <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full w-max block">Our Vision</span>
          <h3 className="text-xl font-extrabold text-neutral-950">Setting the Industry Standard</h3>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Our vision is to become the leading digital ordering platform for specialty vehicle paints and premium lubricants. By integrating server-side intelligence with local distribution hubs and mobile-first WhatsApp dispatch coordination, we make parts logistics feel instant and effortless.
          </p>
        </div>
      </div>

      {/* Commitments list */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-100">
        <h3 className="text-xl font-extrabold text-neutral-950 mb-6 text-center">Our Commitment to Quality</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-neutral-600 leading-relaxed">
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-neutral-950 mb-1">OEM Grade Lubrication</h4>
              <p>Every barrel, drum, and bottle of motor oil conforms to API and ACEA ratings, ensuring complete warranty integrity.</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-neutral-950 mb-1">Strict Pigment Formulation</h4>
              <p>We weigh metallic and pearl pigment ratios precisely using digital formulation scales, achieving paint code conformity.</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-neutral-950 mb-1">Fast Response Turnaround</h4>
              <p>We monitor incoming digital queues continuously. Quote confirmations are delivered on WhatsApp in minutes.</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-neutral-950 mb-1">Premium Raw Solvents</h4>
              <p>Our direct-gloss formulas utilize high-solids (HS) polyurethane compounds to assure maximum weather and UV shield protection.</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-neutral-950 mb-1">Eco-Conscious Packaging</h4>
              <p>We prioritize fully recyclable metal tins and spray canisters to minimize workshop plastic waste footprints.</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-neutral-950 mb-1">Certified Safe Transport</h4>
              <p>We package lubricants and pressurized aerosols carefully using certified ADR dangerous goods hazardous transport boxes.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
