# Deployment Readiness Task

## Steps:
1. [x] Create Frontend/.env and Frontend/.env.example with VITE_API_URL=https://block-stay.onrender.com/api
2. [x] Update Frontend/src/context/AuthContext.jsx: Replace hardcoded baseURL with import.meta.env.VITE_API_URL fallback
3. [x] Update Frontend/src/Landing_pages/Payment_Pages/checkout/PaymentForm.jsx: Import/use api from AuthContext instead of direct axios
4. [x] Update Backend/server.js: Add production frontend origins to CORS (https://blockstay1.netlify.app) and Socket.io
5. [x] Add .env to Frontend/.gitignore
6. [ ] Test: cd Frontend && npm run dev
7. [ ] Build & Preview: cd Frontend && npm run build && npm run preview
8. [ ] Verify deployed sites connectivity

