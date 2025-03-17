import React from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

const HealthCareAdmin = () => {
  const location = useLocation();
  return (
    <div>
      <svg width="20" height="15" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 20C0 15.7921 3.41116 12.381 7.61905 12.381C11.827 12.381 15.2381 15.7921 15.2381 20H13.3333C13.3333 16.8441 10.775 14.2857 7.61905 14.2857C4.46313 14.2857 1.90476 16.8441 1.90476 20H0ZM7.61905 11.4286C4.4619 11.4286 1.90476 8.87143 1.90476 5.71429C1.90476 2.55714 4.4619 0 7.61905 0C10.7762 0 13.3333 2.55714 13.3333 5.71429C13.3333 8.87143 10.7762 11.4286 7.61905 11.4286ZM7.61905 9.52381C9.72381 9.52381 11.4286 7.81905 11.4286 5.71429C11.4286 3.60952 9.72381 1.90476 7.61905 1.90476C5.51429 1.90476 3.80952 3.60952 3.80952 5.71429C3.80952 7.81905 5.51429 9.52381 7.61905 9.52381Z"
          // fill="#686868"
          fill="none"
          className={clsx(location.pathname === "/pages/admins-list" ? "fill-primary" : "fill-muted")}
        />
      </svg>
    </div>
  );
};

export default HealthCareAdmin;
