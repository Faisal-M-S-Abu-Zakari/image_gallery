import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock } from "react-icons/md";
import "../styles/global.css";
import "../styles/login.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="background"></div>

      <div className="login-container">
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

        <form>
          <div className="input-group">
            <MdEmail
              style={{ fontSize: "18px", marginRight: "8px", color: "#666" }}
            />
            <input type="email" placeholder="Your email address" required />
          </div>

          <div className="input-group">
            <MdLock
              style={{ fontSize: "18px", marginRight: "8px", color: "#666" }}
            />
            <input type="password" placeholder="Create a password" required />
          </div>

          <button type="submit" className="login-btn">
            Log in
          </button>
        </form>

        <p className="signup">
          No account? <a href="#">Create one</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
