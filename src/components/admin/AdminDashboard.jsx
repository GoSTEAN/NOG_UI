import React, { useState, useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const { vips, error, loadList, getAllVips, addVip, deleteVip } = useAdminStore();

  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    getAllVips();
  }, [getAllVips]);

  const handleAddVip = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    // CHECK IF NAME EXISTS
    const exists = vips.some(
      (vip) => vip.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (exists) {
      setMsg("This name is already in the VIP list");
      setTimeout(() => setMsg(""), 5000);
      return;
    }

    setLoading(true);
    const res = await addVip(trimmedName);

    if (res.success) {
      setMsg("VIP added successfully!");
      setName("");
      setIsModalOpen(false);
      await getAllVips(); // refresh VIPs
      setTimeout(() => setMsg(""), 5000);
    } else {
      setMsg(res.message || "Failed to add VIP");
      setTimeout(() => setMsg(""), 5000);
    }

    setLoading(false);
  };

const handleDeleteVip = async (_id) => {
  try {
    setDeletingId(_id);

    await deleteVip(_id);

    setMsg("VIP deleted successfully!");
    setTimeout(() => setMsg(""), 5000);

    await getAllVips(); 
  } finally {
    setDeletingId(null);
  }
};


  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div
      className="min-h-screen text-white p-6"
      style={{
        background: "radial-gradient(circle at top right, #2a0b57, #0f1b3b 70%, #07192a)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-cyan-400 drop-shadow-lg">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg shadow-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Message */}
            {msg && (
                  <div className="max-w-xl mx-auto mb-6 text-center">
                    <p className="text-white bg-opacity-80 text-gray-900 py-3 px-6 rounded-lg shadow-md text-sm font-semibold">
                      {msg}
                    </p>
                  </div>
                )}

      {/* Add VIP Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold px-8 py-3 rounded-xl shadow-lg text-lg transition"
        >
          Add New VIP
        </button>
      </div>

      {/* VIP List */}
      <div className="max-w-5xl mx-auto bg-white bg-opacity-40 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-cyan-300 mb-6 text-center">
          VIP List
        </h2>

        {/* {loading ? (
          <p className="text-center text-gray-300 text-lg">Loading...</p>
        ) : vips.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">No VIPs found.</p>
        ) : (
          <ul className="space-y-4">
            {vips?.map((vip) => (
              <li
                key={vip?.id}
                className="flex justify-between bg-blue-800 bg-opacity-70 p-4 rounded-xl items-center shadow-md hover:bg-blue-700 transition"
              >
                <span className="font-semibold text-white text-lg">
                  {vip.fullName}
                </span>

                <button
                  onClick={() => handleDeleteVip(vip.id)}
                  className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg shadow-lg transition text-white font-semibold"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )} */}

          {loadList ? (
            <p className="text-center text-gray-300 text-lg">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-400 text-lg">{error}</p>
          ) : vips.length === 0 ? (
            <p className="text-center text-gray-300 text-lg">No VIPs found.</p>
          ) : (
            <ul className="space-y-4">
              {vips?.map((vip, index) => (
                <li
                  key={vip?.id}
                  className="flex justify-between bg-blue-800 bg-opacity-70 p-4 rounded-xl items-center shadow-md hover:bg-blue-700 transition"
                >
                  <span className="font-semibold text-white text-lg">
                     {index + 1}. {vip.name}
                  </span>

                  <button
                    onClick={() => handleDeleteVip(vip._id)}
                    className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg shadow-lg transition text-white font-semibold flex items-center justify-center space-x-2"
                  >
                    {deletingId === vip._id ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        <span>Please wait...</span>
                      </>
                    ) : (
                      <span>Delete VIP</span>
                    )}
                  </button>

                </li>
              ))}
            </ul>
          )}

      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-blue-900 bg-opacity-90 backdrop-blur-xl p-10 rounded-3xl w-full max-w-lg shadow-2xl relative border border-cyan-400">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-white text-2xl font-bold hover:text-cyan-300 transition"
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold text-cyan-300 mb-6 text-center drop-shadow-md">
              Add New VIP
            </h2>

            <div className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-xl bg-white text-gray-900 font-semibold border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-lg"
                required
              />

              <button
                onClick={handleAddVip}
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold py-3 mt-4 shadow-lg disabled:opacity-60 transition"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Please wait...
                  </>
                ) : (
                  "Add VIP"
                )}
              </button>

                 {msg && (
                  <div className="max-w-xl mx-auto mb-6 text-center">
                    <p className="text-white bg-opacity-80 text-gray-900 py-3 px-6 rounded-lg shadow-md text-sm font-semibold">
                      {msg}
                    </p>
                  </div>
                )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
