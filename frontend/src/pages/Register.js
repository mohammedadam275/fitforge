import React, { useState } from "react";
import API from "../api"; // use your axios instance
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors = {};

    // Username validation
    if (!username.trim()) {
      newErrors.username = "Username is required.";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
    } else {
      const hasNumber = /\d/.test(password);
      if (password.length < 8 || !hasNumber) {
        newErrors.password =
          "Password must be at least 8 characters and contain a number.";
      }
    }

    // Repeat password validation
    if (password !== repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match.";
    }

    // Checkbox validation
    if (!agree) {
      newErrors.agree = "You must agree to the Terms and Conditions.";
    }

    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess("");
      return;
    }

    try {
      await API.post("/auth/register", {
        username,
        password,
      });

      setErrors({});
      setSuccess("Registration successful! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setErrors({ username: "Username already exists." });
      setSuccess("");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px" }}>
      <h2>Register User</h2>

      <form onSubmit={handleRegister}>
        {/* Username */}
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors({ ...errors, username: "" });
            }}
          />
          {errors.username && (
            <p style={{ color: "red" }}>{errors.username}</p>
          )}
        </div>

        {/* Password */}
        <div style={{ marginTop: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: "" });
            }}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password}</p>
          )}
        </div>

        {/* Repeat Password */}
        <div style={{ marginTop: "10px" }}>
          <input
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => {
              setRepeatPassword(e.target.value);
              setErrors({ ...errors, repeatPassword: "" });
            }}
          />
          {errors.repeatPassword && (
            <p style={{ color: "red" }}>{errors.repeatPassword}</p>
          )}
        </div>

        {/* Checkbox */}
        <div style={{ marginTop: "10px" }}>
          <label style={{ color: errors.agree ? "red" : "black" }}>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => {
                setAgree(e.target.checked);
                setErrors({ ...errors, agree: "" });
              }}
            />{" "}
            I agree to the Terms and Conditions
          </label>
          {errors.agree && (
            <p style={{ color: "red" }}>{errors.agree}</p>
          )}
        </div>

        <div style={{ marginTop: "15px" }}>
          <button type="submit">Register</button>
        </div>

        {success && (
          <p style={{ color: "green", marginTop: "10px" }}>{success}</p>
        )}
      </form>
    </div>
  );
}

export default Register;