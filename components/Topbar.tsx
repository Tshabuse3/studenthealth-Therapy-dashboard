'use client';

import { useTheme } from '@/context/ThemeContext';
import Notifications from './Notifications';

export function Topbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center bg-white dark:bg-gray-800 shadow px-6 py-4 transition-colors duration-500">
      {/* Left: Welcome Text */}
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
        Welcome, Therapist
      </h2>

      {/* Right: Notifications and Theme Toggle */}
      <div className="flex items-center gap-4">
        <Notifications />

        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
}

