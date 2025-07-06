import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
};
export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);
    
    {/* replace below with your own Service ID, Template ID and Public Key from your EmailJS account */ }
    
    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_PUBLIC_KEY")
      .then(
        (result) => {
          console.log(result.text);
          clearState();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-xs-12 col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Get in Touch</h2>
                <p>
                Ready to transform your vision into code and elevate your project capabilities? 
                Contact AdaptBIM today to discuss how our tailored solutions can empower your next project.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xs-12 col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Full Name"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="col-xs-12 col-md-3 col-md-offset-1 contact-info">
            <h3>Contact Info</h3>
            <div className="contact-item">
              <span><i className="fa fa-map-marker"></i> Address</span>
              <div>
                <b>India Office</b>
                <p>{props.data ? props.data.address1 : "loading"}</p>
              </div>
            </div>
            {/* <div className="contact-item">
              <span><i className="fa fa-phone"></i> Phone</span>
              <div>
                {props.data ? props.data.phone : "loading"}
              </div>
            </div> */}
            <div className="contact-item">
              <span><i className="fa fa-envelope"></i> Email</span>
              <div>
                {props.data ? props.data.email : "loading"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2025 AdaptBIM. All Rights Reserved.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
