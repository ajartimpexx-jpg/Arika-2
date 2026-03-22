import product1 from "@/assets/product-1.jpg";
import product1Side from "@/assets/product-1-side.png";
import product1Top from "@/assets/product-1-top.png";
import product1Life from "@/assets/product-1-lifestyle.png";
import product2 from "@/assets/product-2.jpg";
import product2Side from "@/assets/product-2-side.png";
import product2Top from "@/assets/product-2-top.png";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import product9 from "@/assets/product-9.jpg";
import product10 from "@/assets/product-10.jpg";
import product11 from "@/assets/product-11.jpg";
import product12 from "@/assets/product-12.jpg";
import catFurniture from "@/assets/cat-furniture.jpg";
import catDecor from "@/assets/cat-decor.jpg";
import catLighting from "@/assets/cat-lighting.jpg";
import catMetal from "@/assets/cat-metal.jpg";
import catWooden from "@/assets/cat-wooden.jpg";
import heroFurniture from "@/assets/hero-furniture.jpg";

export type CategorySlug = "furniture" | "home-decor" | "lighting" | "metal-iron" | "wooden-crafts";
export type RoomSlug = "all" | "living-room" | "bedroom" | "dining-room" | "seating" | "bar-furniture" | "outdoor" | "home-decor";

export const ROOM_TABS: { label: string; value: RoomSlug }[] = [
  { label: "ALL", value: "all" },
  { label: "LIVING ROOM", value: "living-room" },
  { label: "BEDROOM", value: "bedroom" },
  { label: "DINING ROOM", value: "dining-room" },
  { label: "SEATING", value: "seating" },
  { label: "BAR FURNITURE", value: "bar-furniture" },
  { label: "OUTDOOR", value: "outdoor" },
  { label: "HOME DECOR", value: "home-decor" },
];

export const ROOM_SUBCATEGORIES: Record<RoomSlug, string[]> = {
  all: [],
  "living-room": ["All", "Cabinets", "Sideboards", "Chest of Drawers", "TV Units", "Console Tables", "Side Tables", "Coffee Tables", "Trunks", "Wall Decor"],
  bedroom: ["All", "Beds", "Headboards", "Bedside Tables", "Wardrobes"],
  "dining-room": ["All", "Dining Tables", "Dining Chairs", "Dining Sets"],
  seating: ["All", "Sofas", "Chairs", "Stools", "Benches", "Ottomans", "Day Beds"],
  "bar-furniture": ["All", "Bar Tables", "Bar Stools", "Bar Counters", "Bar Cabinets", "Wine Holders"],
  outdoor: ["All", "Garden Tables", "Garden Chairs", "Lounge Sets", "Benches"],
  "home-decor": ["All", "Wall Decor", "Lighting", "Metal & Iron", "Wooden Crafts"],
};

export const MEGA_MENU_COLUMNS = [
  {
    heading: "LIVING ROOM",
    slug: "living-room" as RoomSlug,
    items: ["Cabinets", "Sideboards", "Chest of Drawers", "TV Units", "Console Tables", "Side & End Tables", "Coffee Tables", "Shelves & Racks", "Trunks", "Mirror & Wall Decor"],
  },
  {
    heading: "BEDROOM",
    slug: "bedroom" as RoomSlug,
    items: ["Beds & Bed Frames", "Headboards", "Bedside Tables", "Wardrobes"],
  },
  {
    heading: "DINING ROOM",
    slug: "dining-room" as RoomSlug,
    items: ["Dining Tables", "Dining Chairs", "Dining Sets"],
  },
  {
    heading: "SEATING",
    slug: "seating" as RoomSlug,
    items: ["Sofas & Armchairs", "Accent Chairs", "Stools", "Benches", "Poufs & Ottomans", "Day Beds"],
  },
  {
    heading: "MORE",
    slug: "bar-furniture" as RoomSlug,
    items: ["Bar Tables", "Bar Stools", "Bar Cabinets", "Wine Holders", "Garden Tables", "Garden Chairs", "Outdoor Lounge Sets"],
  },
];

export interface Category {
  name: string;
  slug: CategorySlug;
  image: string;
  description: string;
}

export interface RoomCategory {
  name: string;
  slug: RoomSlug;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  material: string;
  price: string;
  priceINR: string;
  image: string;
  thumbnails: string[];
  category: CategorySlug;
  room: RoomSlug;
  subcategory: string;
  description: string;
  longDescription: string;
  dimensions: { label: string; value: string }[];
  bestSeller?: boolean;
}

