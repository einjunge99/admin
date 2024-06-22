import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./pages/root.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./client/index.ts";
import { Login } from "./pages/login/index.tsx";
import { PrivacyPolicy } from "./pages/privacy-and-policy/index.tsx";
import { NotFound } from "./pages/404/index.tsx";
import { Lectures } from "./pages/lectures.tsx";
import { AuthProvider } from "./providers/auth.tsx";
import { PrivateRoute } from "./components/private-route/index.tsx";
import { NotificationProvider } from "./providers/notification.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <PrivateRoute element={<Lectures />} /> },
      { path: "login", element: <Login /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </NotificationProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
