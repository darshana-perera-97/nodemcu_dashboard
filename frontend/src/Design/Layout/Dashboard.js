import React from "react";
import logo from "../Assets/ProductLogo.svg";
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MapView from "./MapView";
import Graphs from "./Graphs";
import MapNew from "./MapNew";
import MapNew2 from "./MapNew2";

const Dashboard = () => {
  const [motion, setMotion] = React.useState(false);
  const [grid, setGrid] = React.useState(false);
  const [gas, setGas] = React.useState(true);
  const [door, setDoor] = React.useState(true);
  const [temp, setTemp] = React.useState(0);
  const [bat, setBat] = React.useState(0);
  const [speed, setSpeed] = React.useState(0);
  const [lon, setLon] = React.useState(10);
  const [lati, setLati] = React.useState(10);
  const [time, setTime] = React.useState("yyyy-mm-dd hh-mm-ss");
  const [data, setData] = React.useState({
    data: {
      DsDHT11: {
        Humidity: 0,
        Temperature: 0,
      },
      device1: {
        Latitude: 0,
        Longitude: 0,
        angleX: 0,
        angleY: 0,
        angleZ: 0,
        doorStatus: 0,
        gasStatus: 0,
        gridStatus: 0,
        temperatureCelsius: 0.0,
        time: "22:49:17",
        voltage: 0,
      },
    },
    state: false,
    timestamp: "2024-05-21T22:49:12+05:30",
  });
  const [timeFilter, setTimeFilter] = React.useState("30_min");

  const handleSelect = (eventKey) => {
    setTimeFilter(eventKey);
  };

  const [link, setLink] = React.useState(
    "https://basic-node-js-backend.onrender.com/history4"
  );

  // React.useEffect(() => {
  //   if (timeFilter === "30_min") {
  //     setLink("https://basic-node-js-backend.onrender.com/history4");
  //   } else if (timeFilter === "1_hour") {
  //     setLink("https://basic-node-js-backend.onrender.com/history3");
  //   } else if (timeFilter === "2_hours") {
  //     setLink("https://basic-node-js-backend.onrender.com/history2");
  //   } else if (timeFilter === "4_hours") {
  //     setLink("https://basic-node-js-backend.onrender.com/history1");
  //   }
  // }, [timeFilter]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // "http://localhost:3002/data2"
          "https://basic-node-js-backend.onrender.com/data2"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
        console.log("first")
        function formatDateTime(dateTimeString) {
          const date = new Date(dateTimeString);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          const seconds = String(date.getSeconds()).padStart(2, "0");

          return `${year}-${month}-${day} ${hours}-${minutes}-${seconds}`;
        }

        setTime(formatDateTime(jsonData.timestamp));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 500);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    setTemp(data.data.device1.temperatureCelsius.toFixed(2));
    let voltage = data.data.device1.voltage;
    let roundedVoltage = voltage.toFixed(2);
    setBat(parseFloat(roundedVoltage));
    setLati(data.data.device1.Latitude);
    const newSpeed = data.data.device1.speed;
    if (Math.abs(newSpeed - speed) > 2) {
      setSpeed(newSpeed);
    }
    setLon(data.data.device1.Longitude);
    setMotion(data.data.device1.moction);
    if (data.data.device1.gridStatus === 1) {
      setGrid(true);
    } else {
      setGrid(false);
    }
    setGas(data.data.device1.gasStatus);
    setDoor(data.data.device1.doorStatus);
  }, [data]);

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
                    <Dropdown.Item href="#/action-2">Device 003</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Device 004</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="d-flex">
                <p className="ml-2 mt-4 mb-4 pt-2 px-2">Filter Time :</p>
                <div className="content d-flex align-items-center">
                  <ButtonGroup>
                    <Button
                      variant={
                        timeFilter === "30_min"
                          ? "primary"
                          : "outline-secondary"
                      }
                      onClick={() => {
                        setTimeFilter("30_min");
                        setLink(
                          "https://basic-node-js-backend.onrender.com/history1"
                        );
                      }}
                    >
                      30 min
                    </Button>
                    <Button
                      variant={
                        timeFilter === "1_hour"
                          ? "primary"
                          : "outline-secondary"
                      }
                      onClick={() => {
                        setTimeFilter("1_hour");
                        setLink(
                          "https://basic-node-js-backend.onrender.com/history2"
                        );
                      }}
                    >
                      60 min
                    </Button>
                    <Button
                      variant={
                        timeFilter === "2_hours"
                          ? "primary"
                          : "outline-secondary"
                      }
                      onClick={() => setTimeFilter("2_hours")}
                    >
                      2 hours
                    </Button>
                    <Button
                      variant={
                        timeFilter === "4_hours"
                          ? "primary"
                          : "outline-secondary"
                      }
                      onClick={() => setTimeFilter("4_hours")}
                    >
                      4 hours
                    </Button>
                  </ButtonGroup>
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
              <h1 className="fw-light fs-1">Device Name : Mahawewa ATM</h1>
            </div>
            <div className="col-md-6 col-12">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="mt-1 mb-4">Device State</h3>
                  <p className="mb-0 pb-0">Last Updated on : {time}</p>
                  <p className="mt-0 pt-0">
                    Last Device Online : {data.data.device1.time}
                  </p>
                </div>

                <div className="col-md-4 col-12">
                  {!data.state ? (
                    <div className="card p-4 data-card text-center shadow-sm pb-1 warning">
                      <h4 className="fw-light fs-4">Device State</h4>
                      <p className="fw-bold fs-2">Offline</p>
                    </div>
                  ) : (
                    <div className="card p-4 data-card text-center shadow-sm pb-1 state">
                      <h4 className="fw-light fs-4">Device State</h4>
                      <p className="fw-bold fs-2">Active</p>
                    </div>
                  )}
                </div>
                <div className="col-md-4 col-12">
                  {temp > 35.0 ? (
                    <div className="card p-4 data-card text-center shadow-sm pb-1 warning">
                      <h4 className="fw-light fs-4">Tempreture</h4>
                      <p className="fw-bold fs-2">{temp}°C</p>
                    </div>
                  ) : (
                    <div className="card p-4 data-card text-center shadow-sm pb-1 temp">
                      <h4 className="fw-light fs-4">Tempreture</h4>
                      <p className="fw-bold fs-2">{temp}°C</p>
                    </div>
                  )}
                </div>
                <div className="col-md-4 col-12">
                  <div className="card p-4 data-card text-center shadow-sm pb-1 battery">
                    <h4 className="fw-light fs-4">Battery Vol.</h4>
                    <p className="fw-bold fs-2">{bat}V</p>
                  </div>
                </div>
                <div className="col-md-3 col-12 mt-4 ">
                  {motion ? (
                    <div className="card px-2 py-3 text-center shadow-sm warning-card-active">
                      <h4 className="fw-light fs-6 mb-0">Motion Detected</h4>
                    </div>
                  ) : (
                    <div className="card px-2 py-3 text-center shadow-sm warning-card">
                      <h4 className="fw-light fs-6 mb-0">Motion Detected</h4>
                    </div>
                  )}
                </div>
                <div className="col-md-3 col-12 mt-4 ">
                  {!grid ? (
                    <div className="card px-2 py-3 text-center shadow-sm warning-card-active">
                      <h4 className="fw-light fs-6 mb-0">Battery Power</h4>
                    </div>
                  ) : (
                    <div className="card px-2 py-3 text-center shadow-sm warning-card warning-card-ok">
                      <h4 className="fw-light fs-6 mb-0">Grid Power</h4>
                    </div>
                  )}
                </div>
                <div className="col-md-3 col-12 mt-4 ">
                  {!gas ? (
                    <div className="card px-2 py-3 text-center shadow-sm warning-card-active">
                      <h4 className="fw-light fs-6 mb-0">Gas Emmition</h4>
                    </div>
                  ) : (
                    <div className="card px-2 py-3 text-center shadow-sm warning-card">
                      <h4 className="fw-light fs-6 mb-0">Gas Emmition</h4>
                    </div>
                  )}
                </div>
                <div className="col-md-3 col-12 mt-4 ">
                  {door ? (
                    <div className="card px-2 py-3 text-center shadow-sm warning-card-active">
                      <h4 className="fw-light fs-6 mb-0">Door Opened</h4>
                    </div>
                  ) : (
                    <div className="card px-2 py-3 text-center shadow-sm warning-card">
                      <h4 className="fw-light fs-6 mb-0">Door Closed</h4>
                    </div>
                  )}
                </div>
                <div className="col-md-12 mt-3">
                  <h3 className="mt-1 mb-4">Location</h3>
                  <p>Moving Speed : {speed}kmph</p>
                  {/* <MapView latitude={lati} longitude={lon} /> */}
                  <MapNew link={link} />
                  {/* <p>zoom in</p>
                  <MapNew2 link={link} /> */}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="mt-1 mb-4">Graph View</h3>
                </div>
                <Graphs link={link} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
