'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type?: NotificationType) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  function addNotification(message: string, type: NotificationType = 'info') {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    // Auto-remove notification after 3 seconds
    setTimeout(() => removeNotification(id), 3000);
  }

  function removeNotification(id: number) {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      {/* Notification UI */}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`px-4 py-2 rounded shadow-md text-white ${
              n.type === 'success'
                ? 'bg-green-500'
                : n.type === 'error'
                ? 'bg-red-500'
                : 'bg-blue-500'
            }`}
          >
            {n.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
