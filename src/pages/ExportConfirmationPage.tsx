import { useEffect } from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, MessageCircle, FileDown } from "lucide-react";

const ExportConfirmationPage = () => {
  const location = useLocation();
  const state = location.state as { orderRef: string } | null;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!state) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-background min-h-[80vh] flex flex-col items-center justify-center px-6">
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-8 mx-auto">
            <CheckCircle2 size={40} className="text-[#C9A84C]" />
          </div>
          
          <h1 className="font-serif text-4xl md:text-[42px] font-light text-foreground mb-4">
            Export Inquiry Received
          </h1>
          
          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            Thank you for reaching out. Our export team will contact you within 24 hours with a detailed quote and container plan.
          </p>
        </div>

        <div className="w-full max-w-2xl bg-secondary/30 border border-[#C9A84C]/20 p-8 md:p-10 mb-12">
          <div className="text-center mb-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] mb-2 font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>Inquiry Reference</p>
            <p className="font-mono text-2xl font-medium text-foreground tracking-widest">{state.orderRef}</p>
          </div>

          <div className="h-px w-full bg-[#C9A84C]/20 mb-10" />

          {/* Next Steps */}
          <h3 className="text-center font-serif text-2xl mb-8">What Happens Next</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background border border-foreground/10 p-6 text-center">
              <span className="inline-flex w-8 h-8 rounded-full bg-[#C9A84C] text-[#111111] items-center justify-center text-sm font-medium mb-4">1</span>
              <h4 className="text-sm font-medium mb-2 uppercase tracking-[0.05em]" style={{ fontFamily: "'Jost', sans-serif" }}>Review</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">We review your specifications within 24 hours.</p>
            </div>
            <div className="bg-background border border-foreground/10 p-6 text-center relative md:before:absolute md:before:w-8 md:before:h-px md:before:bg-[#C9A84C]/30 md:before:-left-5 md:before:top-10">
              <span className="inline-flex w-8 h-8 rounded-full bg-[#C9A84C] text-[#111111] items-center justify-center text-sm font-medium mb-4">2</span>
              <h4 className="text-sm font-medium mb-2 uppercase tracking-[0.05em]" style={{ fontFamily: "'Jost', sans-serif" }}>Proforma</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">You receive a detailed Proforma Invoice and container plan.</p>
            </div>
            <div className="bg-background border border-foreground/10 p-6 text-center relative md:before:absolute md:before:w-8 md:before:h-px md:before:bg-[#C9A84C]/30 md:before:-left-5 md:before:top-10">
              <span className="inline-flex w-8 h-8 rounded-full bg-[#C9A84C] text-[#111111] items-center justify-center text-sm font-medium mb-4">3</span>
              <h4 className="text-sm font-medium mb-2 uppercase tracking-[0.05em]" style={{ fontFamily: "'Jost', sans-serif" }}>Production</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">Upon confirmation, production begins (Lead 30-45 days).</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl justify-center">
          <button className="w-full sm:w-auto px-8 py-4 border border-foreground/20 text-[11px] uppercase tracking-[0.15em] flex justify-center items-center gap-2 hover:bg-secondary transition-colors" style={{ fontFamily: "'Jost', sans-serif" }}>
            <FileDown size={14} /> Download Your Inquiry Summary
          </button>
          <a href={`https://wa.me/919876543210?text=Hi, I just submitted Export Inquiry ${state.orderRef}.`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white text-[11px] uppercase tracking-[0.15em] flex justify-center items-center gap-2 hover:bg-[#20bd5a] transition-colors" style={{ fontFamily: "'Jost', sans-serif" }}>
            <MessageCircle size={16} /> Chat with our export team
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ExportConfirmationPage;
