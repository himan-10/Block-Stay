import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './models/Room.js';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const rooms = [
  {
    name: 'Cozy 1BHK in Mukherjee Nagar',
    description: 'Perfect for working professionals. Semi-furnished 1BHK with high-speed WiFi and power backup.',
    type: '1BHK',
    pricePerMonth: 8000,
    sizeSqMeters: 45,
    capacity: 2,
    bedding: '1 Double Bed',
    amenities: ['AC', 'WiFi', 'Hot Water', 'Washing Machine'],
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200'],
    location: 'Mukherjee Nagar, Vidisha, MP',
    rating: 4.5,
    numReviews: 2,
    reviews: [
      { name: 'Rahul S.', rating: 5, comment: 'Great place for students, very quiet!' },
      { name: 'Priya M.', rating: 4, comment: 'Good amenities, but AC took a while to fix.' }
    ]
  },
  {
    name: 'Student PG - Sanchi Road',
    description: 'Affordable sharing PG near colleges. Includes 3 meals a day, daily cleaning, and study desks.',
    type: 'Shared Room',
    pricePerMonth: 4500,
    sizeSqMeters: 25,
    capacity: 2,
    bedding: '2 Single Beds',
    amenities: ['Non AC', 'WiFi', 'Meals Included', 'Cooled Water'],
    images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1200'],
    location: 'Sanchi Road, Vidisha, MP',
    rating: 4.0,
    numReviews: 1,
    reviews: [
      { name: 'Amit K.', rating: 4, comment: 'Food is decent, very affordable.' }
    ]
  },
  {
    name: 'Private Studio - Civil Lines',
    description: 'Independent 1RK studio near the collectorate. Fully furnished with kitchen setup.',
    type: '1RK',
    pricePerMonth: 6500,
    sizeSqMeters: 30,
    capacity: 1,
    bedding: '1 Single Bed',
    amenities: ['AC', 'Hot Water', 'WiFi', 'Washing Machine'],
    images: ['https://images.unsplash.com/photo-1502672260266-1c1de2d9d0cb?auto=format&fit=crop&q=80&w=1200'],
    location: 'Civil Lines, Vidisha, MP',
    rating: 5.0,
    numReviews: 1,
    reviews: [
      { name: 'Neha V.', rating: 5, comment: 'Very safe and secure environment.' }
    ]
  },
  {
    name: 'Premium Single Room PG - Sherpura',
    description: 'Quiet environment ideal for students preparing for competitive exams. Dedicated study area.',
    type: 'Single Room',
    pricePerMonth: 5500,
    sizeSqMeters: 18,
    capacity: 1,
    bedding: '1 Single Bed',
    amenities: ['AC', 'Hot Water', 'WiFi', 'Study Desk'],
    images: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200'],
    location: 'Sherpura, Vidisha, MP',
    rating: 0,
    numReviews: 0,
    reviews: []
  },
  {
    name: 'Spacious 2BHK - Arihant Vihar',
    description: 'Looking for a flatmate in a pre-occupied 2BHK. Great society with park access.',
    type: 'Single Room',
    pricePerMonth: 7000,
    sizeSqMeters: 85,
    capacity: 1,
    bedding: '1 Double Bed',
    amenities: ['AC', 'WiFi', 'Hot Water', 'Washing Machine'],
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200'],
    location: 'Arihant Vihar, Vidisha, MP',
    rating: 4.8,
    numReviews: 1,
    reviews: [
      { name: 'Vikram', rating: 5, comment: 'Awesome flatmate, very spacious.' }
    ]
  },
  {
    name: 'Budget 1RK - Old Town',
    description: 'Unfurnished basic 1RK for long-term stay. Walking distance to local market.',
    type: '1RK',
    pricePerMonth: 3500,
    sizeSqMeters: 22,
    capacity: 2,
    bedding: 'None',
    amenities: ['Non AC', 'Hot Water', 'Cooled Water'],
    images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1200'],
    location: 'Old Town, Vidisha, MP',
    rating: 3.5,
    numReviews: 2,
    reviews: [
      { name: 'Suresh', rating: 3, comment: 'Very basic, but cheap.' },
      { name: 'Ramesh', rating: 4, comment: 'Good value for money.' }
    ]
  },
  {
    name: 'Boys PG - Station Road',
    description: 'PG with daily housekeeping, smart TV, AC, and premium meals. Close to railway station.',
    type: 'Shared Room',
    pricePerMonth: 6000,
    sizeSqMeters: 35,
    capacity: 2,
    bedding: '2 Single Beds',
    amenities: ['AC', 'Hot Water', 'WiFi', 'Meals Included'],
    images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200'],
    location: 'Station Road, Vidisha, MP',
    rating: 0,
    numReviews: 0,
    reviews: []
  },
  {
    name: 'Girls PG - Safe & Secure',
    description: 'Well-ventilated rooms with 24/7 security and CCTV. Close to major colleges.',
    type: 'Shared Room',
    pricePerMonth: 5000,
    sizeSqMeters: 28,
    capacity: 3,
    bedding: '3 Single Beds',
    amenities: ['Non AC', 'WiFi', 'Meals Included', 'Study Desk'],
    images: ['https://images.unsplash.com/photo-1522771731470-3138f8dba541?auto=format&fit=crop&q=80&w=1200'],
    location: 'Kharifatak, Vidisha, MP',
    rating: 4.7,
    numReviews: 3,
    reviews: [
      { name: 'Anjali', rating: 5, comment: 'Very safe!' },
      { name: 'Kiran', rating: 4, comment: 'Good food.' },
      { name: 'Sneha', rating: 5, comment: 'Warden is nice.' }
    ]
  },
  {
    name: 'Furnished 2BHK Family Flat',
    description: 'Ideal for small families or a group of working professionals. Fully equipped kitchen.',
    type: '2BHK',
    pricePerMonth: 12000,
    sizeSqMeters: 80,
    capacity: 4,
    bedding: '2 Double Beds',
    amenities: ['AC', 'Hot Water', 'WiFi', 'Washing Machine'],
    images: ['https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=1200'],
    location: 'Pital Mill Area, Vidisha, MP',
    rating: 0,
    numReviews: 0,
    reviews: []
  },
  {
    name: 'Executive Studio - Durga Nagar',
    description: 'Modern studio designed for professionals. Includes workstation and high-speed internet.',
    type: '1RK',
    pricePerMonth: 7500,
    sizeSqMeters: 35,
    capacity: 2,
    bedding: '1 Double Bed',
    amenities: ['AC', 'Hot Water', 'WiFi', 'Study Desk'],
    images: ['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&q=80&w=1200'],
    location: 'Durga Nagar, Vidisha, MP',
    rating: 0,
    numReviews: 0,
    reviews: []
  }
];

const importData = async () => {
  try {
    await Room.deleteMany();
    
    // Find or create an owner user
    let ownerUser = await User.findOne({ role: 'owner' });
    if (!ownerUser) {
      ownerUser = await User.create({
        name: 'Admin Owner',
        email: 'owner@blockstay.com',
        password: 'password123',
        role: 'owner'
      });
    }

    // We also need a standard user to author the dummy reviews
    let standardUser = await User.findOne({ email: 'user@blockstay.com' });
    if (!standardUser) {
        standardUser = await User.create({
            name: 'Dummy User',
            email: 'user@blockstay.com',
            password: 'password123',
            role: 'user'
        });
    }

    const sampleRooms = rooms.map(room => {
      const roomWithIds = { ...room, owner: ownerUser._id };
      if (roomWithIds.reviews) {
          roomWithIds.reviews = roomWithIds.reviews.map(rev => ({
              ...rev,
              user: standardUser._id
          }));
      }
      return roomWithIds;
    });

    await Room.insertMany(sampleRooms);
    console.log('Data Imported successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
