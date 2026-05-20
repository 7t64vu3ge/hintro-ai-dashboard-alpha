import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { setUserId } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (email === "u1@test.com") {
      setUserId("u1");
      localStorage.setItem("userId", "u1");
      navigate("/dashboard");
      return;
    }

    if (email === "u2@test.com") {
      setUserId("u2");
      localStorage.setItem("userId", "u2");
      navigate("/dashboard");
      return;
    }

    setError("Invalid email. Use u1@test.com or u2@test.com");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label className="input-label">Email</label>
            <div className="input-wrapper">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="input-icon-left"
              >
                <path
                  d="M1.25 7.22425V14.375C1.25 15.7557 2.36929 16.875 3.75 16.875H16.25C17.6307 16.875 18.75 15.7557 18.75 14.375V7.22425L11.3102 11.8026C10.5067 12.297 9.49327 12.297 8.68976 11.8026L1.25 7.22425Z"
                  fill="black"
                  fillOpacity="0.25"
                />
                <path
                  d="M18.75 5.75652V5.625C18.75 4.24429 17.6307 3.125 16.25 3.125H3.75C2.36929 3.125 1.25 4.24429 1.25 5.625V5.75652L9.34488 10.738C9.74664 10.9852 10.2534 10.9852 10.6551 10.738L18.75 5.75652Z"
                  fill="black"
                  fillOpacity="0.25"
                />
              </svg>
              <input
                type="email"
                placeholder="Example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input input-with-icon-left"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input input-with-icon-right"
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Outer eye boundary + iris boundary */}
                    <path
                      d="M7 11.7032C3.76784 11.7032 1.02692 9.6079 0.0587374 6.70307C-0.0195063 6.46831 -0.0195808 6.21431 0.0585244 5.97951C1.02621 3.07468 3.76713 0.975271 7.00057 0.975271C10.2322 0.975271 12.9731 3.07062 13.9413 5.97545C14.0196 6.21421 14.0195 6.46821 13.9415 6.69901C12.9733 9.60384 10.2324 11.7032 7 11.7032ZM7 2.92581C5.11504 2.92581 3.58679 4.45406 3.58679 6.33926C3.58679 8.22445 5.11504 9.7527 7 9.7527C8.88543 9.7527 10.4137 8.22445 10.4137 6.33926C10.4137 4.45406 8.88543 2.92581 7 2.92581Z"
                      fill="#9CA3AF"
                    />
                    {/* Pupil */}
                    <circle cx="7" cy="6.33926" r="2.438" fill="#9CA3AF" />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.49342 0.142825C1.30299 -0.0476083 0.994233 -0.0476083 0.803799 0.142825C0.613366 0.333258 0.613366 0.642012 0.803799 0.832445L12.507 12.5357C12.6975 12.7261 13.0062 12.7261 13.1967 12.5357C13.3871 12.3453 13.3871 12.0365 13.1967 11.8461L1.49342 0.142825Z"
                      fill="#9CA3AF"
                    />
                    <path
                      d="M13.9415 6.69901C13.5878 7.76231 12.9966 8.71728 12.2307 9.50091L10.2162 7.48633C10.344 7.12783 10.4137 6.74168 10.4137 6.33926C10.4137 4.45406 8.88543 2.92581 7.00023 2.92581C6.59781 2.92581 6.21166 2.99545 5.85316 3.12333L4.2428 1.51297C5.0938 1.1663 6.02482 0.975271 7.00057 0.975271C10.2322 0.975271 12.9731 3.07062 13.9413 5.97545C14.0195 6.21021 14.0196 6.46421 13.9415 6.69901Z"
                      fill="#9CA3AF"
                    />
                    <path
                      d="M9.43841 6.33926C9.43841 6.4564 9.43015 6.57161 9.41418 6.68434L6.65515 3.92531C6.76788 3.90934 6.88309 3.90108 7.00023 3.90108C8.3468 3.90108 9.43841 4.99269 9.43841 6.33926Z"
                      fill="#9CA3AF"
                    />
                    <path
                      d="M7.34532 8.7532L4.58629 5.99418C4.57032 6.10691 4.56206 6.22212 4.56206 6.33926C4.56206 7.68583 5.65367 8.77743 7.00023 8.77743C7.11737 8.77743 7.23258 8.76917 7.34532 8.7532Z"
                      fill="#9CA3AF"
                    />
                    <path
                      d="M3.58679 6.33926C3.58679 5.93684 3.65642 5.55069 3.7843 5.19219L1.76948 3.17737C1.00353 3.96104 0.412262 4.9161 0.0585244 5.97951C-0.0195808 6.21431 -0.0195063 6.46831 0.0587374 6.70307C1.02692 9.6079 3.76784 11.7032 6.99943 11.7032C7.97531 11.7032 8.90645 11.5122 9.75753 11.1654L8.1473 9.55519C7.78881 9.68307 7.40265 9.7527 7.00023 9.7527C5.11504 9.7527 3.58679 8.22445 3.58679 6.33926Z"
                      fill="#9CA3AF"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;