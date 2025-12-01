import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

const API = "https://nog-484t.onrender.com";

export const useAdminStore = create((set, get) => ({
  vips: [],
  loadList: false,

//  getAllVips: async () => {
//     const token = useAdminStore.getState().token;
//     set({ loading: true });
//     try {
//       const res = await fetch(`${API}/api/admin/vips`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(res, "res...");

//       const data = await res.json();
//        console.log(data, "data...");
//       set({ vips: Array.isArray(data) ? data : [], loading: false });
//     } catch (err) {
//       console.error(err);
//       set({ vips: [], loading: false });
//     }
//   },

  getAllVips: async () => {
  // const token = useAdminStore.getState().token;
   const token = localStorage.getItem("adminToken");

  
  set({ loading: true });

  try {
    const res = await fetch(`${API}/api/admin/vips`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    
    // if (!res.ok) {
    //   throw new Error("Failed to load VIP list");
    // }

    const data = await res.json();

        console.log(data, "data...");

    set({
      vips: Array.isArray(data) ? data : [],
      loadList: false,
      error: null,
    });

    return { success: true };
  } catch (err) {
    console.error("Network error:", err);

    set({
      vips: [],
      loadList: false,
      error: "Network error — failed to load VIP list",
    });

    return { success: false, message: "Network error — failed to load VIP list" };
  }
},




  addVip: async (name) => {
    const token = useAuthStore.getState().token;
   
    const res = await fetch(`${API}/api/admin/vips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({name}),
    });

    const data = await res.json();

    if (res.ok) {
      get().getAllVips();
      return { success: true };
    }

    return { success: false, message: data.message };
  },

deleteVip: async (_id) => {
  try {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API}/api/admin/vips/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Failed to delete VIP");
    }

    // Refresh VIP list only AFTER successful delete
    await get().getAllVips();

    return true;
  } catch (err) {
    console.error("Delete VIP failed:", err);
    return false;
  }
},

}));
