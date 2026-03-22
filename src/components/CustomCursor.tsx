import { useState, useEffect, useRef } from "react";

const CustomCursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const hover = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isHot = !!(t.closest("button, a, [role='button'], input, select, textarea, img"));
      setExpanded(isHot);
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", hover, { passive: true });

    const tick = () => {
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${pos.current.x - 14}px, ${pos.current.y - 14}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", hover);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="fixed top-0 left-0 z-[999] pointer-events-none rounded-full will-change-transform hidden md:block"
        style={{ width: 8, height: 8, background: "#1a1a1a", transition: "opacity 0.2s" }}
      />
      <div
        ref={ring}
        className="fixed top-0 left-0 z-[998] pointer-events-none rounded-full border border-foreground will-change-transform hidden md:block"
        style={{
          width: 28, height: 28,
          borderColor: "#1a1a1a",
          transition: "transform 0.08s ease, width 0.2s ease, height 0.2s ease, border-color 0.2s",
          ...(expanded ? { width: 28, height: 28, borderColor: "#C9A84C" } : {}),
        }}
      />
    </>
  );
};

export default CustomCursor;
