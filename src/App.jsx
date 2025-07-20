import React, { useState, useEffect, lazy, Suspense } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import JsonData from "./data/data.json";

// Lazy load non-critical components
const Welcome = lazy(() => import("./components/welcome").then(module => ({ default: module.Welcome })));
const About = lazy(() => import("./components/about").then(module => ({ default: module.About })));
const Services = lazy(() => import("./components/services").then(module => ({ default: module.Services })));
const Features = lazy(() => import("./components/features").then(module => ({ default: module.Features })));
const Testimonials = lazy(() => import("./components/testimonials").then(module => ({ default: module.Testimonials })));
const Contact = lazy(() => import("./components/contact").then(module => ({ default: module.Contact })));

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      
      {/* Lazy load non-critical sections */}
      <Suspense fallback={<div style={{ height: '100px' }}></div>}>
        <Welcome data={landingPageData.Welcome} />
        <About data={landingPageData.About} />
        <Services data={landingPageData.Services} />
        <Features data={landingPageData.Features} />
        <Testimonials data={landingPageData.Testimonials} />
        <Contact data={landingPageData.Contact} />
      </Suspense>
    </div>
  );
};

export default App;
