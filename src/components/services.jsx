import React from "react";

export const Services = (props) => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
            We specialize in empowering clients within the Engineering, Procurement, and Construction (EPC) and Architecture, Engineering, and Construction (AEC) sectors. Our core focus is to significantly enhance project productivity and elevate digital visibility across their operations. 
            Our comprehensive solutions are meticulously engineered to streamline workflows, optimize processes, and deliver clear, actionable insights for your projects. To explore how our specialized solutions can benefit your organization, please click on each solution for more detailed information.
          </p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  {" "}
                  <i className={d.icon}></i>
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
