import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";
import { deleteScan,getMyScans } from "../api/axios";
import Navbar from "../components/Navbar";

export default function History() {
  const navigate = useNavigate();

  
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Calling getMyScans...");
    const fetchHistory = async () => {
      try {
        const res = await getMyScans();
        console.log("HISTORY RESPONSE:", res.data);

        setScans(res?.data?.scans || []);
      } catch (err) {
        console.error(err);
        alert("Failed to load history");
        setScans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this scan permanently?");
    if (!confirm) return;
  
    try {
      await deleteScan(id);
  
      // 🔥 Instantly update UI (no reload)
      setScans((prev) => prev.filter((scan) => scan._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete scan");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-xl">
          Loading history...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-10 pt-24">
        <div className="flex items-center gap-3 mb-8">
          <Activity size={36} className="text-blue-600" />
          <h1 className="text-3xl font-bold">Scan History</h1>
        </div>

        {!scans || scans.length === 0 ? (
          <p className="text-gray-600">No scans yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(scans) &&
              scans.map((scan) => (
                <div
                  key={scan._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <img
                    src={`http://localhost:13000/${scan.imageUrl}`}
                    alt="X-ray"
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-5">
                    <h2 className="text-xl font-bold text-blue-600 mb-2">
                      {scan.predictedClass}
                    </h2>

                    <p className="text-sm text-gray-600">
                      Confidence: {(scan.confidence * 100).toFixed(2)}%
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(scan.createdAt).toLocaleString()}
                    </p>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => navigate(`/result/${scan._id}`)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleDelete(scan._id)}
                        className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}