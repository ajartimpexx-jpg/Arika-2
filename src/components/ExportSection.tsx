import exportBg from "@/assets/export-bg.jpg";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ExportSection = () => {
  const { elementRef, isVisible } = useScrollReveal();

  return (
    <section id="export" className="relative overflow-hidden">
      <img
        src={exportBg}
        alt="Global furniture export"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.4]"
      />
      <div className="relative z-10 section-padding">
        <div className="container-wide text-center">
          <div
            ref={elementRef as any}
            className={`max-w-2xl mx-auto space-y-6 reveal reveal-fade-up ${isVisible ? 'reveal-visible' : ''}`}
          >
            <p className="text-[12px] uppercase tracking-[4px] text-[#C9A84C] font-semibold">
              Global Reach
            </p>
            <h2 className="text-display-lg font-serif text-[#F5F0E8]">
              Looking for Bulk Orders or Export?
            </h2>
            <p className="text-[#D4CFC7] text-lg leading-[1.9]" style={{ fontWeight: 400 }}>
              We work with global buyers, hotels, and interior designers. 
              Custom manufacturing, containerized shipping, and dedicated 
              export documentation — all from our Jodhpur facility.
            </p>
            <Link to="/export" className="btn-primary bg-[#C9A84C] text-[#111111] hover:bg-[#b08e35] inline-flex mt-4 transition-all">
              Contact for Export
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExportSection;
