import { useEffect, useState } from "react";
import {
  Paper,
  FormGroup,
  FormControl,
  Select,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { dateBuilder } from "../utils/utils";
import shortid from "shortid";

export default function FeedbackForm() {
  const [busNumber, setBusNumber] = useState([""]);
  const [busRoute, setBusRoute] = useState([""]);
  const [station, setStation] = useState([""]);
  const [numOfPassengers, setNumOfPassengers] = useState("");

  const [feedback, setFeedback] = useState({
    busNoToSend: "",
    busRouteToSend: "",
    stationToSend: "",
  });

  const [errors, setErrors] = useState({
    busNo: "",
    route: "",
    busStation: "",
    passengers: "",
  });

  function isFormValid() {
    let isValid = true;
    let newErrors = { ...errors };

    if (feedback.busNoToSend.length === 0) {
      isValid = false;
      newErrors.busNo = "Bus Number is required";
    }

    if (feedback.busRouteToSend.length === 0) {
      isValid = false;
      newErrors.route = "Please select bus route ";
    }

    if (feedback.stationToSend.length === 0) {
      isValid = false;
      newErrors.busStation = "Please select the station";
    }

    if (numOfPassengers === "") {
      isValid = false;
      newErrors.passengers = "Please enter the number of passengers";
    }

    setErrors(newErrors);

    return isValid;
  }

  useEffect(() => {
    fetch(" https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setBusNumber(
          data.map((item) => {
            return item.id;
          })
        );
        setBusRoute(
          data.map((item) => {
            return item.username;
          })
        );

        setStation(
          data.map((item) => {
            return item.address.street;
          })
        );
      });
  }, []);

  function handleChange(e) {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
    setErrors(" ");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const time = dateBuilder(new Date());
    const userId = shortid.generate();

    if (!isFormValid()) {
      return;
    }

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        busNo: feedback.busNoToSend,
        route: feedback.busRouteToSend,
        station: feedback.stationToSend,
        numOfPass: numOfPassengers,
        date: time,
        user: userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    setNumOfPassengers("");
  }
  return (
    <div>
      <Paper elevation={16}>
        <FormGroup>
          <FormControl>
            <h4> Bus Number</h4>
            <Select
              id="busNoToSend"
              value={feedback.busNoToSend || " "}
              name="busNoToSend"
              onChange={handleChange}
            >
              {busNumber.map((number) => {
                return (
                  <MenuItem key={shortid.generate()} value={number}>
                    {number}
                  </MenuItem>
                );
              })}
            </Select>
            {errors.busNo && (
              <div className="invalid-feedback">{errors.busNo}</div>
            )}
          </FormControl>

          <FormControl>
            <h4> Bus Route</h4>
            <Select
              id="busRouteToSend"
              value={feedback.busRouteToSend || " "}
              name="busRouteToSend"
              onChange={handleChange}
            >
              {busRoute.map((route) => {
                return (
                  <MenuItem key={shortid.generate()} value={route}>
                    {route}
                  </MenuItem>
                );
              })}
            </Select>
            {errors.route && (
              <div className="invalid-feedback">{errors.route}</div>
            )}
          </FormControl>

          <FormControl>
            <h4> Station</h4>
            <Select
              id="stationToSend"
              value={feedback.stationToSend || " "}
              name="stationToSend"
              onChange={handleChange}
            >
              {station.map((BusStation) => {
                return (
                  <MenuItem key={shortid.generate()} value={BusStation}>
                    {BusStation}
                  </MenuItem>
                );
              })}
            </Select>
            {errors.busStation && (
              <div className="invalid-feedback">{errors.busStation}</div>
            )}
          </FormControl>
          <FormControl>
            <h4>No of people in the bus</h4>
            <TextField
              id="numOfPassengers"
              type="number"
              name="numOfPassengers"
              value={numOfPassengers}
              onChange={(e) => setNumOfPassengers(e.target.value)}
            />
            {errors.passengers && (
              <div className="invalid-feedback">{errors.passengers}</div>
            )}
          </FormControl>
          <Button onClick={handleSubmit}>Submit</Button>
        </FormGroup>
      </Paper>
    </div>
  );
}
