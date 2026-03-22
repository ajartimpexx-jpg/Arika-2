import { createContext, useContext, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type InquiryModalContextType = {
  openModal: () => void;
};

const InquiryModalContext = createContext<InquiryModalContextType>({ openModal: () => {} });

export const useInquiryModal = () => useContext(InquiryModalContext);

const SUBJECTS = [
  "General Inquiry",
  "Bulk / Export Order",
  "Custom Piece Request",
  "Price Quote",
  "Other",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "48px",
  border: "1px solid rgba(201,168,76,0.4)",
  background: "#fff",
  padding: "0 16px",
  fontSize: "14px",
  fontFamily: "'Jost', sans-serif",
  color: "#1C1C1C",
  outline: "none",
  borderRadius: "2px",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Jost', sans-serif",
  fontSize: "10px",
  letterSpacing: "3px",
  textTransform: "uppercase",
  color: "#1C1C1C",
  opacity: 0.7,
  marginBottom: "8px",
};

const InquiryModalInner = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => setSubmitted(false), 400);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <InquiryModalContext.Provider value={{ openModal: () => { setOpen(true); setSubmitted(false); } }}>
      {/* Portal content is rendered inline, the provider wraps the whole tree */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4 md:items-center"
            style={{ background: "rgba(0,0,0,0.72)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="relative w-full bg-[#F5F0E8] overflow-hidden"
              style={{
                maxWidth: "560px",
                borderRadius: "4px",
                borderTop: "2px solid #C9A84C",
                maxHeight: "92vh",
                overflowY: "auto",
              }}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
            >
              {/* Mobile drag handle */}
              <div className="flex justify-center pt-3 pb-0 md:hidden">
                <div className="w-10 h-1 rounded-full bg-[#1C1C1C]/20" />
              </div>

              <div className="px-8 pt-6 pb-8 md:px-12 md:pt-8 md:pb-10" style={{ padding: undefined }}>
                <div className="px-7 pt-7 pb-8 md:px-12 md:pt-10 md:pb-12">
                  {/* Close button */}
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-[#1C1C1C]/60 hover:text-[#1C1C1C] transition-colors"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    data-testid="button-modal-close"
                  >
                    <X size={18} />
                  </button>

                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="text-3xl mb-4">✦</div>
                      <p
                        className="text-[#C9A84C] text-[10px] uppercase mb-3"
                        style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "5px" }}
                      >
                        Thank You
                      </p>
                      <h3
                        className="text-[#1C1C1C] mb-3"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 400 }}
                      >
                        Inquiry Received
                      </h3>
                      <p
                        className="text-[#1C1C1C]/60 leading-[1.8]"
                        style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "13px" }}
                      >
                        We will get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setOpen(false)}
                        className="mt-8 px-8 py-3 text-[11px] uppercase text-[#F5F0E8] bg-[#1C1C1C] hover:bg-[#C9A84C] transition-colors duration-200"
                        style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "3px" }}
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Header */}
                      <p
                        className="mb-2 text-[#C9A84C] uppercase"
                        style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "5px" }}
                      >
                        Get In Touch
                      </p>
                      <h2
                        className="text-[#1C1C1C] mb-3"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "32px", fontWeight: 400, lineHeight: 1.2 }}
                      >
                        Send Us an Inquiry
                      </h2>
                      <p
                        className="text-[#1C1C1C]/65 mb-7 leading-[1.8]"
                        style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "13px" }}
                      >
                        We respond within 24 hours. Whether you need a single piece or a full container — we are here.
                      </p>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Name */}
                        <div>
                          <label style={labelStyle}>Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Your full name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            style={inputStyle}
                            onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
                            data-testid="input-inquiry-name"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label style={labelStyle}>Email</label>
                          <input
                            type="email"
                            required
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            style={inputStyle}
                            onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
                            data-testid="input-inquiry-email"
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label style={{ ...labelStyle }}>
                            Contact Number{" "}
                            <em style={{ fontStyle: "italic", opacity: 0.4, letterSpacing: "normal", textTransform: "none", fontSize: "11px" }}>
                              (Optional)
                            </em>
                          </label>
                          <input
                            type="tel"
                            placeholder="+91 or international number"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            style={inputStyle}
                            onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
                            data-testid="input-inquiry-phone"
                          />
                        </div>

                        {/* Subject */}
                        <div>
                          <label style={labelStyle}>Subject</label>
                          <select
                            required
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            style={{ ...inputStyle, cursor: "pointer", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231C1C1C' stroke-opacity='0.4' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "calc(100% - 16px) center", paddingRight: "40px" }}
                            onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
                            data-testid="select-inquiry-subject"
                          >
                            <option value="" disabled>Select a subject</option>
                            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>

                        {/* Message */}
                        <div>
                          <label style={labelStyle}>Message</label>
                          <textarea
                            required
                            placeholder="Tell us about what you are looking for..."
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            style={{ ...inputStyle, height: "auto", minHeight: "120px", padding: "14px 16px", resize: "vertical" }}
                            onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
                            data-testid="textarea-inquiry-message"
                          />
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          className="w-full h-[52px] text-[11px] uppercase text-[#F5F0E8] transition-colors duration-200"
                          style={{
                            fontFamily: "'Jost', sans-serif",
                            letterSpacing: "3px",
                            background: "#1C1C1C",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#C9A84C")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "#1C1C1C")}
                          data-testid="button-inquiry-submit"
                        >
                          Send Inquiry
                        </button>

                        <p
                          className="text-center text-[#1C1C1C]/40"
                          style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px" }}
                        >
                          🔒 Your information is private and never shared
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </InquiryModalContext.Provider>
  );
};

export const InquiryModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }, 400);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <InquiryModalContext.Provider value={{ openModal: () => { setOpen(true); setSubmitted(false); } }}>
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-[9999] flex items-end justify-center md:items-center px-0 md:px-4"
            style={{ background: "rgba(0,0,0,0.72)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="relative w-full md:max-w-[560px] bg-[#F5F0E8] overflow-hidden"
              style={{
                borderRadius: "4px 4px 0 0",
                borderTop: "2px solid #C9A84C",
                maxHeight: "95vh",
                overflowY: "auto",
                width: "95%",
              }}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
            >
              {/* Mobile drag handle */}
              <div className="flex justify-center pt-3 md:hidden">
                <div className="w-10 h-1 rounded-full bg-[#1C1C1C]/20" />
              </div>

              <div className="px-7 pt-7 pb-8 md:px-12 md:pt-10 md:pb-12">
                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-[#1C1C1C]/50 hover:text-[#1C1C1C] transition-colors"
                  data-testid="button-modal-close"
                >
                  <X size={18} />
                </button>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="text-3xl mb-4 text-[#C9A84C]">✦</div>
                    <p
                      className="text-[#C9A84C] uppercase mb-3"
                      style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "5px" }}
                    >
                      Thank You
                    </p>
                    <h3
                      className="text-[#1C1C1C] mb-3"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 400 }}
                    >
                      Inquiry Received
                    </h3>
                    <p
                      className="text-[#1C1C1C]/60 leading-[1.8]"
                      style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "13px" }}
                    >
                      We will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setOpen(false)}
                      className="mt-8 px-8 py-3 text-[11px] uppercase text-[#F5F0E8] bg-[#1C1C1C] hover:bg-[#C9A84C] transition-colors duration-200"
                      style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "3px" }}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <p
                      className="mb-2 text-[#C9A84C] uppercase"
                      style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "5px" }}
                    >
                      Get In Touch
                    </p>
                    <h2
                      className="text-[#1C1C1C] mb-3"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "32px", fontWeight: 400, lineHeight: 1.2 }}
                    >
                      Send Us an Inquiry
                    </h2>
                    <p
                      className="text-[#1C1C1C]/65 mb-7 leading-[1.8]"
                      style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "13px" }}
                    >
                      We respond within 24 hours. Whether you need a single piece or a full container — we are here.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div>
                        <label style={labelStyle}>Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          style={inputStyle}
                          onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
                          data-testid="input-inquiry-name"
                        />
                      </div>

                      <div>
                        <label style={labelStyle}>Email</label>
                        <input
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          style={inputStyle}
                          onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
                          data-testid="input-inquiry-email"
                        />
                      </div>

                      <div>
                        <label style={labelStyle}>
                          Contact Number{" "}
                          <em style={{ fontStyle: "italic", opacity: 0.4, letterSpacing: "normal", textTransform: "none", fontSize: "11px" }}>
                            (Optional)
                          </em>
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 or international number"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          style={inputStyle}
                          onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
                          data-testid="input-inquiry-phone"
                        />
                      </div>

                      <div>
                        <label style={labelStyle}>Subject</label>
                        <select
                          required
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          style={{
                            ...inputStyle,
                            cursor: "pointer",
                            appearance: "none",
                            WebkitAppearance: "none",
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231C1C1C' stroke-opacity='0.4' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "calc(100% - 16px) center",
                            paddingRight: "40px",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
                          data-testid="select-inquiry-subject"
                        >
                          <option value="" disabled>Select a subject</option>
                          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      <div>
                        <label style={labelStyle}>Message</label>
                        <textarea
                          required
                          placeholder="Tell us about what you are looking for..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          style={{ ...inputStyle, height: "auto", minHeight: "120px", padding: "14px 16px", resize: "vertical" }}
                          onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
                          data-testid="textarea-inquiry-message"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full h-[52px] text-[11px] uppercase text-[#F5F0E8] transition-colors duration-200"
                        style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "3px", background: "#1C1C1C" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#C9A84C")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#1C1C1C")}
                        data-testid="button-inquiry-submit"
                      >
                        Send Inquiry
                      </button>

                      <p
                        className="text-center text-[#1C1C1C]/40"
                        style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px" }}
                      >
                        🔒 Your information is private and never shared
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </InquiryModalContext.Provider>
  );
};

export default InquiryModalProvider;
