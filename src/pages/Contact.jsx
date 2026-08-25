import React from "react";
import Footer from "../components/Footer";
import "../App.css";
function Contact() {
    return (
        <div className="contact-page">

            <section className="contact-hero">
                <span className="section-tag">GET IN TOUCH</span>

                <h1>
                    Let's Make a Difference
                    <span> Together.</span>
                </h1>

                <p>
                    Have a question, want to donate surplus food, or
                    want to partner with RescueSupply? We'd love to hear from you.
                </p>
            </section>


            <section className="contact-section">

                <div className="contact-info">

                    <h2>Contact Us</h2>

                    <p>
                        Whether you're a restaurant, NGO, volunteer, or someone
                        who simply wants to help, we're here to connect.
                    </p>

                    <div className="contact-item">
                        <div className="contact-icon">📍</div>
                        <div>
                            <h3>Our Location</h3>
                            <p>Punjab, India</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">📧</div>
                        <div>
                            <h3>Email Us</h3>
                            <p>contact@rescuesupply.com</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">📞</div>
                        <div>
                            <h3>Call Us</h3>
                            <p>+91 98765 43210</p>
                        </div>
                    </div>

                </div>


                <div className="contact-form-container">

                    <h2>Send Us a Message</h2>

                    <form className="contact-form">

                        <div className="form-row">

                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                />
                            </div>

                        </div>

                        <div className="form-group">
                            <label>Subject</label>
                            <input
                                type="text"
                                placeholder="What would you like to talk about?"
                            />
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                rows="6"
                                placeholder="Write your message here..."
                            ></textarea>
                        </div>

                        <button type="submit" className="primary-btn">
                            Send Message →
                        </button>

                    </form>

                </div>

            </section>

        </div>
    );
}

export default Contact;