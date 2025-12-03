import React, { useState, useEffect } from 'react'
import { useAdminStore } from '../../store/useAdminStore'

export default function VipList() {
  const { vips, error, loadList, getAllVips, addVip, deleteVip } = useAdminStore()

  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => { getAllVips() }, [getAllVips])

  const handleAddVip = async (e) => {
    e.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return

    const exists = vips.some(v => v.name.toLowerCase() === trimmedName.toLowerCase())
    if (exists) {
      setMsg('This name is already in the VIP list')
      setTimeout(() => setMsg(''), 5000)
      return
    }

    setLoading(true)
    const res = await addVip(trimmedName)
    if (res.success) {
      setMsg('VIP added successfully!')
      setName('')
      setIsModalOpen(false)
      await getAllVips()
      setTimeout(() => setMsg(''), 5000)
    } else {
      setMsg(res.message || 'Failed to add VIP')
      setTimeout(() => setMsg(''), 5000)
    }
    setLoading(false)
  }

  const handleDeleteVip = async (id) => {
    try {
      setDeletingId(id)
      await deleteVip(id)
      setMsg('VIP deleted successfully!')
      setTimeout(() => setMsg(''), 5000)
      await getAllVips()
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      {msg && (
        <div className="max-w-xl mx-auto mb-6 text-center">
          <p className="text-gray-900 bg-white bg-opacity-80 py-3 px-6 rounded-lg shadow-md text-sm font-semibold">{msg}</p>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-cyan-300 mb-6 text-center">VIP List</h2>

        <div className="mb-6 flex justify-center">
          <button onClick={() => setIsModalOpen(true)} className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold px-8 py-3 rounded-xl shadow-lg text-lg transition">Add New VIP</button>
        </div>

        <div className="bg-white bg-opacity-40 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
          {loadList ? (
            <p className="text-center text-gray-300 text-lg">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-400 text-lg">{error}</p>
          ) : vips.length === 0 ? (
            <p className="text-center text-gray-300 text-lg">No VIPs found.</p>
          ) : (
            <ul className="space-y-4">
              {vips.map((vip, idx) => (
                <li key={vip._id || vip.id} className="flex justify-between bg-blue-800 bg-opacity-70 p-4 rounded-xl items-center shadow-md hover:bg-blue-700 transition">
                  <span className="font-semibold text-white text-lg">{idx + 1}. {vip.name}</span>
                  <button onClick={() => handleDeleteVip(vip._id)} className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg shadow-lg transition text-white font-semibold">{deletingId === vip._id ? 'Deleting...' : 'Delete VIP'}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-blue-900 bg-opacity-90 backdrop-blur-xl p-10 rounded-3xl w-full max-w-lg shadow-2xl relative border border-cyan-400">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-white text-2xl font-bold hover:text-cyan-300 transition">&times;</button>
            <h2 className="text-3xl font-bold text-cyan-300 mb-6 text-center drop-shadow-md">Add New VIP</h2>
            <div className="flex flex-col gap-5">
              <input type="text" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 rounded-xl bg-white text-gray-900 font-semibold border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-lg" />
              <button onClick={handleAddVip} disabled={loading} className="inline-flex items-center justify-center w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold py-3 mt-4 shadow-lg disabled:opacity-60 transition">{loading ? 'Please wait...' : 'Add VIP'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
