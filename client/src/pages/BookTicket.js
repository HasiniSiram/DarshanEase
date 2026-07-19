import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/BookTicket.css";
function BookTicket() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedTemple = location.state?.temple || "";

  const [temples, setTemples] = useState([]);
  const [templeDetails, setTempleDetails] = useState(null);
  const [darshanTypes, setDarshanTypes] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [booking, setBooking] = useState({
    userEmail: localStorage.getItem("email") || "",
    temple: selectedTemple,
    darshanType: "",
    date: "",
    timeSlot: "",
    persons: 1,
    mobile: "",
    image: location.state?.image || "",
  });

  const timeSlots = [
    "06:00 AM - 08:00 AM",
    "08:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 02:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM",
    "06:00 PM - 08:00 PM",
  ];

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/temple"
      );
      console.log("API Response:", res.data);

      setTemples(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (temples.length === 0) return;

    const selected = temples.find(
      (item) => item.name === booking.temple
    );

    if (selected) {
      setTempleDetails(selected);
      setDarshanTypes(selected.darshanTypes || []);
    } else {
      setTempleDetails(null);
      setDarshanTypes([]);
    }
  }, [booking.temple, temples]);

  useEffect(() => {
    const selected = darshanTypes.find(
      (item) => item.name === booking.darshanType
    );

    if (selected) {
      setTotalAmount(selected.price * booking.persons);
    } else {
      setTotalAmount(0);
    }
  }, [booking.darshanType, booking.persons, darshanTypes]);

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const bookTicket = async () => {
    if (
      !booking.temple ||
      !booking.darshanType ||
      !booking.date ||
      !booking.timeSlot ||
      !booking.mobile
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(booking.mobile)) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/booking/add",
        {
          ...booking,
          amount: totalAmount,
        }
      );

      navigate("/success", {
        state: {
          bookingId: res.data.bookingId,
          temple: booking.temple,
          darshanType: booking.darshanType,
          date: booking.date,
          timeSlot: booking.timeSlot,
          persons: booking.persons,
          mobile: booking.mobile,
          amount: totalAmount,
        },
      });
            setBooking({
        userEmail: localStorage.getItem("email") || "",
        temple: selectedTemple,
        darshanType: "",
        date: "",
        timeSlot: "",
        persons: 1,
        mobile: "",
      });

    } catch (err) {
      alert("Booking Failed");
      console.log(err);
    }
  };

  return (
    <div className="login-container">
     <div className="login-box">

        <h2>🙏 Temple Ticket Booking</h2>
        <p
  style={{
    textAlign: "center",
    color: "#666",
    marginBottom: "25px",
    fontSize: "16px",
  }}
>
  Select a temple and book your darshan ticket instantly
</p>

        {templeDetails && (
  <div
    style={{
      background: "linear-gradient(135deg,#fff,#fff7e6)",
      padding: "25px",
      borderRadius: "20px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
      marginBottom: "25px",
      border: "2px solid #ffcc80",
    }}
  >
    {templeDetails.image && (
      <img
        src={`http://localhost:5000${templeDetails.image}`}
        alt={templeDetails.name}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          borderRadius: "15px",
          marginBottom: "15px",
        }}
      />
    )}

    <h2
  style={{
    color: "#8B0000",
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
  }}
>
  🛕 {templeDetails.name}
</h2>
<p
  style={{
    textAlign: "center",
    color: "#666",
    fontSize: "16px",
    marginBottom: "20px",
  }}
>
  Experience Divine Blessings & Peace
</p>
    <p>📍 {templeDetails.location}</p>

    <p>⏰ {templeDetails.timings}</p>
  </div>
)}

        <input
          type="email"
          name="userEmail"
          value={booking.userEmail}
          readOnly
        />

        <select
          name="temple"
          value={booking.temple}
          onChange={handleChange}
        >
          <option value="">Select Temple</option>

          {temples.map((temple) => (
            <option key={temple._id} value={temple.name}>
              {temple.name}
            </option>
          ))}
        </select>

        <select
          name="darshanType"
          value={booking.darshanType}
          onChange={handleChange}
        >
          <option value="">Select Darshan Type</option>

          {darshanTypes.map((type) => (
            <option key={type._id || type.name} value={type.name}>
              {type.name}
              {type.price === 0
                ? " (Free)"
                : ` (₹${type.price})`}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          min={new Date().toISOString().split("T")[0]}
          value={booking.date}
          onChange={handleChange}
        />

        <select
          name="timeSlot"
          value={booking.timeSlot}
          onChange={handleChange}
        >
          <option value="">Select Time Slot</option>

          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="persons"
          min="1"
          value={booking.persons}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          maxLength="10"
          value={booking.mobile}
          onChange={handleChange}
        />
<div
  style={{
    background: "#fff7e6",
    border: "2px solid #ffcc80",
    padding: "15px",
    borderRadius: "15px",
    textAlign: "center",
    marginTop: "15px",
    marginBottom: "20px",
  }}
>
  <h2 style={{ color: "#8B0000", margin: 0 }}>
    💰 {totalAmount === 0 ? "Free Darshan" : `₹${totalAmount}`}
  </h2>
</div>
        

        <button onClick={bookTicket}>
          🙏 Confirm Booking
        </button>

      </div>
    </div>
  );
}

export default BookTicket;