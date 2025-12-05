// import React, { useEffect } from 'react';
// import useApplicantsStore from '../../store/useApplicantsStore';

// export default function Applicants() {
//   const {
//     applicants,
//     loading,
//     error,
//     getApplicants,
//     approveApplicant,
//     rejectApplicant,
//   } = useApplicantsStore();

//   useEffect(() => {
//     getApplicants();
//   }, [getApplicants]);

//   const handleApprove = async (id) => {
//     if (!confirm('Approve this applicant? They will be notified.')) return;
//     await approveApplicant(id);
//     await getApplicants(); // Refresh list
//   };

//   const handleReject = async (id) => {
//     if (!confirm('Reject this applicant? This cannot be undone.')) return;
//     await rejectApplicant(id);
//     await getApplicants();
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'approved':
//         return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white">Approved</span>;
//       case 'rejected':
//         return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white">Rejected</span>;
//       default:
//         return <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500 text-gray-900">Pending</span>;
//     }
//   };
import React, { useEffect } from 'react'
import useApplicantsStore from '../../store/useApplicantsStore'

export default function Applicants() {
  const {
    applicants,
    loading,
    error,
    getApplicants,
    approveApplicant,
    rejectApplicant,
  } = useApplicantsStore()

  useEffect(() => {
    getApplicants()
  }, [getApplicants])

  const handleApprove = async (id) => {
    const result = await approveApplicant(id)
    if (!result.success) {
      alert('Error: ' + result.message)
    }
  }

  const handleReject = async (id) => {
    const result = await rejectApplicant(id)
    if (!result.success) {
      alert('Error: ' + result.message)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white">Approved</span>
      case 'rejected':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white">Rejected</span>
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500 text-gray-900">Pending</span>
    }
  }
  
  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-cyan-300 mb-8 text-center drop-shadow-lg">
        Applicant Management
      </h2>

      {loading ? (
        <p className="text-center text-gray-300 text-lg">Loading applicants...</p>
      ) : error ? (
        <p className="text-center text-red-400 text-lg">{error}</p>
      ) : applicants.length === 0 ? (
        <p className="text-center text-gray-300 text-xl">No applicants found.</p>
      ) : (
        <div className="grid gap-6">
          {applicants.map((a) => {
            const fullName = `${a.firstName || a.fullname || a.name || ''} ${a.lastName || ''}`.trim() || 'Unnamed';
            const initials = fullName.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]?.toUpperCase()).join('') || a.email?.[0]?.toUpperCase() || '?';
            const isPending = a.status === 'pending' || !a.status;

            return (
              <div
                key={a._id || a.email}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-cyan-800/30 hover:border-cyan-500 transition-all"
              >
                <div className="flex items-start justify-between gap-6">
                  {/* Avatar + Info */}
                  <div className="flex items-start gap-5 flex-1">
                    <div className="h-14 w-14 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {initials}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-bold text-white">{fullName}</h3>
                        {getStatusBadge(a.status)}
                      </div>

                      <div className="text-sm text-cyan-200 space-y-1">
                        <p>✉️ {a.email || '—'}</p>
                        <p>📞 {a.phone || '—'}</p>
                        {a.appliedAt && (
                          <p className="text-xs text-gray-400">
                            Applied: {new Date(a.appliedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      {a.bio && (
                        <p className="mt-4 text-gray-300 italic leading-relaxed border-l-4 border-cyan-500 pl-4">
                          "{a.bio}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    {isPending ? (
                      <>
                        <button
                          onClick={() => handleApprove(a._id || a.id)}
                          className="bg-green-600 hover:bg-green-500 text-white font-bold px-5 py-2.5 rounded-lg shadow-lg transition transform hover:scale-105"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(a._id || a.id)}
                          className="bg-red-600 hover:bg-red-500 text-white font-bold px-5 py-2.5 rounded-lg shadow-lg transition transform hover:scale-105"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-700 text-gray-400 font-bold px-5 py-2.5 rounded-lg cursor-not-allowed"
                      >
                        Action Taken
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}