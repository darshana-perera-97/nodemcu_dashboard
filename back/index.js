const express = require("express");
const admin = require("firebase-admin");

// Replace with placeholders for security reasons (get from Firebase console)
const serviceAccount = require("./path/to/your/serviceAccountKey.json"); // Path to service account key file
const firebaseConfig = {
  apiKey: "AIzaSyAuU5qac9KqPpLt4_d6B5OEKPZWua5YqVk",
  authDomain: "atm--project.firebaseapp.com",
  databaseURL:
    "https://atm--project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "atm--project",
  storageBucket: "atm--project.appspot.com",
  messagingSenderId: "5612719051",
  appId: "1:5612719051:web:28b7904ad325f86b39c44e",
};
// Initialize Firebase Admin app securely (avoid hardcoding credentials)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL, // Optional, if using Realtime Database
});

const db = admin.database(); // Reference to the database

const app = express();

// Endpoint to read data from Firebase Realtime Database
app.get("/data", async (req, res) => {
  try {
    const snapshot = await db.ref().once("value"); // Get data from root reference
    const data = snapshot.val();
    res.json(data); // Send data as JSON response
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).send("Error retrieving data"); // Send error response
  }
});

// Start the Node.js server
app.listen(3000, () => console.log("Server listening on port 3000"));
