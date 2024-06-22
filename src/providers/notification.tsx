import { NotificationArgsProps, notification } from "antd";
import { createContext, useContext } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

export const NotificationContext = createContext<{
  notify: (content: NotificationArgsProps, type: NotificationType) => void;
}>({
  notify: () => {},
});

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const notify = (
    content: NotificationArgsProps,
    type: NotificationType = "info"
  ) => {
    api[type](content);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      <>
        {contextHolder}
        {children}
      </>
    </NotificationContext.Provider>
  );
};
