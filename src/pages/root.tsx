import { Lectures } from "./lectures";
import "../App.css";
import { NotificationArgsProps, notification } from "antd";
import { createContext } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

export const NotificationContext = createContext<{
  notify: (content: NotificationArgsProps, type: NotificationType) => void;
} | null>(null);

export const Root = () => {
  const [api, contextHolder] = notification.useNotification();

  const notify = (
    content: NotificationArgsProps,
    type: NotificationType = "info"
  ) => {
    api[type](content);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {contextHolder}
      <Lectures />
    </NotificationContext.Provider>
  );
};
