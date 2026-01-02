import React from "react";
import FAQSection from "./FAQSection";
import SocialFooter from "./SocialFooter";

export default function Footer() {
  return (
    <footer className="">
      {/* Light grey FAQ area */}
      <div className="bg-light py-5">
        <div className="container">
          <FAQSection />
        </div>
      </div>

      {/* Black bottom footer */}
      <SocialFooter />
    </footer>
  );
}
