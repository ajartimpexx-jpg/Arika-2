import { getBestSellers } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ProductsSection = () => {
  const bestSellers = getBestSellers();
  const { elementRef: headRef, isVisible: headVisible } = useScrollReveal();
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollReveal({ delay: 300 });

  return (
    <section id="products" className="section-padding bg-background">
      <div className="container-wide">
        <div
          ref={headRef as any}
          className={`text-center mb-16 reveal reveal-fade-up ${headVisible ? 'reveal-visible' : ''}`}
        >
          <p className="label-caps">Curated</p>
          <h2 className="text-display-lg font-serif">Best Sellers</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"> {/* 8px gaps */}
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div
          ref={ctaRef as any}
          className={`mt-16 text-center reveal reveal-fade-up ${ctaVisible ? 'reveal-visible' : ''}`}
        >
          <Link
            to="/collection"
            className="btn-outline inline-flex"
            data-testid="link-view-all"
          >
            Explore Full Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
