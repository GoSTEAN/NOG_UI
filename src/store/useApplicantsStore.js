import { create } from 'zustand'

const API = 'https://nogbackend-production.up.railway.app'

const safeJson = async (res) => {
  try {
    return await res.json()
  } catch {
    return {}
  }
}

export const useApplicantsStore = create((set, get) => ({
  applicants: [],
  loading: false,
  error: null,

  // Fetch applicants (admin endpoint). opts.query can be an object for querystring
  getApplicants: async (opts = {}) => {
    const token = localStorage.getItem('adminToken')
    set({ loading: true, error: null })
    try {
      let url = `${API}/api/applicant/applications`

      if (opts.query && typeof opts.query === 'object') {
        const qs = new URLSearchParams(opts.query).toString()
        if (qs) url += `?${qs}`
      }

      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })

      const data = await safeJson(res)      
      if (!res.ok) {
        const message = data?.message || 'Failed to load applicants'
        set({ applicants: [], loading: false, error: message })
        return { success: false, message }
      }

      const list = Array.isArray(data) ? data : data?.applicants || []
      set({ applicants: list, loading: false, error: null })
      return { success: true, applicants: list }
    } catch (err) {
      const message = err?.message || 'Network error'
      set({ applicants: [], loading: false, error: message })
      return { success: false, message }
    }
  },



  // Optional: delete an applicant by id (admin)
  deleteApplicant: async (id) => {
    const token = localStorage.getItem('adminToken')
    if (!id) return { success: false, message: 'Missing id' }
    try {
      const res = await fetch(`${API}/api/admin/applicants/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      const data = await safeJson(res)
      if (!res.ok) return { success: false, message: data?.message || 'Delete failed' }
      // remove locally
      set((state) => ({ applicants: state.applicants.filter((a) => a._id !== id && a.id !== id) }))
      return { success: true }
    } catch (err) {
      return { success: false, message: err?.message || 'Network error' }
    }
  },

  clear: () => set({ applicants: [], loading: false, error: null }),
}))

export default useApplicantsStore
