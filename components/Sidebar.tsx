'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChartPie, FaCalendarAlt, FaEnvelope, FaCog, FaFileAlt } from 'react-icons/fa';

const navItems = [
  { name: 'Dashboard', href: '/', icon: FaChartPie },
  { name: 'Reports', href: '/reports', icon: FaFileAlt },
  { name: 'Appointments', href: '/appointments', icon: FaCalendarAlt },
  { name: 'Messages', href: '/messages', icon: FaEnvelope },
  { name: 'Settings', href: '/settings', icon: FaCog },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-indigo-900 text-white p-6 flex flex-col shadow-lg">
      <h1 className="text-3xl font-extrabold mb-10 tracking-wide select-none">Therapist Panel</h1>
      <nav className="flex flex-col gap-3 flex-1">
        {navItems.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
                focus:outline-none focus:ring-2 focus:ring-indigo-400
                ${isActive ? 'bg-indigo-700 shadow-lg' : 'hover:bg-indigo-700 hover:shadow-md'}
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="text-lg" />
              {name}
            </Link>
          );
        })}
      </nav>
      <footer className="mt-auto text-sm text-indigo-300 select-none">
        &copy; 2025 Therapist Panel
      </footer>
    </aside>
  );
}
