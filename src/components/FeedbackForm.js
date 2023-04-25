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
  const [busNoToSend, setBusNoToSend] = useState([]);

  const [busRoute, setBusRoute] = useState([""]);
  const [busRouteToSend, setBusRouteToSend] = useState([]);

  const [station, setStation] = useState([""]);
  const [stationToSend, setStationToSend] = useState([]);

  const [numOfPassengers, setNumOfPassengers] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const time = dateBuilder(new Date());
    setNumOfPassengers("");
    const userId = shortid.generate();

    console.log(
      busNoToSend,
      busRouteToSend,
      stationToSend,
      numOfPassengers,
      time,
      `user id: ${userId}`
    );
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

  return (
    <div>
      <Paper elevation={16}>
        <FormGroup>
          <FormControl>
            <h4> Bus Number</h4>
            <Select
              id="busNumber"
              value={busNoToSend || " "}
              name="busNumber"
              onChange={(e) => setBusNoToSend(e.target.value)}
            >
              {busNumber.map((number) => {
                return (
                  <MenuItem key={shortid.generate()} value={number}>
                    {number}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl>
            <h4> Bus Route</h4>
            <Select
              id="busRoute"
              value={busRouteToSend || " "}
              name="busRoute"
              onChange={(e) => setBusRouteToSend(e.target.value)}
            >
              {busRoute.map((route) => {
                return (
                  <MenuItem key={shortid.generate()} value={route}>
                    {route}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl>
            <h4> Station</h4>
            <Select
              id="station"
              value={stationToSend || " "}
              name="station"
              onChange={(e) => setStationToSend(e.target.value)}
            >
              {station.map((BusStation) => {
                return (
                  <MenuItem key={shortid.generate()} value={BusStation}>
                    {BusStation}
                  </MenuItem>
                );
              })}
            </Select>
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
          </FormControl>
          <Button onClick={handleSubmit}>Submit</Button>
        </FormGroup>
      </Paper>
    </div>
  );
}
