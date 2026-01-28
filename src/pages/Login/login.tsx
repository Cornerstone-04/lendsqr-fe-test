import { useEffect, useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router";
import loginIllustration from "../../assets/images/login-illustration.png";
import LendsqrLogo from "../../assets/icons/lendsqr-logo.svg";
import { isAuthenticated } from "../../utils/auth";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/users");
    }
  }, [navigate]);

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser = {
      email,
      name: email.split("@")[0],
    };

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(mockUser));

    setIsLoading(false);
    navigate("/users");
  };

  return (
    <main className="login-page">
      <section className="login-left">
        <div className="login-logo">
          <img src={LendsqrLogo} alt="Lendsqr Logo" />
        </div>
        <div className="login-illustration">
          <img src={loginIllustration} alt="Lendsqr Login Illustration" />
        </div>
      </section>
      <section className="login-right">
        <div className="login-form-container">
          <h1 className="login-title">Welcome!</h1>
          <p className="login-subtitle">Enter details to login</p>

          <form
            onSubmit={handleSubmit}
            className="login-form"
            data-testid="login-form"
          >
            <div className="form-group">
              <input
                type="email"
                className="form-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="email-input"
              />
              {errors.email && (
                <span className="form-error" data-testid="email-error">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="form-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="password-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                data-testid="password-toggle"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
              {errors.password && (
                <span className="form-error" data-testid="password-error">
                  {errors.password}
                </span>
              )}
            </div>
            <a href="/forgot-password">FORGOT PASSWORD?</a>
            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
              data-testid="login-button"
            >
              {isLoading ? "LOGGING IN..." : "LOG IN"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
