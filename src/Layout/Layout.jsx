import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const Layout = ({ children }) => {
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
