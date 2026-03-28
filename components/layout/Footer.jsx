import React from "react";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-main-content">
          {/* Brand & Trust Section */}
          <div className="footer-brand-column">
            <div className="footer-logo-row">
              <div className="footer-logo-icon">FundU</div>
              <h2 className="footer-brand-name">Fundu</h2>
            </div>
            <p className="footer-tagline">
              Simple, efficient solution to campaign hosting
            </p>

            <div className="footer-trust-box">
              <h5 className="trust-title">Trust & Transparency:</h5>
              <p className="trust-text">
                Fundu does not collect or hold campaign funds. Donations are
                sent directly to campaign creators through their chosen payment
                methods.
              </p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="footer-links-container">
            <div className="footer-link-group">
              <h4 className="footer-group-title">Explore</h4>
              <ul className="footer-list">
                <li>Discover Campaigns</li>
                <li>Featured Campaigns</li>
                <li>Categories</li>
                <li>Start a Campaign</li>
              </ul>
            </div>

            <div className="footer-link-group">
              <h4 className="footer-group-title">Product</h4>
              <ul className="footer-list">
                <li>How Fundu Works</li>
                <li>Hosting Fees</li>
                <li>Campaign Guidelines</li>
                <li>FAQs</li>
                <li>Trust & Safety</li>
              </ul>
            </div>

            <div className="footer-link-group">
              <h4 className="footer-group-title">Company</h4>
              <ul className="footer-list">
                <li>About Fundu</li>
                <li>Contact Us</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Icons Row */}
        <div className="footer-social-row">
          <div className="social-circle">X</div>
          <div className="social-circle">IG</div>
          <div className="social-circle">in</div>
          <div className="social-circle">WA</div>
        </div>

        <div className="footer-divider"></div>

        {/* Copyright Bottom */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">© 2025 Fundu. All rights reserved.</p>
          <p className="built-by-text">
            Built for creators and communities{" "}
            <span className="heart-icon">❤</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
