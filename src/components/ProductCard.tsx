import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import ArikaLogo from "@/components/ArikaLogo";
import { useOrder } from "@/context/OrderContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { orderType, formatPrice, isWishlisted, addToWishlist, removeFromWishlist } = useOrder();
  const { elementRef, isVisible } = useScrollReveal({ delay: index * 50 });
  
  const isSaved = isWishlisted(product.id);

  return (
    <div
      ref={elementRef as any}
      className={`group relative flex flex-col space-y-4 cursor-pointer reveal reveal-fade-up ${isVisible ? 'reveal-visible' : ''}`}
    >
      <Link to={`/product/${product.slug}`} className="flex flex-col space-y-4">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-[#111111] opacity-0 group-hover:opacity-25 transition-all duration-500" />
          <div className="absolute bottom-3 right-3 pointer-events-none">
            <ArikaLogo variant="icon" size="sm" color="light" />
          </div>
          {product.bestSeller && (
            <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-foreground text-background text-[9px] uppercase tracking-[0.15em]">
              Best Seller
            </span>
          )}
          
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              isSaved ? removeFromWishlist(product.id) : addToWishlist(product);
            }}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
            aria-label="Toggle Wishlist"
          >
            <Heart 
              size={16} 
              className={isSaved ? "fill-[#C9A84C] text-[#C9A84C]" : "text-[#F5F0E8]"} 
            />
          </button>
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          >
            <span className="bg-transparent border border-[#F5F0E8] text-[#F5F0E8] px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] backdrop-blur-sm">
              View Details
            </span>
          </div>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-serif text-xl text-[#1C1C1C]">{product.name}</h3>
            <span className="inline-block mt-1.5 px-3 py-0.5 text-[10px] uppercase tracking-[0.12em] bg-secondary text-[#2C2C2C] rounded-full">
              {product.material}
            </span>
          </div>
          <div className="text-right shrink-0 ml-2">
            <span className="text-[16px] text-[#111111] block" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
              {formatPrice(product.price)}
            </span>
            <p className="text-[11px] italic text-[#C9A84C] mt-1" style={{ fontFamily: "'Jost', sans-serif" }}>Custom sizes available</p>
            {orderType === "export" && (
              <p className="text-[10px] uppercase text-[#4A4A4A] tracking-[0.05em] mt-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>MOQ: 10 units</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
