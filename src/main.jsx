// @ts-nocheck
import "./index.css";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/theme-provider";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Layout from "./Layout.jsx";
import NotFound from "./components/NotFound";
import store from "./redux/store.jsx";
import { ProductCreation, Product, RentCreation, RentList, RulesPage, Login, Register, RentSuccess } from "./lazyComponents.js";
import Loader from "./components/Loader/Loader.jsx";
import { Toaster } from "./components/ui/toaster";
import Location from "./pages/auth/Location";
import PaymentPopup from "./pages/rent/Payment";

// ✅ ProtectedRoute logic here itself
const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (!token) return <Navigate to="/" replace />;
  return <Outlet />;
};

// ✅ Define all routes
const router = createBrowserRouter([
  // Public Login Route
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/customer-register",
    element: (
      <Suspense fallback={<Loader />}>
        <Register />

      </Suspense>
    ),
  },
  {
    path: "/location",
    element: (
      <Suspense fallback={<Loader />}>
        <Location />

      </Suspense>
    ),
  },
  {
    path: "success",
    element: (
      <Suspense fallback={<Loader />}>
        <RentSuccess />
      </Suspense>
    ),
  },
  // Public Rules Page (optional)
  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/app",
        element: (
          <Suspense fallback={<Loader />}>
            <Layout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loader />}>
                <RentList />
              </Suspense>
            ),
          },
          {
            path: "product",
            element: (
              <Suspense fallback={<Loader />}>
                <Product />
              </Suspense>
            ),
          },
          {
            path: "productCreation",
            element: (
              <Suspense fallback={<Loader />}>
                <ProductCreation />
              </Suspense>
            ),
          },
          {
            path: "rent-creation",
            element: (
              <Suspense fallback={<Loader />}>
                <RentCreation />
              </Suspense>
            ),
          },
          {
            path: "rent-list",
            element: (
              <Suspense fallback={<Loader />}>
                <RentList />
              </Suspense>
            ),
          },
            {
              path: "success",
              element: (
                <Suspense fallback={<Loader />}>
                  <RentSuccess />
                </Suspense>
              ),
            },
        ],
        errorElement: <NotFound />,
      },
      {
        path: "/rules",
        element: (
          <Suspense fallback={<Loader />}>
            <RulesPage />
          </Suspense>
        ),
      },
    ],
  },
]);

// ✅ Render App
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
