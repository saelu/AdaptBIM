import React from "react";

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
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
      
      {/* Preload hero background image for LCP optimization */}
      <link 
        rel="preload" 
        as="image" 
        href="/img/intro-bgd.png"
        fetchpriority="high"
      />
    </header>
  );
};
