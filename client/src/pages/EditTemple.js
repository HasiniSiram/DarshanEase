import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditTemple() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [temple, setTemple] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
  fetchTemple();
}, [id]);

  const fetchTemple = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/temple/${id}`
      );

      setTemple(res.data);
    } catch (err) {
      console.log(err);
      alert("Temple not found");
    }
  };

  const handleChange = (e) => {
    setTemple({
      ...temple,
      [e.target.name]: e.target.value,
    });
  };
  const handleDarshanChange = (index, e) => {
  const updatedDarshanTypes = [...temple.darshanTypes];

  updatedDarshanTypes[index][e.target.name] = e.target.value;

  setTemple({
    ...temple,
    darshanTypes: updatedDarshanTypes,
  });
};
const addDarshanType = () => {
  setTemple({
    ...temple,
    darshanTypes: [
      ...temple.darshanTypes,
      {
        name: "",
        price: "",
      },
    ],
  });
};
const removeDarshanType = (index) => {
  const updatedDarshanTypes = temple.darshanTypes.filter(
    (_, i) => i !== index
  );

  setTemple({
    ...temple,
    darshanTypes: updatedDarshanTypes,
  });
};
  const updateTemple = async () => {
  try {
    const formData = new FormData();

    formData.append("name", temple.name);
    formData.append("location", temple.location);
    formData.append("description", temple.description);
    formData.append("timings", temple.timings);

    formData.append(
      "darshanTypes",
      JSON.stringify(temple.darshanTypes)
    );

    if (imageFile) {
      formData.append("image", imageFile);
    }

    await axios.put(
      `http://localhost:5000/api/temple/${id}`,
      formData
    );

    alert("Temple Updated Successfully");

    navigate("/admin/manage-temples");
  } catch (err) {
    console.log(err);
    alert("Failed to update temple");
  }
};
  if (!temple) {
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

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>✏️ Edit Temple</h2>

        <input
          type="text"
          name="name"
          placeholder="Temple Name"
          value={temple.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={temple.location}
          onChange={handleChange}
        />
        <img
  src={`http://localhost:5000${temple.image}`}
  alt={temple.name}
  width="150"
  style={{
    marginBottom: "10px",
    borderRadius: "8px",
  }}
/>


        <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setImageFile(e.target.files[0])
  }
/>

        <textarea
          name="description"
          placeholder="Temple Description"
          rows="4"
          value={temple.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="timings"
          placeholder="Temple Timings"
          value={temple.timings}
          onChange={handleChange}
        />
        <h3 style={{ marginTop: "20px" }}>
  🙏 Darshan Types
</h3>

{temple.darshanTypes.map((type, index) => (
  <div
    key={index}
    style={{
      border: "1px solid #ddd",
      padding: "10px",
      marginTop: "10px",
      borderRadius: "8px",
    }}
  >
    <input
      type="text"
      name="name"
      placeholder="Darshan Type"
      value={type.name}
      onChange={(e) =>
        handleDarshanChange(index, e)
      }
    />

    <input
      type="number"
      name="price"
      placeholder="Price"
      value={type.price}
      onChange={(e) =>
        handleDarshanChange(index, e)
      }
    />

    {temple.darshanTypes.length > 1 && (
      <button
        type="button"
        onClick={() =>
          removeDarshanType(index)
        }
      >
        ❌ Remove
      </button>
    )}
  </div>
))}

<button
  type="button"
  onClick={addDarshanType}
>
  ➕ Add Another Darshan Type
</button>

<br />
<br />

        <button onClick={updateTemple}>
          💾 Update Temple
        </button>

      </div>
    </div>
  );
}

export default EditTemple;