import React, { useState, createContext, useContext, useRef } from "react";
import { motion } from "framer-motion";

// Create a context to hold the notification state and functions
const NotificationContext = createContext();

// Custom hook to use the notification context
export const useNotification = () => {
  return useContext(NotificationContext);
};

// NotificationProvider component to wrap around your app and provide the notification context
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const notificationTimeouts = useRef({});

  // Function to add a new notification
  const addNotification = (message) => {
    const newNotification = { id: new Date().getTime(), message };

    // Check if there is already a notification with the same id
    const isDuplicate = notifications.some(
      (notification) => notification.id === newNotification.id
    );

    if (!isDuplicate) {
      // If it's not a duplicate, add the new notification
      setNotifications([...notifications, newNotification]);
    } else {
      // Handle the case where the notification is a duplicate
      console.log("Notification with same ID already exists.");
    }

    const timeoutId = setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);

    // Store the timeout reference
    notificationTimeouts.current[newNotification.id] = timeoutId;
  };

  // Function to remove a notification by id
  const removeNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );

    // Clear the timeout for the removed notification
    clearTimeout(notificationTimeouts.current[id]);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
      <div className="notification-container fixed bottom-20  space-y-4">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className="notification p-2 py-4 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 h-16"
            initial={{ x: -1000 }}
            animate={{ x: [20, 20, -1000] }}
            transition={{ duration: 3 }}
          >
            {notification.message}
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4"
            >
              x
            </button>
          </motion.div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
