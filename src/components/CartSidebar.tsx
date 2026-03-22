import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOrder } from "@/context/OrderContext";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const CartSidebar = () => {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart } = useOrder();

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md bg-background border-l border-foreground/10 p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-foreground/10 text-left">
          <SheetTitle className="font-serif font-light text-2xl text-foreground">Your Cart</SheetTitle>
          <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground" style={{ fontFamily: "'Jost', sans-serif" }}>
            {cart.length} {cart.length === 1 ? "Item" : "Items"}
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-[#4A4A4A]">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="font-serif text-lg">Your cart is empty</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-xs uppercase tracking-[0.15em] underline underline-offset-4 font-sans"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 pb-6 border-b border-foreground/10 last:border-0 last:pb-0">
                <div className="w-20 h-24 bg-secondary shrink-0 overflow-hidden">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif text-lg leading-tight">{item.product.name}</h4>
                      <button onClick={() => removeFromCart(item.id)} className="text-foreground/40 hover:text-foreground transition-colors p-1">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground mt-1 mb-2">
                      {item.woodType} · {item.finish} 
                      {item.size !== "Standard" && ` · ${item.size}`}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border border-foreground/20">
                      <button 
                        onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-1 w-8 flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs w-6 text-center font-mono">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 w-8 flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-mono text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-foreground/10 bg-secondary/30">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs uppercase tracking-[0.15em] text-foreground font-sans">Subtotal</span>
              <span className="font-mono text-xl">${subtotal.toFixed(2)}</span>
            </div>
            <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
              <div className="w-full bg-foreground text-background text-center py-4 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors hover:bg-foreground/80 cursor-pointer">
                Proceed to Checkout
              </div>
            </Link>
            <p className="text-[10px] text-center text-muted-foreground/70 italic mt-4">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
