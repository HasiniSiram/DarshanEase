import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Profile.css";

function Profile() {
  const [user, setUser] = useState({});
  const [bookingCount, setBookingCount] = useState(0);

  const email = localStorage.getItem("email");
  console.log("Email:", email);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
  if (email) {
    fetchProfile();
  }
}, [email]);

  const fetchProfile = async () => {
    try {
      const userRes = await axios.get(
        `http://localhost:5000/api/auth/profile/${email}`
      );
console.log("User Response:", userRes.data);
      setUser(userRes.data);

      const bookingRes = await axios.get(
        `http://localhost:5000/api/booking/${email}`
      );

      setBookingCount(bookingRes.data.length);
setBookings(bookingRes.data);
    } catch (err) {
      console.log(err);
    }
  };
return (
  <div className="profile-container">
    <h1 className="profile-title">
      👤 My Profile
    </h1>

    <div className="profile-card">

      <div className="profile-header">
        <div className="profile-avatar">
          🙏
        </div>

        <h2>{user.name}</h2>
      </div>

      <div className="profile-info">

        <div className="info-box">
          <h3>📧 Email</h3>
          <p>{user.email}</p>
        </div>

        <div className="info-box">
          <h3>🎟 Total Bookings</h3>
          <p>{bookingCount}</p>
        </div>

      </div>

      <h2 className="booking-history-title">
        🎟 Booking History
      </h2>

      {bookings.map((booking) => (
        <div
          key={booking._id}
          style={{
            background: "#fff7e6",
            padding: "15px",
            marginTop: "10px",
            borderRadius: "10px",
            borderLeft: "5px solid #8B0000",
          }}
        >
          <p><strong>Temple:</strong> {booking.temple}</p>
          <p><strong>Darshan:</strong> {booking.darshanType}</p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Amount:</strong> ₹{booking.amount}</p>
          <p><strong>Status:</strong> {booking.status}</p>
        </div>
      ))}

    </div>
  </div>
);
  
}


export default Profile;