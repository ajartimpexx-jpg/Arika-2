import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useOrder } from "@/context/OrderContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Trash2, ShieldCheck } from "lucide-react";

const ExportInquiryPage = () => {
  const { inquiryList, updateInquiryQuantity, updateInquiryNotes, removeFromInquiry, clearInquiry } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (inquiryList.length === 0) {
      navigate("/collection");
    }
  }, [inquiryList.length, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderRef = "EXP-" + Math.floor(100000 + Math.random() * 900000);
    clearInquiry();
    // In a real app we'd pass the form data too.
    navigate("/export-confirmation", { state: { orderRef } });
  };

  if (inquiryList.length === 0) return null;

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-background min-h-screen">
        <div className="container-wide px-6 md:px-12">
          <Link to="/collection" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors mb-10" style={{ fontFamily: "'Jost', sans-serif" }}>
            <ArrowLeft size={14} /> Back to Collections
          </Link>

          <header className="mb-12 max-w-3xl">
            <h1 className="font-serif text-4xl md:text-[42px] font-light text-foreground mb-4">Export Inquiry</h1>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Submit your requirements and our export team will respond within 24 hours with a detailed quote, container plan, and shipping timeline.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-16">
            
            {/* Top Section: Company Details */}
            <section className="bg-secondary/30 p-8 md:p-10 border border-[#C9A84C]/20">
              <h2 className="text-xs uppercase tracking-[0.2em] font-medium text-[#C9A84C] mb-8" style={{ fontFamily: "'Jost', sans-serif" }}>1. Company & Contact Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.1em] text-foreground/80">Company / Business Name *</label>
                  <input required type="text" className="w-full bg-background border border-foreground/15 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.1em] text-foreground/80">Your Name *</label>
                  <input required type="text" className="w-full bg-background border border-foreground/15 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.1em] text-foreground/80">Designation (Optional)</label>
                  <input type="text" placeholder="e.g. Owner, Head Buyer, Designer" className="w-full bg-background border border-foreground/15 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.1em] text-foreground/80">Email Address *</label>
                  <input required type="email" className="w-full bg-background border border-foreground/15 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[11px] uppercase tracking-[0.1em] text-foreground/80">WhatsApp Number *</label>
                  <input required type="tel" placeholder="Include country code (e.g. +1...)" className="w-full bg-background border border-foreground/15 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.1em] text-foreground/80">Country *</label>
                  <select required className="w-full bg-background border border-foreground/15 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none">
                    <option value="" disabled selected>Select Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="EU">European Union</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.1em] text-foreground/80">City *</label>
                  <input required type="text" className="w-full bg-background border border-foreground/15 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors" />
                </div>
              </div>
            </section>

            {/* Middle Section: Order Details */}
            <section>
              <h2 className="text-xs uppercase tracking-[0.2em] font-medium text-[#C9A84C] mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>2. Inquiry List</h2>
              
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-foreground/10 text-[10px] uppercase tracking-[0.15em] text-muted-foreground w-full">
                <div className="col-span-4">Product</div>
                <div className="col-span-2">Variants</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-3">Custom Notes</div>
                <div className="col-span-1 text-right">Remove</div>
              </div>

              <div className="space-y-6 md:space-y-0 text-sm">
                {inquiryList.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-center py-6 border-b border-foreground/10 last:border-0 relative">
                    {/* Mobile Only Remove */}
                    <button type="button" onClick={() => removeFromInquiry(item.id)} className="md:hidden absolute top-6 right-0 text-muted-foreground hover:text-foreground">
                      <Trash2 size={16} />
                    </button>

                    <div className="col-span-1 md:col-span-4 flex gap-4">
                      <div className="w-16 h-20 bg-secondary shrink-0 overflow-hidden border border-foreground/5">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center pr-6 md:pr-0">
                        <span className="font-serif text-lg leading-tight">{item.product.name}</span>
                        <span className="text-xs text-muted-foreground mt-1">SKU: {item.product.sku}</span>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 text-[11px] uppercase tracking-[0.1em] text-foreground/70">
                      <p>{item.woodType}</p>
                      <p className="mt-0.5">{item.finish}</p>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <p className="md:hidden text-[10px] uppercase tracking-[0.1em] text-muted-foreground mb-1 mt-2">Quantity (Min 10)</p>
                      <input 
                        type="number" 
                        min="10" 
                        value={item.quantity} 
                        onChange={(e) => updateInquiryQuantity(item.id, Math.max(10, parseInt(e.target.value) || 10))}
                        className="w-24 bg-transparent border border-foreground/15 px-3 py-2 text-center focus:outline-none focus:border-[#C9A84C]"
                      />
                    </div>

                    <div className="col-span-1 md:col-span-3">
                      <p className="md:hidden text-[10px] uppercase tracking-[0.1em] text-muted-foreground mb-1 mt-2">Custom Notes</p>
                      <input 
                        type="text" 
                        value={item.notes || ""}
                        onChange={(e) => updateInquiryNotes(item.id, e.target.value)}
                        placeholder="Size tweaks, packaging, etc."
                        className="w-full bg-transparent border border-foreground/15 px-3 py-2 focus:outline-none focus:border-[#C9A84C] text-[13px]"
                      />
                    </div>

                    <div className="hidden md:flex col-span-1 justify-end">
                      <button type="button" onClick={() => removeFromInquiry(item.id)} className="text-foreground/30 hover:text-foreground transition-colors p-2">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/collection" className="inline-block mt-6 text-xs uppercase tracking-[0.15em] underline text-foreground/60 hover:text-[#C9A84C] transition-colors font-sans">
                + Add more products manually
              </Link>
            </section>

            {/* Bottom Section: Shipping & Requirements */}
            <section className="bg-secondary/30 p-8 md:p-10 border border-[#C9A84C]/20">
              <h2 className="text-xs uppercase tracking-[0.2em] font-medium text-[#C9A84C] mb-8" style={{ fontFamily: "'Jost', sans-serif" }}>3. Shipping & Logistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.1em] text-foreground/80">Preferred Shipping Method *</label>
                  <select required className="w-full bg-background border border-foreground/15 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none">
                    <option value="" disabled selected>Select Method</option>
                    <option value="FCL">Sea Freight (FCL - Full Container)</option>
                    <option value="LCL">Sea Freight (LCL - Less Container Load)</option>
                    <option value="Air">Air Freight</option>
                    <option value="Auto">As recommended by Arika</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.1em] text-foreground/80">Container Type Preference *</label>
                  <select required className="w-full bg-background border border-foreground/15 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none">
                    <option value="" disabled selected>Select Container</option>
                    <option value="20ft">20ft Container (approx. 150-180 pcs)</option>
                    <option value="40ft">40ft HQ Container (approx. 330-380 pcs)</option>
                    <option value="LCL">LCL (Palletized shipments)</option>
                    <option value="Unsure">Not sure, please advise</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.1em] text-foreground/80">Target Delivery Date</label>
                  <input type="date" className="w-full bg-background border border-foreground/15 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors" />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.1em] text-foreground/80">Estimated Budget Range *</label>
                  <select required className="w-full bg-background border border-foreground/15 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none">
                    <option value="" disabled selected>Select Range</option>
                    <option value="<5k">Under $5,000</option>
                    <option value="5k-15k">$5,000 - $15,000</option>
                    <option value="15k-50k">$15,000 - $50,000</option>
                    <option value=">50k">Above $50,000</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[11px] uppercase tracking-[0.1em] text-foreground/80">Special Requirements</label>
                  <textarea 
                    rows={4} 
                    placeholder="Any specific finishing, custom tag/label packaging, documentation (like CE, FSC certification, Fumigation), or custom requirements"
                    className="w-full bg-background border border-foreground/15 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors resize-none" 
                  />
                </div>

                <div className="space-y-2 md:col-span-2 mt-2">
                  <label className="text-[11px] uppercase tracking-[0.1em] text-foreground/80">How did you hear about us? *</label>
                  <select required className="w-full bg-background border border-foreground/15 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none">
                    <option value="" disabled selected>Select Source</option>
                    <option value="Google">Google Search</option>
                    <option value="Instagram">Instagram / Facebook</option>
                    <option value="WhatsApp">WhatsApp Message</option>
                    <option value="TradeFair">Trade Fair / Exhibition</option>
                    <option value="Referral">Referral</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

              </div>
            </section>

            <div className="text-center md:max-w-lg mx-auto">
              <button 
                type="submit" 
                className="w-full h-14 bg-[#C9A84C] text-[#111111] uppercase tracking-[0.2em] text-[13px] font-medium transition-colors hover:bg-[#b08e35]"
              >
                Send Export Inquiry
              </button>
              <div className="flex flex-col items-center justify-center mt-6 gap-3">
                <div className="flex items-center gap-2 text-xs text-foreground/60" style={{ fontFamily: "'Jost', sans-serif" }}>
                  <ShieldCheck size={16} className="text-[#C9A84C]" />
                  Your information is strictly confidential
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed max-w-sm">
                  Our export team reviews all inquiries within 24 hours. You will receive a detailed proforma invoice, container loading plan, and shipping timeline.
                </p>
              </div>
            </div>

          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ExportInquiryPage;
