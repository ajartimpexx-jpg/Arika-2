import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { Link } from "react-router-dom";
import ArikaLogo from "@/components/ArikaLogo";

const NotFoundPage = () => {
  return (
    <>
      <PageSEO title="Page Not Found — Arika Handicrafts" />
      <Navbar />
      
      <main className="min-h-screen pt-20 flex flex-col items-center justify-center bg-[#111111] relative overflow-hidden">
        {/* Giant background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-serif text-[clamp(120px,30vw,400px)] text-[#F5F0E8] opacity-[0.03] leading-none">
            404
          </span>
        </div>
        
        <div className="container-wide px-6 text-center relative z-10 flex flex-col items-center">
          <div className="mb-10 text-[#C9A84C]">
            <ArikaLogo variant="icon" size="lg" />
          </div>
          
          <h1 className="font-serif text-4xl md:text-[52px] text-[#F5F0E8] mb-6 leading-tight">
            Page Not Found
          </h1>
          <p className="text-[15px] text-[#F5F0E8]/60 font-light mb-12 max-w-md mx-auto" style={{ fontFamily: "'Jost', sans-serif" }}>
            The page you are looking for may have moved or doesn't exist.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 w-full max-w-md">
            <Link 
              to="/"
              className="w-full sm:w-auto bg-[#F5F0E8] text-[#111111] px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-white transition-colors text-center"
            >
              Go Home
            </Link>
            <Link 
              to="/collection"
              className="w-full sm:w-auto border border-[#C9A84C] text-[#C9A84C] px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-[#C9A84C] hover:text-[#111111] transition-all duration-300 text-center"
            >
              Explore Collections
            </Link>
          </div>
          
          <p className="text-[#C9A84C] text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
            Or <a href="https://wa.me/919876543210" className="underline hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">WhatsApp us</a> if you need help finding something.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default NotFoundPage;
