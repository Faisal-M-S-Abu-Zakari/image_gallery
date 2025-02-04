import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import "../styles/global.css";
import "../styles/login.css";
import logo from "../../public/image.png";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
const RegisterPage = () => {
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const check = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      name.current?.value &&
      email.current?.value &&
      password.current?.value &&
      check.current?.checked
    ) {
      const newUser = {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
        check: check.current.checked,
      };
      const existingUsers = localStorage.getItem("users");
      const usersArray = existingUsers ? JSON.parse(existingUsers) : [];
      usersArray.push(newUser);
      localStorage.setItem("users", JSON.stringify(usersArray));
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
        <form onSubmit={handelSubmit} className="register-form">
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
          <div className="flex check-register ">
            <input type="checkbox" ref={check} />
            <label>I agree with Terms & Conditions</label>
          </div>
          <button className="register-btn">Sign Up</button>
        </form>
        <p className="signup">
          already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
