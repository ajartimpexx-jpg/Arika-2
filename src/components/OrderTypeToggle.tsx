import { useOrder } from "@/context/OrderContext";

const OrderTypeToggle = () => {
  const { orderType, setOrderType } = useOrder();

  return (
    <div className="flex justify-center w-full my-8 px-6">
      <div className="flex w-full md:w-auto md:min-w-[400px]">
        <button
          onClick={() => setOrderType("retail")}
          className={`w-1/2 py-3.5 uppercase tracking-[0.2em] transition-all duration-200 flex items-center justify-center text-center ${
            orderType === "retail"
              ? "bg-[#1C1C1C] text-[#F5F0E8] border-none shadow-md"
              : "bg-transparent border border-foreground/30 text-foreground/50 hover:text-foreground/80"
          }`}
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", fontWeight: orderType === "retail" ? 500 : 400 }}
        >
          Retail Order
        </button>
        <button
          onClick={() => setOrderType("export")}
          className={`w-1/2 py-3.5 uppercase tracking-[0.2em] transition-all duration-200 flex items-center justify-center text-center ${
            orderType === "export"
              ? "bg-[#1C1C1C] text-[#F5F0E8] border-none shadow-md"
              : "bg-transparent border border-foreground/30 text-foreground/50 hover:text-foreground/80 border-l-0"
          }`}
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", fontWeight: orderType === "export" ? 500 : 400 }}
        >
          Export / Bulk Order
        </button>
      </div>
    </div>
  );
};

export default OrderTypeToggle;
