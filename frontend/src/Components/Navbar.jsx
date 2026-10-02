import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav>
      <div>
        <h2>HireTrack 🚀</h2>
      </div>

      <div>
        <Link to="/dashboard">Dashboard</Link> <Link to="/jobs">My Jobs</Link>{" "}
        <Link to="/add-job">Add Job</Link>
      </div>

      <div>
        <span>Hi, {user?.name || "User"} 👋</span>{" "}
        <button onClick={handleLogout}>Logout 🔓</button>
      </div>
    </nav>
  );
}

export default Navbar;
