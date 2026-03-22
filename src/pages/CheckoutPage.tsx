import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useOrder } from "@/context/OrderContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, ArrowLeft, Lock, CreditCard } from "lucide-react";
import ArikaLogo from "@/components/ArikaLogo";

const CheckoutPage = () => {
  const { cart, clearCart, setIsCartOpen, formatPrice, orderType } = useOrder();
  const navigate = useNavigate();
  
  const [shippingMethod, setShippingMethod] = useState("Standard");
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const shippingCost = shippingMethod === "Express" ? 45 : (shippingMethod === "India" ? 6 : (subtotal > 500 ? 0 : 25)); // 6 USD ~ 500 INR
  const total = subtotal + shippingCost;

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (cart.length === 0) {
      navigate("/collection");
    }
  }, [cart.length, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderRef = "AHC-" + Math.floor(100000 + Math.random() * 900000);
    clearCart();
    navigate("/order-confirmation", { state: { orderRef, amount: total } });
  };

  if (cart.length === 0) return null;

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-background min-h-screen">
        <div className="container-wide px-6 md:px-12 py-10">
          <Link to="/collection" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors mb-8" style={{ fontFamily: "'Jost', sans-serif" }}>
            <ArrowLeft size={14} /> Back to Collections
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Form */}
            <div className="lg:col-span-7 xl:col-span-8">
              <h1 className="font-serif text-3xl mb-8 flex items-center gap-3">
                Secure Checkout <Lock size={20} className="text-[#C9A84C]" />
              </h1>
              
              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Contact */}
                <section>
                  <h2 className="text-sm uppercase tracking-[0.15em] text-foreground mb-6 pb-2 border-b border-[#C9A84C]" style={{ fontFamily: "'Jost', sans-serif" }}>Contact Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required type="text" placeholder="First Name" className="w-full border border-foreground/15 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors bg-white/5" />
                    <input required type="text" placeholder="Last Name" className="w-full border border-foreground/15 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors bg-white/5" />
                    <input required type="email" placeholder="Email Address" className="w-full border border-foreground/15 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors md:col-span-2 bg-white/5" />
                    <input required type="tel" placeholder="WhatsApp / Phone Number" className="w-full border border-foreground/15 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors md:col-span-2 bg-white/5" />
                  </div>
                </section>

                {/* Shipping */}
                <section>
                  <h2 className="text-sm uppercase tracking-[0.15em] text-foreground mb-6 pb-2 border-b border-[#C9A84C]" style={{ fontFamily: "'Jost', sans-serif" }}>Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required type="text" placeholder="Address Line 1" className="w-full border border-foreground/15 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors md:col-span-2 bg-white/5" />
                    <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full border border-foreground/15 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors md:col-span-2 bg-white/5" />
                    <input required type="text" placeholder="City" className="w-full border border-foreground/15 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors bg-white/5" />
                    <input required type="text" placeholder="State / Province" className="w-full border border-foreground/15 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors bg-white/5" />
                    <input required type="text" placeholder="Postal Code / Pincode" className="w-full border border-foreground/15 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors bg-white/5" />
                    <select required className="w-full border border-foreground/15 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors bg-background appearance-none">
                      <option value="" disabled selected>Country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="IN">India</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="EU">Europe (Various)</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </section>

                {/* Method */}
                <section>
                  <h2 className="text-sm uppercase tracking-[0.15em] text-foreground mb-6 pb-2 border-b border-[#C9A84C]" style={{ fontFamily: "'Jost', sans-serif" }}>Shipping Method</h2>
                  <div className="space-y-3">
                    <label className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${shippingMethod === "Standard" ? "border-[#C9A84C] bg-[#C9A84C]/5" : "border-foreground/15 hover:border-[#C9A84C]/50 bg-white/5"}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" checked={shippingMethod === "Standard"} onChange={() => setShippingMethod("Standard")} className="accent-[#C9A84C]" />
                        <div>
                          <p className="text-sm font-medium">Standard International</p>
                          <p className="text-xs text-muted-foreground mt-0.5">15-20 business days</p>
                        </div>
                      </div>
                      <span className="text-sm font-mono">{subtotal > 500 ? "Free" : (orderType === "retail" ? "₹2,075" : "$25.00")}</span>
                    </label>
                    <label className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${shippingMethod === "Express" ? "border-[#C9A84C] bg-[#C9A84C]/5" : "border-foreground/15 hover:border-[#C9A84C]/50 bg-white/5"}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" checked={shippingMethod === "Express"} onChange={() => setShippingMethod("Express")} className="accent-[#C9A84C]" />
                        <div>
                          <p className="text-sm font-medium">Express Courier</p>
                          <p className="text-xs text-muted-foreground mt-0.5">7-10 business days</p>
                        </div>
                      </div>
                      <span className="text-sm font-mono">{orderType === "retail" ? "₹3,735" : "$45.00"}</span>
                    </label>
                    <label className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${shippingMethod === "India" ? "border-[#C9A84C] bg-[#C9A84C]/5" : "border-foreground/15 hover:border-[#C9A84C]/50 bg-white/5"}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" checked={shippingMethod === "India"} onChange={() => setShippingMethod("India")} className="accent-[#C9A84C]" />
                        <div>
                          <p className="text-sm font-medium">Within India</p>
                          <p className="text-xs text-muted-foreground mt-0.5">5-7 business days</p>
                        </div>
                      </div>
                      <span className="text-sm font-mono">₹500 flat</span>
                    </label>
                  </div>
                </section>

                <div className="pt-8 pb-10 relative">
                  <button type="submit" className="w-full bg-foreground text-background py-5 text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[#C9A84C] hover:text-[#111111] transition-all duration-300">
                    Place Order
                  </button>
                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                    <ShieldCheck size={14} />
                    <span>Secure encrypted checkout</span>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
                    <ArikaLogo variant="icon" size="lg" color="light" opacity={0.5} />
                  </div>
                </div>
              </form>
            </div>

            {/* Right: Order Summary Sticky */}
            <div className="lg:col-span-5 xl:col-span-4 self-start sticky top-28 bg-secondary/50 p-6 md:p-8 border-t border-t-[#C9A84C] border-l border-r border-b border-foreground/10 shadow-[var(--shadow-elegant)]">
              <h3 className="font-serif text-xl mb-6 flex items-center justify-between">
                Order Summary
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="text-xs font-sans uppercase tracking-[0.1em] text-muted-foreground hover:text-[#C9A84C] transition-colors underline"
                >
                  Edit Cart
                </button>
              </h3>

              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto no-scrollbar pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-[72px] h-[90px] bg-background overflow-hidden shrink-0 border border-foreground/10 rounded-sm">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-sm py-1">
                      <p className="font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground mt-1 mb-2">
                        {item.woodType} · {item.finish}
                      </p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground flex items-center gap-1">Qty: <span className="text-foreground">{item.quantity}</span></span>
                        <span className="font-mono font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-foreground/10 pt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-mono">{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                </div>
              </div>

              <div className="border-t border-foreground/10 mt-5 pt-5 flex justify-between items-end">
                <span className="font-medium flex flex-col uppercase tracking-[0.1em] text-foreground" style={{ fontFamily: "'Jost', sans-serif" }}>
                  <span>Total</span>
                  <span className="text-[9px] text-muted-foreground tracking-normal lowercase mt-1 text-opacity-70">(incl. taxes)</span>
                </span>
                <span className="font-serif text-2xl font-medium">{formatPrice(total)}</span>
              </div>
              
              <div className="mt-8 pt-6 border-t border-foreground/5 text-center">
                <p className="text-[11px] text-muted-foreground leading-relaxed italic mb-4">
                  Payment processed securely offline after order confirmation.
                </p>
                <div className="flex items-center justify-center gap-4 text-foreground/40">
                  <ShieldCheck size={18} />
                  <Lock size={16} />
                  <CreditCard size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;
