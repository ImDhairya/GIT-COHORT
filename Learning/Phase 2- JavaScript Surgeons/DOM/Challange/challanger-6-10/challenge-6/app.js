/**
 * Write your challenge solution here
 */

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames = [
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

digitalClock = document.getElementsByClassName("digital-clock");
data = document.getElementsByClassName("date");

function updateClock() {
  const now = new Date();
  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const ampm = now.getHours() <= 12 ? "AM" : "PM";

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  digitalClock.textContent = `${hours}:${minutes}:${seconds}:${ampm}`;
  data.innerText = now.toLocalDateString(undefined, options);
}
updateClock();
setInterval(updateClock, 1000);
