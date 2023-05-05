import { useEffect, useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Button,
  FormHelperText,
  Box,
  LinearProgress,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { dateBuilder } from "../utils/utils";

const initialErrors = {
  busNo: "",
  route: "",
  busStation: "",
  passengers: "",
};
const blueColor = blue[50];

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

    if (!busNoToSend) {
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
    <Box
      sx={{
        mt: 10,
        p: 2,
        border: "1px solid grey",
        backgroundColor: "rgba(256, 256, 256, 0.8)",
      }}
    >
      <FormGroup
        sx={{
          display: "flex",
          gap: 3,
        }}
      >
        <FormControl
          variant="filled"
          error={!!errors.busNo}
          sx={{ backgroundColor: blueColor }}
        >
          <InputLabel>Bus Number</InputLabel>
          <Select
            value={busNoToSend}
            name="busNoToSend"
            onChange={handleBusNoChange}
          >
            {busNumbers.map((number, index) => {
              return (
                <MenuItem key={index} value={number}>
                  {number}
                </MenuItem>
              );
            })}
          </Select>
          {errors.busNo && <FormHelperText> {errors.busNo}</FormHelperText>}
        </FormControl>

        {busNoToSend !== null && (
          <FormControl
            variant="filled"
            error={!!errors.route}
            sx={{ backgroundColor: blueColor }}
          >
            <InputLabel>Bus Route</InputLabel>
            <Select
              value={busRouteToSend}
              name="busRouteToSend"
              onChange={handleRouteChange}
            >
              {busRoute.map((route, index) => {
                return (
                  <MenuItem key={index} value={route}>
                    {route}
                  </MenuItem>
                );
              })}
            </Select>
            {errors.route && <FormHelperText> {errors.route}</FormHelperText>}
          </FormControl>
        )}

        {busRouteToSend.length !== 0 && (
          <FormControl
            variant="filled"
            error={!!errors.busStation}
            sx={{ backgroundColor: blueColor }}
          >
            <InputLabel> Station</InputLabel>
            <Select
              value={stationToSend}
              name="stationToSend"
              onChange={handleStationsChange}
            >
              {station.map((busStation, index) => {
                return (
                  <MenuItem key={index} value={busStation}>
                    {busStation}
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
            <TextField
              variant="filled"
              type="number"
              label="No of passengers"
              name="numOfPassengers"
              value={numOfPassengers}
              onChange={handlePassengersChange}
              error={!!errors.passengers}
              sx={{ backgroundColor: blueColor }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            {errors.passengers && (
              <FormHelperText>{errors.passengers}</FormHelperText>
            )}
          </FormControl>
        )}

        <Button
          sx={{ minWidth: "50%", marginTop: 6, marginLeft: "auto" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </FormGroup>
    </Box>
  );
}
