import React from "react";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div className="common-bg  align-items-center ">
      <div className="container">
        {children}
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default Layout;
