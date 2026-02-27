import Hero from "../components/Hero";
import BrandIntro from "../components/BrandIntro";
import BrandPhilosophy from "../components/BrandPhilosophy";
import CraftsmanshipSection from "../components/CraftsmanshipSection";
import SignatureCollection from "../components/SignatureCollection";
import FeaturedProducts from "../components/FeaturedProducts";
import Testimonials from "../components/Testimonials";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <BrandPhilosophy />
      <CraftsmanshipSection />
      <SignatureCollection />
      <FeaturedProducts />
      <Testimonials />
    </>
  );
}
