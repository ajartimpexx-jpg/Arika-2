const items = [
  "Handcrafted in Jodhpur",
  "Export Quality Guaranteed",
  "Custom Orders Welcome",
  "Shipped to 20+ Countries",
  "Master Artisans Since Generations",
  "Made with Sheesham, Teak & Mango Wood",
];

const MarqueeContent = () => (
  <div className="flex items-center gap-0 animate-marquee whitespace-nowrap">
    {items.map((item, i) => (
      <span key={i} className="flex items-center">
        <span className="text-primary mx-4">·</span>
        <span className="font-serif text-sm tracking-[0.1em]">{item}</span>
      </span>
    ))}
  </div>
);

const MarqueeStrip = () => (
  <div className="bg-[hsl(0,0%,11%)] text-[hsl(45,30%,85%)] h-12 flex items-center overflow-hidden">
    <div className="flex">
      <MarqueeContent />
      <MarqueeContent />
      <MarqueeContent />
    </div>
  </div>
);

export default MarqueeStrip;
