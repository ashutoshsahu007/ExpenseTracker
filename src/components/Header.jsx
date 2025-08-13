import React, { useContext } from "react";
import AuthContext from "../store/auth-context";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    authCtx.logout();
    navigate("/");
  };
  return (
    <nav className="w-full sticky top-0 z-50 flex justify-between items-center px-6 py-3 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
          alt="logo"
          className="w-8 h-8"
        />
        <span className="text-lg font-semibold text-blue-500">MyWebLink</span>
      </div>
      <div className="flex space-x-6 text-sm text-gray-700">
        <a href="/" className="hover:text-blue-500">
          Home
        </a>
        <a href="/products" className="hover:text-blue-500">
          Products
        </a>
        <a href="/about" className="hover:text-blue-500">
          About Us
        </a>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Header;
