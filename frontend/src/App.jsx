import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Scan from "./pages/Scan";
import ProtectedRoute from "./components/ProtectedRoute";
import Result from "./pages/Result";
import History from "./pages/History";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Welcome />} />
      <Route path="/scan" element={<ProtectedRoute><Scan/></ProtectedRoute>}/>
      <Route path="/result/:id" element={<Result />} />
      <Route path="/history" element={<History />} />

      
    </Routes>
  );
}