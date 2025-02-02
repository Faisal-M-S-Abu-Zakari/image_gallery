import { FcGoogle } from "react-icons/fc";
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
          <FcGoogle className="google-icon" />
          Continue with Google
        </button>

        <div className="separator">
          <hr />
          <span>or</span>
          <hr />
        </div>

        <form>
          <input type="email" placeholder="Your email address" required />
          <input type="password" placeholder="Create a password" required />
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
