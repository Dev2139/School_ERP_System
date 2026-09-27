import React from 'react';
import { Link } from 'react-router-dom';

export default function ScholarGridLogo({ className = "h-10 sm:h-12", isDark = false }) {
  return (
    <Link to="/" className="inline-flex items-center group cursor-pointer">
      <img
        src="https://res.cloudinary.com/urzka7oz/image/upload/v1790514834/ChatGPT_Image_Sep_27_2026_06_42_50_PM.png"
        alt="ScholarGrid ERP Logo"
        className={`${className} w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs ${isDark ? 'brightness-110' : ''}`}
      />
    </Link>
  );
}
