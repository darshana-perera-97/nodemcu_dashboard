const express = require("express");
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, onValue } = require("firebase/database");

// Initialize Firebase Admin SDK
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
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase();

const app = express();

// Define a route to fetch data
app.get("/data", async (req, res) => {
  try {
    const dbRef = ref(database);
    const snapshot = await new Promise((resolve, reject) => {
      onValue(dbRef, resolve, reject); // Listen for changes and resolve the promise
    });
    const data = snapshot.val(); // Get the value from the snapshot
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
