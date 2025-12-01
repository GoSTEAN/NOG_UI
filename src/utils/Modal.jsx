export default function Modal({ message, onClose }) {
return (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
<div className="bg-white p-6 rounded shadow-lg w-80 text-center">
<p className="text-lg font-semibold mb-4">{message}</p>
<button onClick={onClose} className="bg-blue-600 text-white p-2 rounded w-full">OK</button>
</div>
</div>
);
}