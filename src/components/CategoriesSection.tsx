import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import catFurniture from "@/assets/cat-furniture.jpg";
import catDecor from "@/assets/cat-decor.jpg";
import catLighting from "@/assets/cat-lighting.jpg";
import catMetal from "@/assets/cat-metal.jpg";
import catWooden from "@/assets/cat-wooden.jpg";
import heroFurniture from "@/assets/hero-furniture.jpg";

const categoriesData = [
  { name: "Living Room", slug: "living-room", image: catFurniture }, // dining round table image with chairs
  { name: "Bedroom", slug: "bedroom", image: catWooden }, // wooden boxes/crafts image
  { name: "Dining Room", slug: "dining-room", image: catDecor }, // brass candlesticks/vases image
  { name: "Seating", slug: "seating", image: heroFurniture }, // carved wardrobe/cabinet dark image
  { name: "Bar Furniture", slug: "bar-furniture", image: catMetal }, // candles/metal candleholders dark image
  { name: "Outdoor", slug: "outdoor", image: "/src/assets/product-7.jpg" }, // dining set with chairs warm image
  { name: "Home Decor", slug: "home-decor", image: "/src/assets/product-1.jpg" }, // white vases/candlesticks image
  { name: "Lighting", slug: "lighting", image: catLighting }, // hanging lamp/chandelier image
  { name: "Metal & Iron", slug: "metal-iron", image: catMetal }, // dark candles image
  { name: "Wooden Crafts", slug: "wooden-crafts", image: catWooden }, // carved wooden boxes image
];

const CategoryCard = ({ cat, className, delay, revealType = "reveal-fade-up" }: any) => {
  const { elementRef, isVisible } = useScrollReveal({ delay });

  return (
    <div
      ref={elementRef as any}
      className={`group relative overflow-hidden bg-secondary border border-black/5 reveal ${revealType} ${className} ${isVisible ? 'reveal-visible' : ''}`}
    >
      <Link to={`/collection/${cat.slug}`} className="block h-full w-full">
        <img
          src={cat.image}
          alt={cat.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 group-hover:bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-[20px]">
          <h3 className="font-serif text-[22px] text-white leading-tight">{cat.name}</h3>
          <span className="text-[10px] uppercase tracking-[3px] text-[#C9A84C] font-semibold transition-all duration-300 transform translate-y-1 group-hover:translate-y-0" style={{ fontFamily: "'Jost', sans-serif" }}>
            EXPLORE →
          </span>
        </div>
      </Link>
    </div>
  );
};

const CategoriesSection = () => {
  const { elementRef: headRef, isVisible: headVisible } = useScrollReveal();

  return (
    <section id="categories" className="py-[100px] md:py-[60px] bg-secondary">
      <div className="container-wide px-6">
        <div 
          ref={headRef as any}
          className={`text-center mb-16 reveal reveal-fade-up ${headVisible ? 'reveal-visible' : ''}`}
        >
          <p className="label-caps">Explore</p>
          <h2 className="text-display-lg font-serif">Our Collections</h2>
        </div>

        {/* Row 1 - Hero Asymmetric (500px tall) */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-2 mb-2 lg:h-[500px]">
          <div className="lg:col-span-6 h-[400px] lg:h-full">
            <CategoryCard cat={categoriesData[0]} delay={100} className="h-full" />
          </div>
          <div className="lg:col-span-4 flex flex-col gap-2 h-auto lg:h-full">
            <CategoryCard cat={categoriesData[1]} delay={200} className="h-[246px] flex-1" />
            <CategoryCard cat={categoriesData[2]} delay={300} className="h-[246px] flex-1" />
          </div>
        </div>

        {/* Row 2 - Three Equal Cards (320px tall) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
          <CategoryCard cat={categoriesData[3]} delay={100} className="h-[320px]" />
          <CategoryCard cat={categoriesData[4]} delay={200} className="h-[320px]" />
          <CategoryCard cat={categoriesData[5]} delay={300} className="h-[320px]" />
        </div>

        {/* Row 3 - Four Equal Cards (220px tall) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <CategoryCard cat={categoriesData[6]} delay={100} className="h-[220px]" />
          <CategoryCard cat={categoriesData[7]} delay={200} className="h-[220px]" />
          <CategoryCard cat={categoriesData[8]} delay={300} className="h-[220px]" />
          <CategoryCard cat={categoriesData[9]} delay={400} className="h-[220px]" />
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
