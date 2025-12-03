/* eslint-disable no-unused-vars */
import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import VipChecker from "./components/checker";
import UserRegisteration from "./components/userRegisteration";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRegister from "./components/admin/AdminRegister";
import AdminDashboard from "./components/admin/AdminDashboard";
import { useAuthStore } from "./store/useAuthStore"; 


export default function App() {
 const initToken = useAuthStore((state) => state.initToken);
  const token = useAuthStore((state) => state.token);


  useEffect(() => {
    initToken();
  }, [initToken]);

  // UserRegisteration
return (
<Router>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checker" element={<VipChecker />} />
          <Route path="/register" element={<UserRegisteration />} />



             {/* Admin */}
        <Route
          path="/admin"
          element={token ? <Navigate to="/admin/dashboard" /> : <Navigate to="/admin/login" />}
        />

     <Route
          path="/admin/register"
          element={token ? <Navigate to="/admin/dashboard" /> : <AdminRegister />}
        />

        <Route
          path="/admin/login"
          element={token ? <Navigate to="/admin/dashboard" /> : <AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={token ? <AdminDashboard /> : <Navigate to="/admin/login" />}
        />

     </Routes>
</Router>
);
}