import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
      navigate("/users"); 
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const correctPassword = "1988"; 

    if (password === correctPassword) {
      localStorage.setItem("loggedIn", true); 
      navigate("/users"); 
    } else {
      setError("❌ Parol noto‘g‘ri! Qayta urinib ko‘ring.");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Parolni kiriting..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

<button type="submit">

    Login up
    <div class="arrow-wrapper">
        <div class="arrow"></div>

    </div>
</button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

export default Login;
