vals = Math.floor(Math.random() * 6 + 1);

console.log(vals);

let useAccount = [
  {user: "sam", activity: 42},
  {user: "tom", activity: 344},
  {user: "jack", activity: 34},
];

// Notice that we didin't pass the initial value here as per.

// When no initial value is provided to reduce, the first element of the array (useAccount[0]) is used as the initial accumulator, and the callback function is executed starting from the second element (useAccount[1]). In each iteration, the callback compares the activity property of the current item with that of the accumulator and returns the one with higher activity. The final value returned by reduce is the most active user in the array

const mostActiveUser = useAccount.reduce((accumulator, item) => {
  return item.activity > accumulator.activity ? item : accumulator;
});

let abc = {dish: "tava paneer", item: "good", popular: "yes"};

let lmn = ["asdfasdf", "dfasdf", "dfeeef"];

const {popular, dish} = abc;

const [dsf, asdf, dd] = lmn;

console.log(dish, popular, dd);
