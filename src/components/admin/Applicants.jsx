import React, { useEffect } from 'react'
import useApplicantsStore from '../../store/useApplicantsStore'

export default function Applicants() {
  const { applicants, loading, error, getApplicants, deleteApplicant } = useApplicantsStore()

  useEffect(() => { getApplicants() }, [getApplicants])

  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-cyan-300 mb-6 text-center">Applicants</h2>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl">
          {loading ? (
            <p className="text-center text-gray-300">Loading applicants...</p>
          ) : error ? (
            <p className="text-center text-red-400">{error}</p>
          ) : applicants.length === 0 ? (
            <p className="text-center text-gray-300">No applicants found.</p>
          ) : (
            <ul className="space-y-4">
              {applicants.map((a) => {
                const fullName = `${a.firstName || a.fullname || a.name || ''} ${a.lastName || ''}`.trim();
                const initials = (fullName.split(' ').filter(Boolean).slice(0,2).map(n => n[0]?.toUpperCase()).join('')) || (a.email ? a.email[0].toUpperCase() : '?');

                return (
                  <li key={a._id || a.email} className="bg-white/5 backdrop-blur p-6 rounded-2xl shadow-md hover:shadow-lg transition flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-lg">{initials}</div>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-white text-lg">{fullName || a.email}</div>
                          <div className="text-sm text-slate-300">{a.email} • {a.phone || '—'}</div>
                        </div>

                        <div className="ml-4 flex items-start">
                          <button
                            onClick={async () => {
                              // eslint-disable-next-line no-restricted-globals
                              if (!confirm('Delete applicant? This action cannot be undone.')) return;
                              await deleteApplicant(a._id || a.id);
                              await getApplicants();
                            }}
                            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-md text-sm font-semibold transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {a.bio && <p className="mt-3 text-slate-300 leading-relaxed">{a.bio}</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

