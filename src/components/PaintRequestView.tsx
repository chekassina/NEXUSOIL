/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Paintbrush, 
  Car, 
  Sparkles, 
  Upload, 
  FileImage, 
  ShieldAlert, 
  MessageCircle, 
  Info, 
  CheckCircle, 
  AlertCircle, 
  Trash2,
  ShoppingBag,
  Star,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Layers
} from 'lucide-react';

interface PaintProduct {
  id: string;
  name: string;
  category: 'Custom Matches' | 'Finishes & Primers' | 'Prep & Accessories';
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  features: string[];
  customizable: boolean;
  defaultQuantity: string;
}

const PAINT_PRODUCTS: PaintProduct[] = [
  {
    id: 'paint-custom-spray',
    name: 'Custom Mixed Aerosol Spray Can (400ml)',
    category: 'Custom Matches',
    price: 14500,
    rating: 4.9,
    reviews: 124,
    image: '/images/lp6.jpg',
    description: 'Bespoke high-opacity aerosol spray can loaded with professional acrylic basecoat paint mixed precisely to your original vehicle OEM color code. Features an adjustable fan-spray nozzle.',
    features: ['Precision-matched basecoat formula', 'Adjustable fan-spray aerosol nozzle', 'Superior coverage & adhesion', 'Fast-drying & sun-resistant paint'],
    customizable: true,
    defaultQuantity: 'Aerosol Spray Can (400ml)'
  },
  {
    id: 'paint-custom-touchup',
    name: 'Professional Touch-Up Brush & Pen Kit (50ml)',
    category: 'Custom Matches',
    price: 8000,
    rating: 4.8,
    reviews: 86,
    image: '/images/lp6.jpg',
    description: 'Consolidated touch-up kit featuring a double-ended applicator (needle pen tip for deep stone chips, and a soft hair brush for wider panel scuffs). Mixed exact-to-code.',
    features: ['Exact factory color shade matching', 'Pen & brush dual-end premium design', 'Formulated with anti-rust inhibitors', 'Complete paint prep guidelines included'],
    customizable: true,
    defaultQuantity: 'Touch Up Pot (50ml Brush Pot)'
  },
  {
    id: 'paint-custom-liquid',
    name: 'Bespoke Direct-Gloss OEM Liquid Can (1.0L)',
    category: 'Custom Matches',
    price: 39000,
    rating: 5.0,
    reviews: 42,
    image: '/images/lp6.jpg',
    description: 'High-density solids ratio paint designed specifically for professional pneumatic spray guns. Available in basecoat or 2K direct-gloss format to match your car perfectly.',
    features: ['High concentration of pigments', 'Perfect for full panels & restoration', 'Excellent flow and leveling qualities', 'Extreme durability against chips'],
    customizable: true,
    defaultQuantity: '1.0 Litre Spray Tin'
  },
  {
    id: 'paint-solvent-based',
    name: 'Dekro Premium Solvent-Based Protective Coating (1.0L)',
    category: 'Custom Matches',
    price: 22500,
    rating: 4.9,
    reviews: 112,
    image: '/images/lp7.jpg',
    description: 'Premium high-build solvent-based protective enamel. Formulated for heavy-duty metal chassis, engine compartments, underbody, and high-impact areas requiring robust weathering defense and anti-corrosive power.',
    features: ['High-solid solvent-based enamel', 'Heavy-duty chemical & water barrier', 'Ultra-tough impact & scratch durability', 'Excellent brush, roller, or spray application'],
    customizable: true,
    defaultQuantity: '1.0 Litre Spray Tin'
  },
  {
    id: 'paint-clear-lacquer',
    name: 'Professional 2K High-Gloss Clear Lacquer (400ml)',
    category: 'Finishes & Primers',
    price: 10000,
    rating: 4.9,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80',
    description: 'Two-component highly durable clear coat lacquer. Activating the canister triggers a chemical cross-link that yields a petrol-resistant, scratch-resistant, and high-gloss glaze.',
    features: ['Internal hardener activation button', 'Maximum chemical & weather resistance', 'Provides deep glass-like gloss depth', 'Full UV protection prevents fading'],
    customizable: false,
    defaultQuantity: 'Aerosol Spray Can (400ml)'
  },
  {
    id: 'paint-primer-grey',
    name: 'Anti-Corrosive High-Build Grey Primer (400ml)',
    category: 'Finishes & Primers',
    price: 7000,
    rating: 4.7,
    reviews: 73,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    description: 'Universal high-build spray primer that provides an outstanding anti-rust corrosion barrier. Essential for sealing bare metal or plastic before applying basecoats.',
    features: ['Prevents metal rust spread', 'Super easy wet-and-dry sandability', 'High-build filling of minor scratches', 'Compatible with all topcoat brands'],
    customizable: false,
    defaultQuantity: 'Aerosol Spray Can (400ml)'
  },
  {
    id: 'paint-prep-degreaser',
    name: 'Premium Surface Prep & Degreaser Wipe Pack',
    category: 'Prep & Accessories',
    price: 5000,
    rating: 4.6,
    reviews: 58,
    image: 'https://images.unsplash.com/photo-1530047625168-4b18df2df4f6?auto=format&fit=crop&w=400&q=80',
    description: 'Pre-saturated surface cleaning wipes loaded with fast-flashing solvent degreaser. Safely dissolves all wax, grease, oil, silicone, and dust before coating.',
    features: ['Fast evaporation, leaves zero residue', 'Heavy duty cloth, won\'t lint or tear', 'Ensures maximum paint-to-metal bonding', '15 extra-large pre-saturated wipes'],
    customizable: false,
    defaultQuantity: 'Prep Kit'
  },
  {
    id: 'paint-sanding-kit',
    name: 'Refinishing Sanding Block & Compound Kit',
    category: 'Prep & Accessories',
    price: 12000,
    rating: 4.8,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
    description: 'Consolidated wet-and-dry abrasive block detailing pack featuring premium P1200, P2000 and P3000 grit sandpapers, a rubber backing block, and ultra-cut finishing polish compound.',
    features: ['Smoothes clearcoat transition borders', 'Eliminates orange-peel surface textures', 'Excellent paint edge-blending properties', 'Includes professional-grade heavy polish'],
    customizable: false,
    defaultQuantity: 'Sanding Kit'
  }
];

