import { useEffect } from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const state = location.state as { orderRef: string; amount: number } | null;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!state) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-background min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-20 h-20 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-8">
          <CheckCircle2 size={40} className="text-[#C9A84C]" />
        </div>
        
        <h1 className="font-serif text-4xl md:text-[42px] font-light text-foreground mb-4">
          Thank You for Your Order
        </h1>
        
        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed mb-8">
          Our team will contact you within 24 hours to confirm and arrange payment via Razorpay link, UPI, or bank transfer.
        </p>

        <div className="bg-secondary p-6 w-full max-w-md border border-foreground/10 mb-10 text-left">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>Order Reference</p>
          <p className="font-mono text-lg font-medium text-foreground tracking-wider mb-4">{state.orderRef}</p>
          
          <div className="h-px w-full bg-foreground/10 my-4" />
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Amount to pay</span>
            <span className="font-mono text-lg font-medium">${state.amount.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
          <Link to="/collection" className="w-full px-8 py-3.5 border border-foreground/20 text-xs uppercase tracking-[0.15em] hover:bg-secondary transition-colors inline-block" style={{ fontFamily: "'Jost', sans-serif" }}>
            Continue Shopping
          </Link>
          <a href={`https://wa.me/919876543210?text=Hi, I just placed order ${state.orderRef}.`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-8 py-3.5 bg-[#25D366] text-white text-xs uppercase tracking-[0.15em] hover:bg-[#20bd5a] transition-colors" style={{ fontFamily: "'Jost', sans-serif" }}>
            <MessageCircle size={16} /> WhatsApp Us
          </a>
        </div>

        <p className="text-xs text-muted-foreground mt-12">
          A confirmation will be sent to your email.
        </p>
      </main>
      <Footer />
    </>
  );
};

export default OrderConfirmationPage;
