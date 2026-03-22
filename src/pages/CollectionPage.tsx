import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Grid3X3, List, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ProductCard from "@/components/ProductCard";
import {
  ROOM_TABS,
  ROOM_SUBCATEGORIES,
  getProductsByRoom,
  products as allProducts,
  type RoomSlug,
  type Product,
} from "@/data/products";

const ITEMS_PER_PAGE = 9;
type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

const sortProducts = (prods: Product[], sort: SortOption): Product[] => {
  const arr = [...prods];
  switch (sort) {
    case "price-asc": return arr.sort((a, b) => parseFloat(a.price.replace(",", "")) - parseFloat(b.price.replace(",", "")));
    case "price-desc": return arr.sort((a, b) => parseFloat(b.price.replace(",", "")) - parseFloat(a.price.replace(",", "")));
    case "newest": return arr.filter((p) => p.bestSeller).concat(arr.filter((p) => !p.bestSeller));
    default: return arr;
  }
};

const FilterTab = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`shrink-0 transition-all duration-200 border ${
      active
        ? "bg-foreground text-background border-foreground"
        : "bg-transparent text-foreground/60 border-foreground/30 hover:border-foreground/80 hover:text-foreground"
    }`}
    style={{ padding: "10px 16px", fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
  >
    {label}
  </button>
);

const useScrollWheel = (ref: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [ref]);
};

