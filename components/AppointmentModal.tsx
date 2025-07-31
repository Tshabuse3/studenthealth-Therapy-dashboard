'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AppointmentData = {
  clientName: string;
  date: string;
  time: string;
  notes: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onBook: (data: AppointmentData) => void;
};

export default function AppointmentModal({ isOpen, onClose, onBook }: Props) {
  const [formData, setFormData] = useState<AppointmentData>({
    clientName: '',
    date: '',
    time: '',
    notes: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function validate() {
    const newErrors: { [key: string]: string } = {};
    if (!formData.clientName.trim()) newErrors.clientName = 'Client name is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onBook(formData);
      setFormData({ clientName: '', date: '', time: '', notes: '' });
      onClose();
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className={`w-full border p-2 rounded ${
                    errors.clientName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.clientName && (
                  <p className="text-red-600 text-sm mt-1">{errors.clientName}</p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-medium mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full border p-2 rounded ${
                      errors.date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
                </div>

                <div className="flex-1">
                  <label className="block font-medium mb-1">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full border p-2 rounded ${
                      errors.time ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time}</p>}
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Notes (optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full border p-2 rounded border-gray-300"
                  rows={3}
                  placeholder="Additional details or concerns"
                />
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Book
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
