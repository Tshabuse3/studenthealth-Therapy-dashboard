
"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

const notifications = [
  { id: 1, message: "New appointment request from John D.", time: "2 mins ago" },
  { id: 2, message: "You received a message from admin.", time: "10 mins ago" },
  { id: 3, message: "Weekly summary report is ready.", time: "1 hour ago" },
];

export default function Notifications() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 hover:bg-gray-100 rounded-full"
        aria-label="Notifications"
      >
        <Bell className="h-6 w-6 text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 border">
          <div className="p-4 border-b font-semibold">Notifications</div>
          <ul className="max-h-64 overflow-y-auto divide-y">
            {notifications.map((n) => (
              <li key={n.id} className="px-4 py-2 hover:bg-gray-50">
                <div className="text-sm text-gray-800">{n.message}</div>
                <div className="text-xs text-gray-500">{n.time}</div>
              </li>
            ))}
          </ul>
          <div className="p-2 text-center text-sm text-blue-600 hover:underline cursor-pointer">
            View all
          </div>
        </div>
      )}
    </div>
  );
}
