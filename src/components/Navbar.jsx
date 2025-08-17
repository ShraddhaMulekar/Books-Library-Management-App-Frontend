import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="px-4 py-3 border-b flex items-center justify-between">
      <Link to="/" className="text-xl font-bold">My Library</Link>
      <div className="flex items-center gap-4">
        <Link to="/">Home</Link>
        {user && <Link to="/my-books">My Books</Link>}
        {!user && <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>}
        {user && <>
          <span className="text-sm opacity-70">{user.email}</span>
          <button onClick={handleLogout} className="underline">Logout</button>
        </>}
      </div>
    </nav>
  );
}
