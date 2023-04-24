import { useState } from "react";
import {
  Paper,
  FormGroup,
  FormControl,
  Select,
  //   Autocomplete,
  TextField,
  //   InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import { dateBuilder } from "../utils/utils";

export default function FeedbackForm() {
  const [bus, setBus] = useState([
    {
      busNumber: ["1", "2", "3"],
      busRoute: ["one", "two", "three"],
      station: ["Calea Bucuresti", "Grivitei", "13 Decembrie"],
      noOfPassengers: "",
    },
  ]);

  function handleChange(e) {
    setBus({ ...bus, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const time = dateBuilder(new Date());
    const sentForm = { ...bus, time };

    console.log(
      bus.busNumber,
      bus.busRoute,
      bus.station,
      bus.noOfPassengers,
      sentForm
    );
  }

  return (
    <div>
      <Paper elevation={16}>
        <FormGroup>
          <FormControl>
            <h4> Bus Number</h4>
            <Select
              id="busNumber"
              value={bus.busNumber || ""}
              name="busNumber"
              onChange={handleChange}
            >
              {bus[0].busNumber.map((number) => {
                return <MenuItem value={number}>{number}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <FormControl>
            <h4> Bus Route</h4>
            <Select
              id="busRoute"
              value={bus.busRoute || ""}
              name="busRoute"
              onChange={handleChange}
            >
              {bus[0].busRoute.map((route) => {
                return <MenuItem value={route}>{route}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <FormControl>
            <h4> Station</h4>
            <Select
              id="station"
              value={bus.station || ""}
              name="station"
              onChange={handleChange}
            >
              {bus[0].station.map((BusStation) => {
                return <MenuItem value={BusStation}>{BusStation}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl>
            <h4>No of people in the bus</h4>
            <TextField
              id="noOfPassengers"
              type="number"
              name="noOfPassengers"
              value={bus.noOfPassengers || ""}
              onChange={handleChange}
            />
          </FormControl>
          <Button onClick={handleSubmit}>Submit</Button>
        </FormGroup>
      </Paper>
    </div>
  );
}
