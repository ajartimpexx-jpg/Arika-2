import { X, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useOrder } from "@/context/OrderContext";
import { motion, AnimatePresence } from "framer-motion";

const WishlistSidebar = () => {
  const { wishlist, removeFromWishlist, isWishlistOpen, setIsWishlistOpen, formatPrice } = useOrder();

  const handleClose = () => setIsWishlistOpen(false);

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="w-full sm:w-[500px] h-full bg-[#F5F0E8] shadow-2xl relative flex flex-col pt-safe-top"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#C9A84C]/20 bg-background">
              <h2 className="font-serif text-2xl text-[#F5F0E8]">Your Wishlist</h2>
              <button 
                onClick={handleClose}
                className="p-2 transition-colors hover:bg-white/5 text-[#F5F0E8]"
                aria-label="Close wishlist"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-[#F5F0E8]">
              {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-[#111111]/50 space-y-4">
                  <span className="font-serif text-[120px] mb-4 opacity-10">♡</span>
                  <p className="font-serif text-xl">Your wishlist is empty</p>
                  <p className="text-sm font-light text-center" style={{ fontFamily: "'Jost', sans-serif" }}>
                    Save your favorite pieces here while you browse.
                  </p>
                  <button 
                    onClick={handleClose}
                    className="mt-6 border border-[#111111] text-[#111111] px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#111111] hover:text-[#F5F0E8] transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                wishlist.map((product) => (
                  <div key={product.id} className="flex gap-4 p-4 bg-white border border-[#C9A84C]/10 shadow-sm relative group">
                    <Link to={`/product/${product.slug}`} onClick={handleClose} className="shrink-0 h-28 w-24">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex flex-col flex-1 justify-between">
                      <div>
                        <Link to={`/product/${product.slug}`} onClick={handleClose}>
                          <h3 className="font-serif text-lg text-[#111111] mb-1">{product.name}</h3>
                        </Link>
                        <p className="text-[10px] uppercase tracking-[0.1em] text-[#C9A84C]" style={{ fontFamily: "'Jost', sans-serif" }}>
                          {product.material}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-[16px] text-[#111111]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                          {formatPrice(product.price)}
                        </span>
                        
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="p-2 text-[#111111]/40 hover:text-[#111111] transition-colors bg-secondary/5"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {wishlist.length > 0 && (
              <div className="p-6 bg-background border-t border-[#C9A84C]/20">
                <Link 
                  to="/collection"
                  onClick={handleClose}
                  className="w-full flex items-center justify-center bg-[#C9A84C] text-[#111111] py-5 text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[#b0923f] transition-all duration-300"
                >
                  <ShoppingBag size={16} className="mr-3" />
                  View All Collections
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WishlistSidebar;
