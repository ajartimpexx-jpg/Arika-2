import { useScrollReveal } from "@/hooks/useScrollReveal";

const countries = [
  { flag: "🇺🇸", name: "USA" },
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇦🇪", name: "UAE" },
  { flag: "🇫🇷", name: "France" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇸🇬", name: "Singapore" },
  { flag: "🇮🇹", name: "Italy" },
  { flag: "🇳🇱", name: "Netherlands" },
  { flag: "🇯🇵", name: "Japan" },
  { flag: "🇸🇦", name: "Saudi Arabia" },
  { flag: "🇿🇦", name: "South Africa" },
  { flag: "🇸🇪", name: "Sweden" },
];

const CountriesSection = () => {
  const { elementRef: headRef, isVisible: headVisible } = useScrollReveal();
  const { elementRef: listRef, isVisible: listVisible } = useScrollReveal({ delay: 200 });

  return (
    <section className="bg-[#F5F0E8] py-[100px] px-6 md:px-12">
      <div className="container-wide">
        <div
          ref={headRef as any}
          className={`text-center mb-16 reveal reveal-fade-up ${headVisible ? 'reveal-visible' : ''}`}
        >
          <p className="label-caps mb-4">Global Reach</p>
          <h2 className="text-display-lg font-serif">
            Trusted by Buyers in 20+ Countries
          </h2>
        </div>

        <div
          ref={listRef as any}
          className={`flex flex-wrap justify-center gap-[40px] reveal reveal-fade-up ${listVisible ? 'reveal-visible' : ''}`}
        >
          {countries.map((c, i) => (
            <div
              key={c.name}
              className="flex flex-col items-center gap-2 cursor-default group"
            >
              <span className="text-[36px] leading-[1] transition-transform duration-300 group-hover:scale-110">{c.flag}</span>
              <span
                className="text-[10px] uppercase tracking-[3px] text-[#2C2C2C] font-semibold"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountriesSection;
