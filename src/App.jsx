import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "../src/module/admin/Dashboard/AdminDashboard";
import Layout from "./layout/Layout";
import VendorDashboard from "./module/vendor/Dashboard/VendorDashboard";
import ApplicationForm from "./module/vendor/Applicationform/Applicationform";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/applicationform" element={<ApplicationForm />} />

        {/* Layout wraps all child routes */}
        <Route path="/" element={<Layout />}>
          {/* Admin Dashboard Route */}
          <Route path="admin" element={<AdminDashboard />} />
        

        {/* Optional: 404 Route */}
        <Route path="vendor" element={<VendorDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



