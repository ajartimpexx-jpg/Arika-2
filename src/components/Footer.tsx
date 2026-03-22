import { useState } from "react";
import { Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useInquiryModal } from "@/components/InquiryModal";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Collections", href: "/collection" },
  { label: "Best Sellers", href: "/collection?filter=best-seller" },
  { label: "Export", href: "/export" },
  { label: "Contact", href: "/contact" },
];

const COLLECTION_LINKS = [
  { label: "Living Room", href: "/collection/living-room" },
  { label: "Bedroom", href: "/collection/bedroom" },
  { label: "Dining Room", href: "/collection/dining-room" },
  { label: "Seating", href: "/collection/seating" },
  { label: "Bar Furniture", href: "/collection/bar-furniture" },
  { label: "Outdoor", href: "/collection/outdoor" },
  { label: "Home Decor", href: "/collection/home-decor" },
];

const FooterLink = ({ label, href }: { label: string; href: string }) => (
  <Link
    to={href}
    className="group flex items-center gap-0 text-[14px] text-[#D4CFC7] hover:text-[#F5F0E8] transition-all duration-200"
    style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
  >
    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 mr-1.5 text-[#C9A84C]">→</span>
    {label}
  </Link>
);

const ColHeading = ({ label }: { label: string }) => (
  <div className="mb-5">
    <p
      className="text-[16px] uppercase text-[#F5F0E8] mb-2 font-medium"
      style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "5px" }}
    >
      {label}
    </p>
    <div className="h-px w-6 bg-[#C9A84C]" />
  </div>
);

