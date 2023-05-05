import { useEffect, useState } from "react";
import {
  FormGroup,
  FormControl,
  Select,
  TextField,
  MenuItem,
  Button,
  FormHelperText,
  Box,
  LinearProgress,
} from "@mui/material";
import { dateBuilder } from "../utils/utils";
import shortid from "shortid";

const initialErrors = {
  busNo: "",
  route: "",
  busStation: "",
  passengers: "",
};

export default function FeedbackForm() {
  const [loading, setLoading] = useState(true);

  const [busNumbers, setBusNumbers] = useState([]);
  const [busNoToSend, setBusNoToSend] = useState(null);
  const [busNumberError, setBusNumberError] = useState("");

  const [busRoute, setBusRoute] = useState([]);
  const [busRouteToSend, setBusRouteToSend] = useState("");
  const [busRouteError, setBusRouteError] = useState("");

  const [station, setStation] = useState([]);
  const [stationToSend, setStationToSend] = useState("");
  const [stationError, setStationError] = useState("");

  const [numOfPassengers, setNumOfPassengers] = useState("");

  const [errors, setErrors] = useState(initialErrors);

  function isFormValid() {
    let isValid = true;
    let newErrors = { ...errors };

    debugger;
    if (busNoToSend === null) {
      isValid = false;
      newErrors.busNo = "Bus Number is required";
    }

    if (!busRouteToSend.length) {
      isValid = false;
      newErrors.route = "Please select bus route ";
    }

    if (!stationToSend.length) {
      isValid = false;
      newErrors.busStation = "Please select the station";
    }

    if (!numOfPassengers) {
      isValid = false;
      newErrors.passengers = "Please enter the number of passengers";
    }

    setErrors(newErrors);

    return isValid;
  }

  //Fetch Bus numbers:
  useEffect(() => {
    fetch(" http://localhost:3001/busNo")
      .then((res) => res.json())
      .then((data) => setBusNumbers(data), setLoading(false))
      .catch((err) => setBusNumberError(err));
  }, []);

  //Set bus number to send and Fetch Bus Route
  function handleBusNoChange(e) {
    setBusNoToSend(e.target.value);
    setErrors(initialErrors);

    fetch(" http://localhost:3001/routes")
      .then((res) => res.json())
      .then((data) => setBusRoute(data))
      .catch((err) => setBusRouteError(err));
  }

  // Set bus route to send and Fetch Stations
  function handleRouteChange(e) {
    setBusRouteToSend(e.target.value);
    setErrors(initialErrors);

    fetch(" http://localhost:3001/stations")
      .then((res) => res.json())
      .then((data) => setStation(data))
      .catch((err) => setStationError(err));
  }

  function handleStationsChange(e) {
    setStationToSend(e.target.value);
    setErrors("");
  }

  function handlePassengersChange(e) {
    setNumOfPassengers(e.target.value);
    setErrors(initialErrors);
  }

  console.log(busNumberError, busRouteError, stationError);

  function handleSubmit(e) {
    const time = dateBuilder(new Date());

    if (!isFormValid()) {
      return;
    }

    fetch("http://localhost:3001/feedback", {
      method: "POST",
      body: JSON.stringify({
        busNo: busNoToSend,
        route: busRouteToSend,
        station: stationToSend,
        numOfPass: numOfPassengers,
        date: time,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    setNumOfPassengers("");
  }

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ maxWidth: "800px", p: 2, border: "1px solid grey" }}>
      <FormGroup>
        <FormControl variant="filled" error={!!errors.busNo}>
          <h4> Bus Number</h4>
          <Select
            value={busNoToSend}
            name="busNoToSend"
            onChange={handleBusNoChange}
          >
            {busNumbers.map((number) => {
              return (
                <MenuItem key={shortid.generate()} value={number}>
                  {number}
                </MenuItem>
              );
            })}
          </Select>
          {errors.busNo && <FormHelperText> {errors.busNo}</FormHelperText>}
        </FormControl>

        {busNoToSend.length !== 0 && (
          <FormControl variant="filled" error={!!errors.route}>
            <h4> Bus Route</h4>
            <Select
              value={busRouteToSend}
              name="busRouteToSend"
              onChange={handleRouteChange}
            >
              {busRoute.map((route) => {
                return (
                  <MenuItem key={shortid.generate()} value={route}>
                    {route}
                  </MenuItem>
                );
              })}
            </Select>
            {errors.route && <FormHelperText> {errors.route}</FormHelperText>}
          </FormControl>
        )}

        {busRouteToSend.length !== 0 && (
          <FormControl variant="filled" error={!!errors.busStation}>
            <h4> Station</h4>
            <Select
              value={stationToSend}
              name="stationToSend"
              onChange={handleStationsChange}
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
              <FormHelperText>{errors.busStation}</FormHelperText>
            )}
          </FormControl>
        )}
        {stationToSend.length !== 0 && (
          <FormControl variant="filled" error={!!errors.passengers}>
            <h4>No of people in the bus</h4>
            <TextField
              variant="filled"
              type="number"
              name="numOfPassengers"
              value={numOfPassengers}
              onChange={handlePassengersChange}
              error={!!errors.passengers}
            />
            {errors.passengers && (
              <FormHelperText>{errors.passengers}</FormHelperText>
            )}
          </FormControl>
        )}

        <Button
          sx={{ width: "30%", marginTop: 6, marginLeft: "auto" }}
          variant="outlined"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </FormGroup>
    </Box>
  );
}
