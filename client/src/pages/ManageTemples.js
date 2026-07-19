import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManageTemples() {
  const navigate = useNavigate();

  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/temple"
      );

      setTemples(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load temples");
    } finally {
      setLoading(false);
    }
  };
  const deleteTemple = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this temple?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `http://localhost:5000/api/temple/${id}`
    );

    alert("Temple deleted successfully.");

    fetchTemples(); // Refresh list
  } catch (err) {
    console.log(err);
    alert("Failed to delete temple.");
  }
};

  return (
    <div className="admin-container">
      <h1>🛕 Manage Temples</h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Temple Name</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {temples.map((temple) => (
              <tr key={temple._id}>
                <td>{temple.name}</td>

                <td>{temple.location}</td>

                <td>
                <button
  onClick={() =>
    navigate(`/admin/edit-temple/${temple._id}`)
  }
>
  ✏️ Edit
</button>
                  <button
  style={{
    marginLeft: "10px",
  }}
  onClick={() => deleteTemple(temple._id)}
>
  🗑️ Delete
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

export default ManageTemples;