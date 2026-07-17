import "./Login.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import logo from "../../assets/logo.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, users } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginStart());

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Check registered users first
      const registeredUser = users.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      if (registeredUser) {
        // Login with registered user
        const { password, ...userWithoutPassword } = registeredUser;
        dispatch(loginSuccess(userWithoutPassword));
        navigate("/");
      } else if (
        // Demo credentials fallback
        formData.email === "admin@onsite.com" &&
        formData.password === "admin123"
      ) {
        const user = {
          id: "demo",
          name: "Samadrita",
          email: formData.email,
          role: "Admin",
        };
        dispatch(loginSuccess(user));
        navigate("/");
      } else {
        dispatch(loginFailure("Invalid email or password"));
      }
    }, 1000);
  };

  return (
    <div className="login-container">
      {/* Left Side - Image/Branding */}
      <div className="login-left">
        <div className="login-branding">
          <div className="brand-logo">
            <img src={logo} alt="Onsite Teams" />
          </div>
          <h1>Onsite Teams</h1>
          <p>Construction ERP</p>
          <div className="brand-tagline">
            <h2>Build Today.<br />Better Tomorrow.</h2>
            <p>Streamline your construction projects from start to finish.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-right">
        <div className="login-form-container">
          <div className="login-header">
            <h2>Welcome Back!</h2>
            <p>Sign in to continue to your dashboard</p>
          </div>

          {error && (
            <div className="error-message">
              <span>⚠️ {error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                {/* <MdEmail className="input-icon" /> */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="admin@onsite.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                {/* <MdLock className="input-icon" /> */}
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="signup-link">
            <p>
              Don't have an account?{" "}
              <Link to="/signup">Sign up here</Link>
            </p>
          </div>

          <div className="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: admin@onsite.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
