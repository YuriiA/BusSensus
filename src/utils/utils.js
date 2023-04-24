export function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let hour = d.getHours();
  let minutes = d.getMinutes();
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${hour}:${minutes},on ${date} ${month} ${year}`;
}

// const [busNumber, setBusNumber] = useState(["1", "2", "3"]);
//   const [busRoute, setBusRoute] = useState(["A->B", "B->A"]);
//   const [station, setStation] = useState([
//     "Calea Bucuresti",
//     "Grivitei",
//     "13 Decembrie",
//   ]);

//   const [numOfPassengers, setNumOfPassengers] = useState("");

//   function handleBusNumChange(e) {
//     setBusNumber(e.target.value);
//   }
//   function handleSubmit(e) {
//     e.preventDefault();
//     const time = dateBuilder(new Date());

//     console.log(busNumber, busRoute, station, numOfPassengers, time);
//   }

//   return (
//     <div>
//       <Paper elevation={16}>
//         <FormGroup>
//           <FormControl>
//             <h4> Bus Number</h4>
//             <Select
//               id="busNumber"
//               value={busNumber || ""}
//               name="busNumber"
//               onChange={handleBusNumChange}
//             >
//               {busNumber.map((number) => {
//                 return <MenuItem value={number}>{number}</MenuItem>;
//               })}
//             </Select>
//           </FormControl>

//           <FormControl>
//             <h4> Bus Route</h4>
//             <Select
//               id="busRoute"
//               value={busRoute || ""}
//               name="busRoute"
//               onChange={(e) => setBusRoute(e.target.value)}
//             >
//               {busRoute.map((route) => {
//                 return <MenuItem value={route}>{route}</MenuItem>;
//               })}
//             </Select>
//           </FormControl>

//           <FormControl>
//             <h4> Station</h4>
//             <Select
//               id="station"
//               value={station || ""}
//               name="station"
//               onChange={(e) => setStation(e.target.value)}
//             >
//               {station.map((BusStation) => {
//                 return <MenuItem value={BusStation}>{BusStation}</MenuItem>;
//               })}
//             </Select>
//           </FormControl>
//           <FormControl>
//             <h4>No of people in the bus</h4>
//             <TextField
//               id="numOfPassengers"
//               type="number"
//               name="numOfPassengers"
//               value={numOfPassengers || ""}
//               onChange={(e) => setNumOfPassengers(e.target.value)}
//             />
//           </FormControl>
//           <Button onClick={handleSubmit}>Submit</Button>
//         </FormGroup>
//       </Paper>
//     </div>
//   );
