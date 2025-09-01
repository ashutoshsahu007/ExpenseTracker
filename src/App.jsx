import "./App.css";
import Auth from "./components/Auth";
import { Routes, Route, Navigate } from "react-router-dom";
import ForgotPassword from "./components/ForgetPassword";
import ExpensePage from "./pages/ExpensePage";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "./components/NotFound";
import Verify from "./pages/Verify";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import { useEffect } from "react";
import { autoLogout } from "./store/authActions";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(autoLogout());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/"
        element={!isLoggedIn ? <Auth /> : <Navigate to="/expense" replace />}
      />

      {/* Protected Routes */}
      <Route
        path="/expense"
        element={isLoggedIn ? <ExpensePage /> : <Navigate to="/" replace />}
      />

      <Route
        path="/profile-update"
        element={
          isLoggedIn ? <UpdateProfilePage /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/verify"
        element={isLoggedIn ? <Verify /> : <Navigate to="/" replace />}
      />

      {/* Forgot Password - only if not logged in */}
      <Route
        path="/forget-password"
        element={!isLoggedIn ? <ForgotPassword /> : <Navigate to="/" replace />}
      />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
