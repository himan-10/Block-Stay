import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const makeAdmin = async () => {
    try {
        const email = process.argv[2];
        
        if (!email) {
            console.error('Please provide an email address. Usage: node makeAdmin.js <user_email>');
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const user = await User.findOne({ email });

        if (!user) {
            console.error(`User with email ${email} not found.`);
            process.exit(1);
        }

        user.role = 'admin';
        user.password = 'admin123'; // Setting a default password
        await user.save();

        console.log(`Success! User ${email} is now an admin.`);
        console.log(`Their password has been set to: admin123`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

makeAdmin();
