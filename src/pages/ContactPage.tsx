import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { Mail, Phone, MapPin, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import ArikaLogo from "@/components/ArikaLogo";

const faqs = [
  {
    q: "What is your minimum order quantity for export?",
    a: "For export orders MOQ is typically one container 20ft. However we can accommodate smaller orders via LCL shipping."
  },
  {
    q: "How long does production take?",
    a: "Standard items take 30-45 days. Custom pieces take 45-60 days depending on complexity."
  },
  {
    q: "What wood types do you use?",
    a: "Sheesham Indian Rosewood, Teak, Mango Wood, and Acacia. All sourced from certified sustainable suppliers."
  },
  {
    q: "Do you provide export documentation?",
    a: "Yes. We provide commercial invoice, packing list, certificate of origin, and phytosanitary certificate."
  },
  {
    q: "Can I order custom sizes?",
    a: "Absolutely. All our pieces can be made to your exact specifications."
  },
  {
    q: "Do you have a showroom?",
    a: "Yes our workshop and showroom is in Jodhpur. International buyers are welcome to visit by appointment."
  }
];

const ContactPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <>
      <PageSEO title="Contact Us — Arika Handicrafts" />
      <Navbar />
      
      <main className="min-h-screen pt-20">
        {/* Section 1: Header */}
        <section className="py-[100px] bg-background text-center">
          <div className="container-wide px-6">
            <p className="text-[10px] uppercase tracking-[6px] text-[#C9A84C] font-semibold mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>
              GET IN TOUCH
            </p>
            <h1 className="font-serif text-4xl md:text-[52px] text-[#F5F0E8] mb-6 leading-tight">
              We'd Love to Hear From You
            </h1>
            <p className="text-lg text-[#F5F0E8]/70 font-light max-w-2xl mx-auto" style={{ fontFamily: "'Jost', sans-serif" }}>
              Whether you're an interior designer, a retailer, or a homeowner — reach out and we'll respond within 24 hours.
            </p>
          </div>
        </section>

        {/* Section 2: Contact Methods */}
        <section className="py-[100px] bg-[#F5F0E8] text-[#111111]">
          <div className="container-wide px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* Email */}
              <div className="bg-white p-10 border border-[#C9A84C]/20 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <Mail className="mx-auto mb-6 text-[#C9A84C]" size={40} strokeWidth={1.5} />
                  <h3 className="font-serif text-2xl mb-2">Email Us</h3>
                  <p className="text-[15px] font-medium opacity-80 mb-8" style={{ fontFamily: "'Jost', sans-serif" }}>
                    info@arikahandicrafts.com
                  </p>
                </div>
                <a href="mailto:info@arikahandicrafts.com" className="w-full inline-block border border-[#111111] text-[#111111] px-6 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-[#111111] hover:text-[#F5F0E8] transition-all duration-300">
                  Send Email
                </a>
              </div>
              
              {/* WhatsApp */}
              <div className="bg-white p-10 border border-[#C9A84C]/20 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <Phone className="mx-auto mb-6 text-[#C9A84C]" size={40} strokeWidth={1.5} />
                  <h3 className="font-serif text-2xl mb-2">WhatsApp</h3>
                  <p className="text-[15px] font-medium opacity-80 mb-8" style={{ fontFamily: "'Jost', sans-serif" }}>
                    +91 98765 43210
                  </p>
                </div>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-full inline-block border border-[#C9A84C] bg-[#C9A84C] text-[#111111] px-6 py-4 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#b0923f] transition-all duration-300">
                  Open WhatsApp
                </a>
              </div>

              {/* Visit */}
              <div className="bg-white p-10 border border-[#C9A84C]/20 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <MapPin className="mx-auto mb-6 text-[#C9A84C]" size={40} strokeWidth={1.5} />
                  <h3 className="font-serif text-2xl mb-2">Visit Workshop</h3>
                  <p className="text-[15px] font-medium opacity-80 mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>
                    Industrial Area, Jodhpur, Rajasthan
                  </p>
                  <p className="text-[13px] opacity-60 mb-8" style={{ fontFamily: "'Jost', sans-serif" }}>
                    Mon-Sat 9am to 6pm IST
                  </p>
                </div>
                <button className="w-full inline-block border border-[#111111] text-[#111111] px-6 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-[#111111] hover:text-[#F5F0E8] transition-all duration-300">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Form & Map */}
        <section className="py-[100px] bg-background">
          <div className="container-wide px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Map Left */}
              <div className="h-full min-h-[500px] flex flex-col">
                <div className="flex-1 bg-secondary border border-foreground/10 relative overflow-hidden group mb-8">
                  {/* Map Placeholder */}
                  <div className="absolute inset-0 bg-[#1a1a1a] flex flex-col items-center justify-center p-8 text-center border border-foreground/5">
                     <MapPin size={48} className="text-[#C9A84C] mb-6 opacity-80" />
                     <h3 className="font-serif text-2xl text-[#C9A84C] mb-2">Jodhpur, Rajasthan</h3>
                     <p className="text-sm font-light text-muted-foreground">The Blue City of India</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-[#F5F0E8] mb-4">Arika Handicrafts</h4>
                  <p className="text-[15px] text-muted-foreground font-light leading-relaxed mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>
                    Plot No 123, Heavy Industrial Area,<br/>
                    Basni Phase II, Jodhpur,<br/>
                    Rajasthan 342001, India
                  </p>
                </div>
              </div>

              {/* Form Right */}
              <div>
                <h2 className="font-serif text-3xl md:text-[36px] text-[#F5F0E8] mb-8">Send an Inquiry</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input required type="text" placeholder="Your Name" className="w-full border border-foreground/15 px-4 py-4 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors bg-white/5 text-foreground" />
                    <input required type="email" placeholder="Email Address" className="w-full border border-foreground/15 px-4 py-4 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors bg-white/5 text-foreground" />
                  </div>
                  <input required type="tel" placeholder="WhatsApp / Phone Number" className="w-full border border-foreground/15 px-4 py-4 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors bg-white/5 text-foreground" />
                  
                  <select required className="w-full border border-foreground/15 px-4 py-4 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors bg-background text-foreground appearance-none">
                    <option value="" disabled selected>Select Subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="export">Export / Bulk Order</option>
                    <option value="custom">Custom Order</option>
                    <option value="other">Other</option>
                  </select>

                  <textarea required placeholder="Your Message" rows={6} className="w-full border border-foreground/15 px-4 py-4 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors bg-white/5 text-foreground resize-none"></textarea>
                  
                  <button type="submit" disabled={isSubmitted} className="w-full bg-[#C9A84C] text-[#111111] py-5 text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[#b0923f] transition-all duration-300 flex items-center justify-center gap-2">
                    {isSubmitted ? <><Check size={18} /> Message Sent</> : "Send Message"}
                  </button>
                  <p className="text-center text-xs text-muted-foreground mt-4" style={{ fontFamily: "'Jost', sans-serif" }}>
                    We respond within 24 hours
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: FAQ */}
        <section className="py-[100px] bg-secondary/30 border-t border-foreground/5">
          <div className="container-wide px-6 max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
                QUESTIONS
              </p>
              <h2 className="font-serif text-4xl md:text-[42px] text-[#F5F0E8] leading-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-foreground/10 bg-background overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-secondary/20 transition-colors"
                  >
                    <span className="font-serif text-xl pr-4">{faq.q}</span>
                    <ChevronDown size={20} className={`text-[#C9A84C] transform transition-transform duration-300 shrink-0 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-48 border-t border-foreground/10" : "max-h-0"}`}>
                    <div className="p-6">
                      <p className="text-[15px] font-light text-muted-foreground leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
