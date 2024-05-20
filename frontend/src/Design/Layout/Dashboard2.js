import React from "react";

export default function Dashboard2() {
  const [motion, setMotion] = React.useState(false);
  const [grid, setGrid] = React.useState(false);
  const [gas, setGas] = React.useState(true);
  const [temp, setTemp] = React.useState(0);
  const [bat, setBat] = React.useState(0);
  const [time, setTime] = React.useState("yyyy-mm-dd hh-mm-ss");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://nodemcu-dashboard.onrender.com/data"); // Ensure this URL is correct
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return <div>Dashboard2</div>;
}
