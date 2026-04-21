import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './models/Room.js';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const rooms = [
  {
    name: 'The Taj Heritage Suite',
    description: 'Regal luxury with Arabian Sea views, traditional Rajasthani artwork and modern dark-themed aesthetics.',
    type: '1BHK',
    pricePerMonth: 220000,
    sizeSqMeters: 140,
    capacity: 2,
    bedding: 'King Bed',
    amenities: ['AC', 'Hot Water', 'WiFi', 'Cooled Water'],
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAxpimUKPWLU0joccAu1kXTJrbMMWBJ2VObQ6RDyg01KUvMtst89_XBlfku1Ph-JVA3ZlOnoRi942ZXisY6RRDDeIAjiXXlF0jZ3ZMNZtqBZBOmHYu0HGaPQj_qS-FFg5UVjoFVdbMFRqb1G_NZeyC4a43BPubzyy28ayW5Mcxon8KS-w89N9uzn2mKOMsGuueJ7zcVp7eTFWWbJoEbqYL-N0Ak-lRlYdnDIlKLNEdOgSBHuN9Mq4fuEgdDj7kzKq1-QRk6rPrPMKny'],
    location: 'Mumbai, Maharashtra'
  },
  {
    name: 'Goan Coastal Villa',
    description: 'Serene sanctuary featuring Portuguese architecture, private infinity pool and beach access.',
    type: '2BHK',
    pricePerMonth: 155000,
    sizeSqMeters: 200,
    capacity: 4,
    bedding: '2 Queen Beds',
    amenities: ['AC', 'WiFi', 'Cooled Water', 'Hot Water'],
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuD-YcLbRJ2zpKv659RQRa5HsW4pMIYDgPB9FABElWStfyrXGUcC9P2xeHWv2XqHLfNEBTrz--1tknWPApKQGsNKuEa-PKHBS8-pWv_Sf1Oc29scq5452MtpHtSr6oSUqsEPuyLTIBTJPzNixa3usbYAYo6RQUf6vyDq9prPnVdgPIDIVEl-U-v-07eCZDUhuoEo_uylWIe8AmsIAMwR_oBzEiPgynY2i34yLQhNYQk5NFqcJkt0agSV5Ll6WhwfwlJZ9Kt6B9odbULv'],
    location: 'Vagator, Goa'
  },
  {
    name: 'Himalayan Retreat',
    description: 'Mountain suite with panoramic peaks, floor heating and wood fireplace.',
    type: '1RK',
    pricePerMonth: 120000,
    sizeSqMeters: 90,
    capacity: 2,
    bedding: 'Emperor Bed',
    amenities: ['Non AC', 'Hot Water', 'WiFi', 'Cooled Water'],
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCyfXTkVywAPWP0k8Pl_qLT6RLcw5RcuFnG33cmgFr6yG_OM4LNKzBtBb0pKc8thgpchBWLV58St1Qzv-UBZUzGkzfXrfb_ZpOMiHa8F7CeoHqZkgq0jECLEYMwEtAgyOxT014jDz5EsNtK-WZx-TFfqFuSz4eO06RvJCODJs9G-lk3yBcbVaud3ojPHWRAaEB5OVVjQpFWw4KM4gSWtHahZ9Lcygy2gkHPLksrW3FllQbVIpa1X2LYbaGHNmLEF1iIv1zBF8GEigIe'],
    location: 'Manali, Himachal Pradesh'
  },
  {
    name: 'Royal Rajputana Tent',
    description: 'Luxury glamping in golden dunes with private plunge pool and butler service.',
    type: 'Single Room',
    pricePerMonth: 180000,
    sizeSqMeters: 110,
    capacity: 2,
    bedding: 'King Bed',
    amenities: ['AC', 'Hot Water', 'WiFi', 'Cooled Water'],
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuA-4q7OZznwa_CooOPWhYSXi5KUqpLUrE3Z5NH98patyR6Nz59HsuFjeeHHuyRGoiUh8JXXv_da2mbZ-LTUWs-kvuqI08tM2cUL1HD7pFkuHPFaosReyf1T4N3soCLyz9cmu9NgDC4RLnS_o3ejI_YqKBKdbQd3G01JVhwuQbfOOxxuakQZRck3MBOXnCs6BtPhNfPc9sPRItBnKcobG5woTEtt3ZOcwxlXwe6rZvo6pYZd4y3EALi4ei44SyOdU7Ac0BSds2ScdFyR'],
    location: 'Jaisalmer, Rajasthan'
  },
  {
    name: 'Kerala Backwater Haven',
    description: 'Modern houseboat with floor-to-ceiling glass walls, private deck and Ayurvedic spa.',
    type: '1BHK',
    pricePerMonth: 145000,
    sizeSqMeters: 85,
    capacity: 2,
    bedding: 'Queen Bed',
    amenities: ['AC', 'WiFi', 'Hot Water', 'Cooled Water'],
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBndgMXM_QCKEy6RI26F6w83acIPyNSHeUj9z-lUvNKVJB_-Tpee4zw-LyImFsq16HGrA4SpAcYNpMzBpci3it0j1Ou6o6vUxIq3oXPLY_7vLKYJXlzUu3kjUXYjwVytLEFgrbKkoKJRlFmaG72818WZimu0ADuDZUo3jd0mBspVKh5JmixbsWHlO_BYi4u_o4omh_bTrKEL5Q4AX97AqcBp1NrsqYNilrEX_aRnmavqOX3R0If2mpEzkrFZPQLZZyTu9eHLs-UljZO'],
    location: 'Alleppey, Kerala'
  },
  {
    name: 'Silicon Valley Penthouse',
    description: 'Urban sanctuary for tech elite with home automation, city views and private gym.',
    type: '2BHK',
    pricePerMonth: 250000,
    sizeSqMeters: 180,
    capacity: 4,
    bedding: '2 King Beds',
    amenities: ['AC', 'WiFi', 'Hot Water', 'Cooled Water'],
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAxpimUKPWLU0joccAu1kXTJrbMMWBJ2VObQ6RDyg01KUvMtst89_XBlfku1Ph-JVA3ZlOnoRi942ZXisY6RRDDeIAjiXXlF0jZ3ZMNZtqBZBOmHYu0HGaPQj_qS-FFg5UVjoFVdbMFRqb1G_NZeyC4a43BPubzyy28ayW5Mcxon8KS-w89N9uzn2mKOMsGuueJ7zcVp7eTFWWbJoEbqYL-N0Ak-lRlYdnDIlKLNEdOgSBHuN9Mq4fuEgdDj7kzKq1-QRk6rPrPMKny'],
    location: 'Bengaluru, Karnataka'
  },
  {
    name: 'Udaipur Lakeview Chamber',
    description: 'Heritage chamber overlooking Lake Pichola with modern dark aesthetics.',
    type: '1BHK',
    pricePerMonth: 195000,
    sizeSqMeters: 130,
    capacity: 2,
    bedding: 'Emperor Bed',
    amenities: ['AC', 'Hot Water', 'WiFi', 'Cooled Water'],
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuD-YcLbRJ2zpKv659RQRa5HsW4pMIYDgPB9FABElWStfyrXGUcC9P2xeHWv2XqHLfNEBTrz--1tknWPApKQGsNKuEa-PKHBS8-pWv_Sf1Oc29scq5452MtpHtSr6oSUqsEPuyLTIBTJPzNixa3usbYAYo6RQUf6vyDq9prPnVdgPIDIVEl-U-v-07eCZDUhuoEo_uylWIe8AmsIAMwR_oBzEiPgynY2i34yLQhNYQk5NFqcJkt0agSV5Ll6WhwfwlJZ9Kt6B9odbULv'],
    location: 'Udaipur, Rajasthan'
  },
  {
    name: 'Auroville Sanctuary',
    description: 'Minimalist retreat surrounded by forest, includes meditation deck and organic cafe.',
    type: '1RK',
    pricePerMonth: 85000,
    sizeSqMeters: 95,
    capacity: 2,
    bedding: 'Queen Bed',
    amenities: ['Non AC', 'Hot Water', 'WiFi', 'Cooled Water'],
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCyfXTkVywAPWP0k8Pl_qLT6RLcw5RcuFnG33cmgFr6yG_OM4LNKzBtBb0pKc8thgpchBWLV58St1Qzv-UBZUzGkzfXrfb_ZpOMiHa8F7CeoHqZkgq0jECLEYMwEtAgyOxT014jDz5EsNtK-WZx-TFfqFuSz4eO06RvJCODJs9G-lk3yBcbVaud3ojPHWRAaEB5OVVjQpFWw4KM4gSWtHahZ9Lcygy2gkHPLksrW3FllQbVIpa1X2LYbaGHNmLEF1iIv1zBF8GEigIe'],
    location: 'Pondicherry, Tamil Nadu'
  },
  {
    name: 'Varanasi Ghat Suite',
    description: 'Spiritual retreat on historic ghats with soundproof walls and Ganges view.',
    type: 'Single Room',
    pricePerMonth: 110000,
    sizeSqMeters: 80,
    capacity: 2,
    bedding: 'King Bed',
    amenities: ['AC', 'Hot Water', 'WiFi', 'Cooled Water'],
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuA-4q7OZznwa_CooOPWhYSXi5KUqpLUrE3Z5NH98patyR6Nz59HsuFjeeHHuyRGoiUh8JXXv_da2mbZ-LTUWs-kvuqI08tM2cUL1HD7pFkuHPFaosReyf1T4N3soCLyz9cmu9NgDC4RLnS_o3ejI_YqKBKdbQd3G01JVhwuQbfOOxxuakQZRck3MBOXnCs6BtPhNfPc9sPRItBnKcobG5woTEtt3ZOcwxlXwe6rZvo6pYZd4y3EALi4ei44SyOdU7Ac0BSds2ScdFyR'],
    location: 'Varanasi, Uttar Pradesh'
  },
  {
    name: 'Andaman Ocean Villa',
    description: 'Overwater villa with glass-bottom floors, private reef access and infinity pool.',
    type: '1BHK',
    pricePerMonth: 280000,
    sizeSqMeters: 160,
    capacity: 2,
    bedding: 'King Bed',
    amenities: ['AC', 'Hot Water', 'WiFi', 'Cooled Water'],
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBndgMXM_QCKEy6RI26F6w83acIPyNSHeUj9z-lUvNKVJB_-Tpee4zw-LyImFsq16HGrA4SpAcYNpMzBpci3it0j1Ou6o6vUxIq3oXPLY_7vLKYJXlzUu3kjUXYjwVytLEFgrbKkoKJRlFmaG72818WZimu0ADuDZUo3jd0mBspVKh5JmixbsWHlO_BYi4u_o4omh_bTrKEL5Q4AX97AqcBp1NrsqYNilrEX_aRnmavqOX3R0If2mpEzkrFZPQLZZyTu9eHLs-UljZO'],
    location: 'Havelock Island, Andaman'
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

    const sampleRooms = rooms.map(room => {
      return { ...room, owner: ownerUser._id };
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
