import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";
import { emailjsConfig } from "../config/emailjs";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};
export const Contact = (props) => {
  const [{ name, email, subject, message }, setState] = useState(initialState);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, subject, message);
    
    // Reset status and show loading state
    setSubmitStatus(null);
    
    // EmailJS configuration from config file
    const { serviceId, templateId, publicKey } = emailjsConfig;
    
    emailjs
      .sendForm(serviceId, templateId, e.target, publicKey)
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setSubmitStatus('success');
          setState({ ...initialState }); // Clear form without resetting status
          
          // Auto-hide success message after 5 seconds
          setTimeout(() => {
            setSubmitStatus(null);
          }, 5000);
        },
        (error) => {
          console.log("Email send failed:", error.text);
          setSubmitStatus('error');
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
                        value={name}
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
                        value={email}
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <div className="form-group">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="form-control"
                        placeholder="Subject"
                        value={subject}
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
                    value={message}
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
              
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="alert alert-success mt-3" role="alert">
                  <i className="fa fa-check-circle me-2"></i>
                  Thank you for connecting with us! We will respond to your query ASAP.
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setSubmitStatus(null)}
                    aria-label="Close"
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="alert alert-danger mt-3" role="alert">
                  <i className="fa fa-exclamation-circle me-2"></i>
                  Sorry, there was an error sending your message. Please try again.
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setSubmitStatus(null)}
                    aria-label="Close"
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              )}
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
