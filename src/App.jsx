import "./App.css";
import Auth from "./components/Auth";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ForgotPassword from "./components/ForgetPassword";
import ExpensePage from "./pages/ExpensePage";
import { useSelector } from "react-redux";
import NotFound from "./components/NotFound";
import Verify from "./pages/Verify";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  console.log(isLoggedIn, "isLoggedinapp");

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!isLoggedIn ? <Auth /> : <Navigate to="/expense" replace />}
        />
        <Route
          path="/expense"
          element={isLoggedIn ? <ExpensePage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <ProfilePage /> : <Navigate to="/" replace />}
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
        <Route
          path="/forget-password"
          element={
            !isLoggedIn ? (
              <ForgotPassword />
            ) : (
              <Navigate to={location.pathname} replace />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
