import React from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpenseTracker from "./components/ExpenseTracker";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/expense" element={<ExpenseTracker />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
