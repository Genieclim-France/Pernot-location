"use client";

import { useEffect } from "react";

import { useIntersectionObserver } from "@/hook/useIntersectionObserver";
import HeroSection from "@/components/HeroSection";
import VehiclesSection from "@/components/VehicleSection";
import ContactSection from "@/components/ContactSection";
import Navigation from "@/components/Navigation";
import { useSection } from "@/context/SectionContext";
import Footer from "@/components/FooterSection";

export default function Main() {
  const { activeSection, sectionRefs } = useIntersectionObserver();
  const { setActiveSection } = useSection();

  useEffect(() => {
    // Vérifier si nous devons défiler vers la section contact
    const shouldScrollToContact = sessionStorage.getItem("scrollToContact");

    if (shouldScrollToContact) {
      // Supprimer l'information pour éviter de défiler à nouveau lors des visites futures
      sessionStorage.removeItem("scrollToContact");

      // Attendre que le DOM soit complètement chargé
      setTimeout(() => {
        const contactSection = document.getElementById("contact");

        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // Délai plus long pour s'assurer que tout est chargé
    }
  }, []);
  // Met à jour l'état de la section active dans le contexte
  useEffect(() => {
    setActiveSection(activeSection);
  }, [activeSection, setActiveSection]);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="h-[100dvh] overflow-hidden">
      <Navigation
        currentSection={activeSection}
        totalSections={4}
        onNavigate={scrollToSection}
      />
      <div className="snap-container h-[100dvh]">
        <HeroSection
          backgroundImage="bg-[url('/hero.png')]"
          description="Explorez notre collection exclusive de véhicules haut de gamme pour des occasions spéciales et des trajets d'exception."
          forwardedRef={(el) => (sectionRefs.current[0] = el)}
          highlightedText="vos rêves"
          title="Louez la voiture de"
        />
        <VehiclesSection forwardedRef={(el) => (sectionRefs.current[1] = el)} />
        <ContactSection forwardedRef={(el) => (sectionRefs.current[2] = el)} />
        <Footer forwardedRef={(el) => (sectionRefs.current[3] = el)} />
      </div>
    </main>
  );
}
