import { useState } from "react";
import "./SignupForm.css";
import Instance from "../../API/axios";
import { toast } from "react-toastify";

const SignupForm = ({ onSwitch }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);


  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevData) => ({ 
      ...prevData, 
      [fieldName]: fieldValue 
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    
    try {
      const response = await Instance.post("/auth/signup", formData, {
        withCredentials: true,
      });
      
      toast.success("Account created successfully! Please sign in.");

      setTimeout(() => onSwitch(), 1000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Signup failed";
      console.error("Signup error:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-header">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">
          Join SkyPath to explore AI-powered flight suggestions and travel planning
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="signup-form">
 
        <div className="form-field">
          <label htmlFor="userName" className="field-label">
            Full Name
          </label>
          <input
            id="userName"
            type="text"
            placeholder="Enter your full name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="field-input"
            required
          />
        </div>


        <div className="form-field">
          <label htmlFor="userEmail" className="field-label">
            Email Address
          </label>
          <input
            id="userEmail"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
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
            placeholder="Create a strong password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="field-input"
            required
          />
        </div>


        <button 
          className="submit-button" 
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <div className="form-divider">
        <span className="divider-line"></span>
        <span className="divider-text">or</span>
        <span className="divider-line"></span>
      </div>


      <div className="form-footer">
        <p>
          Already have an account?{" "}
          <span className="switch-link" onClick={onSwitch}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;