export const categories: Category[] = [
  { name: "Furniture", slug: "furniture", image: catFurniture, description: "Handcrafted tables, chairs, cabinets, and shelving built from the finest Sheesham, Mango, and reclaimed woods." },
  { name: "Home Decor", slug: "home-decor", image: catDecor, description: "Artisan-made decorative objects, mirrors, vases, and accent pieces that bring warmth and character." },
  { name: "Lighting", slug: "lighting", image: catLighting, description: "Hand-forged pendant lights, table lamps, and lanterns crafted from iron, brass, and mixed metals." },
  { name: "Metal & Iron", slug: "metal-iron", image: catMetal, description: "Wrought iron wall art, candle holders, and sculptural pieces forged with traditional techniques." },
  { name: "Wooden Crafts", slug: "wooden-crafts", image: catWooden, description: "Carved boxes, trays, and wooden accessories celebrating Jodhpur's rich woodworking heritage." },
];

export const roomCategories: RoomCategory[] = [
  { name: "Living Room", slug: "living-room", image: catFurniture },
  { name: "Bedroom", slug: "bedroom", image: catWooden },
  { name: "Dining Room", slug: "dining-room", image: catDecor },
  { name: "Seating", slug: "seating", image: heroFurniture },
  { name: "Bar Furniture", slug: "bar-furniture", image: catMetal },
  { name: "Home Decor", slug: "home-decor", image: catLighting },
];

