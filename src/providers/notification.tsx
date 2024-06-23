import { NotificationArgsProps, notification } from "antd";
import { FC, ReactNode, createContext, useContext } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

export const NotificationContext = createContext<{
  notify: (content: NotificationArgsProps, type: NotificationType) => void;
}>({
  notify: () => {},
});

export const useNotification = () => {
  return useContext(NotificationContext);
};

type NotificationProviderProps = {
  children: ReactNode;
};

export const NotificationProvider: FC<NotificationProviderProps> = ({
  children,
}) => {
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
