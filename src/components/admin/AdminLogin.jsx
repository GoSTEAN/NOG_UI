import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.js";
import background from "../../assets/nog.jpeg";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


export default function AdminLogin() {
   const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const showMessage = (text, type = "success") => {
  const setter = type === "success" ? setMsg : setError;
  setter({ type, text });

  setTimeout(() => {
    setter(null);
  }, 5000);
 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
    navigate("/admin/dashboard");
        showMessage(res.message, "success");
      setEmail("");
      setPassword("");
    } else {
       showMessage(res.message, "success");
     //    setError(res.message);
    }
  };



  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: `linear-gradient(rgba(10,20,50,0.7), rgba(15,35,80,0.7)), url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-cyan-300 drop-shadow-md">
          Admin Login
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-200">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-white border border-blue-700 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

       <div className="relative flex flex-col">
      <label className="mb-2 font-semibold text-gray-200">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        className="w-full p-3 rounded-lg bg-white border border-blue-700 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="button"
        className="absolute right-3 top-9  mt-3 text-gray-700 "
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeSlashIcon className="h-5 w-5 text-gray-700" />
        ) : (
          <EyeIcon className="h-5 w-5 text-gray-700" />
        )}
      </button>
    </div>

          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
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
              "Login"
            )}
          </button>
        </div>

       {msg && msg.type === "success" && (
          <p className="text-blue-500 bg-opacity-70 p-2 mt-4 rounded text-center font-semibold w-full">
            {msg.text}
          </p>
        )}

        {error && error.type === "error" && (
          <p className="text-red-500 bg-opacity-70 p-2 mt-4 rounded text-center font-semibold w-full">
            {error.text}
          </p>
        )}


        <p className="mt-4 text-center text-gray-200">
          First time admin?{" "}
          <Link to="/admin/register" className="font-bold text-cyan-400 hover:text-cyan-300 underline ml-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
