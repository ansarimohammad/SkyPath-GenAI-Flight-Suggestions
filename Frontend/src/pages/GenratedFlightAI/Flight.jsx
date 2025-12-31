import { useLocation } from "react-router-dom";
import "./Flight.css";
import FlightHeader from "../../components/FlightHeader/FlightHeader";

const Flight = () => {

  const location = useLocation();
  
  // Get flight data from navigation state
  const flight = location.state?.flight;

  if (!flight) {
    return null;
  }

  return (
    <>
      <FlightHeader />
      <div className="flight-page">

        <div className="content-wrapper">
          <div className="page-header">
            <div>
              <h1 className="route-title">
                {flight.searchDetails.from} <span className="arrow">→</span> {flight.searchDetails.to}
              </h1>
              <div className="trip-metadata">
                <span className="meta-item">
                  <span className="icon">📅</span> {flight.searchDetails.date}
                </span>
                <span className="meta-item">
                  <span className="icon">👥</span> {flight.searchDetails.travelers} Travelers
                </span>
                <span className="meta-item">
                  <span className="icon">💺</span> {flight.searchDetails.class}
                </span>
              </div>
            </div>
            <span className="budget-badge">{flight.searchDetails.budget}</span>
          </div>

          {/* Best flight options */}
          <section className="flights-section">
            <h2 className="section-title">
              <span className="title-icon">✨</span>
              Best Flight Options
            </h2>
            
            <div className="flights-grid">
              {flight.bestOptions.map((bestFlight, idx) => (
                <div key={idx} className="flight-card premium">
                  <div className="card-top">
                    <div className="airline-info">
                      <h3>{bestFlight.airline}</h3>
                      <span className="flight-num">{bestFlight.flightNumber}</span>
                    </div>
                    <div className="price-tag">{bestFlight.estimatedPrice}</div>
                  </div>

                  <div className="aircraft-info">
                    <span>✈️ {bestFlight.aircraft}</span>
                  </div>

                  <div className="journey-timeline">
                    <div className="timeline-point">
                      <div className="big-time">{bestFlight.departure.time}</div>
                      <div className="location">{bestFlight.departure.airport}</div>
                      <div className="terminal">Terminal {bestFlight.departure.terminal}</div>
                    </div>

                    <div className="timeline-middle">
                      <div className="connector"></div>
                      <div className="duration-badge">{bestFlight.duration}</div>
                      <div className="stops-label">{bestFlight.stops}</div>
                      {bestFlight.layover && (
                        <div className="layover-note">Layover: {bestFlight.layover}</div>
                      )}
                    </div>

                    <div className="timeline-point">
                      <div className="big-time">{bestFlight.arrival.time}</div>
                      <div className="location">{bestFlight.arrival.airport}</div>
                      <div className="terminal">Terminal {bestFlight.arrival.terminal}</div>
                    </div>
                  </div>

                  <div className="card-details">
                    <div className="detail-row">
                      <strong>Amenities:</strong>
                      <span>{bestFlight.amenities.join(", ")}</span>
                    </div>
                    <div className="detail-row">
                      <strong>Baggage:</strong>
                      <span>Cabin: {bestFlight.baggageAllowance.cabin} | Checked: {bestFlight.baggageAllowance.checkedIn}</span>
                    </div>
                    <div className="detail-row">
                      <strong>Cancellation:</strong>
                      <span>{bestFlight.cancellationPolicy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Alternative options */}
          <section className="flights-section">
            <h2 className="section-title">
              <span className="title-icon">💰</span>
              Budget-Friendly Alternatives
            </h2>
            
            <div className="flights-grid">
              {flight.alternativeOptions.map((altFlight, i) => (
                <div key={i} className="flight-card budget">
                  <div className="card-top">
                    <div className="airline-info">
                      <h3>{altFlight.airline}</h3>
                      <span className="flight-num">{altFlight.flightNumber}</span>
                    </div>
                    <div className="price-tag budget-price">{altFlight.estimatedPrice}</div>
                  </div>

                  <div className="aircraft-info">
                    <span>✈️ {altFlight.aircraft}</span>
                  </div>

                  <div className="journey-timeline">
                    <div className="timeline-point">
                      <div className="big-time">{altFlight.departure.time}</div>
                      <div className="location">{altFlight.departure.airport}</div>
                      <div className="terminal">Terminal {altFlight.departure.terminal}</div>
                    </div>

                    <div className="timeline-middle">
                      <div className="connector"></div>
                      <div className="duration-badge">{altFlight.duration}</div>
                      <div className="stops-label">{altFlight.stops}</div>
                      {altFlight.layover && (
                        <div className="layover-note">Layover: {altFlight.layover}</div>
                      )}
                    </div>

                    <div className="timeline-point">
                      <div className="big-time">{altFlight.arrival.time}</div>
                      <div className="location">{altFlight.arrival.airport}</div>
                      <div className="terminal">Terminal {altFlight.arrival.terminal}</div>
                    </div>
                  </div>

                  <div className="card-details">
                    <div className="detail-row">
                      <strong>Amenities:</strong>
                      <span>{altFlight.amenities.join(", ")}</span>
                    </div>
                    <div className="detail-row">
                      <strong>Baggage:</strong>
                      <span>Cabin: {altFlight.baggageAllowance.cabin} | Checked: {altFlight.baggageAllowance.checkedIn}</span>
                    </div>
                    <div className="detail-row">
                      <strong>Cancellation:</strong>
                      <span>{altFlight.cancellationPolicy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Information sections in cards */}
          <div className="info-grid">
            <div className="info-card">
              <h3 className="card-title">💡 Travel Tips</h3>
              <ul className="tips-list">
                {flight.travelTips.map((tipText, tipIndex) => (
                  <li key={tipIndex}>{tipText}</li>
                ))}
              </ul>
            </div>

            <div className="info-card">
              <h3 className="card-title">🌍 Visa Requirements</h3>
              <p>{flight.visaRequirements}</p>
            </div>

            <div className="info-card">
              <h3 className="card-title">🌦️ Weather Forecast</h3>
              <p>{flight.weatherAtDestination}</p>
            </div>

            {/* Price comparison */}
            <div className="info-card">
              <h3 className="card-title">📊 Price Trends</h3>
              <div className="price-details">
                <p><strong>Cheapest Month:</strong> {flight.priceComparison.cheapestMonth}</p>
                <p><strong>Peak Season:</strong> {flight.priceComparison.peakSeason}</p>
                <p><strong>Average Price:</strong> {flight.priceComparison.averagePrice}</p>
              </div>
            </div>
          </div>

          {/* Airport information */}
          <div className="airports-section">
            <div className="airport-card">
              <h3 className="airport-title">🛫 {flight.airportInfo.departure.name}</h3>
              <div className="airport-details">
                <p><strong>Code:</strong> {flight.airportInfo.departure.code}</p>
                <p><strong>Location:</strong> {flight.airportInfo.departure.location}</p>
                <p><strong>Facilities:</strong> {flight.airportInfo.departure.facilities.join(", ")}</p>
                <p><strong>Transportation:</strong> {flight.airportInfo.departure.transportation.join(", ")}</p>
              </div>
            </div>

            <div className="airport-card">
              <h3 className="airport-title">🛬 {flight.airportInfo.arrival.name}</h3>
              <div className="airport-details">
                <p><strong>Code:</strong> {flight.airportInfo.arrival.code}</p>
                <p><strong>Location:</strong> {flight.airportInfo.arrival.location}</p>
                <p><strong>Facilities:</strong> {flight.airportInfo.arrival.facilities.join(", ")}</p>
                <p><strong>Transportation:</strong> {flight.airportInfo.arrival.transportation.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Booking platforms */}
          <div className="booking-section">
            <h3 className="section-title">💳 Where to Book</h3>
            <div className="platforms-grid">
              {flight.bookingPlatforms.map((platformName, platformIndex) => (
                <div key={platformIndex} className="platform-item">
                  {platformName}
                </div>
              ))}
            </div>
          </div>

          {/* Important reminders */}
          <div className="reminders-section">
            <h3 className="section-title">📋 Don't Forget</h3>
            <ul className="reminders-list">
              {flight.importantReminders.map((reminderText, reminderIndex) => (
                <li key={reminderIndex}>{reminderText}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Flight;