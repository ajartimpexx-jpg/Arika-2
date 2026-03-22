import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/hero-furniture.jpg";
import { useOrder } from "@/context/OrderContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";



const HeroSection = () => {
  const navigate = useNavigate();
  const { setOrderType } = useOrder();

  const handleShopRetail = () => {
    setOrderType("retail");
    navigate("/collection");
  };

  const handleExportInquiry = () => {
    setOrderType("export");
    navigate("/collection");
  };

  const { elementRef: titleRef, isVisible: titleVisible } = useScrollReveal({ delay: 200 });
  const { elementRef: subtitleRef, isVisible: subtitleVisible } = useScrollReveal({ delay: 400 });
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollReveal({ delay: 600 });

  return (
    <section className="relative h-svh w-full overflow-hidden bg-[#111111]">
      <img
        src={heroImg}
        alt="Handcrafted luxury furniture from Jodhpur"
        className="absolute inset-0 h-full w-full object-cover opacity-100 brightness-[0.6]"
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="text-[12px] uppercase tracking-[4px] text-[#C9A84C] font-semibold mb-6">
          Jodhpur, India
        </p>
        <h1
          ref={titleRef as any}
          className={`max-w-4xl font-serif text-[#F5F0E8] text-display-xl reveal reveal-fade-up ${titleVisible ? 'reveal-visible' : ''}`}
        >
          Handcrafted Stories from India
        </h1>
        <p
          ref={subtitleRef as any}
          className={`mt-6 text-[#D4CFC7] max-w-2xl reveal reveal-fade-up ${subtitleVisible ? 'reveal-visible' : ''}`}
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "18px", fontWeight: 400, letterSpacing: "0", lineHeight: 1.9 }}
        >
          Where Every Piece Tells a Story — Handcrafted in Jodhpur, Delivered to the World
        </p>
        
        <div
          ref={ctaRef as any}
          className={`mt-12 flex flex-col sm:flex-row gap-4 justify-center reveal ${ctaVisible ? 'reveal-visible' : ''}`}
        >
          <button
            onClick={handleShopRetail}
            className="px-10 py-5 border border-[#F5F0E8] text-[#F5F0E8] uppercase tracking-[0.2em] text-[12px] transition-all hover:bg-[#F5F0E8] hover:text-[#111111]"
          >
            Shop Retail
          </button>
          <button
            onClick={handleExportInquiry}
            className="px-10 py-5 bg-[#C9A84C] text-[#111111] uppercase tracking-[0.2em] text-[12px] font-medium transition-all hover:bg-[#b08e35]"
          >
            Export Inquiry
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
