import { Shield, Hand, Ruler, Globe } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  {
    icon: Shield,
    title: "Export Quality",
    desc: "Every piece meets rigorous international export standards before leaving our facility.",
  },
  {
    icon: Hand,
    title: "Handcrafted Authenticity",
    desc: "Made by skilled artisans carrying forward generations of Jodhpur craftsmanship.",
  },
  {
    icon: Ruler,
    title: "Custom Orders Welcome",
    desc: "We manufacture to your exact specifications — size, finish, material, and design.",
  },
  {
    icon: Globe,
    title: "Worldwide Shipping",
    desc: "We handle all export documentation, containerized shipping, and delivery logistics.",
  },
];

const WhyChooseUs = () => {
  const { elementRef: headRef, isVisible: headVisible } = useScrollReveal();

  return (
    <section className="py-[100px] bg-[#F5F0E8] px-6 md:px-12">
      <div className="container-wide">
        <div
          ref={headRef as any}
          className={`text-center mb-16 reveal reveal-fade-up ${headVisible ? 'reveal-visible' : ''}`}
        >
          <p className="label-caps mb-4">Promise</p>
          <h2 className="text-display-lg font-serif">
            Why Arika
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const { elementRef: featRef, isVisible: featVisible } = useScrollReveal({ delay: i * 100 });
            return (
              <div
                key={f.title}
                ref={featRef as any}
                className={`text-center flex flex-col items-center gap-2 p-6 reveal reveal-fade-up ${featVisible ? 'reveal-visible' : ''}`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFFFFF] rounded-full mb-2">
                  <f.icon size={28} className="text-[#C9A84C]" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-[#1C1C1C]">{f.title}</h3>
                <p className="text-sm text-[#2C2C2C] leading-relaxed max-w-[240px]">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
