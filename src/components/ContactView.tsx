/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, ChevronDown, ChevronUp, CheckCircle, Map } from 'lucide-react';

export default function ContactView() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const getWhatsAppLink = () => {
    return `https://wa.me/237670123456?text=${encodeURIComponent("Hello! I want to enquire about paint matching or engine oil stock.")}`;
  };

  const faqs = [
    {
      q: "How does the Automotive Paint Color Matching system work?",
      a: "Every car has an original paint formulation code stamped onto a metal plate or sticker (usually inside the door frame or engine bay). Once you submit that code along with your vehicle model, our team inputs it into our spectrophotometer database to generate the exact chemical mixing recipe. We weigh individual solid tinter or metallic pigments down to the microgram, assuring an original factory finish match."
    },
    {
      q: "What brands of Engine Oil do you stock?",
      a: "We distribute certified genuine Mobil 1, Shell Helix, Castrol EDGE, Liqui Moly, and Valvoline oils. All our oils carry manufacturer approval ratings (like VW 504 00 / 507 00, Mercedes MB 229.51, and BMW LL-04) so that your engine warranty is fully preserved."
    },
    {
      q: "What quantities of paint can I order?",
      a: "We manufacture coatings in a wide range of sizes. This includes custom 50ml touch-up pots with built-in brushes (great for rock chips), professional 400ml aerosol spray canisters (for panel scuffs), 1.0 Litre liquid cans, and 5.0 Litre bulk cans for spray shops."
    },
    {
      q: "Can you match paint for older vehicles with faded paintwork?",
      a: "Yes! If your car suffers from sun fade or age oxidation, standard factory codes might look slightly too dark. In these cases, you can select 'Spirited/Aged' notes in our request form, upload a high-resolution photo of your car's panels in direct sunlight, or bring a small fuel flap cover into our Douala laboratory. Our chemists will formulate a custom weathered tint to compensate for ultraviolet fade."
    },
    {
      q: "What are your delivery options and turnaround times?",
      a: "Standard engine oils are dispatched immediately and arrive within 24-48 hours. Custom paint matching orders are formulated and mixed in our lab within 2-4 hours. Once mixed, you can collect them in-store immediately, or we can ship them via express logistics systems with reliable next-day delivery service across Cameroon."
    }
  ];

  return (
    <div id="contact-view" className="animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      
      {/* Title Header */}
      <div className="border-b border-neutral-200 pb-6 mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 uppercase tracking-tight">
          Contact <span className="text-amber-500">NexusOil Cameroon</span>
        </h1>
        <p className="text-neutral-500 text-sm mt-1.5 max-w-2xl">
          Get in touch for bulk lubricant orders, custom color mixing status updates, or trade garage account setup options.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        
        {/* Contact Info & Hours (Col-span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-6">
            <h3 className="font-extrabold text-lg text-neutral-950 flex items-center gap-2 pb-3 border-b border-neutral-100">
              <Phone size={20} className="text-orange-600" />
              <span>Direct Channels</span>
            </h3>

            <div className="space-y-4 text-xs">
              {/* WhatsApp Priority */}
              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-100 p-4 rounded-2xl transition-all"
              >
                <MessageCircle size={22} className="text-emerald-600 shrink-0 mt-0.5 fill-emerald-600/10" />
                <div className="space-y-0.5">
                  <span className="block font-extrabold text-emerald-950 text-sm">WhatsApp Priority Support</span>
                  <p className="text-emerald-800">Send photos of paint stickers or ask viscosity questions. Active 24/7. Response &lt; 15 mins.</p>
                  <span className="inline-block bg-emerald-600 text-white font-bold px-2 py-0.5 rounded text-[10px] mt-2">Open Chat Now</span>
                </div>
              </a>

              {/* Standard phone */}
              <div className="flex items-start gap-3 p-2">
                <Phone size={18} className="text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-neutral-900">General Phone Enquiries</span>
                  <span className="block text-neutral-500 mt-0.5">+237 670 123 456</span>
                  <span className="text-neutral-400 text-[10px]">Calls handled Monday to Saturday during business hours.</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 p-2">
                <Mail size={18} className="text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-neutral-900">Email Dispatch Desk</span>
                  <span className="block text-neutral-500 mt-0.5">info@nexusoilcameroon.com</span>
                  <span className="text-neutral-400 text-[10px]">For invoicing, bulk wholesale setups, and commercial billing.</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 p-2">
                <MapPin size={18} className="text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-neutral-900">Douala Laboratory & Distribution</span>
                  <span className="block text-neutral-500 mt-0.5">Zone Industrielle de Bassa, Douala, Cameroon</span>
                  <span className="text-neutral-400 text-[10px]">Conveniently located in the Bassa industrial sector. Secured storage and customer collection lanes.</span>
                </div>
              </div>

            </div>
          </div>

          {/* Business Hours Box */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-900 shadow-lg space-y-4">
            <h3 className="font-extrabold text-base flex items-center gap-2">
              <Clock size={18} className="text-orange-500" />
              <span>Operating Hours</span>
            </h3>
            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span>Monday - Friday:</span>
                <span className="text-white font-bold">08:30 - 18:00</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span>Saturday:</span>
                <span className="text-white font-bold">09:00 - 16:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday & Holidays:</span>
                <span className="text-rose-400 font-bold">Closed (WhatsApp Only)</span>
              </div>
              <p className="text-[10px] text-slate-500 italic pt-2">
                Note: Color formulation mixing shuts down 30 minutes prior to closing time for lab cleaning.
              </p>
            </div>
          </div>
        </div>

        {/* Custom Visual Vector Map Dashboard (Col-span 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-5">
          <h3 className="font-extrabold text-lg text-neutral-950 flex items-center justify-between border-b border-neutral-100 pb-3">
            <span className="flex items-center gap-2">
              <Map size={20} className="text-orange-600" />
              <span>Store & Lab Location</span>
            </span>
            <span className="text-xs bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-ping"></span>
              Douala, Cameroon
            </span>
          </h3>

          {/* High polished SVG Mock Map representing their location */}
          <div className="w-full h-80 rounded-2xl bg-slate-950 relative overflow-hidden flex items-center justify-center shadow-inner border border-slate-900">
            {/* Ambient map background texture grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
            
            {/* SVG Visual Road System */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Primary roads (dark gray lines) */}
              <line x1="0" y1="120" x2="600" y2="120" stroke="#333" strokeWidth="24" strokeLinecap="round" />
              <line x1="120" y1="0" x2="120" y2="400" stroke="#333" strokeWidth="20" strokeLinecap="round" />
              <line x1="380" y1="0" x2="380" y2="400" stroke="#333" strokeWidth="16" strokeLinecap="round" />
              <line x1="120" y1="260" x2="600" y2="260" stroke="#333" strokeWidth="16" strokeLinecap="round" />
              
              {/* Road names */}
              <text x="240" y="124" fill="#666" fontSize="10" fontWeight="bold" fontFamily="sans-serif">BOULEVARD DE L'U.D.E.A.C.</text>
              <text x="126" y="60" fill="#666" fontSize="9" fontWeight="bold" fontFamily="sans-serif" transform="rotate(90 126 60)">RUE DE BASSA</text>
              <text x="386" y="320" fill="#666" fontSize="8" fontWeight="bold" fontFamily="sans-serif" transform="rotate(90 386 320)">ROUTE DE L'INDUSTRIE</text>
              
              {/* Landmarks / Blocks */}
              {/* Port de Douala */}
              <rect x="20" y="280" width="80" height="80" rx="40" fill="#222" stroke="#444" strokeWidth="2" />
              <text x="60" y="324" fill="#888" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">BASSA</text>
              <text x="60" y="334" fill="#888" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">DISTRICT</text>

              {/* Train Station */}
              <rect x="20" y="20" width="80" height="40" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              <text x="60" y="44" fill="#38bdf8" fontSize="8" fontWeight="extrabold" fontFamily="sans-serif" textAnchor="middle">GARE DE BASSA</text>

              {/* Warehouse Block */}
              <rect x="420" y="160" width="120" height="80" rx="12" fill="#171717" stroke="#ea580c" strokeWidth="2" strokeDasharray="3" />
            </svg>

            {/* Custom Interactive Marker Overlay representing NexusOil */}
            <div className="absolute top-[200px] left-[70%] sm:left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="bg-amber-500 text-slate-950 px-3 py-1.5 rounded-xl text-[10px] font-extrabold shadow-lg border border-amber-400 mb-1 flex items-center gap-1">
                <span className="h-2 w-2 bg-slate-950 rounded-full animate-ping"></span>
                <span>NEXUSOIL HQ</span>
              </div>
              <div className="h-6 w-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-xl animate-bounce">
                ★
              </div>
            </div>

            {/* Direction Help Block in map */}
            <div className="absolute bottom-3 left-3 bg-slate-950/90 text-slate-400 p-2.5 rounded-xl text-[10px] space-y-1 text-left border border-slate-900 max-w-xs">
              <span className="text-white font-bold block">Arrival Instructions:</span>
              <p>Turn off Boulevard de l'U.D.E.A.C. into Route de l'Industrie. We are situated in Bassa Industrial Zone. Secure logistics parking is available.</p>
            </div>
          </div>

          {/* Quick directions */}
          <div className="grid grid-cols-2 gap-3 text-xs text-neutral-500">
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
              <span className="font-extrabold text-neutral-900 block mb-0.5">By Train / Transit:</span>
              Take the regional line to Bassa Station (Gare de Bassa). Head east along Rue de Bassa, then take Route de l'Industrie.
            </div>
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
              <span className="font-extrabold text-neutral-900 block mb-0.5">By Car / Truck:</span>
              Direct access from Boulevard de l'U.D.E.A.C. Turn into the industrial zone access road. NexusOil gates are on the right.
            </div>
          </div>
        </div>

      </div>

      {/* Interactive FAQ Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 mb-6">
        <div className="text-center space-y-2 mb-10">
          <span className="text-orange-600 text-xs font-bold uppercase tracking-widest block">Answers to Common Questions</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="border border-neutral-100 rounded-2xl bg-neutral-50 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex justify-between items-center p-4 sm:p-5 text-left font-extrabold text-sm sm:text-base text-neutral-950 hover:bg-neutral-100/50 transition-colors focus:outline-none"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp size={18} className="text-orange-600" /> : <ChevronDown size={18} className="text-neutral-400" />}
              </button>
              
              {openFaq === idx && (
                <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-neutral-500 leading-relaxed border-t border-neutral-100 bg-white animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
