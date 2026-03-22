import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Minus, Plus, MessageCircle, ChevronDown, ShieldCheck, Package, Ruler } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ProductCard from "@/components/ProductCard";
import ArikaLogo from "@/components/ArikaLogo";
import { getProductBySlug, getSimilarProducts, products as allProducts, type Product } from "@/data/products";
import OrderTypeToggle from "@/components/OrderTypeToggle";
import { useOrder } from "@/context/OrderContext";
import { useInquiryModal } from "@/components/InquiryModal";

const WOOD_TYPES = ["Sheesham Wood", "Teak Wood", "Mango Wood", "Rosewood"];
const FINISHES = ["Natural", "Walnut", "Ebony", "Antique"];
const SIZES = ["Small", "Medium", "Large", "Custom"];
const COLORS = ["#8B5E3C", "#5C3A1E", "#2C1A0E", "#A07850"];

const REVIEWS = [
  { name: "Sarah M.", location: "London, UK", rating: 5, date: "Feb 2025", text: "Absolutely stunning piece. The craftsmanship is extraordinary — you can feel the quality the moment you touch it. Arrived perfectly packaged. Will definitely order again." },
  { name: "Rajan P.", location: "Toronto, Canada", rating: 5, date: "Jan 2025", text: "We ordered a custom size and Arika accommodated it perfectly. Communication was excellent and the delivery was faster than expected. Our dining room looks transformed." },
  { name: "Ingrid H.", location: "Stockholm, Sweden", rating: 5, date: "Dec 2024", text: "This is the third piece I've ordered from Arika Handicrafts. The consistency of quality is remarkable. Each piece is truly handmade and unique." },
];

