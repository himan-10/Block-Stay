import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from './Home_components/Hero';
import Rooms from './Home_components/Rooms';
import Features from './Home_components/Features';
import Testimonials from './Home_components/Testimonials';

export const Home = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const { data } = await axios.get(`${apiUrl}/rooms`);
        // We only want to show a few featured rooms on the homepage
        setFeaturedRooms(data.rooms ? data.rooms.slice(0, 3) : []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div>
        <Hero />
        <Rooms rooms={featuredRooms} loading={loading} />
        <Features />
        <Testimonials />
    </div>
  )
}
