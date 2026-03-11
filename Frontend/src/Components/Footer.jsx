import React from 'react'

function Footer() {
  return (
    <footer className=" py-10 border-t border-gray-100 mt-auto">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Contact Link */}
        <a 
          href="mailto:contact@example.com" 
          className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
        >
          Contact Us
        </a>
        
        {/* Copyright */}
        <p className="text-xs text-gray-400 tracking-wide">
          © 2026 UserCentral. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;