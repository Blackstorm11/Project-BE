// import React from "react";
// import { Navigate } from "react-router-dom";

// type Props = {
//   children: React.ReactNode;
//   token?: string;
// };

// const ProtectedRoute = ({ children, token }: Props) => {
//   if (!token) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { Route } from "react-router-dom";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (element) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  
  if (token === undefined || userRole !== "admin") {
    return <Navigate to="/" />;
  }

  return <Route element={element} />;
};

export default ProtectedRoute;
