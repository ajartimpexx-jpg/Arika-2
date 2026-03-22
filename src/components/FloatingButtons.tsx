import { useState, useEffect } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const FloatingButtons = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center text-background shadow-lg hover:scale-110 transition-all duration-200"
          aria-label="Back to top"
          data-testid="button-back-to-top"
        >
          <ArrowUp size={18} />
        </button>
      )}

      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-200"
            style={{ background: "#25D366" }}
            data-testid="link-whatsapp-float"
          >
            <span className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ background: "#25D366" }} />
            <MessageCircle size={24} className="relative z-10" />
          </a>
        </TooltipTrigger>
        <TooltipContent side="left">Chat with us</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default FloatingButtons;