const OrnamentalDivider = () => (
  <div className="flex items-center gap-0 px-6 md:px-12" style={{ background: "#0D0D0D" }}>
    <div className="flex-1 h-px" style={{ background: "rgba(201,168,76,0.3)" }} />
    <span className="px-4 text-[#C9A84C] text-sm">◆</span>
    <div className="flex-1 h-px" style={{ background: "rgba(201,168,76,0.3)" }} />
  </div>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const { openModal } = useInquiryModal();

  return (
    <footer>
      {/* Top ornamental divider */}
      <div className="flex items-center gap-0 px-6 md:px-12" style={{ background: "#111111" }}>
        <div className="flex-1 h-px" style={{ background: "#2C2C2C" }} />
        <span className="px-4 text-[#C9A84C] text-sm">◆</span>
        <div className="flex-1 h-px" style={{ background: "#2C2C2C" }} />
      </div>

      {/* Main footer body */}
      <div className="px-6 md:px-12 py-20" style={{ background: "#111111" }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

            {/* Column 1 — Brand */}
            <div className="md:col-span-1" style={{ maxWidth: "300px" }}>
              <h3
                className="mb-4 text-[#F5F0E8]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "26px", fontWeight: 400 }}
              >
                Arika Handicrafts
              </h3>
              <p
                className="mb-3 leading-[1.9] text-[#D4CFC7]"
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: "14px", maxWidth: "260px" }}
              >
                Where Every Piece Tells a Story — Handcrafted in Jodhpur, Delivered to the World
              </p>
              <p
                className="mb-6 text-[#4A4A4A] uppercase"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "3px" }}
              >
                Est. in Jodhpur, Rajasthan · India
              </p>
              <div className="flex gap-3 mt-6">
                {[
                  { icon: <Instagram size={16} />, href: "https://instagram.com", label: "Instagram" },
                  { icon: <MessageCircle size={16} />, href: "https://wa.me/919876543210", label: "WhatsApp" },
                ].map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#D4CFC7] transition-all duration-200 hover:text-[#C9A84C] hover:border-[#C9A84C]"
                    style={{ border: "1px solid #3A3A3A" }}
                  >
                    {icon}
                  </a>
                ))}
              </div>

              {/* Wholesale / Export Prompt */}
              <div className="mt-10 p-5 border border-[#C9A84C] bg-[#1A1814]">
                <p className="text-[#C9A84C] text-[11px] uppercase tracking-[0.15em] mb-2 font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>For Exporters & Designers</p>
                <p className="text-[#D4CFC7] text-[13px] leading-relaxed mb-4">Are you a business, hotel, or interior designer? Get specialized pricing and custom designs.</p>
                <Link to="/export-inquiry" className="text-[11px] uppercase tracking-[0.1em] text-[#F5F0E8] border-b border-[#C9A84C] pb-1 hover:text-[#C9A84C] transition-colors inline-block" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Request Export Catalog →
                </Link>
              </div>
            </div>

            {/* Column 2 — Navigate */}
            <div>
              <ColHeading label="Navigate" />
              <nav className="flex flex-col gap-3">
                {NAV_LINKS.map((l) => <FooterLink key={l.label} label={l.label} href={l.href} />)}
              </nav>
            </div>

            {/* Column 3 — Collections */}
            <div>
              <ColHeading label="Collections" />
              <nav className="flex flex-col gap-3">
                {COLLECTION_LINKS.map((l) => <FooterLink key={l.label} label={l.label} href={l.href} />)}
              </nav>
            </div>

            {/* Column 4 — Get In Touch */}
            <div>
              <ColHeading label="Get In Touch" />
              <div className="flex flex-col gap-4">
                {[
                  { label: "EMAIL", value: "info@arikahandicrafts.com" },
                  { label: "LOCATION", value: "Jodhpur, Rajasthan, India" },
                  { label: "WHATSAPP", value: "+91 98765 43210" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p
                      className="text-[#4A4A4A] mb-1.5"
                      style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-[#F5F0E8]"
                      style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "14px" }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
                <button
                  onClick={openModal}
                  className="mt-2 flex items-center justify-center h-11 text-[12px] uppercase text-[#D4CFC7] hover:text-[#C9A84C] transition-all duration-200"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    letterSpacing: "3px",
                    border: "1px solid #3A3A3A",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C9A84C")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#3A3A3A")}
                  data-testid="button-footer-send-inquiry"
                >
                  Send Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stay Inspired — Newsletter redesign */}
      <OrnamentalDivider />
      <div className="px-6 md:px-12" style={{ background: "#0D0D0D", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left column */}
            <div>
              <p
                className="mb-4 uppercase text-[#C9A84C]"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", letterSpacing: "6px", fontWeight: 500 }}
              >
                Stay Inspired
              </p>
              <h2
                className="mb-5 text-[#F5F0E8]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "42px", fontWeight: 400, lineHeight: 1.2 }}
              >
                Stories from the Heart of Jodhpur
              </h2>
              <p
                className="mb-6 leading-[1.9] text-[#D4CFC7]"
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: "16px", maxWidth: "380px" }}
              >
                From master artisans to new arrivals — follow the journey of every piece from our workshop to your home.
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "New collection launches",
                  "Behind the scenes from Jodhpur",
                  "Export tips and artisan stories",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-[#D4CFC7]"
                    style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px" }}
                  >
                    · {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column */}
            <div>
              <form
                onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
                className="flex flex-col gap-4"
              >
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 text-[#F5F0E8] focus:outline-none italic"
                  style={{
                    height: "52px",
                    background: "#1A1A1A",
                    border: "1px solid rgba(245,240,232,0.25)",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "14px",
                  }}
                  data-testid="input-newsletter-email"
                />
                <button
                  type="submit"
                  className="w-full transition-colors duration-200"
                  style={{
                    height: "52px",
                    background: "#C9A84C",
                    color: "#111111",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "4px",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#b8943f")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#C9A84C")}
                  data-testid="button-newsletter-subscribe"
                >
                  Subscribe
                </button>
              </form>
              <p
                className="mt-4 text-center text-[#4A4A4A]"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px" }}
              >
                Join 2,400+ subscribers. No spam, ever.
              </p>
            </div>
          </div>
        </div>
      </div>
      <OrnamentalDivider />

      {/* Copyright bar */}
      <div
        className="px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-2"
        style={{ background: "#0D0D0D" }}
      >
        <p
          className="text-[#4A4A4A]"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px" }}
        >
          © {new Date().getFullYear()} Arika Handicrafts. All rights reserved.
        </p>
        <p
          className="text-[#C9A84C]/30"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", letterSpacing: "4px" }}
        >
          · · ·
        </p>
        <p
          className="text-[#4A4A4A] italic"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px" }}
        >
          Handcrafted with pride in India
        </p>
      </div>
    </footer>
  );
};

export default Footer;
