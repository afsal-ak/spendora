import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import ProblemSection from "@/components/home/ProblemSection";
 
export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar/>
      <HeroSection />
      <ProblemSection />
     </main>
  );
}