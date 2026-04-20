import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './models/Room.js';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const rooms = [
    {
        name: 'The Obsidian Suite',
        description: 'The Obsidian Suite lies at the pinnacle of architectural excellence, a masterclass in nocturnal luxury. Crafted with dark volcanic stone.',
        pricePerNight: 850,
        sizeSqMeters: 120,
        capacity: 2,
        bedding: 'Emperor Bed',
        amenities: ['Climate Control', 'Private Cellar', 'Thermal Sauna', 'Quantum WiFi'],
        images: ['/room_hero.png', '/room_bathroom.png'],
        location: 'Reykjavík, Iceland'
    },
    {
        name: 'Shadow Wing Suite',
        description: 'Positioned in the East Tower, the Shadow Wing Suite offers expansive views and meticulously designed acoustic isolation.',
        pricePerNight: 850,
        sizeSqMeters: 85,
        capacity: 2,
        bedding: 'King Bed',
        amenities: ['Climate Control', 'Home Cinema', 'WiFi'],
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAxpimUKPWLU0joccAu1kXTJrbMMWBJ2VObQ6RDyg01KUvMtst89_XBlfku1Ph-JVA3ZlOnoRi942ZXisY6RRDDeIAjiXXlF0jZ3ZMNZtqBZBOmHYu0HGaPQj_qS-FFg5UVjoFVdbMFRqb1G_NZeyC4a43BPubzyy28ayW5Mcxon8KS-w89N9uzn2mKOMsGuueJ7zcVp7eTFWWbJoEbqYL-N0Ak-lRlYdnDIlKLNEdOgSBHuN9Mq4fuEgdDj7kzKq1-QRk6rPrPMKny'],
        location: 'London, UK'
    },
    {
        name: 'Cyan Horizon Loft',
        description: 'An elevated experience on Level 42 featuring striking neon accents against deep matte finishes.',
        pricePerNight: 1200,
        sizeSqMeters: 110,
        capacity: 3,
        bedding: '2 Queen Beds',
        amenities: ['Infinity Pool Guard', 'Private Chef', 'WiFi'],
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuD-YcLbRJ2zpKv659RQRa5HsW4pMIYDgPB9FABElWStfyrXGUcC9P2xeHWv2XqHLfNEBTrz--1tknWPApKQGsNKuEa-PKHBS8-pWv_Sf1Oc29scq5452MtpHtSr6oSUqsEPuyLTIBTJPzNixa3usbYAYo6RQUf6vyDq9prPnVdgPIDIVEl-U-v-07eCZDUhuoEo_uylWIe8AmsIAMwR_oBzEiPgynY2i34yLQhNYQk5NFqcJkt0agSV5Ll6WhwfwlJZ9Kt6B9odbULv'],
        location: 'Tokyo, Japan'
    }
];

const importData = async () => {
    try {
        await Room.deleteMany();
        await Room.insertMany(rooms);
        console.log('Data Imported successfully');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
