import axios from 'axios';
import { useState } from 'react';

export default function CreateChannelModal({ onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const data = {
        title: name,
        description
      };

      await axios.post(`${import.meta.env.VITE_EXPRESS_MYSQL_BASE_URL}`, data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

    } catch (error) {
      console.error("Error creating the channel:", error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-out">
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl transform transition-all duration-300 scale-100 opacity-100">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Create a New Channel</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Channel name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <textarea
            placeholder="Channel description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4 h-24 resize-none focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              disabled={submitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className={`px-4 py-2 text-white rounded transition flex items-center justify-center ${
                submitting
                  ? 'bg-green-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {submitting ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Create'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
