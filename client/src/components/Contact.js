import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../store/Store";
import Error from "./Error";
import { nullErrors } from "../utils/utils.js"
const Contact = () => {
  let { dispatch, error, loading, user } = useContext(ProductsContext);
  let [contactMessage, setContactMessage] = useState("");
  let [showSuccessMessage, setShowSuccessMessage] = useState(false);
  let changeHandler = (e) => {
    setContactMessage(e.target.value);
  };
  let sendContactMessage = async (e) => {
    e.preventDefault();
    nullErrors(dispatch)
    dispatch({ type: "DATA_LOADING", payload: { loading: true } });
    let res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name:`${user.fname} ${user.lname}`,email:user.email, message:contactMessage}),
    });
    let response = await res.json();
    if (res.status === 200) {
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      nullErrors(dispatch)
      setShowSuccessMessage(true);
    } else {
      let { error } = response;
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      dispatch({ type: "SET_ERROR", payload: { error: error } });
      setShowSuccessMessage(false);
    }
  };
  useEffect(() => {
    nullErrors(dispatch)
  }, [])
  return (
    <div className="container mt-5">
      <div className="contact-page">
        <h2 className="text-center mb-4">Contact Us</h2>
        <div className="row">
          <div className="col-md-6 col-sm-12 contact-social-media">
            <h3>Get in Touch</h3>
            <p>
              If you have any questions or feedback, we'd love to hear from you!
              Our team is available to answer your inquiries and help you with
              any issues you may be having.
              <br></br>
              You can reach us by phone, email, or through our social media
              channels listed above. We'll do our best to get back to you as
              soon as possible.
            </p>
            <div className="contact-info">
              <p>
                (92) 344-1452500<br></br>
                support@grabandgo.com
              </p>
              <div className="social-media">
                <a href="" target="_blank" className="instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://twitter.com/xhoudharyhamza"
                  target="_blank"
                  className="twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/muhammadhamzaashraf/"
                  target="_blank"
                  className="linkedin"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="https://github.com/xhoudharyhamza"
                  target="_blank"
                  className="github"
                >
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 contact-form">
            {error && <Error error={error} />}
            <form onSubmit={sendContactMessage}>
              {showSuccessMessage && (
                <div class="alert alert-success" role="alert">
                  Message has been sent Successfully!
                </div>
              )}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control my-1"
                  id="name"
                  name="name"
                  value={user ? `${user.fname} ${user.lname}` : " "}
                  required
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control my-1"
                  id="email"
                  name="email"
                  readOnly
                  value={user ? `${user.email}` : ''}
                  onChange={changeHandler}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control my-1"
                  id="message"
                  name="message"
                  value={contactMessage}
                  onChange={changeHandler}
                  rows="5"
                  required
                ></textarea>
              </div>
              {!user && <p className="text-danger">You have to Logged In to send Message </p>}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!user}
              >
                {loading ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
