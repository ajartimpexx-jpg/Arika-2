import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import BrandStory from "@/components/BrandStory";
import CategoriesSection from "@/components/CategoriesSection";
import CraftsmanshipProcess from "@/components/CraftsmanshipProcess";
import ProductsSection from "@/components/ProductsSection";
import ExportSection from "@/components/ExportSection";
import CountriesSection from "@/components/CountriesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import InstagramTeaser from "@/components/InstagramTeaser";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import PageLoader from "@/components/PageLoader";

const Index = () => (
  <PageLoader>
    <Navbar />
    <HeroSection />
    <MarqueeStrip />
    <BrandStory />
    <CategoriesSection />
    <CraftsmanshipProcess />
    <ProductsSection />
    <ExportSection />
    <CountriesSection />
    <WhyChooseUs />
    <Testimonials />
    <InstagramTeaser />
    <Footer />
    <FloatingButtons />
  </PageLoader>
);

export default Index;
