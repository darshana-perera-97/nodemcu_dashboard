import React from "react";
import SideNavBar from "./Layout/SideNavbar";
import Dashboard from "./Layout/Dashboard";
import LoginScreen from "./Layout/LoginScreen";

export default function Pages() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = (username, password) => {
    if (username === "a" && password === "a") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };
  return (
    <div>
      {/* <SideNavBar/> */}
      <Dashboard />
      {/* <LoginScreen /> */}
      {/* {isLoggedIn ? (
        <div>
          <Dashboard isLoggedIn={isLoggedIn} />
         
        </div>
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )} */}
    </div>
  );
}
