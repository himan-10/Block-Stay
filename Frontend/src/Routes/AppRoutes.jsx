import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import { Home } from '../Landing_pages/Public_Pages/Home';
import AboutUs from '../Landing_pages/Public_Pages/AboutUs';
import ContactUs from '../Landing_pages/Public_Pages/ContactUs';
import All_Rooms from '../Landing_pages/Public_Pages/All_Rooms';
import Room_Details from '../Landing_pages/Public_Pages/Room_Details';
import Login from '../Landing_pages/Auth/Login';
import Sign_up from '../Landing_pages/Auth/Sign_up';
import Forgot_Password from '../Landing_pages/Auth/Forgot_Password';
import Reset_Password from '../Landing_pages/Auth/Reset_Password';
import FAQ from '../Landing_pages/Public_Pages/FAQ';
import PrivacyPolicy from '../Landing_pages/Public_Pages/PrivacyPolicy';
import TermsOfService from '../Landing_pages/Public_Pages/TermsOfService';
import Experience from '../Landing_pages/Public_Pages/Experience';

import UnauthorisedAccess from '../Landing_pages/Utility/UnauthorisedAccess';
import PageNotFound from '../Landing_pages/Utility/PageNotFound';

import Navbar from '../Components/Reusable/Navbar';
import Footer from '../Components/Reusable/Footer';

// Dashboard Layouts
import UserLayout from '../Landing_pages/User_Pages/UserLayout';
import Dashboard from '../Landing_pages/User_Pages/Dashboard';
import Owner_Dashboard from '../Landing_pages/Owner_Pages/Owner_Dashboard';
import MyBooking from '../Landing_pages/User_Pages/MyBooking';
import Wishlist from '../Landing_pages/User_Pages/Wishlist';
import Profile from '../Landing_pages/User_Pages/Profile';

import OwnerLayout from '../Landing_pages/Owner_Pages/OwnerLayout';
import OwnerProperties from '../Landing_pages/Owner_Pages/OwnerProperties';
import OwnerBookings from '../Landing_pages/Owner_Pages/OwnerBookings';
import OwnerEarnings from '../Landing_pages/Owner_Pages/OwnerEarnings';
import OwnerProfile from '../Landing_pages/Owner_Pages/OwnerProfile';

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages with Standard Navbar & Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/rooms" element={<All_Rooms />} />
        <Route path="/rooms/:id" element={<Room_Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sign_up />} />
        <Route path="/forgot" element={<Forgot_Password />} />
        <Route path="/reset-password/:token" element={<Reset_Password />} />
        <Route path="/unauthorized" element={<UnauthorisedAccess />} />
        
        {/* Support Pages */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>

      {/* User Dashboard Routes (Nested inside UserLayout) */}
      <Route path="/user" element={<ProtectedRoute requiredRole="user"><UserLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<MyBooking />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Owner Dashboard Routes */}
      <Route path="/owner" element={<ProtectedRoute requiredRole="owner"><OwnerLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Owner_Dashboard />} />
        <Route path="properties" element={<OwnerProperties />} />
        <Route path="bookings" element={<OwnerBookings />} />
        <Route path="earnings" element={<OwnerEarnings />} />
        <Route path="profile" element={<OwnerProfile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
