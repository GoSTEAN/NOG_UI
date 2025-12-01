import { create } from "zustand";

const API = "https://nog-484t.onrender.com";

export const useAuthStore = create((set) => ({
  token: null,

  initToken: () => {
    const saved = localStorage.getItem("adminToken");
    if (saved) set({ token: saved });
  },

 login: async (email, password) => {
  // Frontend validation
  if (!email || !password) 
    return { success: false, message: "Email and password are required." };

  try {
    const res = await fetch(`${API}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Safely parse JSON only if content-type is JSON
    const contentType = res.headers.get("content-type");
    let data = {};
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      // fallback for non-JSON responses
      data = { success: false, message: await res.text() || "Unexpected server response" };
    }

    if (!res.ok) throw new Error(data.message || "Login failed");

    localStorage.setItem("adminToken", data.token);
    set({ token: data.token });

    return { success: true, message: "Login successful" };
  } catch (err) {
    return { success: false, message: err.message };
  }
},



  register: async (name, email, password) => {
    // Validation
    if (!name || name.trim().length < 2) return { success: false, message: "Name must be at least 2 characters." };
    if (!email) return { success: false, message: "Email is required." };
    if (!password || password.length < 6) return { success: false, message: "Password must be at least 6 characters." };
    try {
      const res = await fetch(`${API}/api/admin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullname: name, email, password }),
        // body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      return { success: true, message: "Registration successful!" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  logout: () => {
    localStorage.removeItem("adminToken");
    set({ token: null });
  },
}));
