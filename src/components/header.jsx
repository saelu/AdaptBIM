import React from "react";

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        {/* LCP Image - Hidden but discoverable */}
        <picture>
          <source 
            srcSet="/img/webp/intro-bgd.webp" 
            type="image/webp"
          />
          <img 
            src="/img/optimized/intro-bgd.png"
            alt="AdaptBIM Hero Background"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1,
              opacity: 0
            }}
            fetchPriority="high"
            loading="eager"
          />
        </picture>
        
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  Empowering <span className="aec">AEC</span> and <span  className="aec">EPC</span> with our Tailored 
                  <span className="aec"> BIM</span> Solutions
                  <span></span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
