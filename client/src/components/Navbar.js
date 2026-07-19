import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <nav>
      <h2>DarshanEase</h2>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/temples">Temples</Link>
        </li>

        <li>
          <Link to="/book">Book Ticket</Link>
        </li>

        <li>
          <Link to="/bookings">My Bookings</Link>
        </li>

        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
  <Link to="/profile">👤 Profile</Link>
</li>

        {!token ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <span style={{ color: "#FFD700", fontWeight: "bold" }}>
                Welcome, {name}
              </span>
            </li>

            <li>
              <button
                onClick={logout}
                style={{
                  background: "#8B0000",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;