/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Database, RefreshCw, MessageCircle, Check, Clock, AlertCircle, FileText, Image, CheckCircle, Trash2, ArrowRight } from 'lucide-react';

export default function DashboardView() {
  const [paintRequests, setPaintRequests] = useState<any[]>([]);
  const [quoteRequests, setQuoteRequests] = useState<any[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'paint' | 'quote'>('paint');
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const [paintRes, quoteRes] = await Promise.all([
        fetch('/api/requests/paint'),
        fetch('/api/requests/quote')
      ]);

      if (paintRes.ok && quoteRes.ok) {
        const paintData = await paintRes.json();
        const quoteData = await quoteRes.json();
        setPaintRequests(paintData);
        setQuoteRequests(quoteData);
      }
    } catch (err) {
      console.error('Error fetching dashboard requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updatePaintStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/requests/paint/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        // Update local state
        setPaintRequests((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const updateQuoteStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/requests/quote/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setQuoteRequests((prev) =>
          prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getWhatsAppDraftText = (request: any, type: 'paint' | 'quote') => {
    let text = '';
    if (type === 'paint') {
      text = `Hi ${request.customerName}! This is the LubriCoat Formulation Lab. We have reviewed your paint request for the ${request.year} ${request.vehicleBrand} ${request.model}. 
Our chemists have matched your details (${request.paintCode || 'OEM mix'}). 
We can supply a ${request.quantity} of ${request.desiredFinish} ${request.paintType}. Please let us know if you want to proceed with blending!`;
    } else {
      text = `Hi ${request.customerName}! This is LubriCoat Sales. We have processed your quotation request regarding: "${request.vehicleDetails}".
We can provide the requested items with express delivery options. Please let us know if you would like us to send the invoice and secure your delivery slot!`;
    }
    return `https://wa.me/${request.phone.replace(/[^\d+]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <span className="bg-orange-50 text-orange-700 border border-orange-200 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><Clock size={11} /> Pending</span>;
      case 'Reviewing':
        return <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><RefreshCw size={11} className="animate-spin" /> Reviewing</span>;
      case 'Matched':
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><Check size={11} /> Matched</span>;
      case 'Processed':
        return <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><Check size={11} /> Processed</span>;
      case 'Completed':
        return <span className="bg-neutral-100 text-neutral-700 border border-neutral-200 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><CheckCircle size={11} /> Completed</span>;
      default:
        return <span className="bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">{status}</span>;
    }
  };

  return (
    <div id="dashboard-view" className="animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-200 pb-6 mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-950 uppercase tracking-tight flex items-center gap-2">
            <Database size={28} className="text-orange-600" />
            <span>Staff Admin Panel</span>
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            Real-time fulfillment desk. Review and manage paint color formulations and engine oil quotations submitted by website users.
          </p>
        </div>
        <button
          onClick={fetchRequests}
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>{loading ? 'Refreshing...' : 'Refresh Queue'}</span>
        </button>
      </div>

      {/* Sub tabs selector */}
      <div className="flex border-b border-neutral-200 mb-8 gap-2">
        <button
          onClick={() => setActiveSubTab('paint')}
          className={`px-5 py-3.5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'paint'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-neutral-400 hover:text-neutral-900'
          }`}
        >
          <span>Paint Color Requests</span>
          <span className="bg-neutral-100 text-neutral-700 px-2 py-0.5 text-xs rounded-full font-extrabold">
            {paintRequests.length}
          </span>
        </button>
        <button
          onClick={() => setActiveSubTab('quote')}
          className={`px-5 py-3.5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'quote'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-neutral-400 hover:text-neutral-900'
          }`}
        >
          <span>General Quotations</span>
          <span className="bg-neutral-100 text-neutral-700 px-2 py-0.5 text-xs rounded-full font-extrabold">
            {quoteRequests.length}
          </span>
        </button>
      </div>

      {/* Database listings */}
      {activeSubTab === 'paint' ? (
        // Paint Inquiries Table/Cards
        <div className="space-y-6">
          {paintRequests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200 py-16 px-6 text-center text-neutral-500 max-w-xl mx-auto space-y-4 shadow-sm">
              <FileText size={40} className="text-neutral-300 mx-auto" />
              <h3 className="font-extrabold text-neutral-900 text-lg">Paint matching queue is empty</h3>
              <p className="text-sm">
                No custom paint formulation matching inquiries have been logged. Open the Paint Request tab on the client-side to submit an inquiry!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paintRequests.map((req) => (
                <div 
                  key={req.id} 
                  className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-neutral-400 text-[10px] font-mono font-bold block">{req.id}</span>
                        <h4 className="font-extrabold text-neutral-950 text-base">{req.customerName}</h4>
                        <span className="text-neutral-400 text-xs">{req.phone}</span>
                      </div>
                      {getStatusBadge(req.status)}
                    </div>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                      <div>
                        <span className="text-neutral-400 text-[9px] font-bold uppercase block">Vehicle Info</span>
                        <span className="text-neutral-900 font-semibold">{req.year} {req.vehicleBrand} {req.model}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 text-[9px] font-bold uppercase block">Color Identity</span>
                        <span className="text-neutral-900 font-semibold">{req.paintCode || req.colorName || 'Default Mix'}</span>
                      </div>
                      <div className="pt-2">
                        <span className="text-neutral-400 text-[9px] font-bold uppercase block">Coating Finish</span>
                        <span className="text-neutral-900 font-semibold">{req.desiredFinish} Finish</span>
                      </div>
                      <div className="pt-2">
                        <span className="text-neutral-400 text-[9px] font-bold uppercase block">Blend Type</span>
                        <span className="text-neutral-900 font-semibold">{req.paintType}</span>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-neutral-200/50">
                        <span className="text-neutral-400 text-[9px] font-bold uppercase block">Volume Requested</span>
                        <span className="text-neutral-900 font-bold">{req.quantity}</span>
                      </div>
                    </div>

                    {/* Uploaded photo / sticker */}
                    {req.imageUrl && (
                      <div className="space-y-1.5 text-xs text-left">
                        <span className="text-neutral-400 text-[9px] font-bold uppercase block">Uploaded Sticker Attachment</span>
                        <div className="h-32 bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden relative group max-w-xs">
                          <img src={req.imageUrl} alt="Sticker attachment" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-[10px] bg-neutral-950/80 px-2 py-1 rounded font-bold uppercase tracking-wider">Preview Sheet</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {req.notes && (
                      <div className="text-xs bg-orange-50/55 text-orange-950 border border-orange-100 p-2.5 rounded-xl">
                        <span className="font-bold text-orange-900 block text-[9px] uppercase mb-0.5">Notes</span>
                        {req.notes}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-neutral-100 space-y-2">
                    <div className="flex gap-2 text-xs">
                      {req.status === 'Pending' && (
                        <button
                          onClick={() => updatePaintStatus(req.id, 'Reviewing')}
                          className="flex-grow py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                          disabled={updatingId === req.id}
                        >
                          Mark Reviewing
                        </button>
                      )}
                      {req.status === 'Reviewing' && (
                        <button
                          onClick={() => updatePaintStatus(req.id, 'Matched')}
                          className="flex-grow py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors"
                          disabled={updatingId === req.id}
                        >
                          Mark Matched
                        </button>
                      )}
                      {(req.status === 'Matched' || req.status === 'Pending') && (
                        <button
                          onClick={() => updatePaintStatus(req.id, 'Completed')}
                          className="flex-grow py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors"
                          disabled={updatingId === req.id}
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                    <a
                      href={getWhatsAppDraftText(req, 'paint')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 border border-emerald-100"
                    >
                      <MessageCircle size={14} className="fill-emerald-800/10" />
                      <span>Draft reply on WhatsApp</span>
                    </a>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // General Quotation Requests Table/Cards
        <div className="space-y-6">
          {quoteRequests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200 py-16 px-6 text-center text-neutral-500 max-w-xl mx-auto space-y-4 shadow-sm">
              <FileText size={40} className="text-neutral-300 mx-auto" />
              <h3 className="font-extrabold text-neutral-900 text-lg">Quotation queue is empty</h3>
              <p className="text-sm">
                No general quote inquiries have been logged yet. Open the Request Quote tab on the client-side to submit an inquiry!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quoteRequests.map((req) => (
                <div 
                  key={req.id} 
                  className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-neutral-400 text-[10px] font-mono font-bold block">{req.id}</span>
                        <h4 className="font-extrabold text-neutral-950 text-base">{req.customerName}</h4>
                        <span className="text-neutral-400 text-xs">{req.phone}</span>
                      </div>
                      {getStatusBadge(req.status)}
                    </div>

                    {/* Specification Box */}
                    <div className="text-xs space-y-1.5 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                      <span className="text-neutral-400 text-[9px] font-bold uppercase block">Vehicle Details</span>
                      <span className="text-neutral-900 font-semibold">{req.vehicleDetails}</span>
                      <span className="text-neutral-400 text-[9px] font-bold uppercase block pt-1">Inquiry Type</span>
                      <span className="inline-block bg-orange-50 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-100 capitalize">
                        {req.requestType}
                      </span>
                    </div>

                    {/* Message detail */}
                    <div className="text-xs bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                      <span className="text-neutral-400 text-[9px] font-bold uppercase block mb-1">Detailed Message</span>
                      <p className="text-neutral-700 leading-relaxed font-mono whitespace-pre-wrap text-[11px]">{req.detailedMessage}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-neutral-100 space-y-2">
                    <div className="flex gap-2 text-xs">
                      {req.status === 'Pending' && (
                        <button
                          onClick={() => updateQuoteStatus(req.id, 'Processed')}
                          className="flex-grow py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors"
                          disabled={updatingId === req.id}
                        >
                          Mark Processed
                        </button>
                      )}
                      {(req.status === 'Processed' || req.status === 'Pending') && (
                        <button
                          onClick={() => updateQuoteStatus(req.id, 'Completed')}
                          className="flex-grow py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors"
                          disabled={updatingId === req.id}
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                    <a
                      href={getWhatsAppDraftText(req, 'quote')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 border border-emerald-100"
                    >
                      <MessageCircle size={14} className="fill-emerald-800/10" />
                      <span>Draft reply on WhatsApp</span>
                    </a>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
