const key = "71191883750140b6a5620712252701";
const baseUrl = "https://api.weatherapi.com/v1";
const forecastUrl = "/forecast.json";

let city = document.querySelector("#city");
let currentTemp = document.querySelector("#currentTemp");
let today = document.querySelector("#today");
let tomorrow = document.querySelector("#tomorrow");
let afterTom = document.querySelector("#afterTom");
let date = document.querySelector("#date");
let stat = document.querySelector("#status");
let statTom = document.querySelector("#statusTom");
let statAfterTom = document.querySelector("#statusAfterTom");
let rain = document.querySelector("#rain");
let wind = document.querySelector("#wind");
let direction = document.querySelector("#direction");
let tomMax = document.querySelector("#tomMax");
let tomMin = document.querySelector("#tomMin");
let afterTomMax = document.querySelector("#afterTomMax");
let afterTomMin = document.querySelector("#afterTomMin");
let weatherIcon = document.querySelector("#icon");
let tomIcon = document.querySelector("#tomIcon");
let afterTomIcon = document.querySelector("#afterTomIcon");

var search = document.querySelector("#search");
var searchBtn = document.querySelector("#searchBtn");

let loc = "";

search,addEventListener('input',function (e) {
  loc = e.target.value;
  startApp(loc)
})

searchBtn.addEventListener('click', function () {
  startApp(loc);
});


async function getResponse(loc) {
  let data = await fetch(`${baseUrl}${forecastUrl}?key=${key}&q=${loc}&days=3`);
  let finalData = await data.json();
  return finalData;
}

function displayToday(data) {
  console.log(data);
  city.innerHTML = data.location.name;
  date.innerHTML = formatDate("date");
  today.innerHTML = formatDate("today");
  currentTemp.innerHTML = data.current.temp_c;
  stat.innerHTML = data.current.condition.text;
  rain.innerHTML = data.current.humidity;
  wind.innerHTML = data.current.wind_kph;
  direction.innerHTML = data.current.wind_dir;
  weatherIcon.setAttribute("src", data.current.condition.icon);
}

function displayTomorrow(data) {
  tomIcon.setAttribute("src", data.forecast.forecastday[1].day.condition.icon);
  tomMax.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
  tomMin.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
  statTom.innerHTML = data.forecast.forecastday[1].day.condition.text;
  tomorrow.innerHTML = formatDate("tom");
}

function displayAfterTomorrow(data) {
  afterTomIcon.setAttribute("src", data.forecast.forecastday[2].day.condition.icon);
  afterTomMax.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
  afterTomMin.innerHTML = data.forecast.forecastday[2].day.mintemp_c;
  statAfterTom.innerHTML = data.forecast.forecastday[2].day.condition.text;
  afterTom.innerHTML = formatDate("afterTom");
}


function formatDate(flag) {
  let date = new Date();

  if (flag == "date") {
    let day = date.getDate();
    let month = date.toLocaleDateString("default", { month: "long" });
    return `${day} ${month}`;
  } else if (flag == "today") {
    let weekday = date.toLocaleString("default", { weekday: "long" });
    return `${weekday}`;
  } else if (flag == "tom") {
    date.setDate(date.getDate() + 1);
    let tomorrowDayName = date.toLocaleString("default", { weekday: "long" });
    return `${tomorrowDayName}`;
  } else if (flag == "afterTom") {
    date.setDate(date.getDate() + 2);
    let afterTomorrowDayName = date.toLocaleString("default", {
      weekday: "long",
    });
    return `${afterTomorrowDayName}`;
  }
}


async function startApp(loc="Cairo") {
  let finalData = await getResponse(loc);
  if (!finalData.error) {
    displayToday(finalData);
    displayTomorrow(finalData);
    displayAfterTomorrow(finalData);      
  }
}

startApp();

