import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Plane, MapPin, Calendar, Users, Menu, X } from 'lucide-react';
import './Landing.css';
import { toast } from "react-toastify";

const LandingPage = () => {

  const navigate = useNavigate();
  
  const currentDate = new Date();
  const date = currentDate.getDate();
  let month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Add leading zero if month is less than 10
  if (month < 10) {
    month = `0${month + 1}`;
  }

  const today = `${year}-${month}-${date}`;

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    travelDate: "",
    travelers: 1,
    flightClass: "economy",
    budget: "mid-range",
    flexibility: "exact",
  });

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formHandler = async (event) => {
      event.preventDefault();
  
      try {
        const authRes = await fetch(`${import.meta.env.VITE_BASEURL_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });
  
        if (!authRes.ok) {
          toast.warn("Please Login First");
          navigate("/auth", { replace: true });
          return;
        }
  
        navigate("/loading", { replace: true });
  
        const response = await fetch(`${import.meta.env.VITE_BASEURL_URL}/api/flight/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", 
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        // Check if the response indicates a rate limit error
        if (response.status === 429) {
          navigate("/", { replace: true });
          const retryAfter = data.retryAfter || 7;
          toast.warn(
            `⏳ Rate limit reached. The system will automatically retry. Please wait ${retryAfter} seconds and try again if needed.`,
            { 
              autoClose: 8000,
              position: "top-center"
            }
          );
          return;
        }
  
        // Check if the request was successful
        if (!response.ok || !data.success) {
          navigate("/", { replace: true });
          toast.error(data.message || "Failed to generate flight suggestions. Please try again.");
          return;
        }
  
        navigate("/flight", { state: { flight: data.flight } });
      } catch (error) {
        console.error("Error generating flight suggestions:", error);
        navigate("/", { replace: true });
        toast.error("Something went wrong. Please try again.");
      }
    };

  return (
    <div className="landing-page">

      <div className="hero-section">
        <div className="hero-bg">
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-heading">
                Plan Smarter, <br/>Travel Farther.
              </h1>
              <p className="hero-subheading">
                SkyPath uses AI to craft your perfect flight plan from routes and pricing to smart tips all tailored to your budget and date.
              </p>
              
        
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">✈️</div>
                  <div>
                    <h3>Smart Route Planning</h3>
                    <p>Find the best connections and layovers</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">💰</div>
                  <div>
                    <h3>Price Analysis</h3>
                    <p>Get insights on the best time to fly</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">💡</div>
                  <div>
                    <h3>Travel Tips</h3>
                    <p>Personalized advice for your journey</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="flight-form-card">
              <h2 className="form-heading">Get Flight Suggestions</h2>
              
              <form onSubmit={formHandler}>

                <div className="form-group">
                  <label htmlFor="origin">From</label>
                  <div className="input-wrapper">
                    <MapPin className="input-icon" />
                    <input 
                      type="text" 
                      name="origin"
                      id="origin"
                      placeholder="Mumbai, India"
                      onChange={changeHandler}
                      value={formData.origin}
                      required
                    />
                  </div>
                </div>


                <div className="form-group">
                  <label htmlFor="destination">To</label>
                  <div className="input-wrapper">
                    <MapPin className="input-icon" />
                    <input 
                      type="text" 
                      name="destination"
                      id="destination"
                      placeholder="Dubai, UAE"
                      onChange={changeHandler}
                      value={formData.destination}
                      required
                    />
                  </div>
                </div>

   
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="travelDate">Travel Date</label>
                    <div className="input-wrapper">
                      <Calendar className="input-icon" />
                      <input 
                        type="date"
                        name="travelDate"
                        id="travelDate"
                        onChange={changeHandler}
                        min={today}
                        value={formData.travelDate}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="travelers">Travelers</label>
                    <div className="input-wrapper">
                      <Users className="input-icon" />
                      <input 
                        type="number"
                        name="travelers"
                        id="travelers"
                        min="1"
                        max="9"
                        onChange={changeHandler}
                        value={formData.travelers}
                        required
                      />
                    </div>
                  </div>
                </div>

         
                <div className="form-group">
                  <label htmlFor="flightClass">Class</label>
                  <select 
                    name="flightClass" 
                    id="flightClass" 
                    onChange={changeHandler}
                    value={formData.flightClass}
                    required
                  >
                    <option value="economy">Economy</option>
                    <option value="premium-economy">Premium Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>


                <div className="form-group">
                  <label htmlFor="budget">Budget</label>
                  <select 
                    name="budget" 
                    id="budget" 
                    onChange={changeHandler}
                    value={formData.budget}
                    required
                  >
                    <option value="budget">Budget</option>
                    <option value="mid-range">Mid-Range</option>
                    <option value="premium">Premium</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>


                <div className="form-group">
                  <label htmlFor="flexibility">Date Flexibility</label>
                  <select 
                    name="flexibility" 
                    id="flexibility" 
                    onChange={changeHandler}
                    value={formData.flexibility}
                    required
                  >
                    <option value="exact">Exact Date Only</option>
                    <option value="plus-minus-1">±1 Day</option>
                    <option value="plus-minus-3">±3 Days</option>
                    <option value="flexible">Flexible (Any date this month)</option>
                  </select>
                </div>

                <button type="submit" className="submit-btn">
                  Get Suggestions
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="features-container">
          <h2 className="section-heading">What You'll Get</h2>
          <p className="section-subheading">AI-powered suggestions tailored to your needs</p>
          
          <div className="features-grid">
        
            <div className="feature-card">
              <img 
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80" 
                alt="Airplane wing" 
              />
              <h3>Route Options</h3>
              <p>
                Get multiple flight route suggestions including direct flights and layover options
              </p>
            </div>

           
            <div className="feature-card">
              <img 
                src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=400&q=80" 
                alt="Price chart" 
              />
              <h3>Price Insights</h3>
              <p>
                Understand pricing trends and get tips on when to book for the best deals
              </p>
            </div>

    
            <div className="feature-card">
              <img 
                src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80" 
                alt="Travel planning" 
              />
              <h3>Travel Tips</h3>
              <p>
                Receive personalized advice and recommendations for your specific journey
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="steps-section">
        <div className="steps-container">
          <h2 className="section-heading">How It Works</h2>
          
          <div className="steps-grid">
    
            <div className="step-item">
              <div className="step-number">1</div>
              <h3>Enter Details</h3>
              <p>
                Fill in your departure, destination, date and budget preferences
              </p>
            </div>


            <div className="step-item">
              <div className="step-number">2</div>
              <h3>AI Analysis</h3>
              <p>
                Our system analyzes routes, prices and patterns to create your plan
              </p>
            </div>


            <div className="step-item">
              <div className="step-number">3</div>
              <h3>Get Results</h3>
              <p>
                Receive detailed suggestions with routes, pricing and personalized tips
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-bg">
          <div className="cta-overlay"></div>
        </div>
        
        <div className="cta-content">
          <h2>Ready to Plan Your Trip?</h2>
          <p>Get personalized flight suggestions in seconds</p>
          <button className="cta-btn">Get Started</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <Plane className="footer-icon" />
              <span>SkyPath</span>
            </div>
            <div className="footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <div className="footer-copyright">
            © 2026 SkyPath. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;