import React, { useState } from "react";
import "./auth.css";

export default function Register({ onRegister, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError("Please accept the terms to continue.");
      return;
    }

    if (onRegister) {
      onRegister({
        name: name.trim(),
        email: email.trim(),
        password,
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
              CREATE YOUR ACCOUNT
            </span>

            <h1>
              Start your
              <br />
              <em>social journey.</em>
            </h1>

            <p>
              Create your SocialAI account and start
              turning ideas into engaging social content.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="auth-field">
              <label htmlFor="register-name">
                Full name
              </label>

              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                autoComplete="name"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-email">
                Email address
              </label>

              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-password">
                Password
              </label>

              <div className="auth-password-wrap">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                >
                  {showPassword ? "◉" : "○"}
                </button>
              </div>

              <span className="auth-hint">
                Use at least 6 characters.
              </span>
            </div>

            <div className="auth-field">
              <label htmlFor="register-confirm-password">
                Confirm password
              </label>

              <div className="auth-password-wrap">
                <input
                  id="register-confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (current) => !current
                    )
                  }
                >
                  {showConfirmPassword ? "◉" : "○"}
                </button>
              </div>
            </div>

            <label className="auth-checkbox auth-terms">
              <input
                type="checkbox"
                checked={agree}
                onChange={(event) =>
                  setAgree(event.target.checked)
                }
              />

              <span>
                I agree to the SocialAI terms and privacy policy.
              </span>
            </label>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
            >
              <span>Create SocialAI account</span>
              <span>→</span>
            </button>

          </form>

          <div className="auth-divider">
            <span>ALREADY HAVE AN ACCOUNT?</span>
          </div>

          <button
            type="button"
            className="auth-register"
            onClick={onLogin}
          >
            Login to SocialAI
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