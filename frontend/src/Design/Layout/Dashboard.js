import React from "react";
import logo from "../Assets/ProductLogo.svg";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [motion, setMotion] = React.useState(false);
  const [grid, setGrid] = React.useState(false);
  const [gas, setGas] = React.useState(true);
  const [temp, setTemp] = React.useState(0);
  const [bat, setBat] = React.useState(0);
  const [time, setTime] = React.useState("yyyy-mm-dd hh-mm-ss");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://nodemcu-dashboard.onrender.com/data"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        // setData(jsonData);

        function formatDateTime(dateTimeString) {
          const date = new Date(dateTimeString);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          const seconds = String(date.getSeconds()).padStart(2, "0");

          return `${year}-${month}-${day} ${hours}-${minutes}-${seconds}`;
        }

        // console.log(jsonData);

        setTime(formatDateTime(jsonData.timestamp));
        setTemp(jsonData.data.DsDHT11.Humidity);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 30 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="dashboard-topbar">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-12">
              <div className="content d-flex align-items-center">
                <img
                  src={logo}
                  alt="Product Logo"
                  className="product-logo mt-4 mb-4 mr-5"
                />

                <Dropdown className="ml-2">
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    id="dropdown-basic"
                  >
                    Device 001
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Device 002</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">device 003</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Device 004</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="d-flex">
                <p className="ml-2 mt-4 mb-4 pt-2 px-2">Filter Time :</p>
                <div className="content d-flex align-items-center">
                  <Dropdown className="ml-2 mt-4 mb-4">
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      id="dropdown-basic"
                    >
                      Last 5 minutes
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        Last 15 minutes
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Last 30 minutes
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Last 60 minutes
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-contents">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mt-3">
              <h1 className="fw-light fs-1">Device Name : 0001</h1>
            </div>
            <div className="col-md-6 col-12">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="mt-1 mb-4">Device State</h3>
                  <p>Last Updated on : {time}</p>
                </div>
                <div className="col-md-4 col-12">
                  <div className="card p-4 data-card text-center shadow-sm pb-1 state">
                    <h4 className="fw-light fs-4">Device State</h4>
                    <p className="fw-bold fs-2">Active</p>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="card p-4 data-card text-center shadow-sm pb-1 temp">
                    <h4 className="fw-light fs-4">Tempreture</h4>
                    <p className="fw-bold fs-2">{temp}°C</p>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="card p-4 data-card text-center shadow-sm pb-1 battery">
                    <h4 className="fw-light fs-4">Battery Vol.</h4>
                    <p className="fw-bold fs-2">{bat}V</p>
                  </div>
                </div>
                <div className="col-md-4 col-12 mt-4 ">
                  {motion ? (
                    <div className="card px-4 py-3 text-center shadow-sm warning-card-active">
                      <h4 className="fw-light fs-5 mb-0">Motion Detected</h4>
                    </div>
                  ) : (
                    <div className="card px-4 py-3 text-center shadow-sm warning-card">
                      <h4 className="fw-light fs-5 mb-0">Motion Detected</h4>
                    </div>
                  )}
                </div>
                <div className="col-md-4 col-12 mt-4 ">
                  {grid ? (
                    <div className="card px-4 py-3 text-center shadow-sm warning-card-active">
                      <h4 className="fw-light fs-5 mb-0">Grid Power</h4>
                    </div>
                  ) : (
                    <div className="card px-4 py-3 text-center shadow-sm warning-card">
                      <h4 className="fw-light fs-5 mb-0">Grid Power</h4>
                    </div>
                  )}
                </div>
                <div className="col-md-4 col-12 mt-4 ">
                  {gas ? (
                    <div className="card px-4 py-3 text-center shadow-sm warning-card-active">
                      <h4 className="fw-light fs-5 mb-0">Gas Emmition</h4>
                    </div>
                  ) : (
                    <div className="card px-4 py-3 text-center shadow-sm warning-card">
                      <h4 className="fw-light fs-5 mb-0">Gas Emmition</h4>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="mt-1 mb-4">Graph View</h3>
                </div>
                <p>under construction</p>
                <div className="col-md-12">
                  <h3 className="mt-1 mb-4">Location</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