import OrderTypeToggle from "@/components/OrderTypeToggle";

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeRoom, setActiveRoom] = useState<RoomSlug>((slug as RoomSlug) || "all");
  const [activeSubcat, setActiveSubcat] = useState("All");
  const [sort, setSort] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [sortOpen, setSortOpen] = useState(false);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const subcatBarRef = useRef<HTMLDivElement>(null);

  useScrollWheel(tabBarRef);
  useScrollWheel(subcatBarRef);

  useEffect(() => {
    const room = (slug as RoomSlug) || "all";
    setActiveRoom(room);
    setActiveSubcat("All");
    setVisibleCount(ITEMS_PER_PAGE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const subcats = ROOM_SUBCATEGORIES[activeRoom] || [];

  const baseProducts = useMemo(() => {
    let prods = getProductsByRoom(activeRoom);
    if (activeSubcat !== "All" && activeSubcat !== "") {
      prods = prods.filter((p) => p.subcategory === activeSubcat);
    }
    return prods;
  }, [activeRoom, activeSubcat]);

  const displayProducts = useMemo(() => sortProducts(baseProducts, sort), [baseProducts, sort]);
  const visibleProducts = displayProducts.slice(0, visibleCount);
  const hasMore = visibleCount < displayProducts.length;

  const handleRoomChange = (room: RoomSlug) => {
    setActiveRoom(room);
    setActiveSubcat("All");
    setVisibleCount(ITEMS_PER_PAGE);
    if (room === "all") navigate("/collection");
    else navigate(`/collection/${room}`);
  };

  const sortLabels: Record<SortOption, string> = {
    featured: "Featured", "price-asc": "Price: Low to High", "price-desc": "Price: High to Low", newest: "Newest First",
  };

  const roomLabel = ROOM_TABS.find((r) => r.value === activeRoom)?.label || "All Collections";

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 bg-foreground overflow-hidden">
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative z-10 container-wide px-6 md:px-12 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-[#F5F0E8]/50 hover:text-[#F5F0E8] text-xs uppercase tracking-[0.15em] transition-colors mb-8">
            <ArrowLeft size={12} />
            Back to Home
          </Link>
          <p className="text-xs uppercase tracking-[0.2em] text-[#C9A84C] mb-4">Our Collections</p>
          <h1 className="font-serif font-light text-[#F5F0E8] text-display-xl">{roomLabel}</h1>
          <p className="mt-4 text-[#F5F0E8]/50 text-sm">{displayProducts.length} pieces</p>
        </div>
      </section>

      {/* Order Type Toggle */}
      <OrderTypeToggle />

      {/* Sticky filter bar */}
      <div className="sticky top-[64px] z-30 bg-background border-b border-foreground/8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        {/* Level 1 — Room tabs */}
        <div className="relative">
          <div
            ref={tabBarRef}
            className="flex overflow-x-auto no-scrollbar px-6 md:px-12 py-3 gap-2"
            style={{ scrollbarWidth: "none" }}
          >
            {ROOM_TABS.map((tab) => (
              <FilterTab
                key={tab.value}
                label={tab.label}
                active={activeRoom === tab.value}
                onClick={() => handleRoomChange(tab.value)}
              />
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none" style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none" style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />
        </div>

        {/* Level 2 — Subcategories */}
        <AnimatePresence>
          {subcats.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-foreground/5"
            >
              <div className="relative">
                <div
                  ref={subcatBarRef}
                  className="flex overflow-x-auto no-scrollbar px-6 md:px-12 py-2.5 gap-2"
                >
                  {subcats.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => { setActiveSubcat(sub); setVisibleCount(ITEMS_PER_PAGE); }}
                      className={`shrink-0 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] transition-all duration-200 rounded-full border ${
                        activeSubcat === sub
                          ? "bg-foreground text-background border-foreground"
                          : "bg-transparent text-foreground/55 border-foreground/20 hover:border-foreground/60 hover:text-foreground"
                      }`}
                      style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
                <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none" style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
                <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none" style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <section className="px-6 md:px-12 py-12 md:py-16 bg-background min-h-[60vh]">
        <div className="container-wide">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-10">
            <p className="text-xs text-muted-foreground uppercase tracking-[0.12em]">
              {displayProducts.length} {displayProducts.length === 1 ? "piece" : "pieces"}
            </p>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-1">
                <button onClick={() => setViewMode("grid")} className={`p-2 transition-colors ${viewMode === "grid" ? "text-foreground" : "text-foreground/30 hover:text-foreground/70"}`}><Grid3X3 size={16} /></button>
                <button onClick={() => setViewMode("list")} className={`p-2 transition-colors ${viewMode === "list" ? "text-foreground" : "text-foreground/30 hover:text-foreground/70"}`}><List size={16} /></button>
              </div>
              <div className="relative">
                <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-foreground/70 hover:text-foreground transition-colors">
                  {sortLabels[sort]}
                  <ChevronDown size={12} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-2 bg-background border border-foreground/10 py-2 z-20 min-w-[180px] shadow-[var(--shadow-elegant)]"
                    >
                      {(Object.entries(sortLabels) as [SortOption, string][]).map(([key, label]) => (
                        <button key={key} onClick={() => { setSort(key); setSortOpen(false); }}
                          className={`block w-full px-5 py-2.5 text-left text-xs uppercase tracking-[0.1em] transition-colors ${sort === key ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>
                          {label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Products */}
          {displayProducts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-muted-foreground text-sm">No pieces found in this category.</p>
              <button onClick={() => { setActiveRoom("all"); navigate("/collection"); }} className="mt-6 text-xs uppercase tracking-[0.15em] underline text-foreground/60 hover:text-foreground">
                View All
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {visibleProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {visibleProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="group flex gap-6 border-b border-foreground/8 pb-6 cursor-pointer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                >
                  <Link to={`/product/${product.slug}`} className="flex gap-6 w-full">
                    <div className="relative w-40 h-40 md:w-52 md:h-52 shrink-0 overflow-hidden bg-secondary">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center space-y-2">
                      <h3 className="font-serif text-xl text-foreground">{product.name}</h3>
                      <span className="inline-block w-fit px-3 py-0.5 text-[10px] uppercase tracking-[0.12em] bg-secondary text-muted-foreground rounded-full">{product.material}</span>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{product.description}</p>
                      <span className="font-sans text-sm text-foreground font-medium">${product.price}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {hasMore && (
            <div className="mt-16 text-center">
              <button onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)} className="px-10 py-3.5 border border-foreground/25 text-xs uppercase tracking-[0.15em] text-foreground/70 hover:bg-foreground hover:text-background transition-all duration-300" style={{ fontFamily: "'Jost', sans-serif" }}>
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </>
  );
};

export default CollectionPage;
