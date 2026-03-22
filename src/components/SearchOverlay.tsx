import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useOrder } from "@/context/OrderContext";
import { products, getBestSellers } from "@/data/products";

const POPULAR_SEARCHES = [
  "Sheesham Wood Table",
  "Accent Chair",
  "Mandala Wall Art",
  "Console Table",
  "Iron Wine Rack"
];

const SearchOverlay = () => {
  const { isSearchOpen, setIsSearchOpen, formatPrice } = useOrder();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    if (isSearchOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isSearchOpen, setIsSearchOpen]);

  const handleClose = () => setIsSearchOpen(false);

  const bestSellers = getBestSellers().slice(0, 3);

  const searchResults = query.trim() === "" 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) || 
        p.material.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 results

  const handleProductClick = (slug: string) => {
    handleClose();
    navigate(`/product/${slug}`);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[110] bg-[#111111]/95 backdrop-blur-md overflow-y-auto"
        >
          <div className="container-wide px-6 min-h-screen py-24 flex flex-col relative">
            <button
              onClick={handleClose}
              className="absolute top-8 right-6 md:right-12 p-2 text-[#F5F0E8]/50 hover:text-[#F5F0E8] transition-colors"
              aria-label="Close search"
            >
              <X size={32} strokeWidth={1} />
            </button>

            <div className="w-full max-w-4xl mx-auto mt-10 md:mt-20">
              <div className="relative flex items-center border-b border-[#F5F0E8]/20 pb-4 mb-12">
                <Search size={32} strokeWidth={1.5} className="text-[#C9A84C] mr-6" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for furniture, materials, decor..."
                  className="w-full bg-transparent text-[#F5F0E8] text-2xl md:text-5xl font-serif placeholder:text-[#F5F0E8]/20 focus:outline-none"
                />
              </div>

              {query.trim() === "" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div>
                    <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>
                      POPULAR SEARCHES
                    </h3>
                    <ul className="space-y-4">
                      {POPULAR_SEARCHES.map((term, i) => (
                        <li key={i}>
                          <button 
                            onClick={() => setQuery(term)}
                            className="font-serif text-2xl text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors"
                          >
                            {term}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>
                      FEATURED PRODUCTS
                    </h3>
                    <div className="space-y-6">
                      {bestSellers.map(product => (
                        <div 
                          key={product.id} 
                          className="flex items-center gap-4 group cursor-pointer"
                          onClick={() => handleProductClick(product.slug)}
                        >
                          <div className="w-16 h-16 shrink-0 bg-secondary overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div>
                            <h4 className="font-serif text-lg text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors">{product.name}</h4>
                            <p className="text-[12px] text-[#F5F0E8]/50 mt-1" style={{ fontFamily: "'Jost', sans-serif" }}>
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>
                    SEARCH RESULTS ({searchResults.length})
                  </h3>
                  {searchResults.length > 0 ? (
                    <div className="space-y-2 relative right-4 left-0 -ml-4 pl-4 w-full">
                      {searchResults.map(product => (
                        <div 
                          key={product.id} 
                          className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer group w-full border-b border-white/5 last:border-0"
                          onClick={() => handleProductClick(product.slug)}
                        >
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 shrink-0 bg-secondary overflow-hidden">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h4 className="font-serif text-2xl text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors">{product.name}</h4>
                              <p className="text-[11px] uppercase tracking-wider text-[#F5F0E8]/50 mt-1" style={{ fontFamily: "'Jost', sans-serif" }}>
                                {product.category.replace("-", " ")} · {product.material}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <span className="text-[16px] text-[#F5F0E8]" style={{ fontFamily: "'Jost', sans-serif" }}>
                              {formatPrice(product.price)}
                            </span>
                            <ArrowRight className="text-[#F5F0E8]/30 group-hover:text-[#C9A84C] group-hover:translate-x-2 transition-all" size={20} />
                          </div>
                        </div>
                      ))}
                      <div className="pt-8 text-center">
                        <Link 
                          to="/collection"
                          onClick={handleClose}
                          className="inline-block border border-[#C9A84C] text-[#C9A84C] px-8 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-[#C9A84C] hover:text-[#111111] transition-colors"
                        >
                          View All Products
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <p className="font-serif text-3xl text-[#F5F0E8] mb-4">No results found for "{query}"</p>
                      <p className="text-[15px] text-[#F5F0E8]/50" style={{ fontFamily: "'Jost', sans-serif" }}>
                        Try checking your spelling or using more general terms.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
