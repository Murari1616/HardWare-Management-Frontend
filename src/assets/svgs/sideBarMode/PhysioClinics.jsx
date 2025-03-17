import React from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

const PhysioClinics= () => {
  const location = useLocation();
  return (
    <div>
      <svg width="22" height="16" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19.25 16V16.75H20H21.25V17.25H0.75V16.75H2H2.75V16V1C2.75 0.861934 2.86193 0.75 3 0.75H13C13.1381 0.75 13.25 0.861924 13.25 1V16V16.75H14H16H16.75V16V6.75H19C19.1381 6.75 19.25 6.86192 19.25 7V16ZM6 7.25H5.25V8V10V10.75H6H10H10.75V10V8V7.25H10H6ZM6 3.25H5.25V4V6V6.75H6H10H10.75V6V4V3.25H10H6Z"
          // stroke="#686868"
          stroke="none"
          className={clsx(location.pathname === "/pages/physio-clinics-list" ? "stroke-primary" : "stroke-muted")}
          stroke-width="1.5"
        />
      </svg>
    </div>
  );
};

export default PhysioClinics;
