import { getToken } from "./getToken.mjs";
let url = "http://localhost:4000/task/gettimelytask";
let notification = document.getElementById("notification");
let audio = document.getElementById("audioPlayer");

const makeNewNotification = (tasks) => {
  let index = 0;

  let makeDiv = setInterval(() => {
    if (index == tasks.length) {
      clearInterval(makeDiv);
      return;
    }
    const div = document.createElement("div");
    div.textContent = tasks[index].taskname;
    div.setAttribute("class", "notification");
    notification.appendChild(div);
    audio.currentTime = 0; 
    audio.play();

    setTimeout(() => {
      div.style.marginLeft = "200%"; 
      div.style.transition = "all 1s";

      setTimeout(() => {
        notification.removeChild(div); 
      }, 1000); 
    }, 1000); 

    index++;
  }, 1000);
};


const fetchTimelyTask = async () => {
  const token = getToken();
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  const am = "am";
  const pm = "pm";
  let amPm = am;

  if (hour > 12 || hour == 12) {
    amPm = pm;
    hour = hour % 12 || 12;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  let todayDate = `${year}-${month}-${day}`;
  let time = `${hour}-${minutes}-${amPm}`;

  const initialResponse = await fetch(`${url}?time=${time}&date=${todayDate}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (initialResponse.status != 200) {
    window.localStorage.removeItem("token");
    window.location = "index.html";
  } else {
    const response = await initialResponse.json();
    makeNewNotification(response.data);
  }
};

export { fetchTimelyTask };
