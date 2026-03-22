interface ArikaLogoProps {
  variant?: "stacked" | "horizontal" | "icon";
  size?: "sm" | "md" | "lg";
  color?: "dark" | "light";
  className?: string;
  opacity?: number;
}

const EMBLEM_SIZES = { sm: 24, md: 32, lg: 90 };

const ArikaEmblem = ({ size, color }: { size: number; color: "dark" | "light" }) => {
  const c = color === "light" ? "#F5F0E8" : "#1a1a1a";
  const cx = 50, cy = 50;
  const outerR = 46, ringR = 41, starR = 36, dashR = 23, centerR = 4, innerHollow = 2;

  const spokes = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45 * Math.PI) / 180;
    return {
      x1: cx, y1: cy,
      x2: cx + outerR * Math.sin(angle),
      y2: cy - outerR * Math.cos(angle),
    };
  });

  const sq1 = `${cx},${cy - starR} ${cx + starR},${cy} ${cx},${cy + starR} ${cx - starR},${cy}`;
  const d = starR * Math.cos(Math.PI / 4);
  const sq2 = `${cx + d},${cy - d} ${cx + d},${cy + d} ${cx - d},${cy + d} ${cx - d},${cy - d}`;

  const triangles = [
    `${cx - 3},${cy - outerR + 6} ${cx + 3},${cy - outerR + 6} ${cx},${cy - outerR + 1}`,
    `${cx + outerR - 6},${cy - 3} ${cx + outerR - 6},${cy + 3} ${cx + outerR - 1},${cy}`,
    `${cx - 3},${cy + outerR - 6} ${cx + 3},${cy + outerR - 6} ${cx},${cy + outerR - 1}`,
    `${cx - outerR + 6},${cy - 3} ${cx - outerR + 6},${cy + 3} ${cx - outerR + 1},${cy}`,
  ];

  const diagR = ringR;
  const diagCircles = [
    { x: cx + diagR * Math.cos(Math.PI / 4), y: cy - diagR * Math.sin(Math.PI / 4) },
    { x: cx + diagR * Math.cos(Math.PI / 4), y: cy + diagR * Math.sin(Math.PI / 4) },
    { x: cx - diagR * Math.cos(Math.PI / 4), y: cy + diagR * Math.sin(Math.PI / 4) },
    { x: cx - diagR * Math.cos(Math.PI / 4), y: cy - diagR * Math.sin(Math.PI / 4) },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {spokes.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={c} strokeWidth="0.5" opacity="0.1" />
      ))}
      <circle cx={cx} cy={cy} r={outerR} stroke={c} strokeWidth="0.8" opacity="0.7" fill="none" />
      <circle cx={cx} cy={cy} r={ringR} stroke={c} strokeWidth="0.5" opacity="0.4" fill="none" />
      <circle cx={cx} cy={cy} r={dashR} stroke={c} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.25" fill="none" />
      <polygon points={sq1} fill={c} opacity="0.18" />
      <polygon points={sq2} fill={c} opacity="0.18" />
      <polygon points={sq1} fill="none" stroke={c} strokeWidth="0.6" opacity="0.55" />
      <polygon points={sq2} fill="none" stroke={c} strokeWidth="0.6" opacity="0.55" />
      {triangles.map((pts, i) => <polygon key={i} points={pts} fill={c} opacity="0.65" />)}
      {diagCircles.map((dc, i) => <circle key={i} cx={dc.x} cy={dc.y} r="2.2" fill={c} opacity="0.55" />)}
      <circle cx={cx} cy={cy} r={centerR} fill={c} opacity="0.85" />
      <circle cx={cx} cy={cy} r={innerHollow} fill="none" stroke={color === "light" ? "#1a1a1a" : "#F5F0E8"} strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
};

const Diamond = ({ color }: { color: "dark" | "light" }) => {
  const c = color === "light" ? "#F5F0E8" : "#1a1a1a";
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <polygon points="4,0 8,4 4,8 0,4" fill={c} opacity="0.5" />
    </svg>
  );
};

const ArikaLogo = ({ variant = "horizontal", size = "md", color = "dark", className = "", opacity }: ArikaLogoProps) => {
  const textColor = color === "light" ? "#F5F0E8" : "#1a1a1a";
  const style = opacity !== undefined ? { opacity } : undefined;

  if (variant === "icon") {
    const s = size === "sm" ? 24 : size === "lg" ? 90 : 48;
    return (
      <span style={style} className={className}>
        <ArikaEmblem size={s} color={color} />
      </span>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center ${className}`} style={style}>
        <ArikaEmblem size={90} color={color} />
        <div className="mt-5" style={{ color: textColor, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "52px", letterSpacing: "14px", fontWeight: 400, textTransform: "uppercase", lineHeight: 1 }}>
          ARIKA
        </div>
        <div className="flex items-center gap-3 mt-3">
          <span style={{ display: "block", height: "1px", width: "40px", background: "#4A4A4A" }} />
          <Diamond color={color} />
          <span style={{ display: "block", height: "1px", width: "40px", background: "#4A4A4A" }} />
        </div>
        <div className="mt-2" style={{ color: "#C9A84C", fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "6px", textTransform: "uppercase", fontWeight: 500 }}>
          HANDICRAFTS
        </div>
        <div className="mt-1" style={{ color: "#4A4A4A", fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase" }}>
          JODHPUR &nbsp;·&nbsp; INDIA
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`} style={style}>
      <ArikaEmblem size={EMBLEM_SIZES[size]} color={color} />
      <div style={{ color: textColor, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", letterSpacing: "6px", fontWeight: 400, textTransform: "uppercase" }}>
        ARIKA
      </div>
      <div style={{ width: "1px", height: "24px", background: "#4A4A4A" }} />
      <div className="flex flex-col justify-center">
        <div style={{ color: "#C9A84C", fontFamily: "'Jost', sans-serif", fontSize: "8px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 500 }}>
          HANDICRAFTS
        </div>
        <div style={{ color: "#4A4A4A", fontFamily: "'Jost', sans-serif", fontSize: "7px", letterSpacing: "2px", textTransform: "uppercase" }}>
          JODHPUR · INDIA
        </div>
      </div>
    </div>
  );
};

export default ArikaLogo;
