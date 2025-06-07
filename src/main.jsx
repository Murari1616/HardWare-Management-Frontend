// @ts-nocheck
import "./index.css";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import NotFound from "./components/NotFound";
import store from "./redux/store.jsx";
import {
 ProductCreation,
 Product,
 RentCreation,
 RentList
} from "./lazyComponents.js";
import SpeechTest from './pages/rent/SpeechTest'
import { Toaster } from "./components/ui/toaster";
import Loader from "./components/Loader/Loader.jsx";
// import CurveWithMenu from "./pages/healthcare admin/CurveWithMenu.tsx";
// import Login from "./components/Login.tsx";
// import Login from "@/components/Login.tsx";

// Create Router
const router = createBrowserRouter([
  {
    path: "/",
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
        path: "speechTest",
        element: (
          <Suspense fallback={<Loader />}>
            <SpeechTest />
          </Suspense>
        ),
      },
    ],
    errorElement: <NotFound />,
  },
  
]);

// Render App
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
