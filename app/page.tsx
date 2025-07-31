'use client';

import Link from 'next/link';
import { FaCalendarAlt, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import TherapistSwitcher from '@/components/TherapistSwitcher';

export default function Dashboard() {
  return (
    <section className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-md">
      <h1 className="text-4xl font-extrabold mb-6 text-indigo-700">Therapist Dashboard</h1>
      <p className="text-gray-600 mb-8">Overview of your appointments, messages, and reports at a glance.</p>

      {/* Therapist Switcher Component */}
      <div className="mb-8">
        <TherapistSwitcher />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          href="/appointments"
          className="group bg-indigo-50 border border-indigo-300 rounded-lg p-6 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col"
        >
          <FaCalendarAlt className="text-indigo-600 text-4xl mb-4 group-hover:text-indigo-800 transition" />
          <h2 className="text-xl font-semibold text-indigo-800 mb-2">Upcoming Appointments</h2>
          <p className="text-indigo-700 text-3xl font-bold mb-4">8</p>
          <p className="text-indigo-600">Next: July 30, 2025 - 3:00 PM</p>
        </Link>

        <Link
          href="/messages"
          className="group bg-green-50 border border-green-300 rounded-lg p-6 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col"
        >
          <FaEnvelope className="text-green-600 text-4xl mb-4 group-hover:text-green-800 transition" />
          <h2 className="text-xl font-semibold text-green-800 mb-2">Unread Messages</h2>
          <p className="text-green-700 text-3xl font-bold mb-4">3</p>
          <p className="text-green-600">Last message from Alice S.</p>
        </Link>

        <Link
          href="/reports"
          className="group bg-purple-50 border border-purple-300 rounded-lg p-6 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col"
        >
          <FaFileAlt className="text-purple-600 text-4xl mb-4 group-hover:text-purple-800 transition" />
          <h2 className="text-xl font-semibold text-purple-800 mb-2">Reports Generated</h2>
          <p className="text-purple-700 text-3xl font-bold mb-4">12</p>
          <p className="text-purple-600">Monthly summary available</p>
        </Link>
      </div>
    </section>
  );
}

