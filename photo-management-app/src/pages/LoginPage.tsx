import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock } from "react-icons/md";
import "../styles/global.css";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/image.png";
import { useRef } from "react";
const LoginPage = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const existingUsers = localStorage.getItem("users");
    const usersArray = existingUsers ? JSON.parse(existingUsers) : [];
    const userExists = usersArray.find(
      (user: { email: string; password: string }) =>
        user.email === email.current?.value &&
        user.password === password.current?.value
    );

    if (userExists) {
      localStorage.setItem("loggedInUser", JSON.stringify(userExists.name));
      navigate("/upload");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };
  return (
    <div className="login-page">
      <div className="background"></div>

      <div className="login-container">
        <div className="flex justify-center items-center">
          <img src={logo} alt="logo" className="w-40" />
        </div>
        <h2>Sign in to SnapShare</h2>
        <p>Join us to manage and share your photos seamlessly!</p>

        <button className="google-login">
          <FcGoogle style={{ fontSize: "20px", marginRight: "8px" }} />
          Continue with Google
        </button>

        <div className="separator">
          <hr />
          <span>or</span>
          <hr />
        </div>

        <form onSubmit={handleLogin}>
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

          <button className="register-btn ">Log in</button>
        </form>

        <p className="signup">
          No account? <Link to={"/register"}>Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
