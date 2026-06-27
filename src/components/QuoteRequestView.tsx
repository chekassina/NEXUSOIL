/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FileText, Car, MessageCircle, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function QuoteRequestView() {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    vehicleDetails: '',
    requestType: 'Engine Oil' as 'Engine Oil' | 'Automotive Paint' | 'Both',
    detailedMessage: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.vehicleDetails || !formData.detailedMessage) {
      alert('Please fill out all fields.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/requests/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote inquiry.');
      }

      const data = await response.json();
      setSubmittedId(data.id);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Error submitting inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppLink = () => {
    const text = `Hello LubriCoat! I would like to submit a combined quote inquiry:
Request ID: ${submittedId || 'NEW'}
Customer: ${formData.customerName}
Phone: ${formData.phone}
Vehicle Info: ${formData.vehicleDetails}
Enquiry Category: ${formData.requestType}
Detailed Requirements: ${formData.detailedMessage}
Please provide pricing and delivery availability quotes on WhatsApp.`;
    return `https://wa.me/447911123456?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="quote-request-view" className="animate-fadeIn max-w-4xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Title Header */}
      <div className="text-left border-b border-neutral-200 pb-6 mb-10">
        <h1 className="text-3xl font-extrabold text-neutral-950 uppercase tracking-tight">
          Request A <span className="text-orange-600">Custom Quote</span>
        </h1>
        <p className="text-neutral-500 text-sm mt-1.5 max-w-2xl">
          Get customized commercial pricing, bulk oil discount quotes, or customized complete multi-panel spray refinishing package deals. Fill out our consolidated quotation request form.
        </p>
      </div>

      {success ? (
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-md text-center space-y-6">
          <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
            ✓
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-neutral-950">Quotation Inquiry Queued!</h2>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-md mx-auto">
              Hi <span className="font-bold text-neutral-950">{formData.customerName}</span>, your custom quote request has been saved. For immediate turnaround, press the button below to forward your request to our priority WhatsApp desk.
            </p>
          </div>

          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-150 text-left text-xs max-w-md mx-auto space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-400">Quote Reference:</span>
              <span className="font-mono text-neutral-900 font-bold">{submittedId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Inquiry Type:</span>
              <span className="text-neutral-900 font-bold">{formData.requestType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Vehicle Details:</span>
              <span className="text-neutral-900 font-bold">{formData.vehicleDetails}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 max-w-md mx-auto">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} className="fill-white" />
              <span>Send quote to WhatsApp desk</span>
            </a>
            <button
              onClick={() => {
                setSuccess(false);
                setSubmittedId(null);
                setFormData({
                  customerName: '',
                  phone: '',
                  vehicleDetails: '',
                  requestType: 'Engine Oil',
                  detailedMessage: '',
                });
              }}
              className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold transition-colors"
            >
              Submit another quote request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-sm space-y-6 text-left">
          
          <h3 className="font-extrabold text-lg text-neutral-950 border-b border-neutral-100 pb-3 flex items-center gap-2">
            <FileText size={20} className="text-orange-600" />
            <span>Combined Quotation Form</span>
          </h3>

          {/* Customer info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="block text-neutral-600 font-bold">Your Name *</label>
              <input
                type="text"
                placeholder="e.g. Liam Brodie"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-neutral-600 font-bold">WhatsApp Preferred Phone *</label>
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

          {/* Vehicle Info */}
          <div className="space-y-1.5 text-xs">
            <label className="block text-neutral-600 font-bold flex items-center gap-1.5">
              <Car size={14} className="text-neutral-400" />
              <span>Vehicle Specifications (Make, Model, Year, Engine size) *</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 2017 Audi A5 Coupe 2.0 TDI S-Line"
              value={formData.vehicleDetails}
              onChange={(e) => setFormData({ ...formData, vehicleDetails: e.target.value })}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 focus:ring-1 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>

          {/* Inquiry Category */}
          <div className="space-y-2 text-xs">
            <label className="block text-neutral-600 font-bold">What are you requesting quote for? *</label>
            <div className="grid grid-cols-3 gap-3">
              {(['Engine Oil', 'Automotive Paint', 'Both'] as const).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFormData({ ...formData, requestType: type })}
                  className={`py-3.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1.5 ${
                    formData.requestType === type
                      ? 'bg-orange-600 text-white border-orange-600 shadow'
                      : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  <span className="block">{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1.5 text-xs">
            <label className="block text-neutral-600 font-bold">Detailed Description of Requirements *</label>
            <textarea
              placeholder="List quantities, specific brands or paint quantities needed. e.g. I need 2x 5L Mobil 1 5W-30 oils plus 1.0 Litre aerosol paint canister matched to Ford Frozen White..."
              value={formData.detailedMessage}
              onChange={(e) => setFormData({ ...formData, detailedMessage: e.target.value })}
              rows={5}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 placeholder-neutral-400 focus:ring-1 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>

          {/* Info Banner */}
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 flex gap-3 text-xs leading-relaxed text-neutral-600">
            <ShieldAlert size={18} className="text-orange-600 shrink-0 mt-0.5" />
            <p>
              By submitting this quote request, our system automatically formats the inquiry data. We will forward this to the dispatch coordinators. Confirming your details on WhatsApp ensures we can prioritize your order immediately.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            {submitting ? 'Processing quote request...' : 'Submit Quote Request'}
            <Sparkles size={16} />
          </button>
        </form>
      )}

    </div>
  );
}
