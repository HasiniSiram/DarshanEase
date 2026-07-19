import { useState } from "react";
import axios from "axios";
import "../css/Login.css";

function Login() {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        user
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", user.email);

      alert(res.data.message);

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h2>Login to DarshanEase</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button onClick={loginUser}>
          Login
        </button>

        <p>
          Don't have an account?
          <span> Register</span>
        </p>

      </div>

    </div>
  );
}

export default Login;