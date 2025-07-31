'use client';
import { useState } from 'react';

export default function Messages() {
  const [search, setSearch] = useState('');

  // Mock messages data
  const messages = [
    {
      id: 1,
      sender: 'Alice Smith',
      preview: 'Can we reschedule our session to next week?',
      timeAgo: '2 hours ago',
    },
    {
      id: 2,
      sender: 'Bob Johnson',
      preview: 'Thank you for your help last session!',
      timeAgo: '1 day ago',
    },
  ];

  const filteredMessages = messages.filter(
    m =>
      m.sender.toLowerCase().includes(search.toLowerCase()) ||
      m.preview.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Messages</h1>
      <p className="text-gray-600 mb-4">Communicate with clients confidentially.</p>

      <input
        type="text"
        placeholder="Search messages..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {filteredMessages.length === 0 ? (
          <li className="p-4 text-center text-gray-400">No messages found.</li>
        ) : (
          filteredMessages.map(({ id, sender, preview, timeAgo }) => (
            <li
              key={id}
              className="py-4 hover:bg-indigo-50 cursor-pointer rounded px-4 transition"
              onClick={() => alert(`Open message from ${sender}`)}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter') alert(`Open message from ${sender}`);
              }}
            >
              <p className="font-semibold text-indigo-800">{sender}</p>
              <p className="text-gray-700 text-sm truncate">{preview}</p>
              <time className="text-gray-400 text-xs">{timeAgo}</time>
            </li>
          ))
        )}
      </ul>

      <button
        type="button"
        className="mt-8 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
        onClick={() => alert('Compose new message modal placeholder')}
      >
        Compose New Message
      </button>
    </section>
  );
}
