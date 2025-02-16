// src/pages/RegisterPage.tsx
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import "../styles/global.css";
import "../styles/login.css";
import logo from "../../public/image.png";
import { useForm } from "../hooks/useForm ";

const RegisterPage = () => {
  const { name, email, password, check, getFormData } = useForm();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = getFormData();
    if (newUser) {
      const existingUsers = localStorage.getItem("users");
      const usersArray = existingUsers ? JSON.parse(existingUsers) : [];
      usersArray.push(newUser);
      localStorage.setItem("users", JSON.stringify(usersArray));
      localStorage.setItem("loggedInUser", JSON.stringify(newUser.name));
      navigate("/upload");
    } else {
      alert(
        "Make sure you fill all the fields and agree with Terms & Conditions"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="background"></div>
      <div className="login-container">
        <div className="flex justify-center items-center">
          <img src={logo} alt="logo" className="w-40" />
        </div>
        <div>
          <h2>Create Account</h2>
          <p>Join us to manage and share your photos seamlessly!</p>
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <MdPerson
              style={{ fontSize: "18px", marginRight: "8px", color: "#666" }}
            />
            <input type="text" placeholder="Your name" ref={name} required />
          </div>
          <div className="input-group">
            <MdEmail
              style={{ fontSize: "18px", marginRight: "8px", color: "#666" }}
            />
            <input
              type="email"
              placeholder="Your email address"
              ref={email}
              required
            />
          </div>
          <div className="input-group">
            <MdLock
              style={{ fontSize: "18px", marginRight: "8px", color: "#666" }}
            />
            <input
              type="password"
              placeholder="Create a password"
              ref={password}
              required
            />
          </div>
          <div className="flex check-register">
            <input type="checkbox" ref={check} />
            <label>I agree with Terms & Conditions</label>
          </div>
          <button className="register-btn">Sign Up</button>
        </form>
        <p className="signup">
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
