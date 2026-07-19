import { useState } from "react";
import axios from "axios";

function AddTemple() {
  const [temple, setTemple] = useState({
  name: "",
  location: "",
  image: "",
  description: "",
  timings: "",
  darshanTypes: [
    {
      name: "",
      price: "",
    },
  ],
});
const [imageFile, setImageFile] = useState(null);

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
const saveTemple = async () => {
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

    formData.append("image", imageFile);

    await axios.post(
      "http://localhost:5000/api/temple/add",
      formData
    );

    alert("Temple Added Successfully!");

    setTemple({
      name: "",
      location: "",
      image: "",
      description: "",
      timings: "",
      darshanTypes: [
        {
          name: "",
          price: "",
        },
      ],
    });

    setImageFile(null);

  } catch (err) {
    console.log(err);
    console.log(err.response);

    alert(
      err.response?.data?.message ||
      "Failed to Add Temple"
    );
  }
};
  
  return (
    <div className="login-container">
      <div className="login-box">

        <h2>🛕 Add Temple</h2>

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
          value={temple.description}
          onChange={handleChange}
          rows="4"
        />

        <input
          type="text"
          name="timings"
          placeholder="Temple Timings"
          value={temple.timings}
          onChange={handleChange}
        />
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
      onChange={(e) => handleDarshanChange(index, e)}
    />

    <input
      type="number"
      name="price"
      placeholder="Price"
      value={type.price}
      onChange={(e) => handleDarshanChange(index, e)}
    />

    {temple.darshanTypes.length > 1 && (
      <button
        type="button"
        onClick={() => removeDarshanType(index)}
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

        <button onClick={saveTemple}>
          ➕ Add Temple
        </button>

      </div>
    </div>
  );
}

export default AddTemple;