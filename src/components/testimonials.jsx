import React from "react";

export const Testimonials = (props) => {
  return (
    <div id="testimonials">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Our Target Audience</h2>
              <p>We specifically cater to EPC (Engineering, Procurement, and Construction), AEC (Architecture, Engineering, and Construction) and Fabricator companies who are looking to:</p>
              <div className="list-style">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
              </div>
            </div>
          </div>
             <div className="col-xs-12 col-md-6">
            {" "}
            <img src="img/testimonials.png" className="img-responsive" alt="" />{" "}
          </div>
        </div>
      </div>
        
    </div>
  );
};
