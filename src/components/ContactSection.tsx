import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, MapPin, Mail, Phone } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry. We'll respond within 24 hours!");
    setForm({ name: "", email: "", whatsapp: "", subject: "", message: "" });
  };

  const inputClass = "w-full bg-white border border-[#D1D1D1] px-4 py-3.5 text-[#1C1C1C] text-sm placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#C9A84C] transition-colors min-h-[48px]";
  const labelClass = "block text-[10px] uppercase tracking-[0.18em] text-[#4A4A4A] mb-2";

  return (
    <section id="contact" className="bg-[#F5F0E8] px-6 md:px-12" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column */}
          <motion.div
            className="space-y-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
          >
            <div>
              <p className="text-[#4A4A4A] uppercase tracking-[0.25em] text-[10px] mb-5" style={{ fontFamily: "'Jost', sans-serif" }}>
                Get in Touch
              </p>
              <h2 className="font-serif text-5xl md:text-6xl font-light text-[#1C1C1C] leading-tight mb-6">
                Inquire Now
              </h2>
              <p className="text-[#2C2C2C] leading-[1.9] max-w-[420px] text-sm">
                Whether you're an interior designer sourcing for a project, a retailer looking for wholesale, or a homeowner seeking a statement piece — we'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div>
                <p className={labelClass}><Mail size={11} className="inline mr-2 mb-0.5" />Email</p>
                <p className="text-foreground text-sm">info@arikahandicrafts.com</p>
              </div>
              <div>
                <p className={labelClass}><MapPin size={11} className="inline mr-2 mb-0.5" />Location</p>
                <p className="text-foreground text-sm">Jodhpur, Rajasthan, India</p>
              </div>
              <div>
                <p className={labelClass}><Phone size={11} className="inline mr-2 mb-0.5" />Phone</p>
                <p className="text-foreground text-sm">+91 98765 43210</p>
              </div>
            </div>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-[#111111] text-[#111111] text-[11px] uppercase tracking-[0.15em] hover:bg-[#111111] hover:text-[#F5F0E8] transition-all duration-300 min-h-[48px]"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              <MessageCircle size={15} />
              WhatsApp Us
            </a>
          </motion.div>

          {/* Right column — form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0, 0, 1] }}
          >
            <div>
              <label className={labelClass}>Name</label>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                data-testid="input-contact-name"
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                data-testid="input-contact-email"
              />
            </div>
            <div>
              <label className={labelClass}>WhatsApp Number</label>
              <input
                type="tel"
                placeholder="+1 555 000 0000"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className={inputClass}
                data-testid="input-contact-whatsapp"
              />
            </div>
            <div>
              <label className={labelClass}>Subject</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={inputClass + " appearance-none cursor-pointer"}
                data-testid="select-contact-subject"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="export">Bulk / Export Order</option>
                <option value="custom">Custom Piece</option>
                <option value="quote">Price Quote</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Message</label>
              <textarea
                required
                rows={5}
                placeholder="Tell us about your project or inquiry..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={inputClass + " resize-y min-h-[140px]"}
                style={{ height: "auto" }}
                data-testid="textarea-contact-message"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#111111] text-[#F5F0E8] text-[11px] uppercase tracking-[0.2em] py-4 min-h-[52px] hover:bg-[#2C2C2C] transition-colors duration-300"
                style={{ fontFamily: "'Jost', sans-serif" }}
                data-testid="button-contact-submit"
              >
                Send Inquiry
              </button>
              <p className="mt-3 text-center text-[11px] italic text-[#4A4A4A]" style={{ fontFamily: "'Jost', sans-serif" }}>
                We respond within 24 hours
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
