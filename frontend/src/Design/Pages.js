import React from "react";
import SideNavBar from "./Layout/SideNavbar";
import Dashboard from "./Layout/Dashboard";
import LoginScreen from "./Layout/LoginScreen";
import Dashboard2 from "./Layout/Dashboard2";

export default function Pages() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = (username, password) => {
    if (username === "ATM" && password === "ATM") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };
  return (
    <div>
      {/* <SideNavBar/> */}
      <Dashboard />
      {/* <Dashboard2 /> */}
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
