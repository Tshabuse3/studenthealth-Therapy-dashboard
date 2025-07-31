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

import PdfExportButton from '@/components/PdfExportButton'; // Make sure this path matches your project structure

const reportsData = [
  { id: 1, date: '2025-07-01', patient: 'John Doe', type: 'Therapy Session', status: 'Completed' },
  { id: 2, date: '2025-07-05', patient: 'Jane Smith', type: 'Follow-up', status: 'Pending' },
  { id: 3, date: '2025-07-10', patient: 'Alice Johnson', type: 'Initial Assessment', status: 'Completed' },
  { id: 4, date: '2025-07-12', patient: 'Bob Brown', type: 'Therapy Session', status: 'Cancelled' },
  // Add more sample reports as needed
];

const monthlyReportStats = [
  { month: 'Jan', reports: 5 },
  { month: 'Feb', reports: 7 },
  { month: 'Mar', reports: 6 },
  { month: 'Apr', reports: 8 },
  { month: 'May', reports: 10 },
  { month: 'Jun', reports: 12 },
  { month: 'Jul', reports: 15 },
];

export default function Reports() {
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter reports by status
  const filteredReports = filterStatus === 'All'
    ? reportsData
    : reportsData.filter(report => report.status === filterStatus);

  return (
    <section className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-md">
      <h1 className="text-4xl font-extrabold mb-6 text-purple-700">Reports Dashboard</h1>
      <p className="text-gray-600 mb-8">
        View, filter, and analyze your therapy session reports.
      </p>

      {/* Filter buttons */}
      <div className="mb-6 flex gap-4">
        {['All', 'Completed', 'Pending', 'Cancelled'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-md font-semibold transition
              ${
                filterStatus === status
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto shadow rounded-lg mb-12">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-purple-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">
                Report Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReports.length > 0 ? (
              filteredReports.map(({ id, date, patient, type, status }) => (
                <tr key={id} className="hover:bg-purple-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{patient}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{type}</td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                      status === 'Completed'
                        ? 'text-green-600'
                        : status === 'Pending'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Reports Chart */}
      <div className="w-full h-80 bg-purple-50 rounded-lg p-6 shadow mb-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">Monthly Reports Overview</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyReportStats} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="reports" stroke="#7c3aed" strokeWidth={3} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="month" stroke="#7c3aed" />
            <YAxis stroke="#7c3aed" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* PDF Export Button */}
      <div>
        <PdfExportButton />
      </div>
    </section>
  );
}
