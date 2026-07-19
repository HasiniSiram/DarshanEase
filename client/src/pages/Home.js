import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import temple from "../images/temple.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="home"
      style={{ backgroundImage: `url(${temple})` }}
    >
      <div className="overlay">
        <h1>Welcome to DarshanEase</h1>

        <h2>Your Divine Journey Begins Here</h2>

        <p>
          Book temple darshan tickets online with ease.
          Choose your preferred temple, select a convenient
          time slot, and enjoy a peaceful spiritual experience.
        </p>

        <div className="buttons">
          <button
            className="book-btn"
            onClick={() => navigate("/book")}
          >
            Book Darshan
          </button>

          <button
            className="explore-btn"
            onClick={() => navigate("/temples")}
          >
            Explore Temples
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;