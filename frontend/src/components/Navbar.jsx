import { Link, useNavigate } from "react-router-dom";
import { Activity, LogOut } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-indigo-600"
        >
          <Activity />
          AI X-ray Analyser
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {token ? (
            <>
              {/* Logged in */}
              <Link
                to="/scan"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                Scan
              </Link>
              <Link
                to="/history"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                History
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Logged out */}
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}