import React, { useState } from "react";
import { Link } from "react-router-dom";
// import background from "../../assets/nog.jpeg";
import background from "../assets/nog.jpeg";
import { useRegisterStore } from "../store/useRegisterationStore";


export default function UserRegisteration() {
 const validateApplicant = useRegisterStore((s) => s.validateApplicant);
 const applyApplicant = useRegisterStore((s) => s.applyApplicant);


  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");


  
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
    setError("");
    setFieldErrors({});
    setLoading(true);

    const applicant = { firstName, lastName, email, phone, bio };

    // Validate client-side first
    const { valid, errors } = validateApplicant(applicant);
    if (!valid) {
      setFieldErrors(errors || {});
      setLoading(false);
      return;
    }

    const res = await applyApplicant(applicant);
    setLoading(false);

    if (res.success) {
      showMessage(res.message || 'Registration successful', 'success');
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setBio("");
      setFieldErrors({});
    } else {
      // server-side field errors
      if (res.errors && typeof res.errors === 'object') {
        setFieldErrors(res.errors);
        if (res.message) showMessage(res.message, 'error');
      } else {
        showMessage(res.message || 'Failed to register', 'error');
      }
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
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-white/20">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-cyan-300 drop-shadow-md">
          VIP  Registeration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-200">First Name</label>
            <input
              type="text"
              className={`w-full p-3 rounded-lg bg-white border ${fieldErrors.firstName ? 'border-red-500 ring-1 ring-red-200' : 'border-blue-700'} text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            {fieldErrors.firstName && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.firstName}</p>
            )}
          </div>

            <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-200">Last Name</label>
            <input
              type="text"
              className={`w-full p-3 rounded-lg bg-white border ${fieldErrors.lastName ? 'border-red-500 ring-1 ring-red-200' : 'border-blue-700'} text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            {fieldErrors.lastName && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.lastName}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-200">Email</label>
            <input
              type="email"
              className={`w-full p-3 rounded-lg bg-white border ${fieldErrors.email ? 'border-red-500 ring-1 ring-red-200' : 'border-blue-700'} text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-200">Phone</label>
            <input
              type="tel"
              className={`w-full p-3 rounded-lg bg-white border ${fieldErrors.phone ? 'border-red-500 ring-1 ring-red-200' : 'border-blue-700'} text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {fieldErrors.phone && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>
            )}
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 font-semibold text-gray-200">Bio / Notes</label>
            <textarea
              rows={4}
              className={`w-full p-3 rounded-lg bg-white border ${fieldErrors.bio ? 'border-red-500 ring-1 ring-red-200' : 'border-blue-700'} text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400`}
              value={bio}
              required
              onChange={(e) => setBio(e.target.value)}
            />
            {fieldErrors.bio && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.bio}</p>
            )}
          </div>

   

          <div className="md:col-span-2">
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
              "Register"
            )}
          </button>
          </div>

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
      </div>
    </div>
  );
}
