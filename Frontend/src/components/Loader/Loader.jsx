import Navbar from "../Navbar/Navbar";
import "./Loader.css";

const Loader = () => (
  <>
    <Navbar />
    <div className="centerLoader">
      <div className="dotLoader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>Generating, please wait...</p>
    </div>
  </>
);

export default Loader;
