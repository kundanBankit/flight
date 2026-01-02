import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HeaderSwitcher from "./Components/Header/HeaderSwitcher";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home";
import MainNavigation from "./Components/MainNavigation";
import FlightSearchSection from "./Components/FlightSearchSection/FlightSearchSection";
import FlightResults from "./Components/FlightResults/FlightResults";
import PassengerDetails from "./Components/PassengerDetails/PassengerDetails";
import ReviewBooking from "./Components/ReviewBooking/ReviewBooking";
import BookingConfirmation from "./Components/BookingConfirmation/BookingConfirmation";
import ComparePage from "./Pages/ComparePage";
import CompleteBooking from "./Pages/CompleteBooking";
import TravellerReviewPage from "./Pages/TravellerReviewPage";
import BookingHistory from "./Pages/BookingHistory";
import MyTripsUpcoming from "./Pages/MyTrips/UpcomingBookings";
import MyTripsCompleted from "./Pages/MyTrips/CompletedBookings";
import MyTripsCancelled from "./Pages/MyTrips/CancelledBookings";
import CancelledBookingDetails from "./Components/MyTrips/CancelledBookingDetails";
import UpcomingBookingDetails from "./Components/MyTrips/UpcomingBookingDetails";
import CompletedBookingDetails from "./Components/MyTrips/CompletedBookingDetails";
import AirlinesMarkupPage from "./Pages/AirlinesMarkupPage";
import ProceedToPay from "./Components/BookingSection/ProceedToPay";

export default function App() {
  const location = useLocation();

  // 👇 Background image only on flight-search page
  const showBackground = location.pathname === "/flight-search";

  return (
    <>
      <div
        style={
          showBackground
            ? {
                backgroundImage:
                  "url('https://wallpaperaccess.com/full/1307415.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                minHeight: "100vh",
                width: "100%",
              }
            : {}
        }
      >
        <HeaderSwitcher />

        <Routes>
          <Route path="/" element={<Navigate to="/flight-search" replace />} />

          <Route element={<MainNavigation />}>
            <Route path="/flight-search" element={<FlightSearchSection />} />
            <Route path="/flight-results" element={<FlightResults />} />
            <Route path="/passenger-details" element={<PassengerDetails />} />
            <Route path="/review-booking" element={<ReviewBooking />} />
            <Route path="/booking-details" element={<CompleteBooking />} />
            <Route path="/review-travellers" element={<TravellerReviewPage />} />
            

<Route path="/booking-confirmation" element={<ProceedToPay/>} />

          </Route>

          <Route path="/compare" element={<ComparePage />} />

          <Route path="/my-trips/upcoming" element={<MyTripsUpcoming />} />
          <Route path="/my-trips/upcoming/details" element={<UpcomingBookingDetails />} />

          <Route path="/my-trips/completed" element={<MyTripsCompleted />} />
          <Route path="/my-trips/completed/details" element={<CompletedBookingDetails />} />

          <Route path="/my-trips/cancelled" element={<MyTripsCancelled />} />
          <Route path="/my-trips/cancelled/details" element={<CancelledBookingDetails />} />

          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/airlines-markup" element={<AirlinesMarkupPage />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}
