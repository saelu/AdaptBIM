import React, { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  { href: "#welcome", label: "Welcome", id: "welcome" },
  { href: "#about", label: "About US", id: "about" },
  { href: "#services", label: "Solutions", id: "services" },
  { href: "#contact", label: "Contact US", id: "contact" },
];

export const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(NAV_ITEMS[0].id);
  const [lockedSection, setLockedSection] = useState(null);
  const observerRef = useRef(null);
  const lockTimeoutRef = useRef(null);

  // Handle scroll for navbar highlighting
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll-based active link
  useEffect(() => {
    if (lockedSection) {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      return;
    }
    const sectionIds = NAV_ITEMS.map(item => item.id);
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (lockedSection) return;
        let maxRatio = 0;
        let currentSection = activeSection;
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            currentSection = entry.target.id;
          }
        });
        if (maxRatio === 0) {
          let closestSection = activeSection;
          let minDistance = Infinity;
          sections.forEach(section => {
            if (section) {
              const rect = section.getBoundingClientRect();
              const distance = Math.abs(rect.top);
              if (distance < minDistance) {
                minDistance = distance;
                closestSection = section.id;
              }
            }
          });
          currentSection = closestSection;
        }
        if (!lockedSection) {
          setActiveSection(currentSection);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -50% 0px",
        threshold: [0.1, 0.3, 0.5, 0.7, 1.0],
      }
    );
    sections.forEach(section => {
      if (section) observer.observe(section);
    });
    observerRef.current = observer;
    return () => {
      if (observer) observer.disconnect();
    };
  }, [lockedSection, activeSection]);

  // Handle navigation click with robust lock
  const handleNavClick = (id) => {
    setMobileOpen(false);
    if (lockTimeoutRef.current) {
      clearTimeout(lockTimeoutRef.current);
    }
    setLockedSection(id);
    setActiveSection(id);
    // Scroll to the section manually with smooth behavior and offset
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -110; // match scroll-margin-top
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    // Release lock after scroll is likely complete
    lockTimeoutRef.current = setTimeout(() => {
      setLockedSection(null);
    }, 1000); // 1 second is usually enough for smooth scroll
  };

  useEffect(() => {
    return () => {
      if (lockTimeoutRef.current) {
        clearTimeout(lockTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav id="menu" className={scrolled ? "navbar-scrolled" : ""}>
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-brand-container">
          <a href="#page-top" className="navbar-brand page-scroll">
            <picture>
              <source media="(max-width: 575px)" srcSet="img/logo-large.png" />
              <source media="(max-width: 991px)" srcSet="img/logo-large.png" />
              <source media="(min-width: 992px)" srcSet="img/logo-large.png" />
              <img src="img/logo-large.png" alt="AdaptBIM Logo" className="navbar-logo" />
            </picture>
          </a>
        </div>
        {/* Desktop Navigation (visible on desktop/tablet only) */}
        <ul className="custom-navbar-desktop">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className={activeSection === item.id ? "active" : ""}>
              <a href={item.href} className="page-scroll" onClick={e => { e.preventDefault(); handleNavClick(item.id); }}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Mobile Toggle Button (visible on mobile only) */}
        <button
          type="button"
          className={`custom-navbar-toggle${mobileOpen ? "" : " collapsed"}`}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        {/* Mobile Navigation (visible on mobile only) */}
        <div
          className={`custom-navbar-mobile${mobileOpen ? " in" : ""}`}
          id="mobile-navbar-collapse"
        >
          <ul className="custom-navbar-mobile-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className={activeSection === item.id ? "active" : ""}>
                <a href={item.href} className="page-scroll" onClick={e => { e.preventDefault(); handleNavClick(item.id); }}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
