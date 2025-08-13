import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpenseTracker from "./components/ExpenseTracker";
import UpdateProfile from "./components/UpdateProfile";
import VerifyYourMail from "./components/VerifyYourMail";
import Header from "./components/Header";
import ForgotPassword from "./components/ForgetPassword";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/expense" element={<ExpenseTracker />} />
        <Route path="/profile" element={<UpdateProfile />} />
        <Route path="/verify" element={<VerifyYourMail />} />
        <Route path="forget-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

export default App;
