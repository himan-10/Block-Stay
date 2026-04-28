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



Google Login Role Selection Plan
This plan outlines the steps to implement a role selection flow for users who sign up via Google Login, allowing them to choose between being a "Guest" or an "Owner".

User Review Required
Please review the Open Questions section below, specifically regarding what the "Verify" step for Owners should look like.

Open Questions
IMPORTANT

What does the "Verify" step entail for Owners?
Your flow mentions: If Owner → Verify → Then Done.
Does "Verify" mean:

They just need to enter their phone number or address?
They need to upload an ID document?
It's just a simple confirmation popup asking "Are you sure you want to be an owner?"
Please let me know what UI or form you want for the Verification step! For now, I will build a simple "Confirmation" step, which we can expand based on your answer.

Proposed Changes
Backend
[MODIFY] Backend/models/User.js
Update the role enum to include a new state called 'pending'.
javascript
role: { type: String, enum: ['user', 'owner', 'admin', 'pending'], default: 'user' }
[MODIFY] Backend/routes/authRoutes.js
Update the /google login route so that when a new user is created, their role is set to 'pending'.
Add a new route /set-role which accepts a role (either 'user' or 'owner') and updates the currently logged-in user's role in the database.
Frontend
[NEW] Frontend/src/Landing_pages/Auth/RoleSelectionModal.jsx (or injected directly into Login.jsx)
A beautiful modal that appears if a user logs in via Google and their role is 'pending'.
Displays two large buttons: "Continue as Guest" and "Continue as Owner".
If "Guest" is selected: Calls the backend to set role to user, then redirects to User Dashboard.
If "Owner" is selected: Shows the "Verify" step (as clarified by you), calls the backend to set role to owner, then redirects to Owner Dashboard.
[MODIFY] Frontend/src/context/AuthContext.jsx
Add a setAccountRole function to handle the API call to /api/auth/set-role and update the global user state.
[MODIFY] Frontend/src/Landing_pages/Auth/Login.jsx
Update the handleGoogleLogin function.
After Google authentication, check data.role.
If data.role === 'pending', display the Role Selection UI instead of immediately redirecting.
Verification Plan
Automated/Manual Testing
Delete an existing Google user from the database (or use a fresh Google account).
Click "Google Login".
Verify the Role Selection modal appears.
Select "Guest" and ensure the database updates to user and redirects to the correct dashboard.
Repeat the process but select "Owner", verify the Owner verification step appears, and ensure it redirects to the Owner dashboard upon completion.
