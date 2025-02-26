// alert("test");

// $0 can be used for selectign and performing an operation on a container

timeElement = document.getElementById("time");
dateElement = document.getElementById("date");

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

  timeElement.textContent = `${hours}:${minutes}:${seconds}:${ampm}`;
  dateElement.innerText = now.toLocalDateString(undefined, options);
}
updateClock();
setInterval(updateClock, 1000);

// const time = 0 || 12
// console.log(time)