const AccordionItem = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-foreground/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
        data-testid={`accordion-${title.toLowerCase().replace(/\s/g, "-")}`}
      >
        <span className="text-xs uppercase tracking-[0.15em] text-foreground" style={{ fontFamily: "'Jost', sans-serif" }}>{title}</span>
        <ChevronDown size={14} className={`text-foreground/50 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm text-muted-foreground leading-[1.8]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RECENTLY_VIEWED_KEY = "arika_recently_viewed";

const getRecentlyViewed = (): string[] => {
  try { return JSON.parse(sessionStorage.getItem(RECENTLY_VIEWED_KEY) || "[]"); }
  catch { return []; }
};

const addRecentlyViewed = (slug: string) => {
  const prev = getRecentlyViewed().filter((s) => s !== slug);
  sessionStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify([slug, ...prev].slice(0, 5)));
};

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = slug ? getProductBySlug(slug) : undefined;
  
  const { orderType, formatPrice, addToCart, addToInquiry } = useOrder();
  const { openModal } = useInquiryModal();

  const [mainImage, setMainImage] = useState(0);
  const [woodType, setWoodType] = useState(WOOD_TYPES[0]);
  const [finish, setFinish] = useState(FINISHES[0]);
  const [size, setSize] = useState(SIZES[1]);
  const [colorIdx, setColorIdx] = useState(0);
  const [customDims, setCustomDims] = useState("");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews" | "shipping">("description");
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    if (orderType === "export" && qty < 10) {
      setQty(10);
    }
  }, [orderType, qty]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setMainImage(0);
    setWoodType(WOOD_TYPES[0]);
    setFinish(FINISHES[0]);
    setColorIdx(0);
    if (slug) {
      addRecentlyViewed(slug);
      const slugs = getRecentlyViewed().filter((s) => s !== slug);
      setRecentlyViewed(slugs.map((s) => allProducts.find((p) => p.slug === s)!).filter(Boolean).slice(0, 3));
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-muted-foreground">Product not found.</p>
        <button onClick={() => navigate("/collection")} className="text-xs uppercase tracking-[0.15em] underline">Browse Collections</button>
      </div>
    );
  }

  const similar = getSimilarProducts(product);
  const thumbs = product.thumbnails;

  const clampIdx = (i: number) => Math.min(i, thumbs.length - 1);

  const handleWoodType = (w: string) => {
    setWoodType(w);
    setMainImage(clampIdx(WOOD_TYPES.indexOf(w)));
  };

  const handleFinish = (f: string) => {
    setFinish(f);
    setMainImage(clampIdx(FINISHES.indexOf(f)));
  };

  const handleColor = (i: number) => {
    setColorIdx(i);
    setMainImage(clampIdx(i));
  };

  const pill = (label: string, active: boolean, onClick: () => void) => (
    <button
      key={label}
      onClick={onClick}
      className={`px-4 py-2 text-[10px] uppercase tracking-[0.15em] border transition-all duration-200 ${
        active ? "bg-foreground text-background border-foreground" : "bg-transparent text-foreground/60 border-foreground/25 hover:border-foreground/70 hover:text-foreground"
      }`}
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      {label}
    </button>
  );

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-background">
        <OrderTypeToggle />
        {/* Top section */}
        <div className="container-wide px-6 md:px-12 pb-10 md:pb-16 pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* LEFT — Image gallery */}
            <div>
              <div className="relative aspect-[4/5] bg-secondary overflow-hidden group cursor-zoom-in">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={mainImage}
                    src={thumbs[mainImage]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }} // 0.4s crossfade as requested
                  />
                </AnimatePresence>

                {/* Watermark */}
                <div className="absolute bottom-4 right-4 pointer-events-none">
                  <ArikaLogo variant="icon" size="md" color="light" opacity={0.2} />
                </div>

                {/* Arrow buttons */}
                <button
                  onClick={() => setMainImage((i) => (i - 1 + thumbs.length) % thumbs.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                  data-testid="button-prev-image"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setMainImage((i) => (i + 1) % thumbs.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                  data-testid="button-next-image"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2.5 mt-3">
                {thumbs.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(i)}
                    className={`relative aspect-square w-[22%] overflow-hidden border-2 transition-all ${i === mainImage ? "border-[#C9A84C]" : "border-transparent hover:border-[#C9A84C]/50"}`}
                    data-testid={`button-thumbnail-${i}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — Product details */}
            <div className="flex flex-col">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground mb-5 flex-wrap" style={{ fontFamily: "'Jost', sans-serif" }}>
                <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                <span>/</span>
                <Link to="/collection" className="hover:text-foreground transition-colors">Collections</Link>
                <span>/</span>
                <Link to={`/collection/${product.room}`} className="hover:text-foreground transition-colors capitalize">{product.room.replace(/-/g, " ")}</Link>
                <span>/</span>
                <span className="text-foreground/80">{product.name}</span>
              </nav>

              <h1 className="font-serif text-display-lg text-[#1C1C1C] leading-tight">{product.name}</h1>

              <p className="mt-2 text-[10px] uppercase tracking-[4px] text-[#C9A84C] font-semibold" style={{ fontFamily: "'Jost', sans-serif" }}>
                SKU: {product.sku}
              </p>

              {/* Stars */}
              <div className="flex items-center gap-2 mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="#C9A84C" color="#C9A84C" />
                ))}
                <span className="text-[11px] text-muted-foreground ml-1" style={{ fontFamily: "'Jost', sans-serif" }}>(24 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mt-4">
                <span className="text-2xl text-foreground font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {formatPrice(parseFloat(product.price.replace(/,/g, "")))}
                </span>
                <span className="text-sm text-muted-foreground" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {orderType === "retail" 
                    ? `$${product.price} USD` 
                    : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(parseFloat(product.price.replace(/,/g, "")) * 83)}
                </span>
              </div>

              <div className="h-px bg-[#C9A84C]/30 my-5" />

              <p className="text-sm text-muted-foreground leading-[1.8]">{product.description}</p>

              {/* Variant selectors */}
              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2.5" style={{ fontFamily: "'Jost', sans-serif" }}>
                    Wood Type
                    <span className="ml-2 text-foreground/50 normal-case tracking-normal">— {woodType}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {WOOD_TYPES.map((w) => pill(w, woodType === w, () => handleWoodType(w)))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2.5" style={{ fontFamily: "'Jost', sans-serif" }}>
                    Finish
                    <span className="ml-2 text-foreground/50 normal-case tracking-normal">— {finish}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {FINISHES.map((f) => pill(f, finish === f, () => handleFinish(f)))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2.5" style={{ fontFamily: "'Jost', sans-serif" }}>Size</p>
                  <div className="flex flex-wrap gap-2">{SIZES.map((s) => pill(s, size === s, () => setSize(s)))}</div>
                  <AnimatePresence>
                    {size === "Custom" && (
                      <motion.input
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        type="text"
                        placeholder="Enter custom dimensions (e.g. 80×40×75 cm)"
                        value={customDims}
                        onChange={(e) => setCustomDims(e.target.value)}
                        className="mt-2.5 w-full border border-foreground/15 px-4 py-2.5 text-sm focus:outline-none focus:border-foreground/40"
                        data-testid="input-custom-dimensions"
                      />
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2.5" style={{ fontFamily: "'Jost', sans-serif" }}>Colour / Stain</p>
                  <div className="flex gap-3">
                    {COLORS.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => handleColor(i)}
                        className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${colorIdx === i ? "border-foreground scale-110" : "border-transparent hover:scale-105"}`}
                        style={{ background: c }}
                        data-testid={`button-color-${i}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground" style={{ fontFamily: "'Jost', sans-serif" }}>Quantity</p>
                  {orderType === "export" && (
                    <span className="text-[10px] text-[#C9A84C] bg-[#C9A84C]/10 px-2 py-0.5 rounded-sm">Min. 10 units for export</span>
                  )}
                </div>
                <div className="inline-flex items-center border border-foreground/20">
                  <button onClick={() => setQty((q) => Math.max(orderType === "export" ? 10 : 1, q - 1))} className="px-4 py-2.5 hover:bg-secondary transition-colors" data-testid="button-qty-minus"><Minus size={12} /></button>
                  <span className="px-5 py-2.5 text-sm min-w-[48px] text-center">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="px-4 py-2.5 hover:bg-secondary transition-colors" data-testid="button-qty-plus"><Plus size={12} /></button>
                </div>
              </div>

              {/* CTAs */}
              {orderType === "retail" ? (
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => addToCart({ id: `${product.id}-${woodType}-${finish}-${size}-${colorIdx}`, product, quantity: qty, woodType, finish, size, color: COLORS[colorIdx], price: parseFloat(product.price.replace(/,/g, "")) })}
                    className="w-full bg-foreground text-background py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground/85 transition-colors"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    data-testid="button-add-to-cart"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => openModal()}
                    className="w-full border border-foreground/30 text-foreground py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-secondary transition-colors"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    data-testid="button-enquire"
                  >
                    Enquire About This Piece
                  </button>
                </div>
              ) : (
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => addToInquiry({ id: `${product.id}-${woodType}-${finish}-${size}-${colorIdx}`, product, quantity: qty, woodType, finish, size, color: COLORS[colorIdx], price: parseFloat(product.price.replace(/,/g, "")), notes: "" })}
                    className="w-full bg-foreground text-background py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground/85 transition-colors"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    Add to Inquiry List
                  </button>
                  <button
                    onClick={() => navigate('/export-inquiry')}
                    className="w-full bg-[#C9A84C] text-[#111111] py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-[#b08e35] transition-colors font-medium"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    Request Export Quote
                  </button>
                  <p className="text-[10px] text-muted-foreground/80 leading-relaxed mt-1 text-center italic">
                    Export orders are fulfilled based on container capacity. Our team will confirm feasibility, pricing, and lead time after reviewing your inquiry.
                  </p>
                </div>
              )}

              {/* WhatsApp */}
              <a
                href={`https://wa.me/919876543210?text=Hi, I'm interested in: ${product.name} (${product.sku})`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontFamily: "'Jost', sans-serif" }}
                data-testid="link-whatsapp-product"
              >
                <MessageCircle size={14} style={{ color: "#25D366" }} />
                Chat directly on WhatsApp
              </a>

              {/* Trust badges */}
              <div className="mt-5 pt-5 border-t border-foreground/8 flex gap-6 flex-wrap">
                {[
                  { icon: <ShieldCheck size={14} />, label: "Handcrafted" },
                  { icon: <Package size={14} />, label: "Export Quality" },
                  { icon: <Ruler size={14} />, label: "Custom Sizes" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground" style={{ fontFamily: "'Jost', sans-serif" }}>
                    <span className="text-foreground/60">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>

              {/* Accordions */}
              <div className="mt-6">
                <AccordionItem title="About the Material">
                  <p>This piece is crafted from sustainably sourced {woodType.toLowerCase()}. Known for its dense grain and natural durability, {woodType.toLowerCase()} is ideal for heirloom-quality furniture that deepens in character with age. All our woods are sourced from certified forests and cooperatives in Rajasthan.</p>
                </AccordionItem>
                <AccordionItem title="Dimensions & Specifications">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.dimensions.map(({ label, value }) => (
                        <tr key={label} className="border-b border-foreground/5">
                          <td className="py-2 text-muted-foreground">{label}</td>
                          <td className="py-2 text-foreground font-medium">{value}</td>
                        </tr>
                      ))}
                      <tr><td className="py-2 text-muted-foreground">Finish</td><td className="py-2 text-foreground">{finish}</td></tr>
                      <tr><td className="py-2 text-muted-foreground">Wood Type</td><td className="py-2 text-foreground">{woodType}</td></tr>
                    </tbody>
                  </table>
                </AccordionItem>
                <AccordionItem title="Shipping & Export">
                  <p>We export worldwide from our Jodhpur workshop. All pieces are professionally packed in custom crates with foam protection. Typical lead time is 4–6 weeks for standard pieces. Expedited shipping available. We work with leading freight forwarders and can provide all documentation required for customs clearance.</p>
                </AccordionItem>
                <AccordionItem title="Care Instructions">
                  <p>Dust regularly with a soft dry cloth. For deeper cleaning, use a slightly damp cloth followed by a dry one. Apply a thin coat of natural beeswax or teak oil every 6–12 months to nourish the wood and maintain its finish. Keep away from direct sunlight and excessive moisture. Avoid harsh chemical cleaners.</p>
                </AccordionItem>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-foreground/8 bg-secondary/40">
          <div className="container-wide px-6 md:px-12">
            <div className="flex border-b border-foreground/10">
              {(["description", "reviews", "shipping"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-[10px] uppercase tracking-[0.15em] border-b-2 -mb-px transition-colors ${activeTab === tab ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  data-testid={`tab-${tab}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="py-10 max-w-3xl">
              {activeTab === "description" && (
                <p className="text-sm text-muted-foreground leading-[1.9]">{product.longDescription}</p>
              )}
              {activeTab === "reviews" && (
                <div className="space-y-8">
                  {REVIEWS.map((r, i) => (
                    <div key={i} className="border-b border-foreground/8 pb-8 last:border-0">
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={11} fill="#C9A84C" color="#C9A84C" />)}
                      </div>
                      <p className="text-sm text-foreground leading-[1.8] mb-3">"{r.text}"</p>
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.12em] text-muted-foreground" style={{ fontFamily: "'Jost', sans-serif" }}>
                        <span>{r.name}</span><span>·</span><span>{r.location}</span><span>·</span><span>{r.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "shipping" && (
                <div className="space-y-4 text-sm text-muted-foreground leading-[1.8]">
                  <p><strong className="text-foreground">Lead Time:</strong> Standard pieces ship in 4–6 weeks. Custom pieces may take 6–10 weeks depending on specifications.</p>
                  <p><strong className="text-foreground">Export Packaging:</strong> All pieces are individually wrapped in furniture blankets, boxed in double-wall corrugated cardboard, and crated in plywood for sea freight.</p>
                  <p><strong className="text-foreground">Documentation:</strong> We provide invoice, packing list, certificate of origin, and fumigation certificate as required.</p>
                  <p><strong className="text-foreground">Freight Options:</strong> Sea freight (FCL or LCL), air freight, and courier for smaller items. We work with trusted freight forwarders to all major ports globally.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similar.length > 0 && (
          <section className="section-padding bg-background">
            <div className="container-wide px-6 md:px-12">
              <h2 className="font-serif text-3xl font-light text-foreground mb-10">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                {similar.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="py-14 md:py-20 bg-secondary/40">
            <div className="container-wide px-6 md:px-12">
              <h2 className="font-serif text-2xl font-light text-foreground mb-8">Recently Viewed</h2>
              <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
                {recentlyViewed.map((p, i) => (
                  <div key={p.id} className="shrink-0 w-56">
                    <ProductCard product={p} index={i} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
        <FloatingButtons />
      </main>
    </>
  );
};

export default ProductPage;
