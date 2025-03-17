import React from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

const Dashboard = () => {
  const location = useLocation();
  return (
    <div>
      <svg width="22" height="16" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5 2H3C2.17157 2 1.5 2.67157 1.5 3.5V5.5C1.5 6.32843 2.17157 7 3 7H5C5.82843 7 6.5 6.32843 6.5 5.5V3.5C6.5 2.67157 5.82843 2 5 2ZM3 0.5C1.34315 0.5 0 1.84315 0 3.5V5.5C0 7.15685 1.34315 8.5 3 8.5H5C6.65685 8.5 8 7.15685 8 5.5V3.5C8 1.84315 6.65685 0.5 5 0.5H3Z"
          // fill="#686868"
          fill="none"
          className={clsx(
            location.pathname === "/pages/admin-home" || location.pathname === "/pages/physio-home" || location.pathname === "/pages/patient-home" || location.pathname === "/pages/physio-dashboard"
              ? "fill-primary"
              : "fill-muted"
          )}
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5 12H3C2.17157 12 1.5 12.6716 1.5 13.5V15.5C1.5 16.3284 2.17157 17 3 17H5C5.82843 17 6.5 16.3284 6.5 15.5V13.5C6.5 12.6716 5.82843 12 5 12ZM3 10.5C1.34315 10.5 0 11.8431 0 13.5V15.5C0 17.1569 1.34315 18.5 3 18.5H5C6.65685 18.5 8 17.1569 8 15.5V13.5C8 11.8431 6.65685 10.5 5 10.5H3Z"
          fill="none"
          className={clsx(
            location.pathname === "/pages/admin-home" || location.pathname === "/pages/physio-home" || location.pathname === "/pages/patient-home" || location.pathname === "/pages/physio-dashboard"
              ? "fill-primary"
              : "fill-muted"
          )}
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15 2H13C12.1716 2 11.5 2.67157 11.5 3.5V5.5C11.5 6.32843 12.1716 7 13 7H15C15.8284 7 16.5 6.32843 16.5 5.5V3.5C16.5 2.67157 15.8284 2 15 2ZM13 0.5C11.3431 0.5 10 1.84315 10 3.5V5.5C10 7.15685 11.3431 8.5 13 8.5H15C16.6569 8.5 18 7.15685 18 5.5V3.5C18 1.84315 16.6569 0.5 15 0.5H13Z"
          fill="none"
          className={clsx(
            location.pathname === "/pages/admin-home" || location.pathname === "/pages/physio-home" || location.pathname === "/pages/patient-home" || location.pathname === "/pages/physio-dashboard"
              ? "fill-primary"
              : "fill-muted"
          )}
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15 12H13C12.1716 12 11.5 12.6716 11.5 13.5V15.5C11.5 16.3284 12.1716 17 13 17H15C15.8284 17 16.5 16.3284 16.5 15.5V13.5C16.5 12.6716 15.8284 12 15 12ZM13 10.5C11.3431 10.5 10 11.8431 10 13.5V15.5C10 17.1569 11.3431 18.5 13 18.5H15C16.6569 18.5 18 17.1569 18 15.5V13.5C18 11.8431 16.6569 10.5 15 10.5H13Z"
          fill="none"
          className={clsx(
            location.pathname === "/pages/admin-home" || location.pathname === "/pages/physio-home" || location.pathname === "/pages/patient-home" || location.pathname === "/pages/physio-dashboard"
              ? "fill-primary"
              : "fill-muted"
          )}
        />
      </svg>
    </div>
  );
};

export default Dashboard;
