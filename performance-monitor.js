// Performance monitoring for Core Web Vitals
if (typeof window !== 'undefined') {
  // LCP (Largest Contentful Paint)
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      console.log('LCP:', entry.startTime);
      // Send to analytics
      if (entry.startTime > 2500) {
        console.warn('LCP is too slow:', entry.startTime);
      }
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // FID (First Input Delay)
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      console.log('FID:', entry.processingStart - entry.startTime);
      // Send to analytics
      if (entry.processingStart - entry.startTime > 100) {
        console.warn('FID is too slow:', entry.processingStart - entry.startTime);
      }
    }
  }).observe({ entryTypes: ['first-input'] });

  // CLS (Cumulative Layout Shift)
  new PerformanceObserver((entryList) => {
    let clsValue = 0;
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    }
    console.log('CLS:', clsValue);
    // Send to analytics
    if (clsValue > 0.1) {
      console.warn('CLS is too high:', clsValue);
    }
  }).observe({ entryTypes: ['layout-shift'] });

  // FCP (First Contentful Paint)
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      console.log('FCP:', entry.startTime);
      // Send to analytics
      if (entry.startTime > 1800) {
        console.warn('FCP is too slow:', entry.startTime);
      }
    }
  }).observe({ entryTypes: ['first-contentful-paint'] });

  // TTFB (Time to First Byte)
  const navigationEntry = performance.getEntriesByType('navigation')[0];
  if (navigationEntry) {
    console.log('TTFB:', navigationEntry.responseStart - navigationEntry.requestStart);
    if (navigationEntry.responseStart - navigationEntry.requestStart > 600) {
      console.warn('TTFB is too slow:', navigationEntry.responseStart - navigationEntry.requestStart);
    }
  }
} 