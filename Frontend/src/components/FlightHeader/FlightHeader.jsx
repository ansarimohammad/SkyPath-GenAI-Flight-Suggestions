import './FlightHeader.css';

const FlightHeader = () => {

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flightHeader">
      <div className="headerInfo">
        <p className="titleText">AI Generated Flight Plan</p>
      </div>
      <button className="exportButton" onClick={handlePrint}>
        Print Details
      </button>
    </div>
  );
};

export default FlightHeader;
