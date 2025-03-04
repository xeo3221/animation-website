import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";

const About = lazy(() => import("./components/About"));
const Hero = lazy(() => import("./components/Hero"));

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
        <About />
      </Suspense>
    </main>
  );
}

export default App;
