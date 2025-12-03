import React from "react";
import { Link } from "react-router-dom";
import heroBg from "../assets/nog.jpeg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">


      <section
        className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 text-white bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10,20,50,0.7), rgba(15,35,80,0.7)),
            url(${heroBg})
          `
        }}
      >
        <div className="md:w-1/2 z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-300">
            Abuja Night of Glory 2025
          </h1>
          <p className="mb-6 text-gray-200 text-lg">
            A divine night of worship, prayer and miracles — joining thousands to lift a cry for Nigeria’s transformation. Come expectant, receive healing, salvation and a fresh touch of God’s glory.
          </p>
          <Link
            to="/checker"
            className="bg-cyan-400 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-500 transition"
          >
            Check VIP Status
          </Link>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center z-10">
          <img
            src={heroBg} 
            alt="Night of Glory Abuja"
            className="rounded-lg shadow-lg"
          />
        </div>
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 opacity-60"></div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-blue-800 via-indigo-900 to-blue-900 text-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-cyan-300">What to Expect</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-700 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-cyan-200">Powerful Worship</h3>
            <p>
              Worship led by anointed gospel artistes and ministers — ushering God’s presence for salvation, healing and deliverance.
            </p>
          </div>
          <div className="bg-blue-700 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-cyan-200">Miracles & Breakthroughs</h3>
            <p>
              Expect supernatural encounters, miracles, and testimonies — where lives are transformed by the power of God.
            </p>
          </div>
          <div className="bg-blue-700 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-cyan-200">National Revival</h3>
            <p>
              We gather to pray for Nigeria — for peace, prosperity, leadership and societal transformation. Let’s end the year on a spiritual high note.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-b from-indigo-900 via-blue-900 to-blue-800 text-white py-20 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-6 text-cyan-300">Join the Movement of Glory</h2>
        <p className="mb-6 text-gray-200">VIP tickets available — come with faith, bring your friends, and let’s witness God move mightily.</p>
        <Link
          to="/checker"
          className="bg-cyan-400 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-500 transition"
        >
          Check VIP Status
        </Link>

          <Link
          to="/admin"
          className="bg-cyan-400 ml-2 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-500 transition"
        >
          Admin
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-gray-300 py-6 text-center">
        <p>© 2025 Abuja Night of Glory. All rights reserved.</p>
      </footer>
    </div>
  );
}

// https://nogbackend-production.up.railway.app/docs/