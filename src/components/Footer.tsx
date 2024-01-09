// Footer.js

import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 Your Website</p>
        <div className="social-icons d-flex justify-content-center">
          <a href="mailto:youremail@gmail.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/48/000000/gmail.png" alt="Gmail Icon" />
          </a>
          <a href="https://www.linkedin.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/48/000000/linkedin.png" alt="LinkedIn Icon" />
          </a>
          {/* Add more social icons/links here */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
