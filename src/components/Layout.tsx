import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="common-bg  align-items-center vh-100">
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
