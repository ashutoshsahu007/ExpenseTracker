import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { darkMode } = useSelector((state) => state.theme);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyANaJRxFmDFxPmAhRakHBVQMmCVOZroo-M`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        throw new Error(data.error?.message || "Something went wrong");
      }

      setMessage(
        "A password reset link has been sent to your email. Please check your inbox."
      );
      setEmail("");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div
      className={`h-screen flex items-center justify-center px-4 relative overflow-hidden transition-colors duration-300
      ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-indigo-50 via-white to-cyan-50"
      }`}
    >
      {/* Background decorations */}
      {!darkMode && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
        </div>
      )}

      {/* Reset Card */}
      <div
        className={`backdrop-blur-sm shadow-2xl rounded-3xl p-8 w-full max-w-md border relative z-10 transition-colors duration-300
        ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white/80 border-white/20"
        }`}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Reset Password
          </h1>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Enter your email to receive a password reset link
          </p>
        </div>

        <form onSubmit={handlePasswordReset} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail
                className={`h-5 w-5 ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              />
            </div>
            <input
              type="email"
              placeholder="Enter your email address"
              className={`w-full border rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200
              ${
                darkMode
                  ? "bg-gray-700 border-gray-600 placeholder-gray-500 text-gray-100"
                  : "bg-gray-50/50 border-gray-200 placeholder-gray-400 hover:bg-white"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 cursor-pointer hover:from-indigo-700 hover:to-purple-700 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Sending Reset Link...</span>
              </div>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 border rounded-xl flex items-start space-x-3 ${
              darkMode
                ? "bg-green-900/30 border-green-700"
                : "bg-green-50 border-green-200"
            }`}
          >
            <CheckCircle
              className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                darkMode ? "text-green-400" : "text-green-600"
              }`}
            />
            <p
              className={`text-sm leading-relaxed ${
                darkMode ? "text-green-300" : "text-green-700"
              }`}
            >
              {message}
            </p>
          </div>
        )}

        {error && (
          <div
            className={`mt-6 p-4 border rounded-xl flex items-start space-x-3 ${
              darkMode
                ? "bg-red-900/30 border-red-700"
                : "bg-red-50 border-red-200"
            }`}
          >
            <AlertCircle
              className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                darkMode ? "text-red-400" : "text-red-600"
              }`}
            />
            <p
              className={`text-sm leading-relaxed ${
                darkMode ? "text-red-300" : "text-red-700"
              }`}
            >
              {error}
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/"
            className={`inline-flex items-center space-x-2 text-sm font-medium transition-colors duration-200 group
            ${
              darkMode
                ? "text-indigo-400 hover:text-indigo-300"
                : "text-indigo-600 hover:text-indigo-700"
            }`}
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
