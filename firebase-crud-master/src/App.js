// import React, { useEffect, useState } from "react";
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, onValue } from "firebase/database";

// function App() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     // Check if Firebase app already exists
//     if (!getApp()) {
//       // Your web app's Firebase configuration
//       const firebaseConfig = {
//         apiKey: "AIzaSyAuU5qac9KqPpLt4_d6B5OEKPZWua5YqVk",
//         authDomain: "atm--project.firebaseapp.com",
//         databaseURL:
//           "https://atm--project-default-rtdb.asia-southeast1.firebasedatabase.app",
//         projectId: "atm--project",
//         storageBucket: "atm--project.appspot.com",
//         messagingSenderId: "5612719051",
//         appId: "1:5612719051:web:28b7904ad325f86b39c44e",
//       };

//       // Initialize Firebase
//       initializeApp(firebaseConfig);
//     }

//     const app = getApp(); // Get Firebase app instance
//     const database = getDatabase(app);

//     // Function to read data from the database
//     function readData() {
//       const dbRef = ref(database);
//       onValue(dbRef, (snapshot) => {
//         const data = snapshot.val();
//         console.log(data); // Print data to the console
//         setData(data);
//       });
//     }

//     // Call the readData function
//     readData();

//     // Clean up Firebase resources
//     return () => {
//       // Implement cleanup if necessary
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Sahasak nivaum 2024 - ATM Secure</h1>
//       <div id="data">{JSON.stringify(data, null, 2)}</div>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

export default function App() {
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

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      const dbRef = ref(database);

      try {
        const snapshot = await new Promise((resolve, reject) => {
          onValue(dbRef, resolve, reject); // Listening for changes and resolving the promise
        });

        const fetchedData = snapshot.val(); // Get the value from the snapshot
        setData(fetchedData); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      console.log("Cleanup...");
    };
  }, [firebaseConfig]);
  return (
    <div>
      App{" "}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
