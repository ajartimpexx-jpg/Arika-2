import artisansImg from "@/assets/artisans-working.jpg";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";



const BrandStory = () => {
  const { elementRef: imageRef, isVisible: imageVisible } = useScrollReveal();
  const { elementRef: textRef, isVisible: textVisible } = useScrollReveal();

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            ref={imageRef as any}
            className={`overflow-hidden reveal reveal-fade-left ${imageVisible ? 'reveal-visible' : ''}`}
          >
            <img
              src={artisansImg}
              alt="Artisans crafting furniture in Jodhpur"
              className="w-full h-[400px] md:h-[550px] object-cover"
            />
          </div>

          <div
            ref={textRef as any}
            className={`space-y-6 reveal reveal-fade-right ${textVisible ? 'reveal-visible' : ''}`}
          >
            <p className="label-caps">Our Craft</p>
            <h2 className="text-display-lg font-serif text-[#1C1C1C]">
              Where Every Piece Tells a Story
            </h2>
            <p className="text-[#2C2C2C] leading-relaxed text-lg" style={{ lineHeight: 1.9 }}>
              Our master artisans in Jodhpur have been perfecting the art of woodcraft
              for generations. Each piece is carved entirely by hand, finished with
              natural polish, and built to last a lifetime — carrying the soul of
              Rajasthan into homes around the world.
            </p>
            <Link to="/about" className="btn-outline inline-flex mt-4">
              Discover Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
