/* =========================
   Exercise 1
========================= */

console.log("Welcome to the Community Portal");

window.onload = function () {

    alert("Page fully loaded");

};

/* =========================
   Exercise 2
========================= */

let eventName = "Music Night";
let ticketPrice = 200;
let quantity = 3;

let totalAmount = ticketPrice * quantity;

console.log("Event:", eventName);
console.log("Ticket Price:", ticketPrice);
console.log("Quantity:", quantity);
console.log("Total Amount:", totalAmount);

/* =========================
   Exercise 3
========================= */

function showEvent() {
  alert("Welcome to Music Night!");
}

/* =========================
   Exercise 4
========================= */

let events = [
  "Music Night",
  "Coding Workshop",
  "Sports Day"
];

console.log("All Events:");

for (let i = 0; i < events.length; i++) {
  console.log(events[i]);
}

/* =========================
   Exercise 5
========================= */

let eventList = document.getElementById("eventList");

for (let i = 0; i < events.length; i++) {
  let listItem = document.createElement("li");

  listItem.textContent = events[i];

  listItem.onclick = function () {
  listItem.remove();
  updateCount();
};

  eventList.appendChild(listItem);
}
updateCount();
/* =========================
   Exercise 6
========================= */

function addEvent() {
  let input = document.getElementById("newEvent");

  let eventName = input.value;

  if (eventName !== "") {
    let listItem = document.createElement("li");

    listItem.textContent = eventName;
    listItem.onclick = function () {
  listItem.remove();
};


    eventList.appendChild(listItem);
    saveEvents();

updateCount();

    input.value = "";
  }
}

/* =========================
   Exercise 8
========================= */

function updateCount() {
  let total = eventList.children.length;

  document.getElementById("eventCount").textContent =
    "Total Events: " + total;
}

/* =========================
   Exercise 9
========================= */

function saveEvents() {
  let items = [];

  for (let i = 0; i < eventList.children.length; i++) {
    items.push(eventList.children[i].textContent);
  }

  localStorage.setItem("events", JSON.stringify(items));
}

function loadEvents() {
  let saved = localStorage.getItem("events");

  if (saved) {
    eventList.innerHTML = "";

    let items = JSON.parse(saved);

    for (let i = 0; i < items.length; i++) {
      let listItem = document.createElement("li");

      listItem.textContent = items[i];

      listItem.onclick = function () {
        listItem.remove();
        saveEvents();
        updateCount();
      };

      eventList.appendChild(listItem);
    }

    updateCount();
  }
}
loadEvents();

/* =========================
   Exercise 10
========================= */

function clearAllEvents() {
  eventList.innerHTML = "";

  localStorage.removeItem("events");

  updateCount();
}

/* =========================
   Exercise 11
========================= */

window.addEventListener("load", function () {
  let registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", function (event) {
    console.log("Form submitted");
    event.preventDefault();

    let form = event.target;

    let name = form.elements["name"].value.trim();
    let email = form.elements["email"].value.trim();
    let selectedEvent = form.elements["event"].value;

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("eventError").textContent = "";

    let valid = true;

    if (name === "") {
      document.getElementById("nameError").textContent =
        "Please enter name";
      valid = false;
    }

    if (email === "") {
      document.getElementById("emailError").textContent =
        "Please enter email";
      valid = false;
    }

    if (selectedEvent === "") {
      document.getElementById("eventError").textContent =
        "Please select event";
      valid = false;
    }

   if (valid) {
  document.getElementById("message").textContent =
    "Sending registration...";

  setTimeout(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        event: selectedEvent
      })
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById("message").textContent =
          "Registration sent successfully!";
        console.log(data);
      })
      .catch(error => {
        document.getElementById("message").textContent =
          "Registration failed!";
        console.error(error);
      });
  }, 2000);
}
  });
});

$("#registerBtn").click(function () {
  console.log("Register button clicked");
});

$("#eventList").fadeIn();