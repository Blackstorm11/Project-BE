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


import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  
  if (token === undefined || userRole !== "admin") {
    return <Navigate to="/" />;
  }

  return props.children;
};

export default ProtectedRoute;
