import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../css/TempleList.css";

import tirupati from "../images/tirupati.jpg";
import srisailam from "../images/srisailam.jpg";
import bhadrachalam from "../images/bhadrachalam.jpg";
import yadadri from "../images/yadadri.jpg";
import puri from "../images/puri.jpg";

function TempleList() {
  const navigate = useNavigate();

  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All");

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/temple"
      );

      const updatedTemples = res.data.map(
        (temple) => {
          let image = temple.image;

          switch (temple.name) {
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

          return {
            ...temple,
            image,
          };
        }
      );

      setTemples(updatedTemples);
    } catch (err) {
      console.log(err);
      alert("Failed to load temples");
    } finally {
      setLoading(false);
    }
  };

  const viewTemple = (id) => {
    navigate(`/temple/${id}`);
  };

  const filteredTemples = temples.filter(
    (temple) => {
      const matchesSearch =
        temple.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        temple.location
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesState =
        stateFilter === "All" ||
        temple.location
          .toLowerCase()
          .includes(
            stateFilter.toLowerCase()
          );

      return (
        matchesSearch && matchesState
      );
    }
  );

  const states = [
    "All",
    ...new Set(
      temples.map((temple) => {
        const parts =
          temple.location.split(",");
        return parts[
          parts.length - 1
        ].trim();
      })
    ),
  ];

  if (loading) {
    return (
      <div className="temple-page">
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Loading Temples...
        </h2>
      </div>
    );
  }

  return (
    <div className="temple-page">
      <h1 className="title">
        🛕 Sacred Temple Collection
      </h1>

      <p className="subtitle">
        Discover India's Most Divine
        Temples
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search Temple..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "350px",
            padding: "14px",
            borderRadius: "12px",
            border:
              "2px solid #ff9800",
            fontSize: "16px",
          }}
        />

        <select
          value={stateFilter}
          onChange={(e) =>
            setStateFilter(
              e.target.value
            )
          }
          style={{
            width: "250px",
            padding: "14px",
            borderRadius: "12px",
            border:
              "2px solid #ff9800",
            fontSize: "16px",
          }}
        >
          {states.map((state) => (
            <option
              key={state}
              value={state}
            >
              {state === "All"
                ? "All States"
                : state}
            </option>
          ))}
        </select>
      </div>

      <div className="temple-grid">
        {filteredTemples.length ===
        0 ? (
          <h2>No Temple Found</h2>
        ) : (
          filteredTemples.map(
            (temple) => (
              <div
                className="temple-card"
                key={temple._id}
              >
                <img
                  src={
                    temple.image?.startsWith(
                      "/uploads"
                    )
                      ? `http://localhost:5000${temple.image}`
                      : temple.image
                  }
                  alt={temple.name}
                />

                <div className="card-content">
                  <h2>
                    {temple.name}
                  </h2>

                  <p>
                    📍{" "}
                    {temple.location}
                  </p>

                  <button
                    onClick={() =>
                      viewTemple(
                        temple._id
                      )
                    }
                  >
                    🙏 View Details
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default TempleList;