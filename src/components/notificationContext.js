import React, { createContext, useState, useContext } from 'react';

const ChatNotificationContext = createContext();

export const ChatNotificationProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  const incrementCount = () => {
    setNotificationCount(notificationCount + 1);
  };

  const decrementCount = () => {
    setNotificationCount(notificationCount > 0 ? notificationCount - 1 : 0);
  };

  const setCount = (count) => {
    setNotificationCount(count);
  };

  return (
    <ChatNotificationContext.Provider
      value={{
        notificationCount,
        incrementCount,
        decrementCount,
        setCount,
      }}
    >
      {children}
    </ChatNotificationContext.Provider>
  );
};

export const useChatNotification = () => useContext(ChatNotificationContext);