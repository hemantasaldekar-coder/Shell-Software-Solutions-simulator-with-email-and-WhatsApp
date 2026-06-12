'use client';

import React, { useState } from 'react';

export default function TallyDiagnosticPlatform() {
  const [branches, setBranches] = useState<number>(1);
  const [manualHours, setManualHours] = useState<number>(2);
  const [teamSize, setTeamSize] = useState<number>(5);

  // Form states
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', company: '', phone: '', email: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const calculateScore = () => {
    let baseScore = 100;
    baseScore -= (branches - 1) * 5;
    baseScore -= manualHours * 6;
    if (teamSize > 10) baseScore -= 10;
    return Math.max(15, Math.min(100, baseScore));
  };

  const score = calculateScore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, branches, manualHours, teamSize, score }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Something went wrong. Please check your configurations.');
      }
    } catch (err) {
      console.error(err);
      alert('Network transmission failed.');
    } finally {
      setLoading(false);
    }
  };

  // Generate WhatsApp link with a professional pre-filled message
  const getWhatsAppLink = () => {
    const yourPhoneNumber = '917039023644'; // 👈 Replace with your actual 10-digit WhatsApp number (keep the 91 prefix for India)
    const message = `Hello Shell Software Solutions, I just completed your Tally Business Efficiency Simulator and scored ${score}/100. I would like to discuss my custom architecture blueprint. Form Details: Name: ${formData.name}, Company: ${formData.company || 'Not Specified'}.`;
    return `https://wa.me/${yourPhoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Top Professional Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 h-28 flex items-center justify-between">
          
          {/* Main Business Branding: Shell Software Solutions */}
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-sm border border-slate-700">
              <span className="text-white font-black text-2xl tracking-wider">S</span>
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 block uppercase">Shell Software Solutions</span>
              <span className="text-xs font-semibold text-slate-500 block tracking-normal -mt-0.5">Simplifying Business Complexity, Instantly.</span>
            </div>
          </div>

          {/* Dual Right Branding Block: Tally Logo + Authorized Partner Status */}
          <div className="flex flex-col items-end space-y-2">
            
            {/* High-Fidelity Tally Prime Logo Placeholder */}
            <img src="/tally-logo.png" alt="Tally Prime Logo" className="h-20 w-auto object-contain" />

            {/* Pulsing Authorized Tally Partner Badge */}
            <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200/60 rounded-md px-3 py-1 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Authorized Tally Partner</span>
            </div>

          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
        
        {/* Core Hook Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl leading-tight">
            Tally Business Efficiency <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Simulator</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Evaluate operational workflows, track process bottlenecks, and eliminate hidden administration overheads instantly.
          </p>
        </div>

        {/* Dashboard Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Panel */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Enterprise Operational Inputs</h2>
              <p className="text-xs text-slate-500 mt-1">Adjust the core metrics below matching your current business infrastructure.</p>
            </div>
            
            {/* Range Item 1 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Multi-Branch Deployment Network</label>
                <span className="text-blue-600 font-bold bg-blue-50 border border-blue-100 px-3 py-0.5 rounded-md text-sm shadow-2xs">{branches} {branches === 1 ? 'Location' : 'Locations'}</span>
              </div>
              <input type="range" min="1" max="10" value={branches} onChange={(e) => setBranches(Number(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <p className="text-[11px] text-slate-400">Total offices, warehouses, or production facilities requiring ledger matching.</p>
            </div>

            {/* Range Item 2 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Manual Voucher Data Entry</label>
                <span className="text-blue-600 font-bold bg-blue-50 border border-blue-100 px-3 py-0.5 rounded-md text-sm shadow-2xs">{manualHours} Hours / Day</span>
              </div>
              <input type="range" min="0" max="10" value={manualHours} onChange={(e) => setManualHours(Number(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <p className="text-[11px] text-slate-400">Estimated cumulative hours spent daily duplicating invoices from CRM or marketplaces into Tally.</p>
            </div>

            {/* Range Item 3 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Active Financial / Administration Staff</label>
                <span className="text-blue-600 font-bold bg-blue-50 border border-blue-100 px-3 py-0.5 rounded-md text-sm shadow-2xs">{teamSize} Personnel</span>
              </div>
              <input type="range" min="1" max="30" value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <p className="text-[11px] text-slate-400">Number of employees requiring concurrently accessible license nodes or localized support access.</p>
            </div>
          </div>

          {/* Right Column: Dynamic Analysis Panels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Audit Status Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs text-center space-y-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Workflow Integrity Score</h3>
              <div className="flex items-baseline justify-center">
                <span className={`text-7xl font-black tracking-tight ${score > 75 ? 'text-emerald-600' : score > 45 ? 'text-amber-500' : 'text-rose-600'}`}>{score}</span>
                <span className="text-xl font-bold text-slate-400 ml-1">/100</span>
              </div>
              
              <p className="text-xs text-slate-600 bg-slate-50 border border-slate-100 p-3 rounded-xl leading-relaxed">
                {score > 75 ? 'Operational parameters are safe. Minor localized automations can further refine pipeline performance.' : score > 45 ? 'Medium risk profile. Redundant clerical processes are causing observable productivity drain.' : 'High structural vulnerability. Manual sync strategies are currently slowing down commercial scaling.'}
              </p>

              <button 
                onClick={() => setShowForm(true)} 
                className="w-full mt-2 bg-slate-900 text-white font-bold text-sm py-3.5 px-4 rounded-xl hover:bg-slate-800 transition active:scale-[0.98] shadow-sm tracking-wide uppercase"
              >
                Request Architectural Consultation
              </button>
            </div>

            {/* Strategic Advisory Box */}
            <div className="bg-slate-900 text-slate-100 p-6 sm:p-8 rounded-2xl shadow-md space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Technical Risk Assessment</h3>
              </div>
              
              <div className="space-y-4">
                {branches > 1 && (
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-400 font-bold mt-0.5 text-sm">✦</span>
                    <p className="text-xs text-slate-300 leading-relaxed"><strong className="text-blue-400">Sync Warning:</strong> Multi-location footprint indicates critical transaction latency. Cloud migration highly advisable.</p>
                  </div>
                )}
                {manualHours > 3 && (
                  <div className="flex items-start space-x-3">
                    <span className="text-emerald-400 font-bold mt-0.5 text-sm">✦</span>
                    <p className="text-xs text-slate-300 leading-relaxed"><strong className="text-emerald-400">Automation Deficit:</strong> High manual input data load ({manualHours}h/day) limits administrative bandwidth. Integration recommended.</p>
                  </div>
                )}
                {teamSize > 10 && (
                  <div className="flex items-start space-x-3">
                    <span className="text-amber-400 font-bold mt-0.5 text-sm">✦</span>
                    <p className="text-xs text-slate-300 leading-relaxed"><strong className="text-amber-400">AMC Liability:</strong> {teamSize} concurrent endpoints require proactive database security mapping and rapid support access frameworks.</p>
                  </div>
                )}
                {branches === 1 && manualHours <= 3 && teamSize <= 10 && (
                  <div className="flex items-start space-x-3">
                    <span className="text-slate-400 font-bold mt-0.5 text-sm">✦</span>
                    <p className="text-xs text-slate-300 leading-relaxed">System architecture metrics within standard thresholds. Scheduled audits will protect current integrity metrics.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Dialog Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-xl relative border border-slate-200">
            <button onClick={() => setShowForm(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition font-medium text-2xl outline-none">&times;</button>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Corporate Architecture Evaluation</h3>
                  <p className="text-xs text-slate-500 mt-1">Submit your profile information to secure an executive architectural brief based on your {score}/100 efficiency baseline.</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Corporate Representative Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full text-sm border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition" placeholder="Representative Full Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Registered Enterprise Entity Name</label>
                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full text-sm border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition" placeholder="Company Legal Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Direct Contact/WhatsApp Communication *</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full text-sm border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition" placeholder="Primary Contact Number" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Official Communications Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full text-sm border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition" placeholder="corporate@company.com" />
                  </div>
                </div>
                
                <button type="submit" disabled={loading} className="w-full mt-2 bg-blue-600 text-white font-bold text-sm py-3.5 px-4 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 tracking-wide uppercase shadow-xs">
                  {loading ? 'Transmitting Architecture Specifications...' : 'Secure Custom Solution Blueprint'}
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-5">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold border border-emerald-100 shadow-2xs">✓</div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Transmission Verified</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Your parameters have been safely compiled and emailed to our engineering group.
                  </p>
                </div>
                
                {/* 🚀 New High-Conversion WhatsApp Direct Action Button */}
                <div className="pt-2">
                  <a 
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm py-3.5 px-4 rounded-xl transition shadow-sm tracking-wide uppercase"
                  >
                    {/* Minimalist SVG WhatsApp Icon */}
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.973 0c3.184.001 6.177 1.24 8.43 3.496 2.254 2.256 3.491 5.253 3.491 8.434 0 6.583-5.337 11.93-11.916 11.93-2.004-.001-3.973-.505-5.724-1.46l-6.2 1.623zm6.572-4.045l.366.218c1.399.831 2.983 1.269 4.613 1.27 5.46 0 9.897-4.436 9.899-9.899.001-2.646-1.03-5.133-2.906-7.01C16.845 2.658 14.359 1.628 11.72 1.628 6.257 1.628 1.821 6.065 1.819 11.529c0 1.68.444 3.321 1.286 4.73l.24.404-1.01 3.69 3.794-.995z"/>
                    </svg>
                    <span>Connect Live via WhatsApp</span>
                  </a>
                  <p className="text-[10px] text-slate-400 mt-2">Skip the wait. Click to launch instant chat validation with our Tally specialists.</p>
                </div>

                <button onClick={() => { setShowForm(false); setSubmitted(false); setFormData({name:'', company:'', phone:'', email:''}); }} className="text-xs text-blue-600 font-bold underline uppercase tracking-wider block mx-auto pt-4">Evaluate New Parameters</button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}