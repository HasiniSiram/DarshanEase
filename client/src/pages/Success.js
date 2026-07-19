import { Link, useLocation } from "react-router-dom";
import "../css/Success.css";

function Success() {
  const location = useLocation();
  const booking = location.state;

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">🎉</div>

        <h1>🛕 DarshanEase</h1>

        <h2>✅ Booking Confirmed Successfully</h2>

        <hr />

        <p>
          <strong>🎟️ Booking ID:</strong>{" "}
          {booking?.bookingId || "Will be Generated"}
        </p>

        <p>
          <strong>🛕 Temple:</strong>{" "}
          {booking?.temple}
        </p>

        <p>
          <strong>🙏 Darshan Type:</strong>{" "}
          {booking?.darshanType}
        </p>

        <p>
          <strong>📅 Date:</strong>{" "}
          {booking?.date}
        </p>

        <p>
          <strong>🕒 Time Slot:</strong>{" "}
          {booking?.timeSlot}
        </p>

        <p>
          <strong>👥 Persons:</strong>{" "}
          {booking?.persons}
        </p>

        <p>
          <strong>💰 Total Amount:</strong>{" "}
          {booking?.amount === 0
            ? "Free"
            : `₹${booking?.amount}`}
        </p>

        <p>
          <strong>📌 Status:</strong>{" "}
          <span style={{ color: "green", fontWeight: "bold" }}>
            Confirmed
          </span>
        </p>

        <hr />

        <h3>🙏 Have a Blessed Darshan 🙏</h3>

        <Link to="/bookings">
          <button>
            View My Bookings
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Success;