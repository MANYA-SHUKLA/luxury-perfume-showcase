import ScrollReveal from "./ScrollReveal";
import "./BrandIntro.css";

export default function BrandIntro() {
  return (
    <section className="brand-intro">
      <ScrollReveal>
        <div className="brand-intro-inner">
          <p className="brand-intro-text">
            Sillage is built on the belief that a fragrance should leave a trace—not shout. Our perfumes are composed in Grasse and bottled without compromise: each scent is built around a single idea, worn by people who prefer presence over performance.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
