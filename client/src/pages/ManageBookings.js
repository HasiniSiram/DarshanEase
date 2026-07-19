import { useEffect, useState } from "react";
import axios from "axios";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch All Bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/booking"
      );

      setBookings(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load bookings");
    }
  };

  // Delete Booking
  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/booking/${id}`
      );

      alert("Booking deleted successfully.");

      fetchBookings();
    } catch (err) {
      console.log(err);
      alert("Failed to delete booking.");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h1>🎟 Manage Bookings</h1>

      {bookings.length === 0 ? (
        <h2>No Bookings Found</h2>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <thead
            style={{
              background: "#5D001E",
              color: "white",
            }}
          >
            <tr>
              <th>User</th>
              <th>Temple</th>
              <th>Darshan</th>
              <th>Date</th>
              <th>Persons</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.userEmail}</td>

                <td>{booking.temple}</td>

                <td>{booking.darshanType}</td>

                <td>{booking.date}</td>

                <td>{booking.persons}</td>

                <td>
                  {booking.amount === 0
                    ? "Free"
                    : `₹${booking.amount}`}
                </td>

                <td>
                  <button
                    onClick={() =>
                      deleteBooking(booking._id)
                    }
                    style={{
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageBookings;