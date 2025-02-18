function totalCupCakes(trayOne, trayTwo) {
  ans = trayOne + trayTwo;
  const keys = Object.entries(trayOne);
  const myObject = {
    name: "Alice",
    age: 25,
    city: "New York",
  };
  for (let key in myObject) {
    console.log(`key ${key}, valeus: ${myObject[key]}`)
  }
  console.log(keys[0][1]);
  // console.log("TTTTTT11111", ans);
  // console.log("TTTTTT22222", trayTwo);
}

totalCupCakes({trayOne: 2, trayTwo: 20});
