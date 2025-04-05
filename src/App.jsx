import React from "react";
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
import RegistrationSuccessfully from "./module/vendor/RegistrationSuccessfully/RegistrationSuccessfully";
import OTP from "./pages/OTP/OTP";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import OrdersList from "./module/admin/Orders/OrdersList";
import VendorOrder from "./module/vendor/Orders/VendorOrder";
import WaterCansProduct from "./module/admin/WaterCansProduct/WaterCansProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/applicationform" element={<ApplicationForm />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/registration-successfully" element={<RegistrationSuccessfully />} />  
        {/* Layout wraps all child routes */}

    {/* Admin Routes - wrap with Layout if needed */}
    <Route path="/admin" element={<Layout />}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="vendorlist" element={<VendorList />} />
      <Route path="payment" element={<AdminPayment />} />
      <Route path="Orders" element={<OrdersList />} />
      <Route path="waterCan" element={<WaterCansProduct />} />
    </Route>

    {/* Vendor Routes - vendorId passed via URL param */}
    <Route path="/vendor/:vendorId" element={<Layout />}>
      <Route path="dashboard" element={<VendorDashboard />} />
      <Route path="orders" element={<VendorOrder />} />
    </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;



