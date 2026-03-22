import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOrder } from "@/context/OrderContext";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ClipboardList } from "lucide-react";

const InquirySidebar = () => {
  const { isInquiryOpen, setIsInquiryOpen, inquiryList, updateInquiryQuantity, removeFromInquiry } = useOrder();

  const estimatedValue = inquiryList.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <Sheet open={isInquiryOpen} onOpenChange={setIsInquiryOpen}>
      <SheetContent className="w-full sm:max-w-md bg-background border-l border-[#C9A84C]/20 p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-[#C9A84C]/20 text-left bg-[#C9A84C]/5">
          <SheetTitle className="font-serif font-light text-2xl text-foreground">Export Inquiry List</SheetTitle>
          <p className="text-[13px] text-foreground/60 leading-relaxed font-sans mt-2">
            Review your selected pieces before submitting to our export team
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {inquiryList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-[#4A4A4A]">
              <ClipboardList size={48} strokeWidth={1} />
              <p className="font-serif text-lg">Your inquiry list is empty</p>
              <button 
                onClick={() => setIsInquiryOpen(false)}
                className="text-xs uppercase tracking-[0.15em] underline font-sans"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            inquiryList.map((item) => (
              <div key={item.id} className="flex gap-4 pb-6 border-b border-foreground/10 last:border-0 last:pb-0">
                <div className="w-20 h-24 bg-secondary shrink-0 overflow-hidden">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif text-lg leading-tight">{item.product.name}</h4>
                      <button onClick={() => removeFromInquiry(item.id)} className="text-foreground/40 hover:text-foreground transition-colors p-1">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground mt-1 mb-2">
                      {item.woodType} · {item.finish}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border border-[#C9A84C]/30">
                      <button 
                        onClick={() => updateInquiryQuantity(item.id, Math.max(10, item.quantity - 1))}
                        className="px-2 py-1 w-8 flex items-center justify-center hover:bg-[#C9A84C]/10 text-[#C9A84C] transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs w-8 text-center font-mono">{item.quantity}</span>
                      <button 
                        onClick={() => updateInquiryQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 w-8 flex items-center justify-center hover:bg-[#C9A84C]/10 text-[#C9A84C] transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-mono text-sm text-[#4A4A4A]">~${item.price} ea</span>
                  </div>
                </div>
              </div>
            ))
          )}

          {inquiryList.length > 0 && (
            <div className="bg-[#C9A84C]/10 p-4 border border-[#C9A84C]/20 mt-6">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#C9A84C] font-semibold mb-2">IMPORTANT — Container Note</p>
              <p className="text-xs text-foreground/80 leading-relaxed">
                A standard 20ft container holds approximately 150-200 pieces of mixed furniture. Our team will advise on optimal container composition.
              </p>
            </div>
          )}
        </div>

        {inquiryList.length > 0 && (
          <div className="p-6 border-t border-[#C9A84C]/20 bg-background">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs uppercase tracking-[0.15em] text-[#1C1C1C] font-sans">Est. Value <span className="text-[10px] italic normal-case tracking-normal text-[#4A4A4A] ml-1">(Subject to confirmation)</span></span>
              <span className="font-mono text-xl">${estimatedValue.toFixed(0)}</span>
            </div>
            <Link to="/export-inquiry" onClick={() => setIsInquiryOpen(false)}>
              <div className="w-full bg-[#C9A84C] text-[#111111] text-center flex items-center justify-center font-sans h-[52px] text-[12px] uppercase tracking-[0.2em] font-medium transition-colors hover:bg-[#b08e35] cursor-pointer">
                Submit Export Inquiry
              </div>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default InquirySidebar;
