import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from '../Landing_pages/Public_Pages/Home';
import AboutUs from '../Landing_pages/Public_Pages/AboutUs';
import ContactUs from '../Landing_pages/Public_Pages/ContactUs';
import All_Rooms from '../Landing_pages/Public_Pages/All_Rooms';
import Room_Details from '../Landing_pages/Public_Pages/Room_Details';
import Login from '../Landing_pages/Auth/Login';
import Sign_up from '../Landing_pages/Auth/Sign_up';

import UnauthorisedAccess from '../Landing_pages/Utility/UnauthorisedAccess';
import PageNotFound from '../Landing_pages/Utility/PageNotFound';

import Navbar from '../Components/Reusable/Navbar';
import Footer from '../Components/Reusable/Footer';

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20"> {/* Adjust padding based on Navbar height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/rooms" element={<All_Rooms />} />
          <Route path="/rooms/:id" element={<Room_Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Sign_up />} />
          <Route path="/unauthorized" element={<UnauthorisedAccess />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default AppRoutes;
