import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

export default function Footer() {
  return (
    <footer id="main-footer">
      <div className="footer-content">
        <a href="https://github.com/Toshiuk">
          Github
        </a>
        <a href="https://www.linkedin.com/in/flaviotoshiukhjr/">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
