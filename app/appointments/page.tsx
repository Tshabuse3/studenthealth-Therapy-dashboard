'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CalendarDays, Clock3, UserPlus, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const chartData = [
  { name: 'Jan', appointments: 30 },
  { name: 'Feb', appointments: 45 },
  { name: 'Mar', appointments: 35 },
  { name: 'Apr', appointments: 50 },
  { name: 'May', appointments: 55 },
  { name: 'Jun', appointments: 42 },
];

const therapist = {
  name: 'Dr. Jane Smith',
  specialty: 'Clinical Psychologist',
  email: 'jane.smith@wellness.com',
  phone: '081 234 5678',
};

const initialAppointments = [
  { id: 1, client: 'Lerato M.', date: '2025-07-28', time: '10:00 AM' },
  { id: 2, client: 'Thabo K.', date: '2025-07-28', time: '11:30 AM' },
  { id: 3, client: 'Naledi S.', date: '2025-07-29', time: '09:00 AM' },
];

export default function AppointmentsPage() {
  const [appointments] = useState(chartData);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <motion.div
      className="p-6 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold text-indigo-800">Appointments Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-indigo-50 p-4 rounded-xl shadow-sm flex items-center gap-4">
          <CalendarDays className="text-indigo-600 w-10 h-10" />
          <div>
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-xl font-semibold text-indigo-700">6 Appointments</p>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-xl shadow-sm flex items-center gap-4">
          <UserPlus className="text-green-600 w-10 h-10" />
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-xl font-semibold text-green-700">250 Clients</p>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl shadow-sm flex items-center gap-4">
          <Clock3 className="text-yellow-600 w-10 h-10" />
          <div>
            <p className="text-sm text-gray-500">Upcoming</p>
            <p className="text-xl font-semibold text-yellow-700">4 Sessions</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Appointments</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={appointments}>
            <Line type="monotone" dataKey="appointments" stroke="#4f46e5" strokeWidth={3} />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Therapist Profile Card */}
      <div className="bg-indigo-100 p-6 rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-indigo-800">Your Profile</h3>
          <p className="text-md text-indigo-700">{therapist.name}</p>
          <p className="text-sm text-gray-600">{therapist.specialty}</p>
        </div>
        <div className="text-sm text-gray-700">
          <p>Email: {therapist.email}</p>
          <p>Phone: {therapist.phone}</p>
        </div>
      </div>

      {/* Appointment Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Client</th>
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {initialAppointments.map((appt) => (
              <tr key={appt.id} className="border-b">
                <td className="p-2">{appt.client}</td>
                <td className="p-2">{appt.date}</td>
                <td className="p-2">{appt.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Message Box */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Message Center</h2>
        <div className="border p-4 rounded h-40 overflow-y-auto mb-4 bg-gray-50">
          {messages.length === 0 ? (
            <p className="text-gray-400 italic">No messages yet...</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="text-sm text-gray-700 mb-2">
                <strong>You:</strong> {msg}
              </div>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
