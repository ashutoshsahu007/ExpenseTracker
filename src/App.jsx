import React from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpenseTracker from "./components/ExpenseTracker";
import UpdateProfile from "./components/UpdateProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/expense" element={<ExpenseTracker />} />
      <Route path="/profile" element={<UpdateProfile />} />
    </Routes>
  );
};

export default App;