export const products: Product[] = [
  {
    id: "p1", slug: "carved-side-table", sku: "AHC-001",
    name: "Carved Side Table", material: "Sheesham Wood", price: "420", priceINR: "34,860",
    image: product1, thumbnails: [product1, product1Side, product1Top, product1Life],
    category: "furniture", room: "living-room", subcategory: "Side Tables",
    description: "A masterpiece of Jodhpur woodcraft, hand-carved with geometric Rajasthani motifs on solid Sheesham.",
    longDescription: "Each Carved Side Table is shaped by our master artisans in Jodhpur using techniques passed down over generations. The solid Sheesham wood is sustainably sourced, then painstakingly hand-carved with intricate geometric patterns inspired by Rajput palace architecture. The natural grain of the wood is preserved under a hand-rubbed oil finish, ensuring durability and a warm, living quality that deepens with age.",
    dimensions: [{ label: "Height", value: "55 cm" }, { label: "Diameter", value: "45 cm" }, { label: "Weight", value: "8 kg" }],
    bestSeller: true,
  },
  {
    id: "p2", slug: "industrial-console", sku: "AHC-002",
    name: "Industrial Console", material: "Iron & Wood", price: "680", priceINR: "56,440",
    image: product2, thumbnails: [product2, product2Side, product2Top, product11],
    category: "furniture", room: "living-room", subcategory: "Console Tables",
    description: "Raw iron meets reclaimed wood in this statement console — industrial character with artisan soul.",
    longDescription: "The Industrial Console brings together hand-forged iron and solid mango wood in a design that celebrates contrast. Each iron element is individually shaped by blacksmiths, then assembled with precision joinery. The wood top is sourced from single-slab mango wood and finished with a walnut stain, creating a surface both beautiful and resilient. Ideal for entryways and living spaces that demand character.",
    dimensions: [{ label: "Height", value: "82 cm" }, { label: "Width", value: "120 cm" }, { label: "Depth", value: "35 cm" }],
    bestSeller: true,
  },
  {
    id: "p4", slug: "heritage-bookshelf", sku: "AHC-003",
    name: "Heritage Bookshelf", material: "Solid Wood", price: "1,250", priceINR: "1,03,750",
    image: product4, thumbnails: [product4, product1, product11, product2],
    category: "furniture", room: "living-room", subcategory: "Shelves & Racks",
    description: "Five generous shelves in hand-finished solid wood with carved pilaster details — a heirloom-quality bookshelf.",
    longDescription: "The Heritage Bookshelf is a statement of permanence. Built from solid Sheesham wood with hand-carved pilaster columns and a subtle antiqued finish, this piece ages gracefully with your library. Adjustable middle shelves accommodate large art books and collections of any size. Each unit is assembled using traditional mortise-and-tenon joinery — no metal fasteners, no shortcuts.",
    dimensions: [{ label: "Height", value: "185 cm" }, { label: "Width", value: "90 cm" }, { label: "Depth", value: "32 cm" }],
    bestSeller: true,
  },
  {
    id: "p6", slug: "woven-dining-chair", sku: "AHC-004",
    name: "Woven Dining Chair", material: "Teak & Rope", price: "290", priceINR: "24,070",
    image: product6, thumbnails: [product6, product3, product9, product12],
    category: "furniture", room: "dining-room", subcategory: "Dining Chairs",
    description: "Teak-framed dining chair with hand-woven natural rope seat — relaxed elegance for every table.",
    longDescription: "Our master weavers hand-knot each seat from natural jute rope in a traditional herringbone pattern. The solid teak frame is steam-bent into gentle curves, then oil-finished to a warm honey tone. Suitable for both indoor and covered outdoor dining. Sold individually or as sets of 2, 4, or 6. Custom frame finishes available on request.",
    dimensions: [{ label: "Seat Height", value: "46 cm" }, { label: "Width", value: "52 cm" }, { label: "Depth", value: "55 cm" }],
    bestSeller: true,
  },
  {
    id: "p7", slug: "turned-coffee-table", sku: "AHC-005",
    name: "Turned Coffee Table", material: "Mango Wood", price: "580", priceINR: "48,140",
    image: product7, thumbnails: [product7, product1, product4, product2],
    category: "furniture", room: "living-room", subcategory: "Coffee Tables",
    description: "Hand-turned mango wood legs lift a slab top with dramatic grain — a centrepiece for any living room.",
    longDescription: "The Turned Coffee Table showcases mango wood's spectacular figuring. Each top is cut from a single slab and allowed to air-dry before our craftsmen shape the hand-turned legs on traditional foot-powered lathes. The result is a piece unique to itself — no two tables share the same grain pattern. A light satin lacquer seals the surface while allowing the wood's natural warmth to radiate.",
    dimensions: [{ label: "Height", value: "42 cm" }, { label: "Width", value: "110 cm" }, { label: "Depth", value: "60 cm" }],
  },
  {
    id: "p11", slug: "colonial-storage-chest", sku: "AHC-006",
    name: "Colonial Storage Chest", material: "Wood & Iron", price: "890", priceINR: "73,870",
    image: product11, thumbnails: [product11, product4, product2, product7],
    category: "furniture", room: "living-room", subcategory: "Trunks",
    description: "A robust storage trunk with hand-hammered iron straps and a lined interior — function meeting grandeur.",
    longDescription: "Inspired by the trunks that accompanied colonial-era trade caravans from Jodhpur, this chest is built from solid reclaimed wood reinforced with hand-hammered iron straps and corner brackets. The interior is lined with hand-block-printed cotton fabric from a local Jodhpur printer. A solid brass latch and hinges complete the piece. Functions beautifully as a coffee table, blanket chest, or entryway statement.",
    dimensions: [{ label: "Height", value: "50 cm" }, { label: "Width", value: "100 cm" }, { label: "Depth", value: "48 cm" }],
  },
  {
    id: "p8", slug: "baroque-mirror", sku: "AHC-007",
    name: "Baroque Mirror", material: "Carved Wood", price: "460", priceINR: "38,180",
    image: product8, thumbnails: [product8, product5, product3, product9],
    category: "home-decor", room: "home-decor", subcategory: "Wall Decor",
    description: "An ornate hand-carved wood frame mirror with European baroque motifs reinterpreted in Rajasthani craft.",
    longDescription: "Our artisans in Jodhpur have spent decades mastering European decorative carving alongside traditional Indian motifs. The Baroque Mirror merges both worlds — its frame is carved from solid mango wood into flowing acanthus leaves and symmetrical scrollwork, then gilded with an antique gold finish. The high-quality beveled glass creates a luxurious reflection. Ready to hang portrait or landscape.",
    dimensions: [{ label: "Height", value: "120 cm" }, { label: "Width", value: "80 cm" }, { label: "Mirror", value: "70×50 cm" }],
  },
  {
    id: "p5b", slug: "mandala-wall-art", sku: "AHC-008",
    name: "Mandala Wall Art", material: "Wrought Iron", price: "340", priceINR: "28,220",
    image: product5, thumbnails: [product5, product8, product10, product3],
    category: "home-decor", room: "home-decor", subcategory: "Metal & Iron",
    description: "A large-format wrought iron mandala for the wall — each petal individually forged and assembled by hand.",
    longDescription: "This mandala is assembled from over 80 individually hand-forged iron petals, leaves, and geometric elements, welded together into a cohesive geometric composition. The iron is treated with a dark graphite patina and a clear lacquer topcoat to protect against rust. A single sturdy hanging bracket is welded at the back. Available in 60 cm, 90 cm, and 120 cm diameters.",
    dimensions: [{ label: "Diameter", value: "90 cm" }, { label: "Depth", value: "4 cm" }, { label: "Weight", value: "6 kg" }],
    bestSeller: true,
  },
  {
    id: "p3", slug: "artisan-table-lamp", sku: "AHC-009",
    name: "Artisan Table Lamp", material: "Hammered Metal", price: "195", priceINR: "16,185",
    image: product3, thumbnails: [product3, product9, product12, product5],
    category: "lighting", room: "home-decor", subcategory: "Lighting",
    description: "A hand-hammered metal table lamp that casts warm dappled light through its pierced shade.",
    longDescription: "Each shade is hammered by hand from a single sheet of brass, then pierced with a geometric star pattern. When lit, the lamp casts intricate light patterns across walls and ceilings, transforming any room into an intimate sanctuary. The base is turned from solid mango wood with a natural oil finish. E27 bulb socket, compatible with all standard bulbs. Shade diameter 28 cm.",
    dimensions: [{ label: "Height", value: "45 cm" }, { label: "Shade Ø", value: "28 cm" }, { label: "Base Ø", value: "14 cm" }],
    bestSeller: true,
  },
  {
    id: "p9", slug: "cage-pendant-light", sku: "AHC-010",
    name: "Cage Pendant Light", material: "Copper & Iron", price: "275", priceINR: "22,825",
    image: product9, thumbnails: [product9, product3, product12, product5],
    category: "lighting", room: "home-decor", subcategory: "Lighting",
    description: "An open-cage pendant in copper and iron — industrial elegance for dining rooms and kitchens.",
    longDescription: "The Cage Pendant Light is hand-fabricated from copper pipe and iron wire, forming an open geometric cage around the bulb. The copper develops a natural patina over time, adding character. Supplied with 1.5m braided cotton cord in black. E27 socket, max 60W. Available in single pendant or cluster of 3 or 5 — contact us for cluster pricing. Ceiling rose included.",
    dimensions: [{ label: "Height (shade)", value: "28 cm" }, { label: "Diameter", value: "22 cm" }, { label: "Cord", value: "150 cm" }],
  },
  {
    id: "p12", slug: "studio-desk-lamp", sku: "AHC-011",
    name: "Studio Desk Lamp", material: "Brass & Wood", price: "210", priceINR: "17,430",
    image: product12, thumbnails: [product12, product3, product9, product7],
    category: "lighting", room: "home-decor", subcategory: "Lighting",
    description: "A precision adjustable desk lamp in solid brass and teak — the designer's lamp, reimagined by artisans.",
    longDescription: "The Studio Desk Lamp features a fully articulating arm in polished brass with a weighted solid teak base. The angled shade is spun from a single piece of brass sheet and finished in a satin gold lacquer. The arm and shade can be positioned in 180° of movement, making it equally suited to reading, drawing, or task lighting. E14 bulb socket included.",
    dimensions: [{ label: "Height (max)", value: "50 cm" }, { label: "Base Ø", value: "16 cm" }, { label: "Shade Ø", value: "15 cm" }],
  },
  {
    id: "p5", slug: "iron-mandala-sculpture", sku: "AHC-012",
    name: "Iron Mandala Sculpture", material: "Wrought Iron", price: "340", priceINR: "28,220",
    image: product5, thumbnails: [product5, product8, product10, product2],
    category: "metal-iron", room: "home-decor", subcategory: "Metal & Iron",
    description: "A sculptural wrought iron mandala — museum-quality wall art forged in Jodhpur's ancient iron tradition.",
    longDescription: "Iron working in Jodhpur dates back to the Rajput era. Our blacksmiths carry that lineage into every piece they forge. The Iron Mandala Sculpture begins as raw iron bar stock, heated and hand-hammered into intricate petal shapes, then welded into a geometric mandala composition. Each piece is unique — the hand-hammering creates subtle variation across the surface. Finished in a matte black powder coat.",
    dimensions: [{ label: "Diameter", value: "75 cm" }, { label: "Depth", value: "5 cm" }, { label: "Weight", value: "4.5 kg" }],
  },
  {
    id: "p10", slug: "scroll-wine-rack", sku: "AHC-013",
    name: "Scroll Wine Rack", material: "Wrought Iron", price: "185", priceINR: "15,355",
    image: product10, thumbnails: [product10, product5, product2, product3],
    category: "metal-iron", room: "bar-furniture", subcategory: "Wine Holders",
    description: "A hand-forged scrollwork wine rack for 6 bottles — beautiful wrought iron with an organic, flowing form.",
    longDescription: "The Scroll Wine Rack is a study in controlled chaos — hand-forged iron scrolls that appear organic yet hold your wine bottles with perfect security. Each scroll is individually formed over an anvil and welded by hand. The rack holds 6 standard wine bottles horizontally. Finished in a dark bronze powder coat. Can be wall-mounted or used freestanding.",
    dimensions: [{ label: "Height", value: "38 cm" }, { label: "Width", value: "44 cm" }, { label: "Depth", value: "22 cm" }],
  },
  {
    id: "p11b", slug: "heritage-trunk", sku: "AHC-014",
    name: "Heritage Trunk", material: "Sheesham & Brass", price: "650", priceINR: "53,950",
    image: product11, thumbnails: [product11, product4, product7, product1],
    category: "wooden-crafts", room: "living-room", subcategory: "Trunks",
    description: "A hand-carved Sheesham trunk with brass fittings — a Rajasthani heirloom for the modern home.",
    longDescription: "The Heritage Trunk is one of our most celebrated pieces. Hand-carved from a single large block of Sheesham wood, its exterior is decorated with our signature Jodhpur geometric carving. The interior is lined with hand-loomed cotton. Solid brass corner guards, hinges, and lock mechanism complete the piece. Designed to be passed down through generations.",
    dimensions: [{ label: "Height", value: "48 cm" }, { label: "Width", value: "90 cm" }, { label: "Depth", value: "45 cm" }],
  },
  {
    id: "p7b", slug: "carved-round-table", sku: "AHC-015",
    name: "Carved Round Table", material: "Mango Wood", price: "380", priceINR: "31,540",
    image: product7, thumbnails: [product7, product1, product11, product4],
    category: "wooden-crafts", room: "living-room", subcategory: "Coffee Tables",
    description: "A round mango wood table with a deeply carved floral medallion on the top — Rajasthani craft at its finest.",
    longDescription: "This round coffee table begins with a slab of mango wood from our sustainable forest cooperative in Rajasthan. Our craftsmen spend up to 3 days carving the intricate floral medallion on the table top by hand using traditional chisels. The pedestal base is also hand-carved with a twisted column design. Finished in a natural beeswax polish that is food-safe and easy to maintain.",
    dimensions: [{ label: "Height", value: "45 cm" }, { label: "Diameter", value: "70 cm" }, { label: "Weight", value: "12 kg" }],
  },
  {
    id: "p8b", slug: "ornate-wall-mirror", sku: "AHC-016",
    name: "Ornate Wall Mirror", material: "Hand-carved Wood", price: "460", priceINR: "38,180",
    image: product8, thumbnails: [product8, product5, product7, product3],
    category: "wooden-crafts", room: "home-decor", subcategory: "Wall Decor",
    description: "An ornately hand-carved wooden frame mirror — Jodhpur woodcraft tradition in a contemporary scale.",
    longDescription: "Our Ornate Wall Mirror features a hand-carved solid mango wood frame with a deeply carved scrollwork border, finished in an aged antique white. The high-clarity mirror glass is beveled around its edges for a refined finish. Available in three finish options: Antique White, Natural Mango, and Ebony Black.",
    dimensions: [{ label: "Height", value: "100 cm" }, { label: "Width", value: "70 cm" }, { label: "Mirror", value: "55×40 cm" }],
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);

export const getProductsByCategory = (slug: CategorySlug): Product[] =>
  products.filter((p) => p.category === slug);

export const getProductsByRoom = (room: RoomSlug): Product[] =>
  room === "all" ? products : products.filter((p) => p.room === room);

export const getBestSellers = (): Product[] =>
  products.filter((p) => p.bestSeller);

export const getSimilarProducts = (product: Product, count = 4): Product[] =>
  products.filter((p) => p.id !== product.id && p.room === product.room).slice(0, count);
