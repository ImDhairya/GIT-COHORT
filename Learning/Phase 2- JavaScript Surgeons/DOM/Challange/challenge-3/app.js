/**
 * Write your challenge solution here
 */
Name = document.getElementById("nameInput");
Job = document.getElementById("jobInput");
Age = document.getElementById("ageInput");
Bio = document.getElementById("bioInput");

nadme = document.getElementById("nameDisplay");
job = document.getElementById("jobDisplay");
age = document.getElementById("ageDisplay");
bio = document.getElementById("bioDisplay");

// console.log(nadme.innerText);

Name.addEventListener("input", (e) => {
  nadme.innerText = e.target.value;
});

Job.addEventListener("input", (e) => {
  job.innerText = e.target.value;
});

Age.addEventListener("input", (e) => {
  age.innerText = e.target.value;
});

Bio.addEventListener("input", (e) => {
  bio.innerText = e.target.value;
});
