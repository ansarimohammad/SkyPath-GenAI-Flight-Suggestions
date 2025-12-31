import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";
import "./AuthPage.css";

const AuthPage = () => {

  const [currentView, setCurrentView] = useState("login");


  const showSignup = () => {
    setCurrentView("signup");
  };


  const showLogin = () => {
    setCurrentView("login");
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
    
        <div className="tab-navigation">
          <button
            className={`nav-tab ${currentView === "login" ? "active-tab" : ""}`}
            onClick={showLogin}
          >
            Sign In
          </button>
          <button
            className={`nav-tab ${currentView === "signup" ? "active-tab" : ""}`}
            onClick={showSignup}
          >
            Sign Up
          </button>
          <div className={`tab-indicator ${currentView === "signup" ? "move-right" : ""}`}></div>
        </div>

        <div className="form-content">
          {currentView === "login" ? (
            <LoginForm onSwitch={showSignup} />
          ) : (
            <SignupForm onSwitch={showLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;