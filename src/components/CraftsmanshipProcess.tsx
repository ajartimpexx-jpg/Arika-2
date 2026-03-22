import { motion } from "framer-motion";
import { TreePine, Hammer, Paintbrush, PackageCheck } from "lucide-react";

const steps = [
  {
    icon: TreePine,
    num: "01",
    title: "Wood Selection",
    desc: "We source only premium Sheesham, Teak, and Mango wood from certified suppliers.",
  },
  {
    icon: Hammer,
    num: "02",
    title: "Hand Carving",
    desc: "Skilled artisans hand-carve every detail using traditional tools passed down through generations.",
  },
  {
    icon: Paintbrush,
    num: "03",
    title: "Finishing & Polish",
    desc: "Each piece is sanded, stained, and finished with natural oils for a lasting, rich look.",
  },
  {
    icon: PackageCheck,
    num: "04",
    title: "Quality & Export",
    desc: "Rigorous quality checks, careful packaging, and seamless export documentation.",
  },
];

const CraftsmanshipProcess = () => (
  <section className="section-padding bg-background">
    <div className="container-wide">
      <motion.div
        className="text-center mb-20"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
      >
        <p className="label-caps mb-4">The Process</p>
        <h2 className="text-display-lg font-serif font-light text-foreground">
          Crafted With Intention, Every Step
        </h2>
      </motion.div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
        {/* Connecting line (desktop only) */}
        <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-foreground/10" />

        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            className="relative text-center space-y-4 px-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.2, 0, 0, 1] }}
          >
            <div className="relative z-10 inline-flex items-center justify-center w-[104px] h-[104px] bg-secondary rounded-full">
              <s.icon size={32} className="text-primary" strokeWidth={1.5} />
            </div>
            <p className="font-serif text-primary text-lg">{s.num}</p>
            <h3 className="font-serif text-xl text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CraftsmanshipProcess;
