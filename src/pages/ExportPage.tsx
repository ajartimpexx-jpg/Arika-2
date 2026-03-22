import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { Link } from "react-router-dom";
import { ShieldCheck, Package, Ship, FileText, BadgeCheck, Phone } from "lucide-react";

const ExportPage = () => {
  return (
    <>
      <PageSEO title="Export Furniture from India — Arika Handicrafts" />
      <Navbar />
      
      <main className="min-h-screen pt-20">
        {/* Section 1: Hero */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1578575437130-5b128f731ad1?q=80&w=2000&auto=format&fit=crop" 
              alt="Container Shipping Port" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          
          <div className="container-wide relative z-10 text-center px-4 mt-12">
            <p className="text-[10px] uppercase tracking-[6px] text-[#C9A84C] font-semibold mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>
              GLOBAL EXPORT
            </p>
            <h1 className="font-serif text-5xl md:text-[64px] text-[#F5F0E8] mb-6 leading-tight">
              From Our Workshop<br />to Your World
            </h1>
            <p className="text-lg md:text-[18px] text-[#F5F0E8]/70 font-light max-w-xl mx-auto mb-10" style={{ fontFamily: "'Jost', sans-serif" }}>
              We manufacture, pack, document, and ship — you just receive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/export-inquiry"
                className="bg-[#C9A84C] text-[#111111] px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#b0923f] transition-colors"
              >
                Start Export Inquiry
              </Link>
              <button className="border border-[#F5F0E8] text-[#F5F0E8] px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-white/10 transition-colors">
                Download Catalogue
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Why Export with Arika */}
        <section className="py-[100px] bg-[#F5F0E8] text-[#111111]">
          <div className="container-wide px-6 md:px-12">
            <div className="text-center mb-16">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
                THE ADVANTAGE
              </p>
              <h2 className="font-serif text-4xl md:text-[42px] leading-tight max-w-2xl mx-auto">
                Why Buyers Choose Arika for Export
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { 
                  icon: <Package className="mb-4 text-[#C9A84C]" size={32} strokeWidth={1.5} />,
                  title: "Factory Direct Pricing", 
                  desc: "No middlemen. You buy directly from our Jodhpur workshop at manufacturer prices." 
                },
                { 
                  icon: <ShieldCheck className="mb-4 text-[#C9A84C]" size={32} strokeWidth={1.5} />,
                  title: "Custom Manufacturing", 
                  desc: "Every piece made to your specifications — dimensions, finish, wood type, hardware." 
                },
                { 
                  icon: <FileText className="mb-4 text-[#C9A84C]" size={32} strokeWidth={1.5} />,
                  title: "Full Export Documentation", 
                  desc: "We handle all paperwork — commercial invoice, packing list, certificate of origin, phytosanitary certificate." 
                },
                { 
                  icon: <Ship className="mb-4 text-[#C9A84C]" size={32} strokeWidth={1.5} />,
                  title: "Container Loading Expert", 
                  desc: "We optimise container loading to maximise pieces per container and minimise shipping cost." 
                },
                { 
                  icon: <BadgeCheck className="mb-4 text-[#C9A84C]" size={32} strokeWidth={1.5} />,
                  title: "Quality Guarantee", 
                  desc: "Every piece inspected before loading. Photo and video documentation provided before shipment." 
                },
                { 
                  icon: <Phone className="mb-4 text-[#C9A84C]" size={32} strokeWidth={1.5} />,
                  title: "Dedicated Export Manager", 
                  desc: "A single point of contact for your entire order from inquiry to delivery." 
                }
              ].map((feature, i) => (
                <div key={i} className="pt-8 border-t border-[#C9A84C] bg-white/50 p-8">
                  {feature.icon}
                  <h3 className="font-serif text-2xl mb-4">{feature.title}</h3>
                  <p className="text-[15px] font-light leading-relaxed opacity-80" style={{ fontFamily: "'Jost', sans-serif" }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: How it Works */}
        <section className="py-[100px] bg-background">
          <div className="container-wide px-6 md:px-12 text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
              THE PROCESS
            </p>
            <h2 className="font-serif text-4xl md:text-[42px] text-[#F5F0E8] mb-20 leading-tight">
              Your Export Journey with Arika
            </h2>

            <div className="relative">
              {/* Connecting line for desktop */}
              <div className="hidden lg:block absolute top-[24px] left-[10%] right-[10%] h-[1px] bg-[#C9A84C]/30" />
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {[
                  { step: "1", title: "Submit Inquiry", desc: "Fill our export inquiry form with your product requirements and destination." },
                  { step: "2", title: "Receive Proforma", desc: "We send detailed PI with prices, lead times, and container plan within 24 hours." },
                  { step: "3", title: "Confirm Deposit", desc: "Confirm your order and pay 30% advance to begin production." },
                  { step: "4", title: "Production & QC", desc: "We manufacture your pieces with regular updates. Full QC before packing." },
                  { step: "5", title: "Ship & Deliver", desc: "We load, document, and ship. You receive tracking and export documents." },
                ].map((item, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-[#C9A84C] bg-background text-[#C9A84C] flex items-center justify-center font-serif text-xl mb-6 shadow-lg shadow-black">
                      {item.step}
                    </div>
                    <h3 className="font-serif text-[20px] text-[#F5F0E8] mb-3">{item.title}</h3>
                    <p className="text-[13px] text-[#F5F0E8]/65 font-light" style={{ fontFamily: "'Jost', sans-serif" }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Container Guide */}
        <section className="py-[100px] bg-[#F5F0E8] text-[#111111]">
          <div className="container-wide px-6 md:px-12">
            <h2 className="font-serif text-4xl md:text-[42px] mb-16 text-center">
              Container Guide
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white p-10 border border-[#C9A84C]/20 shadow-sm text-center">
                <Ship className="mx-auto mb-6 text-[#111111]" size={48} strokeWidth={1} />
                <h3 className="font-serif text-3xl mb-4">20ft Container</h3>
                <div className="w-12 h-[1px] bg-[#C9A84C] mx-auto mb-6" />
                <p className="text-[15px] leading-relaxed opacity-80" style={{ fontFamily: "'Jost', sans-serif" }}>
                  <strong>25-30 cubic meters.</strong><br/>
                  Holds approximately 150-200 mixed furniture pieces.<br/>
                  Ideal for smaller boutique orders or first-time container buyers.
                </p>
              </div>
              <div className="bg-white p-10 border border-[#C9A84C]/20 shadow-sm text-center relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-[#C9A84C] text-[#111111] text-[10px] uppercase tracking-widest px-3 py-1 font-semibold">
                  Best Value
                </div>
                <Ship className="mx-auto mb-6 text-[#111111]" size={48} strokeWidth={1} />
                <h3 className="font-serif text-3xl mb-4">40ft Container</h3>
                <div className="w-12 h-[1px] bg-[#C9A84C] mx-auto mb-6" />
                <p className="text-[15px] leading-relaxed opacity-80" style={{ fontFamily: "'Jost', sans-serif" }}>
                  <strong>55-60 cubic meters.</strong><br/>
                  Holds approximately 350-450 mixed furniture pieces.<br/>
                  Offers the best shipping cost value per item for large volume orders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Markets */}
        <section className="py-[100px] bg-secondary border-y border-foreground/5">
          <div className="container-wide px-6 md:px-12 text-center">
            <h2 className="font-serif text-4xl md:text-[42px] text-[#F5F0E8] mb-12">
              Markets We Serve
            </h2>
            
            <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto mb-10">
              {[
                "USA", "UK", "UAE", "France", "Germany", "Australia", "Canada", 
                "Singapore", "Italy", "Netherlands", "Japan", "Saudi Arabia", "South Africa", "Sweden"
              ].map(country => (
                <span key={country} className="px-5 py-3 border border-foreground/10 text-sm font-light text-[#F5F0E8]/80 bg-background/50" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {country}
                </span>
              ))}
            </div>
            
            <p className="italic text-[#C9A84C] font-light" style={{ fontFamily: "'Jost', sans-serif" }}>
              Don't see your country? We ship everywhere. <Link to="/contact" className="underline hover:text-white transition-colors">Contact us.</Link>
            </p>
          </div>
        </section>

        {/* Section 6: Testimonials (Using existing Testimonials component layout style but static) */}
        <section className="py-[100px] bg-background">
           <div className="container-wide px-6 md:px-12 text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
              CLIENT STORIES
            </p>
            <h2 className="font-serif text-4xl md:text-[42px] text-[#F5F0E8] mb-16 leading-tight">
              Trusted by Exporters Globally
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { quote: "Arika's finishing quality is exceptional. We've ordered 4 containers this year and every piece arrives flawlessly packed. Our interior clients in Dubai love the aesthetic.", author: "Hassan Al-Fayed", company: "Dubai Luxury Interiors" },
                { quote: "Finding a reliable manufacturer in Jodhpur was critical. Arika provides transparent communication, honors their lead times, and their quality control is unmatched in Rajasthan.", author: "Sarah Jenkins", company: "London Home Curators" },
                { quote: "The ability to customize wood finishes and dimensions for our boutique hotel project was a game changer. The container loading was expert — zero damages on arrival.", author: "Michael Chen", company: "Sydney Hospitality Group" }
              ].map((t, i) => (
                <div key={i} className="bg-secondary/30 p-8 border border-foreground/5 rounded-sm">
                  <div className="text-[#C9A84C] mb-6">★★★★★</div>
                  <p className="text-[15px] font-light text-[#F5F0E8]/80 leading-relaxed mb-8" style={{ fontFamily: "'Jost', sans-serif" }}>
                    "{t.quote}"
                  </p>
                  <div>
                    <h4 className="font-serif text-lg text-[#F5F0E8]">{t.author}</h4>
                    <p className="text-[11px] uppercase tracking-wider text-[#C9A84C] opacity-70 mt-1">{t.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Export CTA */}
        <section className="py-[120px] bg-secondary/20 text-center border-t border-foreground/5">
          <div className="container-wide px-6">
            <h2 className="font-serif text-4xl md:text-[48px] text-[#F5F0E8] mb-6">
              Ready to Place Your First Export Order?
            </h2>
            <p className="text-[16px] text-[#F5F0E8]/65 font-light mb-10 max-w-xl mx-auto" style={{ fontFamily: "'Jost', sans-serif" }}>
              Minimum order: 1 container. Lead time: 45-60 days. We handle everything else.
            </p>
            <div className="flex flex-col items-center justify-center gap-6">
              <Link 
                to="/export-inquiry"
                className="bg-[#C9A84C] text-[#111111] px-10 py-5 text-[12px] uppercase tracking-[0.2em] hover:bg-[#b0923f] transition-colors font-medium border border-[#C9A84C]"
              >
                Start Your Export Inquiry
              </Link>
              <p className="text-[#C9A84C] text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
                Or <a href="https://wa.me/919876543210" className="underline hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">WhatsApp our export team directly</a>
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default ExportPage;
