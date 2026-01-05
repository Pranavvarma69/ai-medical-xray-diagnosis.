import { useState } from "react";
import AuthCard from "../components/AuthCard";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { loginUser } from "../api/axios";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* PAGE */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800">
        <AuthCard title="Login">
          {error && (
            <p className="text-red-600 text-sm text-center mb-3">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-700">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold">
              Register
            </Link>
          </p>
        </AuthCard>
      </div>
    </>
  );
}