import { useState } from "react";
import axios from "axios";
import "../css/Register.css";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        user
      );

      alert(res.data.message);
    } catch (err) {
      alert("Registration Failed");
      console.log(err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Your Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={registerUser}>
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Register;