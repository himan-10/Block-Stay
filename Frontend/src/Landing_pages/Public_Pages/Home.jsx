import React from 'react'
import Hero from './Home_components/Hero'
import Rooms from './Home_components/Rooms'
import Features from './Home_components/Features'
import Testimonials from './Home_components/Testimonials'

export const Home = () => {
  return (
    <div>
        <Hero />
        <Rooms />
        <Features />
        <Testimonials />
    </div>
  )
}
