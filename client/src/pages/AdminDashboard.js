import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/AdminDashboard.css";

function AdminDashboard() {
  
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalTemples: 0,
  totalBookings: 0,
  totalUsers: 0,
  totalReviews: 0,
  totalRevenue: 0,
  recentBookings: [],
  mostBookedTemple: "",
  maxBookings: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/dashboard"
      );

      setStats(res.data);
    } 
    catch (err) {
  console.log(err);

  setStats({
    totalTemples: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalReviews: 0,
    totalRevenue: 0,
    recentBookings: [],
  });
}
  };

  return (
    <div className="admin-container">

      <h1>🛕 DarshanEase Admin Dashboard</h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h2>{stats.totalTemples}</h2>
          <p>Total Temples</p>
        </div>

        <div className="dashboard-card">
         <h2>{stats.totalBookings}</h2>
          <p>Total Bookings</p>
        </div>
        <div className="dashboard-card">
  <h2>{stats.totalUsers}</h2>
  <p>Total Users</p>
</div>
<div className="dashboard-card">
  <h2>{stats.totalReviews}</h2>
  <p>Total Reviews</p>
</div>
<div className="dashboard-card revenue-card">
  <h2>₹{stats.totalRevenue}</h2>
  <p>Total Revenue</p>
</div>
<div className="dashboard-card temple-card">
  <h2>🏆</h2>
  <p>{stats.mostBookedTemple}</p>
  <small>
    {stats.maxBookings} Bookings
  </small>
</div>
       
      </div>
      <h2 style={{ marginTop: "40px" }}>
  📋 Recent Bookings
</h2>

<table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    background: "#fff",
  }}
>
  <thead>
    <tr>
      <th>Temple</th>
      <th>User</th>
      <th>Date</th>
      <th>Amount</th>
    </tr>
  </thead>

  <tbody>
    {stats.recentBookings?.map((booking) => (
      <tr key={booking._id}>
        <td>{booking.temple}</td>
        <td>{booking.userEmail}</td>
        <td>{booking.date}</td>
       <td>{booking.amount || 0}</td>
      </tr>
    ))}
  </tbody>
</table>


      <div className="quick-actions">

        <h2>Quick Actions</h2>

        <button
          onClick={() => navigate("/admin/add-temple")}
        >
          ➕ Add Temple
        </button>

        <button
          onClick={() => navigate("/temples")}
        >
          🛕 View Temples
        </button>
        <button
  onClick={() => navigate("/admin/manage-temples")}
>
  ⚙️ Manage Temples
</button>

        <button
          onClick={() => navigate("/admin/manage-bookings")}
        >
          🎟 View Bookings
        </button>

      </div>

    </div>
  );
}

export default AdminDashboard;