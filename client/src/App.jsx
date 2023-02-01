import "./App.css";
import React from "react";
import LoginPage from "pages/Login";
import RegisterPage from "pages/Register";
import Dashboard from "pages/Dashboard";
import AlertNotifications from "components/AlertNotifications";
import { Routes, Route, Navigate } from "react-router-dom";

//const Dashboard = React.lazy(() => import("pages/Dashboard"));


function App() {
  return (
    <>
      <Routes>
        <Route exact element={<LoginPage />} path="/login" />
        <Route exact element={<RegisterPage />} path="/register" />
        <Route exact element={<Dashboard />} path="/dashboard" />
        <Route exact element={<Navigate to="/dashboard" replace />} path="/" />
        <Route exact element={<Navigate to="/dashboard" replace />} path="*" />
      </Routes>
      <AlertNotifications />
    </>
  );
}

export default App;
