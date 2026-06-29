import Hero from "@/components/Hero";
import ArticlesSection from "@/components/ArticlesSection";
import About from "@/components/About";
import Categories from "@/components/Categories";
import Videos from "@/components/Videos";
import Stats from "@/components/Stats";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <main>
        <Hero />
        <ArticlesSection />
        <About />
        <Categories />
        <Videos />
        <Stats />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
