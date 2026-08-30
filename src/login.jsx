import React, { useState } from "react";
import "./auth.css";

export default function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (onLogin) {
      onLogin({
        email: email.trim(),
        password,
        remember,
      });
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-decoration auth-decoration-one"></div>
      <div className="auth-decoration auth-decoration-two"></div>

      <div className="auth-container">

        <div className="auth-brand">
          <div className="auth-logo">S</div>

          <div>
            <div className="auth-brand-name">SocialAI</div>
            <div className="auth-brand-tagline">
              AI SOCIAL WORKSPACE
            </div>
          </div>
        </div>

        <div className="auth-card">

          <div className="auth-card-header">
            <span className="auth-eyebrow">
              WELCOME BACK
            </span>

            <h1>
              Login to your
              <br />
              <em>workspace.</em>
            </h1>

            <p>
              Continue creating, planning and managing
              your social media content with SocialAI.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="auth-field">
              <label htmlFor="login-email">
                Email address
              </label>

              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="login-password">
                  Password
                </label>

                <button
                  type="button"
                  className="auth-forgot"
                  onClick={() =>
                    setError("Password reset will be available soon.")
                  }
                >
                  Forgot password?
                </button>
              </div>

              <div className="auth-password-wrap">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "◉" : "○"}
                </button>
              </div>
            </div>

            <div className="auth-options">
              <label className="auth-checkbox">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) =>
                    setRemember(event.target.checked)
                  }
                />
                <span>Remember me</span>
              </label>
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
            >
              <span>Login to SocialAI</span>
              <span>→</span>
            </button>

          </form>

          <div className="auth-divider">
            <span>NEW TO SOCIALAI?</span>
          </div>

          <button
            type="button"
            className="auth-register"
            onClick={onRegister}
          >
            Create a new account
            <span>↗</span>
          </button>

        </div>

        <div className="auth-footer">
          <span>© 2026 SocialAI</span>
          <span>AI CONTENT WORKSPACE</span>
        </div>

      </div>
    </div>
  );
}