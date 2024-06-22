import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/auth";
import { Spin } from "antd";

interface PrivateRouteProps {
  element: React.ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ element }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login", { replace: true });
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <Spin spinning={isLoading} fullscreen />;
  }

  return element;
};
