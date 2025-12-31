import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import Instance from "../../API/axios";
import { toast } from "react-toastify";

const LoginForm = ({ onSwitch }) => {

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  

  const [isSubmitting, setIsSubmitting] = useState(false);
  
 
  const navigate = useNavigate();

  
  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setCredentials((prev) => ({ 
      ...prev, 
      [fieldName]: fieldValue 
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    
    try {
      const result = await Instance.post("/auth/login", credentials, {
        withCredentials: true,
      });
  
      toast.success("Welcome back! Redirecting to home.");

      
      localStorage.setItem("user", JSON.stringify(result.data.user));

      
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg);
      console.error("Login error:", errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-header">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">
          Sign in to access your SkyPath account and continue planning your journey
        </p>
      </div>

      <form onSubmit={handleLogin} className="login-form">
        
        <div className="form-field">
          <label htmlFor="userEmail" className="field-label">
            Email Address
          </label>
          <input
            id="userEmail"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            className="field-input"
            required
          />
        </div>

        
        <div className="form-field">
          <label htmlFor="userPassword" className="field-label">
            Password
          </label>
          <input
            id="userPassword"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            className="field-input"
            required
          />
        </div>

        
        <div className="forgot-password">
          <a href="#" className="forgot-link">Forgot password?</a>
        </div>

       
        <button 
          className="submit-button" 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      
      <div className="form-divider">
        <span className="divider-line"></span>
        <span className="divider-text">or</span>
        <span className="divider-line"></span>
      </div>

      
      <div className="form-footer">
        <p>
          Don't have an account?{" "}
          <span className="switch-link" onClick={onSwitch}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;