import { Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Interior Designer, London",
    text: "Arika's pieces transformed our hotel project. The craftsmanship is extraordinary — each piece tells a story that our guests immediately connect with.",
  },
  {
    name: "David Chen",
    role: "Boutique Owner, New York",
    text: "Working with Arika for our store collection was seamless. Export documentation, quality consistency, and beautiful products every time.",
  },
  {
    name: "Marie Laurent",
    role: "Architect, Paris",
    text: "The attention to detail in their wooden furniture is unmatched. I've sourced from many workshops globally, but Jodhpur craftsmanship through Arika is truly special.",
  },
];

const Testimonials = () => {
  const { elementRef: headRef, isVisible: headVisible } = useScrollReveal();

  return (
    <section className="py-[100px] bg-background px-6 md:px-12">
      <div className="container-wide">
        <div
          ref={headRef as any}
          className={`text-center mb-16 reveal reveal-fade-up ${headVisible ? 'reveal-visible' : ''}`}
        >
          <p className="label-caps mb-4">
            Voices
          </p>
          <h2 className="text-display-lg font-serif">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => {
            const { elementRef: testRef, isVisible: testVisible } = useScrollReveal({ delay: i * 120 });
            return (
              <div
                key={t.name}
                ref={testRef as any}
                className={`bg-[#F5F0E8] p-8 md:p-10 flex flex-col gap-4 reveal reveal-fade-up ${testVisible ? 'reveal-visible' : ''}`} // 16px gap for major items, nested 8px
                style={{ boxShadow: "var(--shadow-elegant)" }}
              >
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="text-[#C9A84C] fill-[#C9A84C]"
                    />
                  ))}
                </div>
                <p className="text-[#2C2C2C] leading-relaxed italic text-lg mb-4">
                  "{t.text}"
                </p>
                <div className="flex flex-col gap-1"> {/* 4px gap for meta */}
                  <p className="font-serif text-lg text-[#1C1C1C]">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-[2px] text-[#C9A84C] font-semibold">{t.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
