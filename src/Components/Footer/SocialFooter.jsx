import React from "react";
import { FaInstagram, FaLinkedin, FaXTwitter, FaFacebookF } from "react-icons/fa6";

export default function SocialFooter() {
  return (
    <div
      className="text-center text-white py-4"
      style={{
        backgroundColor: "#000",
      }}
    >
      {/* Social Icons */}
      <div className="d-flex justify-content-center gap-4 mb-3">
        <a href="https://www.youtube.com/c/BANKITIndia" className="text-white fs-4" target="_blank">
          <FaInstagram />
        </a>
        <a href="https://twitter.com/BANKIT39656280" className="text-white fs-4" target="_blank">
          <FaXTwitter />
        </a>
        <a href="https://www.linkedin.com/company/13403608/" className="text-white fs-4" target="_blank">
          <FaLinkedin />
        </a>
        <a href="https://www.facebook.com/bankit.in/" className="text-white fs-4" target="_blank">
          <FaFacebookF />
        </a>
      </div>

      {/* Copyright */}
      <div className="fw-semibold">© 2025 FindiBankit PVT. LTD.</div>
    </div>
  );
}
