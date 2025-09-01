import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { darkMode } = useSelector((state) => state.theme);

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = "";
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyANaJRxFmDFxPmAhRakHBVQMmCVOZroo-M";
      if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyANaJRxFmDFxPmAhRakHBVQMmCVOZroo-M";
      if (!email || !password || !confirmPassword) {
        alert("Please fill in all fields");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json().then((data) => {
          if (!res.ok) {
            throw new Error(data.error.message);
          }
          return data;
        });
      })
      .then((data) => {
        dispatch(
          authActions.login({ token: data.idToken, userId: data.localId })
        );
        !isLogin && alert("SignUp Successfull");
        isLogin && navigate("/expense");

        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        alert(error.message || "Authentication Failed !!");
      });
  };

  const handleForgetPassword = () => {
    navigate("/forget-password");
  };

  return (
    <div
      className={`min-h-screen py-10 flex flex-col items-center justify-center px-4 relative overflow-hidden transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100"
          : "bg-gradient-to-br from-indigo-50 via-white to-cyan-50 text-gray-900"
      }`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {darkMode ? (
          <>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-900 to-blue-900 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-gray-700 to-gray-800 rounded-full opacity-20 blur-3xl"></div>
          </>
        ) : (
          <>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
          </>
        )}
      </div>

      {/* App Name */}
      <h1
        className={`text-4xl font-extrabold mb-8 bg-clip-text text-transparent relative z-10 ${
          darkMode
            ? "bg-gradient-to-r from-cyan-400 to-blue-500"
            : "bg-gradient-to-r from-indigo-600 to-purple-600"
        }`}
      >
        Expense Tracker
      </h1>

      {/* Auth Card */}
      <div
        className={`backdrop-blur-sm shadow-2xl rounded-3xl p-8 w-full max-w-md border relative z-10 transition-colors duration-300 ${
          darkMode
            ? "bg-gray-800/80 border-gray-700"
            : "bg-white/80 border-white/20"
        }`}
      >
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg ${
              darkMode
                ? "bg-gradient-to-br from-cyan-500 to-blue-600"
                : "bg-gradient-to-br from-indigo-500 to-purple-600"
            }`}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2
            className={`text-3xl font-bold bg-clip-text text-transparent mb-2 ${
              darkMode
                ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                : "bg-gradient-to-r from-indigo-600 to-purple-600"
            }`}
          >
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {isLogin
              ? "Sign in to continue your journey"
              : "Join us and start your adventure"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail
                className={`h-5 w-5 ${
                  darkMode ? "text-gray-400" : "text-gray-400"
                }`}
              />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full pl-12 pr-4 py-3.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100"
                  : "bg-gray-50/50 border-gray-200 text-gray-900 hover:bg-white"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`w-full pl-12 pr-12 py-3.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100"
                  : "bg-gray-50/50 border-gray-200 text-gray-900 hover:bg-white"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>

          {/* Confirm Password Input */}
          {!isLogin && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className={`w-full pl-12 pr-12 py-3.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100"
                    : "bg-gray-50/50 border-gray-200 text-gray-900 hover:bg-white"
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          )}

          {isLogin && (
            <div className="flex justify-end">
              <button
                onClick={handleForgetPassword}
                type="button"
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  darkMode
                    ? "text-cyan-400 hover:text-cyan-300"
                    : "text-indigo-600 hover:text-indigo-700"
                }`}
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl py-3.5 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLogin ? "Sign In" : "Create Account"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              ></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-4 ${
                  darkMode
                    ? "bg-gray-800 text-gray-400"
                    : "bg-white text-gray-500"
                }`}
              >
                or
              </span>
            </div>
          </div>
          <p
            className={`mt-4 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin((prev) => !prev)}
              className={`font-semibold transition-colors cursor-pointer ${
                darkMode
                  ? "text-cyan-400 hover:text-cyan-300"
                  : "text-indigo-600 hover:text-indigo-700"
              }`}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
