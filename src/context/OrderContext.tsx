import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";
import { toast } from "sonner";

export type OrderType = "retail" | "export";

export interface CartItem {
  id: string; // unique string (productId + variants)
  product: Product;
  quantity: number;
  woodType: string;
  finish: string;
  size: string;
  color: string;
  price: number;
}

export interface InquiryItem {
  id: string;
  product: Product;
  quantity: number;
  woodType: string;
  finish: string;
  size: string;
  color: string;
  price: number;
  notes: string;
}

interface OrderContextProps {
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  
  // Retail Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Export Inquiry
  inquiryList: InquiryItem[];
  addToInquiry: (item: InquiryItem) => void;
  removeFromInquiry: (id: string) => void;
  updateInquiryQuantity: (id: string, quantity: number) => void;
  updateInquiryNotes: (id: string, notes: string) => void;
  clearInquiry: () => void;
  isInquiryOpen: boolean;
  setIsInquiryOpen: (open: boolean) => void;

  // Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Search Overlay
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  // Currency Utility
  formatPrice: (priceInput: number | string) => string;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orderType, setOrderType] = useState<OrderType>("export");
  
  // Persisted States
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("arika_cart");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [inquiryList, setInquiryList] = useState<InquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem("arika_inquiry");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem("arika_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // UI Toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => { localStorage.setItem("arika_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("arika_inquiry", JSON.stringify(inquiryList)); }, [inquiryList]);
  useEffect(() => { localStorage.setItem("arika_wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  // Cart Actions
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    toast.success("Added to Cart");
    setIsCartOpen(true);
  };
  const removeFromCart = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));
  const updateCartQuantity = (id: string, quantity: number) => setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity } : i));
  const clearCart = () => setCart([]);

  // Inquiry Actions
  const addToInquiry = (item: InquiryItem) => {
    setInquiryList((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    toast.success("Added to Inquiry List");
    setIsInquiryOpen(true);
  };
  const removeFromInquiry = (id: string) => setInquiryList((prev) => prev.filter((i) => i.id !== id));
  const updateInquiryQuantity = (id: string, quantity: number) => setInquiryList((prev) => prev.map((i) => i.id === id ? { ...i, quantity } : i));
  const updateInquiryNotes = (id: string, notes: string) => setInquiryList((prev) => prev.map((i) => i.id === id ? { ...i, notes } : i));
  const clearInquiry = () => setInquiryList([]);

  // Wishlist Actions
  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.find(p => p.id === product.id)) return prev;
      return [...prev, product];
    });
    toast.success("Added to Wishlist");
  };
  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter(p => p.id !== productId));
    toast.success("Removed from Wishlist");
  };
  const isWishlisted = (productId: string) => wishlist.some(p => p.id === productId);

  // Currency utility
  const formatPrice = (priceInput: number | string) => {
    const priceUSD = typeof priceInput === "string" 
      ? Number(priceInput.replace(/,/g, '')) 
      : priceInput;
      
    if (orderType === "retail") {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(priceUSD * 83);
    } else {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(priceUSD);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orderType, setOrderType,
        cart, addToCart, removeFromCart, updateCartQuantity, clearCart, isCartOpen, setIsCartOpen,
        inquiryList, addToInquiry, removeFromInquiry, updateInquiryQuantity, updateInquiryNotes, clearInquiry, isInquiryOpen, setIsInquiryOpen,
        wishlist, addToWishlist, removeFromWishlist, isWishlisted, isWishlistOpen, setIsWishlistOpen,
        isSearchOpen, setIsSearchOpen,
        formatPrice
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
