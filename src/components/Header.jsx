import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LogOut,
  User,
  FileText,
  CheckCircle,
  Wallet,
  Moon,
  Sun,
} from "lucide-react";
import { authActions } from "../store/authSlice";
import { toggleTheme } from "../store/themeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <nav
      className={`w-full sticky top-0 z-50 backdrop-blur-md border-b shadow-md transition-colors duration-300
        ${
          darkMode
            ? "bg-gray-900/80 border-gray-700"
            : "bg-white/80 border-white/20"
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Wallet
            className={`w-6 h-6 ${
              darkMode ? "text-purple-400" : "text-indigo-600"
            }`}
          />
          <span
            className={`text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}
          >
            Expense Tracker
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`flex items-center gap-1 cursor-pointer px-3 py-1.5 rounded-lg border transition
              ${
                darkMode
                  ? "border-gray-600 hover:bg-gray-800 text-gray-200"
                  : "border-gray-300 hover:bg-gray-100 text-gray-800"
              }`}
          >
            {darkMode ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
            {darkMode ? "Dark" : "Light"}
          </button>

          <Link
            to="/expense"
            className={`flex items-center gap-1 transition-colors
              ${
                darkMode
                  ? "text-gray-300 hover:text-purple-400"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
          >
            <FileText className="w-4 h-4" /> Expense
          </Link>

          <Link
            to="/profile-update"
            className={`flex items-center gap-1 transition-colors
              ${
                darkMode
                  ? "text-gray-300 hover:text-purple-400"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
          >
            <User className="w-4 h-4" /> Update Profile
          </Link>

          <Link
            to="/verify"
            className={`flex items-center gap-1 transition-colors
              ${
                darkMode
                  ? "text-gray-300 hover:text-purple-400"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
          >
            <CheckCircle className="w-4 h-4" /> Verify
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 cursor-pointer px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md transition-all duration-200"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
