import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/TempleDetails.css";
import tirupati from "../images/tirupati.jpg";
import srisailam from "../images/srisailam.jpg";
import bhadrachalam from "../images/bhadrachalam.jpg";
import yadadri from "../images/yadadri.jpg";
import puri from "../images/puri.jpg";

function TempleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);

  // Reviews
  const [reviews, setReviews] = useState([]);

  const [review, setReview] = useState({
    rating: 5,
    comment: "",
  });

  useEffect(() => {
  fetchTemple();
  fetchReviews();
}, [id]);

  const fetchTemple = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/temple/${id}`
      );

     let image = res.data.image;

switch (res.data.name) {
  case "Tirumala Tirupati":
    image = tirupati;
    break;

  case "Srisailam":
    image = srisailam;
    break;

  case "Bhadrachalam":
    image = bhadrachalam;
    break;

  case "Yadadri":
    image = yadadri;
    break;

  case "Puri Jagannath Temple":
    image = puri;
    break;

  default:
    break;
}

setTemple({
  ...res.data,
  image,
});
    } catch (err) {
      console.log(err);
      alert("Temple not found");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/review/${id}`
      );

      setReviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitReview = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/review/add",
        {
          templeId: id,
          userEmail: localStorage.getItem("email"),
          rating: review.rating,
          comment: review.comment,
        }
      );

      alert("Review Added Successfully");

      setReview({
        rating: 5,
        comment: "",
      });

      fetchReviews();

    } catch (err) {
      console.log(err);
      alert("Failed to add review");
    }
  };

  const bookTemple = () => {
    navigate("/book", {
  state: {
    temple: temple.name,
    image: temple.image,
  },
});
  };

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading Temple...
      </h2>
    );
  }

  if (!temple) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Temple Not Found
      </h2>
    );
  }
    return (
    <div className="details-container">
      <div className="details-card">

       <div className="temple-image-wrapper">
  <img
    src={
      temple.image?.startsWith("/uploads")
        ? `http://localhost:5000${temple.image}`
        : temple.image
    }
    alt={temple.name}
  />

  <div className="temple-overlay">
    <h1>{temple.name}</h1>
    <p>🙏 Divine Darshan Experience</p>
  </div>
</div>

        <div className="details-content">

          <h1>{temple.name}</h1>

          <p>
            <strong>📍 Location:</strong> {temple.location}
          </p>

          <p>
            <strong>📝 Description:</strong>
            <br />
            {temple.description}
          </p>

          <p>
            <strong>⏰ Darshan Timings:</strong> {temple.timings}
          </p>

          <h3>🙏 Available Darshan Types</h3>

<div className="darshan-grid">
  {temple.darshanTypes &&
    temple.darshanTypes.map((darshan, index) => (
      <div
        className="darshan-card"
        key={index}
      >
        <h4>{darshan.name}</h4>

        <p>
          {darshan.price === 0
            ? "🆓 Free Darshan"
            : `💰 ₹${darshan.price}`}
        </p>
      </div>
    ))}
</div>

          <button
            className="book-btn"
            onClick={bookTemple}
          >
            🙏 Book Darshan
          </button>

          <hr style={{ margin: "30px 0" }} />

          <h2>⭐ Write a Review</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              marginTop: "15px",
            }}
          >
            <select
              value={review.rating}
              onChange={(e) =>
                setReview({
                  ...review,
                  rating: Number(e.target.value),
                })
              }
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>

            <textarea
              rows="4"
              placeholder="Write your review..."
              value={review.comment}
              onChange={(e) =>
                setReview({
                  ...review,
                  comment: e.target.value,
                })
              }
            />

            <button onClick={submitReview}>
              Submit Review
            </button>
          </div>

          <hr style={{ margin: "30px 0" }} />

          <h2>🌟 User Reviews</h2>

          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((item) => (
              <div
  key={item._id}
  className="review-card"
>
                <h4>{item.userEmail}</h4>

                <p>
                  {"⭐".repeat(item.rating)}
                </p>

                <p>{item.comment}</p>

                <small>
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </small>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default TempleDetails;