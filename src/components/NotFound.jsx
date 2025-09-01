import { useNavigate } from "react-router-dom";
import { Sparkles, Home, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";

const NotFound = () => {
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <div
      className={`min-h-screen py-10 flex flex-col items-center justify-center px-4 relative overflow-hidden transition-colors duration-300
        ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
            : "bg-gradient-to-br from-indigo-50 via-white to-cyan-50 text-gray-900"
        }`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {darkMode ? (
          <>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-900 to-blue-900 rounded-full opacity-20 blur-3xl"></div>
          </>
        ) : (
          <>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
          </>
        )}
      </div>

      {/* 404 Card */}
      <div
        className={`backdrop-blur-sm shadow-2xl rounded-3xl p-10 w-full max-w-md border relative z-10 text-center transition-colors duration-300
          ${
            darkMode
              ? "bg-gray-800/80 border-gray-700 text-gray-100"
              : "bg-white/80 border-white/20 text-gray-900"
          }`}
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
          <Sparkles className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm mb-4">
          404
        </h1>

        <h2
          className={`text-2xl font-bold mb-2 ${
            darkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Page Not Found
        </h2>
        <p className={`mb-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer
              ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
