import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CollectionPage from "./pages/CollectionPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.tsx";
import ExportInquiryPage from "./pages/ExportInquiryPage.tsx";
import ExportConfirmationPage from "./pages/ExportConfirmationPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ExportPage from "./pages/ExportPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import ScrollProgress from "@/components/ScrollProgress";
import InquiryModalProvider from "@/components/InquiryModal";
import { OrderProvider } from "@/context/OrderContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <OrderProvider>
        <InquiryModalProvider>
          <Toaster />
          <Sonner />
          <ScrollProgress />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/export" element={<ExportPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/collection" element={<CollectionPage />} />
              <Route path="/collection/:slug" element={<CollectionPage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/export-inquiry" element={<ExportInquiryPage />} />
              <Route path="/export-confirmation" element={<ExportConfirmationPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </InquiryModalProvider>
      </OrderProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
