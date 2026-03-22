import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, MapPin, User } from "lucide-react";

const artisans = [
  {
    name: "Ramesh Ji",
    specialty: "Master Wood Carver",
    quote: "I don't just carve wood. I carve time into it.",
    image: "/src/assets/placeholder-artisan-1.png" // Will fix with placeholder boxes in next step
  },
  {
    name: "Suresh Mistri",
    specialty: "Joinery and Assembly",
    quote: "A joint that lasts is a joint made with patience.",
    image: "/src/assets/placeholder-artisan-2.png" 
  },
  {
    name: "Kavita Devi",
    specialty: "Finishing and Polish",
    quote: "The finish is where the wood finds its voice.",
    image: "/src/assets/placeholder-artisan-3.png"
  }
];

const AboutPage = () => {
  return (
    <>
      <PageSEO title="Our Story — Arika Handicrafts | Jodhpur" />
      <Navbar />
      
      <main className="min-h-screen pt-20">
        {/* Section 1: Hero */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-[#111111]">
          <div className="absolute inset-0">
            <img 
              src="/src/assets/artisans-working.jpg" 
              alt="Artisan Workshop" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
          </div>
          
          <div className="container-wide relative z-10 text-center px-4">
            <p className="text-[12px] uppercase tracking-[6px] text-[#C9A84C] font-semibold mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>
              OUR STORY
            </p>
            <h1 className="font-serif text-5xl md:text-[64px] text-[#F5F0E8] mb-6 leading-tight">
              Born in the Blue City
            </h1>
            <p className="text-lg md:text-[18px] text-[#D4CFC7] font-light max-w-xl mx-auto" style={{ fontFamily: "'Jost', sans-serif" }}>
              Where centuries of craft meet the world
            </p>
          </div>
        </section>

        {/* Section 2: Brand Story */}
        <section className="py-[100px] bg-background">
          <div className="container-wide px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="relative h-[600px] lg:h-[800px] w-full mx-auto overflow-hidden">
                <img 
                  src="/src/assets/cat-furniture.jpg" 
                  alt="Carved Wood Detail" 
                  className="w-full h-full object-cover shadow-[var(--shadow-elegant)]"
                />
              </div>
              <div className="max-w-xl">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>
                  WHO WE ARE
                </p>
                <h2 className="font-serif text-4xl md:text-[42px] mb-10 text-[#1C1C1C] leading-tight">
                  A Family of Artisans,<br/>A Legacy of Wood
                </h2>
                <div className="space-y-6 text-[16px] font-normal leading-[1.8] text-[#2C2C2C]" style={{ fontFamily: "'Jost', sans-serif" }}>
                  <p>
                    Arika was born in the heart of Jodhpur — India's ancient Blue City, where the air smells of sawdust and centuries of craft live in every workshop lane. We are a family of artisans who have been shaping wood into stories for generations.
                  </p>
                  <p>
                    Every piece that leaves our workshop carries the hands of a master craftsman who learned their trade from their father, who learned from theirs. The carved rosette on a cabinet door, the turned leg of a dining table, the hand-rubbed finish of a chest — each detail is a signature of pride.
                  </p>
                  <p>
                    Today, Arika ships to interior designers, hotels, and home collectors across 20+ countries. But our workshop is still in Jodhpur. Our artisans still carve by hand. And every piece is still made one at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Numbers Strip */}
        <section className="py-24 bg-[#111111]">
          <div className="container-wide px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { number: "20+", label: "Countries Served" },
                { number: "500+", label: "Pieces Exported" },
                { number: "15+", label: "Master Artisans" },
                { number: "3", label: "Generations of Craft" }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="font-serif text-[64px] text-[#F5F0E8] leading-none mb-4">{stat.number}</p>
                  <p className="text-[12px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold" style={{ fontFamily: "'Jost', sans-serif", fontVariant: "small-caps" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Our Values */}
        <section className="py-[120px] bg-[#F5F0E8]">
          <div className="container-wide px-6 md:px-12 text-center">
            <p className="text-[12px] uppercase tracking-[0.25em] text-[#C9A84C] font-semibold mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
              WHAT WE STAND FOR
            </p>
            <h2 className="font-serif text-4xl md:text-[42px] mb-16 leading-tight text-[#1C1C1C]">
              Our Promise to Every Buyer
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
              {[
                { title: "Honest Craft", desc: "No shortcuts, no veneers, no compromises. Every piece is solid wood, hand finished, and built to last decades." },
                { title: "Transparent Trade", desc: "We believe in fair pricing, clear timelines, and honest communication. What we promise, we deliver." },
                { title: "Sustainable Sourcing", desc: "Our wood comes from certified sustainable sources. We plant two trees for every tree we use." }
              ].map((value, i) => (
                <div key={i} className="bg-white p-10 pt-12 border-t-2 border-[#C9A84C] shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-serif text-[24px] mb-6 text-[#1C1C1C]">{value.title}</h3>
                  <p className="text-[15px] font-normal leading-[1.8] text-[#444444]" style={{ fontFamily: "'Jost', sans-serif" }}>
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Artisan Spotlight */}
        <section className="py-[120px] bg-[#111111]">
          <div className="container-wide px-6 md:px-12 text-center">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
              THE MAKERS
            </p>
            <h2 className="font-serif text-4xl md:text-[42px] text-[#F5F0E8] mb-16 leading-tight">
              Faces Behind Every Piece
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {artisans.map((artisan, i) => (
                <div key={i} className="text-center">
                  <div className="relative aspect-square mb-8 overflow-hidden bg-[#C4A882] flex items-center justify-center border border-white/5">
                    {/* Placeholder Warm Box with Silhouette Icon */}
                    <User size={80} strokeWidth={0.5} className="text-[#8B7355] opacity-40 translate-y-4" />
                    <div className="absolute inset-0 bg-[#C4A882]/20 sepia-[0.3]" />
                  </div>
                  <h3 className="font-serif text-[22px] text-[#F5F0E8] mb-2">{artisan.name}</h3>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9A84C] mb-6 font-semibold" style={{ fontFamily: "'Jost', sans-serif", fontVariant: "small-caps" }}>
                    {artisan.specialty}
                  </p>
                  <p className="font-serif italic text-[#F5F0E8] text-lg max-w-[280px] mx-auto opacity-70">
                    "{artisan.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Workshop Location */}
        <section className="py-[100px] bg-secondary/30">
          <div className="container-wide px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-serif text-4xl md:text-[42px] text-[#F5F0E8] mb-10 leading-tight">
                  Find Us in Jodhpur
                </h2>
                
                <div className="space-y-8 mb-10">
                  <div className="flex gap-4 items-start">
                    <MapPin className="text-[#C9A84C] mt-1 shrink-0" size={20} />
                    <div>
                      <h4 className="font-serif text-xl mb-2 text-[#F5F0E8]">Workshop & Showroom</h4>
                      <p className="text-[15px] text-muted-foreground font-light leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
                        Industrial Area, Jodhpur<br/>Rajasthan 342001, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <Mail className="text-[#C9A84C] mt-1 shrink-0" size={20} />
                    <div>
                      <h4 className="font-serif text-xl mb-2 text-[#F5F0E8]">Email Us</h4>
                      <p className="text-[15px] text-muted-foreground font-light leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
                        info@arikahandicrafts.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <Phone className="text-[#C9A84C] mt-1 shrink-0" size={20} />
                    <div>
                      <h4 className="font-serif text-xl mb-2 text-[#F5F0E8]">WhatsApp</h4>
                      <p className="text-[15px] text-muted-foreground font-light leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
                        +91 98765 43210
                      </p>
                    </div>
                  </div>
                </div>

                <Link 
                  to="/contact" 
                  className="inline-block border border-[#C9A84C] text-[#C9A84C] px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-[#C9A84C] hover:text-[#111111] transition-all duration-300"
                >
                  Plan Your Visit
                </Link>
              </div>

              <div className="h-[500px] bg-secondary border border-foreground/10 relative overflow-hidden group">
                 {/* Map Placeholder */}
                 <div className="absolute inset-0 bg-[#1a1a1a] flex flex-col items-center justify-center p-8 text-center border border-foreground/5">
                    <MapPin size={48} className="text-[#C9A84C] mb-6 opacity-80" />
                    <h3 className="font-serif text-2xl text-[#C9A84C] mb-2">Jodhpur, Rajasthan</h3>
                    <p className="text-sm font-light text-muted-foreground">The Blue City of India</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: CTA */}
        <section className="py-[120px] bg-background text-center border-t border-foreground/5">
          <div className="container-wide px-6">
            <h2 className="font-serif text-4xl md:text-[48px] text-[#F5F0E8] mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-[16px] text-[#F5F0E8]/65 font-light mb-10 max-w-xl mx-auto" style={{ fontFamily: "'Jost', sans-serif" }}>
              Whether you need one statement piece or a full container — we are ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/collection"
                className="bg-[#1a1a1a] border border-[#333] text-[#F5F0E8] px-8 py-5 text-[11px] uppercase tracking-[0.2em] hover:bg-[#222] transition-colors"
              >
                Explore Collections
              </Link>
              <Link 
                to="/export"
                className="bg-[#C9A84C] text-[#111111] px-8 py-5 text-[11px] uppercase tracking-[0.2em] hover:bg-[#b0923f] transition-colors font-medium"
              >
                Start an Export Inquiry
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
