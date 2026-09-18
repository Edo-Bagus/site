import { Suspense } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { ProjectModal } from "@/components/ProjectModal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Suspense fallback={null}>
        <ProjectModal />
      </Suspense>
    </>
  );
}
