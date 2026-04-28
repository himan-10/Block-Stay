import admin from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // For production (Render): Parse the JSON string from the environment variable
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable:", error);
  }
} else {
  // For local development: Require the JSON file
  try {
    serviceAccount = require("../serviceAccountKey.json");
  } catch (error) {
    console.warn("serviceAccountKey.json not found. Firebase Admin will not initialize properly without credentials.");
  }
}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.error("Firebase Admin initialization failed: Missing credentials.");
}

export default admin;