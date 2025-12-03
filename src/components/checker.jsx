import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import background from "../assets/nog.jpeg";
import Ticket from "./Ticket";
import { useAuthStore } from "../store/useAuthStore";


export default function VipChecker() {
  const [loading, setLoading] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [isVip, setIsVip] = useState(false);
  const token = useAuthStore((s) => s.token);
  const initToken = useAuthStore((s) => s.initToken);

  useEffect(() => {
    initToken();
  }, [initToken]);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || name.trim().length < 2) {
    setError("Please enter a valid full name (at least 2 characters).");
    return;
  }
  setError("");
  setLoading(true);
  setIsVip(false);

  try {
    const response = await fetch(
      `https://nogbackend-production.up.railway.app/api/vip/search?query=${encodeURIComponent(name)}`
    );

    let data;
    if (!response.ok) {
      try {
        data = await response.json();
      } catch {
        const msg = response.statusText || 'API error';
        setError(msg);
        throw new Error(msg);
      }
      const msg = data?.message || data?.error || response.statusText || 'API error';
      setError(msg);
      throw new Error(msg);
    }

    data = await response.json();

    // Backend may return { found: true, vip: {...} } or an array of matches
    const status = !!(
      data?.found ||
      data?.vip ||
      (Array.isArray(data) && data.length > 0)
    );

    setIsVip(status);

    setModalMsg(
      status
        ? 'VIP Access Confirmed! You can download your Night of Glory ticket below.'
        : (data?.message || 'Oops! You are not on the VIP list for Abuja Night of Glory 2025..')
    );
  } catch (err) {
    console.error('API Error:', err);
    setModalMsg('Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800"
    >
      {/* Left Side — Info */}
      <div
        className="md:w-1/2 flex flex-col justify-center items-start p-12 relative text-white"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10,20,50,0.7), rgba(15,35,80,0.7)),
            url(${background})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-cyan-300 drop-shadow-lg">
          Check Your VIP Access
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-6 drop-shadow-md">
          Enter your full name below to see if you have VIP access to Abuja Night of Glory 2025.
        </p>
      </div>

      {/* Right Side — Form */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-12 bg-gradient-to-b from-blue-800 via-blue-900 to-indigo-900 text-white">

        <h2 className="text-3xl font-bold text-cyan-400 mb-4">VIP Checker</h2>
        <p className="text-gray-300 mb-8 text-center">
          Enter your full name to instantly confirm your VIP ticket.
        </p>

        <div
          className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-md border border-white/20"
        >
          <label className="block mb-2 text-gray-200 font-semibold">Full Name *</label>
          <input
            type="text"
            className="w-full mb-4 p-3 rounded-lg bg-white border border-blue-700 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />


         {error && (
            <p className="text-red-500 font-semibold mb-4 text-sm">{error}</p>
          )}

     <button
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center justify-center w-full rounded-xl  bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold px-4 py-3 mt-4 shadow-md disabled:opacity-60 transition"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Checking please wait....
            </>
          ) : (
            "Check VIP Status"
          )}
        </button>

        </div>

        {modalMsg && (
          <div className="mt-6 w-full max-w-2xl p-5 rounded-xl bg-cyan-500 bg-opacity-90 text-gray-900 shadow-lg text-center">
            <p className="font-semibold text-md">{modalMsg}</p>
            {isVip && (
              <div className="mt-4">
                <Ticket name={name} />
              </div>
            )}
          </div>
        )}

      <div className=" bottom-8 right-8 pt-8">
        <Link
          to="/"
          className="bg-cyan-400 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-500 transition"
        >
        Home
        </Link>

          {token && (
            <Link
              to="/admin"
              className="bg-cyan-400 ml-3 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-500 transition"
            >
              Admin
            </Link>
          )}
      </div>
        <p className="text-gray-200 mt-8 text-center">
          Don’t have VIP access yet? Stay tuned or reach out to the event organisers.
        </p>
      </div>
    </div>
  );
}
