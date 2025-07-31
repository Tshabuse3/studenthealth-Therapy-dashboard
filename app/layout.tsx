
// app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { ThemeProvider } from '@/context/ThemeContext';
import { NotificationProvider } from '@/context/NotificationContext';

export const metadata: Metadata = {
  title: 'Therapist Dashboard',
  description: 'AI-Powered Therapist Panel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
        <ThemeProvider>
          <NotificationProvider>
            <Sidebar />
            <div className="flex flex-col flex-1">
              <Topbar />
              <main className="p-6 overflow-y-auto">{children}</main>
            </div>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
