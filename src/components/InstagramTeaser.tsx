import { Camera, Instagram } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const InstagramTeaser = () => {
  const { elementRef: headRef, isVisible: headVisible } = useScrollReveal();
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollReveal({ delay: 200 });

  return (
    <section className="py-[100px] bg-background px-6 md:px-12">
      <div className="container-wide">
        <div
          ref={headRef as any}
          className={`text-center mb-16 reveal reveal-fade-up ${headVisible ? 'reveal-visible' : ''}`}
        >
          <h2 className="text-display-lg font-serif mb-4">
            Follow Our Journey
          </h2>
          <p className="text-[#2C2C2C] text-lg max-w-xl mx-auto">
            @arikahandicrafts — Behind the scenes, new arrivals, and the art of Jodhpur
          </p>
        </div>

        <div
          ref={gridRef as any}
          className={`grid grid-cols-2 md:grid-cols-3 gap-2 mb-12 reveal reveal-fade-up ${gridVisible ? 'reveal-visible' : ''}`}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-[#F5F0E8] flex items-center justify-center group hover:bg-[#EAE4D9] transition-all cursor-pointer"
            >
              <Camera size={28} className="text-[#C9A84C] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://www.instagram.com/arikahandicrafts"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex gap-2"
          >
            <Instagram size={16} />
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramTeaser;
