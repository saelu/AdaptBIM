import React from "react";

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 intro-text">
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
