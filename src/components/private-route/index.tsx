import React, { FC, useEffect } from "react";
import { redirect } from "react-router-dom";
import { useAuth } from "../../providers/auth";

interface PrivateRouteProps {
  element: React.ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ element }) => {
  const { user } = useAuth();

  useEffect(() => {
    redirect("/login");
  }, [user]);

  return element;
};
