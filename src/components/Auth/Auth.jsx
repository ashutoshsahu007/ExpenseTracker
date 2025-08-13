import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

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
        console.log(data);
        isLogin && authCtx.login(data.idToken);
        isLogin && navigate("/expense");
      })
      .catch((error) => {
        alert(error.message || "Authentication Failed !!");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-6 py-3 bg-white shadow-sm">
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
        </div>
      </nav>

      {/* Signup Form */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="bg-white border border-gray-300 shadow-sm rounded-sm p-8 w-80 relative z-10">
          <h2 className="text-xl font-medium text-center mb-6">
            {isLogin ? "LogIn" : "SignUp"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <button
              type="submit"
              className="w-full curspointer bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2"
            >
              {isLogin ? "LogIn" : "SignUp"}
            </button>
          </form>
        </div>

        {/* Login Redirect Button */}
        <div className="mt-4 w-80">
          <button
            onClick={() => setIsLogin((prevState) => !prevState)}
            className="w-full cursor-pointer bg-green-50 border border-green-200 rounded px-4 py-2 text-sm hover:bg-green-100"
          >
            {isLogin
              ? "Don't have an account SignUp"
              : " Have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
