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
