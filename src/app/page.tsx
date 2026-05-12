import HeroSection from "@/components/home/HeroSection";
import ProblemSection from "@/components/home/ProblemSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import AuditFormSection from "@/components/home/AuditFormSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <AuditFormSection/>
    </main>
  );
}