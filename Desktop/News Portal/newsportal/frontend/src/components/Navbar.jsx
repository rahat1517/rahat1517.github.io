import { Link, useNavigate } from "react-router-dom";
import { clearAuth, getUser } from "../auth/token";

export default function Navbar() {
  const nav = useNavigate();
  const user = getUser();

  return (
    <div className="nav">
      <Link to="/" className="brand">NewsPortal</Link>

      <div className="nav-right">
        {user ? (
          <>
            <span className="chip">👤 {user.name} ({user.role})</span>
            <Link to="/create" className="btn">Create Article</Link>
            <button
              className="btn secondary"
              onClick={() => {
                clearAuth();
                nav("/login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn secondary">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}
