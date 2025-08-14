import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import { Routes, Route } from "react-router-dom";
import UpdateProfile from "./components/UpdateProfile";
import VerifyYourMail from "./components/VerifyYourMail";
import Header from "./components/Header";
import ForgotPassword from "./components/ForgetPassword";
import ExpenseTracker from "./components/ExpenseTracker";
import Profile from "./components/Profile";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-update" element={<UpdateProfile />} />
        <Route path="/verify" element={<VerifyYourMail />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/expense" element={<ExpenseTracker />} />
      </Routes>
    </>
  );
};

export default App;
