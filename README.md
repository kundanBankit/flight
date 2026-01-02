

# ✈️ Travel Booking Application (Flight Module)

A modern **Flight Booking Web Application** built using **React.js** that allows users to search flights, review fares, add traveller details, select seats & meals, and proceed with booking — similar to platforms like MakeMyTrip or IRCTC.

---

## 🚀 Features

### 🔍 Flight Search

* One-way flight search
* Dynamic city list
* Cabin class & passenger selection
* Real-time flight availability

### 📄 Flight Review

* Detailed flight information
* Fare breakup (Base Fare, Taxes, Fees)
* Airline, baggage & fare rules

### 👤 Traveller Details

* Add multiple adults dynamically (based on API `maxAdults`)
* Collapsible traveller cards (2 per row, expand on edit)
* Smart validation with **exact error messages**
* Automatic focus & scroll to invalid traveller
* Optional insurance support
* GST & contact details validation

### 💺 Seat Selection

* Dynamic seat map from API
* Responsive seat layout (Laptop & Monitor friendly)
* Seat status:

  * Available
  * Selected
  * Booked
  * Legroom
* Seat price calculation
* Per-seat selection handling

### 🍽️ Meals Selection

* Dynamic meals from API response
* Veg / Non-Veg filtering
* Meal price handling
* Add/remove meals

### ⏳ UX Enhancements

* Central loader during API calls
* User-friendly popup error messages
* Smooth scrolling & auto focus
* Responsive UI (Laptop + Large Monitor support)

---

## 🧩 Tech Stack

* **Frontend:** React.js, React Router
* **State Management:** React Hooks
* **Styling:** Inline styles + Bootstrap utility classes
* **Icons:** React Icons
* **API Communication:** Fetch API
* **Routing State:** `useNavigate` + `useLocation`

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── BookingSection/
│   │   ├── TravellerAdultForm.jsx
│   │   ├── SeatsMealsTabs.jsx
│   │   ├── MealsComponent.jsx
│   │   └── TripSecure.jsx
│   ├── BookingContactDetails.jsx
│   ├── GSTDetails.jsx
│   ├── ReviewTravellerModal.jsx
│   ├── ErrorPopup.jsx
│   └── CenterLoader.jsx
│
├── services/
│   ├── apiConfig.js
│   ├── client.js
│   └── flightService.js
│
├── utils/
│   ├── formatDuration.js
│   └── validators.js
│
├── assets/
│   └── Images/
│
└── App.js
```

---

## 🔗 API Integration

### 🔎 Search Flights

```
POST /flights/search-all
```

### 📄 Review Flight

```
POST /flights/review
```

### 💺 Seat Map

```
POST /flights/seatmap
```

**Sample Payload**

```json
{
  "agentId": "AG2190",
  "vendor": "TRIPJACK",
  "bookingId": "TJS102801833291"
}
```

---

## 🧠 Validation Logic (Highlights)

* Total travellers must match `maxAdults`
* Each traveller must have:

  * First Name
  * Last Name
  * Gender
* International travel validation:

  * Passport
  * DOB
  * Expiry date
* Contact details validation:

  * Country Code
  * Mobile (10 digits)
  * Email format
* Exact error popup with:

  * Traveller number
  * Missing field names
* Auto-open invalid traveller card

---

## 📱 Responsive Design

* Optimized for:

  * 💻 Laptop screens
  * 🖥️ Large monitors
* Adaptive scaling using:

  * `clamp()`
  * viewport-based widths
* Balanced layout between:

  * Seat map
  * Aircraft wings
  * Front & rear images

---

## ▶️ How to Run the Project

```bash
# Install dependencies
npm install

# Start development server
npm start
```

App runs at:

```
http://localhost:3000
```

---

## 🔮 Future Enhancements

* Assign seats & meals per traveller
* Payment gateway integration
* Booking confirmation page
* PNR & ticket download
* Redux / Zustand for global state
* Server-side session persistence

---

## 👨‍💻 Author

**Kundan Ojha**
Backend & Full-Stack Developer
Java | Spring Boot | React.js

---

If you want, I can also:

* ✅ Make a **GitHub-optimized README**
* ✅ Add **screenshots section**
* ✅ Write **project description for resume**
* ✅ Create **architecture diagram**

Just tell me 👍
