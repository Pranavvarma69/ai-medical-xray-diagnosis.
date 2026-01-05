import { useNavigate } from "react-router-dom";
import { Upload, Activity } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div
        className="min-h-screen w-full bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/image.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center px-16">
          <div className="max-w-xl text-white">

            <div className="flex items-center mb-6">
              <Activity size={60} className="text-indigo-500" />
            </div>

            <h1 className="text-5xl font-extrabold mb-4">
              Medical X-ray Analyser
            </h1>

            <p className="text-lg text-gray-200 mb-8">
              Upload a chest X-ray image and let our AI model analyze it for
              COVID-19, Viral Pneumonia, or Normal conditions.
            </p>

            <button
              onClick={() => navigate("/scan")}
              className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 transition"
            >
              Upload X-ray to Analyse
            </button>
          </div>
        </div>
      </div>
    </>
  );
}