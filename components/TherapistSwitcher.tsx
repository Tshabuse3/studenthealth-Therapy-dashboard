'use client';

import React, { useState } from 'react';

const therapists = [
  'Dr. Alice Morgan',
  'Dr. John Smith',
  'Dr. Mary Johnson',
];

export default function TherapistSwitcher() {
  const [selected, setSelected] = useState(therapists[0]);

  return (
    <div className="p-4 bg-indigo-50 rounded-md shadow-sm">
      <label htmlFor="therapist-select" className="block text-indigo-700 font-semibold mb-2">
        Switch Therapist:
      </label>
      <select
        id="therapist-select"
        value={selected}
        onChange={e => setSelected(e.target.value)}
        className="w-full p-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {therapists.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <p className="mt-3 text-indigo-600">Current: {selected}</p>
    </div>
  );
}
