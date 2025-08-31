import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut, User, FileText, CheckCircle, Wallet } from "lucide-react";
import { authActions } from "../store/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-indigo-600" />
          <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Expense Tracker
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/expense"
            className="text-gray-700 hover:text-indigo-600 transition-colors flex items-center gap-1"
          >
            <FileText className="w-4 h-4" /> Expense
          </Link>

          <Link
            to="/profile"
            className="text-gray-700 hover:text-indigo-600 transition-colors flex items-center gap-1"
          >
            <User className="w-4 h-4" /> Profile
          </Link>

          <Link
            to="/profile-update"
            className="text-gray-700 hover:text-indigo-600 transition-colors flex items-center gap-1"
          >
            <User className="w-4 h-4" /> Update Profile
          </Link>

          <Link
            to="/verify"
            className="text-gray-700 hover:text-indigo-600 transition-colors flex items-center gap-1"
          >
            <CheckCircle className="w-4 h-4" /> Verify
          </Link>

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
