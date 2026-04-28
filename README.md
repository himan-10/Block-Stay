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
├── Frontend/                   # React (Vite) Frontend Application
│   ├── src/
│   │   ├── assets/             # Static images, icons, and fonts
│   │   ├── Components/         # Reusable UI components (e.g., Navbar, Cards)
│   │   ├── context/            # Global state management via React Context
│   │   ├── Landing_pages/      # Core Application Views grouped by role/feature
│   │   │   ├── Admin_pages/    # Admin dashboard and analytics
│   │   │   ├── Auth/           # Login, Register, Google Auth role selection
│   │   │   ├── Owner_Pages/    # Owner property management and dashboard
│   │   │   ├── Payment_Pages/  # Stripe checkout and success/failure flows
│   │   │   ├── Public_Pages/   # Home, Rooms list, Property details, Legal pages
│   │   │   └── User_Pages/     # User dashboard, Wishlist, Bookings
│   │   ├── Routes/             # Application routing & protected route wrappers
│   │   ├── services/           # External API configurations
│   │   ├── App.jsx             # Main application entry point
│   │   └── firebase.js         # Firebase config for Google Authentication
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite configuration
│
└── Backend/                    # Express/Node.js Backend Application
    ├── config/                 # Database and server configurations
    ├── controllers/            # Request handling and business logic
    ├── middleware/             # Custom middlewares (e.g., Auth, Error handling)
    ├── models/                 # Mongoose schemas (User, Property, Booking, etc.)
    ├── routes/                 # Express API route definitions
    ├── socket/                 # Socket.io configurations for real-time features
    ├── utils/                  # Helper utilities (e.g., Nodemailer email dispatch)
    ├── seeder.js               # Script to seed database with initial Vidisha data
    ├── server.js               # Server entry point
    └── package.json            # Backend dependencies
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


## 🔄 Recent Updates & Key Implementations

Recent development has focused on making the platform robust, localized for the Indian market, and feature-rich:

### 🔐 Advanced Authentication & Onboarding
- **Google Authentication Integration**: Transitioned to a robust Firebase-to-Backend JWT flow. Users can seamlessly log in with their Google accounts, while the backend securely manages session tokens.
- **Role-Based Onboarding Flow**: Implemented a multi-step onboarding process for new Google users. Upon first login, users are required to explicitly select their account role (`Guest` or `Owner`), dictating their access permissions and which dashboard they land on.

### 📧 Automated Communications
- **Nodemailer Integration**: Developed a centralized email utility on the backend using `nodemailer` to keep users informed in real-time.
- **Transactional Emails**: Automated emails are now dispatched for critical user actions, including successful account registration, confirmed property bookings, and booking cancellations.

### ⚖️ Trust & Compliance
- **Legal Policy Pages**: Designed and implemented dedicated, professional UI components for platform policies.
- **Accessible Navigation**: Integrated comprehensive `FAQ`, `Privacy Policy`, and `Terms of Service` pages into the application routing and footer navigation to ensure user trust and legal compliance.

### 🇮🇳 Indian Market Localization (Vidisha Focus)
- **Hyper-Local Targeting**: Repivoted the entire platform to serve the Vidisha, Madhya Pradesh region exclusively, catering specifically to the needs of students and working professionals.
- **Pricing Restructure**: Completely overhauled the legacy dollar/per-night pricing model. Implemented a localized monthly INR pricing structure (`pricePerMonth`).
- **Regional Property Types**: Updated property schemas and frontend filters to reflect Indian real estate terminology, replacing generic terms with `1BHK`, `2BHK`, `1RK`, and `Single Room`.
- **Localized Amenities**: Refined the available amenities list to reflect the expectations of the target demographic (e.g., specific focus on study tables, Wi-Fi, localized food services).

### 🔍 Search & Interactive Booking
- **Advanced Client-Side Filtering**: Enhanced the main "Rooms" exploration page with instant client-side filtering capabilities, allowing users to rapidly sort properties by specific type and required amenities.
- **Dynamic Date Calculations**: Re-engineered the property details page to support interactive check-in and checkout date selection. The system now dynamically calculates total pricing based on the selected duration and the property's monthly rate.

### ⭐ User Engagement & Experience
- **Property Review System**: Deployed a robust, user-submitted review system. Tenants can now leave verified feedback and 1-5 star ratings on individual properties, driving organic trust.
- **Premium Rebranding**: Executed a comprehensive copywriting overhaul across the entire platform (Home, Listings, Auth, About/Contact). The new tone reflects a premium, trustworthy aesthetic comparable to top-tier global rental platforms, without disrupting the existing UI architecture.
- **Frontend Optimization**: Resolved critical data-fetching and rendering bugs preventing property cards from displaying correctly on the Rooms page. Streamlined the overarching navigation logic to remove redundant components and ensure a frictionless user journey.
