import React from "react";

export default function FAQSection() {
  const faqs = [
    {
      q: "How do I make a flight booking on FindiBankit?",
      a: "You can book a flight on FindiBankit in a few easy steps: Enter your departure and arrival destinations, select your air travel dates, choose from our wide range of cheap flights based on your airfare preferences, and click on 'Book Now'.",
    },
    {
      q: "Can I avail domestic flight offers on FindiBankit?",
      a: "Of course, you can. While making domestic flight bookings, you can avail any special offer that is active at that time. The eligible cheapest flights will show up on your screen for booking.",
    },
    {
      q: "How can I avail budget air tickets on FindiBankit?",
      a: "It’s super easy to avail budget airfare while booking your cheap flight tickets on FindiBankit. Just select the ‘Price’ filter to view the lowest airfare options at the top.",
    },
    {
      q: "Why could I not avail the flight booking offers at checkout?",
      a: "FindiBankit uses a world-class real-time reservation database. As dynamic changes in airfare occur, prices may change in real-time. Always re-check prices before confirming.",
    },
  ];

  return (
    <div className="row g-4" >
      {faqs.map((faq, index) => (
        <div key={index} className="col-md-6">
          <p className="fw-bold">Q - {faq.q}</p>
          <p className="text-muted" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
            A: {faq.a}
          </p>
          {index < faqs.length - 2 && <hr className="my-3" />}
        </div>
      ))}
    </div>
  );
}
