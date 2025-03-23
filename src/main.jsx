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
    ],
    errorElement: <NotFound />,
  },
  // {
  //   path: "/pages",
  //   element: <Layout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Suspense fallback={<Loader />}>{localStorage.getItem("mode") == "dashboard" ? null : <Home />}</Suspense>,
  //     },
  //     {
  //       path: "physio-home",
  //       element: (
  //         <Suspense fallback={<Loader />}>
  //           <PhysioHome />
  //         </Suspense>
  //       ),
  //     },
  //     {
  //       path: "physio-dashboard",
  //       element: <h1>Dashboard</h1>,
  //     },// Add a comma here
  //     // {
  //     //   path: "physio-profile",
  //     //   element: (
  //     //     <Suspense fallback={<Loader />}>
  //     //       <PhysioProfile />
  //     //     </Suspense>
  //     //   ),
  //     // },
  //     {
  //       path: "patient-home",
  //       element: (
  //         <Suspense fallback={<Loader />}>
  //           <PatientHome />
  //         </Suspense>
  //       ),
  //     },

  //     {
  //       path: "admin-dashboard",
  //       element: <h1>Dashboard</h1>,
  //     },
  //     {
  //       path: "patients-list",
  //       element: (
  //         <Suspense fallback={<Loader />}>
  //           <PatientsList />
  //         </Suspense>
  //       ),
  //     },
  //     {
  //       path: "patient-view",
  //       element: (
  //         <Suspense fallback={<Loader />}>
  //           <PatientView />
  //         </Suspense>
  //       ),
  //     },
  //     {
  //       path: "admins-list",
  //       element: (
  //         <Suspense fallback={<Loader />}>
  //           <AdminList />
  //         </Suspense>
  //       ),
  //     },
  //     {
  //       path: "physio-clinics-list",
  //       element: (
  //         <Suspense fallback={<Loader />}>
  //           <PhysioClinicsList />
  //         </Suspense>
  //       ),
  //     },
  //     {
  //       path: "physios-list",
  //       element: (
  //         <Suspense fallback={<Loader />}>
  //           <PhysiosList />
  //         </Suspense>
  //       ),
  //     },
  //     {
  //       path: "appointments-list",
  //       element: (
  //         <Suspense fallback={<Loader />}>
  //           <AppointmentList />
  //         </Suspense>
  //       ),
  //     },
  //     {
  //       path: "book-appointment",
  //       element: (
  //         <Suspense fallback={<h1>Loading...</h1>}>
  //           <AppointmentBooking />
  //         </Suspense>
  //       ),
  //     },
  //     {
  //       path: "book-appointment/:id",
  //       element: (
  //         <Suspense fallback={<Loader />}>
  //           <AppointmentBooking />
  //         </Suspense>
  //       ),
  //     },
  //     {
  //       path: "session-notes",
  //       element: (
  //         <Suspense fallback={<Loader />}>
  //           <JoinMeeting />
  //         </Suspense>
  //       ),
  //     },
  //     // {
  //     //   path: "session-meeting",
  //     //   element: (
  //     //     <Suspense fallback={<Loader />}>
  //     //       <VideoCall />
  //     //     </Suspense>
  //     //   ),
  //     // },
  //     {
  //       path: "physio-availability/:id",
  //       element: (
  //         <Suspense fallback={<Loader />}>
  //           <PhysioAvailability />
  //         </Suspense>
  //       ),
  //     },
  //   ],
  //   errorElement: <NotFound />,
  // },
  // {
  //   path: "/ehr",
  //   element: (
  //     <Suspense fallback={<Loader />}>
  //       <ProductCreation/>
  //     </Suspense>
  //   ),
  //   errorElement: <NotFound />,
  // },
  // {
  //   path: "/",
  //   element: (
  //     <Suspense fallback={<Loader />}>
  //       <Login />
  //     </Suspense>
  //   ),
  //   errorElement: <NotFound />,
  // },
  // {
  //   path: "/forgotPassword",
  //   element: (
  //     <Suspense fallback={<Loader />}>
  //       <ForgotPassword />
  //     </Suspense>
  //   ),
  //   errorElement: <NotFound />,
  // },
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
