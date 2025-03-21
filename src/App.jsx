import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "../src/module/admin/Dashboard/AdminDashboard";
import Layout from "./layout/Layout";
import VendorDashboard from "./module/vendor/Dashboard/VendorDashboard";
import ApplicationForm from "./module/vendor/Applicationform/Applicationform";
import Signup from "./pages/Signup/Signup";
import VendorList from "./module/admin/Vendorlist/Vendorlist";
import Login from "./pages/Login/Login";
import AdminPayment from "./module/admin/Payment/AdminPayment";
import VendorPayment from "./module/admin/VendorPayment/VendorPayment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/applicationform" element={<ApplicationForm />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Layout wraps all child routes */}
        <Route path="/" element={<Layout />}>
          {/* Admin Dashboard Route */}
          <Route path="admin" element={<AdminDashboard />} />
        

        {/* Optional: 404 Route */}
        <Route path="vendor" element={<VendorDashboard />} />

        {/* Vendor List Route */}
        <Route path="/admin/vendorlist" element={<VendorList />} />
        <Route path="/admin/payment" element={<AdminPayment />} />
        

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



