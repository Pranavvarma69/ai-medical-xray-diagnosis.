import { useState } from "react";
import { Upload, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

export default function Scan() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle image selection
  const handleImageChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // Run AI Scan
  const handleRunScan = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post("/scans/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate(`/result/${res.data.scan._id}`);
    } catch (err) {
      console.error("Scan failed:", err);
      alert("Scan failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      
      <Navbar />

      
      <div className="min-h-screen bg-gray-100 px-4 py-12 flex flex-col items-center">

        
        <div className="flex items-center gap-2 mb-8 pt-24">
          <Activity className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Chest X-Ray Scan
          </h1>
        </div>

        
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">

          
          <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition">
            <Upload className="text-gray-400 mb-2" size={40} />
            <p className="text-gray-600 font-medium">
              Click to upload X-ray image
            </p>
            <p className="text-sm text-gray-400 mt-1">
              PNG, JPG, JPEG
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          
          {preview && (
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">Preview:</p>
              <img
                src={preview}
                alt="X-ray preview"
                className="w-full rounded-lg border"
              />
            </div>
          )}

          
          <button
            onClick={handleRunScan}
            disabled={!file || loading}
            className={`w-full mt-6 py-3 rounded-xl font-semibold transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            {loading ? "Running AI Scan..." : "Run AI Scan"}
          </button>
        </div>

        
        <div className="mt-6 text-gray-500 text-sm">
          Results will appear after scan
        </div>
      </div>
    </>
  );
}