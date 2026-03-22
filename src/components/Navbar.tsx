import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ShoppingBag, Briefcase, ArrowRight, Heart, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import ArikaLogo from "@/components/ArikaLogo";
import { MEGA_MENU_COLUMNS } from "@/data/products";
import { useOrder } from "@/context/OrderContext";
import CartSidebar from "@/components/CartSidebar";
import InquirySidebar from "@/components/InquirySidebar";
import WishlistSidebar from "@/components/WishlistSidebar";
import SearchOverlay from "@/components/SearchOverlay";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { orderType, setOrderType, cart, inquiryList, wishlist, setIsCartOpen, setIsInquiryOpen, setIsWishlistOpen, setIsSearchOpen } = useOrder();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isDark = scrolled || !isHome;
  const logoColor = isDark ? "dark" : "light";
  // Updated to use solid colors instead of opacity as per spec
  const linkClass = isDark ? "text-[#1C1C1C] hover:text-[#000000]" : "text-[#F5F0E8] hover:text-[#FFFFFF]";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isDark ? "bg-[#F5F0E8] shadow-[var(--shadow-elegant)]" : "bg-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between px-6 md:px-12 py-4">
          <Link to="/" className="shrink-0">
            <ArikaLogo variant="horizontal" size="md" color={logoColor} />
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <div
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              className="relative py-6 -my-6"
            >
              <button className={`nav-link inline-flex items-center gap-1 transition-colors ${linkClass}`}>
                Collections
                <ChevronDown size={12} className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {isHome ? (
              <>
                <Link to="/about" className={`nav-link ${linkClass}`}>About</Link>
                <Link to="/collection?filter=best-seller" className={`nav-link ${linkClass}`}>Best Sellers</Link>
                <Link to="/export" className={`nav-link ${linkClass}`}>Export</Link>
                <Link to="/contact" className={`nav-link ${linkClass}`}>Contact</Link>
              </>
            ) : (
              <>
                <Link to="/" className={`nav-link ${linkClass}`}>Home</Link>
                <Link to="/about" className={`nav-link ${linkClass}`}>About</Link>
                <Link to="/export" className={`nav-link ${linkClass}`}>Export</Link>
                <Link to="/contact" className={`nav-link ${linkClass}`}>Contact</Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-5 md:gap-6">
            {/* Currency / Mode Pill */}
            <button
              onClick={() => setOrderType(orderType === "retail" ? "export" : "retail")}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
                isDark 
                  ? "border-[#2C2C2C] hover:border-[#1C1C1C] text-[#2C2C2C] hover:text-[#111111]" 
                  : "border-[#F5F0E8]/30 hover:border-[#F5F0E8] text-[#F5F0E8] hover:text-[#FFFFFF]"
              }`}
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "1px" }}
              aria-label="Toggle Order Mode"
            >
              {orderType === "retail" ? (
                <>
                  <span className="font-serif italic mr-1">₹</span> INR
                </>
              ) : (
                <>
                  <span className="font-serif italic mr-1">$</span> USD
                </>
              )}
            </button>

            <button 
              onClick={() => setIsSearchOpen(true)}
              className={`relative p-1 transition-colors ${linkClass}`}
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <button 
              onClick={() => setIsWishlistOpen(true)}
              className={`relative p-1 transition-colors ${linkClass}`}
              aria-label="Wishlist"
            >
              <Heart size={20} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A84C] text-[#111111] flex items-center justify-center rounded-full text-[9px] font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {cart.length > 0 && (
              <button 
                onClick={() => setIsCartOpen(true)}
                className={`relative p-1 transition-colors ${linkClass}`}
                aria-label="Open Cart"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background flex items-center justify-center rounded-full text-[9px] font-bold">
                  {cart.length}
                </span>
              </button>
            )}

            {inquiryList.length > 0 && (
              <button 
                onClick={() => setIsInquiryOpen(true)}
                className={`relative p-1 transition-colors ${linkClass}`}
                aria-label="Open Inquiry List"
              >
                <Briefcase size={20} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A84C] text-[#111111] flex items-center justify-center rounded-full text-[9px] font-bold">
                  {inquiryList.length}
                </span>
              </button>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-1 z-[100] relative ${mobileOpen ? "text-[#F5F0E8]" : linkClass}`}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu — slide in from left */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            className="fixed inset-0 z-[90] md:hidden flex flex-col"
            style={{ background: "#111111" }}
          >
            {/* Top bar: logo + close */}
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(245,240,232,0.08)" }}>
              <Link to="/" onClick={() => setMobileOpen(false)}>
                <ArikaLogo variant="horizontal" size="md" color="light" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 flex items-center justify-center"
                style={{ color: "#F5F0E8" }}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Main nav content */}
            <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-7">
              {/* Main links */}
              <div className="flex flex-col" style={{ gap: "28px" }}>
                {isHome ? (
                  <>
                    <a
                      href="#about"
                      onClick={() => setMobileOpen(false)}
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", color: "#F5F0E8", fontWeight: 400 }}
                    >
                      About
                    </a>
                    <a
                      href="#products"
                      onClick={() => setMobileOpen(false)}
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", color: "#F5F0E8", fontWeight: 400 }}
                    >
                      Best Sellers
                    </a>
                    <a
                      href="#export"
                      onClick={() => setMobileOpen(false)}
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", color: "#F5F0E8", fontWeight: 400 }}
                    >
                      Export
                    </a>
                    <a
                      href="#contact"
                      onClick={() => setMobileOpen(false)}
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", color: "#F5F0E8", fontWeight: 400 }}
                    >
                      Contact
                    </a>
                  </>
                ) : (
                  <>
                    <Link
                      to="/"
                      onClick={() => setMobileOpen(false)}
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", color: "#F5F0E8", fontWeight: 400 }}
                    >
                      Home
                    </Link>
                    <Link
                      to="/about"
                      onClick={() => setMobileOpen(false)}
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", color: "#F5F0E8", fontWeight: 400 }}
                    >
                      About
                    </Link>
                    <Link
                      to="/export"
                      onClick={() => setMobileOpen(false)}
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", color: "#F5F0E8", fontWeight: 400 }}
                    >
                      Export
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setMobileOpen(false)}
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", color: "#F5F0E8", fontWeight: 400 }}
                    >
                      Contact
                    </Link>
                  </>
                )}
              </div>

              {/* Gold divider */}
              <div style={{ height: "1px", background: "#C9A84C", opacity: 0.5, margin: "0 0" }} />

              {/* Collections accordion — sub items */}
              <div>
                <button
                  onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                  className="flex items-center justify-between w-full"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "15px", color: "rgba(245,240,232,0.7)", textTransform: "uppercase", letterSpacing: "3px" }}
                >
                  Collections
                  <ChevronDown
                    size={14}
                    style={{ color: "rgba(245,240,232,0.7)", transition: "transform 0.3s", transform: mobileCollectionsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                <AnimatePresence>
                  {mobileCollectionsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col mt-4" style={{ gap: "16px" }}>
                        <Link
                          to="/collection"
                          onClick={() => setMobileOpen(false)}
                          style={{ fontFamily: "'Jost', sans-serif", fontSize: "15px", color: "rgba(245,240,232,0.7)", textTransform: "uppercase", letterSpacing: "3px" }}
                        >
                          All Collections
                        </Link>
                        {MEGA_MENU_COLUMNS.map((col) => (
                          <Link
                            key={col.slug}
                            to={`/collection/${col.slug}`}
                            onClick={() => setMobileOpen(false)}
                            style={{ fontFamily: "'Jost', sans-serif", fontSize: "15px", color: "rgba(245,240,232,0.7)", textTransform: "uppercase", letterSpacing: "3px" }}
                          >
                            {col.heading}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-width Mega Menu (desktop) */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 z-40 bg-foreground"
            style={{ top: "64px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <div className="container-wide px-6 md:px-12 py-10">
              <div className="grid grid-cols-5 gap-8">
                {MEGA_MENU_COLUMNS.map((col) => (
                  <div key={col.slug}>
                    <Link
                      to={`/collection/${col.slug}`}
                      onClick={() => setMegaOpen(false)}
                      className="block mb-5 font-serif text-[15px] text-[#F5F0E8] hover:text-[#C9A84C] transition-colors"
                    >
                      {col.heading}
                    </Link>
                    <ul className="space-y-3">
                      {col.items.map((item) => (
                        <li key={item}>
                          <Link
                            to={`/collection/${col.slug}`}
                            onClick={() => setMegaOpen(false)}
                            className="text-[11px] uppercase tracking-[0.12em] text-[#D4CFC7] hover:text-[#C9A84C] transition-colors duration-200"
                            style={{ fontFamily: "'Jost', sans-serif" }}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-[#F5F0E8]">
                <Link
                  to="/contact"
                  onClick={() => setMegaOpen(false)}
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#C9A84C] hover:text-[#FFFFFF] transition-colors group"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Looking for something custom? Commission a Bespoke Piece
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Sidebars mounted here so they're accessible everywhere */}
      <CartSidebar />
      <InquirySidebar />
      <WishlistSidebar />
      <SearchOverlay />
    </>
  );
};

export default Navbar;