export default function PaintRequestView() {
  // Navigation within Paint View
  const [activeSubTab, setActiveSubTab] = useState<'shop' | 'formulation'>('shop');

  // Paint Shop Search / Category filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Custom Matches' | 'Finishes & Primers' | 'Prep & Accessories'>('All');

  // Form selection feedback banner
  const [prefilledMessage, setPrefilledMessage] = useState<string | null>(null);

  // Main Request Form State
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    vehicleBrand: '',
    model: '',
    year: '',
    paintCode: '',
    colorName: '',
    desiredFinish: 'Metallic' as any,
    paintType: 'Basecoat' as any,
    quantity: 'Aerosol Spray Can (400ml)',
    notes: '',
  });

  // Base64 file state for preview and AI payload
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Submission State
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // AI Matching Recommendation state
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiMatch, setAiMatch] = useState<any | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Handle file select and convert to base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('File size exceeds the 8MB limit. Please select a smaller photo.');
        return;
      }
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageBase64(null);
    setImageFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setAiMatch(null);
  };

  // Trigger customization from product card
  const handleSelectCustomProduct = (product: PaintProduct) => {
    setFormData(prev => ({
      ...prev,
      quantity: product.defaultQuantity
    }));
    setPrefilledMessage(`You selected: ${product.name}. We pre-filled the quantity! Please enter your vehicle details below to match the color.`);
    setActiveSubTab('formulation');
    // Scroll to top of form smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Remove prefilled notification banner after 8 seconds
    setTimeout(() => {
      setPrefilledMessage(null);
    }, 8000);
  };

  // Compose standard product WhatsApp message
  const getWhatsAppProductLink = (product: PaintProduct) => {
    const text = `Hello LubriCoat! I am browsing your Paint Shop and would like to order/enquire about this product:
Product: ${product.name}
Category: ${product.category}
Price: ${product.price.toLocaleString()} FCFA
Please confirm immediate availability, collection options, or postage fees. Thank you!`;
    return `https://wa.me/447911123456?text=${encodeURIComponent(text)}`;
  };

  // Submit main inquiry
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.vehicleBrand || !formData.model || !formData.year) {
      alert('Please fill in all mandatory fields.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/requests/paint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          imageUrl: imageBase64,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit paint request to the server.');
      }

      const data = await response.json();
      setSubmittedId(data.id);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Error submitting paint request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Run AI Paint Matching Analysis
  const handleAIMatchAnalysis = async () => {
    if (!formData.vehicleBrand || !formData.model || !formData.year) {
      setAiError('Please provide Vehicle Brand, Model, and Year in the form before requesting an AI color matching analysis.');
      return;
    }

    setLoadingAI(true);
    setAiError(null);
    setAiMatch(null);

    try {
      const response = await fetch('/api/recommend/paint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand: formData.vehicleBrand,
          model: formData.model,
          year: formData.year,
          colorName: formData.colorName,
          colorCode: formData.paintCode,
          finishType: formData.desiredFinish,
          imageBase64: imageBase64,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve AI analysis from the server.');
      }

      const data = await response.json();
      setAiMatch(data);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'AI color matching is currently busy. Please fill out details manually.');
    } finally {
      setLoadingAI(false);
    }
  };

  // Formulate WhatsApp message for custom orders
  const getWhatsAppSubmitLink = () => {
    const text = `Hello LubriCoat! I would like to confirm my automotive paint request:
Request ID: ${submittedId || 'NEW'}
Name: ${formData.customerName}
Phone: ${formData.phone}
Vehicle: ${formData.year} ${formData.vehicleBrand} ${formData.model}
Stated Color: ${formData.colorName || 'Not specified'}
Color Code: ${formData.paintCode || 'Not specified'}
Finish Style: ${formData.desiredFinish}
Coating Type: ${formData.paintType}
Quantity: ${formData.quantity}
Notes: ${formData.notes || 'None'}
Please confirm matching availability and dispatch terms!`;

    return `https://wa.me/447911123456?text=${encodeURIComponent(text)}`;
  };

  // Filter paint products
  const filteredProducts = PAINT_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div id="paint-request-view" className="animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title Header */}
      <div className="text-left border-b border-neutral-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 uppercase tracking-tight">
            Automotive Paint <span className="text-orange-600">Shop & Lab</span>
          </h1>
          <p className="text-neutral-500 text-sm mt-1.5 max-w-3xl">
            We manufacture premium OEM color-matched finishes. Browse our specialized catalog of refinishing coats and prep kits, or use our Bespoke Formulation Lab to mix paint directly to your car's factory paint code.
          </p>
        </div>

        {/* Custom Tab Switcher */}
        <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200/80 w-full md:w-auto shrink-0">
          <button
            onClick={() => setActiveSubTab('shop')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'shop'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag size={14} />
            <span>Paint Shop Catalog</span>
          </button>
          <button
            onClick={() => setActiveSubTab('formulation')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'formulation'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Paintbrush size={14} />
            <span>Formulation Lab (Bespoke Mix)</span>
          </button>
        </div>
      </div>

      {prefilledMessage && (
        <div className="mb-6 bg-orange-50 border border-orange-200 text-orange-800 rounded-2xl p-4 text-xs font-medium flex items-center gap-2.5 animate-bounce">
          <Sparkles size={16} className="text-orange-600 shrink-0" />
          <span>{prefilledMessage}</span>
        </div>
      )}

      {activeSubTab === 'shop' ? (
        /* ================== PAINT SHOP CATALOG VIEW ================== */
        <div className="space-y-8">
          {/* Filters Banner */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 text-left shadow-sm">
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search paint products, clear coats, primers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none placeholder-slate-400"
              />
            </div>

            {/* Category Buttons */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {(['All', 'Custom Matches', 'Finishes & Primers', 'Prep & Accessories'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-50 border border-slate-150 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat === 'All' ? 'All Products' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
              <AlertCircle size={40} className="text-slate-300 mx-auto animate-pulse" />
              <h3 className="font-extrabold text-neutral-900 text-base">No matching paint supplies found</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                We couldn't find any products in our database matching that search. Try clearing your filters or proceed to the Bespoke Color Formulation Lab tab to mix custom quantities!
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-neutral-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Product Image */}
                    <div className="h-52 bg-slate-100 relative overflow-hidden group">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-slate-950 text-white text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                        {product.category}
                      </span>
                      {product.customizable && (
                        <span className="absolute top-3 right-3 bg-orange-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide flex items-center gap-1">
                          <Sparkles size={10} />
                          <span>Custom OEM Mix</span>
                        </span>
                      )}
                    </div>

                    {/* Product Specs */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-extrabold text-slate-950 text-base leading-snug line-clamp-2">
                          {product.name}
                        </h3>
                        <span className="text-lg font-black text-slate-950 shrink-0">
                          {product.price.toLocaleString()} FCFA
                        </span>
                      </div>

                      {/* Rating & Reviews */}
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-400">
                          <Star size={12} className="fill-amber-400" />
                          <Star size={12} className="fill-amber-400" />
                          <Star size={12} className="fill-amber-400" />
                          <Star size={12} className="fill-amber-400" />
                          <Star size={12} className="fill-amber-400" />
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-800">{product.rating}</span>
                        <span className="text-[10px] text-slate-400">({product.reviews} reviews)</span>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed font-normal">{product.description}</p>

                      {/* Feature Bullets */}
                      <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1.5 mt-2">
                        {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[10px] text-slate-600 font-normal">
                            <span className="text-orange-500 font-bold">✓</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Buy / Customize Buttons */}
                  <div className="p-5 sm:p-6 pt-0">
                    {product.customizable ? (
                      <button
                        onClick={() => handleSelectCustomProduct(product)}
                        className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5"
                      >
                        <Paintbrush size={14} />
                        <span>Customize OEM Paint Color</span>
                        <ArrowRight size={12} />
                      </button>
                    ) : (
                      <a
                        href={getWhatsAppProductLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle size={14} className="fill-white" />
                        <span>Enquire & Order on WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Trust Board */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-900 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-1.5 max-w-2xl">
              <span className="inline-flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full text-[9px] font-bold text-orange-500 uppercase tracking-widest">
                <Layers size={10} />
                <span>Refinishing Bundles</span>
              </span>
              <h4 className="text-lg font-black tracking-tight text-white">Need a complete repair package deal?</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-normal">
                If you are re-spraying whole bumpers or doors, our dispatchers coordinate bulk kits containing customized OEM spray paint basecoats, 2K clearcoats, and plastic adhesion primers at deep commercial discounts.
              </p>
            </div>
            <button
              onClick={() => {
                setFormData(prev => ({ ...prev, quantity: 'Refinishing Kit (Paint+Clear+Primer)' }));
                setActiveSubTab('formulation');
              }}
              className="w-full md:w-auto px-5 py-3 bg-white hover:bg-slate-100 text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shrink-0"
            >
              <span>Build Complete Kit</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      ) : (
        /* ================== BESPOKE FORMULATION LAB VIEW ================== */
        <div>
          {success ? (
            // Confirmation View
            <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-md max-w-2xl mx-auto text-center space-y-6">
              <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold mx-auto text-3xl shadow-inner animate-pulse">
                ✓
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-neutral-950">Paint Match Request Received!</h2>
                <p className="text-neutral-500 text-sm leading-relaxed max-w-md mx-auto">
                  Thank you, <span className="font-bold text-neutral-950">{formData.customerName}</span>. Your paint specifications have been queued in our database. Our laboratory team will confirm availability, color match, and formulate precise pricing immediately.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 text-left text-xs space-y-2.5 max-w-md mx-auto">
                <h4 className="font-bold text-neutral-800 uppercase tracking-wide">Inquiry Summary</h4>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Request ID:</span>
                  <span className="font-mono text-neutral-900 font-bold">{submittedId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Vehicle:</span>
                  <span className="text-neutral-900 font-bold">{formData.year} {formData.vehicleBrand} {formData.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Color Spec:</span>
                  <span className="text-neutral-900 font-bold">{formData.paintCode || formData.colorName || 'Default Mix'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Finish / Quantity:</span>
                  <span className="text-neutral-900 font-bold">{formData.desiredFinish} • {formData.quantity}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 max-w-md mx-auto">
                <a
                  href={getWhatsAppSubmitLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} className="fill-white" />
                  <span>Confirm via WhatsApp (Instant reply)</span>
                </a>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setSubmittedId(null);
                    setFormData({
                      customerName: '',
                      phone: '',
                      vehicleBrand: '',
                      model: '',
                      year: '',
                      paintCode: '',
                      colorName: '',
                      desiredFinish: 'Metallic',
                      paintType: 'Basecoat',
                      quantity: 'Aerosol Spray Can (400ml)',
                      notes: '',
                    });
                    setImageBase64(null);
                    setImageFileName(null);
                    setAiMatch(null);
                  }}
                  className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold transition-colors"
                >
                  Submit another paint request
                </button>
              </div>
            </div>
          ) : (
            // Form Entry View
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
              {/* Main Form Fields (Col-span 7) */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
                <h3 className="font-extrabold text-lg text-neutral-950 border-b border-neutral-100 pb-3 flex items-center gap-2">
                  <Paintbrush size={20} className="text-orange-600" />
                  <span>Inquiry Details</span>
                </h3>

                {/* Customer Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Contact Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="block text-neutral-600 font-bold">Your Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. John Doe"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-neutral-600 font-bold">WhatsApp Mobile Number *</label>
                      <input
                        type="tel"
                        placeholder="e.g. +44 7911 123456"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="space-y-4 pt-4 border-t border-neutral-100">
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Car size={14} className="text-neutral-400" />
                    <span>Vehicle Identification</span>
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="space-y-1.5">
                      <label className="block text-neutral-600 font-bold">Vehicle Make *</label>
                      <input
                        type="text"
                        placeholder="e.g. Ford, Audi"
                        value={formData.vehicleBrand}
                        onChange={(e) => setFormData({ ...formData, vehicleBrand: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-3 text-neutral-900 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-neutral-600 font-bold">Model *</label>
                      <input
                        type="text"
                        placeholder="e.g. Fiesta, A4"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-3 text-neutral-900 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-neutral-600 font-bold">Year *</label>
                      <input
                        type="text"
                        placeholder="e.g. 2018"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-3 text-neutral-900 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                    <div className="space-y-1.5">
                      <label className="block text-neutral-600 font-bold flex items-center gap-1">
                        <span>Paint Code (If known)</span>
                        <Info size={12} className="text-neutral-400" title="Found on the chassis plate or door pillar sticker" />
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. LY3D, C4G, 775"
                        value={formData.paintCode}
                        onChange={(e) => setFormData({ ...formData, paintCode: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-neutral-600 font-bold">Color Description</label>
                      <input
                        type="text"
                        placeholder="e.g. Tornado Red, Sapphire Blue"
                        value={formData.colorName}
                        onChange={(e) => setFormData({ ...formData, colorName: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Formulation Specs */}
                <div className="space-y-4 pt-4 border-t border-neutral-100">
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Paint Specification</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="block text-neutral-600 font-bold">Coating Finish Style</label>
                      <select
                        value={formData.desiredFinish}
                        onChange={(e) => setFormData({ ...formData, desiredFinish: e.target.value as any })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                      >
                        <option value="Metallic">Shimmering Metallic Flake</option>
                        <option value="Gloss">High Gloss Solid</option>
                        <option value="Pearl">Tri-Coat Pearl Essence</option>
                        <option value="Matte">Flat Matte / Stealth Finish</option>
                        <option value="Satin">Semi-Gloss Satin Sheen</option>
                        <option value="Solvent-Based Enamel">Solvent-Based Premium Gloss / Satin Enamel</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-neutral-600 font-bold">Coating Formulation Type</label>
                      <select
                        value={formData.paintType}
                        onChange={(e) => setFormData({ ...formData, paintType: e.target.value as any })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                      >
                        <option value="Basecoat">Basecoat Tone (Needs Lacquer/Clear)</option>
                        <option value="Single Stage">2K Direct-Gloss Single Stage</option>
                        <option value="Solvent-Based Coating">Dekro Solvent-Based Premium Coating</option>
                        <option value="Clear Coat">High Gloss Polyurethane Clear Coat</option>
                        <option value="Primer">Anti-Rust High Build Primer</option>
                        <option value="Refinishing">Complete Refinishing Kit (Paint+Clear+Primer)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="block text-neutral-600 font-bold">Quantity Needed</label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                      >
                        <option value="Touch Up Pot (50ml Brush Pot)">Touch Up Pot (50ml Brush Pot + Applicator)</option>
                        <option value="Aerosol Spray Can (400ml)">Professional Aerosol Can (400ml Spray)</option>
                        <option value="500ml Spray Tin">500ml Liquid Spray Canister</option>
                        <option value="1.0 Litre Spray Tin">1.0 Litre Custom Color Paint Tin</option>
                        <option value="2.5 Litres Spray Tin">2.5 Litres Commercial Spray Tin</option>
                        <option value="5.0 Litres Bulk Tank">5.0 Litres Workshop Bulk Can</option>
                        <option value="Refinishing Kit (Paint+Clear+Primer)">Refinishing Kit (Paint+Clear+Primer)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="block text-neutral-600 font-bold">Additional Requests or Notes</label>
                    <textarea
                      placeholder="Tell us if you need matching filters, custom clearcoat additives, specific thinners or if the panels suffer from localized sun fade..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 placeholder-neutral-400 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Photo Attachment (Drag-and-Drop simulator with actual Base64 converter) */}
                <div className="space-y-4 pt-4 border-t border-neutral-100">
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Reference Photo / Sticker (Optional)</h4>
                  
                  {!imageBase64 ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-neutral-200 hover:border-orange-500 bg-slate-50 hover:bg-slate-50/50 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2"
                    >
                      <Upload size={24} className="text-neutral-400" />
                      <span className="font-bold text-neutral-700 text-xs">Upload Vehicle Photo or Paint Code Sticker</span>
                      <span className="text-[10px] text-neutral-400">JPEG, PNG up to 8MB. Auto-reads sticker codes.</span>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="h-16 w-16 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden relative shrink-0">
                          <img src={imageBase64} alt="Attached Preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left overflow-hidden">
                          <p className="font-bold text-xs text-slate-900 truncate">{imageFileName}</p>
                          <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                            <CheckCircle size={10} />
                            <span>Ready to analyze</span>
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="text-slate-400 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-extrabold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? 'Submitting Paint Request...' : 'Submit Paint Match Request'}
                  <CheckCircle size={16} className="text-white" />
                </button>
              </form>

              {/* AI Color matching analysis block (Col-span 5) */}
              <aside className="lg:col-span-5 space-y-6 text-left">
                <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-900 shadow-xl space-y-5 relative overflow-hidden">
                  <div className="absolute top-[-30px] right-[-30px] w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1 bg-orange-500/15 border border-orange-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                      <Sparkles size={11} className="animate-pulse" />
                      <span>Chemical Formulation Match</span>
                    </div>
                    <h3 className="font-extrabold text-lg">AI Formulation Assistant</h3>
                    <p className="text-slate-400 text-xs leading-relaxed font-normal">
                      Before submitting, run our real-time AI paint matcher. It analyzes the vehicle specs and uploaded sticker photo to retrieve the original paint codes, required primer undertones, and coat ratios.
                    </p>
                  </div>

                  {loadingAI && (
                    <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 text-center space-y-4 py-12 animate-pulse">
                      <div className="h-8 w-8 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mx-auto">
                        <Paintbrush className="animate-spin" size={16} />
                      </div>
                      <h4 className="font-extrabold text-white text-xs">Matching Base Pigments</h4>
                      <p className="text-slate-400 text-[10px] max-w-xs mx-auto leading-relaxed">
                        Analyzing metallic tinting and solid basecoat recipes for {formData.year || 'vehicle'} {formData.vehicleBrand || 'make'} {formData.model || 'model'}...
                      </p>
                    </div>
                  )}

                  {!loadingAI && !aiMatch && !aiError && (
                    <div className="bg-slate-900/50 border border-slate-850 rounded-2xl p-6 text-center py-12 text-slate-500 space-y-2">
                      <Car size={24} className="mx-auto text-slate-700" />
                      <h4 className="font-bold text-xs text-neutral-300">Analysis Pending</h4>
                      <p className="text-[10px] max-w-xs mx-auto leading-relaxed">
                        Fill out the Vehicle Make, Model, and Year in the form, then click 'Analyze Color Matching Specs' below.
                      </p>
                    </div>
                  )}

                  {aiError && (
                    <div className="bg-rose-950/20 border border-rose-900/30 rounded-2xl p-6 text-center space-y-2 py-10">
                      <AlertCircle size={24} className="text-rose-500 mx-auto" />
                      <h4 className="font-extrabold text-white text-xs">Analysis Blocked</h4>
                      <p className="text-[10px] text-rose-300 leading-relaxed">
                        {aiError}
                      </p>
                    </div>
                  )}

                  {aiMatch && (
                    <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-3.5 text-xs animate-fadeIn text-left">
                      <h4 className="font-extrabold text-white border-b border-slate-800 pb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-orange-500">
                          <Paintbrush size={14} />
                          <span>OEM Color Specification Sheet</span>
                        </span>
                        <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-bold uppercase">
                          Match: {aiMatch.estimatedMatchDifficulty}
                        </span>
                      </h4>

                      <div className="space-y-1">
                        <span className="text-slate-500 text-[9px] font-bold uppercase block">Verified Color Identity</span>
                        <span className="text-slate-200 font-extrabold block text-sm">{aiMatch.matchingColorName}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="bg-slate-950 p-2 rounded-lg border border-slate-850">
                          <span className="text-slate-500 text-[8px] font-bold uppercase block">OEM Paint Codes</span>
                          <span className="text-white font-bold">{aiMatch.typicalColorCodes}</span>
                        </div>
                        <div className="bg-slate-950 p-2 rounded-lg border border-slate-850">
                          <span className="text-slate-500 text-[8px] font-bold uppercase block">Primer Undertone</span>
                          <span className="text-white font-bold">{aiMatch.primerRecommendation.split(' ')[0] || 'Grey'}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-500 text-[9px] font-bold uppercase block">Refinishing Guide Layers</span>
                        <p className="text-slate-300 bg-slate-950 p-2 rounded-lg border border-slate-850 leading-relaxed text-[10px]">
                          {aiMatch.coatFormulation}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-500 text-[9px] font-bold uppercase block">Pro Coating Tips</span>
                        <ul className="space-y-1.5 text-[10px] text-slate-300 pl-1 list-none">
                          {aiMatch.proTips?.map((tip: string, idx: number) => (
                            <li key={idx} className="flex gap-2 items-start leading-relaxed">
                              <span className="text-orange-500 font-bold shrink-0">0{idx+1}.</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleAIMatchAnalysis}
                    disabled={loadingAI}
                    className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Sparkles size={14} />
                    <span>Analyze Color Matching Specs</span>
                  </button>
                </div>

                {/* General Paint Information Help banner */}
                <div className="bg-white rounded-3xl p-5 border border-neutral-200 space-y-3">
                  <h4 className="font-extrabold text-sm text-neutral-950 flex items-center gap-2">
                    <img src="" className="hidden" alt="" referrerPolicy="no-referrer" />
                    <Info size={16} className="text-orange-500" />
                    <span>How to Find Paint Codes</span>
                  </h4>
                  <p className="text-neutral-500 text-xs leading-relaxed">
                    Manufacturer color codes are typically stamped onto identification plates located:
                  </p>
                  <ul className="text-xs text-neutral-600 space-y-1.5 pl-4 list-disc leading-relaxed">
                    <li>Inside the driver or passenger side door pillar</li>
                    <li>Underneath the front bonnet (engine bay plate)</li>
                    <li>Inside the rear boot compartment near the spare tire bay</li>
                  </ul>
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-[11px] leading-relaxed text-orange-800 flex gap-2">
                    <ShieldAlert size={16} className="text-orange-600 shrink-0 mt-0.5" />
                    <span>If you are unable to find the code, take a high-quality picture of the door pillar and upload it. Our chemists will verify!</span>
                  </div>
                </div>
              </aside>

            </div>
          )}
        </div>
      )}
    </div>
  );
}
