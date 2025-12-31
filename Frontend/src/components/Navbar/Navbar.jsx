import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Instance from "../../API/axios";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await Instance.get("/auth/me", { withCredentials: true });
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await Instance.post("/auth/logout", {}, { withCredentials: true });
      toast.success("Logged out");
      setUser(null);
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="navBar">
      <div className="brand" onClick={() => navigate("/")}>
        ✈️ SkyPath
      </div>

      <div className="navRight">
        {user ? (
          <>
            <span className="userBadge">{user.name}</span>
            <button className="logoutBtn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button
            className="loginBtn"
            onClick={() => navigate("/auth")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
