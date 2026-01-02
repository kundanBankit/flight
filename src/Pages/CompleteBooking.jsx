import React from "react";
import { useLocation } from "react-router-dom";
import BookingLayout from "../Components/BookingSection/BookingLayout";
import BookingLeft from "../Components/BookingSection/BookingLeft";
import BookingRight from "../Components/BookingSection/BookingRight";

const CompleteBooking = () => {
  const { state } = useLocation();

  const flight = state?.flight ?? null;
  const mappedReview = state?.mappedReview ?? null;

  console.log("✔ CompleteBooking received flight data:", flight);
  console.log("✔ CompleteBooking received mappedReview:", mappedReview);

  return (
    <BookingLayout
      left={<BookingLeft flight={flight} mappedReview={mappedReview} />}
      right={<BookingRight flight={flight} mappedReview={mappedReview} />}
    />
  );
};

export default CompleteBooking;
