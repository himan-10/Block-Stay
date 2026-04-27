# Blockstay

![Blockstay Banner](https://via.placeholder.com/1200x400/1e1b4b/a78bfa?text=Blockstay+-+Premium+Accommodations)

Blockstay is a fully functional, full-stack real estate and rental marketplace built on the MERN stack. Designed specifically for the Indian rental market (focusing initially on Vidisha, MP for students and professionals), Blockstay offers a seamless, highly attractive, and premium dark-themed user experience for booking 1BHK, 2BHK, 1RK, and Single Room accommodations.

## 🌟 Key Features

### User Experience & UI
- **Premium Dark Theme**: High-end visual aesthetics leveraging glassmorphism, tailored color palettes, and modern typography.
- **Smooth Animations**: Interactive UI components and micro-animations powered by Framer Motion.
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop devices utilizing Tailwind CSS v4.

### Core Functionality
- **Property Search & Filtering**: Advanced real-time search capabilities allowing users to filter properties by price, room type, and amenities.
- **Dynamic Property Pages**: Detailed room views with dynamically fetched data, image galleries, and interactive booking forms.
- **Authentication**: Secure JWT-based authentication system with Role-Based Access Control (RBAC) distinguishing between standard Users and Property Owners.
- **Booking & Payments**: Integrated Stripe payment gateway for seamless, secure, and instant property bookings.
- **Real-Time Features**: Integrated Socket.io for live updates.
- **Dashboards**: Dedicated dashboard panels for both Users (to view bookings, wishlists, and profile) and Owners/Admins (featuring data visualizations with Recharts).

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Payment Elements**: [Stripe React Elements](https://stripe.com/docs/stripe-js/react)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- **Payments**: [Stripe API](https://stripe.com/docs/api)
- **Real-time**: [Socket.io](https://socket.io/)

## 📂 Project Structure

```text
Blockstay/
├── Frontend/               # React (Vite) Frontend Application
│   ├── src/
│   │   ├── Components/     # Reusable UI components (Navbar, Footer, Cards)
│   │   ├── Landing_pages/  # Application Pages (Auth, Public, User, Owner)
│   │   ├── Routes/         # App Routing and Protected Routes logic
│   │   ├── assets/         # Static assets and images
│   │   └── App.jsx         # Main application entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
│
└── Backend/                # Express/Node.js Backend Application
    ├── models/             # Mongoose database schemas
    ├── routes/             # API endpoint definitions
    ├── controllers/        # Request handling logic
    ├── middleware/         # Auth and validation middlewares
    ├── server.js           # Server entry point
    └── package.json        # Backend dependencies
```

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your local machine:
- Node.js (v18 or higher recommended)
- MongoDB (Local instance or MongoDB Atlas URI)
- Stripe Account (for payment API keys)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blockstay.git
   cd blockstay
   ```

2. **Setup Backend**
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file in the `Backend` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

3. **Setup Frontend**
   ```bash
   cd ../Frontend
   npm install
   ```
   Create a `.env` file in the `Frontend` directory with the following variables:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

### Running the Application

You will need two terminal windows to run both the frontend and backend simultaneously.

**Terminal 1 (Backend):**
```bash
cd Backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd Frontend
npm run dev
```

The frontend will typically be available at `http://localhost:5173` and the backend API will run on `http://localhost:5000`.

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
